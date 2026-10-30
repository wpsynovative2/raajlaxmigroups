import EnquiryButton from "@/components/enquiry/EnquiryButton";
import { PhoneIcon } from "@/components/ui/Icons";
import { site, telHref } from "@/lib/site";

export default function CtaBand({
  title = "Ready to find your dream home?",
  text = "Talk to our team about pricing, availability and site visits.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="bg-rust-600">
      <div className="container-x flex flex-col items-start justify-between gap-6 py-14 lg:flex-row lg:items-center" data-reveal>
        <div>
          <h2 className="font-display text-3xl text-white sm:text-4xl">{title}</h2>
          <p className="mt-2 text-white/80">{text}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <EnquiryButton className="btn bg-white text-rust-700 hover:bg-cream-100">Enquire now</EnquiryButton>
          <a href={telHref(site.phones[0])} className="btn-outline-light">
            <PhoneIcon className="size-4" /> +91 {site.phones[0]}
          </a>
        </div>
      </div>
    </section>
  );
}
