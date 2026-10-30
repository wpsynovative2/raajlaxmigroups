import type { ReactNode } from "react";

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "light",
  as: Tag = "h2",
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
  as?: "h1" | "h2";
}) {
  const centered = align === "center";
  return (
    <div data-reveal className={centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow && (
        <p
          className={`eyebrow flex items-center gap-3 ${centered ? "justify-center" : ""} ${
            tone === "dark" ? "text-gold-400" : "text-gold-600"
          }`}
        >
          <span className="h-px w-8 bg-current" />
          {eyebrow}
          {centered && <span className="h-px w-8 bg-current" />}
        </p>
      )}
      <Tag
        className={`mt-3 font-display text-3xl leading-tight sm:text-4xl lg:text-[2.75rem] ${
          tone === "dark" ? "text-white" : "text-navy-900"
        }`}
      >
        {title}
      </Tag>
      {description && (
        <p className={`mt-4 text-base leading-relaxed sm:text-lg ${tone === "dark" ? "text-white/70" : "text-muted"}`}>
          {description}
        </p>
      )}
    </div>
  );
}
