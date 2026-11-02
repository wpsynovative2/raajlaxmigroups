"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronIcon } from "@/components/ui/Icons";
import { gallery } from "@/lib/data/acacia";
import { lockScroll, unlockScroll } from "@/lib/scroll";

/** First image gets a large tile, the 2nd and 7th wide ones; this fills a neat 4-column (or 2-column) grid. */
function tileClass(i: number) {
  if (i === 0) return "col-span-2 row-span-2";
  if (i === 1 || i === 6) return "col-span-2";
  return "";
}

function tileSizes(i: number) {
  return tileClass(i) ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 25vw, 50vw";
}

/** Photo grid for the Acacia page; any tile opens a full-screen viewer. */
export default function AcaciaGallery() {
  const [index, setIndex] = useState<number | null>(null);
  const close = useCallback(() => setIndex(null), []);
  const step = useCallback(
    (dir: 1 | -1) => setIndex((i) => (i === null ? i : (i + dir + gallery.length) % gallery.length)),
    [],
  );

  return (
    <>
      <ul className="grid auto-rows-[140px] grid-cols-2 gap-3 sm:auto-rows-[200px] sm:gap-4 lg:auto-rows-[210px] lg:grid-cols-4">
        {gallery.map((item, i) => (
          <li key={item.image.src} className={tileClass(i)}>
            <button
              type="button"
              onClick={() => setIndex(i)}
              className="group relative block size-full cursor-zoom-in overflow-hidden rounded-xl bg-olive-900 shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-olive-50"
            >
              <Image
                src={item.image}
                alt={item.alt}
                fill
                placeholder="blur"
                sizes={tileSizes(i)}
                className="object-cover transition duration-700 group-hover:scale-105"
              />
              <span className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/70 to-transparent px-3 pt-8 pb-2.5 text-left font-poppins text-xs font-medium text-white transition sm:px-4 sm:pb-3 sm:text-sm lg:translate-y-2 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100 lg:group-focus-visible:translate-y-0 lg:group-focus-visible:opacity-100">
                {item.caption}
              </span>
            </button>
          </li>
        ))}
      </ul>
      {index !== null && <Lightbox index={index} onClose={close} onStep={step} />}
    </>
  );
}

function Lightbox({ index, onClose, onStep }: { index: number; onClose: () => void; onStep: (dir: 1 | -1) => void }) {
  const item = gallery[index];
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const touchX = useRef<number | null>(null);

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    lockScroll();
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") onStep(-1);
      else if (e.key === "ArrowRight") onStep(1);
      else if (e.key === "Tab") {
        // Keep focus on the viewer's own buttons.
        const buttons = Array.from(dialogRef.current?.querySelectorAll("button") ?? []);
        const current = buttons.indexOf(document.activeElement as HTMLButtonElement);
        const next = (current + (e.shiftKey ? -1 : 1) + buttons.length) % buttons.length;
        e.preventDefault();
        buttons[next]?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      unlockScroll();
      document.removeEventListener("keydown", onKey);
      previouslyFocused?.focus?.();
    };
  }, [onClose, onStep]);

  const arrow =
    "absolute top-1/2 z-10 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white backdrop-blur transition hover:bg-white hover:text-olive-900 sm:size-12";

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label="Project gallery"
      data-lenis-prevent
      className="fixed inset-0 z-[60] flex animate-[fade-in_.25s_ease-out] flex-col bg-black/95 font-poppins text-white"
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 50) onStep(dx < 0 ? 1 : -1);
        touchX.current = null;
      }}
    >
      <div className="flex items-center justify-between px-4 py-3 sm:px-6">
        <p className="text-sm tracking-wider text-white/70" aria-live="polite">
          {index + 1} / {gallery.length}
        </p>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close gallery"
          className="grid size-11 place-items-center rounded-full bg-white/10 transition hover:bg-white hover:text-olive-900"
        >
          <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      <div className="relative flex-1" onClick={onClose}>
        <Image
          key={item.image.src}
          src={item.image}
          alt={item.alt}
          fill
          placeholder="blur"
          sizes="100vw"
          className="animate-[fade-in_.3s_ease-out] object-contain px-2 sm:px-20"
          onClick={(e) => e.stopPropagation()}
        />
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onStep(-1);
          }}
          aria-label="Previous image"
          className={`${arrow} left-3 sm:left-6`}
        >
          <ChevronIcon className="size-5 rotate-180" />
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onStep(1);
          }}
          aria-label="Next image"
          className={`${arrow} right-3 sm:right-6`}
        >
          <ChevronIcon className="size-5" />
        </button>
      </div>

      <div className="px-4 py-4 text-center sm:py-5">
        <p className="text-base font-medium">{item.caption}</p>
        <p className="mt-0.5 text-xs text-white/50">Artist’s impression</p>
      </div>
      <style>{`@keyframes fade-in{from{opacity:0}}`}</style>
    </div>
  );
}
