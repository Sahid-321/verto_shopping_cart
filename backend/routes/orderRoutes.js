const express = require('express');
const OrderController = require('../controllers/OrderController');

const router = express.Router();

// POST /api/checkout - Process checkout
router.post('/', OrderController.checkout);

module.exports = router;
