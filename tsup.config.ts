import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],

  // you are running on Node, not browser
  platform: "node",
  target: "node22",

  format: ["esm"],

  // single file bundle (what you already see)
  splitting: false,

  // 👇 this is what you were missing
  sourcemap: true,

  clean: true,
  esbuildOptions(options) {
    options.sourceRoot = process.cwd();
    options.sourcesContent = true;
  }
});