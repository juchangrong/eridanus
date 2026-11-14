import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const regions = [
  { label: "East China 1 (Hangzhou)", value: "cn-hangzhou" },
  { label: "North China 2 (Beijing)", value: "cn-beijing" },
  { label: "South China 1 (Shenzhen)", value: "cn-shenzhen" },
  { label: "Singapore", value: "ap-southeast-1" },
];

export default function SelectDemo() {
  return (
    <div className="grid gap-2">
      <Label htmlFor="select-demo-region">Deployment region</Label>
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
