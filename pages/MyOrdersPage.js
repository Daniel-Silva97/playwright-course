class MyOrdersPage {
    constructor(page) {
        this.page = page;
        this.table = page.locator("tbody");
        this.rows = page.locator("tbody tr");
        this.orderDetailsId = page.locator(".col-text");
    }

    async selectOrder(orderId) {
        await this.table.waitFor();
    
        for( let i = 0; i < await this.rows.count(); i++) {
            const rowOrderId = await this.rows.nth(i).locator("th").textContent();
            
            if (orderId.includes(rowOrderId)) {
                await this.rows.nth(i).locator("button").first().click();
                break;
            }
        } 
    }

    async getOrderId() {
        return await this.orderDetailsId.textContent();
    }
}

module.exports = { MyOrdersPage }