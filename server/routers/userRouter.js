const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { admin } = require('../middlewares/authorization');

router.post('/login', userController.login);
router.post('/register', userController.register);
router.put('/:id', admin, userController.update);
router.delete('/:id', admin, userController.delete);

module.exports = router;
