const {test, expect} = require('@playwright/test');
const { POManager } = require("../pages/POManger");

// JSON -> String (stringfy) -> JS OBject (parse)
const dataSet = JSON.parse(JSON.stringify(require("../data/ClientAppPageObjectTestData.json")));


test('Browser Context-Validating Error Login', async ({ page })=> {
    const poManager = new POManager(page);

    // Login
    const loginPage = poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(dataSet.username, dataSet.password);
   

    // Dashboard
    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.searchProductAddCart(dataSet.productName);
    await dashboardPage.navigateToCart();

    // Cart
    const cartPage = poManager.getCartPage();
    await cartPage.verifyProductIsDisplayed(dataSet.productName);
    await cartPage.checkOut();

    // Checkout
    const checkoutPage = poManager.getCheckoutPage();
    await checkoutPage.verifyCountryAndSelect(dataSet.countryCode, dataSet.countryName);
    await checkoutPage.verifyEmail(dataSet.username);
    await checkoutPage.submitOrder();

    // Order Confirmation
    const orderConfirmationPage = poManager.getOrderConfirmatioPage();
    await orderConfirmationPage.checkOrderReview(dataSet.thanksText);
    const orderId = await orderConfirmationPage.getOrderId();
    console.log(orderId);
    await orderConfirmationPage.goToMyorders();
    
    // My Orders
    const myOrdersPage = poManager.getMyOrdersPage()
    await myOrdersPage.selectOrder(orderId);
    expect(orderId.includes(await myOrdersPage.getOrderId())).toBeTruthy();
});