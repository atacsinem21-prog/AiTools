import type { Metadata } from "next";
import { getLocaleFromPath } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";

type Props = { params: { locale: string } };

export function generateMetadata({ params }: Props): Metadata {
  const locale = getLocaleFromPath(params.locale);
  return buildMetadata({
    locale,
    title: locale === "tr" ? "AI Aracını Gönder" : "Submit Your AI Tool",
    description:
      locale === "tr"
        ? "AI aracını directory'ye eklemek için formu doldur."
        : "Submit your AI tool to be listed in the directory.",
    pathWithoutLocale: "/submit-tool",
  });
}

export default function SubmitToolPage({ params }: Props) {
  const locale = getLocaleFromPath(params.locale);

  return (
    <section className="mx-auto max-w-2xl rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <h1 className="text-3xl font-bold text-slate-100">
        {locale === "tr" ? "AI aracını gönder" : "Submit your AI tool"}
      </h1>
      <p className="mt-2 text-slate-300">
        {locale === "tr"
          ? "Form moderasyon sonrası yayına alınacak."
          : "Submissions are reviewed before publishing."}
      </p>

      <form action="/api/submit-tool" method="post" className="mt-6 space-y-4">
        <input
          name="name"
          placeholder={locale === "tr" ? "Araç adı" : "Tool name"}
          className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2"
          required
        />
        <textarea
          name="description"
          placeholder={locale === "tr" ? "Açıklama" : "Description"}
          className="h-32 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2"
          required
        />
        <input
          name="website"
          type="url"
          placeholder="https://"
          className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2"
          required
        />
        <input
          name="category"
          placeholder={locale === "tr" ? "Kategori" : "Category"}
          className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2"
          required
        />
        <button className="rounded-lg bg-cyan-500 px-4 py-2 font-medium text-slate-950 hover:bg-cyan-400" type="submit">
          {locale === "tr" ? "Gönder" : "Submit"}
        </button>
      </form>
    </section>
  );
}
