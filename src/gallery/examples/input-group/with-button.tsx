/**
 * 内嵌按钮
 * InputGroupButton 放在 addon 里，适合复制、清空、显示密码这类就地操作。
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
        aria-label="Webhook 地址"
        className="font-mono"
      />
      <InputGroupAddon align="inline-end">
        <InputGroupButton
          size="icon-xs"
          aria-label={copied ? "已复制" : "复制地址"}
          onClick={() => void copy()}
        >
          {copied ? <CheckIcon /> : <CopyIcon />}
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  );
}
