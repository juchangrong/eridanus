/**
 * 标题栏操作
 * CardAction 放在 CardHeader 里，会固定在标题右侧。
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
        <CardTitle>访问密钥</CardTitle>
        <CardDescription>用于调用项目的开放接口。</CardDescription>
        <CardAction>
          <Button variant="ghost" size="icon-sm" aria-label="更多操作">
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
