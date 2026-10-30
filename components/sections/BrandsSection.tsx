import Image from "next/image";
import Link from "next/link";
import { brands } from "@/lib/data/brands";
import SectionHeading from "@/components/ui/SectionHeading";

/** Marquee of the material brands used in Raajlaxmi projects. */
export default function BrandsSection({ showLink = false }: { showLink?: boolean }) {
  const rows = [brands.slice(0, 9), brands.slice(9)];
  return (
    <section id="brands" className="overflow-hidden bg-cream-50 py-20 sm:py-24">
      <div className="container-x flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
        <SectionHeading
          eyebrow="Quality inside every wall"
          title="Brands we use"
          description="We build with materials and fittings from brands India trusts, so the quality you see on day one lasts for years."
        />
        {showLink && (
          <Link href="/about-us/#brands" className="btn-outline shrink-0" data-reveal>
            Know more
          </Link>
        )}
      </div>

      <div className="mt-12 space-y-5 [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
        {rows.map((row, r) => (
          <div key={r} className="group flex w-max">
            {[0, 1].map((copy) => (
              <ul
                key={copy}
                aria-hidden={copy === 1 ? true : undefined}
                className={`flex shrink-0 animate-marquee gap-5 pr-5 group-hover:[animation-play-state:paused] ${
                  r === 1 ? "[animation-direction:reverse]" : ""
                }`}
              >
                {row.map((brand) => (
                  <li
                    key={brand.name}
                    className="grid h-24 w-44 place-items-center rounded-md border border-black/5 bg-white px-5 shadow-sm sm:h-28 sm:w-52"
                    title={`${brand.name}: ${brand.category}`}
                  >
                    <Image
                      src={brand.logo}
                      alt={copy === 0 ? `${brand.name} (${brand.category})` : ""}
                      sizes="160px"
                      className="max-h-14 w-auto max-w-full object-contain"
                    />
                  </li>
                ))}
              </ul>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
