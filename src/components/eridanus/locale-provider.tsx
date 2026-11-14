import { createContext, type ReactNode, useContext } from "react";

import { DEFAULT_LOCALE, type Locale } from "@/lib/eridanus/locale";

const LocaleContext = createContext<Locale>(DEFAULT_LOCALE);

/**
 * The language of every Eridanus component inside it: their built-in labels,
 * readable times and time ranges. Without a provider they speak Chinese.
 * Text passed through a component's props always wins over the built-in one.
 * The locale is the app's state; this only hands it down.
 */
export function LocaleProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: ReactNode;
}) {
  return (
    <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>
  );
}

/** The locale of the nearest LocaleProvider, or Chinese without one. */
export function useLocale(): Locale {
  return useContext(LocaleContext);
}

/** The entry of a per-locale table for the current locale. */
export function useMessages<T>(table: Record<Locale, T>): T {
  return table[useLocale()];
}
