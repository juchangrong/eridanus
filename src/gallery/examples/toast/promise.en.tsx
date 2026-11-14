/**
 * Follow an async task
 * toast.promise first shows a pending state, then swaps to success or failure in the same toast when the task finishes.
 */
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";

function exportReport() {
  return new Promise<number>((resolve) => {
    setTimeout(() => resolve(18_402), 2000);
  });
}

export default function ToastPromiseExample() {
  return (
    <Button
      variant="outline"
      onClick={() =>
        void toast.promise(exportReport(), {
          loading: "Exporting report…",
          success: (rows) => ({
            title: "Report exported",
            description: `${rows.toLocaleString("en-US")} rows.`,
          }),
          error: "Export failed. Try again later.",
        })
      }
    >
      Export report
    </Button>
  );
}
