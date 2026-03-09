import type { Metadata } from "next";
import Image from "next/image";
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
        ? "Trend AI Araçları - En Yeni ve Popüler Yapay Zeka Araçları"
        : "Trending AI Tools - New and Popular AI Software",
    description:
      locale === "tr"
        ? "Trend olan AI araçlarını keşfedin. ChatGPT, Claude, Midjourney, Runway ve daha fazlasıyla üretkenlik, görsel ve video çözümlerini karşılaştırın."
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
        <div className="relative z-10 grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-cyan-300">AI Directory</p>
            <h1 className="mt-4 max-w-4xl text-3xl font-bold text-slate-100 md:text-6xl">
              {locale === "tr" ? "En iyi AI araçlarını keşfet" : "Discover the best AI tools"}
            </h1>
            <p className="mt-4 max-w-2xl text-slate-300">
              {locale === "tr"
                ? "Yazma, kodlama, görsel ve video için en uygun AI aracını saniyeler içinde bul."
                : "Find the perfect AI tool for writing, coding, image generation and video workflows."}
            </p>
            <div className="mt-8 max-w-3xl space-y-4">
              <SearchBar tools={tools} locale={locale} showInlineResults={false} heroMode />
              <div className="flex flex-wrap gap-3">
                <Link
                  href={`/${locale}/directory`}
                  className="rounded-2xl bg-gradient-to-r from-indigo-500 to-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 hover:from-indigo-400 hover:to-cyan-300"
                >
                  {locale === "tr" ? "Araçları gez" : "Browse tools"}
                </Link>
                <Link
                  href={`/${locale}/compare`}
                  className="rounded-2xl border border-slate-500 bg-slate-900/70 px-5 py-3 text-sm text-slate-100 hover:border-cyan-400"
                >
                  {locale === "tr" ? "Karşılaştırmaları aç" : "Open comparisons"}
                </Link>
              </div>
            </div>
          </div>
          <div className="glass-card relative rounded-3xl p-6">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-indigo-500/20 via-violet-500/10 to-cyan-400/20" />
            <div className="relative flex min-h-[240px] items-center justify-center">
              <div className="absolute h-40 w-40 rounded-full bg-indigo-500/30 blur-2xl" />
              <div className="absolute h-32 w-32 rounded-full bg-cyan-400/25 blur-2xl" />
              <Image
                src="/logos/chatgpt-card.png"
                alt="AI assistant icon"
                width={360}
                height={360}
                className="relative h-72 w-72 object-contain"
                priority
              />
            </div>
            <p className="relative text-center text-sm text-slate-300">
              {locale === "tr"
                ? "AI destekli arama, karşılaştırma ve kategorilere göre hızlı keşif."
                : "AI-powered discovery with smart search, comparisons and category navigation."}
            </p>
          </div>
        </div>
      </section>

      <section className="glass-card rounded-2xl p-6">
        <h2 className="text-2xl font-semibold text-slate-100">
          {locale === "tr" ? "Bu site ne işe yarar?" : "What is this site for?"}
        </h2>
        <p className="mt-3 text-sm leading-7 text-slate-300">
          {locale === "tr"
            ? "Bu platform, en iyi AI araçlarını tek bir yerde bulman, fiyat ve özelliklere göre karşılaştırman ve işine en uygun çözümleri hızlı seçmen için tasarlandı. Tool detay sayfaları, compare akışları ve kategori bazlı keşif yapısı sayesinde karar süreci kısalır. Amacımız, gereksiz araç deneme sürelerini azaltıp daha hızlı sonuca ulaşman."
            : "This platform helps you discover top AI tools in one place, compare pricing and features, and choose the best fit for your workflow faster. With tool detail pages, compare flows and category-based discovery, decision time gets shorter and adoption becomes easier."}
        </p>
      </section>

      <section className="space-y-4 rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <h2 className="text-2xl font-semibold text-slate-100">
          {locale === "tr"
            ? "Trend AI araçları 2026: Neden bu liste önemli?"
            : "Trending AI tools 2026: Why this list matters"}
        </h2>
        <p className="text-sm leading-7 text-slate-300">
          {locale === "tr"
            ? "Trend AI araçları listesi, içerik üretiminden videoya, kod geliştirmeden ekip verimliliğine kadar farklı ihtiyaçlar için güvenilir bir karşılaştırma zemini sunar. Bu sayfada yer alan araçlar sadece popüler olduğu için değil, aynı zamanda gerçek kullanım senaryolarında hız, kalite ve entegrasyon avantajları sunduğu için seçilir. Bir aracın iyi olması tek başına yeterli değildir; doğru aracı doğru ekipte kullanmak gerekir. Bu nedenle kategori bazlı gezinme, compare sayfaları ve detaylı tool profilleri birlikte çalışır. Her hafta güncellenen yapı sayesinde yeni çıkış yapan ürünleri, fiyat değişikliklerini ve yükselen araçları tek sayfada takip edebilirsiniz. Eğer hedefiniz daha hızlı içerik üretmek, tekrar eden görevleri otomatikleştirmek ya da ekip çıktılarınızı ölçeklemekse, bu liste karar sürecinizi kısaltır ve yanlış araç seçimi riskini azaltır."
            : "A trending AI tools list is useful only when it helps with real decisions. This page is designed to compare software across practical use cases such as content production, video creation, coding support and team productivity. Tools are not featured only because they are popular; they are selected for workflow impact, output quality and integration potential. Choosing the best AI product requires context: team size, budget, use-case depth and expected ROI. That is why this page combines category discovery, compare pages and detailed tool profiles in one structured flow. The list is updated regularly so you can track new launches, pricing changes and momentum shifts without checking multiple sources. If your goal is to move faster, automate repetitive work and improve content quality, this list helps reduce decision time and avoid costly tool mismatches."}
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-semibold text-slate-100">
          {locale === "tr" ? "🔥 Trend AI araçları" : "🔥 Trending AI tools"}
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
            {locale === "tr" ? "Tümünü gör" : "View all"}
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
