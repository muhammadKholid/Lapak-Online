const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { admin } = require('../middlewares/authorization');
const authentication = require('../middlewares/authentication');

router.get('/', productController.getAll);
router.get('/:id', productController.getOne);
router.post('/', authentication, admin, productController.addProduct);
router.put('/:id', authentication, admin, productController.update);
router.delete('/:id', authentication, admin, productController.delete);

module.exports = router;
