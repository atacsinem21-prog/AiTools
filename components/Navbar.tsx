import Link from "next/link";
import type { Locale } from "@/data/tools";
import { t } from "@/lib/i18n";

type NavbarProps = {
  locale: Locale;
};

export function Navbar({ locale }: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-800/60 bg-slate-950/65 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href={`/${locale}`} className="text-lg font-semibold text-cyan-300">
          {t(locale, "siteName")}
        </Link>
        <nav className="glass-card flex items-center gap-2 rounded-full px-2 py-1 text-sm text-slate-300">
          <Link href={`/${locale}/directory`} className="rounded-full px-3 py-2 hover:bg-slate-800/70 hover:text-cyan-300">
            {t(locale, "directory")}
          </Link>
          <Link href={`/${locale}/compare`} className="rounded-full px-3 py-2 hover:bg-slate-800/70 hover:text-cyan-300">
            Compare
          </Link>
          <Link href={`/${locale}/submit-tool`} className="rounded-full px-3 py-2 hover:bg-slate-800/70 hover:text-cyan-300">
            {t(locale, "submit")}
          </Link>
          <Link
            href={locale === "tr" ? "/en" : "/tr"}
            className="rounded-full border border-slate-700 px-3 py-1.5 text-xs hover:border-cyan-300"
          >
            {locale === "tr" ? "EN" : "TR"}
          </Link>
        </nav>
      </div>
    </header>
  );
}
