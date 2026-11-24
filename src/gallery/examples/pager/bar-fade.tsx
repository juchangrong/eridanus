/**
 * 吸底渐隐
 * bar 把分页钉在滚动区域底部；加上 fade，滚到它下面的行在上方 24px 内渐隐，不需要分隔线。
 */
import { Pager } from "@/components/eridanus/pager";
import { usePaging } from "@/hooks/eridanus/use-paging";

const ROWS = Array.from({ length: 20 }, (_, i) => `运行 #${1024 - i}`);

export default function PagerBarFade() {
  const paging = usePaging([], 20);
  return (
    // A scrolling page in a box: the bar pins to its bottom, out to the
    // gutters of a full-width Page.
    <div className="h-72 w-full overflow-auto rounded-lg border">
      <div className="flex min-h-full flex-col px-4 pt-4 md:px-11">
        <ul className="divide-y text-sm">
          {ROWS.map((row) => (
            <li key={row} className="py-2.5">
              {row}
            </li>
          ))}
        </ul>
        <Pager
          {...paging}
          total={173}
          pageSizes={[20, 50, 100]}
          bar
          fade
          labels={{ navigation: "分页示例" }}
        />
      </div>
    </div>
  );
}
