import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ShareButtons } from "@/components/ShareButtons";
import {
  comparePairs,
  getComparePairBySlug,
  getToolBySlug,
  getTrendingTools,
} from "@/data/tools";
import { getComparisonContent } from "@/data/compare-content";
import { getLocaleFromPath } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import { getSiteUrl } from "@/lib/site-url";

type Props = {
  params: { locale: string; slug: string };
};

export function generateStaticParams() {
  return ["tr", "en"].flatMap((locale) =>
    comparePairs.map((pair) => ({ locale, slug: pair.slug }))
  );
}

export function generateMetadata({ params }: Props): Metadata {
  const locale = getLocaleFromPath(params.locale);
  const pair = getComparePairBySlug(params.slug);
  if (!pair) return {};

  const left = getToolBySlug(pair.leftToolSlug);
  const right = getToolBySlug(pair.rightToolSlug);
  if (!left || !right) return {};

  const title =
    locale === "tr"
      ? `${left.name} vs ${right.name}: Hangi AI Aracı Daha İyi? (2026)`
      : `${left.name} vs ${right.name}: Which AI Tool Is Better? (2026)`;

  const description =
    locale === "tr"
      ? `${left.name} ve ${right.name} özelliklerini, kullanım senaryolarını ve bağlantılarını karşılaştırın.`
      : `Compare features, use cases and links for ${left.name} and ${right.name}.`;

  return buildMetadata({
    locale,
    title,
    description,
    pathWithoutLocale: `/compare/${pair.slug}`,
  });
}

