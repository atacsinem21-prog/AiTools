import type { Metadata } from "next";
import Link from "next/link";
import { CategoryCard } from "@/components/CategoryCard";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { SearchBar } from "@/components/SearchBar";
import { ToolCard } from "@/components/ToolCard";
import {
  categories,
  comparePairs,
  getNewTools,
  getTrendingTools,
  getToolBySlug,
  type Locale,
  tools,
} from "@/data/tools";
import { getLocaleFromPath, t } from "@/lib/i18n";
import { buildMetadata, itemListSchema } from "@/lib/seo";
import { getSiteUrl } from "@/lib/site-url";

type Props = { params: { locale: string } };

export function generateMetadata({ params }: Props): Metadata {
  const locale = getLocaleFromPath(params.locale);
  return buildMetadata({
    locale,
    title: locale === "tr" ? "Trend AI Araçları" : "Trending AI Tools",
    description:
      locale === "tr"
        ? "En trend ve yeni AI araçlarını keşfedin, kategorilere göre filtreleyin."
        : "Discover trending and new AI tools, filter by category and explore details.",
    pathWithoutLocale: "/",
  });
}

export default function HomePage({ params }: Props) {
  const locale = getLocaleFromPath(params.locale) as Locale;
  const trending = getTrendingTools();
  const trendingSlugs = new Set(trending.map((tool) => tool.slug));
  const newTools = getNewTools().filter((tool) => !trendingSlugs.has(tool.slug));
  const schema = itemListSchema(getSiteUrl(), trending);

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

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-slate-100">
            {locale === "tr" ? "Popüler compare sayfaları" : "Popular compare pages"}
          </h2>
          <Link href={`/${locale}/compare`} className="text-sm text-cyan-300 hover:text-cyan-200">
            {locale === "tr" ? "Tumunu gor" : "View all"}
          </Link>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
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

      <NewsletterSignup locale={locale} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </div>
  );
}
