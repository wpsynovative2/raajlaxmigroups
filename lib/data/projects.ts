import type { StaticImageData } from "next/image";

import aarviElevation from "@/public/images/projects/aarvi-apartment/elevation.webp";
import aarviLogo from "@/public/images/projects/aarvi-apartment/logo.webp";
import aarviGallery1 from "@/public/images/projects/aarvi-apartment/gallery-1.jpg";
import aarviGallery2 from "@/public/images/projects/aarvi-apartment/gallery-2.jpg";
import krishnaElevation from "@/public/images/projects/krishna-niwas/elevation.webp";
import krishnaLogo from "@/public/images/projects/krishna-niwas/logo.png";
import shantiElevation from "@/public/images/projects/shanti-niwas/elevation.webp";
import shantiRender from "@/public/images/projects/shanti-niwas/render.webp";
import shantiLogo from "@/public/images/projects/shanti-niwas/logo.png";
import shantiGallery1 from "@/public/images/projects/shanti-niwas/gallery-1.jpg";
import shantiGallery2 from "@/public/images/projects/shanti-niwas/gallery-2.jpg";
import parkAerial from "@/public/images/projects/raajlaxmi-park/aerial-night.jpg";
import parkAerial2 from "@/public/images/projects/raajlaxmi-park/aerial-night-2.jpg";
import parkLogo from "@/public/images/projects/raajlaxmi-park/logo.png";
import parkGallery1 from "@/public/images/projects/raajlaxmi-park/gallery-1.jpg";
import parkGallery2 from "@/public/images/projects/raajlaxmi-park/gallery-2.jpg";
import acaciaCover from "@/public/images/projects/acacia/cover.webp";
import acaciaLogo from "@/public/images/acacia/acacia-plaque.png";
import acaciaPool from "@/public/images/acacia/amenities/swimming-pool.webp";
import acaciaClubhouse from "@/public/images/acacia/amenities/clubhouse.jpg";
import acaciaKidsPlay from "@/public/images/acacia/amenities/kids-play-area.jpg";

import nakshatraAuris from "@/public/images/completed/nakshatra-auris.jpg";
import raajlaxmiAvenue from "@/public/images/completed/raajlaxmi-avenue.webp";
import raajlaxmiTower from "@/public/images/completed/raajlaxmi-tower.jpg";
import raajlaxmiApartment from "@/public/images/completed/raajlaxmi-apartment.jpg";
import shakunSolitaire from "@/public/images/completed/shakun-solitaire.jpg";
import midasGlory from "@/public/images/completed/midas-glory.jpg";
import midasEnclave from "@/public/images/completed/midas-enclave.jpg";
import midasHeights from "@/public/images/completed/midas-heights.jpg";
import pritiPearl from "@/public/images/completed/priti-pearl.jpg";
import pritiChaaya from "@/public/images/completed/priti-chaaya.jpg";

export type Region = "Vasai" | "Virar" | "Saphale";

export type OngoingProject = {
  slug: string;
  name: string;
  region: Region;
  location: string;
  summary: string;
  highlights: string[];
  badge?: string;
  cover: StaticImageData;
  /** Image used on the home page slider */
  feature: StaticImageData;
  logo: StaticImageData;
  gallery: StaticImageData[];
  video?: { src: string; poster: string };
  mapUrl?: string;
  /** Dedicated project page, if there is one */
  pageUrl?: string;
};

