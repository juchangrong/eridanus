import {
  CaretDownIcon,
  CaretUpDownIcon,
  CaretUpIcon,
} from "@phosphor-icons/react";
import type { ReactNode } from "react";

import { TableHead } from "@/components/ui/table";
import { cn } from "@/lib/utils";

/** The column a table is sorted by and its direction, or null for the
 * table's own order. */
export type SortState = { column: string; desc: boolean } | null;

/** "-createdAt" for descending, "createdAt" for ascending, "" for none: the
 * usual `sort=` parameter, and a value for useUrlState. */
export function formatSort(sort: SortState): string {
  return sort ? `${sort.desc ? "-" : ""}${sort.column}` : "";
}

/** The inverse of formatSort. */
export function parseSort(text: string): SortState {
  if (!text) return null;
  const desc = text.startsWith("-");
  return { column: desc ? text.slice(1) : text, desc };
}

/**
 * The sort a click on a column header leads to. A new column starts in its
 * first direction (`descFirst` for times and counts, where the largest
 * matters first), a second click reverses it, and a third returns the table
 * to its own order.
 */
function nextSort(
  sort: SortState,
  column: string,
  descFirst = false,
): SortState {
  if (sort?.column !== column) return { column, desc: descFirst };
  if (sort.desc === descFirst) return { column, desc: !descFirst };
  return null;
}

/**
 * A column header that sorts the table. It is a button inside the header
 * cell, and the cell carries aria-sort, so screen readers announce the
 * order. Put it in a TableHeaderRow in place of TableHead; the rows are
 * sorted by whoever owns `sort`, usually the server. Pass the sort to
 * usePaging's filters too, so a new order starts on the first page.
 */
export function SortableHead({
  column,
  sort,
  onSortChange,
  descFirst,
  align = "start",
  className,
  children,
}: {
  column: string;
  sort: SortState;
  onSortChange: (sort: SortState) => void;
  descFirst?: boolean;
  align?: "start" | "end";
  className?: string;
  children: ReactNode;
}) {
  const active = sort?.column === column ? sort : null;
  const Icon = !active
    ? CaretUpDownIcon
    : active.desc
      ? CaretDownIcon
      : CaretUpIcon;
  return (
    <TableHead
      aria-sort={
        active ? (active.desc ? "descending" : "ascending") : undefined
      }
      className={cn(align === "end" && "text-right", className)}
    >
      <button
        type="button"
        className={cn(
          "-mx-2 inline-flex h-6 items-center gap-1 rounded-full px-2 outline-offset-1 hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring",
          active && "text-foreground",
          align === "end" && "flex-row-reverse",
        )}
        onClick={() => onSortChange(nextSort(sort, column, descFirst))}
      >
        {children}
        <Icon aria-hidden className={cn("size-3", !active && "opacity-50")} />
      </button>
    </TableHead>
  );
}
