"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import Modal from "@/components/ui/Modal";
import type { interestOptions } from "@/lib/data/acacia";
import AcaciaLeadForm from "./AcaciaLeadForm";

type Interest = (typeof interestOptions)[number];
type Request = { interest?: Interest; source: string };

const AUTO_OPEN_DELAY_MS = 5000;

const CallbackContext = createContext<{ openCallback: (request: Request) => void }>({
  openCallback: () => {},
});

export function useCallbackForm() {
  return useContext(CallbackContext);
}

/** The enquiry popup used by every CTA on the Acacia page. */
export default function CallbackProvider({ children }: { children: ReactNode }) {
  const [request, setRequest] = useState<Request | null>(null);
  // Lives in a ref so it survives the page being hidden and shown again on client-side navigation.
  const autoOpenDone = useRef(false);
  const openCallback = useCallback((next: Request) => {
    autoOpenDone.current = true;
    setRequest(next);
  }, []);
  const close = useCallback(() => setRequest(null), []);
  const value = useMemo(() => ({ openCallback }), [openCallback]);

  // Don't come back to an open popup after navigating away and returning.
  useLayoutEffect(() => () => setRequest(null), []);

  // Open once per visit, unless the visitor has already opened it or is busy with a form or the gallery viewer.
  useEffect(() => {
    const timer = setTimeout(() => {
      if (autoOpenDone.current) return;
      autoOpenDone.current = true;
      const busy =
        document.querySelector('[role="dialog"]') || document.activeElement?.matches("input, select, textarea");
      if (!busy) setRequest({ source: "Auto popup" });
    }, AUTO_OPEN_DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

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
            Get price & plan your visit
          </h2>
          <p className="mt-2 mb-6 text-sm text-olive-900/75">
            Share your details and our sales team will call you with pricing, available units and site visit timings.
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
