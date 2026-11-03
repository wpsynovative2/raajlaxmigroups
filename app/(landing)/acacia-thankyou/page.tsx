import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import TrackConversion from "@/components/acacia/TrackConversion";
import { ArrowRightIcon, MailIcon, PhoneIcon, PinIcon, WhatsAppIcon } from "@/components/ui/Icons";
import { acacia } from "@/lib/data/acacia";
import { telHref, whatsappHref } from "@/lib/site";
import groupLogo from "@/public/images/brand/raajlaxmi-group-logo.webp";

export const metadata: Metadata = {
  title: { absolute: "Thank you – Rajlaxmi Acacia" },
  description:
    "Your enquiry for Rajlaxmi Acacia, Saphale West has been received. Our sales team will call you within one working day.",
  robots: { index: false, follow: false },
};

const steps = [
  {
    when: "Right away",
    title: "Details sent to our sales desk",
    text: "Your name, number and area of interest are with the Acacia team at Saphale.",
  },
  {
    when: "Within 24 working hours",
    title: "A call from our sales team",
    text: "We’ll walk you through current pricing, available units, payment plans and the layout that fits your budget.",
  },
  {
    when: "At your convenience",
    title: "Visit the ready sample building",
    text: "See the finished amenities and sample flat in person. The site is a five-minute walk from Saphale railway station.",
  },
];

function formatPhone(phone: string) {
  return phone.replace(/(\d{5})(\d{5})/, "$1 $2");
}

