import {test, expect} from '@playwright/test';

test('Esta prueba se ejecutara', async ({page}) => {
    await page.goto('https://www.google.com');
    const title = await page.title();
    await expect(title).toBe('Google');
});

test('Esta es la prueba que no se ejecuta', async({page}) =>{
    await page.goto('https://example.com');
    await expect(page).toHaveTitle('Example Domain');
});

test.only("Esta prueba se ejecutara con only", async ({ page }) => {
  await page.goto("https://www.google.com");
  const title = await page.title();
  await expect(title).toBe("Google");
});

test.skip("Esta es la prueba que no se ejecuta con skip", async ({ page }) => {
  await page.goto("https://example.com");
  await expect(page).toHaveTitle("Example Domain");
});

test.fixme("Esta es la prueba que no se ejecuta con fixme", async ({ page }) => {
  await page.goto("https://example.com");
  await expect(page).toHaveTitle("Example Domain");
});

test.describe("Grupo de pruebas con etiquetas", () => {
    test("Prueba con etiqueta @smoke", async ({ page }) => {
        await page.goto("https://example.com");
        await expect(page).toHaveTitle("Example Domain");
    });

    test("Prueba con etiqueta @regression", async ({ page }) => {
        await page.goto("https://example.com");
        await expect(page).toHaveTitle("Example Domain");
    });
});

test.describe.serial("Grupo de pruebas seriales con etiquetas", () => {
    test("Prueba serial con etiqueta @smoke", async ({ page }) => {
        await page.goto("https://example.com");
        await expect(page).toHaveTitle("Example Domain");
    });

    test("Prueba serial con etiqueta @regression", async ({ page }) => {
        await page.goto("https://example.com");
        await expect(page).toHaveTitle("Example Domain");
    });


});
