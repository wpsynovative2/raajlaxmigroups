import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import CtaBand from "@/components/sections/CtaBand";
import { BuildingIcon, PinIcon } from "@/components/ui/Icons";
import PageHero from "@/components/ui/PageHero";
import { completedProjects } from "@/lib/data/projects";

export const metadata: Metadata = {
  title: "Completed Projects",
  description:
    "Raajlaxmi Group's delivered projects across Nalasopara, Virar, Vasai and Saphale, including Nakshatra Auris, Raajlaxmi Tower and Midas Heights.",
  alternates: { canonical: "/completed-projects/" },
};

export default function CompletedProjectsPage() {
  return (
    <>
      <PageHero
        title="Completed Projects"
        crumb="Completed projects"
        subtitle="Homes we have built and handed over: a track record you can visit."
      />
      <section className="py-16 sm:py-24">
        <div className="container-x grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {completedProjects.map((project, i) => (
            <article
              key={project.name}
              data-reveal
              style={{ "--reveal-delay": `${(i % 3) * 100}ms` } as CSSProperties}
              className="group overflow-hidden rounded-md bg-white shadow-sm ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative aspect-[16/11] overflow-hidden bg-navy-900">
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={`${project.name}, ${project.location}`}
                    fill
                    placeholder="blur"
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="grid h-full place-items-center bg-linear-to-br from-navy-800 to-navy-950 text-gold-400">
                    <div className="text-center">
                      <BuildingIcon className="mx-auto size-12" />
                      <p className="mt-3 font-display text-xl text-white">{project.name}</p>
                    </div>
                  </div>
                )}
                <span className="absolute top-4 left-4 rounded-sm bg-white/95 px-3 py-1 text-[11px] font-medium tracking-wider text-navy-900 uppercase">
                  Delivered
                </span>
              </div>
              <div className="p-6">
                <h2 className="font-display text-2xl text-navy-900">{project.name}</h2>
                <p className="mt-2 flex items-center gap-2 text-sm text-gold-600">
                  <PinIcon className="size-4" /> {project.location}
                </p>
                <dl className="mt-5 grid grid-cols-2 gap-4 border-t border-black/5 pt-5 text-sm">
                  {project.floors && (
                    <div>
                      <dt className="text-xs tracking-wider text-muted uppercase">Floors</dt>
                      <dd className="mt-1 font-medium text-navy-900">{project.floors}</dd>
                    </div>
                  )}
                  <div className={project.floors ? "" : "col-span-2"}>
                    <dt className="text-xs tracking-wider text-muted uppercase">Units</dt>
                    <dd className="mt-1 font-medium text-navy-900">{project.units}</dd>
                  </div>
                </dl>
              </div>
            </article>
          ))}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
