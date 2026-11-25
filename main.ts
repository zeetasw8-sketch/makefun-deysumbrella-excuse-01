import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoDir = path.dirname(fileURLToPath(import.meta.url));
const linePath = path.join(repoDir, "line.txt");
const outputDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
const entryPath = path.join(outputDir, "entry.txt");

const text = fs.readFileSync(linePath, "utf8");

function validateText(text: string): void {
  if (text.length === 0) {
    process.stderr.write("line.txt is empty\n");
    process.exit(1);
  }

  if (text.length > 200) {
    process.stderr.write("line.txt exceeds 200 characters\n");
    process.exit(1);
  }
}

validateText(text);

fs.mkdirSync(outputDir, { recursive: true });
fs.writeFileSync(entryPath, text, "utf8");
