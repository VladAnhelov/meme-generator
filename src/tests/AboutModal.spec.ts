import { test, expect } from "./fixtures";
import { AboutModalLocators } from "./AboutModalLocators.comp.ts";

const locators = new AboutModalLocators();
const name_text = "test Vlad";
const feedback_text = name_text;
const BASE_URL = "http://localhost:3000";

test.describe("About Modal", { tag: "@regression tests" }, () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
    await page.click(locators.about_button);
  });

  test("Accept Terms and Conditions", async ({ page }) => {
    const checkBoxItem = page.locator(locators.checkBox);
    await checkBoxItem.click();
    await expect(checkBoxItem).toBeChecked();
  });
});
