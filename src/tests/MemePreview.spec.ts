import { test, expect } from "./fixtures";
import { MemeMainLocators } from "./MemeMainLocators.comp.ts";

const locators = new MemeMainLocators();
const BASE_URL = "https://memebulance.netlify.app/";

test.describe("MemePreview", { tag: "@smoke" }, () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
  });

  test("I click and check third meme", async ({ page }) => {
    const memeImages = page.locator(locators.memeImage);
    const countImage = await memeImages.count();
    expect(countImage).toBeGreaterThan(0);
    await memeImages.nth(2).click();
  });
});
