import { PlusIcon } from "@phosphor-icons/react";

import { Button } from "@/components/ui/button";

export default function ButtonDemo() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button variant="outline">Cancel</Button>
      <Button>
        <PlusIcon data-icon="inline-start" />
        Create project
      </Button>
    </div>
  );
}
