import type { MetadataRoute } from "next";
import { categories, comparePairs, landingSlugs, tools } from "@/data/tools";
import { getSiteUrl } from "@/lib/site-url";

const baseUrl = getSiteUrl();
const locales = ["tr", "en"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = locales.flatMap((locale) => [
    `/${locale}`,
    `/${locale}/directory`,
    `/${locale}/ai-tools`,
    `/${locale}/submit-tool`,
    ...landingSlugs.map((slug) => `/${locale}/${slug}`),
  ]);

  const categoryRoutes = locales.flatMap((locale) =>
    categories.map((category) => `/${locale}/ai-tools/${category.slug}`)
  );

  const toolRoutes = locales.flatMap((locale) =>
    tools.map((tool) => `/${locale}/tool/${tool.slug}`)
  );

  const compareRoutes = locales.flatMap((locale) =>
    comparePairs.map((pair) => `/${locale}/compare/${pair.slug}`)
  );

  return [...staticRoutes, ...categoryRoutes, ...toolRoutes, ...compareRoutes].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: path.includes("/tool/") ? 0.8 : 0.7,
  }));
}
