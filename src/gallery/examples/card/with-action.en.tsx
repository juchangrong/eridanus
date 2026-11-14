/**
 * Header action
 * CardAction goes inside CardHeader and is pinned to the right of the title.
 */
import { DotsThreeIcon } from "@phosphor-icons/react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function CardWithActionExample() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Access key</CardTitle>
        <CardDescription>Used to call the project's open API.</CardDescription>
        <CardAction>
          <Button variant="ghost" size="icon-sm" aria-label="More actions">
            <DotsThreeIcon />
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p className="font-mono text-muted-foreground">sk-••••••••3f9a</p>
      </CardContent>
    </Card>
  );
}
