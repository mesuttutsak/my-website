export async function writeToClipboard(text: string) {
  if (!navigator.clipboard) {
    throw new Error("Clipboard API is not available in this browser.");
  }

  await navigator.clipboard.writeText(text);
}
