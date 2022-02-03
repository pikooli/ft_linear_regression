import checkContent from "./checkContent";

export default function parseContent(content?: string) {
  if (!content) return;
  const contentSplit = content
    .split(/\n/)
    .map((e) => e.split(",").map((e) => e.trim()));
  const nb_elements = contentSplit[0].length;
  const result = [];
  for (let i = 0; i < contentSplit.length; i++) {
    for (let j = 0; j < nb_elements; j++) {
      if (result[j]) result[j].push(contentSplit[i][j]);
      else result[j] = [contentSplit[i][j]];
    }
  }
  return checkContent(result);
}
