"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import type { Locale, Tool } from "@/data/tools";
import { t } from "@/lib/i18n";
import { ToolCard } from "@/components/ToolCard";

type SearchBarProps = {
  tools: Tool[];
  locale: Locale;
  showInlineResults?: boolean;
  heroMode?: boolean;
};

export function SearchBar({ tools, locale, showInlineResults = true, heroMode = false }: SearchBarProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const normalized = query.toLowerCase().trim();
    if (!normalized) return tools;

    return tools.filter((tool) => {
      const text = [
        tool.name,
        tool.shortDescription[locale],
        tool.category,
        ...tool.tags,
      ]
        .join(" ")
        .toLowerCase();
      return text.includes(normalized);
    });
  }, [query, tools, locale]);

  return (
    <section className="space-y-6">
      <form
        className="flex flex-col gap-3 sm:flex-row"
        onSubmit={(event) => {
          event.preventDefault();
          const normalized = query.trim().toLowerCase().replaceAll(/\s+/g, "-");
          if (normalized) {
            router.push(`/${locale}/search/${normalized}`);
          }
        }}
      >
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={t(locale, "searchPlaceholder")}
          className={`w-full rounded-2xl border border-slate-600 bg-slate-900/80 text-slate-100 placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none ${
            heroMode ? "px-5 py-4 text-base" : "px-4 py-3"
          }`}
          aria-label={t(locale, "searchPlaceholder")}
        />
        <button
          type="submit"
          className={`rounded-2xl bg-gradient-to-r from-cyan-400 to-indigo-400 font-semibold text-slate-950 hover:from-cyan-300 hover:to-indigo-300 ${
            heroMode ? "px-6 py-4 text-sm" : "px-5 py-3 text-sm"
          }`}
        >
          {locale === "tr" ? "SEO Arama Sayfası" : "Open SEO Search Page"}
        </button>
      </form>

      {!showInlineResults ? null : filtered.length === 0 ? (
        <p className="text-sm text-slate-400">{t(locale, "noResults")}</p>
      ) : (
        <div className="space-y-3">
          <p className="text-xs text-slate-400">
            {locale === "tr"
              ? "İndekslenebilir arama sonucu sayfası için üstten butonu kullan."
              : "Use the button above to open an indexable search result page."}
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} locale={locale} />
            ))}
          </div>
          {query.trim().length > 0 && (
            <Link
              href={`/${locale}/search/${query.trim().toLowerCase().replaceAll(/\s+/g, "-")}`}
              className="inline-block text-sm text-cyan-300 hover:text-cyan-200"
            >
              {locale === "tr" ? "Aramayı ayrı sayfada aç" : "Open this search in a dedicated page"}
            </Link>
          )}
        </div>
      )}
    </section>
  );
}
