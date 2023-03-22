const {test, expect, request} = require("@playwright/test")
const { ApiUtils } = require("../utils/ApiUtils")

const loginPayload = {userEmail:"teste@playwright.com",userPassword:"Playwright@123"};
const orderPayload = {orders:[{country:"Brazil",productOrderedId:"6262e990e26b7e1a10e89bfa"}]};
let response;

// Execute one time before all tests cases
test.beforeAll( async() => {
    // Create a new context to do api request
    const apiContext = await request.newContext();

    const apiUtils = new ApiUtils(apiContext, loginPayload);
    // Get the order and token
    response = await apiUtils.createOrder(orderPayload);
});




// Execute before each test, with 3 tests, there will be 3 executions.
// test.beforeEach(() => {});




test('@API Place the order', async ({ page })=> {
    // Add to Aplication -> Local Storage the token extract from API request
    // JavaScript initial script
    page.addInitScript( value => {
        window.localStorage.setItem('token', value);
    }, response.token);



    await page.goto("https://rahulshettyacademy.com/client");
    // Go to My Orders
    await page.locator("button[routerlink*='myorders']").click();
    
    const rows = page.locator("tbody tr");

    await page.locator("tbody").waitFor();

    for( let i = 0; i < await rows.count(); i++) {
        const rowOrderId = await rows.nth(i).locator("th").textContent();
        // If the order exists here
        if (response.orderID.includes(rowOrderId)) {
            // Click in View Button
            await rows.nth(i).locator("button").first().click();
            break;
        }
    } 
    
    const orderDetailsId = await page.locator(".col-text").textContent();
    expect(response.orderID.includes(orderDetailsId)).toBeTruthy();
});