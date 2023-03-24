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



Given('a login to Ecommerce2 application with {string} and {string}', async function (username, password) {
    const userName = this.page.locator("#username");
    const signIn = this.page.locator("#signInBtn");

    await this.page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await userName.type(username);
    // Typing password
    await this.page.locator("[type='password']").type(password);
    // Click login btn
    await signIn.click();
  });

  Then('Verify Error message is displayed', async function () {
    console.log(await this.page.locator("[style*='block']").textContent());
    // Expect that locator has the string 'Incorrect'
    await expect(this.page.locator("[style*='block']")).toContainText('Incorrect');
  });