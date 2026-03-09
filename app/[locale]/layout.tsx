import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { isLocale } from "@/lib/i18n";

type Props = {
  children: ReactNode;
  params: { locale: string };
};

export default function LocaleLayout({ children, params }: Props) {
  if (!isLocale(params.locale)) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-bg">
      <Navbar locale={params.locale} />
      <main className="mx-auto max-w-6xl px-4 py-10">{children}</main>
      <Footer locale={params.locale} />
    </div>
  );
}

export function generateStaticParams() {
  return [{ locale: "tr" }, { locale: "en" }];
}
