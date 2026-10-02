/**
 * 命令面板
 * CommandDialog 是对话框外壳，里面照常放一个 Command；监听 ⌘K / Ctrl+K 打开它。title 和 description 只给读屏器。
 */
import { FolderIcon, GearIcon, PlayIcon } from "@phosphor-icons/react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

const actions = [
  { icon: FolderIcon, label: "打开项目" },
  { icon: PlayIcon, label: "新建运行" },
  { icon: GearIcon, label: "设置" },
];

export default function CommandDialogExample() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((value) => !value);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)}>
        打开命令面板
        <kbd className="ms-1 font-mono text-xs text-muted-foreground">⌘K</kbd>
      </Button>
      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        title="命令面板"
        description="搜索要执行的命令"
      >
        <Command>
          <CommandInput placeholder="输入命令或搜索…" aria-label="命令" />
          <CommandList>
            <CommandEmpty>没有匹配的结果</CommandEmpty>
            <CommandGroup heading="常用">
              {actions.map(({ icon: Icon, label }) => (
                <CommandItem key={label} onSelect={() => setOpen(false)}>
                  <Icon />
                  {label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  );
}
