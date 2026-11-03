"use client";

import { useId } from "react";
import { acacia, interestOptions } from "@/lib/data/acacia";
import TrackingFields from "@/components/forms/TrackingFields";
import { useLeadAction } from "@/components/forms/useLeadAction";
import {
  Field,
  FormMessage,
  Honeypot,
  RecaptchaNotice,
  SubmitButton,
  phoneInputProps,
} from "@/components/forms/fields";

const label = "text-[11px] font-semibold tracking-[0.14em] text-olive-800 uppercase";
const input =
  "w-full rounded-md border border-olive-800/20 bg-white px-4 py-3 text-[15px] text-olive-900 outline-none transition placeholder:text-olive-900/35 focus:border-olive-700 focus:ring-2 focus:ring-olive-700/20 aria-invalid:border-red-500";

/**
 * Enquiry form for the Acacia landing page. A successful submission lands on /acacia-thankyou/.
 * `inline` puts the fields and the button on one row on wide screens.
 */
export default function AcaciaLeadForm({
  defaultInterest = "1 BHK",
  layout = "stacked",
  source,
}: {
  defaultInterest?: (typeof interestOptions)[number];
  layout?: "stacked" | "inline";
  source: string;
}) {
  const [state, action, pending] = useLeadAction();
  const id = useId();
  const inline = layout === "inline";
  const control = inline ? `${input} h-12` : input;

  const submit = (
    <div className={inline ? "col-span-full flex flex-col gap-1.5 xl:col-span-1" : "col-span-full"}>
      {/* Empty label line, so the button sits level with the inputs beside it */}
      {inline && (
        <span aria-hidden="true" className={`${label} invisible hidden xl:block`}>
          &nbsp;
        </span>
      )}
      <SubmitButton
        pending={pending}
        className={`btn w-full rounded-md bg-olive-800 font-poppins whitespace-nowrap text-white hover:bg-olive-900 focus-visible:outline-olive-800 ${inline ? "h-12" : ""}`}
      >
        Get price details
      </SubmitButton>
    </div>
  );

  return (
    <form
      action={action}
      className={`relative grid gap-4 sm:grid-cols-2 ${inline ? "lg:grid-cols-4 xl:grid-cols-[repeat(4,minmax(0,1fr))_auto]" : ""}`}
      noValidate
    >
      <input type="hidden" name="form" value="acacia" />
      <input type="hidden" name="project" value={`${acacia.project} (${source})`} />
      <input type="hidden" name="redirectTo" value="/acacia-thankyou/" />
      <TrackingFields />
      <Honeypot />

      <Field
        name="name"
        label="Full name"
        state={state}
        required
        autoComplete="name"
        placeholder="Full name"
        labelClassName={label}
        inputClassName={control}
      />
      <Field
        name="phone"
        label="Mobile number"
        state={state}
        required
        placeholder="10-digit mobile number"
        labelClassName={label}
        inputClassName={control}
        {...phoneInputProps}
      />
      <Field
        name="email"
        label="Email address"
        state={state}
        type="email"
        autoComplete="email"
        placeholder="you@example.com"
        labelClassName={label}
        inputClassName={control}
      />
      <div className="flex flex-col gap-1.5">
        <label htmlFor={`${id}-interest`} className={label}>
          Interested in
        </label>
        <div className="relative">
          <select
            id={`${id}-interest`}
            name="interest"
            defaultValue={state.values?.interest || defaultInterest}
            className={`${control} appearance-none pr-10`}
          >
            {interestOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
          <svg
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-olive-800"
          >
            <path d="M5.3 7.3a1 1 0 0 1 1.4 0L10 10.6l3.3-3.3a1 1 0 1 1 1.4 1.4l-4 4a1 1 0 0 1-1.4 0l-4-4a1 1 0 0 1 0-1.4Z" />
          </svg>
        </div>
      </div>
      {inline && submit}
      <div className="col-span-full">
        <label className="flex items-start gap-3 text-xs leading-relaxed text-olive-900/75">
          <input
            type="checkbox"
            name="consent"
            value="yes"
            defaultChecked
            required
            aria-invalid={state.errors?.consent ? true : undefined}
            className="mt-0.5 size-4 shrink-0 accent-olive-800"
          />
          I agree to be contacted by Raajlaxmi Park Acacia and its partners via WhatsApp, SMS, phone, email etc.
        </label>
        {state.errors?.consent && <p className="mt-1 text-xs text-red-600">{state.errors.consent}</p>}
      </div>
      <div className="col-span-full">
        <FormMessage state={state} />
      </div>
      {!inline && submit}
      <RecaptchaNotice className="col-span-full text-center text-[11px] text-olive-900/60" />
    </form>
  );
}
