import Link from "next/link";
import type { Category, Locale } from "@/data/tools";

export function CategoryCard({ category, locale }: { category: Category; locale: Locale }) {
  return (
    <Link
      href={`/${locale}/ai-tools/${category.slug}`}
      className="rounded-xl border border-slate-800 bg-slate-900 p-4 hover:border-cyan-400"
    >
      <h3 className="font-semibold text-slate-100">{category.name[locale]}</h3>
      <p className="mt-2 text-sm text-slate-400">{category.seoIntro[locale]}</p>
    </Link>
  );
}