export default function AcaciaThankYouPage() {
  return (
    <main className="min-h-dvh bg-cream-100">
      <TrackConversion form="acacia" />

      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-radial-[at_50%_0%] from-navy-700 via-navy-900 to-navy-950 px-4 pt-14 pb-20 text-center text-white sm:pt-20 sm:pb-24">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <span className="absolute top-0 -left-24 h-px w-[520px] origin-left rotate-[38deg] bg-linear-to-r from-transparent via-gold-500 to-transparent" />
          <span className="absolute top-40 -left-32 h-px w-[420px] origin-left -rotate-[38deg] bg-linear-to-r from-transparent via-gold-500/70 to-transparent" />
          <span className="absolute top-0 -right-24 h-px w-[520px] origin-right -rotate-[38deg] bg-linear-to-l from-transparent via-gold-500 to-transparent" />
          <span className="absolute top-44 -right-32 h-px w-[420px] origin-right rotate-[38deg] bg-linear-to-l from-transparent via-gold-500/70 to-transparent" />
        </div>

        <Link href="/acacia/" className="mx-auto inline-block rounded-md bg-white px-4 py-2" aria-label="Back to Rajlaxmi Acacia">
          <Image src={groupLogo} alt="Rajlaxmi Group of Companies" preload sizes="160px" className="h-10 w-auto" />
        </Link>

        <div className="mx-auto mt-10 grid size-20 animate-fade-up place-items-center rounded-full border border-gold-500/70 text-gold-400">
          <svg viewBox="0 0 24 24" className="size-9" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <path d="m5 12.5 4.5 4.5L19 7.5" strokeLinecap="round" strokeLinejoin="round" className="animate-[draw_.9s_.3s_ease-out_both] [stroke-dasharray:24] [stroke-dashoffset:24]" />
          </svg>
          <style>{`@keyframes draw{to{stroke-dashoffset:0}}`}</style>
        </div>

        <h1 className="mt-8 animate-fade-up font-display text-4xl [animation-delay:120ms] sm:text-6xl">
          Your enquiry has reached us
        </h1>
        <p className="mx-auto mt-5 max-w-xl animate-fade-up text-lg text-white/80 [animation-delay:200ms]">
          Thank you for your interest in Rajlaxmi Acacia. Our sales team will call you within one working day with
          pricing, availability and floor plans.
        </p>
        <p className="mt-5 animate-fade-up text-sm text-white/55 [animation-delay:260ms]">
          {acacia.location} <span className="mx-2 text-gold-500">|</span> 1 BHK homes and road-facing offices
        </p>
        <div className="mt-9 flex animate-fade-up flex-wrap justify-center gap-3 [animation-delay:320ms]">
          <a
            href={whatsappHref(acacia.whatsapp, "Hi! I just submitted an enquiry for Rajlaxmi Acacia. Please share the details.")}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold"
          >
            <WhatsAppIcon className="size-4" /> Chat on WhatsApp
          </a>
          <a href={telHref(acacia.phones[1])} className="btn-outline-light">
            <PhoneIcon className="size-4" /> Call {formatPhone(acacia.phones[1])}
          </a>
        </div>
      </section>

      {/* Timeline */}
      <section className="px-4 py-16 sm:py-24">
        <h2 className="text-center font-display text-3xl text-navy-900 sm:text-4xl">What happens next</h2>
        <ol className="relative mx-auto mt-12 max-w-xl border-l border-gold-500/40 pl-8">
          {steps.map((step, i) => (
            <li key={step.title} className="relative pb-10 last:pb-0" data-reveal style={{ transitionDelay: `${i * 120}ms` }}>
              <span className="absolute top-1.5 -left-[37px] size-3 rounded-full bg-gold-500 ring-4 ring-cream-100" />
              <p className="text-xs tracking-wider text-muted uppercase">{step.when}</p>
              <h3 className="mt-1 font-display text-xl text-navy-900">{step.title}</h3>
              <p className="mt-2 leading-relaxed text-muted">{step.text}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Project recap */}
      <section className="bg-olive-800 px-4 py-14 text-olive-50">
        <div className="mx-auto grid max-w-5xl gap-10 sm:grid-cols-3">
          <div>
            <h3 className="font-display text-xl text-gold-300">Ready to move in</h3>
            <p className="mt-2 text-sm leading-relaxed text-olive-50/80">
              OC received, amenities ready and a sample building open for viewing.
            </p>
          </div>
          <div>
            <h3 className="font-display text-xl text-gold-300">Homes and businesses</h3>
            <p className="mt-2 text-sm leading-relaxed text-olive-50/80">
              1 BHK residences from {acacia.prices.oneBhk} and road-facing offices from {acacia.prices.office}.
              2 BHK homes and shops are sold out.
            </p>
          </div>
          <div>
            <h3 className="font-display text-xl text-gold-300">See the project again</h3>
            <p className="mt-2 text-sm leading-relaxed text-olive-50/80">
              <Link href="/acacia/#amenities" className="underline underline-offset-4 hover:text-white">
                Amenities
              </Link>
              ,{" "}
              <Link href="/acacia/#configuration" className="underline underline-offset-4 hover:text-white">
                configurations
              </Link>{" "}
              and{" "}
              <Link href="/acacia/#connectivity" className="underline underline-offset-4 hover:text-white">
                location
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="px-4 py-16">
        <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-3">
          <div className="rounded-md bg-white p-6 shadow-sm ring-1 ring-black/5">
            <PinIcon className="size-5 text-gold-600" />
            <h3 className="mt-3 font-display text-lg text-navy-900">Site address</h3>
            <p className="mt-1 text-sm text-muted">{acacia.siteAddress}</p>
          </div>
          <div className="rounded-md bg-white p-6 shadow-sm ring-1 ring-black/5">
            <PhoneIcon className="size-5 text-gold-600" />
            <h3 className="mt-3 font-display text-lg text-navy-900">Call us</h3>
            <p className="mt-1 flex flex-col text-sm text-muted">
              {acacia.phones.map((phone) => (
                <a key={phone} href={telHref(phone)} className="hover:text-rust-600">
                  {formatPhone(phone)}
                </a>
              ))}
            </p>
          </div>
          <div className="rounded-md bg-white p-6 shadow-sm ring-1 ring-black/5">
            <MailIcon className="size-5 text-gold-600" />
            <h3 className="mt-3 font-display text-lg text-navy-900">Email</h3>
            <a href={`mailto:${acacia.email}`} className="mt-1 block text-sm break-all text-muted hover:text-rust-600">
              {acacia.email}
            </a>
          </div>
        </div>

        <div className="mx-auto mt-12 max-w-3xl space-y-2 text-center text-xs leading-relaxed text-muted">
          <p>
            MahaRERA registration number {acacia.rera}. Available on the website{" "}
            <a href={acacia.reraSite} target="_blank" rel="noopener noreferrer" className="underline">
              maharera.maharashtra.gov.in
            </a>
            .
          </p>
          <p>Perspectives are an artist’s impression. Plans, amenities and prices are subject to change and to approval by the concerned authorities.</p>
        </div>

        <div className="mt-10 text-center">
          <Link href="/acacia/" className="btn-outline">
            Back to Rajlaxmi Acacia <ArrowRightIcon className="size-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
