import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { ThemeProvider } from "@/components/eridanus/theme-provider";
import { AppToaster } from "@/components/eridanus/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import { App } from "./gallery/app";
import { DocsLocale } from "./gallery/i18n";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider storageKey="eridanus-gallery-theme">
      <DocsLocale>
        <TooltipProvider>
          <AppToaster>
            <App />
          </AppToaster>
        </TooltipProvider>
      </DocsLocale>
    </ThemeProvider>
  </StrictMode>,
);
