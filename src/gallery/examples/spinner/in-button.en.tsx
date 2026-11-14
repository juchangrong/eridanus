/**
 * Inside a button
 * When the button already says what it is doing, add aria-hidden to the Spinner and use data-icon to align the padding.
 */
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

export default function SpinnerInButtonExample() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button disabled>
        <Spinner data-icon="inline-start" aria-hidden />
        Deploying
      </Button>
      <Button variant="outline" disabled>
        <Spinner data-icon="inline-start" aria-hidden />
        Exporting
      </Button>
    </div>
  );
}
