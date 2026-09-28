import { useEffect, useState } from "react";

/**
 * The value once it has held still for `ms` milliseconds. A search field
 * bound to the live value stays instant while the request keyed on the
 * debounced value waits for the typing to settle.
 */
export function useDebouncedValue<T>(value: T, ms = 250): T {
  const [settled, setSettled] = useState(value);
  useEffect(() => {
    const timer = window.setTimeout(() => setSettled(value), ms);
    return () => window.clearTimeout(timer);
  }, [value, ms]);
  return settled;
}
