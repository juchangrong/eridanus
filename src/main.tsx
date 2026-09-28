import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { ThemeProvider } from "@/components/eridanus/theme-provider";
import { AppToaster } from "@/components/eridanus/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import { Gallery } from "./gallery/gallery";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider storageKey="eridanus-gallery-theme">
      <TooltipProvider>
        <AppToaster>
          <Gallery />
        </AppToaster>
      </TooltipProvider>
    </ThemeProvider>
  </StrictMode>,
);
