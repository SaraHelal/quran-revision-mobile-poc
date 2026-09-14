export function normalizeSearchText(text: string): string {
  return text.toLowerCase().replaceAll("-", "").replaceAll(" ", "");
}
