/**
 * Groups and placeholder
 * SelectGroup and SelectLabel group the options. When nothing is selected, SelectValue shows the placeholder.
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
  { label: "Avery Lin", value: "lin-xiao" },
  { label: "Morgan Chen", value: "chen-mo" },
];

const members = [
  { label: "Quinn Xu", value: "xu-wen" },
  { label: "Riley Zhou", value: "zhou-yuan" },
  { label: "Jordan He", value: "he-qing" },
];

export default function SelectGroupsExample() {
  return (
    <Select items={[...admins, ...members]}>
      <SelectTrigger aria-label="Owner" className="w-40">
        <SelectValue placeholder="Select an owner" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Admins</SelectLabel>
          {admins.map((person) => (
            <SelectItem key={person.value} value={person.value}>
              {person.label}
            </SelectItem>
          ))}
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>Members</SelectLabel>
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
