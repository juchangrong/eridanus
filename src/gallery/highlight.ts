import { useEffect, useState } from "react";

type SyntaxSpan = Awaited<ReturnType<typeof import("gpu-lexer").parse>>[number];

let lexer: Promise<typeof import("gpu-lexer").parse> | undefined;

/** gpu-lexer, loaded on first use so the first paint does not wait for it.
 * One model covers every language, so there is nothing to pick per block. */
function load() {
  lexer ??= import("gpu-lexer").then((m) => m.parse);
  return lexer;
}

/** Syntax spans for `code`, or undefined until they are ready. Stays
 * undefined where WebGPU is unavailable, so the code shows as plain text. */
export function useHighlighted(code: string): SyntaxSpan[] | undefined {
  const [result, setResult] = useState<{ code: string; spans: SyntaxSpan[] }>();
  useEffect(() => {
    let live = true;
    load()
      .then((parse) => parse(code))
      .then(
        (spans) => {
          if (live) setResult({ code, spans });
        },
        () => {},
      );
    return () => {
      live = false;
    };
  }, [code]);
  return result?.code === code ? result.spans : undefined;
}
