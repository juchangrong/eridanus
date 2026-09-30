import { useState } from "react";

import { CopyButton } from "@/components/eridanus/copy-button";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { type Lang, useHighlighted } from "../highlight";

/** Plain text until Shiki has loaded, so the code is readable at once. */
export function Highlighted({ code, lang }: { code: string; lang: Lang }) {
  const html = useHighlighted(code, lang);
  return html ? (
    // biome-ignore lint/security/noDangerouslySetInnerHtml: Shiki escapes the code it highlights
    <div className="gallery-code" dangerouslySetInnerHTML={{ __html: html }} />
  ) : (
    <div className="gallery-code">
      <pre>
        <code>{code}</code>
      </pre>
    </div>
  );
}

/** A code sample with a copy button. `title` names the file; long samples
 * start collapsed with a button to show the rest. */
export function CodeBlock({
  code,
  lang = "tsx",
  title,
  collapsible = false,
  className,
}: {
  code: string;
  lang?: Lang;
  title?: string;
  collapsible?: boolean;
  className?: string;
}) {
  const long = collapsible && code.split("\n").length > 16;
  const [open, setOpen] = useState(false);
  const collapsed = long && !open;
  return (
    <figure
      className={cn(
        "relative m-0 overflow-hidden rounded-xl bg-(--code)",
        className,
      )}
    >
      {title ? (
        <figcaption className="flex h-10 items-center gap-2 border-b border-border/60 ps-4 pe-1.5 font-mono text-xs text-muted-foreground">
          <span className="min-w-0 flex-1 truncate">{title}</span>
          <CopyButton
            text={code}
            label="复制代码"
            className="hover:bg-background dark:hover:bg-background/60"
          />
        </figcaption>
      ) : (
        <CopyButton
          text={code}
          label="复制代码"
          className="absolute top-2 right-2 z-10 bg-(--code) hover:bg-background dark:hover:bg-background/60"
        />
      )}
      <div
        className={cn(
          collapsed
            ? "max-h-64 overflow-hidden"
            : "max-h-[32rem] overflow-y-auto",
        )}
      >
        <Highlighted code={code} lang={lang} />
      </div>
      {long ? (
        <div
          className={cn(
            "flex justify-center pb-3",
            collapsed &&
              "absolute inset-x-0 bottom-0 items-end bg-linear-to-b from-transparent to-(--code) pt-16",
          )}
        >
          <Button
            size="sm"
            variant="secondary"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
          >
            {open ? "收起" : "展开全部代码"}
          </Button>
        </div>
      ) : null}
    </figure>
  );
}
