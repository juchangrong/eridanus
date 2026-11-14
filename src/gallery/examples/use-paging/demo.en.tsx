import { useState } from "react";

import { FilterSelect } from "@/components/eridanus/filter-select";
import { Pager } from "@/components/eridanus/pager";
import { usePaging } from "@/hooks/eridanus/use-paging";

const STATUSES = ["completed", "running", "failed"].map((s) => ({
  value: s,
  label: s,
}));

export default function UsePagingDemo() {
  const [status, setStatus] = useState("");
  // Changing the filter sends the pager back to page 1.
  const paging = usePaging([status], 20);
  return (
    <div className="flex flex-col items-start gap-3">
      <FilterSelect
        label="Status"
        value={status}
        onChange={setStatus}
        options={STATUSES}
      />
      <Pager
        {...paging}
        total={173}
        labels={{ navigation: "usePaging example pagination" }}
      />
      <p className="m-0 font-mono text-[13px] text-muted-foreground">
        page={paging.page} offset={paging.offset} query={paging.query}
      </p>
    </div>
  );
}
