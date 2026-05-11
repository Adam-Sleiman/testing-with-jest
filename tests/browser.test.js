const { Builder, By, until } = require('selenium-webdriver');
require('geckodriver');

// Här anger vi var testfilen ska hämtas. De konstiga replaceAll-funktionerna ersätter
// mellanslag med URL-säkra '%20' och backslash (\) på Windows med slash (/).
const fileUnderTest = 'file://' + __dirname.replaceAll(/ /g, '%20').replaceAll(/\\/g, '/') + '/../dist/index.html';
const defaultTimeout = 10000;
let driver;
jest.setTimeout(1000 * 60 * 5); // 5 minuter

// Det här körs innan vi kör testerna för att säkerställa att Firefox är igång
beforeAll(async () => {
console.log(fileUnderTest);
    driver = await new Builder().forBrowser('firefox').build();
    await driver.get(fileUnderTest);
});

// Allra sist avslutar vi Firefox igen
afterAll(async() => {
    await driver.quit();
}, defaultTimeout);

test('The stack should be empty in the beginning', async () => {
    let stack = await driver.findElement(By.id('top_of_stack')).getText();
    expect(stack).toEqual("n/a");
});

describe('Clicking "Pusha till stacken"', () => {
    it('should open a prompt box', async () => {
        let push = await driver.findElement(By.id('push'));
        await push.click();
        let alert = await driver.switchTo().alert();
        await alert.sendKeys("Bananer");
        await alert.accept();
    });
});

// Eget e2e-test för peek-funktionen
describe('Peek button test', () => {
    it('should display the top element when peek is clicked', async () => {
        // Pusha två värden
        let pushBtn = await driver.findElement(By.id('push'));
        
        // Första värdet
        await pushBtn.click();
        let alert = await driver.switchTo().alert();
        await alert.sendKeys("First");
        await alert.accept();
        
        // Andra värdet
        await pushBtn.click();
        alert = await driver.switchTo().alert();
        await alert.sendKeys("Second");
        await alert.accept();
        
        // Klicka på peek-knappen
        let peekBtn = await driver.findElement(By.id('peek'));
        await peekBtn.click();
        
        // Kontrollera att displayen visar det översta elementet (Second)
        let display = await driver.findElement(By.id('top_of_stack')).getText();
        expect(display).toBe("Second");
    });
});