import { useId, type ComponentProps, type ReactNode } from "react";
import Spinner from "@/components/loading/Spinner";
import type { LeadField, LeadState } from "@/lib/leads/schema";

type FieldProps = {
  name: LeadField;
  label: string;
  state: LeadState;
  required?: boolean;
  labelClassName?: string;
  inputClassName?: string;
} & Omit<ComponentProps<"input">, "name">;

export function Field({
  name,
  label,
  state,
  required,
  labelClassName = "text-sm font-medium text-ink",
  inputClassName = "field-input",
  id,
  ...input
}: FieldProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const error = state.errors?.[name];
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={inputId} className={labelClassName}>
        {label}
        {required && <span className="ml-0.5 text-rust-600">*</span>}
      </label>
      <input
        id={inputId}
        name={name}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${inputId}-error` : undefined}
        defaultValue={state.values?.[name]}
        className={inputClassName}
        {...input}
      />
      {error && (
        <p id={`${inputId}-error`} className="text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

/** Props for a 10-digit Indian mobile number input. */
export const phoneInputProps = {
  type: "tel",
  inputMode: "tel",
  autoComplete: "tel-national",
  maxLength: 16,
  pattern: "[0-9+\\s\\-]{10,16}",
  title: "10-digit mobile number",
} as const;

/** Invisible field bots tend to fill in; submissions with a value are discarded. */
export function Honeypot() {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
      <label>
        Company website
        <input type="text" name="company_website" tabIndex={-1} autoComplete="off" />
      </label>
    </div>
  );
}

export function SubmitButton({
  pending,
  children,
  className = "btn-primary w-full",
}: {
  pending: boolean;
  children: ReactNode;
  className?: string;
}) {
  return (
    <button type="submit" disabled={pending} aria-busy={pending} className={className}>
      {pending ? (
        <>
          <Spinner />
          Sending…
        </>
      ) : (
        children
      )}
    </button>
  );
}

export function FormMessage({ state }: { state: LeadState }) {
  if (state.status !== "error" || !state.message) return null;
  return (
    <p role="alert" className="rounded-sm bg-red-50 px-3 py-2 text-sm text-red-700">
      {state.message}
    </p>
  );
}

export function FormSuccess({
  state,
  onReset,
  tone = "light",
}: {
  state: LeadState;
  onReset?: () => void;
  tone?: "light" | "dark";
}) {
  return (
    <div role="status" className="flex flex-col items-center gap-4 py-8 text-center">
      <span className="grid size-14 place-items-center rounded-full bg-gold-500/15 text-gold-600">
        <svg viewBox="0 0 24 24" className="size-7" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="m5 12.5 4.5 4.5L19 7.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <div>
        <p className={`font-display text-2xl ${tone === "dark" ? "text-white" : "text-navy-900"}`}>
          Thank you!
        </p>
        <p className={`mt-1 text-sm ${tone === "dark" ? "text-white/70" : "text-muted"}`}>
          {state.message}
        </p>
      </div>
      {onReset && (
        <button
          type="button"
          onClick={onReset}
          className="text-sm text-rust-600 underline underline-offset-4"
        >
          Send another enquiry
        </button>
      )}
    </div>
  );
}
