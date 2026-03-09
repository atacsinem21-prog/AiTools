"use client";

import Link from "next/link";
import { useState } from "react";
import type { Locale } from "@/data/tools";

export function StickyNewsletterCta({ locale }: { locale: Locale }) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-3xl rounded-xl border border-cyan-400/40 bg-slate-900/95 p-3 shadow-xl backdrop-blur">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-cyan-300">
            {locale === "tr" ? "Haftalık AI trend bülteni" : "Weekly AI trend newsletter"}
          </p>
          <p className="text-xs text-slate-300">
            {locale === "tr"
              ? "Compare sayfası yenilikleri ve yeni araçları kaçırma."
              : "Get compare-page updates and new tools every week."}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href={`/${locale}/submit-tool`}
            className="rounded-md border border-slate-600 px-3 py-2 text-xs text-slate-200 hover:border-cyan-400"
          >
            {locale === "tr" ? "Aracını gönder" : "Submit tool"}
          </Link>
          <button
            onClick={() => setDismissed(true)}
            className="rounded-md border border-slate-600 px-3 py-2 text-xs text-slate-300 hover:border-slate-400"
            type="button"
          >
            {locale === "tr" ? "Kapat" : "Dismiss"}
          </button>
        </div>
      </div>
    </div>
  );
}
