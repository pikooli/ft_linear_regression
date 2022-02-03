import transformContent from "./transformContent";
const errorMsg = (i: number) => `Error : not good value in file line ${i + 1}`;

function isNumeric(value: string) {
  return /^-?\d+$/.test(value);
}
export default function checkContent(content?: string[][]) {
  if (!content) return `not good value in file`;
  for (let i = 0; i < content.length; i++) {
    const values = content[i];
    for (let j = 0; j < values.length; j++) {
      if (!values[j]) {
        return errorMsg(j);
      }
      if (j !== 0) {
        if (!isNumeric(values[j])) {
          return errorMsg(j);
        }
      }
    }
  }
  return transformContent(content);
}
