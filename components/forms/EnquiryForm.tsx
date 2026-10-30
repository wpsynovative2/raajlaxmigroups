"use client";

import { useActionState, useEffect, useState } from "react";
import { submitLead } from "@/lib/leads/submit-lead";
import { initialLeadState, type LeadState } from "@/lib/leads/schema";
import { pushDataLayer } from "@/lib/analytics";
import TrackingFields from "./TrackingFields";
import {
  Field,
  FormMessage,
  FormSuccess,
  Honeypot,
  SubmitButton,
  phoneInputProps,
} from "./fields";

type Props = {
  form?: "enquiry" | "contact";
  project?: string;
  submitLabel?: string;
};

function EnquiryFormInner({
  form = "enquiry",
  project,
  submitLabel = "Submit",
  onReset,
}: Props & { onReset: () => void }) {
  const [state, action, pending] = useActionState<LeadState, FormData>(
    submitLead,
    initialLeadState,
  );

  useEffect(() => {
    if (state.status === "success") pushDataLayer({ event: "lead_submit", form, project });
  }, [state.status, form, project]);

  if (state.status === "success") return <FormSuccess state={state} onReset={onReset} />;

  return (
    <form action={action} className="relative flex flex-col gap-4" noValidate>
      <input type="hidden" name="form" value={form} />
      {project && <input type="hidden" name="project" value={project} />}
      <TrackingFields />
      <Honeypot />
      <Field name="name" label="Name" state={state} required autoComplete="name" />
      <Field name="phone" label="Mobile No." state={state} required {...phoneInputProps} />
      <Field name="email" label="Email" state={state} type="email" autoComplete="email" />
      <FormMessage state={state} />
      <SubmitButton pending={pending}>{submitLabel}</SubmitButton>
      <p className="text-center text-xs text-muted">
        We respect your privacy. Your details are only used to contact you about our projects.
      </p>
    </form>
  );
}

export default function EnquiryForm(props: Props) {
  // Remounting with a new key gives a fresh form after "Send another enquiry".
  const [key, setKey] = useState(0);
  return <EnquiryFormInner key={key} {...props} onReset={() => setKey((k) => k + 1)} />;
}