export const ongoingProjects: OngoingProject[] = [
  {
    slug: "acacia",
    name: "Rajlaxmi Acacia",
    region: "Saphale",
    location: "Raajlaxmi Park, Saphale (W)",
    summary:
      "Thoughtfully planned 1 & 2 BHK homes and road-facing shops & offices within Raajlaxmi Park. With OC received, ready amenities and a ready sample building, Acacia is a five-minute walk from Saphale railway station.",
    highlights: [
      "1 & 2 BHK from ₹25.48L*",
      "Shops & offices from ₹14.50L*",
      "OC received · sample building ready",
      "5 min walk from Saphale station",
    ],
    badge: "OC received",
    cover: acaciaCover,
    feature: acaciaCover,
    logo: acaciaLogo,
    gallery: [acaciaPool, acaciaClubhouse, acaciaKidsPlay],
    mapUrl: "https://maps.app.goo.gl/NUWLN9jFeCuVY3wp7",
    pageUrl: "/acacia/",
  },
  {
    slug: "krishna-niwas",
    name: "Krishna Niwas",
    region: "Virar",
    location: "Virar",
    summary:
      "Located in the growing heart of Virar, Krishna Niwas brings together elegant homes, thriving retail spaces, and a lifestyle crafted for every generation. From peaceful rooftop experiences to spaces for recreation and community gatherings, every detail is designed to enrich everyday living.",
    highlights: ["Total units: 59 flats", "11 shops", "Now selling: 33 flats + 1 shop", "10+ amenities"],
    cover: krishnaElevation,
    feature: krishnaElevation,
    logo: krishnaLogo,
    gallery: [],
    // The old site pointed this button at Aarvi Apartment's map pin, so it is left out until the correct pin is added.
  },
  {
    slug: "raajlaxmi-park",
    name: "Raajlaxmi Park",
    region: "Saphale",
    location: "Saphale (W)",
    summary:
      "A community designed for a complete lifestyle. With 6 meticulously planned buildings and over 25 premium amenities, Raajlaxmi Park offers modern living in a serene environment. Featuring 341 thoughtfully crafted flats, this project at Saphale (W) is where comfort meets convenience.",
    highlights: ["6 buildings", "25+ amenities", "Total units: 341 flats"],
    cover: parkAerial2,
    feature: parkAerial,
    logo: parkLogo,
    gallery: [parkGallery1, parkGallery2],
    video: { src: "/videos/raajlaxmi-park.mp4", poster: "/videos/posters/raajlaxmi-park.jpg" },
    mapUrl: "https://maps.app.goo.gl/NUWLN9jFeCuVY3wp7",
  },
  {
    slug: "aarvi-apartment",
    name: "Aarvi Apartment",
    region: "Vasai",
    location: "Vasai (W)",
    summary:
      "Experience boutique living at Aarvi Apartment in Vasai (W), a thoughtfully crafted project with just 30 exclusive flats, 3 shops and 3 offices. Offering 20+ amenities, this intimate community of 36 units combines functionality with modern comforts.",
    highlights: ["30 flats + 3 offices + 3 shops", "20+ amenities", "Total units: 36"],
    cover: aarviElevation,
    feature: aarviElevation,
    logo: aarviLogo,
    gallery: [aarviGallery1, aarviGallery2],
    video: { src: "/videos/aarvi-apartment.mp4", poster: "/videos/posters/aarvi-apartment.jpg" },
    mapUrl: "https://maps.app.goo.gl/ymRLdmXL43P9grww8",
  },
  {
    slug: "shanti-niwas",
    name: "Shanti Niwas",
    region: "Virar",
    location: "Virar (W)",
    summary:
      "Shanti Niwas is a redevelopment project on Station Road, Virar (W), rebuilding an established community into 97 modern homes and 10 shops, crowned with 10+ rooftop amenities, all close to the station, schools and daily conveniences.",
    highlights: ["97 flats + 10 shops", "10+ rooftop amenities", "Total units: 107"],
    badge: "Redevelopment project",
    cover: shantiRender,
    feature: shantiElevation,
    logo: shantiLogo,
    gallery: [shantiGallery1, shantiGallery2],
    video: { src: "/videos/shanti-niwas.mp4", poster: "/videos/posters/shanti-niwas.jpg" },
    mapUrl: "https://maps.app.goo.gl/hVrcbFYaXp7n463b6",
  },
];

export const regions: Region[] = ["Vasai", "Virar", "Saphale"];

export type CompletedProject = {
  name: string;
  location: string;
  floors?: string;
  units: string;
  image?: StaticImageData;
};

export const completedProjects: CompletedProject[] = [
  { name: "Nakshatra Auris", location: "Nalasopara (W)", units: "317 flats + 15 shops · 332 units", image: nakshatraAuris },
  { name: "Raajlaxmi Avenue", location: "Virar (E)", floors: "7 floors", units: "30 flats", image: raajlaxmiAvenue },
  { name: "Raajlaxmi Tower", location: "Waliv, Vasai (E)", floors: "15 floors", units: "324 flats", image: raajlaxmiTower },
  { name: "Raajlaxmi Apartment", location: "Waliv, Vasai (E)", floors: "7 floors", units: "42 flats", image: raajlaxmiApartment },
  { name: "Shakun Solitaire", location: "Range Office, Vasai (E)", floors: "7 floors", units: "28 flats", image: shakunSolitaire },
  { name: "Midas Glory", location: "Nalasopara (E)", floors: "7 floors", units: "41 flats", image: midasGlory },
  { name: "Midas Enclave", location: "Nalasopara (E)", floors: "4 floors", units: "20 flats", image: midasEnclave },
  { name: "Midas Heights", location: "Global City, Virar (W)", floors: "15 floors", units: "103 flats", image: midasHeights },
  { name: "Priti Pearl", location: "Central Park, Saphale (W)", floors: "6 floors", units: "78 flats", image: pritiPearl },
  { name: "Priti Chaaya", location: "Central Park, Saphale (W)", floors: "4 floors", units: "30 flats", image: pritiChaaya },
  { name: "Priti Darpan", location: "Central Park, Saphale (W)", floors: "4 floors", units: "15 flats" },
];
