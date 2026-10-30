"use client";

import { useId, useState, type ReactNode } from "react";

/** Filters server-rendered children marked with `data-region` without re-rendering them. */
export default function RegionFilter({ regions, children }: { regions: string[]; children: ReactNode }) {
  const [active, setActive] = useState("All");
  const scope = useId().replace(/:/g, "");
  const options = ["All", ...regions];

  return (
    <div id={scope}>
      <div
        role="tablist"
        aria-label="Filter projects by location"
        className="mx-auto flex w-fit flex-wrap justify-center gap-2 rounded-full bg-white p-1.5 shadow-sm ring-1 ring-black/5"
      >
        {options.map((option) => (
          <button
            key={option}
            type="button"
            role="tab"
            aria-selected={active === option}
            onClick={() => setActive(option)}
            className={`rounded-full px-5 py-2 text-sm font-medium tracking-wider uppercase transition sm:px-7 ${
              active === option ? "bg-rust-600 text-white shadow" : "text-navy-900 hover:bg-cream-100"
            }`}
          >
            {option}
          </button>
        ))}
      </div>
      {active !== "All" && (
        <style>{`#${scope} [data-region]:not([data-region="${active}"]){display:none}`}</style>
      )}
      {children}
    </div>
  );
}
