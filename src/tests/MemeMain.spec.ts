import { test, expect } from "./fixtures.ts";
import { MemeMainLocators } from "./MemeMainLocators.comp.ts";
import fs from "fs";
import path from "path";

const locators = new MemeMainLocators();
const BASE_URL = "https://memebulance.netlify.app/";
const EXPECTED_TITLE = "Memebulance";

test.describe("MemeMain", { tag: "@regression tests" }, () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
  });

  test("I check title", async ({ page }) => {
    const title = await page.title();
    expect(title).toBe(EXPECTED_TITLE);
  });

  test("I check top and bottom field input and download", async ({
    page,
    downloadDir,
  }) => {
    await page.click(locators.topTextInputField);
    await page.fill(locators.topTextInputField, "Hello");
    const checkTopInput = await page.inputValue(locators.topTextInputField);
    expect(checkTopInput).toBe("Hello");

    await page.click(locators.bottomInputField);
    await page.fill(locators.bottomInputField, "World");
    const checkBottomInput = await page.inputValue(locators.bottomInputField);
    expect(checkBottomInput).toBe("World");

    // start download
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
});
