"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { OngoingProject } from "@/lib/data/projects";
import { ArrowRightIcon, PinIcon } from "@/components/ui/Icons";

type Slide = Pick<OngoingProject, "slug" | "name" | "location" | "summary" | "feature" | "badge">;

const AUTOPLAY_MS = 7000;

export default function ProjectShowcase({ projects }: { projects: Slide[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = setTimeout(() => setIndex((i) => (i + 1) % projects.length), AUTOPLAY_MS);
    return () => clearTimeout(timer);
  }, [index, paused, projects.length]);

  const current = projects[index];

  return (
    <div
      className="grid items-center gap-8 lg:grid-cols-12"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-md bg-navy-900 lg:col-span-7">
        {projects.map((project, i) => (
          <Image
            key={project.slug}
            src={project.feature}
            alt={`${project.name}, ${project.location}`}
            fill
            sizes="(min-width: 1024px) 58vw, 100vw"
            placeholder="blur"
            className={`object-cover transition-all duration-1000 ${
              i === index ? "scale-100 opacity-100" : "scale-105 opacity-0"
            }`}
          />
        ))}
        {current.badge && (
          <span className="absolute top-4 left-4 rounded-sm bg-gold-500 px-3 py-1 text-xs font-medium tracking-wider text-navy-950 uppercase">
            {current.badge}
          </span>
        )}
      </div>

      <div className="relative lg:col-span-5 lg:-ml-24">
        <div key={current.slug} className="animate-fade-up rounded-md bg-white p-7 shadow-[0_30px_60px_-25px_rgb(14_26_51/0.35)] sm:p-10">
          <p className="flex items-center gap-2 text-sm tracking-wider text-gold-600 uppercase">
            <PinIcon className="size-4" />
            {current.location}
          </p>
          <h3 className="mt-3 font-display text-3xl text-navy-900 sm:text-4xl">{current.name}</h3>
          <p className="mt-4 leading-relaxed text-muted">{current.summary}</p>
          <Link href={`/on-going-projects/#${current.slug}`} className="btn-primary mt-7">
            Know more <ArrowRightIcon className="size-4" />
          </Link>
        </div>

        <div className="mt-6 flex items-center gap-3" role="tablist" aria-label="Projects">
          {projects.map((project, i) => (
            <button
              key={project.slug}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={project.name}
              onClick={() => setIndex(i)}
              className="group relative h-1 flex-1 overflow-hidden rounded-full bg-navy-900/10"
            >
              <span
                className={`absolute inset-y-0 left-0 bg-rust-600 ${i < index ? "w-full" : "w-0"}`}
                style={
                  i === index && !paused
                    ? { animation: `progress ${AUTOPLAY_MS}ms linear forwards` }
                    : i === index
                      ? { width: "100%" }
                      : undefined
                }
              />
            </button>
          ))}
          <style>{`@keyframes progress{from{width:0}to{width:100%}}`}</style>
        </div>
        <p className="mt-3 text-sm text-muted">
          <span className="font-display text-lg text-navy-900">{String(index + 1).padStart(2, "0")}</span> /{" "}
          {String(projects.length).padStart(2, "0")}
        </p>
      </div>
    </div>
  );
}
