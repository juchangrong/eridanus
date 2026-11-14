/**
 * With an icon
 * Add data-icon="inline-start" or "inline-end" to the icon, and the badge tightens the padding on that side.
 */
import { ArrowUpRightIcon, CheckCircleIcon } from "@phosphor-icons/react";

import { Badge } from "@/components/ui/badge";
import { Spinner } from "@/components/ui/spinner";

export default function BadgeWithIconExample() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Badge variant="secondary">
        <CheckCircleIcon data-icon="inline-start" />
        Passed
      </Badge>
      <Badge variant="outline">
        <Spinner data-icon="inline-start" aria-hidden />
        Deploying
      </Badge>
      <Badge variant="outline">
        External dependency
        <ArrowUpRightIcon data-icon="inline-end" />
      </Badge>
    </div>
  );
}
