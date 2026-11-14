import { Notice } from "@/components/eridanus/notice";
import { notify } from "@/components/eridanus/toaster";
import { Button } from "@/components/ui/button";

export default function NoticeDemo() {
  return (
    <Notice
      tone="error"
      title="Failed to load runs"
      description="The service returned 500. Try again later."
      action={
        <Button
          size="sm"
          variant="secondary"
          onClick={() => notify("Reloaded")}
        >
          Retry
        </Button>
      }
      className="w-full max-w-xl"
    />
  );
}
