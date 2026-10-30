import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import AcaciaHeader from "@/components/acacia/AcaciaHeader";
import AcaciaIcon from "@/components/acacia/AcaciaIcons";
import AcaciaLeadForm from "@/components/acacia/AcaciaLeadForm";
import ActionBar from "@/components/acacia/ActionBar";
import CallbackProvider, { CallbackButton } from "@/components/acacia/CallbackProvider";
import { poppins } from "@/components/acacia/fonts";
import { AcaciaTitle, BorderStrip, FloretDivider, LeafSection } from "@/components/acacia/ui";
import Carousel from "@/components/ui/Carousel";
import { ArrowRightIcon, FacebookIcon, InstagramIcon, MailIcon, PhoneIcon, PinIcon, WhatsAppIcon } from "@/components/ui/Icons";
import MapEmbed from "@/components/ui/MapEmbed";
import { acacia, amenities, configurations, highlights, nearby } from "@/lib/data/acacia";
import { telHref, whatsappHref } from "@/lib/site";
import heroDesktop from "@/public/images/acacia/hero-desktop.webp";
import heroMobile from "@/public/images/acacia/hero-mobile.jpg";
import plaque from "@/public/images/acacia/acacia-plaque.png";
import hands from "@/public/images/acacia/acacia-hands.webp";
import shopsOffices from "@/public/images/acacia/shops-offices.webp";
import groupLogo from "@/public/images/brand/raajlaxmi-group-logo.webp";
import reraLogo from "@/public/images/acacia/maharera-logo.png";
import reraQr from "@/public/images/acacia/rera-qr-code.png";

export const metadata: Metadata = {
  title: { absolute: "Rajlaxmi Acacia, Saphale | 1 & 2 BHK from ₹25.48L* | Shops & Offices from ₹14.50L*" },
  description:
    "Rajlaxmi Acacia at Raajlaxmi Park, Saphale: OC-received 1 & 2 BHK homes from ₹25.48L* and road-facing shops & offices from ₹14.50L*, a 5-minute walk from Saphale station. MahaRERA P99000056103.",
  alternates: { canonical: "/acacia/" },
  openGraph: {
    title: "Rajlaxmi Acacia, Saphale",
    description: "1 & 2 BHK homes from ₹25.48L* and road-facing shops & offices from ₹14.50L*.",
    images: ["/images/og/acacia-og.jpg"],
  },
};

const leaves = [
  { left: "38%", top: "12%", size: 18, delay: "0s", rotate: 20 },
  { left: "58%", top: "6%", size: 14, delay: "1.5s", rotate: -30 },
  { left: "86%", top: "18%", size: 20, delay: "3s", rotate: 45 },
  { left: "70%", top: "40%", size: 12, delay: "2s", rotate: -10 },
  { left: "94%", top: "52%", size: 16, delay: "4s", rotate: 60 },
];

function Price({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-center">
      <p className="font-poppins text-[2.1cqw] leading-none font-semibold tracking-wide text-white uppercase">{label}</p>
      <p className="mt-[0.5cqw] font-poppins text-[0.8cqw] font-medium tracking-[0.45em] text-white/85 uppercase">
        Starting from
      </p>
      <p className="mt-[0.4cqw] bg-linear-to-b from-[#fbe7a8] to-[#d8a948] bg-clip-text font-poppins text-[3.4cqw] leading-none font-bold text-transparent drop-shadow">
        {value}
      </p>
    </div>
  );
}

