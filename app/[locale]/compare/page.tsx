import Link from "next/link";
import type { Metadata } from "next";
import { CompareFilterGrid } from "@/components/CompareFilterGrid";
import { comparePairs, getToolBySlug, type Locale } from "@/data/tools";
import { getLocaleFromPath } from "@/lib/i18n";
import { buildMetadata, itemListSchema } from "@/lib/seo";
import { getSiteUrl } from "@/lib/site-url";

type Props = {
  params: { locale: string };
};

type PricingModel = "free" | "freemium" | "paid";

const toolPricing: Record<string, PricingModel> = {
  chatgpt: "freemium",
  claude: "freemium",
  runway: "paid",
  pika: "freemium",
  jasper: "paid",
  "copy-ai": "freemium",
  "github-copilot": "paid",
  "cursor-ai": "freemium",
  midjourney: "paid",
  "dalle-3": "paid",
  "notion-ai": "freemium",
};

export function generateMetadata({ params }: Props): Metadata {
  const locale = getLocaleFromPath(params.locale);
  return buildMetadata({
    locale,
    title: locale === "tr" ? "AI Araç Karşılaştırmaları" : "AI Tool Comparisons",
    description:
      locale === "tr"
        ? "Popüler AI araç karşılaştırmalarını inceleyin."
        : "Browse popular AI tool comparison pages.",
    pathWithoutLocale: "/compare",
  });
}

export default function CompareIndexPage({ params }: Props) {
  const locale = getLocaleFromPath(params.locale) as Locale;
  const entries = comparePairs
    .map((pair) => {
      const left = getToolBySlug(pair.leftToolSlug);
      const right = getToolBySlug(pair.rightToolSlug);
      if (!left || !right) return null;

      return {
        slug: pair.slug,
        title: `${left.name} vs ${right.name}`,
        leftCategory: left.category,
        rightCategory: right.category,
        leftPricing: toolPricing[left.slug] ?? "paid",
        rightPricing: toolPricing[right.slug] ?? "paid",
        score: left.trendingScore + right.trendingScore,
      };
    })
    .filter((entry): entry is NonNullable<typeof entry> => Boolean(entry));

  const schema = itemListSchema(
    getSiteUrl(),
    entries.map((entry) => ({ name: entry.title, slug: `compare/${entry.slug}` }))
  );

  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-bold text-slate-100">
        {locale === "tr" ? "AI araç karşılaştırmaları" : "AI tool comparisons"}
      </h1>
      <p className="max-w-3xl text-slate-300">
        {locale === "tr"
          ? "Hangi AI aracının daha uygun olduğunu hızlıca görmek için karşılaştırma sayfalarını kullan."
          : "Use comparison pages to quickly decide which tool fits your use case."}
      </p>

      <CompareFilterGrid locale={locale} entries={entries} />

      <Link href={`/${locale}/directory`} className="inline-block text-sm text-cyan-300 hover:text-cyan-200">
        {locale === "tr" ? "Tüm araçlara dön" : "Back to all tools"}
      </Link>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </section>
  );
}
