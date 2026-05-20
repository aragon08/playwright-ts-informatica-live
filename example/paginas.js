const {chromium} = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://www.google.com");
  console.log("Primera pagina de Google!!!");
await page.waitForTimeout(2000);

const page2 = await context.newPage();
  await page2.goto("https://www.wikipedia.org");  
  console.log("Segunda pagina de Wikipedia!!!");
await page.waitForTimeout(2000);

  console.log("Cambio de tab de Google");
  await page.bringToFront();
  await page.fill('textarea[name="q"]', "playwright");
    await page.press('textarea[name="q"]', 'Enter');

    await page.waitForTimeout(2000);

    console.log("Cambiando a la pagina de wikipedia");
    await page2.bringToFront();

     await page2.fill('input[name="search"]', "playwright");
     await page2.press('input[name="search"]', "Enter");
    
  
  await page.waitForTimeout(2000);

  

  await browser.close();

})();