export default function AcaciaPage() {
  return (
    <div id="top" className={`${poppins.variable} bg-olive-50 pb-16 text-olive-900 md:pb-0`}>
      <CallbackProvider>
        <AcaciaHeader />

        <main>
          {/* Hero */}
          <section aria-labelledby="acacia-hero-title" className="relative overflow-hidden">
            <h1 id="acacia-hero-title" className="sr-only">
              Codename Acacia at Raajlaxmi Park, Saphale: elegant 1 &amp; 2 BHK residences starting from{" "}
              {acacia.prices.residential}, shops &amp; offices starting from {acacia.prices.commercial}
            </h1>

            {/* Phones: the brochure artwork with prices built in */}
            <div className="bg-[#6edbfc] pt-20 md:hidden">
              <Image
                src={heroMobile}
                alt=""
                preload
                placeholder="blur"
                sizes="100vw"
                className="w-full"
              />
            </div>

            {/* Tablet & desktop: artwork with live text over the arch */}
            <div className="@container relative hidden aspect-[1600/1067] w-full md:block">
              <Image
                src={heroDesktop}
                alt="Rajlaxmi Acacia: a road-facing residential and commercial building surrounded by greenery"
                fill
                preload
                placeholder="blur"
                sizes="100vw"
                className="object-cover"
              />
              {leaves.map((leaf, i) => (
                <svg
                  key={i}
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="absolute animate-float-leaf text-[#7dbb3c] drop-shadow"
                  style={
                    {
                      left: leaf.left,
                      top: leaf.top,
                      width: leaf.size,
                      height: leaf.size,
                      animationDelay: leaf.delay,
                      rotate: `${leaf.rotate}deg`,
                    } as CSSProperties
                  }
                >
                  <path fill="currentColor" d="M3 21C3 10 10 3 21 3c0 11-7 18-18 18Zm0 0 9-9" />
                </svg>
              ))}
              <div className="absolute top-[19%] bottom-[9%] left-[7.4%] flex w-[26.8%] animate-fade-up flex-col items-center justify-center gap-[1.6cqw]">
                <Image src={plaque} alt="Codename Acacia" sizes="22vw" className="w-[78%] drop-shadow-xl" />
                <p className="font-poppins text-[1.25cqw] font-medium tracking-[0.08em] text-white uppercase">
                  Elegant 1 &amp; 2 BHK
                </p>
                <div className="-mt-[1.2cqw]">
                  <Price label="Residential" value={acacia.prices.residential} />
                </div>
                <FloretDivider className="w-[45%] text-[#e8cf8f]" />
                <Price label="Shops & offices" value={acacia.prices.commercial} />
                <CallbackButton
                  source="Hero"
                  className="mt-[0.4cqw] rounded-full bg-olive-50 px-[1.8cqw] py-[0.7cqw] font-poppins text-[0.95cqw] font-semibold tracking-wider text-olive-800 uppercase shadow-lg transition hover:bg-white"
                >
                  Enquire now
                </CallbackButton>
              </div>
            </div>
          </section>

          <BorderStrip />

          {/* Overview + About */}
          <LeafSection id="overview">
            <div className="container-x">
              <AcaciaTitle align="right">Overview</AcaciaTitle>
              <div className="mt-8 max-w-4xl" data-reveal>
                <h3 className="font-poppins text-lg font-semibold tracking-wide text-olive-800 uppercase">
                  The Acacia experience
                </h3>
                <p className="mt-4 text-lg leading-relaxed text-olive-900/85">
                  Rajlaxmi Acacia brings together thoughtfully planned homes and commercial spaces in a road-facing
                  development designed around comfort, convenience, and everyday living. With an{" "}
                  <strong className="font-semibold text-olive-800">OC received</strong> status,{" "}
                  <strong className="font-semibold text-olive-800">ready amenities</strong>, and a{" "}
                  <strong className="font-semibold text-olive-800">ready sample building</strong>, the project offers
                  a well-established setting for modern lifestyles.
                </p>
                <p className="mt-4 text-lg leading-relaxed text-olive-900/85">
                  From a Ganpati Mandir within the complex to thoughtfully planned recreational and community spaces,
                  every element is designed to make everyday life more enjoyable, convenient, and connected.
                </p>
              </div>
              <ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4" data-reveal>
                {["OC received", "Ready amenities", "Sample building ready", "5 min from Saphale station"].map((fact) => (
                  <li
                    key={fact}
                    className="rounded-xl border border-olive-800/15 bg-white/70 px-4 py-4 text-center font-poppins text-sm font-medium text-olive-800 backdrop-blur"
                  >
                    {fact}
                  </li>
                ))}
              </ul>
            </div>

            <div id="about-us" className="container-x mt-20 grid items-center gap-10 sm:mt-28 lg:grid-cols-2">
              <div>
                <AcaciaTitle>About project</AcaciaTitle>
                <div className="mt-6 space-y-4 text-lg leading-relaxed text-olive-900/85" data-reveal>
                  <p>
                    At Acacia, every day has its own rhythm. Residences, commercial spaces, and lifestyle amenities
                    come together to make room for fitness, leisure, connection, and everything in between.
                  </p>
                  <p>
                    A community where there’s always something to do, somewhere to unwind and more ways to enjoy the
                    everyday.
                  </p>
                </div>
                <CallbackButton
                  source="About project"
                  className="mt-8 inline-flex items-center gap-2 rounded-full bg-olive-800 px-7 py-3 font-poppins font-semibold text-olive-50 transition hover:bg-olive-900"
                >
                  Who am I? <ArrowRightIcon className="size-4" />
                </CallbackButton>
              </div>
              <div data-reveal>
                <Image
                  src={hands}
                  alt="Codename Acacia plaque held in sculpted hands above a bed of greenery"
                  placeholder="blur"
                  sizes="(min-width: 1024px) 45vw, 90vw"
                  className="mx-auto w-full max-w-lg"
                />
              </div>
            </div>
          </LeafSection>

          <BorderStrip />

          {/* Highlights */}
          <section id="highlights" className="bg-olive-800 py-16 sm:py-24">
            <div className="container-x">
              <AcaciaTitle tone="light">Project highlights</AcaciaTitle>
              <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {highlights.map((item, i) => (
                  <article
                    key={item.title}
                    data-reveal
                    style={{ "--reveal-delay": `${(i % 3) * 100}ms` } as CSSProperties}
                    className="group rounded-xl bg-white p-7 text-center shadow-lg transition hover:-translate-y-1"
                  >
                    <span className="mx-auto grid size-16 place-items-center rounded-full bg-olive-50 text-olive-800 transition group-hover:bg-olive-800 group-hover:text-olive-50">
                      <AcaciaIcon name={item.icon} className="size-8" />
                    </span>
                    <h3 className="mt-5 font-poppins text-base font-semibold tracking-wide text-olive-900 uppercase">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-olive-900/75">{item.text}</p>
                  </article>
                ))}
              </div>
              <CallbackButton
                source="Highlights"
                className="mt-10 inline-flex items-center gap-2 rounded-full border border-olive-50/60 bg-olive-50 px-7 py-3 font-poppins font-semibold text-olive-800 transition hover:bg-white"
              >
                Enquire now <ArrowRightIcon className="size-4" />
              </CallbackButton>
            </div>
          </section>

          <BorderStrip />

          {/* Amenities */}
          <section id="amenities" className="relative overflow-hidden bg-olive-800 py-16 sm:py-24">
            <div className="absolute inset-x-0 top-0 h-[55%] bg-olive-50 bg-[url('/images/acacia/leaf-pattern.webp')] bg-[length:900px_auto]" />
            <div className="container-x relative">
              <AcaciaTitle>Amenities</AcaciaTitle>
              <div className="mt-10" data-reveal>
                <Carousel label="Amenities" tone="dark" itemClassName="basis-[82%] sm:basis-[calc((100%-1.25rem)/2)] lg:basis-[calc((100%-2.5rem)/3)]">
                  {amenities.map((amenity) => (
                    <figure key={amenity.title} className="flex h-full flex-col">
                      <div className="relative aspect-[4/5] overflow-hidden rounded-xl border-4 border-white bg-olive-100 shadow-xl">
                        <Image
                          src={amenity.image}
                          alt={amenity.title}
                          fill
                          placeholder="blur"
                          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 80vw"
                          className="object-cover transition duration-700 hover:scale-105"
                        />
                      </div>
                      <figcaption className="mt-6 px-2 text-center">
                        <h3 className="font-poppins text-xl font-semibold text-white">{amenity.title}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-olive-50/75">{amenity.text}</p>
                      </figcaption>
                    </figure>
                  ))}
                </Carousel>
              </div>
            </div>
          </section>

          {/* Shops & offices */}
          {/* Laid out like the old site: price and copy sit over the artwork, either side of the shopper */}
          <section className="relative bg-olive-50 bg-[url('/images/acacia/leaf-pattern.webp')] bg-[length:900px_auto]">
            {/* Phones: the overlay text would be too small, so it stacks above the artwork */}
            <div className="container-x pt-12 text-center md:hidden" data-reveal>
              <p className="font-poppins text-2xl font-medium tracking-wide text-olive-800 uppercase">Shops &amp; offices</p>
              <p className="mt-1 font-poppins text-[11px] font-medium tracking-[0.35em] text-olive-800 uppercase">
                Starting from
              </p>
              <p className="mt-1 font-poppins text-5xl font-medium text-[#4a2e22]">{acacia.prices.commercial}</p>
              <p className="mx-auto mt-4 max-w-sm font-poppins text-sm leading-relaxed text-olive-900/85">
                Give your business an address that works for you. Rajlaxmi Acacia offers road-facing commercial spaces
                designed for visibility, accessibility, and everyday convenience.
              </p>
            </div>

            <div className="@container relative">
              <Image
                src={shopsOffices}
                alt="Road-facing shops and offices at Rajlaxmi Acacia with a shopper in the foreground"
                placeholder="blur"
                sizes="100vw"
                className="w-full"
              />
              <div className="absolute top-[11%] left-[10%] hidden w-[17.5%] text-center whitespace-nowrap md:block" data-reveal>
                <p className="font-poppins text-[2cqw] leading-tight font-medium tracking-wide text-olive-800 uppercase [text-shadow:0_0_12px_#fcf9de]">
                  Shops &amp; offices
                </p>
                <p className="mt-[0.3cqw] font-poppins text-[0.78cqw] font-medium tracking-[0.35em] text-olive-800 uppercase">
                  Starting from
                </p>
                <p className="font-poppins text-[3.3cqw] leading-tight font-medium text-[#4a2e22]">
                  {acacia.prices.commercial}
                </p>
              </div>
              <p
                className="absolute top-[10%] right-[8.5%] hidden w-[18.5%] text-right font-poppins text-[0.82cqw] leading-[1.5] text-olive-900 md:block"
                data-reveal
              >
                Give your business an address that works for you. Rajlaxmi Acacia offers road-facing commercial spaces
                designed for visibility, accessibility, and everyday convenience.
              </p>
            </div>
          </section>

          <BorderStrip />

          {/* Configuration */}
          <LeafSection id="configuration">
            <div className="container-x">
              <AcaciaTitle>Configuration</AcaciaTitle>
              <div className="mt-12 grid gap-6 md:grid-cols-3">
                {configurations.map((config, i) => (
                  <article
                    key={config.title}
                    data-reveal
                    style={{ "--reveal-delay": `${i * 100}ms` } as CSSProperties}
                    className="relative overflow-hidden rounded-xl bg-olive-800 p-8 text-olive-50 shadow-xl"
                  >
                    <span className="absolute -top-6 -right-2 font-poppins text-8xl font-bold text-white/5">0{i + 1}</span>
                    <span className="inline-block border border-olive-50/40 px-3 py-1 font-poppins text-[11px] tracking-[0.2em] uppercase">
                      {config.tag}
                    </span>
                    <h3 className="mt-5 font-poppins text-2xl font-semibold">{config.title}</h3>
                    <p className="mt-1 text-sm text-olive-50/70">{config.text}</p>
                    <div className="mt-6 h-px w-16 bg-olive-50/30" />
                    <CallbackButton
                      source={`Configuration: ${config.title}`}
                      interest={config.interest}
                      className="mt-6 flex w-full items-center justify-center gap-2 border border-olive-50/40 py-3 font-poppins text-xs font-medium tracking-[0.2em] uppercase transition hover:bg-olive-50 hover:text-olive-800"
                    >
                      Get details <ArrowRightIcon className="size-4" />
                    </CallbackButton>
                  </article>
                ))}
              </div>
            </div>
          </LeafSection>

          <BorderStrip />

          {/* Connectivity */}
          <section id="connectivity" className="bg-olive-800 py-16 sm:py-24">
            <div className="container-x">
              <AcaciaTitle tone="light">Connectivity</AcaciaTitle>
              <div className="mt-12 grid gap-8 lg:grid-cols-2">
                <div data-reveal>
                  <MapEmbed src={acacia.mapEmbed} title="Raajlaxmi Park, Saphale on Google Maps" className="h-[380px] lg:h-full lg:min-h-[460px]" />
                </div>
                <div className="grid gap-4 sm:grid-cols-2" data-reveal>
                  {nearby.map((group, i) => (
                    <div key={group.title} className={`rounded-xl bg-olive-50 p-5 ${i === 0 ? "sm:col-span-2" : ""}`}>
                      <h3 className="flex items-center gap-2 font-poppins text-sm font-semibold tracking-wider text-olive-800 uppercase">
                        <AcaciaIcon name={group.icon} className="size-5" /> {group.title}
                      </h3>
                      <ul className={`mt-3 grid gap-1.5 text-sm text-olive-900/80 ${i === 0 ? "sm:grid-cols-2" : ""}`}>
                        {group.places.map((place) => (
                          <li key={place} className="flex items-center gap-2">
                            <ArrowRightIcon className="size-3.5 shrink-0 text-olive-700" /> {place}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                  <CallbackButton
                    source="Connectivity"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-olive-50 px-7 py-3 font-poppins font-semibold text-olive-800 transition hover:bg-white sm:col-span-2 sm:justify-self-start"
                  >
                    Book a site visit <ArrowRightIcon className="size-4" />
                  </CallbackButton>
                </div>
              </div>
            </div>
          </section>

          <BorderStrip />

          {/* Contact */}
          <LeafSection id="contact-us">
            <div className="container-x">
              <AcaciaTitle>Contact us</AcaciaTitle>
              <div className="mt-10 grid overflow-hidden rounded-3xl shadow-2xl lg:grid-cols-5" data-reveal>
                <div className="bg-olive-800 p-8 text-olive-50 sm:p-10 lg:col-span-2">
                  <h3 className="font-poppins text-2xl font-semibold uppercase">{acacia.fullName}</h3>
                  <ul className="mt-8 divide-y divide-olive-50/15">
                    {[
                      { icon: PinIcon, label: "Site address", body: acacia.siteAddress },
                      {
                        icon: PhoneIcon,
                        label: "Call us",
                        body: acacia.phones.map((phone, i) => (
                          <span key={phone}>
                            {i > 0 && " | "}
                            <a href={telHref(phone)} className="hover:underline">
                              {phone.replace(/(\d{5})(\d{5})/, "$1 $2")}
                            </a>
                          </span>
                        )),
                      },
                      {
                        icon: MailIcon,
                        label: "Email",
                        body: (
                          <a href={`mailto:${acacia.email}`} className="break-all hover:underline">
                            {acacia.email}
                          </a>
                        ),
                      },
                      {
                        icon: () => <span className="font-poppins text-[10px] font-bold">RERA</span>,
                        label: "RERA registration",
                        body: (
                          <>
                            {acacia.rera} ·{" "}
                            <a href={acacia.reraSite} target="_blank" rel="noopener noreferrer" className="underline">
                              maharera.maharashtra.gov.in
                            </a>
                          </>
                        ),
                      },
                    ].map(({ icon: Icon, label, body }) => (
                      <li key={label} className="flex gap-4 py-4">
                        <span className="grid size-10 shrink-0 place-items-center rounded-full bg-olive-50/10">
                          <Icon className="size-4" />
                        </span>
                        <div>
                          <p className="font-poppins text-[11px] font-semibold tracking-[0.2em] text-olive-50/60 uppercase">{label}</p>
                          <p className="mt-1 text-sm">{body}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 flex gap-3">
                    {[
                      { href: acacia.social.facebook, label: "Facebook", Icon: FacebookIcon },
                      { href: acacia.social.instagram, label: "Instagram", Icon: InstagramIcon },
                      { href: whatsappHref(acacia.whatsapp, acacia.whatsappMessage), label: "WhatsApp", Icon: WhatsAppIcon },
                    ].map(({ href, label, Icon }) => (
                      <a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={label}
                        className="grid size-10 place-items-center rounded-full border border-olive-50/40 transition hover:bg-olive-50 hover:text-olive-800"
                      >
                        <Icon className="size-4" />
                      </a>
                    ))}
                  </div>
                </div>
                <div className="bg-white p-8 sm:p-10 lg:col-span-3">
                  <h3 className="font-poppins text-2xl font-semibold text-olive-800 uppercase">Talk to us</h3>
                  <p className="mt-2 mb-8 text-olive-900/75">
                    Something about Acacia caught your eye? Leave your details and let’s take the next step together.
                  </p>
                  <AcaciaLeadForm source="Contact section" />
                </div>
              </div>
            </div>
          </LeafSection>

          <BorderStrip />

          {/* Project by + RERA */}
          <LeafSection className="!pb-10">
            <div className="container-x">
              <AcaciaTitle align="center">Project by</AcaciaTitle>
              <Image
                src={groupLogo}
                alt="Rajlaxmi Group of Companies – We understand realty"
                sizes="320px"
                className="mx-auto mt-8 h-auto w-64 sm:w-80"
                data-reveal
              />
              <div className="mt-12 grid gap-4 border-t border-olive-800/20 pt-6 text-sm text-olive-900/80 sm:grid-cols-2">
                <p>
                  <strong className="text-olive-900">Site address:</strong> {acacia.siteAddress}.
                </p>
                <p className="sm:text-right">
                  <a href={`mailto:${acacia.email}`} className="inline-flex items-center gap-2 hover:underline">
                    <MailIcon className="size-4" /> {acacia.email}
                  </a>
                </p>
              </div>
              <div className="mt-8 grid items-center gap-8 lg:grid-cols-5">
                <p className="text-xs leading-relaxed text-olive-900/70 lg:col-span-3">
                  <strong className="text-olive-900">Disclaimer:</strong> Perspectives are an artist’s impression and
                  images shown are for representation purposes only. The plans are subject to changes, modifications or
                  amendments without notice, for a better layout, as suggested by the architects and/or as required by the
                  municipal corporation or other concerned authorities. All amenities and facilities are subject to the
                  approval of the concerned authorities and may change if required. All renderings and maps are
                  artist’s impressions and not an actual depiction of the buildings or landscaping. The developer does
                  not warrant or assume any legal liability or responsibility for the accuracy or completeness of any
                  information disclosed. *Prices are starting prices and exclude applicable taxes and charges.
                </p>
                <div className="flex items-center gap-4 lg:col-span-2 lg:justify-end">
                  <Image src={reraLogo} alt="MahaRERA" sizes="64px" className="size-16" />
                  <div className="text-xs text-olive-900/80">
                    <p>This project, Raajlaxmi Park, is registered under MahaRERA registration number</p>
                    <p className="font-poppins text-2xl font-bold text-olive-900">{acacia.rera}</p>
                    <p>
                      Available on{" "}
                      <a href={acacia.reraSite} target="_blank" rel="noopener noreferrer" className="underline">
                        maharera.maharashtra.gov.in
                      </a>
                    </p>
                  </div>
                  <Image src={reraQr} alt={`MahaRERA QR code for ${acacia.rera}`} sizes="88px" className="size-20 bg-white p-1" />
                </div>
              </div>
            </div>
          </LeafSection>
        </main>

        <ActionBar />
      </CallbackProvider>
    </div>
  );
}
