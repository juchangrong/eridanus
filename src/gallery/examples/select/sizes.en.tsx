/**
 * Sizes
 * The size of SelectTrigger is default (32 pixels) or sm (28 pixels). sm lines up with small buttons.
 */
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ranges = [
  { label: "Last 24 hours", value: "24h" },
  { label: "Last 7 days", value: "7d" },
  { label: "Last 30 days", value: "30d" },
];

export default function SelectSizesExample() {
  return (
    <div className="grid gap-4">
      <Select items={ranges} defaultValue="7d">
        <SelectTrigger aria-label="Time range" className="w-36">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {ranges.map((range) => (
            <SelectItem key={range.value} value={range.value}>
              {range.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div className="flex items-center gap-2">
        <Select items={ranges} defaultValue="7d">
          <SelectTrigger size="sm" aria-label="Time range" className="w-36">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {ranges.map((range) => (
              <SelectItem key={range.value} value={range.value}>
                {range.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button size="sm" variant="outline">
          Refresh
        </Button>
      </div>
    </div>
  );
}
