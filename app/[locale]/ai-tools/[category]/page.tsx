import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ToolCard } from "@/components/ToolCard";
import {
  categories,
  getCategoryBySlug,
  getToolsByCategory,
  type Locale,
} from "@/data/tools";
import { getLocaleFromPath } from "@/lib/i18n";
import { buildMetadata, itemListSchema } from "@/lib/seo";

type Props = {
  params: { locale: string; category: string };
};

export function generateStaticParams() {
  return ["tr", "en"].flatMap((locale) =>
    categories.map((category) => ({ locale, category: category.slug }))
  );
}

export function generateMetadata({ params }: Props): Metadata {
  const locale = getLocaleFromPath(params.locale);
  const category = getCategoryBySlug(params.category);
  if (!category) return {};

  return buildMetadata({
    locale,
    title:
      locale === "tr"
        ? `${category.name.tr} Araçları`
        : `${category.name.en} Tools`,
    description: category.seoIntro[locale],
    pathWithoutLocale: `/ai-tools/${params.category}`,
  });
}

export default function CategoryPage({ params }: Props) {
  const locale = getLocaleFromPath(params.locale) as Locale;
  const category = getCategoryBySlug(params.category);
  if (!category) notFound();

  const categoryTools = getToolsByCategory(category.slug);
  const schema = itemListSchema(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com",
    categoryTools
  );

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-slate-100">{category.name[locale]}</h1>
      <p className="max-w-3xl text-slate-300">{category.seoIntro[locale]}</p>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categoryTools.map((tool) => (
          <ToolCard key={tool.slug} tool={tool} locale={locale} />
        ))}
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </div>
  );
}
