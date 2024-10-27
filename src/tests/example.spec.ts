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
  console.log("Перейшли на сторінку.");

  await page.click(locators.topTextButton);
  console.log("Клацнули на кнопку введення тексту.");

  await page.fill(locators.topTextButton, "Hello");
  console.log("Ввели текст 'Hello'.");

  const textValue = await page.inputValue(locators.topTextButton);
  console.log(`Значення тексту: ${textValue}`);
  expect(textValue).toBe("Hello");
  console.log("Перевірили, що текст введено правильно.");

  // Встановлюємо шлях до директорії завантажень
  const downloadDir = path.resolve(process.cwd(), "src/tests/downloads");
  console.log("Директорія завантажень:", downloadDir);

  // Переконуємося, що директорія завантажень існує
  if (!fs.existsSync(downloadDir)) {
    fs.mkdirSync(downloadDir, { recursive: true });
    console.log(`Директорію створено: ${downloadDir}`);
  } else {
    console.log(`Директорія вже існує: ${downloadDir}`);
  }

  // Починаємо чекати на завантаження
  console.log("Чекаємо на початок завантаження...");
  const [download] = await Promise.all([
    page.waitForEvent("download", { timeout: 10000 }).catch((error) => {
      console.error("Завантаження не розпочалося:", error);
      throw error;
    }),
    page.click(locators.downloadMemeButton),
  ]);
  console.log("Завантаження розпочато.");

  const suggestedFilename = download.suggestedFilename();
  console.log(`Запропонована назва файлу: ${suggestedFilename}`);

  const filePath = path.join(downloadDir, suggestedFilename);
  console.log(`Шлях до збереження файлу: ${filePath}`);

  await download.saveAs(filePath);
  console.log(`Файл збережено за шляхом: ${filePath}`);

  await page.screenshot({ path: "screenshot.png" });
  console.log("Скріншот збережено.");

  // Перевіряємо, чи файл існує
  const fileExists = fs.existsSync(filePath);
  console.log(`Файл існує: ${fileExists}`);
  expect(fileExists).toBe(true);

  const stats = fs.statSync(filePath);
  console.log(`Розмір файлу: ${stats.size} байт`);
  expect(stats.size).toBeGreaterThan(0);
});
