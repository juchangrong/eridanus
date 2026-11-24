/**
 * Pinned, with a fade
 * bar pins the pager to the bottom of the scrolling area; with fade, the rows scrolling under it fade out over 24px above it, so it needs no rule.
 */
import { Pager } from "@/components/eridanus/pager";
import { usePaging } from "@/hooks/eridanus/use-paging";

const ROWS = Array.from({ length: 20 }, (_, i) => `Run #${1024 - i}`);

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
          labels={{ navigation: "Pager example" }}
        />
      </div>
    </div>
  );
}
