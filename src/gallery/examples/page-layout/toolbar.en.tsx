/**
 * List toolbar
 * Toolbar lays out the controls over a list 8px apart and wraps them; on phones the search takes a line of its own and leading Tabs keep the first line.
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
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="mine">Mine</TabsTrigger>
          </TabsList>
        </Tabs>
        <SearchField
          value={query}
          onChange={setQuery}
          label="Search services"
          placeholder="Search services"
        />
        <FilterSelect
          label="Status"
          value={status}
          onChange={setStatus}
          options={[
            { value: "running", label: "Running" },
            { value: "failed", label: "Failed" },
          ]}
        />
        <Button size="sm" className="ms-auto">
          <PlusIcon data-icon="inline-start" />
          New service
        </Button>
      </Toolbar>
    </div>
  );
}
