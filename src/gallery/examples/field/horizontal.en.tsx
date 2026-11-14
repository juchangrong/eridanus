/**
 * Horizontal layout
 * orientation="horizontal" puts the description on the left and the control on the right, as is common on settings pages.
 */
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
} from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const timeouts = [
  { label: "15 minutes", value: "15m" },
  { label: "30 minutes", value: "30m" },
  { label: "1 hour", value: "1h" },
  { label: "2 hours", value: "2h" },
];

export default function FieldHorizontalExample() {
  return (
    <Field orientation="horizontal" className="max-w-md">
      <FieldContent>
        <FieldLabel htmlFor="field-horizontal-timeout">Run timeout</FieldLabel>
        <FieldDescription>
          Runs still going after this time are stopped.
        </FieldDescription>
      </FieldContent>
      <Select items={timeouts} defaultValue="30m">
        <SelectTrigger id="field-horizontal-timeout" className="w-28">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {timeouts.map((timeout) => (
            <SelectItem key={timeout.value} value={timeout.value}>
              {timeout.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </Field>
  );
}
