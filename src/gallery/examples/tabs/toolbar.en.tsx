/**
 * In a toolbar
 * size="sm" on TabsList makes it 28px, the same height as SearchField, FilterSelect and small buttons.
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
          <TabsTrigger value="steps">Steps</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
        </TabsList>
      </Tabs>
      <SearchField
        label="Search steps"
        placeholder="Step name"
        value={query}
        onChange={setQuery}
      />
      <FilterSelect
        label="Status"
        value={status}
        onChange={setStatus}
        options={STATUSES}
      />
    </div>
  );
}
