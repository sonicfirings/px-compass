import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("keeps the PX Compass product content and metadata", async () => {
  const [page, layout] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
  ]);

  assert.match(layout, /PX Compass/);
  assert.match(page, /Find your way/);
  assert.match(page, /Verify Quality/);
  assert.match(page, /independent community-built gateway/i);
  assert.match(page, /prismax-lockup-px\.svg/);
  assert.doesNotMatch(page, /codex-preview/);
});
