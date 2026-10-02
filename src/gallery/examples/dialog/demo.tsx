import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function DialogDemo() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button variant="outline" />}>
        重命名
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>重命名项目</DialogTitle>
          <DialogDescription>新名称会立即对所有成员可见。</DialogDescription>
        </DialogHeader>
        <div className="grid gap-2">
          <Label htmlFor="dialog-demo-name">项目名称</Label>
          <Input id="dialog-demo-name" defaultValue="数据平台" />
        </div>
        <DialogFooter>
          <DialogClose render={<Button variant="outline" />}>取消</DialogClose>
          <Button onClick={() => setOpen(false)}>保存</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
