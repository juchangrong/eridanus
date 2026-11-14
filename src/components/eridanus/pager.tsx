import {
  CaretDoubleLeftIcon,
  CaretDoubleRightIcon,
  CaretLeftIcon,
  CaretRightIcon,
} from "@phosphor-icons/react";
import { useEffect, useState } from "react";

import { useMessages } from "@/components/eridanus/locale-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Locale } from "@/lib/eridanus/locale";

export interface PagerLabels {
  navigation: string;
  first: string;
  previous: string;
  next: string;
  last: string;
  pageSize: string;
  /** The page field's accessible name, given the page count. */
  page: (pages: number) => string;
  /** The range line, e.g. "第 1–50 条，共 173 条" or "1–50 of 173"; `total` is 0 for an empty list. */
  range: (first: number, last: number, total: number) => string;
  /** An option in the page-size select. */
  size: (size: number) => string;
}

/** The built-in text in each locale. */
export const pagerLabels: Record<Locale, PagerLabels> = {
  "zh-CN": {
    navigation: "分页",
    first: "第一页",
    previous: "上一页",
    next: "下一页",
    last: "最后一页",
    pageSize: "每页条数",
    page: (pages) => `页码，共 ${pages} 页`,
    range: (first, last, total) =>
      total === 0
        ? "共 0 条"
        : `第 ${first.toLocaleString()}–${last.toLocaleString()} 条，共 ${total.toLocaleString()} 条`,
    size: (size) => `${size} 条`,
  },
  "en-US": {
    navigation: "Pagination",
    first: "First page",
    previous: "Previous page",
    next: "Next page",
    last: "Last page",
    pageSize: "Rows per page",
    page: (pages) => `Page, of ${pages}`,
    range: (first, last, total) =>
      total === 0
        ? "0 rows"
        : `${first.toLocaleString()}–${last.toLocaleString()} of ${total.toLocaleString()}`,
    size: (size) => `${size} / page`,
  },
};

/**
 * Paging under a table: the range shown, an optional page-size select, and
 * first/previous/next/last buttons around a page field (type a page, press
 * Enter). Pages are zero-based. When the total shrinks under the current page,
 * as a live refresh can make it, the pager moves back to the last real page.
 * Text follows LocaleProvider; `labels` replaces any part of it.
 */
export function Pager({
  total,
  page,
  pageSize,
  onPage,
  onPageSize,
  pageSizes = [20, 50, 100],
  labels: overrides,
}: {
  total: number;
  page: number;
  pageSize: number;
  onPage: (page: number) => void;
  /** Shows the page-size select when set. */
  onPageSize?: (size: number) => void;
  pageSizes?: number[];
  labels?: Partial<PagerLabels>;
}) {
  const labels = { ...useMessages(pagerLabels), ...overrides };
  const pages = Math.max(1, Math.ceil(total / pageSize));
  useEffect(() => {
    if (page >= pages) onPage(pages - 1);
  }, [page, pages, onPage]);
  const go = (next: number) => onPage(Math.min(pages - 1, Math.max(0, next)));
  const sizes = pageSizes.map((n) => ({
    value: String(n),
    label: labels.size(n),
  }));

  return (
    <nav
      aria-label={labels.navigation}
      className="flex shrink-0 flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground"
    >
      <span className="tabular-nums">
        {labels.range(
          page * pageSize + 1,
          Math.min(total, (page + 1) * pageSize),
          total,
        )}
      </span>
      {onPageSize ? (
        <Select
          value={String(pageSize)}
          items={sizes}
          onValueChange={(v) => onPageSize(Number(v))}
        >
          <SelectTrigger
            size="sm"
            aria-label={labels.pageSize}
            className="text-xs"
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent alignItemWithTrigger={false}>
            {sizes.map((s) => (
              <SelectItem key={s.value} value={s.value}>
                {s.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ) : null}
      {total > 0 ? (
        <div className="ms-auto flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label={labels.first}
            disabled={page === 0}
            onClick={() => go(0)}
          >
            <CaretDoubleLeftIcon />
          </Button>
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label={labels.previous}
            disabled={page === 0}
            onClick={() => go(page - 1)}
          >
            <CaretLeftIcon />
          </Button>
          <PageField
            key={page}
            page={page}
            pages={pages}
            label={labels.page(pages)}
            onJump={go}
          />
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label={labels.next}
            disabled={page >= pages - 1}
            onClick={() => go(page + 1)}
          >
            <CaretRightIcon />
          </Button>
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label={labels.last}
            disabled={page >= pages - 1}
            onClick={() => go(pages - 1)}
          >
            <CaretDoubleRightIcon />
          </Button>
        </div>
      ) : null}
    </nav>
  );
}

/** The current page as an editable field. Keyed on the page by its parent,
 * so it resets whenever the page changes. */
function PageField({
  page,
  pages,
  label,
  onJump,
}: {
  page: number;
  pages: number;
  label: string;
  onJump: (page: number) => void;
}) {
  const [draft, setDraft] = useState(String(page + 1));
  const commit = () => {
    const n = Number(draft);
    if (Number.isInteger(n) && n >= 1) onJump(n - 1);
    else setDraft(String(page + 1));
  };
  return (
    <span className="flex items-center gap-1.5 px-1 tabular-nums">
      <Input
        aria-label={label}
        inputMode="numeric"
        value={draft}
        className="h-7 w-12 px-2 text-center text-xs md:text-xs"
        onChange={(e) => setDraft(e.target.value)}
        onBlur={commit}
        onKeyDown={(e) => {
          if (e.key === "Enter") commit();
        }}
      />
      <span aria-hidden>/ {pages.toLocaleString()}</span>
    </span>
  );
}
