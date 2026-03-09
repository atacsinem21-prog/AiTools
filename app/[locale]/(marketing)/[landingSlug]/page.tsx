import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { comparePairs, getTrendingTools, landingSlugs, tools, type Locale } from "@/data/tools";
import { getLocaleFromPath } from "@/lib/i18n";
import { articleSchema, buildMetadata, breadcrumbSchema } from "@/lib/seo";
import { getSiteUrl } from "@/lib/site-url";

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
        ? `${titleText} sayfasında en iyi AI araçlarını ve kategori bağlantılarını bulabilirsin.`
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
  const baseUrl = getSiteUrl();
  const pageUrl = `${baseUrl}/${locale}/${params.landingSlug}`;
  const article = articleSchema({
    title: `${title} ${locale === "tr" ? "rehberi 2026" : "guide 2026"}`,
    description:
      locale === "tr"
        ? `${title} için en iyi AI araçları, kullanım senaryoları ve fiyat/performans önerileri.`
        : `Best AI tools, use cases and value recommendations for ${title}.`,
    url: pageUrl,
  });
  const breadcrumb = breadcrumbSchema([
    { name: locale === "tr" ? "Ana Sayfa" : "Home", url: `${baseUrl}/${locale}` },
    { name: title, url: pageUrl },
  ]);

  return (
    <article className="space-y-6">
      <h1 className="text-3xl font-bold text-slate-100">{title}</h1>
      <p className="max-w-3xl text-slate-300">
        {locale === "tr"
          ? `${title} odaklı bu landing page, Google indexleme ve internal linking gücünü artırmak için optimize edildi.`
          : `This landing page is optimized for indexation and internal linking around ${title}.`}
      </p>

      <section className="space-y-3 rounded-xl border border-slate-800 bg-slate-900 p-5">
        <h2 className="text-xl font-semibold text-slate-100">
          {locale === "tr" ? `${title} neden önemli?` : `Why ${title} matters`}
        </h2>
        <p className="text-sm text-slate-300">
          {locale === "tr"
            ? "Doğru AI aracı seçimi üretim hızını, ekip verimliliğini ve maliyet kontrolünü doğrudan etkiler. Bu sayfada listelenen araçlar, özellikle 2026 trendlerinde öne çıkan kullanım senaryolarına göre seçildi."
            : "Choosing the right AI tool directly impacts speed, team efficiency and cost control. The tools listed on this page are selected around high-intent use cases trending in 2026."}
        </p>
        <p className="text-sm text-slate-300">
          {locale === "tr"
            ? "Nasıl kullanılır: Önce ihtiyacınızı netleştirin, ardından listedeki iki aracı kısa bir pilotla karşılaştırın. Son olarak entegrasyon ve bütçe kriterlerine göre kalıcı karar verin."
            : "How to use: define your exact need, compare two shortlisted tools in a short pilot, then finalize based on integration fit and total cost."}
        </p>
      </section>

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
          {locale === "tr" ? "Karşılaştırma sayfaları" : "Comparison pages"}
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

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([article, breadcrumb]) }} />
    </article>
  );
}
