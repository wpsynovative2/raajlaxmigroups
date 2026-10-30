"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useState } from "react";
import { acaciaNav } from "@/lib/data/acacia";
import parkLogo from "@/public/images/acacia/rajlaxxmi-park-logo.png";

export default function AcaciaHeader() {
  const [active, setActive] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const sections = acaciaNav
      .map(({ id }) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: [0, 0.25, 0.5] },
    );
    sections.forEach((section) => io.observe(section));

    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useLayoutEffect(() => () => setOpen(false), []);

  return (
    <header className="fixed inset-x-0 top-3 z-50 px-3 sm:top-4">
      <div
        className={`mx-auto flex max-w-6xl items-center justify-between gap-4 rounded-full py-2 pr-3 pl-2 transition-all duration-300 ${
          scrolled || open ? "bg-olive-800 shadow-xl shadow-olive-900/25" : "bg-olive-800/90 backdrop-blur"
        }`}
      >
        <a href="#top" className="rounded-full bg-white px-4 py-1.5" aria-label="Raajlaxmi Park Acacia, back to top">
          <Image src={parkLogo} alt="Rajlaxxmi Park" preload sizes="120px" className="h-8 w-auto sm:h-9" />
        </a>

        <nav aria-label="Acacia sections" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {acaciaNav.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={active === item.id ? "true" : undefined}
                  className={`relative block rounded-full px-3.5 py-2 font-poppins text-[12px] font-medium tracking-wider uppercase transition ${
                    active === item.id ? "bg-olive-50 text-olive-800" : "text-olive-50/90 hover:text-white"
                  }`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          className="grid size-10 place-items-center rounded-full bg-olive-50 text-olive-800 lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="acacia-menu"
          onClick={() => setOpen((o) => !o)}
        >
          <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            {open ? <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" /> : <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />}
          </svg>
        </button>
      </div>

      <nav
        id="acacia-menu"
        aria-label="Acacia sections"
        className={`mx-auto mt-2 max-w-6xl overflow-hidden rounded-3xl bg-olive-800 shadow-xl transition-all duration-300 lg:hidden ${
          open ? "max-h-[480px] opacity-100" : "pointer-events-none max-h-0 opacity-0"
        }`}
      >
        <ul className="p-3">
          {acaciaNav.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={() => setOpen(false)}
                className={`block rounded-2xl px-5 py-3 font-poppins text-sm tracking-wider uppercase ${
                  active === item.id ? "bg-olive-50 text-olive-800" : "text-olive-50"
                }`}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
