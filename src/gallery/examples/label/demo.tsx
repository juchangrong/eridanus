import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LabelDemo() {
  return (
    <div className="grid w-full max-w-sm gap-2">
      <Label htmlFor="label-demo-branch">默认分支</Label>
      <Input id="label-demo-branch" defaultValue="main" />
    </div>
  );
}
