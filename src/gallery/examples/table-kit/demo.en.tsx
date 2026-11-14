import { useMemo, useState } from "react";

import { FilterSelect } from "@/components/eridanus/filter-select";
import { Pager } from "@/components/eridanus/pager";
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
          label="Search runs"
          placeholder="Workflow or run ID"
          value={q}
          onChange={setQ}
        />
        <FilterSelect
          label="Status"
          value={status}
          onChange={setStatus}
          options={STATUSES.map((s) => ({ value: s, label: s }))}
        />
      </div>
      <TableScroll className="max-h-[26rem]">
        <Table>
          <TableHeaderRow>
            <TableHead>Run</TableHead>
            <TableHead>Workflow</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created</TableHead>
          </TableHeaderRow>
          <TableBody>
            <TableRows
              colSpan={4}
              rows={page}
              empty={{
                title: "No matching runs",
                description: "Try another keyword or loosen the filters.",
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
                        notify("Open run", { description: run.id })
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
        labels={{ navigation: "Runs pagination" }}
      />
    </div>
  );
}
