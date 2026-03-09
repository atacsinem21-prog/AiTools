import Link from "next/link";
import type { Metadata } from "next";
import { ToolCard } from "@/components/ToolCard";
import { categories, tools, type Locale } from "@/data/tools";
import { getLocaleFromPath, t } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";

const PAGE_SIZE = 6;

type Props = {
  params: { locale: string };
  searchParams: { page?: string; category?: string };
};

export function generateMetadata({ params }: Props): Metadata {
  const locale = getLocaleFromPath(params.locale);
  return buildMetadata({
    locale,
    title: locale === "tr" ? "Tüm AI Araçları" : "All AI Tools Directory",
    description:
      locale === "tr"
        ? "AI araçlarını kategoriye göre filtreleyin ve sayfalandırılmış listede inceleyin."
        : "Browse all AI tools with category filters and pagination.",
    pathWithoutLocale: "/directory",
  });
}

export default function DirectoryPage({ params, searchParams }: Props) {
  const locale = getLocaleFromPath(params.locale) as Locale;
  const selectedCategory = searchParams.category ?? "all";
  const page = Number(searchParams.page ?? "1");

  const filtered =
    selectedCategory === "all"
      ? tools
      : tools.filter((tool) => tool.category === selectedCategory);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const start = (currentPage - 1) * PAGE_SIZE;
  const pageTools = filtered.slice(start, start + PAGE_SIZE);

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-slate-100">{t(locale, "directory")}</h1>
      <section className="rounded-xl border border-slate-800 bg-slate-900 p-5">
        <p className="text-sm leading-7 text-slate-300">
          {locale === "tr"
            ? "AI arac dizininde fiyat modeli, kategori uyumu ve kullanim senaryosu birlikte degerlendirilmelidir. Bu sayfa, ekiplerin tek tek arac sayfalarina gitmeden once hizli bir on eleme yapmasi icin tasarlandi. Her kartta arac tipi, fiyat sinifi ve detayli aciklama gorerek daha bilincli secim yapabilirsiniz. Ozellikle icerik, video, coding ve productivity akislari icin farkli araclarin guclu oldugu noktalar degisir. Bu nedenle once kategoriye gore filtreleyin, sonra shortlist olusturup tool detay ve compare sayfalarina gecin. Bu akis, gereksiz lisans maliyetini azaltir ve ekip icin dogru urune daha hizli ulasmanizi saglar."
            : "In this AI tools directory, pricing model, category fit and use-case depth should be evaluated together. This page is designed to help teams create a fast shortlist before visiting each detailed tool page. Each card now highlights category, pricing signal and a richer description so selection decisions are more informed. Different tools are stronger across content, video, coding and productivity workflows, so filtering by category first is the fastest path. After filtering, move to tool detail and compare pages to validate fit, integration potential and cost. This process reduces unnecessary license spend and helps teams adopt the right product with less trial-and-error."}
        </p>
      </section>

      <div className="flex flex-wrap gap-2">
        <Link
          href={`/${locale}/directory`}
          className="rounded-full border border-slate-700 px-3 py-1 text-sm hover:border-cyan-300"
        >
          All
        </Link>
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/${locale}/directory?category=${category.slug}`}
            className="rounded-full border border-slate-700 px-3 py-1 text-sm hover:border-cyan-300"
          >
            {category.name[locale]}
          </Link>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {pageTools.map((tool) => (
          <ToolCard key={tool.slug} tool={tool} locale={locale} />
        ))}
      </div>

      <div className="flex items-center gap-3">
        {Array.from({ length: totalPages }).map((_, index) => {
          const value = index + 1;
          const href =
            selectedCategory === "all"
              ? `/${locale}/directory?page=${value}`
              : `/${locale}/directory?page=${value}&category=${selectedCategory}`;

          return (
            <Link
              key={value}
              href={href}
              className={`rounded-md border px-3 py-1 text-sm ${
                currentPage === value
                  ? "border-cyan-300 text-cyan-300"
                  : "border-slate-700 text-slate-300 hover:border-cyan-300"
              }`}
            >
              {value}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
