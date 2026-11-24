import { fileURLToPath } from "node:url";

import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  // Relative asset URLs, so the build works wherever it is served: at the
  // root, or under /eridanus/ on GitHub Pages. The hash holds the route, so
  // every page is index.html.
  base: "./",
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
  },
  // The docs import every example, and the source text the code tabs and
  // manual install steps show, up front so switching pages never waits; only
  // gpu-lexer loads on demand, in a chunk of its own.
  build: { chunkSizeWarningLimit: 1200 },
});
