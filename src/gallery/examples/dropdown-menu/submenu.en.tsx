/**
 * Submenu
 * DropdownMenuSub tucks a set of secondary options into a next level. It opens on hover or with the right arrow key.
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

const projects = ["Data Platform", "Growth Experiments", "Financial Reports"];

export default function DropdownMenuSubmenuExample() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant="outline" size="icon" aria-label="More actions" />
        }
      >
        <DotsThreeIcon />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40">
        <DropdownMenuItem>Rename</DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Move to</DropdownMenuSubTrigger>
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
        <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
