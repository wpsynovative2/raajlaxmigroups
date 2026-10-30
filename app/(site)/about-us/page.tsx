import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import BrandsSection from "@/components/sections/BrandsSection";
import CtaBand from "@/components/sections/CtaBand";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import { stats } from "@/lib/data/brands";
import aboutImage from "@/public/images/about/raajlaxmi-group.webp";
import missionImage from "@/public/images/about/mission.jpg";
import visionImage from "@/public/images/backgrounds/construction-sunset.webp";
import valuesImage from "@/public/images/about/values.jpg";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Raajlaxmi Group has delivered homes across Vasai, Virar, Nalasopara and Saphale for over a decade. Learn about our mission, vision and values.",
  alternates: { canonical: "/about-us/" },
};

const pillars = [
  {
    title: "Our mission",
    image: missionImage,
    text: "Delivering the dream of home ownership everywhere. We are committed to expansion with ethics and efficiency. We foster collaborations and pursue diversification, all with a view to offering unprecedented service to our present and prospective clients.",
  },
  {
    title: "Our vision",
    image: visionImage,
    text: "We visualise to win at our mission, because owning realty provides safety, security and opportunity. We aim to deliver exceptional customer satisfaction as an eminent real estate developer with ethical corporate standards.",
  },
  {
    title: "Our values",
    image: valuesImage,
    text: "“We understand realty.” We work with the highest degree of transparency and integrity, customer-centric deals and no compromise on quality. We deliver what we promise, and we value visionary thinking towards our mission.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero title="About Us" crumb="About us" subtitle="Over a decade of building homes families are proud of." />

      <section className="py-20 sm:py-28">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="relative" data-reveal>
            <Image
              src={aboutImage}
              alt="Residential building under construction by Raajlaxmi Group"
              placeholder="blur"
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="aspect-[4/3] rounded-md object-cover shadow-xl"
            />
            <div className="absolute -right-4 -bottom-6 rounded-md bg-rust-600 px-6 py-5 text-white shadow-xl sm:-right-8">
              <p className="font-display text-4xl">{stats[0].value}+</p>
              <p className="text-xs tracking-[0.2em] uppercase">{stats[0].label}</p>
            </div>
          </div>
          <div>
            <SectionHeading eyebrow="Who we are" title="Raajlaxmi Group" />
            <div className="mt-6 space-y-4 leading-relaxed text-muted" data-reveal>
              <p>
                For over a decade, we’ve been achieving milestones in real estate. We have completed{" "}
                {stats[2].value}+ projects and developed more than {stats[3].value} lakh sq. ft., earning the trust of{" "}
                {stats[1].value.toLocaleString("en-IN")}+ families who have found their dream home in our developments.
              </p>
              <p>
                This milestone underscores our commitment to excellence and our unwavering focus on customer
                satisfaction, with another {stats[4].value} lakh sq. ft. under construction today.
              </p>
            </div>
            <dl className="mt-10 grid grid-cols-3 gap-6 border-t border-black/10 pt-8" data-reveal>
              {stats.slice(1, 4).map((stat) => (
                <div key={stat.label} className="flex flex-col-reverse">
                  <dt className="mt-1 text-xs tracking-wider text-muted uppercase">{stat.label}</dt>
                  <dd className="font-display text-3xl text-rust-600">
                    {stat.value.toLocaleString("en-IN")}
                    {stat.suffix}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="bg-navy-950 py-20 sm:py-28">
        <div className="container-x">
          <SectionHeading eyebrow="What drives us" title="Mission, vision & values" align="center" tone="dark" />
          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {pillars.map((pillar, i) => (
              <article
                key={pillar.title}
                data-reveal
                style={{ "--reveal-delay": `${i * 120}ms` } as CSSProperties}
                className="group overflow-hidden rounded-md bg-white/[0.04] ring-1 ring-white/10"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={pillar.image}
                    alt=""
                    fill
                    placeholder="blur"
                    sizes="(min-width: 1024px) 33vw, 100vw"
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-navy-950/80 to-transparent" />
                  <h3 className="absolute bottom-4 left-6 font-display text-2xl text-white">{pillar.title}</h3>
                </div>
                <p className="p-6 leading-relaxed text-white/75">{pillar.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <BrandsSection />
      <CtaBand />
    </>
  );
}
