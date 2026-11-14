/**
 * With description and disabled
 * Use the horizontal layout of Field to hang the description under the label. A disabled option fades out across the whole row.
 */
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

export default function CheckboxWithDescriptionExample() {
  return (
    <FieldGroup className="max-w-md">
      <Field orientation="horizontal">
        <Checkbox id="checkbox-desc-retry" defaultChecked />
        <FieldContent>
          <FieldLabel htmlFor="checkbox-desc-retry">
            Retry automatically after failure
          </FieldLabel>
          <FieldDescription>
            Up to 3 retries, 30 seconds apart.
          </FieldDescription>
        </FieldContent>
      </Field>
      <Field orientation="horizontal" data-disabled>
        <Checkbox id="checkbox-desc-archive" disabled />
        <FieldContent>
          <FieldLabel htmlFor="checkbox-desc-archive">
            Archive when finished
          </FieldLabel>
          <FieldDescription>Requires admin permission.</FieldDescription>
        </FieldContent>
      </Field>
    </FieldGroup>
  );
}
