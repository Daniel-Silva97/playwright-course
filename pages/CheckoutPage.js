const { expect } = require('@playwright/test');

class CheckoutPage {
    constructor(page) {
        this.page = page;
        this.countryInput = page.locator("[placeholder*='Country']"); 
        this.dropdown = page.locator(".ta-results");
        this.dropdownOptions = this.dropdown.locator("button");  
        this.usernameInput = page.locator(".user__name label[type='text']");
        this.placeOrder = page.locator(".action__submit")
    }

    async verifyCountryAndSelect(countryCode, countryName) {
        await this.countryInput.type(countryCode, {delay:100});

        await this.dropdown.waitFor();
        const options = await this.dropdownOptions.count();
    
        for(let i = 0; i < options; i++) {
            const text = await this.dropdownOptions.nth(i).textContent();
            if (text.trim() === countryName) {
                await this.dropdownOptions.nth(i).click();
                break;
            }
        }
    }

    async verifyEmail(username) {
        await expect(this.usernameInput).toHaveText(username);
    }

    async submitOrder() {
        await this.placeOrder.click();
    }
}

module.exports = { CheckoutPage }