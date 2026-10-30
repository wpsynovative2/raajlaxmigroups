"use client";

import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { useEffect } from "react";
import { setLenis } from "@/lib/scroll";

/** Inertia-style smooth scrolling for the whole site (Lenis, as on the old WordPress site). */
export default function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.1,
      wheelMultiplier: 1,
      // Same-page "#section" links glide into place; the CSS scroll-margin-top keeps them below the fixed header.
      anchors: true,
      // A link click to another page cancels any scroll still easing out.
      stopInertiaOnNavigate: true,
      // Let modals, menus and other scrollable boxes scroll on their own.
      allowNestedScroll: true,
    });
    setLenis(lenis);
    return () => {
      setLenis(null);
      lenis.destroy();
    };
  }, []);

  return null;
}
