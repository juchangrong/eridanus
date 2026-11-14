/**
 * Multi-line input
 * InputGroupTextarea with an addon that has align="block-end" puts a character count and a submit button at the bottom.
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
        placeholder="Add a note to this run, e.g. why you re-ran it manually"
        aria-label="Run note"
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
          Submit
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  );
}
