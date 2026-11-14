/**
 * Disabled
 * Add disabled to Select to disable the whole select. Add disabled to a SelectItem to disable just that option.
 */
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const plans = [
  { label: "On-demand", value: "on-demand" },
  { label: "Reserved", value: "reserved" },
  { label: "Spot (quota used up)", value: "spot", disabled: true },
];

export default function SelectDisabledExample() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Select items={plans} defaultValue="on-demand">
        <SelectTrigger aria-label="Billing method" className="w-56">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {plans.map((plan) => (
            <SelectItem
              key={plan.value}
              value={plan.value}
              disabled={plan.disabled}
            >
              {plan.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select items={plans} defaultValue="reserved" disabled>
        <SelectTrigger aria-label="Billing method (locked)" className="w-56">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {plans.map((plan) => (
            <SelectItem key={plan.value} value={plan.value}>
              {plan.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
