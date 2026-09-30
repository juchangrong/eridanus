/**
 * 子菜单
 * DropdownMenuSub 把一组次要选项收进下一级，悬停或按右方向键展开。
 */
import { DotsThreeIcon, FolderIcon } from "@phosphor-icons/react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const projects = ["数据平台", "增长实验", "财务报表"];

export default function DropdownMenuSubmenuExample() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={<Button variant="outline" size="icon" aria-label="更多操作" />}
      >
        <DotsThreeIcon />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40">
        <DropdownMenuItem>重命名</DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>移动到</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            {projects.map((project) => (
              <DropdownMenuItem key={project}>
                <FolderIcon />
                {project}
              </DropdownMenuItem>
            ))}
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">删除</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
