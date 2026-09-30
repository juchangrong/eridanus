import { CheckCircleIcon, WarningCircleIcon } from "@phosphor-icons/react";
import type { ReactNode } from "react";

import {
  Toast,
  ToastClose,
  ToastContent,
  ToastDescription,
  ToastPortal,
  ToastProvider,
  ToastTitle,
  ToastViewport,
  toast,
  useToastManager,
} from "@/components/ui/toast";

/**
 * The app's toast region, wrapping everything that may call `notify`. The
 * region and each close button are named in Chinese by default; the stock
 * toast list names them in English.
 */
export function AppToaster({
  children,
  regionLabel = "通知",
  closeLabel = "关闭通知",
}: {
  children: ReactNode;
  regionLabel?: string;
  closeLabel?: string;
}) {
  return (
    <ToastProvider toastManager={toast}>
      {children}
      <ToastPortal>
        <ToastViewport aria-label={regionLabel}>
          <ToastList closeLabel={closeLabel} />
        </ToastViewport>
      </ToastPortal>
    </ToastProvider>
  );
}

function ToastList({ closeLabel }: { closeLabel: string }) {
  const { toasts } = useToastManager();
  return toasts.map((t) => (
    <Toast key={t.id} toast={t}>
      <ToastContent>
        {t.type === "success" ? (
          <CheckCircleIcon
            weight="fill"
            className="size-4 shrink-0 text-success"
            aria-hidden
          />
        ) : null}
        {t.type === "error" ? (
          <WarningCircleIcon
            weight="fill"
            className="size-4 shrink-0 text-destructive"
            aria-hidden
          />
        ) : null}
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <ToastTitle />
          <ToastDescription className="[overflow-wrap:anywhere]" />
        </div>
        <ToastClose aria-label={closeLabel} />
      </ToastContent>
    </Toast>
  ));
}

/**
 * Shows a toast in the AppToaster: a success by default, or an error. Success
 * toasts are announced politely and close after 4 seconds; error toasts are
 * announced at once and stay until closed.
 */
export function notify(
  title: string,
  options: { description?: string; type?: "success" | "error" } = {},
) {
  const type = options.type ?? "success";
  const error = type === "error";
  toast.add({
    title,
    description: options.description,
    type,
    timeout: error ? 0 : 4000,
    priority: error ? "high" : "low",
  });
}
