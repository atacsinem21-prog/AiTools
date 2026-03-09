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
    title:
      locale === "tr"
        ? "Trend AI Araclari - En Yeni ve Populer Yapay Zeka Araclari"
        : "Trending AI Tools - New and Popular AI Software",
    description:
      locale === "tr"
        ? "Trend olan AI araclarini kesfedin. ChatGPT, Claude, Midjourney, Runway ve daha fazlasiyla uretkenlik, gorsel ve video cozumlerini karsilastirin."
        : "Discover trending AI tools including ChatGPT, Claude, Midjourney and Runway for productivity, image and video workflows.",
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
      <section className="glass-card neon-outline relative overflow-hidden rounded-3xl p-8 md:p-12">
        <div className="pointer-events-none absolute -right-24 -top-16 h-64 w-64 rounded-full bg-indigo-500/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 left-10 h-64 w-64 rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="relative z-10">
          <p className="text-xs uppercase tracking-[0.25em] text-cyan-300">AI Directory</p>
          <h1 className="mt-4 max-w-4xl text-3xl font-bold text-slate-100 md:text-6xl">
            {locale === "tr" ? "En iyi AI araclarini kesfet" : "Discover the best AI tools"}
          </h1>
          <p className="mt-4 max-w-2xl text-slate-300">
            {locale === "tr"
              ? "Yazma, kodlama, gorsel ve video icin en uygun AI aracini saniyeler icinde bul."
              : "Find the perfect AI tool for writing, coding, image generation and video workflows."}
          </p>
          <div className="mt-8 max-w-3xl space-y-4">
            <SearchBar tools={tools} locale={locale} showInlineResults={false} heroMode />
            <div className="flex flex-wrap gap-3">
              <Link
                href={`/${locale}/directory`}
                className="rounded-2xl bg-gradient-to-r from-indigo-500 to-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 hover:from-indigo-400 hover:to-cyan-300"
              >
                {locale === "tr" ? "Araclari gez" : "Browse tools"}
              </Link>
              <Link
                href={`/${locale}/compare`}
                className="rounded-2xl border border-slate-500 bg-slate-900/70 px-5 py-3 text-sm text-slate-100 hover:border-cyan-400"
              >
                {locale === "tr" ? "Karsilastirmalari ac" : "Open comparisons"}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-4 rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <h2 className="text-2xl font-semibold text-slate-100">
          {locale === "tr"
            ? "Trend AI araclari 2026: Neden bu liste onemli?"
            : "Trending AI tools 2026: Why this list matters"}
        </h2>
        <p className="text-sm leading-7 text-slate-300">
          {locale === "tr"
            ? "Trend AI araclari listesi, icerik uretiminden videoya, kod gelistirmeden ekip verimliligine kadar farkli ihtiyaclar icin guvenilir bir karsilastirma zemini sunar. Bu sayfada yer alan araclar sadece populer oldugu icin degil, ayni zamanda gercek kullanim senaryolarinda hiz, kalite ve entegrasyon avantajlari sundugu icin secilir. Bir aracin iyi olmasi tek basina yeterli degildir; dogru araci dogru ekipte kullanmak gerekir. Bu nedenle kategori bazli gezinme, compare sayfalari ve detayli tool profilleri birlikte calisir. Her hafta guncellenen yapi sayesinde yeni cikis yapan urunleri, fiyat degisikliklerini ve yukselen araclari tek sayfada takip edebilirsiniz. Eger hedefiniz daha hizli icerik uretmek, tekrar eden gorevleri otomatiklestirmek ya da ekip ciktilarini olceklemekse, bu liste karar surecinizi kisaltir ve yanlis arac secimi riskini azaltir."
            : "A trending AI tools list is useful only when it helps with real decisions. This page is designed to compare software across practical use cases such as content production, video creation, coding support and team productivity. Tools are not featured only because they are popular; they are selected for workflow impact, output quality and integration potential. Choosing the best AI product requires context: team size, budget, use-case depth and expected ROI. That is why this page combines category discovery, compare pages and detailed tool profiles in one structured flow. The list is updated regularly so you can track new launches, pricing changes and momentum shifts without checking multiple sources. If your goal is to move faster, automate repetitive work and improve content quality, this list helps reduce decision time and avoid costly tool mismatches."}
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-semibold text-slate-100">
          {locale === "tr" ? "🔥 Trend AI araclari" : "🔥 Trending AI tools"}
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {trending.map((tool) => (
            <ToolCard
              key={tool.slug}
              tool={tool}
              locale={locale}
              badges={[locale === "tr" ? "🔥 Trend" : "🔥 Trending"]}
            />
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-semibold text-slate-100">{t(locale, "newTools")}</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {newTools.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} locale={locale} badges={[locale === "tr" ? "🆕 Yeni" : "🆕 New"]} />
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
