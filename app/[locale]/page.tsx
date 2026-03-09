import type { Metadata } from "next";
import { CategoryCard } from "@/components/CategoryCard";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { SearchBar } from "@/components/SearchBar";
import { ToolCard } from "@/components/ToolCard";
import { categories, getNewTools, getTrendingTools, type Locale, tools } from "@/data/tools";
import { getLocaleFromPath, t } from "@/lib/i18n";
import { buildMetadata, itemListSchema } from "@/lib/seo";

type Props = { params: { locale: string } };

export function generateMetadata({ params }: Props): Metadata {
  const locale = getLocaleFromPath(params.locale);
  return buildMetadata({
    locale,
    title: locale === "tr" ? "Trend AI Araclari" : "Trending AI Tools",
    description:
      locale === "tr"
        ? "En trend ve yeni AI araclarini kesfedin, kategorilere gore filtreleyin."
        : "Discover trending and new AI tools, filter by category and explore details.",
    pathWithoutLocale: "/",
  });
}

export default function HomePage({ params }: Props) {
  const locale = getLocaleFromPath(params.locale) as Locale;
  const trending = getTrendingTools();
  const newTools = getNewTools();
  const schema = itemListSchema(process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com", trending);

  return (
    <div className="space-y-12">
      <section className="rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950 p-8">
        <p className="text-sm uppercase tracking-widest text-cyan-300">AI Directory</p>
        <h1 className="mt-3 text-3xl font-bold text-slate-100 md:text-4xl">{t(locale, "homeTitle")}</h1>
        <p className="mt-3 max-w-3xl text-slate-300">{t(locale, "homeSubtitle")}</p>
      </section>

      <SearchBar tools={tools} locale={locale} />

      <section>
        <h2 className="mb-4 text-2xl font-semibold text-slate-100">{t(locale, "trending")}</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {trending.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} locale={locale} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-semibold text-slate-100">{t(locale, "newTools")}</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {newTools.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} locale={locale} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-semibold text-slate-100">{t(locale, "categories")}</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <CategoryCard key={category.slug} category={category} locale={locale} />
          ))}
        </div>
      </section>

      <NewsletterSignup locale={locale} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </div>
  );
}
