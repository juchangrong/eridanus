/**
 * Loading
 * While submitting, disable the button and put a Spinner before the label. Keep the label unchanged so the width does not jump.
 */
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

export default function ButtonLoadingExample() {
  const [pending, setPending] = useState(false);

  const run = () => {
    setPending(true);
    setTimeout(() => setPending(false), 2000);
  };

  return (
    <Button disabled={pending} aria-busy={pending || undefined} onClick={run}>
      {pending ? <Spinner data-icon="inline-start" aria-hidden /> : null}
      Run now
    </Button>
  );
}
