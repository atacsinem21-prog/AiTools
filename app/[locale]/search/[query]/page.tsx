import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ToolCard } from "@/components/ToolCard";
import { tools, type Locale } from "@/data/tools";
import { getLocaleFromPath } from "@/lib/i18n";
import { buildMetadata, itemListSchema } from "@/lib/seo";
import { getSiteUrl } from "@/lib/site-url";

type Props = {
  params: { locale: string; query: string };
};

function normalizeQuery(raw: string) {
  return decodeURIComponent(raw).replaceAll("-", " ").trim();
}

export function generateMetadata({ params }: Props): Metadata {
  const locale = getLocaleFromPath(params.locale);
  const query = normalizeQuery(params.query);

  return buildMetadata({
    locale,
    title:
      locale === "tr"
        ? `"${query}" için AI araç arama sonuçları`
        : `AI tool search results for "${query}"`,
    description:
      locale === "tr"
        ? `${query} ile ilgili AI araçlarını keşfet, kategorilere göre incele ve en iyi alternatifi bul.`
        : `Discover AI tools related to ${query}, compare categories and find the best alternatives.`,
    pathWithoutLocale: `/search/${params.query}`,
  });
}

export default function SearchResultPage({ params }: Props) {
  const locale = getLocaleFromPath(params.locale) as Locale;
  const query = normalizeQuery(params.query).toLowerCase();
  if (!query) notFound();

  const results = tools.filter((tool) => {
    const text = [tool.name, tool.shortDescription[locale], tool.fullDescription[locale], tool.category, ...tool.tags]
      .join(" ")
      .toLowerCase();
    return text.includes(query);
  });

  const schema = itemListSchema(getSiteUrl(), results);

  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-bold text-slate-100">
        {locale === "tr"
          ? `"${normalizeQuery(params.query)}" arama sonuçları`
          : `Search results for "${normalizeQuery(params.query)}"`}
      </h1>
      <p className="max-w-3xl text-slate-300">
        {locale === "tr"
          ? "Bu sayfa indekslenebilir URL yapısı ile arama sonuçlarını sunar. Benzer araçları detay sayfalarından karşılaştırabilirsiniz."
          : "This indexable URL provides search results and related tools you can compare through detail pages."}
      </p>

      {results.length === 0 ? (
        <p className="text-slate-400">{locale === "tr" ? "Sonuç bulunamadı." : "No results found."}</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} locale={locale} />
          ))}
        </div>
      )}

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </section>
  );
}
