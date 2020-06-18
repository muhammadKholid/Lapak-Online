const express = require('express');
const router = express.Router();
const userRouter = require('./userRouter');
const productRouter = require('./productRouter');
const cartRouter = require('./cartRouter');
const authentication = require('../middlewares/authentication');

router.use('/', userRouter);
router.use('/products', productRouter);
router.use('/cart', authentication, cartRouter);

module.exports = router;
