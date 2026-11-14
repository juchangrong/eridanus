/**
 * Error
 * A toast with type: "error" is announced immediately and stays until the user dismisses it.
 */
import { notify } from "@/components/eridanus/toaster";
import { Button } from "@/components/ui/button";

export default function ToastErrorExample() {
  return (
    <Button
      variant="outline"
      onClick={() =>
        notify("Deployment failed", {
          type: "error",
          description:
            "Pulling image registry.example.com/sync:2.4.1 timed out.",
        })
      }
    >
      Deploy
    </Button>
  );
}
