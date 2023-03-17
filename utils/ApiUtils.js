class ApiUtils {

    // Initialize Constructor
    constructor(apiContext, loginPayload) {
        this.apiContext = apiContext;
        this.loginPayload = loginPayload;
    }


    
    async getToken() {
        // Send a post request to receive the token response
        const loginResponse = await this.apiContext.post(
            "https://rahulshettyacademy.com/api/ecom/auth/login", 
            {
                data: this.loginPayload
            }
        );

        // Convert to JSON
        const loginResponseJSON = await loginResponse.json();

        // Extract token from JSON
        const token = loginResponseJSON.token;
        console.log(token);

        return token;
    };


    // Create Order
    async createOrder(orderPayload) {
        let response = {};

        // Pass token to object
        response.token = await this.getToken()

        // Post request to create an order
        const orderResponse = await this.apiContext.post(
            "https://rahulshettyacademy.com/api/ecom/order/create-order",
            {
                data: orderPayload,
                headers: {
                    'Authorization': response.token,
                    'Content-Type': 'application/json'
                }
            }
        );
        
        // Convert to JSON
        const orderResponseJSON = await orderResponse.json();
        console.log(orderResponseJSON);

        // Get OrderID
        const orderID = orderResponseJSON.orders[0];

        // Pass orderID to object
        response.orderID = orderID;
        

        return response;
    };
}


// Make this class global
module.exports = {ApiUtils};