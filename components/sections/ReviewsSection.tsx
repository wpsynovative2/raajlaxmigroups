import { reviews, testimonialVideos } from "@/lib/data/testimonials";
import Carousel from "@/components/ui/Carousel";
import { StarIcon } from "@/components/ui/Icons";
import SectionHeading from "@/components/ui/SectionHeading";
import VideoPlayer from "@/components/ui/VideoPlayer";

export default function ReviewsSection() {
  return (
    <section className="relative overflow-hidden bg-navy-950 py-20 sm:py-28">
      <div className="pointer-events-none absolute -top-40 -right-40 size-[480px] rounded-full bg-gold-500/10 blur-3xl" />
      <div className="container-x relative">
        <SectionHeading
          eyebrow="Satisfaction notes"
          title="Client reviews"
          description="Hear it from the families who live in Raajlaxmi homes."
          align="center"
          tone="dark"
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2" data-reveal>
          {testimonialVideos.map((video) => (
            <VideoPlayer key={video.src} {...video} />
          ))}
        </div>

        <div className="mt-14" data-reveal>
          <Carousel label="Client reviews" tone="dark">
            {reviews.map((review) => (
              <figure
                key={review.name}
                className="flex h-full flex-col rounded-md border border-white/10 bg-white/[0.04] p-7 backdrop-blur"
              >
                <div className="flex gap-1 text-gold-400" aria-label={`${review.rating} out of 5 stars`}>
                  {Array.from({ length: 5 }, (_, i) => (
                    <StarIcon key={i} className={`size-4 ${i < review.rating ? "" : "opacity-25"}`} />
                  ))}
                </div>
                <span aria-hidden="true" className="mt-4 block h-6 font-display text-6xl leading-none text-gold-500/60">
                  “
                </span>
                <blockquote className="mt-2 flex-1 leading-relaxed text-white/80">{review.text}</blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-white/10 pt-5">
                  <span className="grid size-10 place-items-center rounded-full bg-gold-500 font-display text-navy-950">
                    {review.name.charAt(0)}
                  </span>
                  <span className="font-medium text-white">{review.name}</span>
                </figcaption>
              </figure>
            ))}
          </Carousel>
        </div>
      </div>
    </section>
  );
}
