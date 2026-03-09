"use client";

import { useState } from "react";
import Link from "next/link";
import type { Locale } from "@/data/tools";
import { t } from "@/lib/i18n";

type NavbarProps = {
  locale: Locale;
};

export function Navbar({ locale }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-800/60 bg-slate-950/65 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href={`/${locale}`} className="text-lg font-semibold text-cyan-300">
          {t(locale, "siteName")}
        </Link>
        <nav className="glass-card hidden items-center gap-2 rounded-full px-2 py-1 text-sm text-slate-300 md:flex">
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

        <div className="relative md:hidden">
          <button
            type="button"
            aria-label="Toggle navigation menu"
            aria-expanded={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            className="glass-card rounded-xl p-2 text-slate-200 hover:text-cyan-300"
          >
            {isMobileMenuOpen ? "✕" : "☰"}
          </button>

          {isMobileMenuOpen ? (
            <div className="glass-card absolute right-0 top-12 w-56 rounded-2xl border border-slate-700/70 p-2 text-sm text-slate-200 shadow-xl shadow-cyan-950/30">
              <div className="flex flex-col">
                <Link
                  href={`/${locale}/directory`}
                  onClick={closeMobileMenu}
                  className="rounded-xl px-3 py-2 hover:bg-slate-800/70 hover:text-cyan-300"
                >
                  {t(locale, "directory")}
                </Link>
                <Link
                  href={`/${locale}/compare`}
                  onClick={closeMobileMenu}
                  className="rounded-xl px-3 py-2 hover:bg-slate-800/70 hover:text-cyan-300"
                >
                  Compare
                </Link>
                <Link
                  href={`/${locale}/submit-tool`}
                  onClick={closeMobileMenu}
                  className="rounded-xl px-3 py-2 hover:bg-slate-800/70 hover:text-cyan-300"
                >
                  {t(locale, "submit")}
                </Link>
                <Link
                  href={locale === "tr" ? "/en" : "/tr"}
                  onClick={closeMobileMenu}
                  className="mt-1 rounded-xl border border-slate-700 px-3 py-2 text-center text-xs hover:border-cyan-300 hover:text-cyan-300"
                >
                  {locale === "tr" ? "EN" : "TR"}
                </Link>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
}
