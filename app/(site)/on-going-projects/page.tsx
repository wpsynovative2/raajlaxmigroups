import type { Metadata } from "next";
import OngoingProjectCard from "@/components/projects/OngoingProjectCard";
import RegionFilter from "@/components/projects/RegionFilter";
import CtaBand from "@/components/sections/CtaBand";
import PageHero from "@/components/ui/PageHero";
import { ongoingProjects, regions } from "@/lib/data/projects";

export const metadata: Metadata = {
  title: "On-going Projects",
  description:
    "Explore Raajlaxmi Group's on-going residential and commercial projects in Vasai, Virar and Saphale: Krishna Niwas, Raajlaxmi Park, Aarvi Apartment and Shanti Niwas.",
  alternates: { canonical: "/on-going-projects/" },
};

export default function OngoingProjectsPage() {
  return (
    <>
      <PageHero
        title="On-going Projects"
        crumb="On-going projects"
        subtitle="Homes and commercial spaces under construction across Vasai, Virar and Saphale."
      />
      <section className="bg-cream-100 py-16 sm:py-24">
        <div className="container-x">
          <RegionFilter regions={regions}>
            <div className="mt-12 space-y-10 sm:space-y-14">
              {ongoingProjects.map((project, i) => (
                <OngoingProjectCard key={project.slug} project={project} reverse={i % 2 === 1} />
              ))}
            </div>
          </RegionFilter>
        </div>
      </section>
      <CtaBand title="Want a site visit?" text="Tell us which project you like and we'll arrange a guided visit." />
    </>
  );
}
