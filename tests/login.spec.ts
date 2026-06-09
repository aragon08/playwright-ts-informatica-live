import {test, expect} from '@playwright/test';
import {LoginPage} from './patrones.spec';

test('Login de Facebook', async({page}) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login('test@example.com', 'password');
});