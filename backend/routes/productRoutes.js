const express = require('express');
const ProductController = require('../controllers/ProductController');

const router = express.Router();

// GET /api/products - Get all products
router.get('/', ProductController.getAllProducts);

// GET /api/products/:id - Get single product by ID
router.get('/:id', ProductController.getProductById);

module.exports = router;
