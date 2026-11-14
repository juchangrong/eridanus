import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function TextareaDemo() {
  return (
    <div className="grid w-full max-w-sm gap-2">
      <Label htmlFor="textarea-demo-summary">Workflow description</Label>
      <Textarea
        id="textarea-demo-summary"
        placeholder="Describe what this workflow does and who to contact if it fails"
      />
    </div>
  );
}
