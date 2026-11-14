import { LockSimpleIcon } from "@phosphor-icons/react";

import { EmptyState } from "@/components/eridanus/empty-state";
import { Button } from "@/components/ui/button";

export default function EmptyStateDemo() {
  return (
    <EmptyState
      icon={<LockSimpleIcon />}
      title="You don't have access to this project"
      description="Contact a project admin to be added as a member."
      contents={
        <Button size="sm" variant="secondary">
          Back to projects
        </Button>
      }
    />
  );
}
