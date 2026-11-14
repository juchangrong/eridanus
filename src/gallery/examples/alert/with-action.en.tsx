/**
 * With an action
 * AlertAction is pinned to the top right and holds a button that can handle the alert directly.
 */
import { KeyIcon } from "@phosphor-icons/react";

import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

export default function AlertWithActionExample() {
  return (
    <Alert className="max-w-md">
      <KeyIcon />
      <AlertTitle>Access key expires in 7 days</AlertTitle>
      <AlertDescription>
        Once it expires, scheduled jobs that use it will stop running.
      </AlertDescription>
      <AlertAction>
        <Button size="xs" variant="outline">
          Renew
        </Button>
      </AlertAction>
    </Alert>
  );
}
