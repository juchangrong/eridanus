/**
 * 指标卡片
 * StatStrip variant="cards"：概览页顶部的主要数字，每个放在浅色底的卡片上，整行等分（手机两列）；没有补充说明的卡片也保持同样高度。
 */
import { StatStrip } from "@/components/eridanus/page-layout";

export default function StatCardsDemo() {
  return (
    <div className="w-full">
      <StatStrip
        variant="cards"
        items={[
          { label: "24 小时运行", value: "1,843" },
          {
            label: "失败率",
            value: "0.4%",
            tone: "danger",
            hint: "7 次失败",
          },
          { label: "在途", value: "12", hint: "上限 100" },
          { label: "队列积压", value: "3", tone: "warning" },
          { label: "p99 时长", value: "42.5s" },
        ]}
      />
    </div>
  );
}
