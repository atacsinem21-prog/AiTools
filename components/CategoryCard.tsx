import Link from "next/link";
import type { Category, Locale } from "@/data/tools";

const categoryEmoji: Record<string, string> = {
  "productivity-ai": "📊",
  "image-ai": "🎨",
  "video-ai": "🎥",
  "marketing-ai": "✍️",
  "coding-ai": "👨‍💻",
};

export function CategoryCard({ category, locale }: { category: Category; locale: Locale }) {
  return (
    <Link
      href={`/${locale}/ai-tools/${category.slug}`}
      className="glass-card rounded-xl p-4 hover:border-cyan-400"
    >
      <h3 className="font-semibold text-slate-100">
        {categoryEmoji[category.slug] ?? "🧠"} {category.name[locale]}
      </h3>
      <p className="mt-2 text-sm text-slate-400">{category.seoIntro[locale]}</p>
    </Link>
  );
}
