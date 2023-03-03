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

    // Navigate to one page
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    
    // Create variable to store locators and create aliases
    const userName = page.locator('#username');
    const signIn = page.locator("#signInBtn");
    const cardTitles = page.locator(".card-body a");
    const blinkLocator = page.locator("[href*='documents-request']");
    

    // Typing user
    await userName.type("rahulshettyacademys");
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
    await userName.fill("rahulshettyacademy");


    // Validate if class has the correct Attribute
    await expect(blinkLocator).toHaveAttribute("class","blinkingText");

    await Promise.all(
        [
            // That will wait that a navigation page after some action
            page.waitForNavigation(),
            // Click will init de navigation
            signIn.click(),
        ]
    );


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
test.skip('Page Google', async ({ page })=> 
{
    // PlayWright code here

    await page.goto("https://google.com");

    // Check title - get / assertion
    console.log(page.title());
    await expect(page).toHaveTitle("Google");


    // css, XPATH
    await page.locator(".gLFyf").type("Testando Locators");
    
    await page.locator("xpath=//html/body/div[1]/div[3]/form/div[1]/div[1]/div[4]/center/input[1]").click();
});

test('UI Controls', async ({ page })=> 
{
    await page.goto("https://rahulshettyacademy.com/client");
    const registerBtn = page.locator(".btn1");
    const userName = page.locator("#userEmail");
    const password = page.locator("#userPassword");
    const dropdown = page.locator(".custom-select");
    const radioBtn = page.locator(".mt-3.ng-valid");
    const checkBox = page.locator("input[type='checkbox']");

    await registerBtn.click()

    // Will select the option in a dropdown, put the value option from HTML here in this method
    await dropdown.selectOption("3: Engineer");

    // Open playwright inspector and pause the tests, so you can see the results
    // await page.pause();


    //Radio Buttons

    //Select First option
    await page.locator(".mt-3.ng-valid").first().click();
    // await page.pause();

    // Select last option
    await radioBtn.last().click();
    

    // Select a middle option by index
    await radioBtn.nth(0).click();

    // After click radio button option, create an assertion to make sure that's already selected
    // Assertion
    expect(radioBtn.nth(0)).toBeChecked();
    //Console validation
    console.log("Male? " + await radioBtn.nth(0).isChecked());

    //Checkbox
    await checkBox.click();

    // Await before expect, because the ActionPerformed "toBeChecked" is out of scope of expected, it's a global scope
    await expect(checkBox).toBeChecked();

    // Uncheck
    await checkBox.uncheck();
    console.log("Checked? " + await checkBox.isChecked());
    // Assertion
    // Here, await is inside expect, because the ActionPerformed "isChecked" is inside the scope of expect 
    expect(await checkBox.isChecked()).toBeFalsy();
    

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



