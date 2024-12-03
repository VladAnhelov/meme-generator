import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./src/tests",
  timeout: 30000,
  retries: 2,
  reporter: [["html"], ["line"], ["allure-playwright"]],
  use: {
    headless: true,
    acceptDownloads: true,
    screenshot: "only-on-failure",
    trace: "on-first-retry",
  },
});
