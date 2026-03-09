import type { MetadataRoute } from "next";
import { getSitemapUrls } from "@/lib/sitemap-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return getSitemapUrls().map((url) => ({
    url,
    lastModified,
    changeFrequency: "daily",
    priority: 0.7,
  }));
}
