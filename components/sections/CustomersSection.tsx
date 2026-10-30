import Image from "next/image";
import { customerMoments } from "@/lib/data/testimonials";
import Carousel from "@/components/ui/Carousel";
import SectionHeading from "@/components/ui/SectionHeading";

export default function CustomersSection({ layout = "carousel" }: { layout?: "carousel" | "grid" }) {
  const cards = customerMoments.map((moment, i) => (
    <figure key={i} className="group overflow-hidden rounded-md bg-white shadow-sm ring-1 ring-black/5">
      <div className="relative aspect-square overflow-hidden bg-cream-100">
        <Image
          src={moment.image}
          alt={`${moment.name} at ${moment.project}`}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 85vw"
          placeholder="blur"
          className="object-cover transition duration-700 group-hover:scale-105"
        />
      </div>
      <figcaption className="px-5 py-4">
        <p className="font-medium text-navy-900">{moment.name}</p>
        <p className="text-sm text-muted">Booked at {moment.project}</p>
      </figcaption>
    </figure>
  ));

  return (
    <section className="py-20 sm:py-24">
      <div className="container-x">
        <SectionHeading
          eyebrow="Our happy customers"
          title="Welcome home, families"
          description="Every booking is a milestone. Here are some of the families who chose Raajlaxmi."
          align="center"
        />
        <div className="mt-12" data-reveal>
          {layout === "carousel" ? (
            <Carousel label="Happy customers">{cards}</Carousel>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{cards}</div>
          )}
        </div>
      </div>
    </section>
  );
}
