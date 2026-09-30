import { useMemo, useState } from "react";

import { FilterSelect } from "@/components/eridanus/filter-select";
import { defaultPagerLabels, Pager } from "@/components/eridanus/pager";
import { SearchField } from "@/components/eridanus/search-field";
import {
  ClickableRow,
  TableHeaderRow,
  TableRows,
  TableScroll,
} from "@/components/eridanus/table-kit";
import { Time } from "@/components/eridanus/time";
import { notify } from "@/components/eridanus/toaster";
import { type Tone, ToneBadge } from "@/components/eridanus/tone-badge";
import { Table, TableBody, TableCell, TableHead } from "@/components/ui/table";
import { useDebouncedValue } from "@/hooks/eridanus/use-debounced-value";
import { usePaging } from "@/hooks/eridanus/use-paging";

const STATUSES = [
  "completed",
  "running",
  "failed",
  "pending",
  "cancelled",
] as const;
type Status = (typeof STATUSES)[number];
const TONE: Record<Status, Tone> = {
  completed: "success",
  running: "info",
  failed: "error",
  pending: "neutral",
  cancelled: "outline",
};
const WORKFLOWS = [
  "syncCatalog",
  "sendDigest",
  "resizeImages",
  "buildWeeklyReport",
];
const NOW = Date.now();
const RUNS = Array.from({ length: 137 }, (_, i) => ({
  id: `run_${(0x2f5a1c3 + i * 7919).toString(36)}${(0x9b2e + i * 131).toString(36)}`,
  workflow: WORKFLOWS[i % WORKFLOWS.length]!,
  status: STATUSES[(i * 3) % STATUSES.length]!,
  createdAt: new Date(NOW - i * 37 * 60_000 - 20_000),
}));

export default function TableKitDemo() {
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("");
  const query = useDebouncedValue(q);
  const paging = usePaging([query, status], 10);
  const rows = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return RUNS.filter(
      (r) =>
        (!status || r.status === status) &&
        (!needle || `${r.id} ${r.workflow}`.toLowerCase().includes(needle)),
    );
  }, [query, status]);
  const page = rows.slice(paging.offset, paging.offset + paging.pageSize);

  return (
    <div className="flex w-full flex-col gap-3">
      <div className="flex flex-wrap items-center gap-2">
        <SearchField
          label="搜索运行"
          placeholder="工作流或 Run ID"
          value={q}
          onChange={setQ}
        />
        <FilterSelect
          label="状态"
          value={status}
          onChange={setStatus}
          options={STATUSES.map((s) => ({ value: s, label: s }))}
        />
      </div>
      <TableScroll className="max-h-[26rem]">
        <Table>
          <TableHeaderRow>
            <TableHead>运行</TableHead>
            <TableHead>工作流</TableHead>
            <TableHead>状态</TableHead>
            <TableHead>创建时间</TableHead>
          </TableHeaderRow>
          <TableBody>
            <TableRows
              colSpan={4}
              rows={page}
              empty={{
                title: "没有匹配的运行",
                description: "换个关键词，或放宽筛选条件。",
              }}
            >
              {(run) => (
                <ClickableRow
                  key={run.id}
                  tone={run.status === "failed" ? "error" : undefined}
                >
                  <TableCell>
                    <button
                      type="button"
                      className="rounded-sm font-mono text-[13px] underline decoration-foreground/30 underline-offset-[3px] outline-offset-2 hover:decoration-foreground focus-visible:outline-2 focus-visible:outline-ring"
                      onClick={() =>
                        notify("打开运行", { description: run.id })
                      }
                    >
                      {run.id}
                    </button>
                  </TableCell>
                  <TableCell className="font-mono text-[13px]">
                    {run.workflow}
                  </TableCell>
                  <TableCell>
                    <ToneBadge tone={TONE[run.status]}>{run.status}</ToneBadge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    <Time value={run.createdAt} />
                  </TableCell>
                </ClickableRow>
              )}
            </TableRows>
          </TableBody>
        </Table>
      </TableScroll>
      <Pager
        {...paging}
        total={rows.length}
        pageSizes={[10, 20, 50]}
        labels={{ ...defaultPagerLabels, navigation: "运行列表分页" }}
      />
    </div>
  );
}
