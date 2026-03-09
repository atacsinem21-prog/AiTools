import type { Metadata } from "next";
import { getLocaleFromPath } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";

type Props = {
  params: { locale: string };
};

export function generateMetadata({ params }: Props): Metadata {
  const locale = getLocaleFromPath(params.locale);
  return buildMetadata({
    locale,
    title: locale === "tr" ? "Kullanim Sartlari" : "Terms of Use",
    description:
      locale === "tr"
        ? "Global AI Araçları kullanım koşulları ve sorumluluk sınırları."
        : "Global AI Tools terms of use and liability boundaries.",
    pathWithoutLocale: "/terms-of-use",
  });
}

export default function TermsOfUsePage({ params }: Props) {
  const locale = getLocaleFromPath(params.locale);

  return (
    <article className="space-y-4">
      <h1 className="text-3xl font-bold text-slate-100">{locale === "tr" ? "Kullanim Sartlari" : "Terms of Use"}</h1>
      <section className="space-y-2 rounded-xl border border-slate-800 bg-slate-900 p-4 text-sm text-slate-300">
        <p>
          {locale === "tr"
            ? "Bu siteyi kullanarak içeriklerin bilgilendirme amacı taşıdığını kabul etmiş olursunuz."
            : "By using this site, you acknowledge that content is provided for informational purposes."}
        </p>
        <p>
          {locale === "tr"
            ? "Araç fiyatları ve özellikleri zamanla değişebilir; nihai bilgiler için resmi ürün sitelerini kontrol edin."
            : "Tool pricing and features may change over time; always verify final details on official product websites."}
        </p>
        <p>
          {locale === "tr"
            ? "Reklam ve iş birliği iletişimi: atacsinem21@gmail.com"
            : "Advertising and partnership contact: atacsinem21@gmail.com"}
        </p>
      </section>
    </article>
  );
}
