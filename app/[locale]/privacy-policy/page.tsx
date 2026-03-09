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
    title: locale === "tr" ? "Gizlilik Politikasi" : "Privacy Policy",
    description:
      locale === "tr"
        ? "Global AI Araçları gizlilik politikası ve veri işleme ilkeleri."
        : "Global AI Tools privacy policy and data processing principles.",
    pathWithoutLocale: "/privacy-policy",
  });
}

export default function PrivacyPolicyPage({ params }: Props) {
  const locale = getLocaleFromPath(params.locale);

  return (
    <article className="space-y-4">
      <h1 className="text-3xl font-bold text-slate-100">{locale === "tr" ? "Gizlilik Politikasi" : "Privacy Policy"}</h1>
      <p className="text-sm text-slate-300">
        {locale === "tr"
          ? "Bu sayfa, sitede toplanan temel veriler ve kullanım amaçları hakkında genel bilgilendirme içerir."
          : "This page provides general information about data collected on this site and its intended use."}
      </p>
      <section className="space-y-2 rounded-xl border border-slate-800 bg-slate-900 p-4 text-sm text-slate-300">
        <p>
          {locale === "tr"
            ? "E-posta bülteni formlarında yalnızca gönderdiğiniz bilgileri saklarız. Veriler üçüncü taraflara satılmaz."
            : "For newsletter forms, we only store the information you submit. Data is not sold to third parties."}
        </p>
        <p>
          {locale === "tr"
            ? "Analitik ve performans amaçlı çerezler kullanılabilir. Tarayıcı ayarlarınızdan çerez tercihlerini yönetebilirsiniz."
            : "Cookies may be used for analytics and performance purposes. You can manage cookie preferences in your browser settings."}
        </p>
        <p>
          {locale === "tr"
            ? "Gizlilik talepleriniz için: atacsinem21@gmail.com"
            : "For privacy-related requests: atacsinem21@gmail.com"}
        </p>
      </section>
    </article>
  );
}
