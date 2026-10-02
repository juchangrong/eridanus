import { MultiFilter } from "@/components/eridanus/multi-filter";
import { SearchField } from "@/components/eridanus/search-field";
import { TimeRangePicker } from "@/components/eridanus/time-range-picker";
import { useUrlListState, useUrlState } from "@/hooks/eridanus/use-url-state";
import { formatTimeRange, parseTimeRange } from "@/lib/eridanus/time-range";

const STATUSES = ["failed", "running", "completed"].map((s) => ({
  value: s,
  label: s,
}));

export default function UseUrlStateDemo() {
  const [q, setQ] = useUrlState("q");
  const [status, setStatus] = useUrlListState("status");
  const [rangeText, setRangeText] = useUrlState("range", "1h");
  const range = parseTimeRange(rangeText) ?? { last: "1h" };

  return (
    <div className="flex w-full flex-col gap-3">
      <div className="flex flex-wrap items-center gap-2">
        <SearchField label="搜索运行" value={q} onChange={setQ} />
        <MultiFilter
          label="状态"
          value={status}
          onChange={setStatus}
          options={STATUSES}
        />
        <TimeRangePicker
          value={range}
          onChange={(next) => setRangeText(formatTimeRange(next))}
        />
      </div>
      {/* Every write re-renders this component, so the address is current. */}
      <p className="m-0 font-mono text-[13px] break-all text-muted-foreground">
        {window.location.search || "（地址栏没有查询参数）"}
      </p>
    </div>
  );
}
