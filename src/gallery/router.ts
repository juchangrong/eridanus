import { useSyncExternalStore } from "react";

/** Hash routes, so the docs work from any static host: #/ is the home page
 * and #/docs/<name> an entry. */
function subscribe(onChange: () => void) {
  window.addEventListener("hashchange", onChange);
  return () => window.removeEventListener("hashchange", onChange);
}

const current = () => window.location.hash.match(/^#\/docs\/([\w-]+)/)?.[1];

/** The entry name the address points at, or undefined for the home page. */
export function useRoute(): string | undefined {
  return useSyncExternalStore(subscribe, current);
}

export const docHref = (name?: string) => (name ? `#/docs/${name}` : "#/");
