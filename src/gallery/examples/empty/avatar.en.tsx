/**
 * Custom media
 * EmptyMedia has no background by default, and can hold anything, such as an avatar group.
 */
import { UserPlusIcon } from "@phosphor-icons/react";

import { Avatar, AvatarFallback, AvatarGroup } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

export default function EmptyAvatarExample() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia>
          <AvatarGroup>
            <Avatar size="lg">
              <AvatarFallback>A</AvatarFallback>
            </Avatar>
            <Avatar size="lg">
              <AvatarFallback>M</AvatarFallback>
            </Avatar>
            <Avatar size="lg">
              <AvatarFallback>J</AvatarFallback>
            </Avatar>
          </AvatarGroup>
        </EmptyMedia>
        <EmptyTitle>You're the only one in this project</EmptyTitle>
        <EmptyDescription>
          Invite teammates to let them view run history and get failure alerts.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button>
          <UserPlusIcon data-icon="inline-start" />
          Invite members
        </Button>
      </EmptyContent>
    </Empty>
  );
}
