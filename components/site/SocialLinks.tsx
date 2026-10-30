import { site, whatsappHref } from "@/lib/site";
import { FacebookIcon, InstagramIcon, WhatsAppIcon, YoutubeIcon } from "@/components/ui/Icons";

const ICONS = {
  facebook: { label: "Facebook", Icon: FacebookIcon },
  instagram: { label: "Instagram", Icon: InstagramIcon },
  youtube: { label: "YouTube", Icon: YoutubeIcon },
} as const;

export default function SocialLinks({
  className = "",
  itemClassName = "border-white/20 text-white/80 hover:border-gold-400 hover:bg-gold-500 hover:text-navy-950",
}: {
  className?: string;
  itemClassName?: string;
}) {
  const profiles = (Object.keys(ICONS) as (keyof typeof ICONS)[]).filter((key) => site.social[key]);
  return (
    <ul className={`flex gap-3 ${className}`}>
      {profiles.map((key) => {
        const { label, Icon } = ICONS[key];
        return (
          <li key={key}>
            <a
              href={site.social[key]}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className={`grid size-10 place-items-center rounded-full border transition ${itemClassName}`}
            >
              <Icon className="size-4" />
            </a>
          </li>
        );
      })}
      <li>
        <a
          href={whatsappHref(site.whatsapp)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp"
          className={`grid size-10 place-items-center rounded-full border transition ${itemClassName}`}
        >
          <WhatsAppIcon className="size-4" />
        </a>
      </li>
    </ul>
  );
}
