"use client";

import { useActionState, useEffect, useState } from "react";
import { submitLead } from "@/lib/leads/submit-lead";
import { initialLeadState, type LeadState } from "@/lib/leads/schema";
import { pushDataLayer } from "@/lib/analytics";
import TrackingFields from "./TrackingFields";
import { Field, FormMessage, FormSuccess, Honeypot, SubmitButton, phoneInputProps } from "./fields";

function RedevelopmentFormInner({ onReset }: { onReset: () => void }) {
  const [state, action, pending] = useActionState<LeadState, FormData>(submitLead, initialLeadState);

  useEffect(() => {
    if (state.status === "success") pushDataLayer({ event: "lead_submit", form: "redevelopment" });
  }, [state.status]);

  if (state.status === "success") return <FormSuccess state={state} onReset={onReset} />;

  return (
    <form action={action} className="relative grid gap-4 sm:grid-cols-2" noValidate>
      <input type="hidden" name="form" value="redevelopment" />
      <TrackingFields />
      <Honeypot />
      <Field name="name" label="Society name" state={state} required autoComplete="organization" />
      <Field name="location" label="Location" state={state} required autoComplete="address-level2" />
      <Field name="units" label="Total flats & shops" state={state} inputMode="numeric" placeholder="e.g. 40 flats, 6 shops" />
      <Field name="phone" label="Mobile number" state={state} required {...phoneInputProps} />
      <div className="sm:col-span-2">
        <FormMessage state={state} />
      </div>
      <div className="sm:col-span-2">
        <SubmitButton pending={pending}>Request a free consultation</SubmitButton>
      </div>
    </form>
  );
}

export default function RedevelopmentForm() {
  const [key, setKey] = useState(0);
  return <RedevelopmentFormInner key={key} onReset={() => setKey((k) => k + 1)} />;
}
