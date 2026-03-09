import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ToolCard } from "@/components/ToolCard";
import { getLocaleFromPath } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import { comparePairs, getToolBySlug, tools, type Locale } from "@/data/tools";

type Props = {
  params: { locale: string; slug: string };
};

export function generateStaticParams() {
  return ["tr", "en"].flatMap((locale) =>
    tools.map((tool) => ({ locale, slug: tool.slug }))
  );
}

export function generateMetadata({ params }: Props): Metadata {
  const locale = getLocaleFromPath(params.locale);
  const tool = getToolBySlug(params.slug);
  if (!tool) return {};

  return buildMetadata({
    locale,
    title: `${tool.name} - ${locale === "tr" ? "AI Araci" : "AI Tool"}`,
    description: tool.shortDescription[locale],
    pathWithoutLocale: `/tool/${tool.slug}`,
  });
}

export default function ToolDetailPage({ params }: Props) {
  const locale = getLocaleFromPath(params.locale) as Locale;
  const tool = getToolBySlug(params.slug);
  if (!tool) notFound();

  const relatedTools = tools.filter((candidate) => tool.relatedSlugs.includes(candidate.slug));
  const relatedCompares = comparePairs.filter(
    (pair) => pair.leftToolSlug === tool.slug || pair.rightToolSlug === tool.slug
  );

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: tool.name,
    applicationCategory: tool.category,
    operatingSystem: "Web",
    description: tool.fullDescription[locale],
    url: `/${locale}/tool/${tool.slug}`,
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: tool.faqs.map((faq) => ({
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
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <div className="flex flex-col gap-5 md:flex-row md:items-center">
          <Image src={tool.logo} alt={`${tool.name} logo`} width={72} height={72} className="rounded-xl bg-slate-800 p-2" priority />
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-slate-100">{tool.name}</h1>
            <p className="text-slate-300">{tool.fullDescription[locale]}</p>
            <p className="text-sm text-cyan-300">{tool.category}</p>
            <a
              href={tool.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-lg bg-cyan-500 px-4 py-2 font-medium text-slate-950 hover:bg-cyan-400"
            >
              {locale === "tr" ? "Siteyi Ziyaret Et" : "Visit Website"}
            </a>
          </div>
        </div>
      </div>

      <section>
        <h2 className="mb-4 text-2xl font-semibold text-slate-100">
          {locale === "tr" ? "Benzer Araclar" : "Related Tools"}
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {relatedTools.map((relatedTool) => (
            <ToolCard key={relatedTool.slug} tool={relatedTool} locale={locale} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-semibold text-slate-100">{locale === "tr" ? "SSS" : "FAQ"}</h2>
        <div className="space-y-3">
          {tool.faqs.map((faq) => (
            <details key={faq.question.en} className="rounded-xl border border-slate-800 bg-slate-900 p-4">
              <summary className="cursor-pointer font-medium text-slate-100">{faq.question[locale]}</summary>
              <p className="mt-2 text-sm text-slate-300">{faq.answer[locale]}</p>
            </details>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-semibold text-slate-100">
          {locale === "tr" ? "Karsilastirma sayfalari" : "Comparison pages"}
        </h2>
        <div className="flex flex-wrap gap-2">
          {relatedCompares.map((pair) => (
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

      <Link href={`/${locale}/ai-tools/${tool.category}`} className="inline-block text-cyan-300 hover:text-cyan-200">
        {locale === "tr" ? "Kategoriye don" : "Back to category"}
      </Link>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([softwareSchema, faqSchema]) }}
      />
    </article>
  );
}
