const {chromium} = require('playwright');


(async () => {
    const browser = await chromium.launch({headless: false});
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://www.google.com');

    //seleccionar el cuadro de busqueda y escribir "playwright"
    await page.fill("#APjFqb", "documentacion playwright");
    //await page.fill('textarea[name="q"]', 'playwright');
    await page.press('#APjFqb', 'Enter');

    //esperar a que los resultados carguen

    await page.waitForSelector('h3');

    await page.click("text=Installation");

    await page.waitForTimeout(2000);

    await page.click('text= CLI');

    await page.waitForTimeout(2000);

    await browser.close();

})();