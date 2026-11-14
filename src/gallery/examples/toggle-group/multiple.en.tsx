/**
 * Multiple
 * With multiple, several items can be pressed at once, and value is an array of all the pressed items.
 */
import { useState } from "react";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const statuses = [
  { value: "running", label: "Running" },
  { value: "failed", label: "Failed" },
  { value: "succeeded", label: "Succeeded" },
];

export default function ToggleGroupMultipleExample() {
  const [value, setValue] = useState<string[]>(["running", "failed"]);

  return (
    <div className="grid justify-items-center gap-3">
      <ToggleGroup
        multiple
        variant="outline"
        value={value}
        onValueChange={setValue}
        aria-label="Filter by status"
      >
        {statuses.map((status) => (
          <ToggleGroupItem key={status.value} value={status.value}>
            {status.label}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
      <p className="text-sm text-muted-foreground">
        {value.length} statuses selected
      </p>
    </div>
  );
}
