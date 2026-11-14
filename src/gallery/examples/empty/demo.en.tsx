import { FolderOpenIcon, PlusIcon } from "@phosphor-icons/react";

import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

export default function EmptyDemo() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <FolderOpenIcon />
        </EmptyMedia>
        <EmptyTitle>No projects yet</EmptyTitle>
        <EmptyDescription>
          Projects group workflows and members. Create your first project to
          start collaborating with teammates.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button>
          <PlusIcon data-icon="inline-start" />
          Create project
        </Button>
      </EmptyContent>
    </Empty>
  );
}
