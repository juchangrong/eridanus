/**
 * With an icon
 * Add data-icon to say which side of the text the icon is on. An icon-only button must be named with aria-label.
 */
import {
  ArrowRightIcon,
  DownloadSimpleIcon,
  TrashIcon,
} from "@phosphor-icons/react";

import { Button } from "@/components/ui/button";

export default function ButtonWithIconExample() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button variant="outline">
        <DownloadSimpleIcon data-icon="inline-start" />
        Export logs
      </Button>
      <Button variant="secondary">
        Next
        <ArrowRightIcon data-icon="inline-end" />
      </Button>
      <Button variant="ghost" size="icon" aria-label="Delete run">
        <TrashIcon />
      </Button>
    </div>
  );
}
