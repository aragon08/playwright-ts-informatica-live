// 1. iniciar un navegador
// 2. abre dos contextos
//     para google
//     para wikipedia
// 3. abrir una pagina dentro de cada contextos4. realizar operaciones basicas en ambas pagionas 

const { chromium } = require('playwright');

(async () => {
  // 1. iniciar un navegador
  const browser = await chromium.launch({ headless: false });

  //contexto 1 google
  const googleContext = await browser.newContext();
  const googlePage = await googleContext.newPage();
  await googlePage.goto('https://www.google.com');
  await googlePage.waitForTimeout(2000);
  console.log("Contexto 1 de google abierto");
  await googlePage.fill('textarea[name="q"]', 'playwright');
  await googlePage.press('textarea[name="q"]', 'Enter');
  await googlePage.waitForTimeout(5000);
  

  //contexto 2 wikipedia
  const wikipwdiaContext = await browser.newContext();
  const wikipediaPage = await wikipwdiaContext.newPage();
  await wikipediaPage.goto('https://www.wikipedia.org');
  await wikipediaPage.waitForTimeout(2000);
  console.log("Contexto 2 de wikipedia abierto");
  await wikipediaPage.fill('input[name="search"]', 'playwright');
  await wikipediaPage.press('input[name="search"]', 'Enter');
  await wikipediaPage.waitForTimeout(5000);
  await browser.close();
 
  console.log("navegadores cerrados exitosamente!!!");
  
})();

