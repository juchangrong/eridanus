import { useState } from "react";

import { SearchField } from "@/components/eridanus/search-field";

export default function SearchFieldDemo() {
  const [query, setQuery] = useState("");
  return (
    <SearchField
      label="搜索运行"
      placeholder="工作流或 Run ID"
      value={query}
      onChange={setQuery}
    />
  );
}
