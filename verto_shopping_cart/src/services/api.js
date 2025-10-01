import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const productService = {
  // Get all products
  getAllProducts: async () => {
    try {
      const response = await api.get('/products');
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },

  // Process checkout
  checkout: async (cartItems) => {
    try {
      const response = await api.post('/checkout', { items: cartItems });
      return response.data;
    } catch (error) {
      console.error('Error during checkout:', error);
      throw error;
    }
  }
};

export default api;
