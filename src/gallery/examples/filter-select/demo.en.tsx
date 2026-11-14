import { useState } from "react";

import { FilterSelect } from "@/components/eridanus/filter-select";

const STATUSES = ["completed", "running", "failed", "pending", "cancelled"].map(
  (s) => ({ value: s, label: s }),
);
const WORKFLOWS = ["syncCatalog", "sendDigest", "resizeImages"].map((w) => ({
  value: w,
  label: w,
}));

export default function FilterSelectDemo() {
  const [status, setStatus] = useState("failed");
  const [workflow, setWorkflow] = useState("");
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex flex-wrap items-center gap-2">
        <FilterSelect
          label="Status"
          value={status}
          onChange={setStatus}
          options={STATUSES}
        />
        <FilterSelect
          label="Workflow"
          value={workflow}
          onChange={setWorkflow}
          options={WORKFLOWS}
        />
      </div>
      <p className="m-0 font-mono text-[13px] text-muted-foreground">
        status={JSON.stringify(status)} workflow={JSON.stringify(workflow)}
      </p>
    </div>
  );
}
