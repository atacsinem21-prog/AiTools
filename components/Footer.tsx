import type { Locale } from "@/data/tools";

export function Footer({ locale }: { locale: Locale }) {
  return (
    <footer className="mt-16 border-t border-slate-800">
      <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-slate-400">
        {locale === "tr"
          ? "Global AI Tools - Tüm hakları saklıdır."
          : "Global AI Tools - All rights reserved."}
      </div>
    </footer>
  );
}
