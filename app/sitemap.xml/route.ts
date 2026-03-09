import { toSitemapXml } from "@/lib/sitemap-data";

export async function GET() {
  return new Response(toSitemapXml(), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=600, stale-while-revalidate=86400",
    },
  });
}
