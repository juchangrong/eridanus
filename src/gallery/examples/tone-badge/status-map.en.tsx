/**
 * Map your own statuses
 * Map the business status to a tone at the render site. The text still spells out the status itself, rather than relying on color alone.
 */
import { type Tone, ToneBadge } from "@/components/eridanus/tone-badge";

type Status = "completed" | "running" | "failed" | "pending" | "cancelled";

const STATUS: Record<Status, { tone: Tone; label: string }> = {
  completed: { tone: "success", label: "Completed" },
  running: { tone: "info", label: "Running" },
  failed: { tone: "error", label: "Failed" },
  pending: { tone: "neutral", label: "Queued" },
  cancelled: { tone: "outline", label: "Cancelled" },
};

export default function ToneBadgeStatusExample() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {(Object.keys(STATUS) as Status[]).map((status) => (
        <ToneBadge key={status} tone={STATUS[status].tone}>
          {STATUS[status].label}
        </ToneBadge>
      ))}
    </div>
  );
}
