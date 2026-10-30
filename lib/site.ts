export const site = {
  name: "Raajlaxmi Group",
  tagline: "We Understand Realty",
  url: "https://raajlaxmi.com",
  description:
    "Raajlaxmi Group builds homes and commercial spaces across Vasai, Virar, Nalasopara and Saphale, delivered on time with quality you can trust.",
  phones: ["7774000939", "7774000903"],
  email: "info@raajlaxmigroup.com",
  address: "Shanti Niwas, Opp. Saraswati School, Station Road, Virar West",
  whatsapp: "917774000939",
  mapEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7518.631495074909!2d72.79541199469088!3d19.570968935982247!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7014a82fb827b%3A0x93b57a5fa252108b!2sRajlaxmi%20developers!5e0!3m2!1sen!2sin!4v1732786500105!5m2!1sen!2sin",
  gtmId: "GTM-TF2LLXP4",
  // The old site linked these icons to another company's pages. Fill in the real
  // Raajlaxmi profiles here; empty entries are not rendered.
  social: {
    facebook: "",
    instagram: "",
    youtube: "",
  },
} as const;

export type NavItem = { label: string; href: string; children?: NavItem[] };

export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about-us/" },
  {
    label: "Projects",
    href: "/on-going-projects/",
    children: [
      { label: "On-going Projects", href: "/on-going-projects/" },
      { label: "Completed Projects", href: "/completed-projects/" },
    ],
  },
  { label: "Redevelopment", href: "/redevelopment/" },
  { label: "Testimonials", href: "/testimonials/" },
  { label: "Contact Us", href: "/contact-us/" },
];

export function telHref(phone: string) {
  return `tel:+91${phone.replace(/\D/g, "").slice(-10)}`;
}

export function whatsappHref(number: string, text?: string) {
  const base = `https://wa.me/${number}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}
