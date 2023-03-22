export const copyTextToClipboard = (text) => {
  if (!navigator.clipboard) return;
  navigator.clipboard.writeText(text);
}