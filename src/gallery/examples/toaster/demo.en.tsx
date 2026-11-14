import { notify } from "@/components/eridanus/toaster";
import { Button } from "@/components/ui/button";

export default function ToasterDemo() {
  return (
    <div className="flex flex-wrap gap-2">
      <Button
        size="sm"
        variant="secondary"
        onClick={() => notify("Settings saved")}
      >
        Success toast
      </Button>
      <Button
        size="sm"
        variant="secondary"
        onClick={() =>
          notify("Save failed", {
            type: "error",
            description:
              "The service returned 409: the config was changed by someone else.",
          })
        }
      >
        Error toast
      </Button>
    </div>
  );
}
