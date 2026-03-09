import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { comparePairs, getTrendingTools, landingSlugs, tools, type Locale } from "@/data/tools";
import { getLocaleFromPath } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";

type Props = {
  params: { locale: string; landingSlug: string };
};

function humanize(slug: string) {
  return slug.replaceAll("-", " ");
}

export function generateStaticParams() {
  return ["tr", "en"].flatMap((locale) =>
    landingSlugs.map((landingSlug) => ({ locale, landingSlug }))
  );
}

export function generateMetadata({ params }: Props): Metadata {
  const locale = getLocaleFromPath(params.locale);
  if (!landingSlugs.includes(params.landingSlug as (typeof landingSlugs)[number])) {
    return {};
  }

  const titleText = humanize(params.landingSlug);
  return buildMetadata({
    locale,
    title: locale === "tr" ? `${titleText} rehberi` : `${titleText} guide`,
    description:
      locale === "tr"
        ? `${titleText} sayfasinda en iyi AI araclarini ve kategori baglantilarini bulabilirsin.`
        : `Explore the best AI tools and internal category links for ${titleText}.`,
    pathWithoutLocale: `/${params.landingSlug}`,
  });
}

export default function LandingPage({ params }: Props) {
  const locale = getLocaleFromPath(params.locale) as Locale;
  if (!landingSlugs.includes(params.landingSlug as (typeof landingSlugs)[number])) {
    notFound();
  }

  const title = humanize(params.landingSlug);
  const featured = tools.slice(0, 6);
  const trending = getTrendingTools();

  return (
    <article className="space-y-6">
      <h1 className="text-3xl font-bold text-slate-100">{title}</h1>
      <p className="max-w-3xl text-slate-300">
        {locale === "tr"
          ? `${title} odakli bu landing page, Google indexleme ve internal linking gucunu artirmak icin optimize edildi.`
          : `This landing page is optimized for indexation and internal linking around ${title}.`}
      </p>

      <section className="space-y-2">
        {featured.map((tool) => (
          <Link
            key={tool.slug}
            href={`/${locale}/tool/${tool.slug}`}
            className="block rounded-lg border border-slate-800 bg-slate-900 px-4 py-3 hover:border-cyan-300"
          >
            {tool.name}
          </Link>
        ))}
      </section>

      <section>
        <h2 className="mb-3 text-2xl font-semibold text-slate-100">
          {locale === "tr" ? "Bu hafta trend olanlar" : "Trending this week"}
        </h2>
        <div className="flex flex-wrap gap-2">
          {trending.map((tool) => (
            <Link
              key={tool.slug}
              href={`/${locale}/tool/${tool.slug}`}
              className="rounded-md border border-slate-700 px-3 py-2 text-sm text-slate-200 hover:border-cyan-400"
            >
              {tool.name}
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-2xl font-semibold text-slate-100">
          {locale === "tr" ? "Karsilastirma sayfalari" : "Comparison pages"}
        </h2>
        <div className="flex flex-wrap gap-2">
          {comparePairs.map((pair) => (
            <Link
              key={pair.slug}
              href={`/${locale}/compare/${pair.slug}`}
              className="rounded-md border border-slate-700 px-3 py-2 text-sm text-slate-200 hover:border-cyan-400"
            >
              {pair.slug.replaceAll("-", " ")}
            </Link>
          ))}
        </div>
      </section>
    </article>
  );
}
