"use client";

import { useState } from "react";
import Spinner from "@/components/loading/Spinner";

/** Lazy Google Maps iframe with a shimmer + spinner until the map has loaded. */
export default function MapEmbed({ src, title, className = "h-[420px]" }: { src: string; title: string; className?: string }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className={`relative overflow-hidden rounded-md bg-cream-100 ${className}`}>
      {!loaded && (
        <div className="skeleton absolute inset-0 grid place-items-center text-navy-900/50" role="status">
          <Spinner className="size-8" />
          <span className="sr-only">Loading map</span>
        </div>
      )}
      <iframe
        src={src}
        title={title}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
        onLoad={() => setLoaded(true)}
        className={`h-full w-full border-0 transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}
      />
    </div>
  );
}
