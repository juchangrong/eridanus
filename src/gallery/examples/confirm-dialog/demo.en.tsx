import { TrashIcon } from "@phosphor-icons/react";
import { useRef } from "react";

import { ConfirmDialog } from "@/components/eridanus/confirm-dialog";
import { notify } from "@/components/eridanus/toaster";
import { Button } from "@/components/ui/button";

export default function ConfirmDialogDemo() {
  // The first confirmation fails on purpose, to show the dialog's error state.
  const attempts = useRef(0);
  return (
    <ConfirmDialog
      trigger={
        <Button size="sm" variant="destructive">
          <TrashIcon data-icon="inline-start" />
          Clear failed tasks
        </Button>
      }
      title="Clear failed tasks?"
      description="Deletes 12 tasks that have used all their retries. This can't be undone. The first confirmation simulates a failure."
      confirmLabel="Clear failed tasks"
      destructive
      onConfirm={async () => {
        await new Promise((resolve) => setTimeout(resolve, 800));
        if (attempts.current++ === 0)
          throw new Error("Service returned 503. Try again later.");
        notify("Cleared 12 tasks");
      }}
    />
  );
}
