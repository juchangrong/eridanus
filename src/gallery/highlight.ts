import { useEffect, useState } from "react";
import type { HighlighterCore } from "shiki/core";

export type Lang = "tsx" | "bash" | "css" | "markdown" | "json";

let highlighter: Promise<HighlighterCore> | undefined;

/** Shiki with only the grammars the docs use and the JavaScript regex engine,
 * loaded on first use so the first paint does not wait for it. */
function load() {
  highlighter ??= Promise.all([
    import("shiki/core"),
    import("shiki/engine/javascript"),
  ]).then(([{ createHighlighterCore }, { createJavaScriptRegexEngine }]) =>
    createHighlighterCore({
      themes: [
        import("shiki/themes/github-light-default.mjs"),
        import("shiki/themes/github-dark-default.mjs"),
      ],
      langs: [
        import("shiki/langs/tsx.mjs"),
        import("shiki/langs/bash.mjs"),
        import("shiki/langs/css.mjs"),
        import("shiki/langs/markdown.mjs"),
        import("shiki/langs/json.mjs"),
      ],
      engine: createJavaScriptRegexEngine(),
    }),
  );
  return highlighter;
}

/** Highlighted HTML for both themes at once (colors in --shiki-light and
 * --shiki-dark), or undefined until the highlighter has loaded. */
export function useHighlighted(code: string, lang: Lang): string | undefined {
  const [html, setHtml] = useState<{
    code: string;
    lang: Lang;
    html: string;
  }>();
  useEffect(() => {
    let live = true;
    load().then((h) => {
      if (!live) return;
      setHtml({
        code,
        lang,
        html: h.codeToHtml(code, {
          lang,
          themes: {
            light: "github-light-default",
            dark: "github-dark-default",
          },
          defaultColor: false,
        }),
      });
    });
    return () => {
      live = false;
    };
  }, [code, lang]);
  return html?.code === code && html.lang === lang ? html.html : undefined;
}
