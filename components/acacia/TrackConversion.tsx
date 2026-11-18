"use client";

import { useEffect } from "react";
import { pushDataLayer, takeLeadUserData } from "@/lib/analytics";

/**
 * Tells GTM a lead landed on the thank-you page (for ad conversion tags), with the email and
 * phone saved at submit time as `user_data` for enhanced conversions.
 */
export default function TrackConversion({ form }: { form: string }) {
  useEffect(() => {
    const userData = takeLeadUserData(form);
    pushDataLayer({ event: "lead_submit", form, ...(userData && { user_data: userData }) });
  }, [form]);
  return null;
}
