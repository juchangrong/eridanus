/**
 * Validation error
 * aria-invalid makes the input show the error style. Link the error message with aria-describedby.
 */
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function InputInvalidExample() {
  return (
    <div className="grid w-full max-w-sm gap-2">
      <Label htmlFor="input-invalid-email">Notification email</Label>
      <Input
        id="input-invalid-email"
        type="email"
        defaultValue="ops@example"
        aria-invalid
        aria-describedby="input-invalid-email-error"
      />
      <p id="input-invalid-email-error" className="text-sm text-destructive">
        The email is missing a domain suffix, e.g. ops@example.com.
      </p>
    </div>
  );
}
