"use client";

import { Children, useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { ChevronIcon } from "./Icons";

/** Horizontal scroll-snap carousel with prev/next buttons; swipeable on touch devices. */
export default function Carousel({
  children,
  label,
  itemClassName = "basis-[85%] sm:basis-[calc((100%-1.25rem)/2)] lg:basis-[calc((100%-2.5rem)/3)]",
  tone = "light",
}: {
  children: ReactNode;
  label: string;
  itemClassName?: string;
  tone?: "light" | "dark";
}) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [edges, setEdges] = useState({ start: true, end: false });

  const update = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setEdges({
      start: el.scrollLeft <= 4,
      end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4,
    });
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update]);

  const scroll = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.9, behavior: "smooth" });
  };

  const button =
    tone === "dark"
      ? "border-white/25 text-white hover:bg-gold-500 hover:border-gold-500 hover:text-navy-950"
      : "border-navy-900/15 text-navy-900 hover:bg-rust-600 hover:border-rust-600 hover:text-white";

  return (
    <div role="region" aria-roledescription="carousel" aria-label={label}>
      <ul
        ref={trackRef}
        className="-mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-4 pb-2 [scrollbar-width:none] sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden"
      >
        {Children.map(children, (child) => (
          <li className={`shrink-0 snap-start ${itemClassName}`}>{child}</li>
        ))}
      </ul>
      <div className="mt-8 flex justify-center gap-3">
        <button
          type="button"
          onClick={() => scroll(-1)}
          disabled={edges.start}
          aria-label="Previous"
          className={`grid size-11 place-items-center rounded-full border transition disabled:opacity-30 ${button}`}
        >
          <ChevronIcon className="size-5 rotate-180" />
        </button>
        <button
          type="button"
          onClick={() => scroll(1)}
          disabled={edges.end}
          aria-label="Next"
          className={`grid size-11 place-items-center rounded-full border transition disabled:opacity-30 ${button}`}
        >
          <ChevronIcon className="size-5" />
        </button>
      </div>
    </div>
  );
}
