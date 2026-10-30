import Image from "next/image";
import Link from "next/link";
import heroBg from "@/public/images/backgrounds/construction-sunset.webp";

/** Banner at the top of every inner page, matching the old site's construction-sunset header. */
export default function PageHero({
  title,
  subtitle,
  crumb,
}: {
  title: string;
  subtitle?: string;
  crumb: string;
}) {
  return (
    <section className="relative isolate flex min-h-[340px] items-end overflow-hidden bg-navy-950 pt-[72px] sm:min-h-[400px]">
      <Image
        src={heroBg}
        alt=""
        fill
        preload
        placeholder="blur"
        sizes="100vw"
        className="-z-10 object-cover object-center opacity-60"
      />
      <div className="absolute inset-0 -z-10 bg-linear-to-t from-navy-950 via-navy-950/60 to-navy-950/10" />
      <div className="container-x pb-12 sm:pb-16">
        <nav aria-label="Breadcrumb" className="animate-fade-up text-xs tracking-[0.2em] text-white/60 uppercase">
          <Link href="/" className="transition hover:text-gold-400">
            Home
          </Link>
          <span className="mx-2 text-gold-500">/</span>
          <span className="text-white/90">{crumb}</span>
        </nav>
        <h1 className="mt-3 animate-fade-up font-display text-4xl text-white [animation-delay:80ms] sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 max-w-2xl animate-fade-up text-base text-white/75 [animation-delay:160ms] sm:text-lg">
            {subtitle}
          </p>
        )}
        <div className="mt-6 h-0.5 w-16 animate-fade-up bg-gold-500 [animation-delay:200ms]" />
      </div>
    </section>
  );
}
