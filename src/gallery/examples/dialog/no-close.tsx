/**
 * 隐藏右上角关闭按钮
 * showCloseButton={false} 去掉角上的关闭按钮，只留底部的操作；Esc 和点击遮罩仍能关闭。
 */
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

export default function DialogNoCloseExample() {
  return (
    <Dialog>
      <DialogTrigger render={<Button variant="outline" />}>
        查看配额
      </DialogTrigger>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>本月配额</DialogTitle>
          <DialogDescription>
            已使用 8,200 / 10,000 次运行，配额在每月 1 日重置。
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose render={<Button />}>知道了</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
