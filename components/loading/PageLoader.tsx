"use client";

import { useEffect, useState } from "react";
import BrandMark from "./BrandMark";

const MIN_VISIBLE_MS = 900;
const MAX_VISIBLE_MS = 2800;

/** Full-screen brand splash shown on a hard page load, faded out once the page has loaded. */
export default function PageLoader() {
  const [phase, setPhase] = useState<"visible" | "leaving" | "gone">("visible");

  useEffect(() => {
    let minTimer: ReturnType<typeof setTimeout> | undefined;
    const hide = () => {
      const wait = Math.max(0, MIN_VISIBLE_MS - performance.now());
      minTimer = setTimeout(() => setPhase((p) => (p === "visible" ? "leaving" : p)), wait);
    };
    const maxTimer = setTimeout(
      () => setPhase((p) => (p === "visible" ? "leaving" : p)),
      MAX_VISIBLE_MS,
    );

    if (document.readyState === "complete") hide();
    else window.addEventListener("load", hide, { once: true });

    return () => {
      clearTimeout(minTimer);
      clearTimeout(maxTimer);
      window.removeEventListener("load", hide);
    };
  }, []);

  useEffect(() => {
    if (phase !== "leaving") return;
    const timer = setTimeout(() => setPhase("gone"), 650);
    return () => clearTimeout(timer);
  }, [phase]);

  if (phase === "gone") return null;

  return (
    <>
      <noscript>
        <style>{`#page-loader{display:none!important}`}</style>
      </noscript>
      <div
        id="page-loader"
        role="status"
        aria-label="Loading Raajlaxmi Group"
        className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-navy-950 transition-opacity duration-600 ease-out ${
          phase === "leaving" ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
      >
        <BrandMark animated className="h-16 w-10" />
        <p className="mt-5 font-display text-2xl tracking-[0.35em] text-white">RAAJLAXMI</p>
        <p className="mt-1 text-[10px] tracking-[0.5em] text-gold-400 uppercase">We understand realty</p>
        <div className="mt-6 h-px w-40 overflow-hidden bg-white/10">
          <div className="h-full w-1/3 animate-[loader-bar_1.2s_ease-in-out_infinite] bg-gold-500" />
        </div>
        <style>{`@keyframes loader-bar{0%{transform:translateX(-100%)}100%{transform:translateX(300%)}}`}</style>
      </div>
    </>
  );
}
