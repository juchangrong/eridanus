import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function FieldDemo() {
  return (
    <FieldGroup className="max-w-sm">
      <Field>
        <FieldLabel htmlFor="field-demo-name">Project name</FieldLabel>
        <Input
          id="field-demo-name"
          placeholder="e.g. Data Platform"
          aria-describedby="field-demo-name-hint"
        />
        <FieldDescription id="field-demo-name-hint">
          Shown in the sidebar and notifications. Up to 32 characters.
        </FieldDescription>
      </Field>
      <Field>
        <FieldLabel htmlFor="field-demo-summary">Description</FieldLabel>
        <Textarea
          id="field-demo-summary"
          placeholder="What this project is for"
        />
      </Field>
    </FieldGroup>
  );
}
