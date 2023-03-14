const {test, expect, request} = require("@playwright/test")
const { ApiUtils } = require("./utils/ApiUtils")


const loginPayload = {userEmail:"teste2@playwright.com",userPassword:"Teste@123"};
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




test('Security test, View other Users Orders', async ({ page })=> {
    // Add to Aplication -> Local Storage the token extract from API request
    // JavaScript initial script
    page.addInitScript( value => {
        window.localStorage.setItem('token', value);
    }, response.token);



    await page.goto("https://rahulshettyacademy.com/client");
    // Go to My Orders
    await page.locator("button[routerlink*='myorders']").click();

    // Change the URL of request to an order from other user
    await page.route(
        // URL user authorized
        "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=6410ac6c568c3e9fb1323b11",
        // route.continue() made the request normally, but if pass parameters, the default are changed
        route => route.continue({
            // Change to url from another user order (unathourized)
            url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=6410aeb2568c3e9fb1323e00'
        })
    );
    await page.locator("button:has-text('View')").first().click();
});