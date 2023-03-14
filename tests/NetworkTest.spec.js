const {test, expect, request} = require("@playwright/test")
const { ApiUtils } = require("./utils/ApiUtils")

const loginPayload = {userEmail:"teste@playwright.com",userPassword:"Playwright@123"};
const orderPayload = {orders:[{country:"Brazil",productOrderedId:"6262e990e26b7e1a10e89bfa"}]};
let fakePayloadOrders = {data: [], message: "No Orders"};
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




test('Fake response API', async ({ page })=> {
    // Add to Aplication -> Local Storage the token extract from API request
    // JavaScript initial script
    page.addInitScript( value => {
        window.localStorage.setItem('token', value);
    }, response.token);



    await page.goto("https://rahulshettyacademy.com/client");

    await page.route(
        "https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/6401f796568c3e9fb1276fa8", 
        async route => {
            // Get the response
            const response = await page.request.fetch(route.request());
            let body = JSON.stringify(fakePayloadOrders);

            // Send the response to browser
            route.fulfill({
                // Send response received in request
                response,
                // Update the body with our fake response
                body,
            });
            // Intercept the response - API Response -> Playwright{ Fake API Response } -> Browser -> Render the data on Frontend
            
        }
    );

    // Go to My Orders
    await page.locator("button[routerlink*='myorders']").click();

    // Solve the timeout problem for the error "apiRequestContext.fetch: Request context disposed"
    await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/6401f796568c3e9fb1276fa8");

    console.log(await page.locator(".mt-4").textContent());
});