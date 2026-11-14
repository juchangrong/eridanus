/**
 * Joined items
 * spacing={0} removes the gap and merges the rounded corners. Together with outline, it makes a segmented control.
 */
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const ranges = [
  { value: "1h", label: "1 hour" },
  { value: "24h", label: "24 hours" },
  { value: "7d", label: "7 days" },
  { value: "30d", label: "30 days" },
];

export default function ToggleGroupSpacingExample() {
  return (
    <ToggleGroup
      variant="outline"
      spacing={0}
      defaultValue={["24h"]}
      aria-label="Time range"
    >
      {ranges.map((range) => (
        <ToggleGroupItem key={range.value} value={range.value}>
          {range.label}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}
