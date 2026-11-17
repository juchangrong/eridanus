import type { MouseEvent, ReactNode } from "react";

import { EmptyState } from "@/components/eridanus/empty-state";
import { useMessages } from "@/components/eridanus/locale-provider";
import { TableCell, TableHeader, TableRow } from "@/components/ui/table";
import type { Locale } from "@/lib/eridanus/locale";
import { cn } from "@/lib/utils";

const MESSAGES: Record<Locale, { loading: string }> = {
  "zh-CN": { loading: "加载中…" },
  "en-US": { loading: "Loading…" },
};

/**
 * The area a table scrolls in, open on the page rather than in a card. It
 * scrolls both ways and keeps a TableHeaderRow pinned. Body rows keep
 * shadcn's rule under each row; `rules={false}` leaves them out, with padding
 * and the hover ground keeping the rows apart. The rules start and end where
 * the toolbar and headings above do. `bleed` pulls the area into the page
 * gutter by a cell's padding instead, so the first column's text lines up
 * with them; it suits a table without rules. `fill` keeps a minimum height
 * inside a page that gives the table the remaining height.
 */
export function TableScroll({
  children,
  bleed = false,
  rules = true,
  fill = false,
  className,
}: {
  children: ReactNode;
  bleed?: boolean;
  rules?: boolean;
  fill?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "overflow-auto",
        // The table's own overflow container would take the header row's
        // sticky context, so this area does the scrolling.
        "[&_[data-slot=table-container]]:overflow-visible",
        !rules && "[&_[data-slot=table-body]>[data-slot=table-row]]:border-b-0",
        bleed && "-mx-2",
        fill && "min-h-40",
        className,
      )}
    >
      {children}
    </div>
  );
}

/**
 * The column header row, as shadcn's table draws it (medium-weight labels in
 * the text color, 40px tall), pinned while the table scrolls. Its rule is an inset shadow, because a pinned row's border
 * stays behind as the rows scroll under it. Put TableHead cells inside.
 */
export function TableHeaderRow({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <TableHeader
      className={cn(
        "sticky top-0 z-10 bg-background [&_tr]:border-b-0",
        className,
      )}
    >
      <TableRow className="border-b-0 hover:bg-transparent [&_th]:shadow-[inset_0_-1px_0_var(--color-border)]">
        {children}
      </TableRow>
    </TableHeader>
  );
}

/**
 * A table body's three states, the same in every table: the first read on
 * its way, nothing to show, or the rows. Render it inside TableBody.
 */
export function TableRows<T>({
  colSpan,
  pending,
  rows,
  empty,
  loadingLabel,
  children,
}: {
  /** The number of columns, so the loading and empty rows span the table. */
  colSpan: number;
  pending?: boolean;
  rows: readonly T[];
  empty: { title: ReactNode; description?: ReactNode; contents?: ReactNode };
  loadingLabel?: ReactNode;
  children: (row: T, index: number) => ReactNode;
}) {
  const t = useMessages(MESSAGES);
  if (pending) {
    return (
      <TableRow className="hover:bg-transparent">
        <TableCell
          colSpan={colSpan}
          className="py-10 text-center text-muted-foreground"
        >
          {loadingLabel ?? t.loading}
        </TableCell>
      </TableRow>
    );
  }
  if (rows.length === 0) {
    return (
      <TableRow className="hover:bg-transparent">
        <TableCell colSpan={colSpan} className="whitespace-normal">
          <EmptyState size="sm" {...empty} />
        </TableCell>
      </TableRow>
    );
  }
  return <>{rows.map(children)}</>;
}

/**
 * The mouse shortcut on a row that opens something. The row's first link or
 * button is the real control for keyboards and screen readers, and a click
 * anywhere else on the row goes to it. A click on a control of its own (a
 * link, a button, a field, or a Base UI checkbox or switch, which are not
 * buttons), a click that ends a text selection, and a click React bubbles up
 * from a portal (a menu opened from the row) are left alone.
 */
export function clickFirstControl(e: MouseEvent<HTMLElement>) {
  if (!e.currentTarget.contains(e.target as Node)) return;
  if ((e.target as HTMLElement).closest(CONTROLS)) return;
  if (window.getSelection()?.toString()) return;
  e.currentTarget.querySelector<HTMLElement>("a[href], button")?.click();
}

const CONTROLS =
  "a, button, input, select, textarea, label, [role=checkbox], [role=switch], [role=radio], [contenteditable]";

const ROW_TONE = {
  error: "bg-destructive/5 hover:bg-destructive/10",
  warning: "bg-warning/5 hover:bg-warning/10",
};

/**
 * A row that opens or selects something through clickFirstControl.
 * `selected` marks it with the table's selected ground, and outranks `tone`,
 * which tints rows that need attention.
 */
export function ClickableRow({
  selected,
  tone,
  className,
  children,
}: {
  selected?: boolean;
  tone?: keyof typeof ROW_TONE;
  className?: string;
  children: ReactNode;
}) {
  return (
    <TableRow
      data-state={selected ? "selected" : undefined}
      aria-selected={selected || undefined}
      className={cn(
        "cursor-pointer",
        !selected && tone && ROW_TONE[tone],
        className,
      )}
      onClick={clickFirstControl}
    >
      {children}
    </TableRow>
  );
}
