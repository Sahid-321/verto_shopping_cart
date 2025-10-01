const Product = require('./Product');

class Order {
  constructor(items) {
    this.id = `ORDER_${Date.now()}`;
    this.items = items;
    this.createdAt = new Date();
    this.total = this.calculateTotal();
  }

  calculateTotal() {
    return this.items.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
  }

  static createOrder(cartItems) {
    if (!cartItems || !Array.isArray(cartItems)) {
      throw new Error('Invalid cart data. Items array is required.');
    }

    const orderItems = cartItems.map(cartItem => {
      const product = Product.findById(cartItem.productId);
      if (!product) {
        throw new Error(`Product with ID ${cartItem.productId} not found`);
      }

      return {
        productId: product.id,
        productName: product.name,
        price: product.price,
        quantity: cartItem.quantity,
        subtotal: product.price * cartItem.quantity
      };
    });

    const order = new Order(orderItems);
    
    // Log order to console (simulating database save)
    this.logOrder(order);
    
    return order;
  }

  static logOrder(order) {
    console.log('=== NEW ORDER RECEIVED ===');
    console.log('Order ID:', order.id);
    console.log('Order Date:', order.createdAt.toISOString());
    console.log('Order Details:');
    order.items.forEach((item, index) => {
      console.log(`${index + 1}. ${item.productName} - Qty: ${item.quantity} - $${item.subtotal.toFixed(2)}`);
    });
    console.log('Total Amount: $' + order.total.toFixed(2));
    console.log('=========================');
  }

  toJSON() {
    return {
      orderId: this.id,
      total: this.total.toFixed(2),
      items: this.items,
      createdAt: this.createdAt
    };
  }
}

module.exports = Order;
