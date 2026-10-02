import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const options = [
  { value: "all", label: "所有运行" },
  { value: "failed", label: "仅失败的运行" },
  { value: "none", label: "不通知" },
];

export default function RadioGroupDemo() {
  return (
    <RadioGroup defaultValue="failed" aria-label="通知范围" className="w-fit">
      {options.map((option) => (
        <div key={option.value} className="flex items-center gap-2">
          <RadioGroupItem
            value={option.value}
            id={`radio-demo-${option.value}`}
          />
          <Label htmlFor={`radio-demo-${option.value}`}>{option.label}</Label>
        </div>
      ))}
    </RadioGroup>
  );
}
