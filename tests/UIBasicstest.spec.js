// Import annotation with all playwright jobs
const {test, expect} = require('@playwright/test');

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

    // Create variable to store locators and create aliases
    const userName = page.locator('#username');
    const signIn = page.locator("#signInBtn");
    const cardTitles = page.locator(".card-body a");


    // Navigate to one page
    await page.goto("https://sso.teachable.com/secure/9521/identity/login/password");

    // Typing user
    await userName.type("rahulshetty");
    // Typing password
    await page.locator("[type='password']").type("learning");
    // Click login btn
    await signIn.click();
    // Extract message error if login is incorrect
    console.log(await page.locator("[style*='block']").textContent());
    // Expect that locator has the string 'Incorrect'
    await expect(page.locator("[style*='block']")).toContainText('Incorrect');

    // type - fill

    // Fill with empty string will clear the present data and set ""
    await userName.fill("");

    // Enter new data with fill
    await userName.fill("rahul")

    await signIn.click();


    // Access and return only the first result
    // nth(Array Index)
    await cardTitles.nth(0).textContent();
    // OR
    // Always return the first element
    await cardTitles.first().textContent();

    // grab all titles present in cardTitles
    const allTitles = await cardTitles.allTextContents();
    console.log(allTitles);
   

});



// page it's global and will use default browser instances
test.only('Page Playwright Test', async ({ page })=> 
{
    // PlayWright code here

    await page.goto("https://google.com");

    // Check title - get / assertion
    await console.log(page.title());
    await expect(page).toHaveTitle("Google");


    // css, XPATH
    await page.locator(".gLFyf").type("Testando Locators");
    
    await page.locator("xpath=//html/body/div[1]/div[3]/form/div[1]/div[1]/div[4]/center/input[1]").click();
});

// Execute in headless mode (Without open Browser) - npx playwright test
// Execute with browser openning - npx playwright test --headed


// test.only('Force execute this test only', async ({ page })=> { });

// Locators options
/*
If ID is present
CSS -> tagname#id (or) #id

If class attribute is present
CSS -> tagname.class (or) .class

Write css based on any Attribute
CSS -> [attribute='value']

Write CSS with traversing from Parent to child
CSS -> parenttagname >> childtagname

if needs to write the locator based on text
text=''
*/