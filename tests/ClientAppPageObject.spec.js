const {test, expect} = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { DashboardPage } = require('../pages/DashboardPage');
const { CartPage } = require('../pages/CartPage');
const { CheckoutPage } = require('../pages/CheckoutPage');
const { OrderConfirmationPage } = require('../pages/OrderConfirmationPage');
const { MyOrdersPage } = require('../pages/MyOrdersPage');



test.only('Browser Context-Validating Error Login', async ({ page })=> {
    const productName = 'adidas original';
    const username = "teste@playwright.com";
    const password = "Playwright@123";
    const countryCode = "Ind";
    const countryName = "India";
    const thanksText = " Thankyou for the order. ";

    // Login
    const loginPage = new LoginPage(page);
    await loginPage.goTo();
    await loginPage.validLogin(username, password);
   

    // Dashboard
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.searchProductAddCart(productName);
    await dashboardPage.navigateToCart();

    // Cart
    const cartPage = new CartPage(page);
    await cartPage.verifyProductIsDisplayed(productName);
    await cartPage.checkOut();

    // Checkout
    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.verifyCountryAndSelect(countryCode, countryName);
    await checkoutPage.verifyEmail(username);
    await checkoutPage.submitOrder();

    // Order Confirmation
    const orderConfirmationPage = new OrderConfirmationPage(page);
    await orderConfirmationPage.checkOrderReview(thanksText);
    const orderId = await orderConfirmationPage.getOrderId();
    console.log(orderId);
    await orderConfirmationPage.goToMyorders();
    
    // My Orders
    const myOrdersPage = new MyOrdersPage(page);
    await myOrdersPage.selectOrder(orderId);
    expect(orderId.includes(await myOrdersPage.getOrderId())).toBeTruthy();
});