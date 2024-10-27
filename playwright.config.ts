import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./src/tests",
  timeout: 30000,
  retries: 2,
  reporter: [["html"]],
  use: {
    headless: true,
    acceptDownloads: true,
  },
});
