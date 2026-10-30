"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useState } from "react";
import EnquiryButton from "@/components/enquiry/EnquiryButton";
import { lockScroll, unlockScroll } from "@/lib/scroll";
import { mainNav, site, telHref, type NavItem } from "@/lib/site";
import logo from "@/public/images/brand/raajlaxmi-logo.png";

function isActive(pathname: string, item: NavItem): boolean {
  if (item.href === "/") return pathname === "/";
  return item.children ? item.children.some((child) => isActive(pathname, child)) : pathname.startsWith(item.href);
}

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    lockScroll();
    return unlockScroll;
  }, [menuOpen]);

  // Close the drawer if this UI is hidden by a navigation.
  useLayoutEffect(() => () => setMenuOpen(false), []);

  const close = () => setMenuOpen(false);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled || menuOpen
            ? "bg-white/95 shadow-[0_6px_30px_-12px_rgb(14_26_51/0.25)] backdrop-blur-md"
            : "bg-white/80 backdrop-blur-sm"
        }`}
      >
        <div className="container-x flex h-[72px] items-center justify-between gap-6">
          <Link href="/" onNavigate={close} className="shrink-0" aria-label={`${site.name} home`}>
            <Image src={logo} alt={site.name} preload className="h-11 w-auto sm:h-12" sizes="160px" />
          </Link>

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {mainNav.map((item) => (
                <li key={item.label} className="group relative">
                  <Link
                    href={item.href}
                    className={`flex items-center gap-1 px-3 py-2 text-[13px] font-medium tracking-wider uppercase transition-colors ${
                      isActive(pathname, item) ? "text-rust-600" : "text-navy-900 hover:text-rust-600"
                    }`}
                    aria-haspopup={item.children ? "true" : undefined}
                  >
                    {item.label}
                    {item.children && (
                      <svg
                        viewBox="0 0 20 20"
                        className="size-3.5 transition group-hover:rotate-180"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M5.3 7.3a1 1 0 0 1 1.4 0L10 10.6l3.3-3.3a1 1 0 1 1 1.4 1.4l-4 4a1 1 0 0 1-1.4 0l-4-4a1 1 0 0 1 0-1.4Z" />
                      </svg>
                    )}
                  </Link>
                  {item.children && (
                    <ul className="invisible absolute top-full left-0 min-w-56 translate-y-2 rounded-sm border-t-2 border-gold-500 bg-white py-2 opacity-0 shadow-xl transition-all duration-200 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            className={`block px-5 py-2.5 text-[13px] tracking-wider uppercase transition hover:bg-cream-100 hover:text-rust-600 ${
                              isActive(pathname, child) ? "text-rust-600" : "text-navy-900"
                            }`}
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <EnquiryButton className="btn-outline hidden px-5 py-2.5 text-xs sm:inline-flex">
              Enquire Now
              <svg
                viewBox="0 0 24 24"
                className="size-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                aria-hidden="true"
              >
                <rect x="3" y="5" width="18" height="14" rx="1.5" />
                <path d="m3.5 6 8.5 7 8.5-7" />
              </svg>
            </EnquiryButton>
            <button
              type="button"
              className="grid size-11 place-items-center text-navy-900 lg:hidden"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen((o) => !o)}
            >
              <span className="relative block h-4 w-6">
                <span
                  className={`absolute left-0 h-0.5 w-6 bg-current transition-all ${menuOpen ? "top-1/2 rotate-45" : "top-0"}`}
                />
                <span
                  className={`absolute top-1/2 left-0 h-0.5 w-6 bg-current transition-opacity ${menuOpen ? "opacity-0" : ""}`}
                />
                <span
                  className={`absolute left-0 h-0.5 w-6 bg-current transition-all ${menuOpen ? "top-1/2 -rotate-45" : "top-full"}`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer: kept outside <header> because its backdrop-filter would trap a fixed child */}
      <div
        id="mobile-menu"
        data-lenis-prevent
        className={`fixed inset-x-0 top-[72px] bottom-0 z-50 overflow-y-auto bg-white transition-all duration-300 lg:hidden ${
          menuOpen ? "visible opacity-100" : "invisible -translate-y-2 opacity-0"
        }`}
      >
        <nav aria-label="Mobile" className="container-x flex flex-col py-6">
          {mainNav.map((item) =>
            item.children ? (
              item.children.map((child) => (
                <Link
                  key={child.href}
                  href={child.href}
                  onNavigate={close}
                  className={`border-b border-black/5 py-4 font-display text-xl ${
                    isActive(pathname, child) ? "text-rust-600" : "text-navy-900"
                  }`}
                >
                  {child.label}
                </Link>
              ))
            ) : (
              <Link
                key={item.href}
                href={item.href}
                onNavigate={close}
                className={`border-b border-black/5 py-4 font-display text-xl ${
                  isActive(pathname, item) ? "text-rust-600" : "text-navy-900"
                }`}
              >
                {item.label}
              </Link>
            ),
          )}
          <div className="mt-8 flex flex-col gap-3" onClickCapture={close}>
            <EnquiryButton className="btn-primary">Enquire Now</EnquiryButton>
            <a href={telHref(site.phones[0])} className="btn-outline">
              Call {site.phones[0]}
            </a>
          </div>
        </nav>
      </div>
    </>
  );
}
