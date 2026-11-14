import { useState } from "react";

import { CopyButton } from "@/components/eridanus/copy-button";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { useHighlighted } from "../highlight";
import { useT } from "../i18n";

/** Plain text until gpu-lexer has labeled it, so the code is readable at once. */
export function Highlighted({ code }: { code: string }) {
  const spans = useHighlighted(code);
  return (
    <div className="gallery-code">
      <pre>
        <code>
          {spans
            ? spans.map((s) =>
                s.type === "plain" ? (
                  code.slice(s.start, s.end)
                ) : (
                  <span key={s.start} className={`tok-${s.type}`}>
                    {code.slice(s.start, s.end)}
                  </span>
                ),
              )
            : code}
        </code>
      </pre>
    </div>
  );
}

/** A code sample with a copy button. `title` names the file; long samples
 * start collapsed with a button to show the rest. */
export function CodeBlock({
  code,
  title,
  collapsible = false,
  className,
}: {
  code: string;
  title?: string;
  collapsible?: boolean;
  className?: string;
}) {
  const t = useT();
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
            label={t("复制代码", "Copy code")}
            className="hover:bg-background dark:hover:bg-background/60"
          />
        </figcaption>
      ) : (
        <CopyButton
          text={code}
          label={t("复制代码", "Copy code")}
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
        <Highlighted code={code} />
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
            {open ? t("收起", "Collapse") : t("展开全部代码", "Show all code")}
          </Button>
        </div>
      ) : null}
    </figure>
  );
}
