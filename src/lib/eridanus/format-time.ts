/**
 * Time formatting for interfaces people scan and copy from: a readable form
 * for the surface ("just now", "Today 14:05", in the locale's own words)
 * and the exact forms a hover card shows. Every function takes a Date, an ISO
 * string or epoch milliseconds, works in the browser's time zone, and returns
 * "" (or null) for missing or unparseable input. The readable forms take a
 * locale, Chinese by default; the exact forms are the same in every language.
 */

import { DEFAULT_LOCALE, type Locale } from "@/lib/eridanus/locale";

export type TimeInput = Date | string | number | null | undefined;

const pad = (n: number, width = 2) => String(n).padStart(width, "0");

/** The input as a valid Date, or null. */
export function toDate(value: TimeInput): Date | null {
  if (value === null || value === undefined || value === "") return null;
  const d = value instanceof Date ? value : new Date(value);
  return Number.isNaN(d.getTime()) ? null : d;
}

/** "YYYY-MM-DD" for the local calendar day. */
export function localDay(value: TimeInput): string {
  const d = toDate(value);
  return d
    ? `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
    : "";
}

/** "YYYY-MM-DD HH:mm:ss" in local time. */
export function timestamp(value: TimeInput): string {
  const d = toDate(value);
  return d
    ? `${localDay(d)} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`
    : "";
}

/** "HH:mm:ss" in local time, for instants whose day is already on screen. */
export function clock(value: TimeInput): string {
  return timestamp(value).slice(11);
}

const UNITS = [
  { s: 86_400, zh: "天", en: "day" },
  { s: 3600, zh: "小时", en: "hour" },
  { s: 60, zh: "分钟", en: "minute" },
  { s: 1, zh: "秒", en: "second" },
] as const;

/**
 * How long ago or ahead: "just now" within ten seconds, then seconds,
 * minutes, hours or days, in the past ("12 minutes ago") or the future
 * ("in 3 hours"), such as a lease or a scheduled job.
 */
export function relative(
  value: TimeInput,
  now: number = Date.now(),
  locale: Locale = DEFAULT_LOCALE,
): string {
  const d = toDate(value);
  if (!d) return "";
  const delta = Math.round((now - d.getTime()) / 1000);
  const s = Math.abs(delta);
  const zh = locale === "zh-CN";
  if (s < 10) return zh ? "刚刚" : "just now";
  const unit = UNITS.find((u) => s >= u.s) ?? UNITS[3];
  const n = Math.floor(s / unit.s);
  if (zh) return `${n} ${unit.zh}${delta < 0 ? "后" : "前"}`;
  const amount = `${n} ${unit.en}${n === 1 ? "" : "s"}`;
  return delta < 0 ? `in ${amount}` : `${amount} ago`;
}

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const dayNumber = (d: Date) =>
  Math.floor((d.getTime() - d.getTimezoneOffset() * 60_000) / 86_400_000);

/**
 * An instant the way a person says it: relative within the hour ("12 minutes
 * ago"), then "Today 14:05", "Yesterday 09:12" or "Tomorrow 08:00",
 * "Sep 21 20:40" within the year, and "Dec 3, 2025" before it, in the
 * locale's own words. `seconds` keeps the seconds on the clock and skips the
 * relative form, for instants that need them, such as a job's start and end.
 */
export function friendly(
  value: TimeInput,
  options: { seconds?: boolean; now?: Date; locale?: Locale } = {},
): string {
  const d = toDate(value);
  if (!d) return "";
  const now = options.now ?? new Date();
  const zh = (options.locale ?? DEFAULT_LOCALE) === "zh-CN";
  if (isRelative(d, { ...options, now }))
    return relative(d, now.getTime(), options.locale);
  const time = `${pad(d.getHours())}:${pad(d.getMinutes())}${options.seconds ? `:${pad(d.getSeconds())}` : ""}`;
  const days = dayNumber(d) - dayNumber(now);
  if (days === 0) return `${zh ? "今天" : "Today"} ${time}`;
  if (days === -1) return `${zh ? "昨天" : "Yesterday"} ${time}`;
  if (days === 1) return `${zh ? "明天" : "Tomorrow"} ${time}`;
  const month = d.getMonth();
  if (d.getFullYear() === now.getFullYear())
    return zh
      ? `${month + 1}月${d.getDate()}日 ${time}`
      : `${MONTHS[month]} ${d.getDate()} ${time}`;
  return zh
    ? `${d.getFullYear()}年${month + 1}月${d.getDate()}日`
    : `${MONTHS[month]} ${d.getDate()}, ${d.getFullYear()}`;
}

/**
 * Whether friendly() shows the instant in its relative form ("12 minutes ago"),
 * which changes as time passes: within the hour, unless `seconds` is set.
 */
export function isRelative(
  value: TimeInput,
  options: { seconds?: boolean; now?: Date } = {},
): boolean {
  const d = toDate(value);
  const now = options.now ?? new Date();
  return (
    !!d && !options.seconds && Math.abs(now.getTime() - d.getTime()) < 3_600_000
  );
}

/** "UTC+8", "UTC-3:30" or "UTC" for the local offset at an instant. */
export function utcOffset(value: TimeInput): string {
  const d = toDate(value);
  if (!d) return "";
  const m = -d.getTimezoneOffset();
  if (m === 0) return "UTC";
  const h = Math.floor(Math.abs(m) / 60);
  const rest = Math.abs(m) % 60;
  return `UTC${m < 0 ? "-" : "+"}${h}${rest ? `:${pad(rest)}` : ""}`;
}

/**
 * The exact forms of an instant, for a hover card: local time to the
 * millisecond with its offset, the same instant in UTC (what server logs
 * print), and how long ago it was.
 */
export function exactTime(
  value: TimeInput,
  locale: Locale = DEFAULT_LOCALE,
): { local: string; utc: string; relative: string } | null {
  const d = toDate(value);
  if (!d) return null;
  const iso = d.toISOString();
  return {
    local: `${timestamp(d)}.${pad(d.getMilliseconds(), 3)} ${utcOffset(d)}`,
    utc: `${iso.slice(0, 10)} ${iso.slice(11, 23)} UTC`,
    relative: relative(d, Date.now(), locale),
  };
}
