import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";

const projects = [
  "Data platform",
  "Recommendations",
  "Search index",
  "Payments gateway",
  "Message queue",
  "Log collection",
];

export default function ComboboxDemo() {
  return (
    <Combobox items={projects}>
      <ComboboxInput
        placeholder="Search projects"
        aria-label="Project"
        className="w-56"
      />
      <ComboboxContent>
        <ComboboxEmpty>No matching projects</ComboboxEmpty>
        <ComboboxList>
          {(item: string) => (
            <ComboboxItem key={item} value={item}>
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}
