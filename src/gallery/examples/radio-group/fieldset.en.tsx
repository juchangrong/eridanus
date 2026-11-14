/**
 * Inside a FieldSet
 * FieldSet and FieldLegend give the whole group a visible title, which screen readers also announce.
 */
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const plans = [
  {
    value: "queue",
    label: "Queue",
    description: "Wait for the previous run to finish.",
  },
  {
    value: "cancel",
    label: "Cancel previous",
    description: "Stop the run in progress.",
  },
  {
    value: "parallel",
    label: "Parallel",
    description: "Run at the same time, no limit.",
  },
];

export default function RadioGroupFieldsetExample() {
  return (
    <FieldSet className="max-w-md">
      <FieldLegend variant="label">When triggered again</FieldLegend>
      <RadioGroup defaultValue="queue">
        {plans.map((plan) => (
          <Field key={plan.value} orientation="horizontal">
            <RadioGroupItem value={plan.value} id={`radio-set-${plan.value}`} />
            <FieldContent>
              <FieldLabel htmlFor={`radio-set-${plan.value}`}>
                {plan.label}
              </FieldLabel>
              <FieldDescription>{plan.description}</FieldDescription>
            </FieldContent>
          </Field>
        ))}
      </RadioGroup>
    </FieldSet>
  );
}
