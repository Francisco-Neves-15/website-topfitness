const html = document.documentElement;

export default function readCssNumberVar(varName) {
  const raw = getComputedStyle(html).getPropertyValue(varName);
  if (!raw) return null;
  const cleaned = raw.trim().replace(/^["']|["']$/g, '') // remove quotes
                         .replace(/px$/i, '')            // remove px se existir
                         .trim();
  const n = Number(cleaned);
  return Number.isNaN(n) ? null : n;
}
