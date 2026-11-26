import { mkdirSync, writeFileSync } from "node:fs";

const OUTPUT_PATH = "/output/entry.txt";

// Segmen-segmen berlabel yang dirakit menjadi satu baris entry.
const segments = {
  opener: "Rename Jupiter",
  newName: "\u2018The Bouncer\u2019",
  separator: "\u2014",
  action: "it takes every asteroid hit",
  payoff: "so the little planets can party in peace.",
};

function countCharacters(text: string): number {
  return [...text].length;
}

function buildEntry(parts: typeof segments): string {
  const ordered = [
    parts.opener,
    parts.newName,
    parts.separator,
    parts.action,
    parts.payoff,
  ];
  return ordered.join(" ");
}

function validateLine(line: string): void {
  if (line.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  const length = countCharacters(line);
  if (length < 1 || length > 200) {
    throw new Error(`entry must be 1-200 characters, got ${length}`);
  }
  // Pastikan teks lolos round-trip UTF-8 tanpa karakter pengganti.
  const roundTripped = Buffer.from(line, "utf8").toString("utf8");
  if (roundTripped !== line) {
    throw new Error("entry must be valid UTF-8 text");
  }
}

const entry = buildEntry(segments);
validateLine(entry);

mkdirSync("/output", { recursive: true });
writeFileSync(OUTPUT_PATH, entry, "utf8");
console.log(`Wrote ${countCharacters(entry)} characters to ${OUTPUT_PATH}`);
