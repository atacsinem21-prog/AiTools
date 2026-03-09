import { toSitemapXmlWithBase } from "@/lib/sitemap-data";

function fallbackXml(baseUrl: string) {
  const lastmod = new Date().toISOString().slice(0, 10);
  const urls = [
    `${baseUrl}/tr`,
    `${baseUrl}/en`,
    `${baseUrl}/tr/directory`,
    `${baseUrl}/en/directory`,
    `${baseUrl}/tr/compare`,
    `${baseUrl}/en/compare`,
  ];

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

export async function GET(request: Request) {
  const baseUrl = (() => {
    try {
      return new URL(request.url).origin;
    } catch {
      return process.env.NEXT_PUBLIC_SITE_URL ?? "https://ai-tools-gamma-tawny.vercel.app";
    }
  })();

  const xml = (() => {
    try {
      return toSitemapXmlWithBase(baseUrl);
    } catch {
      return fallbackXml(baseUrl);
    }
  })();

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=600, stale-while-revalidate=86400",
    },
  });
}
