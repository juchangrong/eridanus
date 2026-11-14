/**
 * Vertical
 * orientation="vertical" separates content in a row. The parent needs a height.
 */
import { Separator } from "@/components/ui/separator";

export default function SeparatorVerticalExample() {
  return (
    <div className="flex h-5 items-center gap-4 text-sm">
      <span>1,284 runs</span>
      <Separator orientation="vertical" />
      <span>17 failures</span>
      <Separator orientation="vertical" />
      <span>Avg 4 min 12 sec</span>
    </div>
  );
}
