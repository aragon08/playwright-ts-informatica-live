//Screenplay pattern
//es un enfoque de diseño para pruebas automatizadas que se centra en describir el comportamiento del usuario en lugar de la implementación técnica
//orientado a objetos y se basa en la idea de que los usuarios interactúan con el sistema a través de tareas y preguntas
//introduce conceptos nuevos como Actor, Task, Question, etc
//se enfoca en describir el comportamiento del usuario en lugar de la implementación tecnica

//Ventajas sobre POM
//1. Mayor legibilidad: El patrón Screenplay se centra en describir el comportamiento del usuario, lo que hace que las pruebas sean más legibles y fáciles de entender para los no técnicos.
//2. Reutilización de código: El patrón Screenplay permite una mayor reutilización de código, ya que las tareas y preguntas pueden ser compartidas entre diferentes pruebas y actores.
//3. Mejor mantenimiento: Al centrarse en el comportamiento del usuario, el patrón Screenplay facilita el mantenimiento de las pruebas, ya que los cambios en la interfaz de usuario no afectan directamente a las tareas y preguntas.  
//4. Mayor flexibilidad: El patrón Screenplay permite una mayor flexibilidad en la forma en que se describen las pruebas, lo que facilita la adaptación a diferentes escenarios y casos de prueba.
//5. Modularidad: El patrón Screenplay promueve la modularidad en las pruebas, lo que facilita la organización y el mantenimiento del código de prueba a medida que el proyecto crece.

//Desventajas sobre POM
//1. Curva de aprendizaje: El patrón Screenplay puede tener una curva de aprendizaje más pronunciada para los equipos que están acostumbrados al patrón Page Object Model (POM).
//2. Mayor complejidad: El patrón Screenplay puede introducir una mayor complejidad en la estructura de las pruebas, lo que puede dificultar su implementación y mantenimiento para equipos con menos experiencia en diseño de pruebas. 

//Buscar una palabra en google y verificar sus resultados usando el patrón Screenplay
import {chromium, Browser, Page} from 'playwright';

export interface Task {
    perform(page?: Page): Promise<void>;
}

//Actors
class Actor {
    name: string;
    private page?: Page;

    constructor(name: string) {
        this.name = name;
    } 

    async attemptsTo(...tasks: Task[]) {
        for (const task of tasks) {
            await task.perform(this.page);
        }
    }

    setPage(page: Page) {
        this.page = page;
    }

}

//Tasks
class OpenBrowser implements Task {
    private url: string;
    private browser?: Browser;
    private page?: Page;

    constructor (url: string) {
        this.url = url;
    }

    static at(url:string): OpenBrowser {
        return new OpenBrowser(url);
    }

    async perform(): Promise<void> {
        this.browser = await chromium.launch({headless: false});
        const context = await this.browser.newContext();
        this.page = await context.newPage();
        await this.page.goto(this.url);
    }

    async close() {
        if (this.browser) {
            await this.browser.close();
        }   
    }

    getPage(): Page | undefined {
        return this.page;
    }
}

class SearchGoogle implements Task {
    private term: string;

    constructor(term: string){
        this.term = term;
    }

    static for(term: string): SearchGoogle {
        return new SearchGoogle(term);
    }

    async perform(page?: Page): Promise<void> {
        if (!page) {
            throw new Error("Page is not set for SearchGoogle task");
        }
        await page.fill('input[name="q"]', this.term);
        await page.click('input[name="btnK"]');
    }
}

//Verificar que los resultados de la busqueda contengan texto
class VerifySearchResults implements Task {
    static areDisplayed(): VerifySearchResults {
        return new VerifySearchResults();
    }

    async perform(page?: Page): Promise<boolean> {
        if (!page) throw new Error("Page is not set for VerifySearchResults task");
        
        const results = await page.$$('h3');
        
        return results.length > 0;
    }
}

(async () => {
    const actor = new Actor("Tester");

    const openBrowser = OpenBrowser.at("https://www.google.com");
    await openBrowser.perform();

    actor.setPage(openBrowser.getPage()!);

    const search = SearchGoogle.for("Playwright");
    await actor.attemptsTo(search);

    const verify = VerifySearchResults.areDisplayed();
    const resultsDisplayed = await verify.perform(openBrowser.getPage());

    console.log(`Resultados de búsqueda mostrados: ${resultsDisplayed}`);

    await openBrowser.close();

})