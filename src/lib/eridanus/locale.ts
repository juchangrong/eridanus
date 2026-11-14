/**
 * The languages Eridanus ships text for. Components read the current one from
 * LocaleProvider; the formatting functions take it as an argument. Chinese is
 * the default, so code written before locales existed keeps its text.
 */

export type Locale = "zh-CN" | "en-US";

export const LOCALES: readonly Locale[] = ["zh-CN", "en-US"];

export const DEFAULT_LOCALE: Locale = "zh-CN";

/** Whether a value, such as a stored choice or a URL parameter, is a Locale. */
export const isLocale = (value: unknown): value is Locale =>
  LOCALES.includes(value as Locale);
