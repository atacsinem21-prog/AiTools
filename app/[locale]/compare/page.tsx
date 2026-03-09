import Link from "next/link";
import type { Metadata } from "next";
import { comparePairs, getToolBySlug } from "@/data/tools";
import { getLocaleFromPath } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";

type Props = {
  params: { locale: string };
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
  const locale = getLocaleFromPath(params.locale);

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

      <div className="grid gap-3 sm:grid-cols-2">
        {comparePairs.map((pair) => {
          const left = getToolBySlug(pair.leftToolSlug);
          const right = getToolBySlug(pair.rightToolSlug);
          const title = left && right ? `${left.name} vs ${right.name}` : pair.slug;

          return (
            <Link
              key={pair.slug}
              href={`/${locale}/compare/${pair.slug}`}
              className="rounded-xl border border-slate-800 bg-slate-900 px-4 py-3 hover:border-cyan-400"
            >
              <p className="font-medium text-slate-100">{title}</p>
              <p className="mt-1 text-sm text-slate-400">{pair.slug}</p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
