import type { StaticImageData } from "next/image";

import pool from "@/public/images/acacia/amenities/swimming-pool.webp";
import indoorGames from "@/public/images/acacia/amenities/indoor-games.webp";
import joggingTrack from "@/public/images/acacia/amenities/jogging-track.webp";
import clubhouse from "@/public/images/acacia/amenities/clubhouse.jpg";
import fitnessZone from "@/public/images/acacia/amenities/fitness-zone.jpg";
import kidsPlay from "@/public/images/acacia/amenities/kids-play-area.jpg";
import amphitheatre from "@/public/images/acacia/amenities/amphitheatre.jpg";
import starGazing from "@/public/images/acacia/amenities/star-gazing.jpg";
import galleryAcacia from "@/public/images/acacia/gallery/acacia-elevation.jpg";
import galleryAerialDusk from "@/public/images/acacia/gallery/aerial-dusk.jpg";
import galleryFront from "@/public/images/acacia/gallery/elevation-front.jpg";
import galleryCorner from "@/public/images/acacia/gallery/elevation-corner.jpg";
import gallerySiteTop from "@/public/images/acacia/gallery/site-top-view.jpg";
import gallerySide from "@/public/images/acacia/gallery/elevation-side.jpg";
import galleryPodium from "@/public/images/acacia/gallery/podium-amenities.jpg";
import galleryAerialDay from "@/public/images/acacia/gallery/aerial-day.jpg";
import galleryWide from "@/public/images/acacia/gallery/elevation-wide.jpg";
import galleryAerialOverview from "@/public/images/acacia/gallery/aerial-overview.jpg";
import galleryRoadside from "@/public/images/acacia/gallery/elevation-roadside.jpg";

export const acacia = {
  name: "Rajlaxmi Acacia",
  fullName: "Raajlaxmi Park — Acacia",
  project: "Raajlaxmi Park – Acacia",
  location: "Saphale West, next to Virar",
  siteAddress: "Rajlaxxmi Park, Saphale, Mande, Maharashtra 401102",
  phones: ["8446002939", "8600402939"],
  whatsapp: "918600402939",
  whatsappMessage:
    "Hi, I'm interested in Rajlaxmi Acacia. I'd like to know more about the project and schedule a site visit. Please let me know the available dates and times. Thank you.",
  // This is the sales mailbox as it exists on the live site (spelled "acasia").
  email: "sales-acasia@raajlaxmi.com",
  rera: "P99000056103",
  reraSite: "https://maharera.maharashtra.gov.in",
  mapEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3759.4214076047283!2d72.79534247584613!3d19.56643873639183!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be70100730f3d09%3A0xdc8ab8770e0c19c4!2sRAJLAXXMI%20PARK!5e0!3m2!1sen!2sin!4v1788438578162!5m2!1sen!2sin",
  // Profiles linked from the live Acacia page (the project's marketing partner).
  social: {
    facebook: "https://www.facebook.com/search/top?q=magnus%20realtor",
    instagram: "https://www.instagram.com/magnus_realtor",
  },
  // Only 1 BHK homes and offices are still on sale; 2 BHK homes and shops are sold out.
  prices: {
    oneBhk: "₹25.47L*",
    office: "₹21.50L*",
  },
} as const;

export const acaciaNav = [
  { id: "overview", label: "Overview" },
  { id: "about-us", label: "About us" },
  { id: "highlights", label: "Highlights" },
  { id: "amenities", label: "Amenities" },
  { id: "configuration", label: "Configuration" },
  { id: "gallery", label: "Gallery" },
  { id: "connectivity", label: "Connectivity" },
  { id: "contact-us", label: "Contact us" },
] as const;

export type HighlightIcon = "temple" | "business" | "pool" | "family" | "shield" | "map";

export const overviewPoints: { icon: HighlightIcon | NearbyIcon; title: string; text: string }[] = [
  { icon: "shield", title: "OC received", text: "Occupancy certificate in hand, so there’s no wait on approvals." },
  { icon: "pool", title: "Ready amenities", text: "Pool, clubhouse, fitness zone and more, already in place." },
  { icon: "business", title: "Sample building ready", text: "Walk through a finished sample building before you decide." },
  { icon: "temple", title: "Ganpati Mandir", text: "A dedicated mandir within the complex." },
  { icon: "map", title: "Road-facing address", text: "Homes and offices planned around comfort and everyday convenience." },
  { icon: "train", title: "5 min from Saphale station", text: "An easy walk to the railway station, market and daily essentials." },
];

