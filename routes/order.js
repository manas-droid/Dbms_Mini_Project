const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order');


router.post('/create-order',orderController.postOrder)

module.exports = router;
