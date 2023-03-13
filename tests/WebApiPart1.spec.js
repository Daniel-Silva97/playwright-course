const {test, expect, request} = require("@playwright/test")

const loginPayload = {userEmail:"teste@playwright.com",userPassword:"Playwright@123"};
const orderPayload = {orders:[{country:"Brazil",productOrderedId:"6262e990e26b7e1a10e89bfa"}]};
let token;
let orderID;

// Execute one time before all tests cases
test.beforeAll( async() => {
    // Create a new context to do api request
    const apiContext = await request.newContext();

    // Send a post request to receive the token response
    const loginResponse = await apiContext.post(
        "https://rahulshettyacademy.com/api/ecom/auth/login", 
        {
            data:loginPayload
        }
    );

    // Check if api response is success (200, 201, 202 ...)
    expect(loginResponse.ok()).toBeTruthy();


    // Convert to JSON
    const loginResponseJSON = await loginResponse.json();

    // Extract token from JSON
    token = loginResponseJSON.token;
    console.log(token);


    // 
    const orderResponse = await apiContext.post(
        "https://rahulshettyacademy.com/api/ecom/order/create-order",
        {
            data: orderPayload,
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        }
    );
    
    const orderResponseJSON = await orderResponse.json();
    console.log(orderResponseJSON);
    orderID = orderResponseJSON.orders[0];
    console.log(orderID);
});

// Execute before each test, with 3 tests, there will be 3 executions.
// test.beforeEach(() => {});

test.only('Place the order', async ({ page })=> {

    // Add to Aplication -> Local Storage the token extract from API request
    // JavaScript initial script
    page.addInitScript( value => {
        window.localStorage.setItem('token', value);
    }, token);

    await page.goto("https://rahulshettyacademy.com/client");

    // Go to My Orders
    await page.locator("button[routerlink*='myorders']").click();
    
    const rows = page.locator("tbody tr");

    await page.locator("tbody").waitFor();

    

    for( let i = 0; i < await rows.count(); i++) {
        const rowOrderId = await rows.nth(i).locator("th").textContent();
        // If the order exists here
        if (orderID.includes(rowOrderId)) {
            // Click in View Button
            await rows.nth(i).locator("button").first().click();
            break;
        }
    } 
    
    const orderDetailsId = await page.locator(".col-text").textContent();
    expect(orderID.includes(orderDetailsId)).toBeTruthy();
});