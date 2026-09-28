import { useId, type ComponentProps, type ReactNode } from "react";

import { Field, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

/**
 * A labelled input with its hint and its error, both tied to the input through
 * aria-describedby, and aria-invalid set while there is an error. The hint
 * stays visible next to the error, since it usually says what a valid value
 * looks like. `required` marks the label and sets the input's `required`.
 */
export function FormInput({
  id,
  label,
  description,
  error,
  required,
  disabled,
  className,
  ...props
}: ComponentProps<"input"> & {
  label: ReactNode;
  description?: ReactNode;
  error?: string;
}) {
  const auto = useId();
  const inputId = id ?? auto;
  const describedBy = [description ? `${inputId}-hint` : null, error ? `${inputId}-error` : null].filter(Boolean).join(" ");
  return (
    <Field data-invalid={error ? true : undefined} data-disabled={disabled || undefined} className="gap-2">
      <FieldLabel htmlFor={inputId}>
        {label}
        {required ? <span aria-hidden className="text-destructive">*</span> : null}
      </FieldLabel>
      <Input
        id={inputId}
        required={required}
        disabled={disabled}
        className={className}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy || undefined}
        {...props}
      />
      {description ? <FieldDescription id={`${inputId}-hint`}>{description}</FieldDescription> : null}
      {error ? <FieldError id={`${inputId}-error`}>{error}</FieldError> : null}
    </Field>
  );
}
