/**
 * The docs language. The choice is remembered across visits and handed to
 * LocaleProvider, so the page text and the live examples switch together.
 * Chinese is the default, as it is for the components.
 */
import { type ReactNode, useEffect, useSyncExternalStore } from "react";

import {
  LocaleProvider,
  useLocale,
} from "@/components/eridanus/locale-provider";
import { DEFAULT_LOCALE, isLocale, type Locale } from "@/lib/eridanus/locale";

const STORAGE_KEY = "eridanus-docs-locale";
const listeners = new Set<() => void>();
let locale: Locale = (() => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return isLocale(stored) ? stored : DEFAULT_LOCALE;
  } catch {
    return DEFAULT_LOCALE;
  }
})();

export function setDocsLocale(next: Locale) {
  locale = next;
  try {
    localStorage.setItem(STORAGE_KEY, next);
  } catch {
    // Storage can be off, as in a private window; the choice lasts the visit.
  }
  for (const l of listeners) l();
}

const subscribe = (onChange: () => void) => {
  listeners.add(onChange);
  return () => listeners.delete(onChange);
};

/** LocaleProvider on the stored choice, with the page's lang to match. */
export function DocsLocale({ children }: { children: ReactNode }) {
  const value = useSyncExternalStore(subscribe, () => locale);
  useEffect(() => {
    document.documentElement.lang = value;
  }, [value]);
  return <LocaleProvider locale={value}>{children}</LocaleProvider>;
}

/** Picks the Chinese or the English text for the current docs language. */
export function useT() {
  const current = useLocale();
  return (zh: string, en: string) => (current === "zh-CN" ? zh : en);
}

/** A per-locale value, such as a catalog title. */
export type Localized = Record<Locale, string>;
