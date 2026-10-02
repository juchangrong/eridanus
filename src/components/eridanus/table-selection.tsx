import type { ReactNode } from "react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { TableCell, TableHead } from "@/components/ui/table";
import { cn } from "@/lib/utils";

export interface RowSelection {
  /** The selected ids, across pages. */
  selected: ReadonlySet<string>;
  toggle: (id: string) => void;
  /** Selects every visible row, or clears them when all are selected. */
  toggleVisible: () => void;
  clear: () => void;
  /** "all", "some" or "none" of the visible rows are selected. */
  visible: "all" | "some" | "none";
}

/**
 * Row selection for bulk actions. `visibleIds` are the rows on screen, which
 * the header checkbox selects; a selection made on one page stays while
 * paging. `filters` work as in usePaging: when any of them changes the
 * selection clears, because rows chosen under one filter may be hidden
 * under another and would be acted on unseen.
 */
export function useRowSelection(
  visibleIds: readonly string[],
  filters: readonly unknown[] = [],
): RowSelection {
  const key = JSON.stringify(filters);
  const [state, setState] = useState(() => ({ key, ids: EMPTY }));
  const selected = state.key === key ? state.ids : EMPTY;
  const set = (ids: ReadonlySet<string>) => setState({ key, ids });
  const shown = visibleIds.filter((id) => selected.has(id)).length;
  const visible =
    shown === 0 ? "none" : shown === visibleIds.length ? "all" : "some";
  return {
    selected,
    toggle: (id) => {
      const next = new Set(selected);
      if (!next.delete(id)) next.add(id);
      set(next);
    },
    toggleVisible: () => {
      const next = new Set(selected);
      for (const id of visibleIds) {
        if (visible === "all") next.delete(id);
        else next.add(id);
      }
      set(next);
    },
    clear: () => set(EMPTY),
    visible,
  };
}

const EMPTY: ReadonlySet<string> = new Set();

/** The header cell that selects or clears every visible row. It shows a
 * dash while only some are selected. */
export function SelectAllHead({
  selection,
  label = "选择本页全部",
}: {
  selection: RowSelection;
  label?: string;
}) {
  return (
    <TableHead className="w-8">
      <Checkbox
        aria-label={label}
        checked={selection.visible === "all"}
        indeterminate={selection.visible === "some"}
        onCheckedChange={selection.toggleVisible}
        className={cn(
          // The stock indicator draws a check for the mixed state too.
          "data-indeterminate:border-primary data-indeterminate:bg-primary data-indeterminate:text-primary-foreground",
          "data-indeterminate:*:hidden data-indeterminate:before:h-0.5 data-indeterminate:before:w-2 data-indeterminate:before:rounded-full data-indeterminate:before:bg-current",
        )}
      />
    </TableHead>
  );
}

/** The cell that selects one row. ClickableRow leaves clicks on the
 * checkbox to it, so picking rows never opens one. */
export function SelectCell({
  selection,
  id,
  label,
}: {
  selection: RowSelection;
  id: string;
  /** Names the row, e.g. `选择 ${run.id}`. */
  label: string;
}) {
  return (
    <TableCell className="w-8">
      <Checkbox
        aria-label={label}
        checked={selection.selected.has(id)}
        onCheckedChange={() => selection.toggle(id)}
      />
    </TableCell>
  );
}

/**
 * The bar that replaces a table's toolbar while rows are selected
 * (`selection.selected.size > 0`): how many, the bulk actions, and a way
 * out. Bulk writes go through ConfirmDialog like any other irreversible write.
 */
export function SelectionBar({
  selection,
  children,
  countLabel = (n) => `已选 ${n.toLocaleString()} 项`,
  clearLabel = "取消选择",
  className,
}: {
  selection: RowSelection;
  /** The bulk actions, as small buttons. */
  children: ReactNode;
  countLabel?: (count: number) => string;
  clearLabel?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex min-h-7 flex-wrap items-center gap-2 text-sm",
        className,
      )}
    >
      <span role="status" className="font-medium tabular-nums">
        {countLabel(selection.selected.size)}
      </span>
      {children}
      <Button
        variant="ghost"
        size="sm"
        className="ms-auto"
        onClick={selection.clear}
      >
        {clearLabel}
      </Button>
    </div>
  );
}
