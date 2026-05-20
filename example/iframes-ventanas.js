const {chromium} = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://www.w3schools.com/tags/tryit.asp?filename=tryhtml_iframe");

  const iframeResult = await page.frameLocator("#iframeResult");
  console.log("entre al primer iframe");
  
  const inneriframe = iframeResult.frameLocator("iframe[title='W3Schools HTML Tutorial']");
console.log("entre al segundo iframe");
  const logo = inneriframe.locator("#w3-logo");
console.log("encontre el logo");
  try {
    await page.waitForTimeout(2000);
    console.log("El logo de w3schools es visible dentro del iframe!!!");
    
  } catch (error) {
    console.log("El logo no aparecio despues de 10 segundos");
  }
  await page.waitForTimeout(3000);

  await browser.close();

})();