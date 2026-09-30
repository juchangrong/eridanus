import { ToneBadge } from "@/components/eridanus/tone-badge";

export default function ToneBadgeDemo() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <ToneBadge tone="success">success</ToneBadge>
      <ToneBadge tone="error">error</ToneBadge>
      <ToneBadge tone="info">info</ToneBadge>
      <ToneBadge tone="warning">warning</ToneBadge>
      <ToneBadge tone="neutral">neutral</ToneBadge>
      <ToneBadge tone="outline">outline</ToneBadge>
    </div>
  );
}
