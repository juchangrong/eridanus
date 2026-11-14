/**
 * Hide the close button
 * showCloseButton={false} removes the close button in the corner and leaves only the actions at the bottom. Esc and clicking the overlay still close the dialog.
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
        View quota
      </DialogTrigger>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Monthly quota</DialogTitle>
          <DialogDescription>
            8,200 / 10,000 runs used. The quota resets on the 1st of each month.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose render={<Button />}>Got it</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
