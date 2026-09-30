import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const regions = [
  { label: "华东 1（杭州）", value: "cn-hangzhou" },
  { label: "华北 2（北京）", value: "cn-beijing" },
  { label: "华南 1（深圳）", value: "cn-shenzhen" },
  { label: "新加坡", value: "ap-southeast-1" },
];

export default function SelectDemo() {
  return (
    <div className="grid gap-2">
      <Label htmlFor="select-demo-region">部署区域</Label>
      <Select items={regions} defaultValue="cn-hangzhou">
        <SelectTrigger id="select-demo-region" className="w-48">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {regions.map((region) => (
            <SelectItem key={region.value} value={region.value}>
              {region.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
