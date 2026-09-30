/**
 * 放在按钮里
 * 按钮已经写明在做什么时，Spinner 加 aria-hidden，并用 data-icon 对齐内边距。
 */
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

export default function SpinnerInButtonExample() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button disabled>
        <Spinner data-icon="inline-start" aria-hidden />
        部署中
      </Button>
      <Button variant="outline" disabled>
        <Spinner data-icon="inline-start" aria-hidden />
        正在导出
      </Button>
    </div>
  );
}
