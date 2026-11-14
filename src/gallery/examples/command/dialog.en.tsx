/**
 * Command palette
 * CommandDialog is a dialog shell that holds a regular Command inside. Listen for ⌘K / Ctrl+K to open it. title and description are for screen readers only.
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
  { icon: FolderIcon, label: "Open project" },
  { icon: PlayIcon, label: "New run" },
  { icon: GearIcon, label: "Settings" },
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
        Open command palette
        <kbd className="ms-1 font-mono text-xs text-muted-foreground">⌘K</kbd>
      </Button>
      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        title="Command palette"
        description="Search for a command to run"
      >
        <Command>
          <CommandInput
            placeholder="Type a command or search…"
            aria-label="Command"
          />
          <CommandList>
            <CommandEmpty>No results found</CommandEmpty>
            <CommandGroup heading="Common">
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
