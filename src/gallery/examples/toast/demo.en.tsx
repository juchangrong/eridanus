import { notify } from "@/components/eridanus/toaster";
import { Button } from "@/components/ui/button";

export default function ToastDemo() {
  return (
    <Button
      variant="outline"
      onClick={() =>
        notify("Settings saved", {
          description: "The new timeout takes effect on the next run.",
        })
      }
    >
      Save settings
    </Button>
  );
}
