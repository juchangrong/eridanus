import {
  ChartBarIcon,
  FolderIcon,
  GearIcon,
  PlayIcon,
} from "@phosphor-icons/react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";

export default function CommandDemo() {
  return (
    <Command className="max-w-sm border">
      <CommandInput placeholder="输入命令或搜索…" aria-label="命令" />
      <CommandList>
        <CommandEmpty>没有匹配的结果</CommandEmpty>
        <CommandGroup heading="跳转">
          <CommandItem>
            <FolderIcon />
            项目
          </CommandItem>
          <CommandItem>
            <ChartBarIcon />
            用量
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="操作">
          <CommandItem>
            <PlayIcon />
            新建运行
            <CommandShortcut>⌘R</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <GearIcon />
            设置
            <CommandShortcut>⌘,</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
