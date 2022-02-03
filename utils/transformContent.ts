export default function transformContent(content: (string | number)[][]) {
  for (let j = 0; j < content.length; j++) {
    const values = content[j];
    for (let i = 1; i < values.length; i++) {
      content[j][i] = Number(values[i]);
    }
  }
  console.log(content);
  return content;
}
