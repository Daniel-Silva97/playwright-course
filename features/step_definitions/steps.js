const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');


Given('a login to Ecommerce application with {string} and {string}', {timeout: 100*1000}, async function (username, password) {
    // Generate browser

    const loginPage = this.poManager.getLoginPage();

    await loginPage.goTo();
    await loginPage.validLogin(username, password);
});

When('Add {string} to Cart', async function (productName) {
    const dashboardPage = this.poManager.getDashboardPage();
    await dashboardPage.searchProductAddCart(productName);
    await dashboardPage.navigateToCart();
 });

Then('Verify {string} is displayed in the Cart Page', async function (productName) {
    const cartPage = this.poManager.getCartPage();
    await cartPage.verifyProductIsDisplayed(productName);
    await cartPage.checkOut();
});

When('Enter valid details and Place the Order', async function () {
    const checkoutPage = this.poManager.getCheckoutPage();
    await checkoutPage.verifyCountryAndSelect("Ind", "India");
    await checkoutPage.verifyEmail("teste@playwright.com");
    await checkoutPage.submitOrder();
    this.orderConfirmationPage = this.poManager.getOrderConfirmatioPage();
    await this.orderConfirmationPage.checkOrderReview(" Thankyou for the order. ");
    this.orderId = await this.orderConfirmationPage.getOrderId();
    console.log(this.orderId);
});

Then('Verify order is present in the OrderHistory', async function () {
    await this.orderConfirmationPage.goToMyorders();
    const myOrdersPage = this.poManager.getMyOrdersPage()
    await myOrdersPage.selectOrder(this.orderId);
    expect(this.orderId.includes(await myOrdersPage.getOrderId())).toBeTruthy();
});
