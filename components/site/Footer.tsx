import Image from "next/image";
import Link from "next/link";
import { cacheLife } from "next/cache";
import { mainNav, site, telHref } from "@/lib/site";
import { ongoingProjects } from "@/lib/data/projects";
import SocialLinks from "./SocialLinks";
import { MailIcon, PhoneIcon, PinIcon } from "@/components/ui/Icons";
import logo from "@/public/images/brand/raajlaxmi-logo.png";
import sketch from "@/public/images/backgrounds/footer-sketch.jpg";

async function CopyrightYear() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}

export default function Footer() {
  const links = mainNav.flatMap((item) => item.children ?? [item]);
  return (
    <footer className="relative isolate overflow-hidden bg-navy-950 text-white/75">
      <Image src={sketch} alt="" fill sizes="100vw" className="-z-10 object-cover opacity-[0.07] grayscale" />
      <div className="h-1 bg-linear-to-r from-rust-600 via-gold-500 to-rust-600" />

      <div className="container-x grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4">
          <div className="inline-block rounded-sm bg-white px-4 py-3">
            <Image src={logo} alt={site.name} className="h-12 w-auto" sizes="180px" />
          </div>
          <p className="mt-6 max-w-sm text-sm leading-relaxed">
            Over a decade of building homes families are proud of, across Vasai, Virar, Nalasopara and
            Saphale, delivered on time with quality you can trust.
          </p>
          <SocialLinks className="mt-6" />
        </div>

        <div className="lg:col-span-2">
          <h2 className="eyebrow text-gold-400">Quick links</h2>
          <ul className="mt-5 space-y-3 text-sm">
            {links.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition hover:text-gold-400">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-2">
          <h2 className="eyebrow text-gold-400">Our projects</h2>
          <ul className="mt-5 space-y-3 text-sm">
            {ongoingProjects.map((project) => (
              <li key={project.slug}>
                <Link href={`/on-going-projects/#${project.slug}`} className="transition hover:text-gold-400">
                  {project.name}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/completed-projects/" className="transition hover:text-gold-400">
                Completed projects
              </Link>
            </li>
          </ul>
        </div>

        <div className="lg:col-span-4">
          <h2 className="eyebrow text-gold-400">Reach out</h2>
          <ul className="mt-5 space-y-4 text-sm">
            <li className="flex gap-3">
              <PhoneIcon className="mt-0.5 size-4 shrink-0 text-gold-400" />
              <span className="flex flex-wrap gap-x-3">
                {site.phones.map((phone) => (
                  <a key={phone} href={telHref(phone)} className="transition hover:text-gold-400">
                    +91 {phone}
                  </a>
                ))}
              </span>
            </li>
            <li className="flex gap-3">
              <PinIcon className="mt-0.5 size-4 shrink-0 text-gold-400" />
              <span>{site.address}</span>
            </li>
            <li className="flex gap-3">
              <MailIcon className="mt-0.5 size-4 shrink-0 text-gold-400" />
              <a href={`mailto:${site.email}`} className="transition hover:text-gold-400">
                {site.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col gap-2 py-6 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © <CopyrightYear /> {site.name}. All rights reserved.
          </p>
          <p className="tracking-[0.2em] uppercase">{site.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
