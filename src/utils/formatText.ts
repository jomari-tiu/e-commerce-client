export function toLabel(text: string) {
  return text
    .replace(/([A-Z])/g, " $1") // add space before capitals
    .replace(/^./, (c) => c.toUpperCase()); // capitalize first letter
}
