import type { Metadata } from "next";
import type { Locale } from "@/data/tools";
import { alternatesFor } from "@/lib/i18n";
import { getSiteUrl } from "@/lib/site-url";

const siteUrl = getSiteUrl();
const siteName = "Global AI Tools";

type MetadataInput = {
  locale: Locale;
  title: string;
  description: string;
  pathWithoutLocale: string;
};

export function buildMetadata({
  locale,
  title,
  description,
  pathWithoutLocale,
}: MetadataInput): Metadata {
  const localPath = `/${locale}${pathWithoutLocale}`;
  const alternates = alternatesFor(pathWithoutLocale);

  return {
    title,
    description,
    metadataBase: new URL(siteUrl),
    alternates,
    openGraph: {
      type: "website",
      title,
      description,
      url: `${siteUrl}${localPath}`,
      siteName,
      locale: locale === "tr" ? "tr_TR" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export function itemListSchema(url: string, items: Array<{ name: string; slug: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: `${url}/tool/${item.slug}`,
    })),
  };
}
