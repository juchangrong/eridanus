/**
 * 水平排列
 * orientation="horizontal" 让说明在左、控件在右，常见于设置页。
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
  { label: "15 分钟", value: "15m" },
  { label: "30 分钟", value: "30m" },
  { label: "1 小时", value: "1h" },
  { label: "2 小时", value: "2h" },
];

export default function FieldHorizontalExample() {
  return (
    <Field orientation="horizontal" className="max-w-md">
      <FieldContent>
        <FieldLabel htmlFor="field-horizontal-timeout">运行超时</FieldLabel>
        <FieldDescription>
          超过这个时长仍未结束的运行会被停止。
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
