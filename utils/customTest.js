const base = require('@playwright/test');

exports.customTest = base.test.extend(
    {
        testDataForOrder:
            {
                productName: "adidas original",
                username: "teste@playwright.com",
                password: "Playwright@123",
                countryCode: "Ind",
                countryName: "India",
                thanksText: " Thankyou for the order. "
            }
    }
)