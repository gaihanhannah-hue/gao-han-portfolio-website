const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  await page.goto("http://127.0.0.1:5173/", { waitUntil: "networkidle" });
  await page.locator(".hotspot-shape-reading").hover();
  await page.screenshot({ path: "work/qa/home-hover.png", fullPage: false });
  await page.getByRole("button", { name: "中文" }).click();
  console.log("langAfterClick", await page.evaluate(() => document.documentElement.lang));
  await page.screenshot({ path: "work/qa/home-zh.png", fullPage: false });
  await browser.close();
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
