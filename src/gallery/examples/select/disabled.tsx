/**
 * 禁用
 * Select 加 disabled 禁用整个选择器；SelectItem 加 disabled 只禁用单个选项。
 */
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const plans = [
  { label: "按需", value: "on-demand" },
  { label: "包年包月", value: "reserved" },
  { label: "竞价实例（额度已用完）", value: "spot", disabled: true },
];

export default function SelectDisabledExample() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Select items={plans} defaultValue="on-demand">
        <SelectTrigger aria-label="计费方式" className="w-56">
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
        <SelectTrigger aria-label="计费方式（已锁定）" className="w-56">
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
