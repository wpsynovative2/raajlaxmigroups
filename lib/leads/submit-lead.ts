"use server";

import { redirect } from "next/navigation";
import { normaliseIndianMobile, phoneError } from "./phone";
import { verifyRecaptcha } from "./recaptcha";
import {
  allowedRedirects,
  recaptchaAction,
  requiredFields,
  sheetNames,
  type LeadField,
  type LeadFormId,
  type LeadState,
} from "./schema";

const FORM_IDS = Object.keys(sheetNames) as LeadFormId[];
const FIELDS: LeadField[] = [
  "name",
  "phone",
  "email",
  "project",
  "location",
  "units",
  "interest",
  "message",
  "consent",
];
const TRACKING_FIELDS = [
  "pageUrl",
  "pageTitle",
  "referrer",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
  "fbclid",
] as const;

function text(formData: FormData, key: string, max = 500) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function validate(form: LeadFormId, values: Record<LeadField, string>) {
  const errors: Partial<Record<LeadField, string>> = {};

  for (const field of requiredFields[form]) {
    if (!values[field]) errors[field] = "This field is required.";
  }
  if (values.name && values.name.length < 2) errors.name = "Please enter a valid name.";
  const phoneMessage = phoneError(values.phone);
  if (phoneMessage) errors.phone = phoneMessage;
  if (values.email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email)) {
    errors.email = "Enter a valid email address.";
  }
  if (form === "acacia" && !values.consent) {
    errors.consent = "Please accept to be contacted.";
  }
  return errors;
}

async function deliverToGoogleSheet(payload: Record<string, string>) {
  const endpoint = process.env.GOOGLE_SCRIPT_URL;
  if (!endpoint) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("[lead] GOOGLE_SCRIPT_URL is not set; lead logged only:", payload);
      return true;
    }
    console.error("[lead] GOOGLE_SCRIPT_URL is not set; lead dropped.");
    return false;
  }

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      // Apps Script reads the raw body; text/plain avoids a CORS-style preflight on Google's side.
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({ secret: process.env.GOOGLE_SCRIPT_SECRET ?? "", ...payload }),
      redirect: "follow",
      cache: "no-store",
      signal: AbortSignal.timeout(15000),
    });
    if (!res.ok) {
      console.error("[lead] Apps Script responded", res.status);
      return false;
    }
    const body = (await res.json().catch(() => null)) as { ok?: boolean; error?: string } | null;
    if (!body?.ok) {
      console.error("[lead] Apps Script rejected the lead:", body?.error);
      return false;
    }
    return true;
  } catch (error) {
    console.error("[lead] Failed to reach Apps Script:", error);
    return false;
  }
}

export async function submitLead(_prev: LeadState, formData: FormData): Promise<LeadState> {
  const form = text(formData, "form") as LeadFormId;
  if (!FORM_IDS.includes(form)) {
    return { status: "error", message: "Something went wrong. Please refresh and try again." };
  }

  const values = Object.fromEntries(
    FIELDS.map((field) => [field, text(formData, field, field === "message" ? 2000 : 300)]),
  ) as Record<LeadField, string>;

  // Honeypot: real visitors never see or fill this field.
  if (text(formData, "company_website")) {
    return { status: "success", message: "Our team will get in touch with you shortly." };
  }

  const errors = validate(form, values);
  if (Object.keys(errors).length > 0) {
    return { status: "error", message: "Please check the highlighted fields.", errors, values };
  }

  const human = await verifyRecaptcha(text(formData, "recaptchaToken", 4000), recaptchaAction(form));
  if (!human) {
    return {
      status: "error",
      message: "We couldn't verify your submission. Please try again, or call us directly.",
      values,
    };
  }

  const submittedAt = new Date();
  const payload: Record<string, string> = {
    sheet: sheetNames[form],
    form,
    submittedAt: submittedAt.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
    timestamp: submittedAt.toISOString(),
    ...values,
    phone: normaliseIndianMobile(values.phone) ?? values.phone,
    consent: values.consent ? "Yes" : "",
  };
  for (const key of TRACKING_FIELDS) {
    const value = text(formData, key, 1000);
    if (value) payload[key] = value;
  }

  const delivered = await deliverToGoogleSheet(payload);
  if (!delivered) {
    return {
      status: "error",
      message: "We couldn't send your details right now. Please call us or try again in a moment.",
      values,
    };
  }

  const redirectTo = text(formData, "redirectTo");
  if ((allowedRedirects as readonly string[]).includes(redirectTo)) {
    redirect(redirectTo);
  }

  return { status: "success", message: "Our team will get in touch with you shortly." };
}
