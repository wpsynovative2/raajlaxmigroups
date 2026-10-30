import type { StaticImageData } from "next/image";

import mayurParmar from "@/public/images/customers/mayur-dinesh-parmar-family.jpg";
import mayurParmar2 from "@/public/images/customers/mayur-dinesh-parmar-family-2.jpg";
import raghvendraBachewar from "@/public/images/customers/raghvendra-bachewar-family.jpg";
import amitMishra from "@/public/images/customers/amit-mishra-family.jpg";
import arunRai from "@/public/images/customers/arun-rai-family.jpg";
import dhirajPanchal from "@/public/images/customers/dhiraj-panchal-family.jpg";
import vaibhavParalkar from "@/public/images/customers/vaibhav-paralkar.jpg";
import anujaGhadi from "@/public/images/customers/anuja-ghadi.jpg";
import munnalalGupta from "@/public/images/customers/munnalal-gupta.jpg";
import ojasKadam from "@/public/images/customers/ojas-kadam.jpg";
import shambhuGupta from "@/public/images/customers/shambhu-gupta.jpg";
import vishalDoijade from "@/public/images/customers/vishal-mohan-doijade.jpg";
import pritiJadhav from "@/public/images/customers/priti-pramod-jadhav.jpg";

export type Review = { name: string; rating: number; text: string };

export const reviews: Review[] = [
  {
    name: "Vikas Gupta",
    rating: 4,
    text: "The building is modern, well-maintained, and offers a range of excellent amenities. The apartments are spacious, with ample natural light and great ventilation. The location is perfect, with easy access to shops, schools, and public transport.",
  },
  {
    name: "Bhavna Randive",
    rating: 4,
    text: "Good society with the best amenities. Very clean surroundings. I love the security system provided. The view is also good.",
  },
  {
    name: "Brijesh Yadav",
    rating: 4,
    text: "Superb, excellent building. Staff are very polite, and the infrastructure and environment are very peaceful. I recommend everyone visit for the natural beauty.",
  },
  {
    name: "Lucky Champ",
    rating: 4,
    text: "Really amazing night view, and the security staff are very particular about their job. Most importantly, everything the builder committed was delivered at possession: water supply on time, an entry lobby that looks amazing and an open gym for workouts.",
  },
  {
    name: "Manthan Negandhi",
    rating: 4,
    text: "Honest review: a nice landscaped project, with towers of up to 14 floors, which is quite an achievement in the Vasai East zone. Easily accessible from highway NH-48, a prime connecting route between the northern and southern parts of the region.",
  },
];

export type CustomerMoment = { name: string; project: string; image: StaticImageData };

export const customerMoments: CustomerMoment[] = [
  { name: "Priti Pramod Jadhav & family", project: "Shanti Niwas", image: pritiJadhav },
  { name: "Mayur Dinesh Parmar & family", project: "Shanti Niwas", image: mayurParmar2 },
  { name: "Mayur Dinesh Parmar & family", project: "Shanti Niwas", image: mayurParmar },
  { name: "Raghvendra Bachewar & family", project: "Shanti Niwas", image: raghvendraBachewar },
  { name: "Shambhu Gupta & family", project: "Raajlaxmi Park", image: shambhuGupta },
  { name: "Anuja Ghadi & family", project: "Raajlaxmi Park", image: anujaGhadi },
  { name: "Vaibhav Paralkar & family", project: "Raajlaxmi Park", image: vaibhavParalkar },
  { name: "Vishal Mohan Doijade & family", project: "Raajlaxmi Park", image: vishalDoijade },
  { name: "Munnalal Gupta & family", project: "Raajlaxmi Park", image: munnalalGupta },
  { name: "Ojas Kadam & family", project: "Raajlaxmi Park", image: ojasKadam },
  { name: "Amit Mishra & family", project: "Nakshatra Auris", image: amitMishra },
  { name: "Arun Rai & family", project: "Nakshatra Auris", image: arunRai },
  { name: "Dhiraj Panchal & family", project: "Nakshatra Auris", image: dhirajPanchal },
];

/** Customer video stories shown on the home and testimonials pages. */
export const testimonialVideos = [
  { src: "/videos/customer-stories-1.mp4", poster: "/videos/posters/customer-stories-1.jpg", title: "Customer stories" },
  { src: "/videos/customer-stories-2.mp4", poster: "/videos/posters/customer-stories-2.jpg", title: "Raajlaxmi families" },
];
