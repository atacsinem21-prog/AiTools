import { categories, comparePairs, landingSlugs, tools } from "@/data/tools";
import { getSiteUrl } from "@/lib/site-url";

const locales = ["tr", "en"] as const;
const searchSeeds = ["ai-tools", "video-ai", "marketing-ai", "chatgpt", "compare-tools"];

export function getSitemapUrls(baseUrl: string = getSiteUrl()) {

  const staticRoutes = locales.flatMap((locale) => [
    `/${locale}`,
    `/${locale}/directory`,
    `/${locale}/ai-tools`,
    `/${locale}/compare`,
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

  const searchRoutes = locales.flatMap((locale) =>
    searchSeeds.map((seed) => `/${locale}/search/${seed}`)
  );

  // Keep category URLs first to match desired sitemap ordering.
  return [...categoryRoutes, ...staticRoutes, ...toolRoutes, ...compareRoutes, ...searchRoutes].map(
    (path) => `${baseUrl}${path}`
  );
}

export function toSitemapXml() {
  const lastmod = new Date().toISOString().slice(0, 10);
  const urls = getSitemapUrls();

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `  <url>
    <loc>${url}</loc>
    <lastmod>${lastmod}</lastmod>
  </url>`
  )
  .join("\n")}
</urlset>`;
}

export function toSitemapXmlWithBase(baseUrl: string) {
  const lastmod = new Date().toISOString().slice(0, 10);
  const urls = getSitemapUrls(baseUrl);

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `  <url>
    <loc>${url}</loc>
    <lastmod>${lastmod}</lastmod>
  </url>`
  )
  .join("\n")}
</urlset>`;
}
