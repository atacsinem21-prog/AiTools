import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { IntroGate } from "@/components/IntroGate";
import { Navbar } from "@/components/Navbar";
import { StickyNewsletterCta } from "@/components/StickyNewsletterCta";
import { isLocale } from "@/lib/i18n";

type Props = {
  children: ReactNode;
  params: { locale: string };
};

export default function LocaleLayout({ children, params }: Props) {
  if (!isLocale(params.locale)) {
    notFound();
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://globalaitools.com";
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Global AI Tools",
    url: siteUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteUrl}/${params.locale}/search/{query}`,
      "query-input": "required name=query",
    },
  };

  return (
    <div className="min-h-screen bg-bg">
      <IntroGate locale={params.locale} />
      <Navbar locale={params.locale} />
      <main className="mx-auto max-w-6xl px-4 py-10 pb-28">{children}</main>
      <Footer locale={params.locale} />
      <StickyNewsletterCta locale={params.locale} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
    </div>
  );
}

export function generateStaticParams() {
  return [{ locale: "tr" }, { locale: "en" }];
}
