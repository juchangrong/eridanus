import { PlusIcon } from "@phosphor-icons/react";

import { Button } from "@/components/ui/button";

export default function ButtonDemo() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button variant="outline">取消</Button>
      <Button>
        <PlusIcon data-icon="inline-start" />
        创建项目
      </Button>
    </div>
  );
}
