/**
 * Validation error
 * Add data-invalid to Field and aria-invalid to the input, then use FieldError to explain how to fix it.
 */
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export default function FieldInvalidExample() {
  return (
    <Field data-invalid className="max-w-sm">
      <FieldLabel htmlFor="field-invalid-cron">Schedule</FieldLabel>
      <Input
        id="field-invalid-cron"
        defaultValue="0 2 * *"
        aria-invalid
        aria-describedby="field-invalid-cron-error"
        className="font-mono"
      />
      <FieldError id="field-invalid-cron-error">
        A cron expression needs 5 fields; this one has 4.
      </FieldError>
    </Field>
  );
}
