// Import annotation with all playwright jobs
const {test} = require('@playwright/test');

// ASYNC is required to tell javascript not to execute code asynchronously, without them, AWAIT not work
// Anonymous function created async ()=> {}
// browser comes from annotation test, no need to declare it, it's global fixtures
test('Browser Context Create Playwright Test', async ({ browser })=> 
{
    // PlayWright code here

    // Default
    // Browser - Create New Context without cookies or plugins
    const context = await browser.newContext();
    // Create a new page
    const page = await context.newPage();


    // Navigate to one page
    await page.goto("https://sso.teachable.com/secure/9521/identity/login/password");
});



// page it's global and will use default browser instances
test('Page Playwright Test', async ({ page })=> 
{
    // PlayWright code here

    await page.goto("https://sso.teachable.com/secure/9521/identity/login/password");
});