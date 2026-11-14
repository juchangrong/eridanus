import { useState } from "react";

import { SearchField } from "@/components/eridanus/search-field";

export default function SearchFieldDemo() {
  const [query, setQuery] = useState("");
  return (
    <SearchField
      label="Search runs"
      placeholder="Workflow or run ID"
      value={query}
      onChange={setQuery}
    />
  );
}
