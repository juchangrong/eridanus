import { useCallback, useMemo, useSyncExternalStore } from "react";

const CHANGE = "eridanus:url-state";

function subscribe(onChange: () => void) {
  window.addEventListener("popstate", onChange);
  window.addEventListener(CHANGE, onChange);
  return () => {
    window.removeEventListener("popstate", onChange);
    window.removeEventListener(CHANGE, onChange);
  };
}

function read(key: string) {
  return new URLSearchParams(window.location.search).get(key);
}

function write(key: string, value: string | null) {
  const url = new URL(window.location.href);
  if (value === null) url.searchParams.delete(key);
  else url.searchParams.set(key, value);
  window.history.replaceState(window.history.state, "", url);
  window.dispatchEvent(new Event(CHANGE));
}

/**
 * A string kept in the address bar's query (`?status=failed`), so a filtered
 * view survives a reload and can be shared as a link. Writes replace the
 * history entry rather than push one, so Back leaves the page instead of
 * stepping through every keystroke, and the fallback value is left out of
 * the URL. Every hook reading the same key sees the same value. A field
 * typed into writes on every keystroke, which browsers throttle; keep the
 * field's own state and write the debounced value. Numbers and
 * other values are serialized at the call site. In an app whose router owns
 * the query (Next.js, React Router), use the router's search-param API.
 */
export function useUrlState(
  key: string,
  fallback = "",
): [string, (next: string) => void] {
  const value = useSyncExternalStore(
    subscribe,
    () => read(key) ?? fallback,
    () => fallback,
  );
  const set = useCallback(
    (next: string) => write(key, next === fallback ? null : next),
    [key, fallback],
  );
  return [value, set];
}

/**
 * A list of strings in one query parameter, comma-separated
 * (`?status=failed,running`), for multi-value filters. An empty list leaves
 * the parameter out.
 */
export function useUrlListState(
  key: string,
): [string[], (next: readonly string[]) => void] {
  const [raw, setRaw] = useUrlState(key);
  const list = useMemo(() => raw.split(",").filter(Boolean), [raw]);
  const set = useCallback(
    (next: readonly string[]) => setRaw(next.join(",")),
    [setRaw],
  );
  return [list, set];
}
