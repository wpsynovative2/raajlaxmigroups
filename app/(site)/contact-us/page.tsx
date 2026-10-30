import type { Metadata } from "next";
import EnquiryForm from "@/components/forms/EnquiryForm";
import SocialLinks from "@/components/site/SocialLinks";
import { MailIcon, PhoneIcon, PinIcon } from "@/components/ui/Icons";
import MapEmbed from "@/components/ui/MapEmbed";
import PageHero from "@/components/ui/PageHero";
import { site, telHref } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Call ${site.phones[0]}, email ${site.email} or visit our office at ${site.address}. Request a call back from Raajlaxmi Group.`,
  alternates: { canonical: "/contact-us/" },
};

export default function ContactPage() {
  const cards = [
    {
      icon: PhoneIcon,
      title: "Call us",
      body: site.phones.map((phone) => (
        <a key={phone} href={telHref(phone)} className="block transition hover:text-rust-600">
          +91 {phone}
        </a>
      )),
    },
    {
      icon: MailIcon,
      title: "Email",
      body: (
        <a href={`mailto:${site.email}`} className="break-all transition hover:text-rust-600">
          {site.email}
        </a>
      ),
    },
    { icon: PinIcon, title: "Visit us", body: site.address },
  ];

  return (
    <>
      <PageHero title="Contact Us" crumb="Contact us" subtitle="Start your project with us. We’re a call away." />

      <section className="relative z-10 -mt-10">
        <div className="container-x grid gap-5 md:grid-cols-3">
          {cards.map(({ icon: Icon, title, body }) => (
            <div key={title} className="flex gap-4 rounded-md bg-white p-6 shadow-xl ring-1 ring-black/5" data-reveal>
              <span className="grid size-12 shrink-0 place-items-center rounded-full bg-rust-50 text-rust-600">
                <Icon className="size-5" />
              </span>
              <div>
                <h2 className="eyebrow text-gold-600">{title}</h2>
                <div className="mt-2 text-navy-900">{body}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="container-x grid gap-10 lg:grid-cols-2">
          <div className="rounded-md bg-navy-950 p-6 text-white sm:p-10" data-reveal>
            <p className="eyebrow text-gold-400">Send a message</p>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl">Request a call back</h2>
            <p className="mt-3 mb-8 text-white/70">
              Leave your details and our team will call you about pricing, availability and site visits.
            </p>
            <div className="rounded-md bg-white p-6 text-ink sm:p-8">
              <EnquiryForm form="contact" />
            </div>
            <div className="mt-8 flex items-center gap-4">
              <span className="text-sm text-white/60">Follow us</span>
              <SocialLinks />
            </div>
          </div>
          <div data-reveal>
            <MapEmbed src={site.mapEmbed} title="Raajlaxmi Group office location" className="h-[420px] lg:h-full lg:min-h-[560px]" />
          </div>
        </div>
      </section>
    </>
  );
}
