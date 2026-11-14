import { ArrowClockwiseIcon, TrashIcon } from "@phosphor-icons/react";
import { useState } from "react";

import { ConfirmDialog } from "@/components/eridanus/confirm-dialog";
import { FilterSelect } from "@/components/eridanus/filter-select";
import {
  ClickableRow,
  TableHeaderRow,
  TableRows,
  TableScroll,
} from "@/components/eridanus/table-kit";
import {
  SelectAllHead,
  SelectCell,
  SelectionBar,
  useRowSelection,
} from "@/components/eridanus/table-selection";
import { notify } from "@/components/eridanus/toaster";
import { type Tone, ToneBadge } from "@/components/eridanus/tone-badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead } from "@/components/ui/table";

const STATUSES = ["failed", "completed", "running"] as const;
const TONE: Record<(typeof STATUSES)[number], Tone> = {
  failed: "error",
  completed: "success",
  running: "info",
};
const INITIAL = [
  { id: "run_5c1e9a", workflow: "syncCatalog", status: "failed" },
  { id: "run_5c3d89", workflow: "sendDigest", status: "completed" },
  { id: "run_5c5c78", workflow: "resizeImages", status: "running" },
  { id: "run_5c7b67", workflow: "syncCatalog", status: "failed" },
  { id: "run_5c9a56", workflow: "sendDigest", status: "completed" },
  { id: "run_5cb945", workflow: "resizeImages", status: "running" },
] as const;

export default function TableSelectionDemo() {
  const [runs, setRuns] =
    useState<readonly (typeof INITIAL)[number][]>(INITIAL);
  const [status, setStatus] = useState("");
  const rows = runs.filter((r) => !status || r.status === status);
  const selection = useRowSelection(
    rows.map((r) => r.id),
    [status],
  );

  return (
    <div className="flex w-full flex-col gap-3">
      {selection.selected.size > 0 ? (
        <SelectionBar selection={selection}>
          <Button
            size="sm"
            variant="secondary"
            onClick={() => notify(`Re-ran ${selection.selected.size} runs`)}
          >
            <ArrowClockwiseIcon data-icon="inline-start" />
            Re-run
          </Button>
          <ConfirmDialog
            trigger={
              <Button size="sm" variant="destructive">
                <TrashIcon data-icon="inline-start" />
                Delete
              </Button>
            }
            title={`Delete ${selection.selected.size} runs?`}
            description="This cannot be undone."
            confirmLabel="Delete"
            destructive
            onConfirm={async () => {
              const gone = selection.selected;
              setRuns((all) => all.filter((r) => !gone.has(r.id)));
              selection.clear();
              notify(`Deleted ${gone.size} runs`);
            }}
          />
        </SelectionBar>
      ) : (
        <div className="flex min-h-7 items-center">
          <FilterSelect
            label="Status"
            value={status}
            onChange={setStatus}
            options={STATUSES.map((s) => ({ value: s, label: s }))}
          />
        </div>
      )}
      <TableScroll>
        <Table>
          <TableHeaderRow>
            <SelectAllHead selection={selection} />
            <TableHead>Run</TableHead>
            <TableHead>Workflow</TableHead>
            <TableHead>Status</TableHead>
          </TableHeaderRow>
          <TableBody>
            <TableRows colSpan={4} rows={rows} empty={{ title: "No runs" }}>
              {(run) => (
                <ClickableRow
                  key={run.id}
                  selected={selection.selected.has(run.id)}
                >
                  <SelectCell
                    selection={selection}
                    id={run.id}
                    label={`Select ${run.id}`}
                  />
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
                </ClickableRow>
              )}
            </TableRows>
          </TableBody>
        </Table>
      </TableScroll>
    </div>
  );
}
