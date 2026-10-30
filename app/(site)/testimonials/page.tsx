import type { Metadata } from "next";
import CtaBand from "@/components/sections/CtaBand";
import CustomersSection from "@/components/sections/CustomersSection";
import ReviewsSection from "@/components/sections/ReviewsSection";
import PageHero from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "Testimonials",
  description: "Reviews, video stories and booking moments from families who chose Raajlaxmi Group homes.",
  alternates: { canonical: "/testimonials/" },
};

export default function TestimonialsPage() {
  return (
    <>
      <PageHero
        title="Testimonials"
        crumb="Testimonials"
        subtitle="The best measure of a home is the family living in it."
      />
      <ReviewsSection />
      <CustomersSection layout="grid" />
      <CtaBand title="Become part of the Raajlaxmi family" />
    </>
  );
}
