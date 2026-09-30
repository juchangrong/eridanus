import { Component, type ErrorInfo, type ReactNode } from "react";

import { Notice } from "@/components/eridanus/notice";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import type { Example } from "../examples";
import { CodeBlock } from "./code-block";

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
      <Notice
        tone="error"
        title="示例渲染失败"
        description={this.state.error.message}
      />
    ) : (
      this.props.children
    );
  }
}

/** An example with a 预览 tab and a 代码 tab. The preview stays mounted while
 * the code shows, so a demo keeps its state across switches. */
export function ComponentPreview({ example }: { example: Example }) {
  const { Component: Demo, code } = example;
  return (
    <Tabs defaultValue="preview" className="gap-3">
      <TabsList variant="line" aria-label="示例视图">
        <TabsTrigger value="preview">预览</TabsTrigger>
        <TabsTrigger value="code">代码</TabsTrigger>
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
