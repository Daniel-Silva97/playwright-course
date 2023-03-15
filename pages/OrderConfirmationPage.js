const { expect } = require('@playwright/test');

class OrderConfirmationPage {
    constructor(page) {
        this.page = page;
        this.thanksText = page.locator(".hero-primary");
        this.orderId = page.locator(".em-spacer-1 .ng-star-inserted");
        this.myOrders = page.locator("label[routerlink*='myorders']");
        
    }

    async checkOrderReview(thanksText) {
        await expect(this.thanksText).toHaveText(thanksText);
    }

    async goToMyorders() {        
        await this.myOrders.click();
    }

    async getOrderId() {
        return await this.orderId.textContent();
    }
}

module.exports = { OrderConfirmationPage }