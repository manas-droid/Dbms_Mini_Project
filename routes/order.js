const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order');


router.post('/create-order-from-cart',orderController.postOrderFromCart);
router.post('/create-order-from-order',orderController.postOrderFromOrder);
router.post('/delete-orders',orderController.postDeleteOrders);
router.get('/orders',orderController.getOrders);

module.exports = router;
