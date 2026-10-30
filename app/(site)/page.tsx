import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import EnquiryButton from "@/components/enquiry/EnquiryButton";
import ProjectShowcase from "@/components/home/ProjectShowcase";
import BrandsSection from "@/components/sections/BrandsSection";
import CtaBand from "@/components/sections/CtaBand";
import CustomersSection from "@/components/sections/CustomersSection";
import ReviewsSection from "@/components/sections/ReviewsSection";
import CountUp from "@/components/ui/CountUp";
import { ArrowRightIcon, CheckIcon } from "@/components/ui/Icons";
import SectionHeading from "@/components/ui/SectionHeading";
import { stats } from "@/lib/data/brands";
import { ongoingProjects } from "@/lib/data/projects";
import heroDesktop from "@/public/images/home/hero-desktop.webp";
import buildingTrust from "@/public/images/home/building-trust.webp";

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-cream-50 pt-[72px]">
        <div className="relative h-[78svh] min-h-[460px] sm:h-auto sm:min-h-0 sm:aspect-[1600/756]">
          <Image
            src={heroDesktop}
            alt="Raajlaxmi Group – We understand realty. A couple sits on a golden location pin above the city skyline."
            fill
            preload
            placeholder="blur"
            sizes="100vw"
            className="object-cover object-[72%_center] sm:object-center"
          />
          <div className="absolute inset-0 bg-linear-to-t from-navy-950/85 via-navy-950/10 to-transparent sm:bg-linear-to-r sm:from-white/0 sm:via-transparent" />
          <div className="absolute inset-x-0 bottom-0 sm:bottom-[12%]">
            <div className="container-x pb-8 sm:pb-0">
              <div className="max-w-md animate-fade-up [animation-delay:900ms] sm:ml-[1%]">
                <p className="eyebrow text-gold-300 sm:text-rust-600">Vasai · Virar · Nalasopara · Saphale</p>
                <p className="mt-2 font-display text-3xl text-white sm:hidden">Homes built on trust.</p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <Link href="/on-going-projects/" className="btn-primary">
                    Explore projects <ArrowRightIcon className="size-4" />
                  </Link>
                  <EnquiryButton className="btn bg-white text-navy-900 shadow-md hover:bg-cream-100">
                    Enquire now
                  </EnquiryButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Legacy */}
      <section className="relative bg-navy-950 py-16 sm:py-20">
        <div className="container-x">
          <SectionHeading eyebrow="Our legacy" title="Numbers that speak for us" tone="dark" />
          <dl className="mt-12 grid grid-cols-2 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                data-reveal
                style={{ "--reveal-delay": `${i * 90}ms` } as CSSProperties}
                className="border-l border-gold-500/40 pl-5 lg:pl-7"
              >
                <dt className="sr-only">{stat.label}</dt>
                <dd className="font-display text-4xl text-white sm:text-5xl">
                  <CountUp value={stat.value} suffix={stat.suffix} />
                </dd>
                <dd className="mt-2 text-xs tracking-[0.18em] text-gold-300 uppercase">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* About intro */}
      <section className="py-20 sm:py-28">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeading
              eyebrow="Who we are"
              title="Building trust, delivering excellence"
              description="At Raajlaxmi Group, we are committed to delivering exceptional real estate projects with timely possession and completion. Our strong track record reflects our dedication, reliability, and successful project delivery."
            />
            <ul className="mt-8 grid gap-3 sm:grid-cols-2" data-reveal>
              {["Timely possession", "Transparent dealings", "Quality brands only", "Customer-first service"].map((point) => (
                <li key={point} className="flex items-center gap-3 text-navy-900">
                  <span className="grid size-7 place-items-center rounded-full bg-gold-500/15 text-gold-600">
                    <CheckIcon className="size-4" />
                  </span>
                  {point}
                </li>
              ))}
            </ul>
            <p className="mt-6 leading-relaxed text-muted" data-reveal>
              When you choose Raajlaxmi Group, you’re choosing a partner that guarantees quality, timely delivery,
              and a seamless experience.
            </p>
            <Link href="/about-us/" className="btn-primary mt-8" data-reveal>
              About us <ArrowRightIcon className="size-4" />
            </Link>
          </div>
          <div className="relative" data-reveal>
            <div className="absolute -top-5 -right-5 h-full w-full rounded-md border-2 border-gold-500/50" />
            <Image
              src={buildingTrust}
              alt="Excavator at work on a Raajlaxmi construction site at sunrise"
              placeholder="blur"
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="relative rounded-md object-cover shadow-xl"
            />
          </div>
        </div>
      </section>

      {/* Ongoing projects */}
      <section className="bg-cream-100 py-20 sm:py-28">
        <div className="container-x">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeading
              eyebrow="Now building"
              title="On-going projects"
              description="Thoughtfully planned homes and commercial spaces, under construction now."
            />
            <Link href="/on-going-projects/" className="btn-outline shrink-0" data-reveal>
              View all projects
            </Link>
          </div>
          <div className="mt-12" data-reveal>
            <ProjectShowcase
              projects={ongoingProjects.map(({ slug, name, location, summary, feature, badge }) => ({
                slug,
                name,
                location,
                summary,
                feature,
                badge,
              }))}
            />
          </div>
        </div>
      </section>

      <CustomersSection />
      <ReviewsSection />
      <BrandsSection showLink />
      <CtaBand />
    </>
  );
}
