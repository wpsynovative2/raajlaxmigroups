import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

const routes = [
  { path: "/", priority: 1 },
  { path: "/about-us/", priority: 0.8 },
  { path: "/on-going-projects/", priority: 0.9 },
  { path: "/completed-projects/", priority: 0.7 },
  { path: "/redevelopment/", priority: 0.7 },
  { path: "/testimonials/", priority: 0.6 },
  { path: "/contact-us/", priority: 0.8 },
  { path: "/acacia/", priority: 0.9 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map(({ path, priority }) => ({ url: `${site.url}${path}`, priority }));
}
