import Image from "next/image";
import Link from "next/link";
import EnquiryButton from "@/components/enquiry/EnquiryButton";
import { ArrowRightIcon, CheckIcon, PinIcon } from "@/components/ui/Icons";
import VideoPlayer from "@/components/ui/VideoPlayer";
import type { OngoingProject } from "@/lib/data/projects";

export default function OngoingProjectCard({ project, reverse }: { project: OngoingProject; reverse?: boolean }) {
  return (
    <article
      id={project.slug}
      data-region={project.region}
      className="grid gap-10 rounded-lg bg-white p-5 shadow-[0_30px_80px_-40px_rgb(14_26_51/0.35)] ring-1 ring-black/5 sm:p-8 lg:grid-cols-2 lg:gap-14 lg:p-12"
    >
      <div className={`space-y-4 ${reverse ? "lg:order-2" : ""}`} data-reveal>
        <div className="relative aspect-[4/3] overflow-hidden rounded-md bg-cream-100">
          <Image
            src={project.cover}
            alt={`${project.name} elevation, ${project.location}`}
            fill
            placeholder="blur"
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="object-cover"
          />
          {project.badge && (
            <span className="absolute top-4 left-4 rounded-sm bg-gold-500 px-3 py-1 text-xs font-medium tracking-wider text-navy-950 uppercase">
              {project.badge}
            </span>
          )}
        </div>
        {(project.gallery.length > 0 || project.video) && (
          <div className="grid grid-cols-3 gap-4">
            {project.gallery.map((image, i) => (
              <div key={i} className="relative aspect-[4/5] overflow-hidden rounded-md bg-cream-100">
                <Image
                  src={image}
                  alt={`${project.name} gallery image ${i + 1}`}
                  fill
                  placeholder="blur"
                  sizes="(min-width: 1024px) 15vw, 33vw"
                  className="object-cover transition duration-500 hover:scale-105"
                />
              </div>
            ))}
            {project.video && (
              <VideoPlayer
                src={project.video.src}
                poster={project.video.poster}
                title={`${project.name} video`}
                className="aspect-[4/5]"
              />
            )}
          </div>
        )}
      </div>

      <div className="flex flex-col justify-center" data-reveal>
        <div className="relative h-20 w-44">
          <Image
            src={project.logo}
            alt={`${project.name} logo`}
            fill
            sizes="176px"
            className="object-contain object-left"
          />
        </div>
        <h2 className="mt-6 font-display text-3xl text-navy-900 sm:text-4xl">{project.name}</h2>
        <p className="mt-2 flex items-center gap-2 text-sm tracking-wider text-gold-600 uppercase">
          <PinIcon className="size-4" /> {project.location}
        </p>
        <p className="mt-5 leading-relaxed text-muted">{project.summary}</p>
        <ul className="mt-6 divide-y divide-black/5 border-y border-black/5">
          {project.highlights.map((highlight) => (
            <li key={highlight} className="flex items-center gap-3 py-3 font-medium text-navy-900">
              <CheckIcon className="size-5 shrink-0 text-rust-600" />
              {highlight}
            </li>
          ))}
        </ul>
        <div className="mt-8 flex flex-wrap gap-3">
          <EnquiryButton project={project.name} />
          {project.pageUrl && (
            <Link href={project.pageUrl} className="btn-outline">
              Explore project <ArrowRightIcon className="size-4" />
            </Link>
          )}
          {project.mapUrl && (
            <a href={project.mapUrl} target="_blank" rel="noopener noreferrer" className="btn-outline">
              <PinIcon className="size-4" /> View location
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
