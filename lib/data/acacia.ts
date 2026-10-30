import type { StaticImageData } from "next/image";

import pool from "@/public/images/acacia/amenities/swimming-pool.webp";
import indoorGames from "@/public/images/acacia/amenities/indoor-games.webp";
import joggingTrack from "@/public/images/acacia/amenities/jogging-track.webp";
import clubhouse from "@/public/images/acacia/amenities/clubhouse.jpg";
import fitnessZone from "@/public/images/acacia/amenities/fitness-zone.jpg";
import kidsPlay from "@/public/images/acacia/amenities/kids-play-area.jpg";
import amphitheatre from "@/public/images/acacia/amenities/amphitheatre.jpg";
import starGazing from "@/public/images/acacia/amenities/star-gazing.jpg";

export const acacia = {
  name: "Rajlaxmi Acacia",
  fullName: "Raajlaxmi Park — Acacia",
  project: "Raajlaxmi Park – Acacia",
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
  prices: {
    residential: "₹25.48L*",
    commercial: "₹14.50L*",
  },
} as const;

export const acaciaNav = [
  { id: "overview", label: "Overview" },
  { id: "about-us", label: "About us" },
  { id: "highlights", label: "Highlights" },
  { id: "amenities", label: "Amenities" },
  { id: "configuration", label: "Configuration" },
  { id: "connectivity", label: "Connectivity" },
  { id: "contact-us", label: "Contact us" },
] as const;

export type HighlightIcon = "temple" | "business" | "pool" | "family" | "shield" | "map";

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

export const amenities: { title: string; text: string; image: StaticImageData }[] = [
  {
    title: "Swimming pool",
    text: "A refreshing escape within the development, the perfect setting to relax, recharge and make a splash whenever you want.",
    image: pool,
  },
  {
    title: "Indoor games arena",
    text: "Enjoy leisure time with a variety of indoor games in a space built for entertainment, competition and social bonding.",
    image: indoorGames,
  },
  {
    title: "Jogging & walking track",
    text: "Begin your mornings with movement or take a relaxed evening stroll along a track that keeps you active and outdoors.",
    image: joggingTrack,
  },
  {
    title: "Clubhouse",
    text: "A space to come together, unwind and make everyday leisure more enjoyable, whether it’s a quiet evening or time with your community.",
    image: clubhouse,
  },
  {
    title: "Fitness zone",
    text: "Keep your routine close to home with a dedicated space that makes staying active easy and part of your everyday lifestyle.",
    image: fitnessZone,
  },
  {
    title: "Kids’ play area",
    text: "A lively space where little ones can run, play and discover: more fun, more friendships and carefree childhood moments.",
    image: kidsPlay,
  },
  {
    title: "Amphitheatre",
    text: "A vibrant gathering space for performances, celebrations and community moments, bringing people together for evenings worth remembering.",
    image: amphitheatre,
  },
  {
    title: "Star gazing point",
    text: "Slow down, look up and leave the everyday behind at a peaceful spot designed for quiet evenings beneath the open sky.",
    image: starGazing,
  },
];

export const configurations = [
  { tag: "Popular", title: "Shop spaces", text: "Ideal for retail & brands", interest: "Shops & Offices" },
  { tag: "Premium", title: "Office spaces", text: "Designed for modern businesses", interest: "Shops & Offices" },
  { tag: "Luxury", title: "Residential spaces", text: "Comfort meets elegance", interest: "Residential" },
] as const;

export type NearbyIcon = "health" | "temple" | "cart" | "sport" | "train";

export const nearby: { icon: NearbyIcon; title: string; places: string[] }[] = [
  { icon: "train", title: "Connectivity", places: ["Saphale Railway Station – 5 min walk", "Bus depot", "Pargaon Bridge", "Virar–Saphale Jetty"] },
  { icon: "cart", title: "Daily essentials", places: ["Market", "Bank & ATM zone", "Sujal Restaurant"] },
  { icon: "health", title: "Healthcare", places: ["Swaasthyam Hospital"] },
  { icon: "temple", title: "Religious", places: ["Datta Mandir"] },
  { icon: "sport", title: "Sports & recreation", places: ["OMTEX ICWC Cricket Institute"] },
];

export const interestOptions = ["Residential", "Shops & Offices"] as const;
