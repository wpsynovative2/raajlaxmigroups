import { normaliseIndianMobile } from "@/lib/leads/phone";

type DataLayerEvent = Record<string, unknown> & { event: string };

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

/** Sends an event to Google Tag Manager (no-op if GTM hasn't loaded). */
export function pushDataLayer(event: DataLayerEvent) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push(event);
}

/** Shape GTM's user-provided-data variable reads (Google Ads enhanced conversions). */
export type LeadUserData = { email?: string; phone_number?: string };

const LEAD_USER_DATA_KEY = "lead_user_data";

/**
 * Keeps the lead's email and phone for the thank-you page, which the server redirects to
 * and so can't see the submitted form. Phone is stored as +91XXXXXXXXXX.
 */
export function saveLeadUserData(form: string, phone: string, email: string) {
  const local = normaliseIndianMobile(phone.trim());
  const cleanEmail = email.trim().toLowerCase();
  const userData: LeadUserData = {};
  if (cleanEmail && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(cleanEmail)) userData.email = cleanEmail;
  if (local) userData.phone_number = `+91${local}`;

  try {
    if (Object.keys(userData).length) {
      sessionStorage.setItem(LEAD_USER_DATA_KEY, JSON.stringify({ form, userData }));
    } else {
      sessionStorage.removeItem(LEAD_USER_DATA_KEY);
    }
  } catch {
    // Storage blocked (private mode, disabled cookies): the conversion still fires without user_data.
  }
}

/** Reads the saved lead details for this form once, then deletes them. */
export function takeLeadUserData(form: string): LeadUserData | undefined {
  try {
    const raw = sessionStorage.getItem(LEAD_USER_DATA_KEY);
    sessionStorage.removeItem(LEAD_USER_DATA_KEY);
    if (!raw) return undefined;
    const saved = JSON.parse(raw) as { form?: string; userData?: LeadUserData };
    return saved.form === form ? saved.userData : undefined;
  } catch {
    return undefined;
  }
}
