import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { ThemeProvider } from "@/components/eridanus/theme-provider";
import { AppToaster } from "@/components/eridanus/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import { App } from "./gallery/app";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider storageKey="eridanus-gallery-theme">
      <TooltipProvider>
        <AppToaster>
          <App />
        </AppToaster>
      </TooltipProvider>
    </ThemeProvider>
  </StrictMode>,
);
