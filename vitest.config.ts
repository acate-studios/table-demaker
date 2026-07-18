/// <reference types="vitest" />
import { configDefaults, defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    tsconfigPaths: true,
  },
  test: {
    exclude: [...configDefaults.exclude],
    include: ["lib/**/*.{test,spec}.{js,ts,jsx,tsx}"],
    globals: true,
    environment: "happy-dom",
    setupFiles: "./test/setup.ts",
    mockReset: true,
  },
});
