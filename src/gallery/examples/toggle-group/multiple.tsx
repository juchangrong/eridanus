/**
 * 多选
 * 加 multiple 后可以同时按下多项，value 是所有按下项的数组。
 */
import { useState } from "react";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const statuses = [
  { value: "running", label: "运行中" },
  { value: "failed", label: "失败" },
  { value: "succeeded", label: "成功" },
];

export default function ToggleGroupMultipleExample() {
  const [value, setValue] = useState<string[]>(["running", "failed"]);

  return (
    <div className="grid justify-items-center gap-3">
      <ToggleGroup
        multiple
        variant="outline"
        value={value}
        onValueChange={setValue}
        aria-label="按状态筛选"
      >
        {statuses.map((status) => (
          <ToggleGroupItem key={status.value} value={status.value}>
            {status.label}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
      <p className="text-sm text-muted-foreground">
        已选 {value.length} 个状态
      </p>
    </div>
  );
}
