/**
 * 多选项
 * DropdownMenuCheckboxItem 适合切换若干独立开关，比如表格显示哪些列。
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
  { key: "workflow", label: "工作流" },
  { key: "trigger", label: "触发方式" },
  { key: "duration", label: "耗时" },
  { key: "owner", label: "负责人" },
];

export default function DropdownMenuCheckboxExample() {
  const [visible, setVisible] = useState<string[]>(["workflow", "duration"]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="outline" />}>
        <ColumnsIcon data-icon="inline-start" />
        显示列
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40">
        <DropdownMenuGroup>
          <DropdownMenuLabel>表格列</DropdownMenuLabel>
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
