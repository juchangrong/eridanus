import { Fragment, type ReactNode } from "react";

export function InlineCode({ children }: { children: ReactNode }) {
  return (
    <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[0.85em] text-foreground">
      {children}
    </code>
  );
}

/** Registry descriptions mark code with backticks. */
export function Prose({ text }: { text: string }) {
  // The parts of a fixed string never reorder, so their index is their key.
  return text.split("`").map((part, i) =>
    i % 2 === 1 ? (
      // biome-ignore lint/suspicious/noArrayIndexKey: see above
      <InlineCode key={i}>{part}</InlineCode>
    ) : (
      // biome-ignore lint/suspicious/noArrayIndexKey: see above
      <Fragment key={i}>{part}</Fragment>
    ),
  );
}
