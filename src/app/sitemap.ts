import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/spa";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/book", "/privacy-policy", "/terms", "/brand"];
  return routes.map((r) => ({
    url: `${SITE_URL}${r}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: r === "" ? 1 : 0.8,
  }));
}
