import { useState } from "react";

import { FormInput } from "@/components/eridanus/form-input";

const SLUG = /^[a-z0-9_]+$/;

export default function FormInputDemo() {
  const [slug, setSlug] = useState("Order-Sync");
  const error = !slug
    ? "Enter a project slug"
    : SLUG.test(slug)
      ? undefined
      : "Use only lowercase letters, numbers, and underscores";
  return (
    <div className="grid w-full max-w-xl gap-4 sm:grid-cols-2">
      <FormInput label="Display name" placeholder="e.g. Order Sync" />
      <FormInput
        label="Project slug"
        required
        className="font-mono"
        value={slug}
        onChange={(e) => setSlug(e.target.value)}
        description="Can't be changed after creation"
        error={error}
        autoComplete="off"
        spellCheck={false}
      />
    </div>
  );
}
