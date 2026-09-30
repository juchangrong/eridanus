/**
 * 加载中
 * 提交期间禁用按钮并在文字前放 Spinner，按钮文字保持不变，避免宽度跳动。
 */
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

export default function ButtonLoadingExample() {
  const [pending, setPending] = useState(false);

  const run = () => {
    setPending(true);
    setTimeout(() => setPending(false), 2000);
  };

  return (
    <Button disabled={pending} aria-busy={pending || undefined} onClick={run}>
      {pending ? <Spinner data-icon="inline-start" aria-hidden /> : null}
      立即运行
    </Button>
  );
}
