/**
 * 映射业务状态
 * 在渲染处把业务状态映射成色调，文字仍然写出状态本身，不只靠颜色区分。
 */
import { type Tone, ToneBadge } from "@/components/eridanus/tone-badge";

type Status = "completed" | "running" | "failed" | "pending" | "cancelled";

const STATUS: Record<Status, { tone: Tone; label: string }> = {
  completed: { tone: "success", label: "已完成" },
  running: { tone: "info", label: "运行中" },
  failed: { tone: "error", label: "失败" },
  pending: { tone: "neutral", label: "排队中" },
  cancelled: { tone: "outline", label: "已取消" },
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
