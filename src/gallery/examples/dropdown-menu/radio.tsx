/**
 * 单选项
 * DropdownMenuRadioGroup 在几个互斥选项里选一个，比如排序方式。
 */
import { SortAscendingIcon } from "@phosphor-icons/react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function DropdownMenuRadioExample() {
  const [sort, setSort] = useState("started");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="outline" />}>
        <SortAscendingIcon data-icon="inline-start" />
        排序
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40">
        <DropdownMenuGroup>
          <DropdownMenuLabel>排序方式</DropdownMenuLabel>
          <DropdownMenuRadioGroup value={sort} onValueChange={setSort}>
            <DropdownMenuRadioItem value="started">
              开始时间
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="duration">耗时</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="name">名称</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
