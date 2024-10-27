import { test, expect } from "@playwright/test";
import { MemeMainLocators } from "./MemeMainLocators.comp.ts";
import fs from "fs";
import path from "path";

test("basic test", async ({ page }) => {
  await page.goto("https://memebulance.netlify.app/", { timeout: 60000 }); // 60 секунд
  await page.waitForSelector("body");
  const title = await page.title();
  expect(title).toBe("Memebulance");
});

test("test_buttons", async ({ page }) => {
  const locators = new MemeMainLocators();

  await page.goto("https://memebulance.netlify.app/");
  await page.click(locators.topTextButton);
  await page.fill(locators.topTextButton, "Hello");
  const textValue = await page.inputValue(locators.topTextButton);
  expect(textValue).toBe("Hello");

  const [download] = await Promise.all([
    page.waitForEvent("download"),
    page.click(locators.downloadMemeButton),
  ]);

  const suggestedFilename = download.suggestedFilename();
  const downloadsDir = path.resolve(__dirname, "src/tests/downloads");
  const filePath = path.join(downloadsDir, suggestedFilename);
  await download.saveAs(filePath);

  expect(fs.existsSync(filePath)).toBe(true);

  const stats = fs.statSync(filePath);
  expect(stats.size).toBeGreaterThan(0);
});
