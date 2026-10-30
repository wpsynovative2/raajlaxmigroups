import Image from "next/image";
import type { ReactNode } from "react";
import sprig from "@/public/images/acacia/heading-sprig.png";
import sprigReverse from "@/public/images/acacia/heading-sprig-reverse.png";
import sprigWhite from "@/public/images/acacia/heading-sprig-white.png";
import borderStrip from "@/public/images/acacia/border-strip.png";

/** Section heading with the hand-drawn leaf sprig underline used throughout the Acacia brochure. */
export function AcaciaTitle({
  children,
  tone = "olive",
  align = "left",
  as: Tag = "h2",
}: {
  children: ReactNode;
  tone?: "olive" | "light";
  align?: "left" | "right" | "center";
  as?: "h1" | "h2";
}) {
  const image = tone === "light" ? sprigWhite : align === "right" ? sprigReverse : sprig;
  const alignClass = align === "right" ? "items-end text-right" : align === "center" ? "items-center text-center" : "items-start";
  return (
    <div data-reveal className={`flex flex-col ${alignClass}`}>
      <Tag
        className={`font-poppins text-2xl font-semibold tracking-wide uppercase sm:text-3xl ${
          tone === "light" ? "text-olive-50" : "text-olive-800"
        }`}
      >
        {children}
      </Tag>
      <Image src={image} alt="" sizes="260px" className="mt-2 h-auto w-56 sm:w-64" />
    </div>
  );
}

/** The woven border band that separates Acacia sections. */
export function BorderStrip() {
  return (
    <div
      aria-hidden="true"
      className="h-8 bg-repeat-x sm:h-10"
      style={{ backgroundImage: `url(${borderStrip.src})`, backgroundSize: "auto 100%" }}
    />
  );
}

/** Cream background with the faint leaf pattern from the brochure. */
export function LeafSection({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`relative bg-olive-50 bg-[url('/images/acacia/leaf-pattern.webp')] bg-[length:900px_auto] bg-repeat py-16 sm:py-24 ${className}`}
    >
      {children}
    </section>
  );
}

export function FloretDivider({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 12" className={className} fill="none" stroke="currentColor" aria-hidden="true">
      <path d="M0 6h48M72 6h48" strokeWidth="1" />
      <path d="M60 1c2.5 2.5 2.5 7.5 0 10-2.5-2.5-2.5-7.5 0-10Z M52 6c2.5-2 5.5-2 8 0-2.5 2-5.5 2-8 0Z M68 6c-2.5-2-5.5-2-8 0 2.5 2 5.5 2 8 0Z" strokeWidth="1" />
    </svg>
  );
}
