import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ShareButtons } from "@/components/ShareButtons";
import {
  comparePairs,
  getComparePairBySlug,
  getToolBySlug,
  getTrendingTools,
  tools,
} from "@/data/tools";
import { getLocaleFromPath } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import { getSiteUrl } from "@/lib/site-url";

type Props = {
  params: { locale: string; slug: string };
};

function featureRows(leftTags: string[], rightTags: string[]) {
  const baseFeatures = ["content", "automation", "speed", "team-collaboration"];
  return baseFeatures.map((feature) => ({
    feature,
    left: leftTags.includes(feature) || leftTags.includes("ai") ? "Yes" : "Limited",
    right: rightTags.includes(feature) || rightTags.includes("ai") ? "Yes" : "Limited",
  }));
}

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
      ? `${left.name} vs ${right.name}: Hangi AI Araci Daha Iyi? (2026)`
      : `${left.name} vs ${right.name}: Which AI Tool Is Better? (2026)`;

  const description =
    locale === "tr"
      ? `${left.name} ve ${right.name} ozelliklerini, kullanim senaryolarini ve baglantilarini karsilastirin.`
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

  const rows = featureRows(left.tags, right.tags);
  const related = getTrendingTools().filter(
    (tool) => tool.slug !== left.slug && tool.slug !== right.slug
  );
  const pageUrl = `${getSiteUrl()}/${locale}/compare/${pair.slug}`;

  const schema = {
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

  return (
    <article className="space-y-8">
      <header className="space-y-3">
        <p className="text-sm uppercase tracking-wider text-cyan-300">Compare</p>
        <h1 className="text-3xl font-bold text-slate-100">
          {left.name} vs {right.name}
        </h1>
        <p className="max-w-3xl text-slate-300">
          {locale === "tr"
            ? "Ozellik, kullanim alani ve yonlendirme acisindan hizli karsilastirma."
            : "A quick side-by-side comparison of features, use cases and links."}
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
              <tr key={row.feature} className="border-t border-slate-800">
                <td className="px-4 py-3 capitalize text-slate-200">{row.feature.replaceAll("-", " ")}</td>
                <td className="px-4 py-3 text-slate-300">{row.left}</td>
                <td className="px-4 py-3 text-slate-300">{row.right}</td>
              </tr>
            ))}
          </tbody>
        </table>
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
          {locale === "tr" ? "Diger compare sayfalari" : "More comparisons"}
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

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </article>
  );
}
