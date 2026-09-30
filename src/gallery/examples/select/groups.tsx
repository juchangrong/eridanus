/**
 * 分组与占位
 * SelectGroup 和 SelectLabel 给选项分组；未选择时 SelectValue 显示 placeholder。
 */
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const admins = [
  { label: "林晓", value: "lin-xiao" },
  { label: "陈默", value: "chen-mo" },
];

const members = [
  { label: "许文", value: "xu-wen" },
  { label: "周远", value: "zhou-yuan" },
  { label: "何清", value: "he-qing" },
];

export default function SelectGroupsExample() {
  return (
    <Select items={[...admins, ...members]}>
      <SelectTrigger aria-label="负责人" className="w-40">
        <SelectValue placeholder="选择负责人" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>管理员</SelectLabel>
          {admins.map((person) => (
            <SelectItem key={person.value} value={person.value}>
              {person.label}
            </SelectItem>
          ))}
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>成员</SelectLabel>
          {members.map((person) => (
            <SelectItem key={person.value} value={person.value}>
              {person.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
