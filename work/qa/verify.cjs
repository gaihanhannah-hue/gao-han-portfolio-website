const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  const slugs = ["robotics", "agents", "pid-control", "coding", "life-hobbies"];

  await page.goto("http://127.0.0.1:5173/", { waitUntil: "networkidle" });
  await page.screenshot({ path: "work/qa/home-desktop.png", fullPage: true });

  for (const slug of slugs) {
    await page.goto("http://127.0.0.1:5173/", { waitUntil: "networkidle" });
    await page.locator(`a[href="/work/${slug}"]`).first().click();
    await page.waitForURL(`**/work/${slug}`);
    await page.waitForTimeout(120);
    console.log(slug, await page.locator(".detail-copy h1").textContent());
  }

  await page.getByRole("button", { name: "中文" }).click();
  await page.screenshot({ path: "work/qa/detail-desktop.png", fullPage: true });

  const mobile = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true });
  await mobile.goto("http://127.0.0.1:5173/", { waitUntil: "networkidle" });
  await mobile.screenshot({ path: "work/qa/home-mobile.png", fullPage: true });

  await browser.close();
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
