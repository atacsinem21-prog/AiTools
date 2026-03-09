import Image from "next/image";
import Link from "next/link";
import { getPricingText, getToolRating, type Locale, type Tool } from "@/data/tools";
import { t } from "@/lib/i18n";

type ToolCardProps = {
  tool: Tool;
  locale: Locale;
  badges?: string[];
};

export function ToolCard({ tool, locale, badges = [] }: ToolCardProps) {
  const pricingText = getPricingText(locale, tool.slug);
  const rating = getToolRating(tool.slug);
  const stars = "★".repeat(Math.round(rating));

  return (
    <article className="glass-card neon-outline flex h-full flex-col rounded-2xl p-5 transition-transform duration-300 hover:-translate-y-1">
      <div className="flex items-start gap-3">
        <Image
          src={tool.logo}
          alt={`${tool.name} logo`}
          width={44}
          height={44}
          sizes="44px"
          className="rounded-md bg-slate-800 p-1"
          loading="lazy"
        />
        <div className="min-w-0">
          <h3 className="truncate text-lg font-semibold text-slate-100">{tool.name}</h3>
          <span className="mt-1 inline-block rounded-full bg-cyan-500/15 px-2 py-1 text-xs text-cyan-300">
            {tool.category}
          </span>
          <div className="mt-2">
            <span className="inline-block rounded-full bg-emerald-500/25 px-2 py-1 text-xs font-semibold text-emerald-300">
              {locale === "tr" ? "Fiyat: " : "Pricing: "}
              {pricingText}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-amber-500/25 px-2 py-1 text-xs font-semibold text-amber-300">
          {stars} {rating}
        </span>
        {badges.map((badge) => (
          <span key={badge} className="rounded-full bg-fuchsia-500/25 px-2 py-1 text-xs font-semibold text-fuchsia-300">
            {badge}
          </span>
        ))}
      </div>

      <p className="mt-4 line-clamp-4 text-sm leading-6 text-slate-300">{tool.fullDescription[locale]}</p>

      <div className="mt-5 flex gap-3">
        <Link
          href={`/${locale}/tool/${tool.slug}`}
          className="rounded-lg border border-slate-700 px-3 py-2 text-sm text-slate-200 hover:border-cyan-400"
        >
          Details
        </Link>
        <a
          href={tool.website}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg bg-cyan-500 px-3 py-2 text-sm font-medium text-slate-950 hover:bg-cyan-400"
        >
          {t(locale, "visitWebsite")}
        </a>
      </div>
    </article>
  );
}
