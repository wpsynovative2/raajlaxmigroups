"use client";

import type { ReactNode } from "react";
import { useEnquiry } from "./EnquiryProvider";

export default function EnquiryButton({
  project,
  className = "btn-primary",
  children = "Enquire Now",
}: {
  project?: string;
  className?: string;
  children?: ReactNode;
}) {
  const { openEnquiry } = useEnquiry();
  return (
    <button type="button" className={className} onClick={() => openEnquiry(project)}>
      {children}
    </button>
  );
}
