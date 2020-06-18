const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

router.post('/', cartController.cart);
router.get('/', cartController.getAll);
router.delete('/all', cartController.checkout);
router.delete('/:id', cartController.removeProduct);
router.put('/:id', cartController.update);

module.exports = router;
