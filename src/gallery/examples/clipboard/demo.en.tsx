import { notify } from "@/components/eridanus/toaster";
import { Button } from "@/components/ui/button";
import { copyText } from "@/lib/eridanus/clipboard";

export default function ClipboardDemo() {
  const copy = () =>
    copyText("npx shadcn@latest add juchangrong/eridanus/time").then(
      () => notify("Install command copied"),
      () =>
        notify("Copy failed", {
          type: "error",
          description: "The browser denied clipboard access.",
        }),
    );
  return (
    <Button size="sm" variant="secondary" onClick={() => void copy()}>
      Copy install command for time
    </Button>
  );
}
