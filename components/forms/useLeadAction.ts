"use client";

import { useActionState, useEffect } from "react";
import { submitLead } from "@/lib/leads/submit-lead";
import { phoneError } from "@/lib/leads/phone";
import {
  initialLeadState,
  recaptchaAction,
  type LeadFormId,
  type LeadState,
} from "@/lib/leads/schema";

export const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? "";

type Grecaptcha = {
  ready(callback: () => void): void;
  execute(siteKey: string, options: { action: string }): Promise<string>;
};

declare global {
  interface Window {
    grecaptcha?: Grecaptcha;
  }
}

let loader: Promise<Grecaptcha> | null = null;

/** Injects the reCAPTCHA v3 script once per page and resolves when it is ready. */
function loadRecaptcha() {
  loader ??= new Promise<Grecaptcha>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/api.js?render=${encodeURIComponent(RECAPTCHA_SITE_KEY)}`;
    script.async = true;
    script.onload = () => window.grecaptcha?.ready(() => resolve(window.grecaptcha!));
    script.onerror = () => {
      loader = null;
      reject(new Error("reCAPTCHA script failed to load"));
    };
    document.head.appendChild(script);
  });
  return loader;
}

/** Fresh token for each submission; tokens expire after two minutes. */
async function getRecaptchaToken(action: string) {
  if (!RECAPTCHA_SITE_KEY) return "";
  try {
    const grecaptcha = await loadRecaptcha();
    return await grecaptcha.execute(RECAPTCHA_SITE_KEY, { action });
  } catch (error) {
    console.error("[recaptcha]", error);
    return "";
  }
}

function formValues(formData: FormData) {
  return Object.fromEntries(
    [...formData.entries()].filter((entry): entry is [string, string] => typeof entry[1] === "string"),
  ) as LeadState["values"];
}

/**
 * useActionState wired to submitLead, with an instant phone check in the browser
 * and a reCAPTCHA v3 token attached to every submission.
 */
export function useLeadAction() {
  useEffect(() => {
    // Load early so Google can observe the visit and the submit isn't delayed.
    if (RECAPTCHA_SITE_KEY) loadRecaptcha().catch(() => {});
  }, []);

  return useActionState<LeadState, FormData>(async (prev, formData) => {
    const phoneMessage = phoneError(String(formData.get("phone") ?? ""));
    if (phoneMessage) {
      return {
        status: "error",
        message: "Please check the highlighted fields.",
        errors: { phone: phoneMessage },
        values: formValues(formData),
      };
    }

    const form = String(formData.get("form")) as LeadFormId;
    formData.set("recaptchaToken", await getRecaptchaToken(recaptchaAction(form)));
    return submitLead(prev, formData);
  }, initialLeadState);
}
