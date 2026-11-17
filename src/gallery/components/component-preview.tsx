import { ArrowsInIcon, ArrowsOutIcon } from "@phosphor-icons/react";
import {
  Component,
  type ErrorInfo,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";

import { useLocale } from "@/components/eridanus/locale-provider";
import { Notice } from "@/components/eridanus/notice";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

import { type Example, exampleIn } from "../examples";
import { useT } from "../i18n";
import { CodeBlock } from "./code-block";

function Failure({ error }: { error: Error }) {
  const t = useT();
  return (
    <Notice
      tone="error"
      title={t("示例渲染失败", "This example failed to render")}
      description={error.message}
    />
  );
}

/** Keeps one broken example from taking the whole page down. */
class ExampleBoundary extends Component<
  { children: ReactNode },
  { error?: Error }
> {
  state: { error?: Error } = {};
  static getDerivedStateFromError(error: Error) {
    return { error };
  }
  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error(error, info.componentStack);
  }
  render() {
    return this.state.error ? (
      <Failure error={this.state.error} />
    ) : (
      this.props.children
    );
  }
}

/** An example with a preview tab and a code tab. The preview stays mounted while
 * the code shows, so a demo keeps its state across switches. The preview can
 * fill the window, where a demo sized for the page, such as AppShell's, grows
 * with it (`in-data-fullscreen:` in the demo); Escape or the button in its
 * corner brings it back. */
export function ComponentPreview({ example }: { example: Example }) {
  const { Component: Demo, code } = exampleIn(example, useLocale());
  const t = useT();
  const [tab, setTab] = useState("preview");
  const [fullscreen, setFullscreen] = useState(false);
  const openButton = useRef<HTMLButtonElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!fullscreen) return;
    const opener = openButton.current;
    closeButton.current?.focus();
    // The page behind holds still while the preview covers it.
    const root = document.documentElement;
    const overflow = root.style.overflow;
    root.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      // A menu or dialog in the demo closes first.
      if (event.key === "Escape" && !event.defaultPrevented)
        setFullscreen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      root.style.overflow = overflow;
      document.removeEventListener("keydown", onKeyDown);
      opener?.focus();
    };
  }, [fullscreen]);

  const enter = t("全屏预览", "Fullscreen preview");
  const exit = t("退出全屏", "Exit fullscreen");
  return (
    <Tabs value={tab} onValueChange={setTab} className="gap-3">
      <div className="flex items-center justify-between gap-2">
        <TabsList variant="line" aria-label={t("示例视图", "Example view")}>
          <TabsTrigger value="preview">{t("预览", "Preview")}</TabsTrigger>
          <TabsTrigger value="code">{t("代码", "Code")}</TabsTrigger>
        </TabsList>
        <Button
          ref={openButton}
          variant="ghost"
          size="icon-sm"
          aria-label={enter}
          title={enter}
          onClick={() => {
            setTab("preview");
            setFullscreen(true);
          }}
          className="text-muted-foreground"
        >
          <ArrowsOutIcon />
        </Button>
      </div>
      <TabsContent value="preview" keepMounted>
        {/* Links in examples point at the consumer's own routes; following
            one would leave the docs, so the preview keeps them inert. Enter on
            a link fires the same click, so the keyboard is covered too. */}
        <div
          data-fullscreen={fullscreen || undefined}
          role={fullscreen ? "dialog" : undefined}
          aria-modal={fullscreen || undefined}
          aria-label={fullscreen ? enter : undefined}
          onClickCapture={(e) => {
            if (e.target instanceof Element && e.target.closest("a[href]"))
              e.preventDefault();
          }}
          className={cn(
            "flex min-h-64 w-full items-center justify-center",
            fullscreen
              ? "fixed inset-0 z-50 bg-background p-4 sm:p-6"
              : "relative rounded-xl border px-4 py-10 sm:px-10",
          )}
        >
          <ExampleBoundary>
            <Demo />
          </ExampleBoundary>
          {fullscreen ? (
            <Button
              ref={closeButton}
              variant="outline"
              size="icon-sm"
              aria-label={exit}
              title={exit}
              onClick={() => setFullscreen(false)}
              className="absolute end-2 top-2 bg-background"
            >
              <ArrowsInIcon />
            </Button>
          ) : null}
        </div>
      </TabsContent>
      <TabsContent value="code">
        <CodeBlock code={code} />
      </TabsContent>
    </Tabs>
  );
}
