"use client";

import { useEffect } from "react";
import { pushDataLayer } from "@/lib/analytics";

/** Tells GTM a lead landed on the thank-you page (for ad conversion tags). */
export default function TrackConversion({ form }: { form: string }) {
  useEffect(() => {
    pushDataLayer({ event: "lead_submit", form });
  }, [form]);
  return null;
}
