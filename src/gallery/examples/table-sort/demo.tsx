import { useState } from "react";

import { TableHeaderRow, TableScroll } from "@/components/eridanus/table-kit";
import {
  formatSort,
  SortableHead,
  type SortState,
} from "@/components/eridanus/table-sort";
import { Time } from "@/components/eridanus/time";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

const NOW = Date.now();
const WORKFLOWS = [
  { name: "syncCatalog", runs: 1840, lastRun: NOW - 4 * 60_000 },
  { name: "sendDigest", runs: 92, lastRun: NOW - 26 * 3_600_000 },
  { name: "resizeImages", runs: 15_302, lastRun: NOW - 40_000 },
  { name: "buildWeeklyReport", runs: 12, lastRun: NOW - 5 * 86_400_000 },
];
type Column = "name" | "runs" | "lastRun";

export default function TableSortDemo() {
  const [sort, setSort] = useState<SortState>({
    column: "lastRun",
    desc: true,
  });
  // Sorted here for the demo; a real table sends formatSort(sort) to its API.
  const rows = sort
    ? [...WORKFLOWS].sort((a, b) => {
        const col = sort.column as Column;
        const order = a[col] < b[col] ? -1 : a[col] > b[col] ? 1 : 0;
        return sort.desc ? -order : order;
      })
    : WORKFLOWS;

  return (
    <div className="flex w-full flex-col gap-3">
      <TableScroll>
        <Table>
          <TableHeaderRow>
            <SortableHead column="name" sort={sort} onSortChange={setSort}>
              工作流
            </SortableHead>
            <SortableHead
              column="runs"
              descFirst
              align="end"
              sort={sort}
              onSortChange={setSort}
            >
              运行次数
            </SortableHead>
            <SortableHead
              column="lastRun"
              descFirst
              sort={sort}
              onSortChange={setSort}
            >
              最近运行
            </SortableHead>
          </TableHeaderRow>
          <TableBody>
            {rows.map((w) => (
              <TableRow key={w.name}>
                <TableCell className="font-mono text-[13px]">
                  {w.name}
                </TableCell>
                <TableCell className="text-right tabular-nums">
                  {w.runs.toLocaleString()}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  <Time value={w.lastRun} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableScroll>
      <p className="m-0 font-mono text-[13px] text-muted-foreground">
        sort={formatSort(sort)}
      </p>
    </div>
  );
}
