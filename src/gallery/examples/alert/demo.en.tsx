import { InfoIcon } from "@phosphor-icons/react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function AlertDemo() {
  return (
    <Alert className="max-w-md">
      <InfoIcon />
      <AlertTitle>Maintenance early Saturday</AlertTitle>
      <AlertDescription>
        The scheduler is being upgraded from 02:00 to 04:00. Runs submitted
        during that time are queued and start automatically afterward.
      </AlertDescription>
    </Alert>
  );
}
