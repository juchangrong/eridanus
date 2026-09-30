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
        placeholder="搜索工作流"
        aria-label="搜索工作流"
      />
      <InputGroupAddon>
        <MagnifyingGlassIcon />
      </InputGroupAddon>
      <InputGroupAddon align="inline-end">12 个结果</InputGroupAddon>
    </InputGroup>
  );
}
