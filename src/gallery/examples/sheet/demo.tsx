import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function SheetDemo() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger render={<Button variant="outline" />}>
        编辑项目
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>编辑项目</SheetTitle>
          <SheetDescription>修改会在保存后对所有成员生效。</SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 px-6">
          <div className="grid gap-2">
            <Label htmlFor="sheet-demo-name">项目名称</Label>
            <Input id="sheet-demo-name" defaultValue="数据平台" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="sheet-demo-owner">负责人邮箱</Label>
            <Input
              id="sheet-demo-owner"
              type="email"
              defaultValue="lin.xiao@example.com"
            />
          </div>
        </div>
        <SheetFooter>
          <Button onClick={() => setOpen(false)}>保存</Button>
          <SheetClose render={<Button variant="outline" />}>取消</SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
