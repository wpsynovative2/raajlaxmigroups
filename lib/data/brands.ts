import type { StaticImageData } from "next/image";

import ultratech from "@/public/images/brands/ultratech.png";
import acc from "@/public/images/brands/acc.png";
import drFixit from "@/public/images/brands/dr-fixit.png";
import asianPaints from "@/public/images/brands/asian-paints.png";
import havells from "@/public/images/brands/havells.png";
import polycab from "@/public/images/brands/polycab.png";
import cera from "@/public/images/brands/cera.png";
import johnson from "@/public/images/brands/johnson-bathware.png";
import sorona from "@/public/images/brands/sorona.jpg";
import prince from "@/public/images/brands/prince.png";
import astral from "@/public/images/brands/astral.png";
import vihan from "@/public/images/brands/vihan.png";
import goldmedal from "@/public/images/brands/goldmedal.png";
import anchor from "@/public/images/brands/anchor.png";
import essco from "@/public/images/brands/essco.png";
import jaquar from "@/public/images/brands/jaquar.jpg";
import sunanda from "@/public/images/brands/sunanda.png";
import dulux from "@/public/images/brands/dulux.png";

export type Brand = { name: string; category: string; logo: StaticImageData };

export const brands: Brand[] = [
  { name: "UltraTech Cement", category: "Cement", logo: ultratech },
  { name: "ACC", category: "Cement", logo: acc },
  { name: "Dr. Fixit", category: "Waterproofing", logo: drFixit },
  { name: "Asian Paints", category: "Paints", logo: asianPaints },
  { name: "Havells", category: "Electricals", logo: havells },
  { name: "Polycab", category: "Wires & cables", logo: polycab },
  { name: "Cera", category: "Sanitaryware", logo: cera },
  { name: "Johnson Bathware", category: "Sanitaryware", logo: johnson },
  { name: "Sorona", category: "Sanitaryware", logo: sorona },
  { name: "Prince", category: "Piping systems", logo: prince },
  { name: "Astral Pipes", category: "Piping systems", logo: astral },
  { name: "Vihan", category: "Fittings", logo: vihan },
  { name: "Goldmedal", category: "Switches", logo: goldmedal },
  { name: "Anchor by Panasonic", category: "Switches", logo: anchor },
  { name: "Essco by Jaquar", category: "Bath fittings", logo: essco },
  { name: "Jaquar", category: "Bath fittings", logo: jaquar },
  { name: "Sunanda", category: "Specialty coatings", logo: sunanda },
  { name: "Dulux", category: "Paints", logo: dulux },
];

export const stats = [
  { value: 13, suffix: "+", label: "Years of excellence" },
  { value: 1500, suffix: "+", label: "Happy families" },
  { value: 13, suffix: "+", label: "Projects completed" },
  { value: 9, suffix: "+", label: "Lakh sq. ft. developed" },
  { value: 10, suffix: "+", label: "Lakh sq. ft. under construction" },
];
