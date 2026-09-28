/**
 * Time formatting in Chinese for interfaces people scan and copy from: a
 * readable form for the surface ("刚刚", "今天 14:05") and the exact forms a
 * hover card shows. Every function takes a Date, an ISO string or epoch
 * milliseconds, works in the browser's time zone, and returns "" (or null)
 * for missing or unparseable input.
 */

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
  return d ? `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}` : "";
}

/** "YYYY-MM-DD HH:mm:ss" in local time. */
export function timestamp(value: TimeInput): string {
  const d = toDate(value);
  return d ? `${localDay(d)} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}` : "";
}

/** "HH:mm:ss" in local time, for instants whose day is already on screen. */
export function clock(value: TimeInput): string {
  return timestamp(value).slice(11);
}

/**
 * How long ago or ahead: "刚刚" within ten seconds, then seconds, minutes,
 * hours or days, with "前" for the past and "后" for the future (a lease, a
 * scheduled job).
 */
export function relative(value: TimeInput, now: number = Date.now()): string {
  const d = toDate(value);
  if (!d) return "";
  const delta = Math.round((now - d.getTime()) / 1000);
  const s = Math.abs(delta);
  const dir = delta < 0 ? "后" : "前";
  if (s < 10) return "刚刚";
  if (s < 60) return `${s} 秒${dir}`;
  if (s < 3600) return `${Math.floor(s / 60)} 分钟${dir}`;
  if (s < 86_400) return `${Math.floor(s / 3600)} 小时${dir}`;
  return `${Math.floor(s / 86_400)} 天${dir}`;
}

const dayNumber = (d: Date) => Math.floor((d.getTime() - d.getTimezoneOffset() * 60_000) / 86_400_000);

/**
 * An instant the way a person says it: relative within the hour ("12 分钟前"),
 * then "今天 14:05", "昨天 09:12" or "明天 08:00", "9月21日 20:40" within the
 * year, and "2025年12月3日" before it. `seconds` keeps the seconds on the
 * clock and skips the relative form, for instants that need them, such as a
 * job's start and end.
 */
export function friendly(value: TimeInput, options: { seconds?: boolean; now?: Date } = {}): string {
  const d = toDate(value);
  if (!d) return "";
  const now = options.now ?? new Date();
  if (!options.seconds && Math.abs(now.getTime() - d.getTime()) < 3_600_000) {
    return relative(d, now.getTime());
  }
  const time = `${pad(d.getHours())}:${pad(d.getMinutes())}${options.seconds ? `:${pad(d.getSeconds())}` : ""}`;
  const days = dayNumber(d) - dayNumber(now);
  if (days === 0) return `今天 ${time}`;
  if (days === -1) return `昨天 ${time}`;
  if (days === 1) return `明天 ${time}`;
  if (d.getFullYear() === now.getFullYear()) return `${d.getMonth() + 1}月${d.getDate()}日 ${time}`;
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
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
export function exactTime(value: TimeInput): { local: string; utc: string; relative: string } | null {
  const d = toDate(value);
  if (!d) return null;
  const iso = d.toISOString();
  return {
    local: `${timestamp(d)}.${pad(d.getMilliseconds(), 3)} ${utcOffset(d)}`,
    utc: `${iso.slice(0, 10)} ${iso.slice(11, 23)} UTC`,
    relative: relative(d),
  };
}
