import { useState } from "react";

import { SearchField } from "@/components/eridanus/search-field";
import { useDebouncedValue } from "@/hooks/eridanus/use-debounced-value";

export default function UseDebouncedValueDemo() {
  const [value, setValue] = useState("");
  const settled = useDebouncedValue(value);
  return (
    <div className="flex flex-col items-start gap-3">
      <SearchField
        label="输入试试"
        placeholder="输入试试，Esc 清空"
        value={value}
        onChange={setValue}
      />
      <p className="m-0 text-sm text-muted-foreground">
        输入 <span className="font-mono text-foreground">{value || "—"}</span>
        ，停顿 250ms 后{" "}
        <span className="font-mono text-foreground">{settled || "—"}</span>
      </p>
    </div>
  );
}
