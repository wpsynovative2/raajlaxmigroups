import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import RedevelopmentForm from "@/components/forms/RedevelopmentForm";
import { ArrowRightIcon } from "@/components/ui/Icons";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import VideoPlayer from "@/components/ui/VideoPlayer";
import skyline from "@/public/images/redevelopment/mumbai-skyline.webp";
import shantiNiwas from "@/public/images/projects/shanti-niwas/render.webp";

export const metadata: Metadata = {
  title: "Redevelopment",
  description:
    "Redevelop your society with Raajlaxmi Group: timely delivery, innovative design, quality construction and complete transparency.",
  alternates: { canonical: "/redevelopment/" },
};

const promises = [
  { title: "Timely delivery", text: "Clear timelines from approval to possession, and a track record of keeping them." },
  { title: "Innovative design", text: "Modern layouts, better amenities and more value from your existing land." },
  { title: "Quality construction", text: "Built with trusted brands and checked at every stage of construction." },
  { title: "Complete transparency", text: "Open communication with your committee and members, every step of the way." },
];

export default function RedevelopmentPage() {
  return (
    <>
      <PageHero
        title="Redevelopment"
        crumb="Redevelopment"
        subtitle="Transforming dreams into reality: embrace the future of redevelopment with us."
      />

      <section className="py-20 sm:py-28">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div data-reveal>
            <Image
              src={skyline}
              alt="Modern high-rise towers rising over the Mumbai skyline"
              placeholder="blur"
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="aspect-[4/3] rounded-md object-cover shadow-xl"
            />
          </div>
          <div>
            <SectionHeading eyebrow="Rebuilding lives" title="Redevelop for a better future" />
            <div className="mt-6 space-y-4 leading-relaxed text-muted" data-reveal>
              <p>
                Redevelopment isn’t just about rebuilding. It’s about transforming lifestyles and securing a better
                future. As a trusted builder, we ensure timely delivery, innovative design, and seamless execution.
              </p>
              <p>
                With quality construction, transparency, and a customer-first approach, we’ve turned societies into
                thriving communities. Our happy customers are a testament to our commitment.
              </p>
              <p className="font-medium text-navy-900">
                Experience a new home built on trust, excellence, and care. Let’s reimagine the future, together.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-navy-950 py-20 sm:py-24">
        <div className="container-x">
          <SectionHeading eyebrow="Our promise" title="Why societies choose Raajlaxmi" tone="dark" align="center" />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {promises.map((promise, i) => (
              <div key={promise.title} data-reveal className="rounded-md border border-white/10 p-7">
                <span className="font-display text-3xl text-gold-500">0{i + 1}</span>
                <h3 className="mt-4 font-display text-xl text-white">{promise.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/65">{promise.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 grid items-center gap-8 overflow-hidden rounded-md bg-white/[0.04] ring-1 ring-white/10 md:grid-cols-2" data-reveal>
            <div className="relative aspect-[4/3] md:aspect-auto md:h-full">
              <Image src={shantiNiwas} alt="Shanti Niwas redevelopment, Virar West" fill placeholder="blur" sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
            </div>
            <div className="p-8 md:py-12 md:pr-12 md:pl-0">
              <p className="eyebrow text-gold-400">Redevelopment in progress</p>
              <h3 className="mt-2 font-display text-3xl text-white">Shanti Niwas, Virar (W)</h3>
              <p className="mt-3 text-white/70">
                An established society on Station Road, being rebuilt into 97 homes and 10 shops with 10+ rooftop
                amenities.
              </p>
              <Link href="/on-going-projects/#shanti-niwas" className="btn-gold mt-6">
                See the project <ArrowRightIcon className="size-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="enquiry" className="bg-cream-100 py-20 sm:py-28">
        <div className="container-x grid items-start gap-12 lg:grid-cols-5">
          <div className="mx-auto w-full max-w-sm lg:col-span-2" data-reveal>
            <VideoPlayer
              src="/videos/redevelopment.mp4"
              poster="/videos/posters/redevelopment.jpg"
              title="Raajlaxmi Group redevelopment"
              className="aspect-[9/16] shadow-xl"
            />
          </div>
          <div className="rounded-md bg-white p-6 shadow-xl ring-1 ring-black/5 sm:p-10 lg:col-span-3" data-reveal>
            <p className="eyebrow text-gold-600">Fill in &amp; let’s talk</p>
            <h2 className="mt-2 font-display text-3xl text-navy-900 sm:text-4xl">Want to transform your society?</h2>
            <p className="mt-3 mb-8 text-muted">
              Share a few details and our redevelopment team will get in touch for a free, no-obligation discussion.
            </p>
            <RedevelopmentForm />
          </div>
        </div>
      </section>
    </>
  );
}
