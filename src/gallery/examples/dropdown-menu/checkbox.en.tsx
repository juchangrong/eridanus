/**
 * Multiple choice
 * DropdownMenuCheckboxItem suits toggling several independent options, such as which columns a table shows.
 */
import { ColumnsIcon } from "@phosphor-icons/react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const columns = [
  { key: "workflow", label: "Workflow" },
  { key: "trigger", label: "Trigger" },
  { key: "duration", label: "Duration" },
  { key: "owner", label: "Owner" },
];

export default function DropdownMenuCheckboxExample() {
  const [visible, setVisible] = useState<string[]>(["workflow", "duration"]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="outline" />}>
        <ColumnsIcon data-icon="inline-start" />
        Columns
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Table columns</DropdownMenuLabel>
          {columns.map((column) => (
            <DropdownMenuCheckboxItem
              key={column.key}
              checked={visible.includes(column.key)}
              onCheckedChange={(checked) =>
                setVisible((current) =>
                  checked
                    ? [...current, column.key]
                    : current.filter((key) => key !== column.key),
                )
              }
            >
              {column.label}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
