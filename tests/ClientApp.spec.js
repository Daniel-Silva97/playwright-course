// Import annotation with all playwright jobs
const {test, expect} = require('@playwright/test');


// page it's global and will use default browser instances
test('Browser Context-Validating Error Login', async ({ page })=> {

    const userName = page.locator("#userEmail");
    const password = page.locator("#userPassword");



    await page.goto("https://rahulshettyacademy.com/client");
    
    await userName.fill("teste@playwright.com");
    await password.fill("Playwright@123");

    await page.locator("[value='Login']").click();

    // Wait until all the requests in Network option are made (API's requests)
    await page.waitForLoadState('networkidle');

    // allTextContents do not wait until the page is loaded
    const allTitles = await page.locator(".card-body b").allTextContents();
    console.log(allTitles);

});