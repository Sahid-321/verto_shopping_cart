const Order = require('../models/Order');

class OrderController {
  // POST /api/checkout - Accepts cart data and processes checkout
  static checkout(req, res) {
    try {
      const { items } = req.body;
      
      // Create order using the Order model
      const order = Order.createOrder(items);

      res.json({
        success: true,
        message: 'Order placed successfully!',
        ...order.toJSON()
      });

    } catch (error) {
      console.error('Checkout error:', error.message);
      
      // Handle validation errors vs server errors
      const statusCode = error.message.includes('Invalid cart data') || 
                        error.message.includes('not found') ? 400 : 500;
      
      res.status(statusCode).json({
        success: false,
        message: error.message || 'Error processing checkout'
      });
    }
  }
}

module.exports = OrderController;
