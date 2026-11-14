/**
 * Multiple with chips
 * multiple plus ComboboxChips shows the selected items as removable chips, which suits filtering by several values.
 */
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
  useComboboxAnchor,
} from "@/components/ui/combobox";

const labels = [
  "Production",
  "Staging",
  "Testing",
  "High priority",
  "Nightly",
  "Archived",
];

export default function ComboboxMultipleExample() {
  const anchor = useComboboxAnchor();

  return (
    <Combobox items={labels} multiple defaultValue={["Production"]}>
      <ComboboxChips ref={anchor} className="w-72">
        <ComboboxValue>
          {(values: string[]) => (
            <>
              {values.map((value) => (
                <ComboboxChip key={value}>{value}</ComboboxChip>
              ))}
              <ComboboxChipsInput placeholder="Add label" aria-label="Labels" />
            </>
          )}
        </ComboboxValue>
      </ComboboxChips>
      <ComboboxContent anchor={anchor}>
        <ComboboxEmpty>No matching labels</ComboboxEmpty>
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
