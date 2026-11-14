import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const options = [
  { value: "all", label: "All runs" },
  { value: "failed", label: "Failed runs only" },
  { value: "none", label: "No notifications" },
];

export default function RadioGroupDemo() {
  return (
    <RadioGroup
      defaultValue="failed"
      aria-label="Notification scope"
      className="w-fit"
    >
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
