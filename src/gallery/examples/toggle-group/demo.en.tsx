import { KanbanIcon, ListIcon } from "@phosphor-icons/react";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export default function ToggleGroupDemo() {
  return (
    <ToggleGroup defaultValue={["list"]} aria-label="View">
      <ToggleGroupItem value="list">
        <ListIcon data-icon="inline-start" />
        List
      </ToggleGroupItem>
      <ToggleGroupItem value="board">
        <KanbanIcon data-icon="inline-start" />
        Board
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
