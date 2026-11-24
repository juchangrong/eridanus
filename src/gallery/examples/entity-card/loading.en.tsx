/**
 * Loading
 * EntityCardSkeleton holds cards of the same height, so the list does not jump when it arrives.
 */
import { EntityCardSkeleton } from "@/components/eridanus/entity-card";

export default function EntityCardLoading() {
  return (
    <div className="w-full">
      <EntityCardSkeleton rows={3} />
    </div>
  );
}
