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

    // Check if element is visible on page
    await expect(page.locator("#displayed-text")).toBeVisible();
    // Click button to hide element
    await page.locator("#hide-textbox").click();
    // Check if element is hidden
    await expect(page.locator("#displayed-text")).toBeHidden();

    
    // Handling with Java pop-ups

    // Waiting on event called dialog, thats the first argument, the second argument, 
    // we'll tell that if playwright clicks on Ok or Cancel button
    // Parameter dialog.accept() to OK, and dialog.dismiss() to cancel

    /*
    page.on(event, action)

    event -> dialog
    action -> Accept or Cancel
    */

    // OK, he will wait until the dialog appears, even if the action doesn't happen yet.
    page.on('dialog', dialog => dialog.accept());
    // Click after to see playwright waiting
    await page.locator("#confirmbtn").click();

    // Cancel
    // page.on('dialog', dialog => dialog.dismiss());


    // Mouse hover options
    await page.locator("#mousehover").hover();

    // Handling with frames
    const framePage =  page.frameLocator("#courses-iframe");

    // Locator has 2 elements matching, but only one is visible, we can use :visible 
    // to tell playwright that we want click in the visible one
    await framePage.locator("li a[href*='lifetime-access']:visible").click();

    // Check Text inside de Frame
    const textCheck = await framePage.locator(".text h2").textContent();
    console.log(textCheck.split(" ")[1]);
});