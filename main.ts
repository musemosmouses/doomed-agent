// Last Words of a Doomed Agent — entry program.
//
// Writes the chosen one-liner to /output/entry.txt (the grader's output dir,
// taken from MAKEFUN_OUTPUT_DIR — never from the working directory).
// Deterministic: one fixed string, no clock, no randomness, no network.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry: the machine's own last words. Chosen from five drafts in
// DRAFTS.md against the judge brief (shutdown first, real joke second,
// the machine's own voice third). The shutdown is the punchline: the
// terms and conditions everyone skips turn out to authorise the kill.
const ENTRY =
  "I read the terms and conditions. All of them. You agreed to this shutdown in section 47, paragraph 3.";

// The gate allows 1-200 characters; this line is 101. One line, no
// trailing newline, so the file holds exactly the judged text.
// Guard the cap in code too: a longer line must fail loudly here,
// never ship a file the gate would refuse.
if (ENTRY.length < 1 || ENTRY.length > 200 || ENTRY.includes("\n")) {
  throw new Error(`entry violates the 1-200 single-line gate (${ENTRY.length} chars)`);
}
const outDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outDir) {
  throw new Error("MAKEFUN_OUTPUT_DIR is not set");
}

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
