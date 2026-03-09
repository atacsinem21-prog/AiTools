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
import { articleSchema, breadcrumbSchema, buildMetadata, itemListSchema } from "@/lib/seo";
import { getSiteUrl } from "@/lib/site-url";

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
  const baseUrl = getSiteUrl();
  const itemSchema = itemListSchema(baseUrl, categoryTools);
  const breadcrumb = breadcrumbSchema([
    { name: locale === "tr" ? "Ana Sayfa" : "Home", url: `${baseUrl}/${locale}` },
    { name: locale === "tr" ? "Kategoriler" : "Categories", url: `${baseUrl}/${locale}/ai-tools` },
    { name: category.name[locale], url: `${baseUrl}/${locale}/ai-tools/${category.slug}` },
  ]);
  const article = articleSchema({
    title: `${category.name[locale]} ${locale === "tr" ? "araçları" : "tools"} 2026`,
    description: category.seoIntro[locale],
    url: `${baseUrl}/${locale}/ai-tools/${category.slug}`,
  });

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-slate-100">{category.name[locale]}</h1>
      <p className="max-w-3xl text-slate-300">{category.seoIntro[locale]}</p>
      <section className="space-y-3 rounded-xl border border-slate-800 bg-slate-900 p-5">
        <h2 className="text-xl font-semibold text-slate-100">
          {locale === "tr" ? `En iyi ${category.name.tr} araçları 2026` : `Best ${category.name.en} tools in 2026`}
        </h2>
        <p className="text-sm text-slate-300">
          {locale === "tr"
            ? "Bu kategoride yer alan araçlar üretkenlik, kalite ve kullanım kolaylığı açısından öne çıkar. Doğru aracı seçerken ekip boyutu, entegrasyon ihtiyacı ve bütçe dengesini birlikte değerlendirmek gerekir."
            : "Tools in this category stand out with a balance of productivity, quality and usability. When selecting the best option, evaluate team size, integration needs and budget together."}
        </p>
        <p className="text-sm text-slate-300">
          {locale === "tr"
            ? "Avantajlar: Daha hızlı içerik üretimi, otomasyon ve operasyonel verim. Nasıl kullanılır: Önce küçük bir kullanım senaryosu belirleyin, ardından en iyi iki aracı test edip metriklerle karar verin."
            : "Benefits: faster content operations, automation and workflow efficiency. How to use: start with a small use case, test two candidate tools and decide with measurable outcomes."}
        </p>
      </section>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categoryTools.map((tool) => (
          <ToolCard key={tool.slug} tool={tool} locale={locale} />
        ))}
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([itemSchema, breadcrumb, article]) }} />
    </div>
  );
}
