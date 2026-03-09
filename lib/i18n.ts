import enCommon from "@/locales/en/common.json";
import trCommon from "@/locales/tr/common.json";
import type { Locale } from "@/data/tools";

const locales: Locale[] = ["tr", "en"];

const dictionaries = {
  en: enCommon,
  tr: trCommon,
} as const;

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function getLocaleFromPath(value: string): Locale {
  return isLocale(value) ? value : "en";
}

export function t(locale: Locale, key: keyof typeof enCommon) {
  const dictionary = dictionaries[locale] ?? dictionaries.en;
  const value = dictionary[key];

  if (!value) {
    console.warn(`Missing translation key "${key}" for locale "${locale}"`);
    return dictionaries.en[key] ?? key;
  }

  return value;
}

export function alternatesFor(pathWithoutLocale: string) {
  const cleanPath = pathWithoutLocale.startsWith("/")
    ? pathWithoutLocale
    : `/${pathWithoutLocale}`;

  return {
    canonical: `/en${cleanPath}`,
    languages: {
      "tr-TR": `/tr${cleanPath}`,
      en: `/en${cleanPath}`,
      "x-default": `/en${cleanPath}`,
    },
  };
}
