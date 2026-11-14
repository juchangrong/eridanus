/**
 * Prefix and suffix text
 * InputGroupText holds a fixed prefix or suffix, so the user only fills in the middle part.
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
      <InputGroupInput
        placeholder="data-platform"
        aria-label="Project subdomain"
      />
      <InputGroupAddon align="inline-end">
        <InputGroupText>.example.com</InputGroupText>
      </InputGroupAddon>
    </InputGroup>
  );
}
