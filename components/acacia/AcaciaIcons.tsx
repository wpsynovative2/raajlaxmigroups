import type { ReactNode, SVGProps } from "react";
import type { HighlightIcon, NearbyIcon } from "@/lib/data/acacia";

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
} as const;

const paths: Record<HighlightIcon | NearbyIcon, ReactNode> = {
  temple: (
    <>
      <path d="M12 2v2M8 8h8l-1-4H9L8 8ZM6 8h12v3H6zM7 11v9M17 11v9M11 11v9M13 11v9M4 20h16M3 22h18" />
    </>
  ),
  business: (
    <>
      <circle cx="12" cy="7" r="3.5" />
      <path d="M5 21v-2a7 7 0 0 1 14 0v2M12 14l-1.2 4 1.2 1.5 1.2-1.5L12 14" />
    </>
  ),
  pool: (
    <>
      <path d="M2 18c1.5 1.2 3 1.2 4.5 0s3-1.2 4.5 0 3 1.2 4.5 0 3-1.2 4.5 0M2 14c1.5 1.2 3 1.2 4.5 0s3-1.2 4.5 0 3 1.2 4.5 0 3-1.2 4.5 0" />
      <path d="M8 12V5a2 2 0 0 1 4 0M16 12V5a2 2 0 0 0-4 0M8 8h8" />
    </>
  ),
  family: (
    <>
      <circle cx="7" cy="5" r="2" />
      <circle cx="17" cy="5" r="2" />
      <circle cx="12" cy="11" r="1.6" />
      <path d="M4 21v-7a3 3 0 0 1 6 0v7M14 21v-7a3 3 0 0 1 6 0v7M10.5 21v-4a1.5 1.5 0 0 1 3 0v4" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3 4.5 6v5.5c0 4.5 3.2 8.2 7.5 9.5 4.3-1.3 7.5-5 7.5-9.5V6L12 3Z" />
      <path d="m8.8 12 2.2 2.2 4.2-4.4" />
    </>
  ),
  map: (
    <>
      <path d="M9 4 3 6.5v13.5l6-2.5 6 2.5 6-2.5V4l-6 2.5L9 4ZM9 4v13.5M15 6.5V20" />
    </>
  ),
  health: (
    <>
      <path d="M12 21s-7.5-4.6-9.2-9.4C1.6 8.2 3.6 4.5 7.3 4.5c2 0 3.6 1.1 4.7 2.7 1.1-1.6 2.7-2.7 4.7-2.7 3.7 0 5.7 3.7 4.5 7.1C19.5 16.4 12 21 12 21Z" />
      <path d="M12 9.5v5M9.5 12h5" />
    </>
  ),
  cart: (
    <>
      <path d="M3 4h2l2.4 11.2a1.5 1.5 0 0 0 1.5 1.2h8.6a1.5 1.5 0 0 0 1.5-1.1L21 8H6.2" />
      <circle cx="9.5" cy="20" r="1.3" />
      <circle cx="17" cy="20" r="1.3" />
    </>
  ),
  sport: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M6.3 5.2c2.3 2.2 3.4 4.4 3.4 6.8s-1.1 4.6-3.4 6.8M17.7 5.2c-2.3 2.2-3.4 4.4-3.4 6.8s1.1 4.6 3.4 6.8" />
    </>
  ),
  train: (
    <>
      <rect x="5" y="3" width="14" height="14" rx="3" />
      <path d="M5 11h14M9 21l1.5-4M15 21l-1.5-4M9 14h.01M15 14h.01" />
    </>
  ),
};

export default function AcaciaIcon({ name, ...props }: { name: HighlightIcon | NearbyIcon } & SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      {paths[name]}
    </svg>
  );
}
