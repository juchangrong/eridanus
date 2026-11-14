import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function BaseDemo() {
  return (
    <div className="flex w-full max-w-xl flex-col gap-6">
      <div className="flex flex-col gap-1">
        <span className="font-heading text-lg font-medium tracking-tight">
          Weekly report · Report builder
        </span>
        <span className="text-sm text-muted-foreground">
          Text uses Inter, code and identifiers use JetBrains Mono, and CJK
          characters follow the system font.
        </span>
        <span className="font-mono text-[13px]">
          run_3k9x2m7qa1b8 · 2026-09-28 14:05:31.207 UTC+8
        </span>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button size="sm">Sync now</Button>
        <Button size="sm" variant="secondary">
          Edit config
        </Button>
        <Button size="sm" variant="outline">
          Export
        </Button>
        <Button size="sm" variant="ghost">
          Cancel
        </Button>
        <Button size="sm" variant="destructive">
          Delete project
        </Button>
      </div>
      <Input
        aria-label="Example input"
        placeholder="Inputs and buttons share the same corner radius"
        className="h-7 max-w-72"
      />
      <div className="flex flex-wrap gap-4 text-sm">
        <span>foreground</span>
        <span className="text-muted-foreground">muted-foreground</span>
        <span className="text-destructive">destructive</span>
      </div>
    </div>
  );
}
