import { test, expect } from "@playwright/test";
import { MemeMainLocators } from "./MemeMainLocators.comp.ts";

test("basic test", async ({ page }) => {
  await page.goto("https://memebulance.netlify.app/", { timeout: 60000 }); // 60 секунд
  await page.waitForSelector("body");
  const title = await page.title();
  expect(title).toBe("Memebulance");
});

test("test_buttons", async ({ page }) => {
  const locators = new MemeMainLocators();
  await page.goto("https://memebulance.netlify.app/");
  await page.waitForSelector(locators.topTextButton);
  await page.click(locators.topTextButton);
  await page.fill(locators.topTextButton, "Hello");
  const textValue = await page.inputValue(locators.topTextButton);
  expect(textValue).toBe("Hello");
  // await page.click(locators.downloadMemeButton);
});
