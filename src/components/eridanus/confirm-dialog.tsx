import type { AlertDialog as AlertDialogPrimitive } from "@base-ui/react/alert-dialog";
import { type ReactNode, useState } from "react";

import { useMessages } from "@/components/eridanus/locale-provider";
import { Notice } from "@/components/eridanus/notice";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import type { Locale } from "@/lib/eridanus/locale";

const MESSAGES: Record<Locale, { cancel: string; failure: string }> = {
  "zh-CN": { cancel: "取消", failure: "操作失败：" },
  "en-US": { cancel: "Cancel", failure: "Couldn't complete this: " },
};

/**
 * The confirmation for an irreversible or outward-facing write. It says what
 * will happen and the confirm button repeats the verb. The dialog stays open
 * while `onConfirm` runs and cannot be dismissed meanwhile; a rejection is
 * shown inside it, where the reader can retry or cancel, and only success
 * closes it.
 */
export function ConfirmDialog({
  trigger,
  title,
  description,
  confirmLabel,
  cancelLabel,
  failurePrefix,
  destructive,
  onConfirm,
}: {
  /** The control that opens the dialog, e.g. `<Button variant="destructive">删除</Button>`. */
  trigger: AlertDialogPrimitive.Trigger.Props["render"];
  title: ReactNode;
  description: ReactNode;
  confirmLabel: ReactNode;
  cancelLabel?: ReactNode;
  failurePrefix?: string;
  destructive?: boolean;
  /** Reject to keep the dialog open; the error's message is shown in it. */
  onConfirm: () => Promise<unknown>;
}) {
  const t = useMessages(MESSAGES);
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const confirm = async () => {
    setPending(true);
    setError(null);
    try {
      await onConfirm();
      setOpen(false);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setPending(false);
    }
  };

  return (
    <AlertDialog
      open={open}
      onOpenChange={(next) => {
        if (pending) return;
        setError(null);
        setOpen(next);
      }}
    >
      <AlertDialogTrigger render={trigger} />
      {/* Tighter than shadcn's 24px: 16px around and between text and
          buttons, with corners concentric with the 32px pill buttons in the
          bottom corner (their 16px radius plus the 16px inset is 32). */}
      <AlertDialogContent className="gap-4 rounded-[32px] p-4">
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        {error ? (
          <Notice
            tone="error"
            description={`${failurePrefix ?? t.failure}${error}`}
          />
        ) : null}
        <AlertDialogFooter>
          <AlertDialogCancel disabled={pending}>
            {cancelLabel ?? t.cancel}
          </AlertDialogCancel>
          <Button
            variant={destructive ? "destructive" : "default"}
            disabled={pending}
            aria-busy={pending || undefined}
            onClick={() => void confirm()}
          >
            {pending ? <Spinner data-icon="inline-start" aria-hidden /> : null}
            {confirmLabel}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
