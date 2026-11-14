import { Pager } from "@/components/eridanus/pager";
import { usePaging } from "@/hooks/eridanus/use-paging";

export default function PagerDemo() {
  const paging = usePaging([], 20);
  return (
    <Pager
      {...paging}
      total={173}
      pageSizes={[20, 50, 100]}
      labels={{ navigation: "Pager example" }}
    />
  );
}
