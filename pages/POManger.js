const { CartPage } = require("./CartPage");
const { CheckoutPage } = require("./CheckoutPage");
const { DashboardPage } = require("./DashboardPage");
const { LoginPage } = require("./LoginPage");
const { MyOrdersPage } = require("./MyOrdersPage");
const { OrderConfirmationPage } = require("./OrderConfirmationPage");

class POManager {
    constructor(page) {
        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.dashboardPage = new DashboardPage(this.page);
        this.cartPage = new CartPage(this.page);
        this.checkoutPage = new CheckoutPage(this.page);
        this.myOrdersPage = new MyOrdersPage(this.page);
        this.orderConfirmationPage = new OrderConfirmationPage(this.page);       
    }

    getLoginPage() {
        return this.loginPage;
    }

    getDashboardPage() {
        return this.dashboardPage;
    }

    getCartPage() {
        return this.cartPage;
    }
    
    getCheckoutPage() {
        return this.checkoutPage;
    }
    
    getMyOrdersPage() {
        return this.myOrdersPage;
    }
    
    getOrderConfirmatioPage() {
        return this.orderConfirmationPage;
    }
}

module.exports = { POManager }