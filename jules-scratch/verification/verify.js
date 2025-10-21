const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:8000');
  await page.screenshot({ path: 'jules-scratch/verification/faq.png' });
  await browser.close();
})();
