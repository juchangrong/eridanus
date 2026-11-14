/**
 * As a link
 * Use render to turn the badge into an <a>. It gives feedback on hover.
 */
import { Badge } from "@/components/ui/badge";

export default function BadgeLinkExample() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Badge
        variant="outline"
        render={<a href="https://example.com/runs/2048" />}
      >
        Run #2048
      </Badge>
      <Badge variant="link" render={<a href="https://example.com/releases" />}>
        View release notes
      </Badge>
    </div>
  );
}
