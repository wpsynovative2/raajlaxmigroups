"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { lockScroll, unlockScroll } from "@/lib/scroll";

type Props = {
  open: boolean;
  onClose: () => void;
  labelledBy: string;
  children: ReactNode;
  panelClassName?: string;
  closeClassName?: string;
};

export default function Modal({
  open,
  onClose,
  labelledBy,
  children,
  panelClassName = "bg-white",
  closeClassName = "text-ink/60 hover:text-ink",
}: Props) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    lockScroll();

    const focusable = () =>
      panelRef.current?.querySelectorAll<HTMLElement>(
        'a[href],button:not([disabled]),input:not([type="hidden"]):not([tabindex="-1"]),select,textarea',
      ) ?? [];
    // Focus the first form field rather than the close button.
    const items = Array.from(focusable());
    (items.find((el) => el.tagName !== "BUTTON") ?? items[0])?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key !== "Tab") return;
      const list = Array.from(focusable());
      if (list.length === 0) return;
      const first = list[0];
      const last = list[list.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      unlockScroll();
      document.removeEventListener("keydown", onKey);
      previouslyFocused?.focus?.();
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 animate-[fade-in_.25s_ease-out] bg-navy-950/70 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        data-lenis-prevent
        className={`relative max-h-[92dvh] w-full max-w-md animate-[modal-in_.35s_cubic-bezier(.22,1,.36,1)] overflow-y-auto rounded-md shadow-2xl ${panelClassName}`}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className={`absolute top-3 right-3 z-10 grid size-9 place-items-center rounded-full bg-white/80 backdrop-blur transition ${closeClassName}`}
        >
          <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
          </svg>
        </button>
        {children}
      </div>
      <style>{`@keyframes fade-in{from{opacity:0}}@keyframes modal-in{from{opacity:0;transform:translateY(16px) scale(.97)}}`}</style>
    </div>
  );
}
