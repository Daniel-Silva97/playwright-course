// Login UI -> Extract all the storage state in a .json

// Test browser -> .json, cart, order, order details, order history
const {test, expect} = require('@playwright/test');


let webContext;
const email = "teste@playwright.com";  

test.beforeAll ( async({browser}) => {

    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://rahulshettyacademy.com/client");

    const userName = page.locator("#userEmail");
    const password = page.locator("#userPassword");
    

    await userName.fill(email);
    await password.fill("Playwright@123");

    await page.locator("[value='Login']").click();
    await page.waitForLoadState('networkidle');

    // Capture all the data (SessionStorage, LocalStorage, Cookies, etc)
    // Will create a json file named state.json
    await context.storageState({path: 'state.json'});

    // Create a new context with all cookies, sessionStorage, localStorage saved
    webContext = await browser.newContext({storageState: 'state.json'});
});








// page it's global and will use default browser instances
test('Storage State Validation', async ()=> {
    // Using WebContext with the Storage State
    const page = await webContext.newPage();
    await page.goto("https://rahulshettyacademy.com/client");

    
    const products = page.locator(".card-body");
    const productName = 'adidas original';

    // allTextContents do not wait until the page is loaded
    const allTitles = await page.locator(".card-body b").allTextContents();
    console.log(allTitles);


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


    //Click checkout
    await page.locator("text=Checkout").click();

    // Typing in dropdown country, delay is to slow type in the page to load the suggestions in dropdown
    await page.locator("[placeholder*='Country']").type("ind", {delay:100});

    // wait for suggestions in dropdown show up
    const dropdown = page.locator(".ta-results");
    await dropdown.waitFor();

    // counting...
    const options = await dropdown.locator("button").count();

    for(let i = 0; i < options; i++) {
        const text = await dropdown.locator("button").nth(i).textContent();
        if (text.trim() === "India") {
            // click operation in right option
            await dropdown.locator("button").nth(i).click();
            break;
        }
    }

    // chech if email typed here equal our login email
    await expect(page.locator(".user__name label[type='text']")).toHaveText(email);

    // Click in place order
    await page.locator(".action__submit").click();

    // Check if the page contain this text
    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");

    // Allocating order ID without space and '|'
    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();


    // Go to My Orders
    await page.locator("label[routerlink*='myorders']").click();
    
    const rows = page.locator("tbody tr");

    await page.locator("tbody").waitFor();

    for( let i = 0; i < await rows.count(); i++) {
        const rowOrderId = await rows.nth(i).locator("th").textContent();
        // If the order exists here
        if (orderId.includes(rowOrderId)) {
            // Click in View Button
            await rows.nth(i).locator("button").first().click();
            break;
        }
    } 
    
    const orderDetailsId = await page.locator(".col-text").textContent();
    expect(orderId.includes(orderDetailsId)).toBeTruthy();
});


test('@API Test titles 2', async ()=> {
    // Using WebContext with the Storage State
    const page = await webContext.newPage();
    await page.goto("https://rahulshettyacademy.com/client");

    // allTextContents do not wait until the page is loaded
    const allTitles = await page.locator(".card-body b").allTextContents();
    console.log(allTitles);

});


/*
Dubugging API's in PlaWright

In package.json, update the session "scripts": {};

Inside, you put the command that run the file you wanna debug, for example:

"scripts": {
    "test": "npx playwright test tests/WebApiPart1.spec.js --headed"
}

After that put a breakpoint on VSCode in the line you want to debug

Press CTRL + Shift + A

Write Debug npm script and run
*/