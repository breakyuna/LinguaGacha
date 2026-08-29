import { afterEach } from "vitest";
import fs from "node:fs";

(
  globalThis as typeof globalThis & {
    IS_REACT_ACT_ENVIRONMENT?: boolean;
  }
).IS_REACT_ACT_ENVIRONMENT = true;

afterEach(() => {
  if (typeof document === "undefined") {
    return;
  }
  document.body.innerHTML = "";
});

(fs as any).mkdtempDisposableSync = function (prefix: string) {
  const dir = fs.mkdtempSync(prefix);
  return {
    [Symbol.dispose]: () => {
      try {
        fs.rmSync(dir, { recursive: true, force: true });
      } catch (e) {
        // ignore
      }
    },
    toString: () => dir,
    valueOf: () => dir,
    path: dir, // Add path property specifically for compatibility where temp_dir.path is used
  };
};
