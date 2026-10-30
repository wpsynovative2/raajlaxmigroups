import { WhatsAppIcon } from "@/components/ui/Icons";
import { whatsappHref } from "@/lib/site";

export default function WhatsAppFloat({
  number,
  message = "Hi, I'm interested in your projects. Please share more details.",
  className = "",
}: {
  number: string;
  message?: string;
  className?: string;
}) {
  return (
    <a
      href={whatsappHref(number, message)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className={`group fixed right-4 bottom-4 z-40 grid size-14 place-items-center rounded-full bg-[#25d366] text-white shadow-lg shadow-black/20 transition hover:scale-105 sm:right-6 sm:bottom-6 ${className}`}
    >
      <span className="absolute inset-0 animate-ping rounded-full bg-[#25d366]/50 [animation-duration:2.4s]" />
      <WhatsAppIcon className="relative size-7" />
    </a>
  );
}
