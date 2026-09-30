/**
 * 显示方式
 * clock 只显示时钟，seconds 精确到秒，值缺失时显示占位符。悬停任意一个查看精确时间。
 */
import { Time } from "@/components/eridanus/time";

const YESTERDAY = new Date(Date.now() - 24 * 60 * 60_000);

export default function TimeDisplayExample() {
  return (
    <dl className="m-0 grid grid-cols-[auto_auto] gap-x-8 gap-y-2 text-sm">
      <dt className="font-mono text-[13px] text-muted-foreground">默认</dt>
      <dd className="m-0">
        <Time value={YESTERDAY} />
      </dd>
      <dt className="font-mono text-[13px] text-muted-foreground">clock</dt>
      <dd className="m-0">
        <Time value={YESTERDAY} clock />
      </dd>
      <dt className="font-mono text-[13px] text-muted-foreground">seconds</dt>
      <dd className="m-0">
        <Time value={YESTERDAY} seconds />
      </dd>
      <dt className="font-mono text-[13px] text-muted-foreground">null</dt>
      <dd className="m-0">
        <Time value={null} />
      </dd>
    </dl>
  );
}
