import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function TextareaDemo() {
  return (
    <div className="grid w-full max-w-sm gap-2">
      <Label htmlFor="textarea-demo-summary">工作流说明</Label>
      <Textarea
        id="textarea-demo-summary"
        placeholder="说明这个工作流做什么、出错时找谁"
      />
    </div>
  );
}
