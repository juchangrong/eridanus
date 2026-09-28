/**
 * Copies text to the clipboard. Uses the async Clipboard API, and falls back
 * to a hidden textarea with `execCommand("copy")` where that API is missing or
 * refused, as on plain-http development servers. Rejects when both fail.
 */
export async function copyText(text: string): Promise<void> {
  try {
    await navigator.clipboard.writeText(text);
    return;
  } catch {
    // navigator.clipboard is undefined outside secure contexts, and
    // writeText rejects without focus or permission; the fallback covers both.
  }
  const area = document.createElement("textarea");
  area.value = text;
  area.setAttribute("readonly", "");
  area.style.position = "fixed";
  area.style.opacity = "0";
  document.body.append(area);
  area.select();
  const copied = document.execCommand("copy");
  area.remove();
  if (!copied) throw new Error("Copy to clipboard failed");
}
