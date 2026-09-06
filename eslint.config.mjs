import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Claude Code's own tooling (skills, agent config) — not site source.
    // Only relevant now that this config lives at the repo root instead of
    // nested under website/, where `.claude/` was previously out of scope.
    ".claude/**",
  ]),
]);

export default eslintConfig;
