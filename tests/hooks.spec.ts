import {test, expect} from '@playwright/test';

let page;

test.describe('Ejemplo de Hooks en PW', () => {
  //ejecutar una sola vez antes de todas las pruebas
  test.beforeAll(async ({ browser }) => {
    console.log("Configurando entorno antes de las pruebas");
    const context = await browser.newContext();
    page = await context.newPage();
  });

  //se ejecuta antes de cada prueba
  test.beforeEach(async () => {
    console.log("Configurando entorno antes de cada pruebas");
    await page.goto("https://example.com");
  });

  //Prueba 1
  test("Validar titulo de la pagina", async () => {
    await expect(page).toHaveTitle("Example Domain");
  });

  //Prueba 2
  test("Validar el enlace de la pagina", async () => {
    const link = await page.locator("a");
    await expect(link).toHaveText("Learn more");
  });

  //Usar afterEach se ejecuta despues de cada prueba
  test.afterEach(async () => {
    console.log("Limpiando entorno despues de cada prueba");
  });

  //Usar afterAll se ejecuta despues de todas las pruebas
  test.afterAll(async () => {
    console.log("Cerrando recursos despues de todas las pruebas");
    await page.close();
  });

});