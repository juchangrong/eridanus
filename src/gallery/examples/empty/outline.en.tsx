/**
 * Dashed border
 * Add the border class to show a dashed frame. It suits placeholders inside a list or card area.
 */
import { MagnifyingGlassIcon } from "@phosphor-icons/react";

import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

export default function EmptyOutlineExample() {
  return (
    <Empty className="border">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <MagnifyingGlassIcon />
        </EmptyMedia>
        <EmptyTitle>No matching runs</EmptyTitle>
        <EmptyDescription>
          No results for the current filters. Try a wider time range or clear
          the filters.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button variant="outline">Clear filters</Button>
      </EmptyContent>
    </Empty>
  );
}
