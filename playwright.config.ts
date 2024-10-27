import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./src/tests",
  timeout: 30000,
  retries: 2,
  use: {
    headless: true,
    acceptDownloads: true,
    // Інші налаштування
  },
  // Додаткові опції конфігурації
});
