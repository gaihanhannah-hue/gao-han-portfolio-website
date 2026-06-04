const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  const entries = [
    { slug: "self-introduction", selector: ".sticker-self-introduction" },
    { slug: "self-introduction", selector: ".sticker-reading" },
    { slug: "life-hobbies", selector: ".sticker-guitar" },
    { slug: "robotics", selector: ".sticker-robotics" },
    { slug: "agents", selector: ".sticker-agents" },
    { slug: "pid-control", selector: ".sticker-pid" },
    { slug: "coding", selector: ".sticker-coding" },
  ];

  await page.goto("http://127.0.0.1:5173/", { waitUntil: "networkidle" });
  console.log("links", await page.locator('a[href^="/work/"]').count());
  await page.screenshot({ path: "work/qa/home-stickers-desktop.png", fullPage: true });

  for (const { slug, selector } of entries) {
    await page.goto("http://127.0.0.1:5173/", { waitUntil: "networkidle" });
    await page.locator(selector).click();
    await page.waitForURL(`**/work/${slug}`);
    console.log(slug, await page.locator(".detail-copy h1").textContent());
  }

  const mobile = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true });
  await mobile.goto("http://127.0.0.1:5173/", { waitUntil: "networkidle" });
  await mobile.screenshot({ path: "work/qa/home-stickers-mobile.png", fullPage: true });

  await browser.close();
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
