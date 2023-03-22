Feature: Ecommerce validations

  Scenario: Place the Order
    Given a login to Ecommerce application with "teste@playwright.com" and "Playwright@123"
    When Add "zara coat 3" to Cart
    Then Verify "zara coat 3" is displayed in the Cart Page
    When Enter valid details and Place the Order
    Then Verify order is present in the OrderHistory