export const highlights: { icon: HighlightIcon; title: string; text: string }[] = [
  {
    icon: "temple",
    title: "Ganpati Mandir",
    text: "A dedicated Ganpati Mandir within the complex adds a sense of community and familiarity.",
  },
  {
    icon: "business",
    title: "Business visibility",
    text: "Commercial spaces within a residential development offer a setting designed around accessibility and everyday footfall.",
  },
  {
    icon: "pool",
    title: "Lifestyle amenities",
    text: "From a swimming pool and open gym to indoor games and an amphitheatre, there is something for every age group.",
  },
  {
    icon: "family",
    title: "Spaces for every generation",
    text: "Kids' play areas, senior citizen seating, a library and recreational spaces create an inclusive community environment.",
  },
  {
    icon: "shield",
    title: "Smart safety & convenience",
    text: "CCTV surveillance, solar lighting and stilt parking add practical conveniences to everyday living.",
  },
  {
    icon: "map",
    title: "Well-connected address",
    text: "A road-facing location that keeps everyday travel, accessibility and convenience within easy reach.",
  },
];

export const amenities: { title: string; image: StaticImageData }[] = [
  {
    title: "Swimming pool",
    image: pool,
  },
  {
    title: "Indoor games arena",
    image: indoorGames,
  },
  {
    title: "Jogging & walking track",
    image: joggingTrack,
  },
  {
    title: "Clubhouse",
    image: clubhouse,
  },
  {
    title: "Fitness zone",
    image: fitnessZone,
  },
  {
    title: "Kids’ play area",
    image: kidsPlay,
  },
  {
    title: "Amphitheatre",
    image: amphitheatre,
  },
  {
    title: "Star gazing point",
    image: starGazing,
  },
];

export type GalleryImage = { image: StaticImageData; caption: string; alt: string };

/**
 * Raajlaxmi Park renders. The grid gives the first image a large tile and the 2nd and 7th
 * wide tiles, so keep panoramic shots in those slots.
 */
export const gallery: GalleryImage[] = [
  { image: galleryAcacia, caption: "Acacia elevation", alt: "Acacia: road-facing building with shops on the ground floor" },
  { image: galleryAerialDusk, caption: "Raajlaxmi Park at dusk", alt: "Aerial view of Raajlaxmi Park lit up at dusk" },
  { image: galleryFront, caption: "Residential elevation", alt: "Front elevation of a Raajlaxmi Park residential building" },
  { image: galleryCorner, caption: "Corner view", alt: "Corner view of a Raajlaxmi Park residential building" },
  { image: gallerySiteTop, caption: "Bird’s-eye view", alt: "Top-down view of the Raajlaxmi Park layout and landscaping" },
  { image: gallerySide, caption: "Side elevation", alt: "Side elevation of a Raajlaxmi Park residential building" },
  { image: galleryPodium, caption: "Podium & amenities", alt: "Landscaped podium with swimming pool and play area between the buildings" },
  { image: galleryAerialDay, caption: "Aerial view", alt: "Daytime aerial view of the Raajlaxmi Park buildings" },
  { image: galleryWide, caption: "Full elevation", alt: "Full-length elevation of a Raajlaxmi Park residential building" },
  { image: galleryAerialOverview, caption: "Project overview", alt: "Aerial overview of Raajlaxmi Park and its surroundings" },
  { image: galleryRoadside, caption: "Roadside view", alt: "Raajlaxmi Park building seen from the road with parking in front" },
];

export const interestOptions = ["1 BHK", "Office"] as const;

type Configuration = {
  title: string;
  text: string;
} & (
  | { soldOut?: false; price: string; interest: (typeof interestOptions)[number] }
  | { soldOut: true }
);

export const configurations: Configuration[] = [
  { title: "1 BHK residences", text: "Comfort meets elegance", price: acacia.prices.oneBhk, interest: "1 BHK" },
  { title: "Office spaces", text: "Designed for modern businesses", price: acacia.prices.office, interest: "Office" },
  { title: "2 BHK residences", text: "Spacious homes for growing families", soldOut: true },
  { title: "Shop spaces", text: "Ideal for retail & brands", soldOut: true },
];

export type NearbyIcon = "health" | "temple" | "cart" | "sport" | "train";

export const nearby: { icon: NearbyIcon; title: string; places: string[] }[] = [
  { icon: "train", title: "Connectivity", places: ["Saphale Railway Station – 5 min walk", "Bus depot", "Pargaon Bridge", "Virar–Saphale Jetty"] },
  { icon: "cart", title: "Daily essentials", places: ["Market", "Bank & ATM zone", "Sujal Restaurant"] },
  { icon: "health", title: "Healthcare", places: ["Swaasthyam Hospital"] },
  { icon: "temple", title: "Religious", places: ["Datta Mandir"] },
  { icon: "sport", title: "Sports & recreation", places: ["OMTEX ICWC Cricket Institute"] },
];
