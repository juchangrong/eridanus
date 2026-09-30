import { LockSimpleIcon } from "@phosphor-icons/react";

import { EmptyState } from "@/components/eridanus/empty-state";
import { Button } from "@/components/ui/button";

export default function EmptyStateDemo() {
  return (
    <EmptyState
      icon={<LockSimpleIcon />}
      title="没有这个项目的访问权限"
      description="请联系项目管理员，把你加为成员。"
      contents={
        <Button size="sm" variant="secondary">
          返回项目列表
        </Button>
      }
    />
  );
}
