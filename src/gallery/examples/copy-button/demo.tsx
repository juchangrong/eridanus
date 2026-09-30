import { CopyButton } from "@/components/eridanus/copy-button";

export default function CopyButtonDemo() {
  return (
    <div className="flex items-center gap-1">
      <span className="font-mono text-[13px]">run_3k9x2m7qa1b8</span>
      <CopyButton text="run_3k9x2m7qa1b8" label="复制 Run ID" />
    </div>
  );
}
