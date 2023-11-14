import { defineConfig } from "vitest/config";

process.env.INTEGRATION_TEST_MODE = "true";

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    environmentMatchGlobs: [["**/*.{test, spec}.ts", "jsdom"]],
    coverage: {
      enabled: true,
      provider: "v8",
      reporter: ["text", "json"],
    },
    setupFiles: ["./test-setup.ts"],
    testTimeout: 500000,
  },
});
