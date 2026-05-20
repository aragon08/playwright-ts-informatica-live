const {chromium} = require('playwright');
(async () => {
    const browser = await chromium.launch({headless: false});
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://www.facebook.com');
    //espera implicita
    page.setDefaultTimeout(5000);

    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('input[name="pass"]', 'password123');

    //espera explicita
    // await page.waitForNavigation();
    await Promise.all([
        page.waitForURL("https://www.facebook.com'"), 
        page.click('button[name="login"]')
    ]);

    //espera condicional
    await page.waitForSelector('text=¿Olvidaste tu contraseña?');

    await browser.close();


})();