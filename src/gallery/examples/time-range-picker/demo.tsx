import { useState } from "react";

import { TimeRangePicker } from "@/components/eridanus/time-range-picker";
import { timestamp } from "@/lib/eridanus/format-time";
import {
  formatTimeRange,
  resolveTimeRange,
  type TimeRange,
} from "@/lib/eridanus/time-range";

export default function TimeRangePickerDemo() {
  const [range, setRange] = useState<TimeRange>({ last: "1h" });
  const { from, to } = resolveTimeRange(range);
  return (
    <div className="flex flex-col items-start gap-3">
      <TimeRangePicker value={range} onChange={setRange} />
      <p className="m-0 font-mono text-[13px] text-muted-foreground">
        range={formatTimeRange(range)}
        <br />
        {timestamp(from)} → {timestamp(to)}
      </p>
    </div>
  );
}
