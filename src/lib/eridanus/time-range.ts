/**
 * Time ranges for filtering logs, runs and metrics: either the last stretch
 * of time ("1h", moving with the clock) or a span of whole local days
 * ("2026-09-28..2026-10-01", both days included). Both have a short text
 * form for URLs and query strings.
 */

export type TimeRange = { last: string } | { from: string; to: string };

const UNITS = {
  m: { ms: 60_000, label: "分钟" },
  h: { ms: 3_600_000, label: "小时" },
  d: { ms: 86_400_000, label: "天" },
} as const;

const LAST = /^(\d+)([mhd])$/;
const DAY = /^(\d{4})-(\d{2})-(\d{2})$/;

/** The usual choices, newest first. */
export const TIME_RANGE_PRESETS: readonly string[] = [
  "15m",
  "1h",
  "6h",
  "24h",
  "7d",
  "30d",
];

/** A local "YYYY-MM-DD" day at its midnight, or null. */
export function parseDay(day: string): Date | null {
  const m = DAY.exec(day);
  if (!m) return null;
  const d = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
  return d.getDate() === Number(m[3]) ? d : null;
}

/** "1h" or "2026-09-28..2026-10-01"; the inverse of parseTimeRange. */
export function formatTimeRange(range: TimeRange): string {
  return "last" in range ? range.last : `${range.from}..${range.to}`;
}

/** The range a text form names, or null when it names none. */
export function parseTimeRange(text: string): TimeRange | null {
  if (LAST.test(text) && Number.parseInt(text, 10) > 0) return { last: text };
  const [from, to, extra] = text.split("..");
  if (extra !== undefined || !from || !to) return null;
  const start = parseDay(from);
  const end = parseDay(to);
  return start && end && start <= end ? { from, to } : null;
}

/**
 * The instants a range covers: `from` inclusive, `to` exclusive. A trailing
 * range ends now; a day range ends at the midnight after its last day.
 */
export function resolveTimeRange(
  range: TimeRange,
  now: number = Date.now(),
): { from: Date; to: Date } {
  if ("last" in range) {
    const m = LAST.exec(range.last) ?? ["1h", "1", "h"];
    const ms = Number(m[1]) * UNITS[m[2] as keyof typeof UNITS].ms;
    return { from: new Date(now - ms), to: new Date(now) };
  }
  const from = parseDay(range.from) ?? new Date(now);
  const to = parseDay(range.to) ?? new Date(now);
  to.setDate(to.getDate() + 1);
  return { from, to };
}

/** "最近 1 小时", "2026-10-01" or "2026-09-28 至 2026-10-01". */
export function describeTimeRange(range: TimeRange): string {
  if ("last" in range) {
    const m = LAST.exec(range.last);
    if (!m) return range.last;
    return `最近 ${m[1]} ${UNITS[m[2] as keyof typeof UNITS].label}`;
  }
  return range.from === range.to ? range.from : `${range.from} 至 ${range.to}`;
}
