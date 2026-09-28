/**
 * Every registry item, read from the same registry.json files the CLI reads,
 * so the gallery lists exactly what can be installed.
 */
import root from "../../registry.json";
import skills from "../../skills/registry.json";
import components from "../components/eridanus/registry.json";
import hooks from "../hooks/eridanus/registry.json";
import lib from "../lib/eridanus/registry.json";

export interface CatalogItem {
  name: string;
  type: string;
  title?: string;
  description?: string;
  categories?: string[];
}

export const REPOSITORY = "juchangrong/eridanus";

export const catalog: CatalogItem[] = [root, lib, hooks, components, skills].flatMap((r) => r.items as CatalogItem[]);

/** The command that installs an item: the base starts a project, the rest add to one. */
export function installCommand(item: CatalogItem): string {
  return item.type === "registry:base"
    ? `npx shadcn@latest init ${REPOSITORY}/${item.name}`
    : `npx shadcn@latest add ${REPOSITORY}/${item.name}`;
}
