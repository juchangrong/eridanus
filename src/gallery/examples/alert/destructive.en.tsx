/**
 * Error
 * variant="destructive" is for failures and problems that need attention. Both the text and the icon take on the warning color.
 */
import { WarningCircleIcon } from "@phosphor-icons/react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function AlertDestructiveExample() {
  return (
    <Alert variant="destructive" className="max-w-md">
      <WarningCircleIcon />
      <AlertTitle>Run #2048 failed</AlertTitle>
      <AlertDescription>
        The "Export report" step still timed out after 3 retries. Check that the
        target storage is writable.
      </AlertDescription>
    </Alert>
  );
}
