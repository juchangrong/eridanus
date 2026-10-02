import { useState } from "react";

import { MultiFilter } from "@/components/eridanus/multi-filter";

const STATUSES = [
  { value: "failed", label: "failed", count: 12 },
  { value: "running", label: "running", count: 3 },
  { value: "completed", label: "completed", count: 1840 },
  { value: "cancelled", label: "cancelled", count: 27 },
];

export default function MultiFilterDemo() {
  const [status, setStatus] = useState<string[]>(["failed"]);
  return (
    <div className="flex flex-col items-start gap-3">
      <MultiFilter
        label="状态"
        value={status}
        onChange={setStatus}
        options={STATUSES}
      />
      <p className="m-0 font-mono text-[13px] text-muted-foreground">
        status=[{status.join(", ")}]
      </p>
    </div>
  );
}
