import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react";

export type ThemePreference = "system" | "light" | "dark";
export type ResolvedTheme = "light" | "dark";

export interface ThemeState {
  /** What the viewer chose. */
  preference: ThemePreference;
  /** What is on screen: the choice, or the system's when the choice is "system". */
  resolved: ResolvedTheme;
  setPreference: (next: ThemePreference) => void;
}

const DARK_QUERY = "(prefers-color-scheme: dark)";
const ThemeContext = createContext<ThemeState | null>(null);

function readStored(key: string, fallback: ThemePreference): ThemePreference {
  try {
    const value = localStorage.getItem(key);
    return value === "system" || value === "light" || value === "dark"
      ? value
      : fallback;
  } catch {
    return fallback;
  }
}

function subscribeSystem(onChange: () => void) {
  const mql = window.matchMedia(DARK_QUERY);
  mql.addEventListener("change", onChange);
  return () => mql.removeEventListener("change", onChange);
}
const systemIsDark = () => window.matchMedia(DARK_QUERY).matches;

/** Every color, border and shadow changes at once on a switch; with hover
 * transitions running the switch smears. Transitions are off for exactly the
 * frame that applies it. */
function withoutTransitions(apply: () => void) {
  const style = document.createElement("style");
  style.append(
    document.createTextNode("*,*::before,*::after{transition:none !important}"),
  );
  document.head.append(style);
  apply();
  void document.body.offsetHeight;
  requestAnimationFrame(() => requestAnimationFrame(() => style.remove()));
}

/**
 * Light, dark or the system's choice, remembered in localStorage under
 * `storageKey`. The resolved theme goes on <html> as the `dark` class, which
 * shadcn's dark tokens and `dark:` variant read, and as `data-theme`. With
 * `scoped`, both are removed when the provider unmounts, for an app mounted
 * inside a site that has its own palette.
 */
export function ThemeProvider({
  children,
  storageKey = "eridanus-theme",
  defaultPreference = "system",
  scoped = false,
}: {
  children: ReactNode;
  storageKey?: string;
  defaultPreference?: ThemePreference;
  scoped?: boolean;
}) {
  const [preference, setPreferenceState] = useState(() =>
    readStored(storageKey, defaultPreference),
  );
  const systemDark = useSyncExternalStore(
    subscribeSystem,
    systemIsDark,
    () => false,
  );
  const resolved: ResolvedTheme =
    preference === "system" ? (systemDark ? "dark" : "light") : preference;

  // A layout effect runs before other components' passive effects, so one
  // that reads resolved colors (a canvas, a chart) already sees the new theme.
  useLayoutEffect(() => {
    const root = document.documentElement;
    if (root.dataset.theme === resolved) return;
    const apply = () => {
      root.classList.toggle("dark", resolved === "dark");
      root.dataset.theme = resolved;
    };
    if (root.dataset.theme === undefined) apply();
    else withoutTransitions(apply);
  }, [resolved]);

  useEffect(() => {
    if (!scoped) return;
    return () => {
      document.documentElement.classList.remove("dark");
      delete document.documentElement.dataset.theme;
    };
  }, [scoped]);

  const setPreference = useCallback(
    (next: ThemePreference) => {
      setPreferenceState(next);
      try {
        if (next === defaultPreference) localStorage.removeItem(storageKey);
        else localStorage.setItem(storageKey, next);
      } catch {
        // Storage can be unavailable (private mode, blocked site data); the
        // choice still applies for this visit.
      }
    },
    [storageKey, defaultPreference],
  );

  const value = useMemo(
    () => ({ preference, resolved, setPreference }),
    [preference, resolved, setPreference],
  );
  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

/** The theme state from the nearest ThemeProvider. */
export function useTheme(): ThemeState {
  const value = useContext(ThemeContext);
  if (!value) throw new Error("useTheme must be used inside a ThemeProvider");
  return value;
}
