import {
  clock,
  exactTime,
  friendly,
  relative,
  timestamp,
} from "@/lib/eridanus/format-time";

const SAMPLE = new Date(Date.now() - 3 * 24 * 60 * 60_000 - 5 * 60 * 60_000);

const CALLS = [
  ["friendly(t)", friendly(SAMPLE)],
  ["friendly(t, { seconds: true })", friendly(SAMPLE, { seconds: true })],
  ["relative(t)", relative(SAMPLE)],
  ["clock(t)", clock(SAMPLE)],
  ["timestamp(t)", timestamp(SAMPLE)],
  ["exactTime(t).local", exactTime(SAMPLE)?.local],
  ["exactTime(t).utc", exactTime(SAMPLE)?.utc],
] as const;

export default function FormatTimeDemo() {
  return (
    <dl className="m-0 grid grid-cols-1 gap-x-8 gap-y-2 text-sm sm:grid-cols-[auto_auto]">
      {CALLS.map(([call, value]) => (
        <div key={call} className="contents">
          <dt className="font-mono text-[13px] text-muted-foreground">
            {call}
          </dt>
          <dd className="m-0 font-mono text-[13px]">{value}</dd>
        </div>
      ))}
    </dl>
  );
}
