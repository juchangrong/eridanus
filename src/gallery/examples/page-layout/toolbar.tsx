/**
 * 列表工具栏
 * Toolbar 排列列表上方的控件，间距 8px，放不下时换行；手机上搜索框单独占一行，开头的 Tabs 留在第一行。
 */
import { PlusIcon } from "@phosphor-icons/react";
import { useState } from "react";

import { FilterSelect } from "@/components/eridanus/filter-select";
import { Toolbar } from "@/components/eridanus/page-layout";
import { SearchField } from "@/components/eridanus/search-field";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function PageLayoutToolbar() {
  const [scope, setScope] = useState("all");
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("");
  return (
    <div className="w-full">
      <Toolbar>
        <Tabs value={scope} onValueChange={(v) => setScope(String(v))}>
          <TabsList>
            <TabsTrigger value="all">全部</TabsTrigger>
            <TabsTrigger value="mine">我的</TabsTrigger>
          </TabsList>
        </Tabs>
        <SearchField
          value={query}
          onChange={setQuery}
          label="搜索服务"
          placeholder="搜索服务"
        />
        <FilterSelect
          label="状态"
          value={status}
          onChange={setStatus}
          options={[
            { value: "running", label: "运行中" },
            { value: "failed", label: "失败" },
          ]}
        />
        <Button size="sm" className="ms-auto">
          <PlusIcon data-icon="inline-start" />
          新建服务
        </Button>
      </Toolbar>
    </div>
  );
}
