function toRobotsTxt(baseUrl: string) {
  return [
    "User-agent: *",
    "Allow: /",
    "",
    `Sitemap: ${baseUrl}/sitemap.xml`,
    `Sitemap: ${baseUrl}/sitemap-main.xml`,
    `Host: ${baseUrl}`,
    "",
  ].join("\n");
}

export async function GET(request: Request) {
  const baseUrl = new URL(request.url).origin;

  return new Response(toRobotsTxt(baseUrl), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, s-maxage=600, stale-while-revalidate=86400",
    },
  });
}
