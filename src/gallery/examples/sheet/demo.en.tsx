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
        Edit project
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit project</SheetTitle>
          <SheetDescription>
            Changes apply to all members once saved.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 px-6">
          <div className="grid gap-2">
            <Label htmlFor="sheet-demo-name">Project name</Label>
            <Input id="sheet-demo-name" defaultValue="Data platform" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="sheet-demo-owner">Owner email</Label>
            <Input
              id="sheet-demo-owner"
              type="email"
              defaultValue="lin.xiao@example.com"
            />
          </div>
        </div>
        <SheetFooter>
          <Button onClick={() => setOpen(false)}>Save</Button>
          <SheetClose render={<Button variant="outline" />}>Cancel</SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
