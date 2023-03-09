// Import annotation with all playwright jobs
const {test, expect} = require('@playwright/test');


// page it's global and will use default browser instances
test.only('Browser Context-Validating Error Login', async ({ page })=> {


    await page.goto("https://rahulshettyacademy.com/client");

    const userName = page.locator("#userEmail");
    const password = page.locator("#userPassword");
    const products = page.locator(".card-body");
    const productName = 'adidas original';
   
    await userName.fill("teste@playwright.com");
    await password.fill("Playwright@123");

    await page.locator("[value='Login']").click();

    // Wait until all the requests in Network option are made (API's requests)
    await page.waitForLoadState('networkidle');

    // allTextContents do not wait until the page is loaded
    const allTitles = await page.locator(".card-body b").allTextContents();
    console.log(allTitles)


    //Getting total products
    const count = await products.count();

    for(let i = 0; i < count; i++) {
        // Conditional check if the text present in tag 'b' equals productName
        if (await products.nth(i).locator("b").textContent() === productName) {
            // Add to cart
            await products.nth(i).locator("text= Add To Cart").click();
            break;
        }
            
    }

    // click in cart
    await page.locator("[routerlink*='cart']").click();

    // waiting until the first li list load on the page before do the assertion
    await page.locator("div li").first().waitFor();

    //check if some tag h3 has the text adidas original
    const bool = await page.locator("h3:has-text('adidas original')").isVisible();
    //Assertion to see that's ok
    expect(bool).toBeTruthy();
    
});