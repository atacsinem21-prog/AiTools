import type { Locale } from "@/data/tools";

export function Footer({ locale }: { locale: Locale }) {
  return (
    <footer className="mt-16 border-t border-slate-800">
      <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-slate-400">
        <p>
          {locale === "tr"
            ? "Global AI Tools - Tum haklari saklidir."
            : "Global AI Tools - All rights reserved."}
        </p>
        <p className="mt-2">
          {locale === "tr" ? "Reklam ve is birligi: " : "Advertising and partnerships: "}
          <a className="text-cyan-300 hover:text-cyan-200" href="mailto:atacsinem21@gmail.com">
            atacsinem21@gmail.com
          </a>
        </p>
      </div>
    </footer>
  );
}
