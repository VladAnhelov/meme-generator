import { test as baseTest, expect } from "@playwright/test";
import fs from "fs";
import path from "path";

type TestFixtures = {
  downloadDir: string;
};

const test = baseTest.extend<TestFixtures>({
  downloadDir: async ({}, use) => {
    // set download path to downloads folder
    const downloadDir = path.resolve(process.cwd(), "src/tests/downloads");

    // check if directory exists
    if (!fs.existsSync(downloadDir)) {
      fs.mkdirSync(downloadDir, { recursive: true });
    } else {
      console.log(`directory is not exist: ${downloadDir}`);
    }

    // give fixture downloadDir for use in test
    await use(downloadDir);
  },
});

export { test, expect };
