import { fileURLToPath } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
  },
  // The docs import every example, and the source text the code tabs and
  // manual install steps show, up front so switching pages never waits; only
  // gpu-lexer loads on demand, in a chunk of its own.
  build: { chunkSizeWarningLimit: 1200 },
});
