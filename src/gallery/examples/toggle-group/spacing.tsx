/**
 * 紧贴排列
 * spacing={0} 去掉间距并合并圆角，和 outline 一起用就是分段控件。
 */
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const ranges = [
  { value: "1h", label: "1 小时" },
  { value: "24h", label: "24 小时" },
  { value: "7d", label: "7 天" },
  { value: "30d", label: "30 天" },
];

export default function ToggleGroupSpacingExample() {
  return (
    <ToggleGroup
      variant="outline"
      spacing={0}
      defaultValue={["24h"]}
      aria-label="时间范围"
    >
      {ranges.map((range) => (
        <ToggleGroupItem key={range.value} value={range.value}>
          {range.label}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}
