import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export default function CheckboxDemo() {
  return (
    <div className="flex items-center gap-2">
      <Checkbox id="checkbox-demo-notify" defaultChecked />
      <Label htmlFor="checkbox-demo-notify">Notify me when a run fails</Label>
    </div>
  );
}
