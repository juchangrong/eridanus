/**
 * 尺寸
 * SelectTrigger 的 size 有 default（32 像素）和 sm（28 像素），sm 与小号按钮对齐。
 */
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ranges = [
  { label: "最近 24 小时", value: "24h" },
  { label: "最近 7 天", value: "7d" },
  { label: "最近 30 天", value: "30d" },
];

export default function SelectSizesExample() {
  return (
    <div className="grid gap-4">
      <Select items={ranges} defaultValue="7d">
        <SelectTrigger aria-label="时间范围" className="w-36">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {ranges.map((range) => (
            <SelectItem key={range.value} value={range.value}>
              {range.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div className="flex items-center gap-2">
        <Select items={ranges} defaultValue="7d">
          <SelectTrigger size="sm" aria-label="时间范围" className="w-36">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {ranges.map((range) => (
              <SelectItem key={range.value} value={range.value}>
                {range.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button size="sm" variant="outline">
          刷新
        </Button>
      </div>
    </div>
  );
}
