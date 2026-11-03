import type { ReactNode } from "react";
import { PhoneIcon, WhatsAppIcon } from "@/components/ui/Icons";
import { acacia } from "@/lib/data/acacia";
import { telHref, whatsappHref } from "@/lib/site";
import { CallbackButton } from "./CallbackProvider";

/** An icon that nudges and sends out a soft ring. `delay` staggers the buttons so they take turns. */
function AnimatedIcon({ children, delay, ring }: { children: ReactNode; delay: string; ring: string }) {
  return (
    <span className="relative grid place-items-center">
      <span aria-hidden="true" className={`absolute inset-0 animate-pulse-ring rounded-full opacity-0 ${ring}`} style={{ animationDelay: delay }} />
      <span className="relative grid animate-nudge place-items-center" style={{ animationDelay: delay }}>
        {children}
      </span>
    </span>
  );
}

/** Sticky WhatsApp / Enquire / Call bar on phones; a floating WhatsApp button on larger screens. */
export default function ActionBar() {
  return (
    <>
      <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 border-t border-olive-900/20 bg-olive-800 pb-[env(safe-area-inset-bottom)] font-poppins text-xs font-medium tracking-wider text-white uppercase md:hidden">
        <a
          href={whatsappHref(acacia.whatsapp, acacia.whatsappMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-1 py-3"
        >
          <AnimatedIcon delay="0s" ring="bg-[#25d366]">
            <WhatsAppIcon className="size-5" />
          </AnimatedIcon>
          WhatsApp
        </a>
        <CallbackButton
          source="Sticky bar"
          className="relative flex flex-col items-center gap-1 overflow-hidden bg-olive-50 py-3 text-olive-800 uppercase"
        >
          <span
            aria-hidden="true"
            className="absolute inset-y-0 left-0 w-1/3 animate-sheen opacity-0 bg-linear-to-r from-transparent via-olive-700/25 to-transparent [animation-delay:1.2s]"
          />
          <AnimatedIcon delay="1.2s" ring="bg-olive-700/50">
            <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path d="m3.5 6.5 8.5 6.5 8.5-6.5" />
            </svg>
          </AnimatedIcon>
          <span className="relative">Get price</span>
        </CallbackButton>
        <a href={telHref(acacia.phones[0])} className="flex flex-col items-center gap-1 py-3">
          <AnimatedIcon delay="2.4s" ring="bg-white/60">
            <PhoneIcon className="size-5" />
          </AnimatedIcon>
          Call now
        </a>
      </div>

      <a
        href={whatsappHref(acacia.whatsapp, acacia.whatsappMessage)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed right-6 bottom-6 z-40 hidden size-14 place-items-center rounded-full bg-[#25d366] text-white shadow-lg transition hover:scale-105 md:grid"
      >
        <span className="absolute inset-0 animate-ping rounded-full bg-[#25d366]/50 [animation-duration:2.4s]" />
        <WhatsAppIcon className="relative size-7" />
      </a>
    </>
  );
}
