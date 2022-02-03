import fs from "fs";

export default function readFile(path?: string) {
  if (!path) return;
  return fs.readFileSync(path, "utf8");
}
