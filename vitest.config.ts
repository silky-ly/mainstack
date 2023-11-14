import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";
import react from "@vitejs/plugin-react";

process.env.INTEGRATION_TEST_MODE = "true";

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    globals: true,
    environment: "jsdom",
    environmentMatchGlobs: [["**/*.{test, spec}.{ts, tsx}", "jsdom"]],
    coverage: {
      enabled: true,
      provider: "v8",
      reporter: ["text", "json"],
    },
    browser: {
      enabled: false,
      name: "chromium",
    },
    logHeapUsage: true,
    passWithNoTests: true,
    setupFiles: ["./test-setup.ts"],
    testTimeout: 500000,
  },
});
