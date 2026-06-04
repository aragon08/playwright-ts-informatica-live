import {test, expect} from '@playwright/test';

test.describe('Pruebas de  login de facebook', () => {
    test.beforeEach(async ({page}) => {
        await page.goto('https://www.facebook.com');
    });

    test('Deberia iniciar sesion con credenciales validas', async ({page}) => {
        await page.fill('#email', 'tu_correo_electronico');
        await page.fill('#pass', 'tu_contraseña');
        await page.click('button[name="login"]');
        await expect(page).toHaveURL('https://www.facebook.com/');
    });

    test("Deberia mostrar error con credenciales invalidas", async ({ page }) => {
      await page.fill("#email", "tu_correo_electronico");
      await page.fill("#pass", "tu_contraseña_incorrecta");
      await page.click('button[name="login"]');
      const errorLocator = await page.locator("#error_box");
      expect(await errorLocator.isVisible()).toBeTruthy();
    });
});