"use client";

import { createContext, useCallback, useContext, useLayoutEffect, useMemo, useState, type ReactNode } from "react";
import Modal from "@/components/ui/Modal";
import type { interestOptions } from "@/lib/data/acacia";
import AcaciaLeadForm from "./AcaciaLeadForm";

type Interest = (typeof interestOptions)[number];
type Request = { interest?: Interest; source: string };

const CallbackContext = createContext<{ openCallback: (request: Request) => void }>({
  openCallback: () => {},
});

export function useCallbackForm() {
  return useContext(CallbackContext);
}

/** The "Request a call back" popup used by every CTA on the Acacia page. */
export default function CallbackProvider({ children }: { children: ReactNode }) {
  const [request, setRequest] = useState<Request | null>(null);
  const openCallback = useCallback((next: Request) => setRequest(next), []);
  const close = useCallback(() => setRequest(null), []);
  const value = useMemo(() => ({ openCallback }), [openCallback]);

  // Don't come back to an open popup after navigating away and returning.
  useLayoutEffect(() => () => setRequest(null), []);

  return (
    <CallbackContext.Provider value={value}>
      {children}
      <Modal
        open={request !== null}
        onClose={close}
        labelledBy="callback-title"
        panelClassName="max-w-lg bg-olive-50 bg-[url('/images/acacia/leaf-pattern.webp')] bg-cover"
        closeClassName="text-olive-800"
      >
        <div className="p-6 sm:p-8">
          <h2 id="callback-title" className="font-poppins text-2xl font-semibold text-olive-800 uppercase">
            Request a call back
          </h2>
          <p className="mt-2 mb-6 text-sm text-olive-900/75">
            Fill this in and our sales team will reach out with pricing and available units.
          </p>
          {request && (
            <AcaciaLeadForm
              key={`${request.source}-${request.interest}`}
              defaultInterest={request.interest}
              source={request.source}
            />
          )}
        </div>
      </Modal>
    </CallbackContext.Provider>
  );
}

export function CallbackButton({
  children,
  className,
  interest,
  source,
}: {
  children: ReactNode;
  className?: string;
  interest?: Interest;
  source: string;
}) {
  const { openCallback } = useCallbackForm();
  return (
    <button type="button" className={className} onClick={() => openCallback({ interest, source })}>
      {children}
    </button>
  );
}
