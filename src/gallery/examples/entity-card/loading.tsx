/**
 * 加载中
 * EntityCardSkeleton 先占住同样高度的卡片，列表到了不会跳。
 */
import { EntityCardSkeleton } from "@/components/eridanus/entity-card";

export default function EntityCardLoading() {
  return (
    <div className="w-full">
      <EntityCardSkeleton rows={3} />
    </div>
  );
}
