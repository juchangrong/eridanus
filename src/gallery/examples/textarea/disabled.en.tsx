/**
 * Disabled
 * A disabled textarea cannot be edited or focused.
 */
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function TextareaDisabledExample() {
  return (
    <div className="grid w-full max-w-sm gap-2">
      <Label htmlFor="textarea-disabled-summary">Workflow description</Label>
      <Textarea
        id="textarea-disabled-summary"
        defaultValue="A built-in workflow maintained by the platform. Its description cannot be changed."
        disabled
      />
    </div>
  );
}
