/**
 * Validation error
 * aria-invalid shows the error style. Link the error message to the textarea with aria-describedby.
 */
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function TextareaInvalidExample() {
  return (
    <div className="grid w-full max-w-sm gap-2">
      <Label htmlFor="textarea-invalid-reason">Disable reason</Label>
      <Textarea
        id="textarea-invalid-reason"
        aria-invalid
        aria-describedby="textarea-invalid-reason-error"
      />
      <p
        id="textarea-invalid-reason-error"
        className="text-sm text-destructive"
      >
        Enter a reason for disabling so other members have context.
      </p>
    </div>
  );
}
