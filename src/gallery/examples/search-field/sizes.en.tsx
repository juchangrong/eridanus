/**
 * Sizes
 * The default sm is 28px tall and lines up with filters in a toolbar. Use default in forms.
 */
import { useState } from "react";

import { SearchField } from "@/components/eridanus/search-field";

export default function SearchFieldSizesExample() {
  const [small, setSmall] = useState("");
  const [regular, setRegular] = useState("syncCatalog");
  return (
    <div className="flex flex-col items-start gap-3">
      <SearchField
        label="Search runs"
        placeholder="Workflow or run ID"
        value={small}
        onChange={setSmall}
      />
      <SearchField
        label="Search workflows"
        size="default"
        placeholder="Workflow name"
        value={regular}
        onChange={setRegular}
      />
    </div>
  );
}
