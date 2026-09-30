/**
 * 虚线边框
 * 加上 border 类显示虚线框，适合在列表或卡片区域里占位。
 */
import { MagnifyingGlassIcon } from "@phosphor-icons/react";

import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

export default function EmptyOutlineExample() {
  return (
    <Empty className="border">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <MagnifyingGlassIcon />
        </EmptyMedia>
        <EmptyTitle>没有匹配的运行记录</EmptyTitle>
        <EmptyDescription>
          当前筛选条件下没有结果，试试放宽时间范围或清除筛选。
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button variant="outline">清除筛选</Button>
      </EmptyContent>
    </Empty>
  );
}
