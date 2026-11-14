import { MagnifyingGlassIcon } from "@phosphor-icons/react";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

export default function InputGroupDemo() {
  return (
    <InputGroup className="max-w-sm">
      <InputGroupInput
        type="search"
        placeholder="Search workflows"
        aria-label="Search workflows"
      />
      <InputGroupAddon>
        <MagnifyingGlassIcon />
      </InputGroupAddon>
      <InputGroupAddon align="inline-end">12 results</InputGroupAddon>
    </InputGroup>
  );
}
