/**
 * 多行输入
 * InputGroupTextarea 配合 align="block-end" 的 addon，在底部放字数和提交按钮。
 */
import { PaperPlaneRightIcon } from "@phosphor-icons/react";
import { useState } from "react";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";

const limit = 200;

export default function InputGroupTextareaExample() {
  const [note, setNote] = useState("");

  return (
    <InputGroup className="max-w-md">
      <InputGroupTextarea
        value={note}
        onChange={(event) => setNote(event.target.value)}
        maxLength={limit}
        placeholder="给这次运行留个备注，比如为什么手动重跑"
        aria-label="运行备注"
      />
      <InputGroupAddon align="block-end">
        <InputGroupText className="tabular-nums">
          {note.length}/{limit}
        </InputGroupText>
        <InputGroupButton
          variant="default"
          size="sm"
          className="ml-auto"
          disabled={note.trim() === ""}
        >
          <PaperPlaneRightIcon data-icon="inline-start" />
          提交
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  );
}
