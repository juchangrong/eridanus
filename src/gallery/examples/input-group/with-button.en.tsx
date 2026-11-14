/**
 * Inline button
 * InputGroupButton goes inside an addon and suits in-place actions like copy, clear and show password.
 */
import { CheckIcon, CopyIcon } from "@phosphor-icons/react";
import { useState } from "react";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";

const webhook = "https://example.com/hooks/runs/9f2c";

export default function InputGroupWithButtonExample() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(webhook);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <InputGroup className="max-w-sm">
      <InputGroupInput
        readOnly
        value={webhook}
        aria-label="Webhook URL"
        className="font-mono"
      />
      <InputGroupAddon align="inline-end">
        <InputGroupButton
          size="icon-xs"
          aria-label={copied ? "Copied" : "Copy URL"}
          onClick={() => void copy()}
        >
          {copied ? <CheckIcon /> : <CopyIcon />}
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  );
}
