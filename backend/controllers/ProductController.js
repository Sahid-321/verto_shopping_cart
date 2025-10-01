const Product = require('../models/Product');

class ProductController {
  // GET /api/products - Returns list of products
  static getAllProducts(req, res) {
    try {
      const products = Product.getAllProducts();
      res.json({
        success: true,
        products: products
      });
    } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({
        success: false,
        message: 'Error fetching products'
      });
    }
  }

  // GET /api/products/:id - Returns a single product
  static getProductById(req, res) {
    try {
      const { id } = req.params;
      const product = Product.findById(id);
      
      if (!product) {
        return res.status(404).json({
          success: false,
          message: 'Product not found'
        });
      }

      res.json({
        success: true,
        product: product
      });
    } catch (error) {
      console.error('Error fetching product:', error);
      res.status(500).json({
        success: false,
        message: 'Error fetching product'
      });
    }
  }
}

module.exports = ProductController;
