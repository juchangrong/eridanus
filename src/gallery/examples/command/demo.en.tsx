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
      <CommandInput
        placeholder="Type a command or search…"
        aria-label="Command"
      />
      <CommandList>
        <CommandEmpty>No results found</CommandEmpty>
        <CommandGroup heading="Go to">
          <CommandItem>
            <FolderIcon />
            Projects
          </CommandItem>
          <CommandItem>
            <ChartBarIcon />
            Usage
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Actions">
          <CommandItem>
            <PlayIcon />
            New run
            <CommandShortcut>⌘R</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <GearIcon />
            Settings
            <CommandShortcut>⌘,</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
