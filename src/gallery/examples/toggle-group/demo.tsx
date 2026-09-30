import { KanbanIcon, ListIcon } from "@phosphor-icons/react";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export default function ToggleGroupDemo() {
  return (
    <ToggleGroup defaultValue={["list"]} aria-label="视图">
      <ToggleGroupItem value="list">
        <ListIcon data-icon="inline-start" />
        列表
      </ToggleGroupItem>
      <ToggleGroupItem value="board">
        <KanbanIcon data-icon="inline-start" />
        看板
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
