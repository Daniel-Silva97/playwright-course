const {test, expect} = require('@playwright/test');
const { POManager } = require("../pages/POManger");

// JSON -> String (stringfy) -> JS OBject (parse)
const dataSet = JSON.parse(JSON.stringify(require("../data/ClientAppPageObjectTestData.json")));

for(const data of dataSet) {
    test(`Data Array Test ${data.productName}`, async ({ page })=> {
        const poManager = new POManager(page);

        // Login
        const loginPage = poManager.getLoginPage();
        await loginPage.goTo();
        await loginPage.validLogin(data.username, data.password);
    

        // Dashboard
        const dashboardPage = poManager.getDashboardPage();
        await dashboardPage.searchProductAddCart(data.productName);
        await dashboardPage.navigateToCart();

        // Cart
        const cartPage = poManager.getCartPage();
        await cartPage.verifyProductIsDisplayed(data.productName);
        await cartPage.checkOut();

        // Checkout
        const checkoutPage = poManager.getCheckoutPage();
        await checkoutPage.verifyCountryAndSelect(data.countryCode, data.countryName);
        await checkoutPage.verifyEmail(data.username);
        await checkoutPage.submitOrder();

        // Order Confirmation
        const orderConfirmationPage = poManager.getOrderConfirmatioPage();
        await orderConfirmationPage.checkOrderReview(data.thanksText);
        const orderId = await orderConfirmationPage.getOrderId();
        console.log(orderId);
        await orderConfirmationPage.goToMyorders();
        
        // My Orders
        const myOrdersPage = poManager.getMyOrdersPage()
        await myOrdersPage.selectOrder(orderId);
        expect(orderId.includes(await myOrdersPage.getOrderId())).toBeTruthy();
    });
}