"use client";

import { useEffect, useState } from "react";
import { pushDataLayer } from "@/lib/analytics";
import TrackingFields from "./TrackingFields";
import { useLeadAction } from "./useLeadAction";
import {
  Field,
  FormMessage,
  FormSuccess,
  Honeypot,
  RecaptchaNotice,
  SubmitButton,
  phoneInputProps,
} from "./fields";

function RedevelopmentFormInner({ onReset }: { onReset: () => void }) {
  const [state, action, pending] = useLeadAction();

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
      <RecaptchaNotice className="text-center text-[11px] text-muted sm:col-span-2" />
    </form>
  );
}

export default function RedevelopmentForm() {
  const [key, setKey] = useState(0);
  return <RedevelopmentFormInner key={key} onReset={() => setKey((k) => k + 1)} />;
}
