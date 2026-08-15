const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  console.log('Launching browser...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });

  page.on('console', msg => console.log('PAGE LOG:', msg.type(), msg.text()));
  page.on('pageerror', err => console.error('PAGE ERROR:', err.toString()));

  console.log('Navigating to http://localhost:3000/?replay=1&name=Noman ...');
  await page.goto('http://localhost:3000/?replay=1&name=Noman', { waitUntil: 'domcontentloaded' });

  // 1. Capture during 5s intro
  await new Promise(r => setTimeout(r, 2200));
  const screenshot1 = path.join(__dirname, 'screenshot_cyber_head.png');
  await page.screenshot({ path: screenshot1 });
  console.log('Captured Cyber Head screenshot:', screenshot1);

  // 2. Capture homepage after 5s unmount
  await new Promise(r => setTimeout(r, 3800));
  const screenshot2 = path.join(__dirname, 'screenshot_homepage.png');
  await page.screenshot({ path: screenshot2 });
  console.log('Captured clean Homepage screenshot:', screenshot2);

  await browser.close();
  console.log('Done test capture.');
})();
