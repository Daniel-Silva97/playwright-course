const { expect } = require('@playwright/test');

class CartPage {
    constructor(page) {
        this.page = page;
        this.orderItens = page.locator("div li");
        this.checkout = page.locator("text=Checkout");
    }

    async verifyProductIsDisplayed(productName) {
        await this.orderItens.first().waitFor();
        const bool = this.productIsVisible(productName);
        expect(bool).toBeTruthy();
    }

    async productIsVisible(productName) {
        return await this.page.locator("h3:has-text('"+productName+"')").isVisible();
    }

    async checkOut() {
        await this.checkout.click();
    }
}

module.exports = { CartPage }