/**
 * 自定义图示
 * EmptyMedia 默认不加底色，可以放头像组等任意内容。
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
              <AvatarFallback>林</AvatarFallback>
            </Avatar>
            <Avatar size="lg">
              <AvatarFallback>陈</AvatarFallback>
            </Avatar>
            <Avatar size="lg">
              <AvatarFallback>许</AvatarFallback>
            </Avatar>
          </AvatarGroup>
        </EmptyMedia>
        <EmptyTitle>项目里只有你一个人</EmptyTitle>
        <EmptyDescription>
          邀请同事加入后，他们可以查看运行记录并接收失败通知。
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button>
          <UserPlusIcon data-icon="inline-start" />
          邀请成员
        </Button>
      </EmptyContent>
    </Empty>
  );
}
