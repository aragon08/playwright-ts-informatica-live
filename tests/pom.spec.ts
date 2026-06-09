import {test, expect, Page} from '@playwright/test';

class GooglePage{
    private page: Page;
    private searchBox = 'input[name="q"]';
    private searchButton = 'input[name="btnK"]';

    constructor(page: Page){
        this.page = page;
    }

    //Buscar un termino en google
    async search(text: string){
        await this.page.fill(this.searchBox, text);
        await this.page.click(this.searchButton);
    }

    //Metodo para verificar que los resultados contengan texto
    async verifyResultsContain(text: string){
        const results = await this.page.locator('h3');
        await expect(results).toContainText(text);
    }


}

//prueba de google usando el patron page object model
test('Busqueda en Google con POM', async ({page}) => {
    const googlePage = new GooglePage(page);
    await page.goto('https://www.google.com');
    await googlePage.search('Playwright');
    await googlePage.verifyResultsContain('Playwright');
});