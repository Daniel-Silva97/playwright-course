const { chromium } = require('playwright');
const { POManager } = require("../../pages/POManger");
const { Before, BeforeStep, AfterStep, After, Status } = require('@cucumber/cucumber');

// Execute Before scenario initialize
Before(async function () {
    const browser = await chromium.launch({
        headless: false
    });
    // Generate browser context
    const context = await browser.newContext();
    // Generate Page
    const page = await context.newPage();
    // Using page
    this.poManager = new POManager(page); // Global declaration
});

BeforeStep({tags: "@foo"}, function () {
    // This hook will be executed before all steps in a scenario with tag @foo
});
  
AfterStep(async function ({result}) {
    // This hook will be executed after all steps, and take a screenshot on step failure
    if (result.status === Status.FAILED) {
        await this.page.screenshot({path: 'screenshot.png'});
    }
});

After(function () {
    // Assuming this.driver is a selenium webdriver
    console.log("I'm the last executed");
});

