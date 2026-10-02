import { timestamp } from "@/lib/eridanus/format-time";
import {
  describeTimeRange,
  formatTimeRange,
  parseTimeRange,
  resolveTimeRange,
} from "@/lib/eridanus/time-range";

const TEXTS = [
  "15m",
  "24h",
  "7d",
  "2026-09-28..2026-10-01",
  "2026-10-01..2026-10-01",
  "1x",
];

export default function TimeRangeDemo() {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full font-mono text-[13px]">
        <thead className="text-left text-xs text-muted-foreground">
          <tr>
            <th className="py-1 pe-6 font-normal">text</th>
            <th className="py-1 pe-6 font-normal">describeTimeRange</th>
            <th className="py-1 font-normal">resolveTimeRange</th>
          </tr>
        </thead>
        <tbody>
          {TEXTS.map((text) => {
            const range = parseTimeRange(text);
            const span = range && resolveTimeRange(range);
            return (
              <tr key={text}>
                <td className="py-1 pe-6">
                  {range ? formatTimeRange(range) : text}
                </td>
                <td className="py-1 pe-6 font-sans">
                  {range ? describeTimeRange(range) : "null"}
                </td>
                <td className="py-1 whitespace-nowrap text-muted-foreground">
                  {span
                    ? `${timestamp(span.from)} → ${timestamp(span.to)}`
                    : "—"}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
