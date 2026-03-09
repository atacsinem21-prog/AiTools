import { toSitemapXmlWithBase } from "@/lib/sitemap-data";

export async function GET(request: Request) {
  const baseUrl = new URL(request.url).origin;

  return new Response(toSitemapXmlWithBase(baseUrl), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=600, stale-while-revalidate=86400",
    },
  });
}
