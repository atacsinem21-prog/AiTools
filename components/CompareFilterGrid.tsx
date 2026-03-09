"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Locale } from "@/data/tools";

type CompareEntry = {
  slug: string;
  title: string;
  leftCategory: string;
  rightCategory: string;
  leftPricing: "free" | "freemium" | "paid";
  rightPricing: "free" | "freemium" | "paid";
  leftPricingText: string;
  rightPricingText: string;
  score: number;
};

export function CompareFilterGrid({
  locale,
  entries,
}: {
  locale: Locale;
  entries: CompareEntry[];
}) {
  const [category, setCategory] = useState("all");
  const [pricing, setPricing] = useState("all");
  const [sort, setSort] = useState("popular");

  const categories = useMemo(() => {
    const all = new Set<string>();
    for (const entry of entries) {
      all.add(entry.leftCategory);
      all.add(entry.rightCategory);
    }
    return ["all", ...Array.from(all)];
  }, [entries]);

  const filtered = useMemo(() => {
    const byCategory =
      category === "all"
        ? entries
        : entries.filter(
            (entry) => entry.leftCategory === category || entry.rightCategory === category
          );

    const byPricing =
      pricing === "all"
        ? byCategory
        : byCategory.filter(
            (entry) => entry.leftPricing === pricing || entry.rightPricing === pricing
          );

    return [...byPricing].sort((a, b) =>
      sort === "popular" ? b.score - a.score : a.title.localeCompare(b.title)
    );
  }, [entries, category, pricing, sort]);

  return (
    <section className="space-y-4">
      <div className="flex flex-col gap-2 sm:flex-row">
        <select
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100"
          aria-label={locale === "tr" ? "Kategori filtresi" : "Category filter"}
        >
          {categories.map((value) => (
            <option key={value} value={value}>
              {value === "all" ? (locale === "tr" ? "Tüm kategoriler" : "All categories") : value}
            </option>
          ))}
        </select>

        <select
          value={sort}
          onChange={(event) => setSort(event.target.value)}
          className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100"
          aria-label={locale === "tr" ? "Sıralama" : "Sort"}
        >
          <option value="popular">{locale === "tr" ? "Popülerliğe göre" : "Sort by popularity"}</option>
          <option value="alpha">{locale === "tr" ? "Alfabetik" : "Sort alphabetically"}</option>
        </select>

        <select
          value={pricing}
          onChange={(event) => setPricing(event.target.value)}
          className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100"
          aria-label={locale === "tr" ? "Fiyat filtresi" : "Pricing filter"}
        >
          <option value="all">{locale === "tr" ? "Tüm fiyat modelleri" : "All pricing models"}</option>
          <option value="free">{locale === "tr" ? "Ücretsiz" : "Free"}</option>
          <option value="freemium">{locale === "tr" ? "Freemium" : "Freemium"}</option>
          <option value="paid">{locale === "tr" ? "Ücretli" : "Paid"}</option>
        </select>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {filtered.map((entry) => (
          <Link
            key={entry.slug}
            href={`/${locale}/compare/${entry.slug}`}
            className="rounded-xl border border-slate-800 bg-slate-900 px-4 py-3 hover:border-cyan-400"
          >
            <div className="flex items-center justify-between gap-2">
              <p className="font-medium text-slate-100">{entry.title}</p>
              <span className="rounded-full bg-cyan-500/10 px-2 py-1 text-xs text-cyan-300">
                {locale === "tr" ? "Skor" : "Score"}: {entry.score}
              </span>
            </div>
            <p className="mt-1 text-xs text-slate-400">
              {entry.leftCategory} • {entry.rightCategory}
            </p>
            <p className="mt-1 text-xs text-slate-500">
              {entry.leftPricingText} | {entry.rightPricingText}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
