import Link from "next/link";
import type { Locale } from "@/data/tools";
import { t } from "@/lib/i18n";

type NavbarProps = {
  locale: Locale;
};

export function Navbar({ locale }: NavbarProps) {
  return (
    <header className="border-b border-slate-800 bg-slate-950/70 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href={`/${locale}`} className="text-lg font-semibold text-cyan-300">
          {t(locale, "siteName")}
        </Link>
        <nav className="flex items-center gap-5 text-sm text-slate-300">
          <Link href={`/${locale}/directory`} className="hover:text-cyan-300">
            {t(locale, "directory")}
          </Link>
          <Link href={`/${locale}/compare`} className="hover:text-cyan-300">
            Compare
          </Link>
          <Link href={`/${locale}/submit-tool`} className="hover:text-cyan-300">
            {t(locale, "submit")}
          </Link>
          <Link href={locale === "tr" ? "/en" : "/tr"} className="rounded border border-slate-700 px-2 py-1 hover:border-cyan-300">
            {locale === "tr" ? "EN" : "TR"}
          </Link>
        </nav>
      </div>
    </header>
  );
}
