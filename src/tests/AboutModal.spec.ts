import { test, expect } from "./fixtures";
import { AboutModalLocators } from "./AboutModalLocators.comp.ts";

const locators = new AboutModalLocators();
const name_text = "test Vlad";
const feedback_text = name_text;
let BASE_URL = "http://localhost:3000";

async function getBaseURL() {
  try {
    const response = await fetch(`${BASE_URL}`, { method: "HEAD" });
    if (response.ok) {
      console.log("Localhost is available, using BASE_URL:", BASE_URL);
      return BASE_URL;
    }
  } catch (error) {
    console.warn("Localhost not available, switching to Netlify URL.");
  }
  return "https://memebulance.netlify.app/";
}

test.describe("About Modal", { tag: "@regression tests" }, () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(await getBaseURL());
    await page.click(locators.about_button);
  });

  test("Accept Terms and Conditions", async ({ page }) => {
    const checkBoxItem = page.locator(locators.checkBox);
    await checkBoxItem.click();
    await expect(checkBoxItem).toBeChecked();
  });
});
