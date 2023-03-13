const {test, expect} = require('@playwright/test')

test("Popup validations", async({page}) => {
    // Open a page
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    // Go to another page in the same browser
    // await page.goto("https://www.google.com/");
    // Back to previous page (<-)
    // await page.goBack(); 
    // Go to next page (->)
    // await page.goForward();

    await expect(page.locator("#displayed-text")).toBeVisible();

    await page.locator("#hide-textbox").click();

    await expect(page.locator("#displayed-text")).toBeHidden();


});