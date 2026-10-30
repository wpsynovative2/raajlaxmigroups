import { PhoneIcon, WhatsAppIcon } from "@/components/ui/Icons";
import { acacia } from "@/lib/data/acacia";
import { telHref, whatsappHref } from "@/lib/site";
import { CallbackButton } from "./CallbackProvider";

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
          <WhatsAppIcon className="size-5" /> WhatsApp
        </a>
        <CallbackButton
          source="Sticky bar"
          className="flex flex-col items-center gap-1 bg-olive-50 py-3 text-olive-800 uppercase"
        >
          <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <path d="m3.5 6.5 8.5 6.5 8.5-6.5" />
          </svg>
          Enquire now
        </CallbackButton>
        <a href={telHref(acacia.phones[0])} className="flex flex-col items-center gap-1 py-3">
          <PhoneIcon className="size-5" /> Call us
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
