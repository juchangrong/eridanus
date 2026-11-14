import { Component, type ErrorInfo, type ReactNode } from "react";
import { useLocale } from "@/components/eridanus/locale-provider";
import { Notice } from "@/components/eridanus/notice";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
 * the code shows, so a demo keeps its state across switches. */
export function ComponentPreview({ example }: { example: Example }) {
  const { Component: Demo, code } = exampleIn(example, useLocale());
  const t = useT();
  return (
    <Tabs defaultValue="preview" className="gap-3">
      <TabsList variant="line" aria-label={t("示例视图", "Example view")}>
        <TabsTrigger value="preview">{t("预览", "Preview")}</TabsTrigger>
        <TabsTrigger value="code">{t("代码", "Code")}</TabsTrigger>
      </TabsList>
      <TabsContent value="preview" keepMounted>
        {/* Links in examples point at the consumer's own routes; following
            one would leave the docs, so the preview keeps them inert. Enter on
            a link fires the same click, so the keyboard is covered too. */}
        <div
          onClickCapture={(e) => {
            if (e.target instanceof Element && e.target.closest("a[href]"))
              e.preventDefault();
          }}
          className="flex min-h-64 w-full items-center justify-center rounded-xl border px-4 py-10 sm:px-10"
        >
          <ExampleBoundary>
            <Demo />
          </ExampleBoundary>
        </div>
      </TabsContent>
      <TabsContent value="code">
        <CodeBlock code={code} />
      </TabsContent>
    </Tabs>
  );
}