export default function ComparePage({ params }: Props) {
  const locale = getLocaleFromPath(params.locale);
  const pair = getComparePairBySlug(params.slug);
  if (!pair) notFound();

  const left = getToolBySlug(pair.leftToolSlug);
  const right = getToolBySlug(pair.rightToolSlug);
  if (!left || !right) notFound();

  const comparison = getComparisonContent(pair.slug);
  const rows = comparison?.featureComparison ?? [
    {
      key: "content",
      label: { tr: "İçerik üretimi", en: "Content production" },
      left: left.tags.includes("ai") ? "Strong" : "Limited",
      right: right.tags.includes("ai") ? "Strong" : "Limited",
    },
    {
      key: "automation",
      label: { tr: "Otomasyon", en: "Automation" },
      left: left.tags.includes("automation") ? "Strong" : "Moderate",
      right: right.tags.includes("automation") ? "Strong" : "Moderate",
    },
  ];
  const related = getTrendingTools().filter(
    (tool) => tool.slug !== left.slug && tool.slug !== right.slug
  );
  const pageUrl = `${getSiteUrl()}/${locale}/compare/${pair.slug}`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${left.name} vs ${right.name}`,
    description: `Comparison page for ${left.name} and ${right.name}.`,
    author: {
      "@type": "Organization",
      name: "Global AI Tools",
    },
    mainEntityOfPage: pageUrl,
  };

  const softwareSchema = [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: left.name,
      applicationCategory: left.category,
      operatingSystem: "Web",
      url: left.website,
      description: left.fullDescription[locale],
    },
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: right.name,
      applicationCategory: right.category,
      operatingSystem: "Web",
      url: right.website,
      description: right.fullDescription[locale],
    },
  ];

  const faqItems = comparison?.faqs ?? [
    {
      question: {
        tr: `${left.name} mı ${right.name} mı daha iyi?`,
        en: `Which is better, ${left.name} or ${right.name}?`,
      },
      answer: {
        tr: "İhtiyacınıza göre değişir; hız odaklı işlerde biri, detaylı analizde diğeri öne çıkabilir.",
        en: "It depends on your workflow; one may be faster while the other can be stronger for deeper analysis.",
      },
    },
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((faq) => ({
      "@type": "Question",
      name: faq.question[locale],
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer[locale],
      },
    })),
  };

  return (
    <article className="space-y-8">
      <header className="space-y-3">
        <p className="text-sm uppercase tracking-wider text-cyan-300">Compare</p>
        <h1 className="text-3xl font-bold text-slate-100">
          {left.name} vs {right.name}
        </h1>
        <p className="max-w-3xl text-slate-300">
          {comparison?.heroSummary[locale] ??
            (locale === "tr"
              ? "Özellik, kullanım alanı ve yönlendirme açısından hızlı karşılaştırma."
              : "A quick side-by-side comparison of features, use cases and links.")}
        </p>
        <ShareButtons title={`${left.name} vs ${right.name}`} url={pageUrl} />
      </header>

      <section className="overflow-x-auto rounded-xl border border-slate-800">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-900">
            <tr>
              <th className="px-4 py-3 text-left text-slate-300">Feature</th>
              <th className="px-4 py-3 text-left text-slate-300">{left.name}</th>
              <th className="px-4 py-3 text-left text-slate-300">{right.name}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.key} className="border-t border-slate-800">
                <td className="px-4 py-3 text-slate-200">{row.label[locale]}</td>
                <td className="px-4 py-3 text-slate-300">{row.left}</td>
                <td className="px-4 py-3 text-slate-300">{row.right}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="space-y-3 rounded-xl border border-slate-800 bg-slate-900 p-5">
        <h2 className="text-2xl font-semibold text-slate-100">
          {locale === "tr" ? `${left.name} vs ${right.name}: Hangisi daha uygun?` : `${left.name} vs ${right.name}: Which one fits better?`}
        </h2>
        <p className="text-sm leading-7 text-slate-300">
          {comparison?.longForm[locale] ??
            (locale === "tr"
              ? `${left.name} ve ${right.name} farklı ihtiyaçlara hitap eder. Hızlı uygulama ve günlük görevler için birini, daha detaylı analiz ve uzun bağlam için diğerini tercih edebilirsiniz. Karar verirken ekip büyüklüğü, entegrasyon ihtiyacı ve aylık maliyet gibi kriterleri birlikte değerlendirmek gerekir.`
              : `${left.name} and ${right.name} serve different priorities. One can be better for speed and daily execution, while the other may be stronger for deeper analysis and long-context work. Evaluate team size, integration fit and monthly cost together before deciding.`)}
        </p>
      </section>

      <section className="flex flex-wrap gap-3">
        <a
          href={left.website}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg bg-cyan-500 px-4 py-2 font-medium text-slate-950 hover:bg-cyan-400"
        >
          Visit {left.name}
        </a>
        <a
          href={right.website}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg bg-cyan-500 px-4 py-2 font-medium text-slate-950 hover:bg-cyan-400"
        >
          Visit {right.name}
        </a>
        <Link
          href={`/${locale}/submit-tool`}
          className="rounded-lg border border-slate-700 px-4 py-2 text-slate-200 hover:border-cyan-400"
        >
          Submit your tool
        </Link>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold text-slate-100">{locale === "tr" ? "Sık sorulan sorular" : "Frequently asked questions"}</h2>
        {faqItems.map((faq) => (
          <details key={faq.question.en} className="rounded-xl border border-slate-800 bg-slate-900 p-4">
            <summary className="cursor-pointer font-medium text-slate-100">{faq.question[locale]}</summary>
            <p className="mt-2 text-sm text-slate-300">{faq.answer[locale]}</p>
          </details>
        ))}
      </section>

      <section>
        <h2 className="mb-3 text-2xl font-semibold text-slate-100">
          {locale === "tr" ? "Bu hafta trend olanlar" : "Trending this week"}
        </h2>
        <div className="flex flex-wrap gap-2">
          {related.map((tool) => (
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
          {locale === "tr" ? "Diğer compare sayfaları" : "More comparisons"}
        </h2>
        <div className="flex flex-wrap gap-2">
          {comparePairs
            .filter((entry) => entry.slug !== pair.slug)
            .map((entry) => (
              <Link
                key={entry.slug}
                href={`/${locale}/compare/${entry.slug}`}
                className="rounded-md border border-slate-700 px-3 py-2 text-sm text-slate-200 hover:border-cyan-400"
              >
                {entry.slug.replaceAll("-", " ")}
              </Link>
            ))}
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([articleSchema, faqSchema, ...softwareSchema]) }}
      />
    </article>
  );
}
