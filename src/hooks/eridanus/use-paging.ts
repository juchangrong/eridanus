import { useMemo, useState } from "react";

export interface Paging {
  /** Zero-based page index. */
  page: number;
  pageSize: number;
  /** `page * pageSize`, for APIs that take an offset. */
  offset: number;
  /** `limit=…&offset=…`, ready to join into a query string. */
  query: string;
  onPage: (page: number) => void;
  /** Changes the page size and returns to the first page. */
  onPageSize: (size: number) => void;
}

/**
 * Page state for a paged table. `filters` are the values the rows are
 * filtered by; when any of them changes the table returns to its first page,
 * because page 4 of one filter is not page 4 of another and an out-of-range
 * page reads as "nothing here". Filters are compared by their JSON form.
 */
export function usePaging(
  filters: readonly unknown[],
  initialSize = 50,
): Paging {
  const key = JSON.stringify(filters);
  const [pageSize, setPageSize] = useState(initialSize);
  const [at, setAt] = useState({ key, page: 0 });
  const page = at.key === key ? at.page : 0;
  return useMemo(
    () => ({
      page,
      pageSize,
      offset: page * pageSize,
      query: `limit=${pageSize}&offset=${page * pageSize}`,
      onPage: (next: number) => setAt({ key, page: next }),
      onPageSize: (size: number) => {
        setAt({ key, page: 0 });
        setPageSize(size);
      },
    }),
    [key, page, pageSize],
  );
}
