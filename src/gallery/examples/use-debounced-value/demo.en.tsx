import { useState } from "react";

import { SearchField } from "@/components/eridanus/search-field";
import { useDebouncedValue } from "@/hooks/eridanus/use-debounced-value";

export default function UseDebouncedValueDemo() {
  const [value, setValue] = useState("");
  const settled = useDebouncedValue(value);
  return (
    <div className="flex flex-col items-start gap-3">
      <SearchField
        label="Try typing"
        placeholder="Try typing. Esc to clear"
        value={value}
        onChange={setValue}
      />
      <p className="m-0 text-sm text-muted-foreground">
        Typed <span className="font-mono text-foreground">{value || "—"}</span>
        {", "}after a 250ms pause{" "}
        <span className="font-mono text-foreground">{settled || "—"}</span>
      </p>
    </div>
  );
}
