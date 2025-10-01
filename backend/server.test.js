const request = require('supertest');
const app = require('./server');

describe('Products API', () => {
  test('GET /api/products should return list of products', async () => {
    const response = await request(app)
      .get('/api/products')
      .expect(200);

    expect(response.body.success).toBe(true);
    expect(response.body.products).toBeDefined();
    expect(Array.isArray(response.body.products)).toBe(true);
    expect(response.body.products.length).toBeGreaterThan(0);
    
    // Check if each product has required fields
    response.body.products.forEach(product => {
      expect(product).toHaveProperty('id');
      expect(product).toHaveProperty('name');
      expect(product).toHaveProperty('price');
      expect(product).toHaveProperty('imageUrl');
      expect(typeof product.price).toBe('number');
    });
  });

  test('GET /api/products/:id should return single product', async () => {
    const response = await request(app)
      .get('/api/products/1')
      .expect(200);

    expect(response.body.success).toBe(true);
    expect(response.body.product).toBeDefined();
    expect(response.body.product.id).toBe(1);
    expect(response.body.product).toHaveProperty('name');
    expect(response.body.product).toHaveProperty('price');
    expect(response.body.product).toHaveProperty('imageUrl');
  });

  test('GET /api/products/:id should return 404 for non-existent product', async () => {
    const response = await request(app)
      .get('/api/products/999')
      .expect(404);

    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('Product not found');
  });

  test('GET /api/health should return server status', async () => {
    const response = await request(app)
      .get('/api/health')
      .expect(200);

    expect(response.body.status).toBe('Server is running!');
  });
});

describe('Checkout API', () => {
  test('POST /api/checkout should process valid cart data', async () => {
    const cartData = {
      items: [
        { productId: 1, quantity: 2 },
        { productId: 2, quantity: 1 }
      ]
    };

    const response = await request(app)
      .post('/api/checkout')
      .send(cartData)
      .expect(200);

    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe('Order placed successfully!');
    expect(response.body.orderId).toBeDefined();
    expect(response.body.total).toBeDefined();
    expect(response.body.items).toBeDefined();
    expect(Array.isArray(response.body.items)).toBe(true);
  });

  test('POST /api/checkout should reject invalid cart data', async () => {
    const invalidCartData = {
      items: 'invalid'
    };

    const response = await request(app)
      .post('/api/checkout')
      .send(invalidCartData)
      .expect(400);

    expect(response.body.success).toBe(false);
    expect(response.body.message).toContain('Invalid cart data');
  });

  test('POST /api/checkout should handle missing items', async () => {
    const response = await request(app)
      .post('/api/checkout')
      .send({})
      .expect(400);

    expect(response.body.success).toBe(false);
    expect(response.body.message).toContain('Invalid cart data');
  });

  test('POST /api/checkout should handle non-existent product', async () => {
    const cartData = {
      items: [
        { productId: 999, quantity: 1 }
      ]
    };

    const response = await request(app)
      .post('/api/checkout')
      .send(cartData)
      .expect(400);

    expect(response.body.success).toBe(false);
    expect(response.body.message).toContain('Product with ID 999 not found');
  });
});
