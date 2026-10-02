/**
 * 放在 Fieldset 里
 * FieldSet 和 FieldLegend 给整组一个可见的标题，读屏器也会读出它。
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
  { value: "queue", label: "排队", description: "等前一个运行结束后再开始。" },
  { value: "cancel", label: "取消旧的", description: "停止正在进行的运行。" },
  { value: "parallel", label: "并行", description: "同时运行，不做限制。" },
];

export default function RadioGroupFieldsetExample() {
  return (
    <FieldSet className="max-w-md">
      <FieldLegend variant="label">重复触发时</FieldLegend>
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
