import puppeteer from "puppeteer-core";
import fs from "fs";

const SCREENSHOTS_DIR = "/home/adarsh/.gemini/antigravity/brain/c69f908f-5ac6-4004-a75f-e019bf47c3ce/screenshots";
if (!fs.existsSync(SCREENSHOTS_DIR)) {
  fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
}

async function takeScreenshots() {
  const browser = await puppeteer.launch({
    executablePath: "/opt/google/chrome/chrome",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
    headless: true,
  });

  const page = await browser.newPage();

  // 1. News listing 1440px
  console.log("Capturing /news-events at 1440px...");
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto("http://localhost:3000/news-events/", { waitUntil: "domcontentloaded" });
  await new Promise((r) => setTimeout(r, 1200));
  await page.screenshot({ path: `${SCREENSHOTS_DIR}/news-listing-1440.png`, fullPage: false });

  // 2. News listing 390px (mobile)
  console.log("Capturing /news-events at 390px...");
  await page.setViewport({ width: 390, height: 844 });
  await page.goto("http://localhost:3000/news-events/", { waitUntil: "domcontentloaded" });
  await new Promise((r) => setTimeout(r, 1000));
  await page.screenshot({ path: `${SCREENSHOTS_DIR}/news-listing-390.png`, fullPage: false });

  // 3. News detail 1440px
  console.log("Capturing /news-events/hackrush-2026 at 1440px...");
  await page.setViewport({ width: 1440, height: 1000 });
  await page.goto("http://localhost:3000/news-events/hackrush-2026/", { waitUntil: "domcontentloaded" });
  await new Promise((r) => setTimeout(r, 1000));
  await page.screenshot({ path: `${SCREENSHOTS_DIR}/news-detail-1440.png`, fullPage: false });

  // 4. News detail 390px
  console.log("Capturing /news-events/hackrush-2026 at 390px...");
  await page.setViewport({ width: 390, height: 844 });
  await page.goto("http://localhost:3000/news-events/hackrush-2026/", { waitUntil: "domcontentloaded" });
  await new Promise((r) => setTimeout(r, 1000));
  await page.screenshot({ path: `${SCREENSHOTS_DIR}/news-detail-390.png`, fullPage: false });

  // 5. Admin News 1440px
  console.log("Capturing /admin/news at 1440px...");
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto("http://localhost:3000/admin/news/", { waitUntil: "domcontentloaded" });
  await new Promise((r) => setTimeout(r, 1200));
  await page.screenshot({ path: `${SCREENSHOTS_DIR}/admin-news-1440.png`, fullPage: false });

  await browser.close();
  console.log("Screenshots captured successfully!");
}

takeScreenshots().catch((err) => {
  console.error("Screenshot capture error:", err);
  process.exit(1);
});
