/**
 * Setting row
 * The description is on the left and the switch on the right, as is common on settings pages. size="sm" is for compact toolbars.
 */
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Switch } from "@/components/ui/switch";

export default function SwitchSettingsExample() {
  return (
    <FieldGroup className="max-w-md">
      <Field orientation="horizontal">
        <FieldContent>
          <FieldLabel htmlFor="switch-settings-public">
            Public project
          </FieldLabel>
          <FieldDescription>
            Everyone in the organization can view runs.
          </FieldDescription>
        </FieldContent>
        <Switch id="switch-settings-public" />
      </Field>
      <Field orientation="horizontal">
        <FieldContent>
          <FieldLabel htmlFor="switch-settings-compact">
            Compact mode
          </FieldLabel>
          <FieldDescription>
            Table row height shrinks from 36px to 28px.
          </FieldDescription>
        </FieldContent>
        <Switch id="switch-settings-compact" size="sm" defaultChecked />
      </Field>
    </FieldGroup>
  );
}
