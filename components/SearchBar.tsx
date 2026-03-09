"use client";

import { useMemo, useState } from "react";
import type { Locale, Tool } from "@/data/tools";
import { t } from "@/lib/i18n";
import { ToolCard } from "@/components/ToolCard";

type SearchBarProps = {
  tools: Tool[];
  locale: Locale;
};

export function SearchBar({ tools, locale }: SearchBarProps) {
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
      <input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder={t(locale, "searchPlaceholder")}
        className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none"
        aria-label={t(locale, "searchPlaceholder")}
      />

      {filtered.length === 0 ? (
        <p className="text-sm text-slate-400">{t(locale, "noResults")}</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} locale={locale} />
          ))}
        </div>
      )}
    </section>
  );
}
