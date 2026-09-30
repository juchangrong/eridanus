/**
 * 尺寸
 * 默认的 sm 高 28px，和工具栏里的筛选器对齐；表单里用 default。
 */
import { useState } from "react";

import { SearchField } from "@/components/eridanus/search-field";

export default function SearchFieldSizesExample() {
  const [small, setSmall] = useState("");
  const [regular, setRegular] = useState("syncCatalog");
  return (
    <div className="flex flex-col items-start gap-3">
      <SearchField
        label="搜索运行"
        placeholder="工作流或 Run ID"
        value={small}
        onChange={setSmall}
      />
      <SearchField
        label="搜索工作流"
        size="default"
        placeholder="工作流名称"
        value={regular}
        onChange={setRegular}
      />
    </div>
  );
}
