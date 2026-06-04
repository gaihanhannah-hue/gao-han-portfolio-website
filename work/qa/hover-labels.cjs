const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  await page.goto("http://127.0.0.1:5173/", { waitUntil: "networkidle" });
  await page.locator('a[href="/work/self-introduction"]').first().hover();
  await page.screenshot({ path: "work/qa/home-hover-reading.png", fullPage: true });
  await page.locator('a[href="/work/life-hobbies"]').first().hover();
  await page.screenshot({ path: "work/qa/home-hover-guitar.png", fullPage: true });
  await page.locator('a[href="/work/robotics"]').hover();
  await page.screenshot({ path: "work/qa/home-hover-robotics.png", fullPage: true });
  await page.locator('a[href="/work/coding"]').hover();
  await page.screenshot({ path: "work/qa/home-hover-coding.png", fullPage: true });
  await browser.close();
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
