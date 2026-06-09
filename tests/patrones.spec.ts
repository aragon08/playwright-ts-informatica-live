import {Page} from '@playwright/test';

export class LoginPage {
    private page: Page;
    constructor(page: Page) {
        this.page = page;
     }

     async navigate(){
        await this.page.goto('https://www.facebook.com');
     }

     async login(username: string, password: string){
        await this.page.fill('#email', username);
        await this.page.fill('#pass', password);
        await this.page.click('button[name="login"]');
    }

    async isErrorVisible(): Promise<boolean> {
        const errorLocator = await this.page.locator("#error_box");
        return await errorLocator.isVisible();
    }


}
