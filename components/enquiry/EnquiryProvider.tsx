"use client";

import Image from "next/image";
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import Modal from "@/components/ui/Modal";
import EnquiryForm from "@/components/forms/EnquiryForm";
import banner from "@/public/images/popup/enquiry-banner.jpg";

const AUTO_OPEN_DELAY_MS = 20000;
const SEEN_KEY = "rl-enquiry-popup-seen";

type EnquiryContextValue = { openEnquiry: (project?: string) => void };

const EnquiryContext = createContext<EnquiryContextValue>({ openEnquiry: () => {} });

export function useEnquiry() {
  return useContext(EnquiryContext);
}

export default function EnquiryProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [project, setProject] = useState<string | undefined>();

  const openEnquiry = useCallback((nextProject?: string) => {
    setProject(nextProject);
    setOpen(true);
    try {
      sessionStorage.setItem(SEEN_KEY, "1");
    } catch {}
  }, []);

  const close = useCallback(() => setOpen(false), []);

  // Like the old site, invite first-time visitors to enquire, but only once per session.
  useEffect(() => {
    try {
      if (sessionStorage.getItem(SEEN_KEY)) return;
    } catch {
      return;
    }
    const timer = setTimeout(() => {
      if (!document.querySelector('[role="dialog"]')) openEnquiry();
    }, AUTO_OPEN_DELAY_MS);
    return () => clearTimeout(timer);
  }, [openEnquiry]);

  const value = useMemo(() => ({ openEnquiry }), [openEnquiry]);

  return (
    <EnquiryContext.Provider value={value}>
      {children}
      <Modal open={open} onClose={close} labelledBy="enquiry-title">
        <div className="relative aspect-[16/7] w-full bg-navy-900">
          <Image
            src={banner}
            alt="Raajlaxmi Group – We understand realty"
            fill
            sizes="448px"
            placeholder="blur"
            className="object-cover"
          />
        </div>
        <div className="p-6 sm:p-8">
          <p className="eyebrow text-gold-600">Enquire now</p>
          <h2 id="enquiry-title" className="mt-1 font-display text-2xl text-navy-900">
            {project ? `Interested in ${project}?` : "Find your dream home"}
          </h2>
          <p className="mt-1 mb-5 text-sm text-muted">
            Share your details and our sales team will call you back.
          </p>
          <EnquiryForm project={project} />
        </div>
      </Modal>
    </EnquiryContext.Provider>
  );
}
