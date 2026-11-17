/**
 * 放进工具栏
 * TabsList 的 size="sm" 是 28px，和 SearchField、FilterSelect、小按钮一样高。
 */
import { useState } from "react";

import { FilterSelect } from "@/components/eridanus/filter-select";
import { SearchField } from "@/components/eridanus/search-field";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const STATUSES = ["completed", "running", "failed", "pending"].map((s) => ({
  value: s,
  label: s,
}));

export default function TabsToolbarExample() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("pending");
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Tabs defaultValue="steps">
        <TabsList size="sm">
          <TabsTrigger value="steps">步骤</TabsTrigger>
          <TabsTrigger value="events">事件</TabsTrigger>
        </TabsList>
      </Tabs>
      <SearchField
        label="搜索步骤"
        placeholder="步骤名称"
        value={query}
        onChange={setQuery}
      />
      <FilterSelect
        label="状态"
        value={status}
        onChange={setStatus}
        options={STATUSES}
      />
    </div>
  );
}
