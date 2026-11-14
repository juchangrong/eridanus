/**
 * Field groups
 * FieldSet and FieldLegend wrap a group of related fields, and screen readers announce the group name first.
 */
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export default function FieldFieldsetExample() {
  return (
    <FieldSet className="w-full max-w-sm">
      <FieldLegend>Failure alerts</FieldLegend>
      <FieldDescription>
        When a run fails, alerts go to both addresses below.
      </FieldDescription>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="fieldset-email">Email</FieldLabel>
          <Input
            id="fieldset-email"
            type="email"
            placeholder="ops@example.com"
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="fieldset-webhook">Webhook URL</FieldLabel>
          <Input
            id="fieldset-webhook"
            type="url"
            placeholder="https://example.com/hooks/runs"
          />
        </Field>
      </FieldGroup>
    </FieldSet>
  );
}
