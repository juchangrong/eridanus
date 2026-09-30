import { useState } from "react";

import { FormInput } from "@/components/eridanus/form-input";

const SLUG = /^[a-z0-9_]+$/;

export default function FormInputDemo() {
  const [slug, setSlug] = useState("Order-Sync");
  const error = !slug
    ? "填写项目标识"
    : SLUG.test(slug)
      ? undefined
      : "只能用小写字母、数字和下划线";
  return (
    <div className="grid w-full max-w-xl gap-4 sm:grid-cols-2">
      <FormInput label="显示名称" placeholder="例如：订单同步" />
      <FormInput
        label="项目标识"
        required
        className="font-mono"
        value={slug}
        onChange={(e) => setSlug(e.target.value)}
        description="创建后不可修改"
        error={error}
        autoComplete="off"
        spellCheck={false}
      />
    </div>
  );
}
