/**
 * 前后缀文字
 * InputGroupText 放固定的前缀或后缀，用户只需要填中间的部分。
 */
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group";

export default function InputGroupWithTextExample() {
  return (
    <InputGroup className="max-w-sm">
      <InputGroupAddon>
        <InputGroupText>https://</InputGroupText>
      </InputGroupAddon>
      <InputGroupInput placeholder="data-platform" aria-label="项目子域名" />
      <InputGroupAddon align="inline-end">
        <InputGroupText>.example.com</InputGroupText>
      </InputGroupAddon>
    </InputGroup>
  );
}
