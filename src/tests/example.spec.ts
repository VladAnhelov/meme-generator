import { test, expect } from "@playwright/test";
import { MemeMainLocators } from "./MemeMainLocators.comp.ts";
import fs from "fs";
import path from "path";

test("I check title ", async ({ page }) => {
  await page.goto("https://memebulance.netlify.app/", { timeout: 60000 }); // 60 секунд
  await page.waitForSelector("body");
  const title = await page.title();
  expect(title).toBe("Memebulance");
});

test("I check top and button field input", async ({ page }) => {
  const locators = new MemeMainLocators();
  await page.goto("https://memebulance.netlify.app/");

  await page.click(locators.topTextInputField);
  await page.fill(locators.topTextInputField, "Hello");
  expect(locators.topTextInputField).toBe("Hello");

  await page.click(locators.bottomInputField);
  await page.fill(locators.bottomInputField, "World");
  expect(locators.bottomInputField).toBe("World");

  // set download path to downloads folder
  const downloadDir = path.resolve(process.cwd(), "src/tests/downloads");

  // check if directory exists
  if (!fs.existsSync(downloadDir)) {
    fs.mkdirSync(downloadDir, { recursive: true });
  } else {
    console.log(`directory is not exist: ${downloadDir}`);
  }

  // start to download
  const [download] = await Promise.all([
    page.waitForEvent("download", { timeout: 10000 }).catch((error) => {
      console.error("download is not start:", error);
      throw error;
    }),
    page.click(locators.downloadMemeButton),
  ]);

  const suggestedFilename = download.suggestedFilename();
  const filePath = path.join(downloadDir, suggestedFilename);
  await download.saveAs(filePath);

  // check if file exists
  const fileExists = fs.existsSync(filePath);
  expect(fileExists).toBe(true);

  const stats = fs.statSync(filePath);
  expect(stats.size).toBeGreaterThan(0);
});
