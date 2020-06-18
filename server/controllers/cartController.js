const { Product, Cart } = require('../models');

class Controller {
  static async cart(req, res, next) {
    try {
      let productCondition = {
        where: {
          ProductId: req.body.id,
          UserId: req.userId,
        },
      };
      let condition = {
        where: {
          id: Number(req.body.id),
        },
      };
      let input = {
        UserId: req.userId,
        ProductId: req.body.id,
        total: req.body.total,
        qty: req.body.qty,
      };
      let fixCart;
      let exist = await Cart.findOne(productCondition);
      if (exist) {
        let updateCart = {
          qty: Number(exist.qty) + Number(req.body.qty),
          total: Number(exist.total) + Number(req.body.total),
        };
        fixCart = await Cart.update(updateCart, productCondition);
      } else {
        fixCart = await Cart.create(input);
      }
      let product = await Product.findOne(condition);
      let update = {
        stock: Number(product.stock) - Number(req.body.qty),
      };
      let updated = await Product.update(update, condition);
      res.status(200).json(fixCart);
    } catch (err) {
      next(err);
    }
  }

  static async update(req, res, next) {
    try {
      let condition = {
        where: {
          id: req.params.id,
        },
      };
      let { qty, total, ProductId, parameter } = req.body;
      let productCondition = {
        where: {
          id: ProductId,
        },
      };
      let updateInput;
      let product = await Product.findOne(productCondition);
      if (parameter === 'minus') {
        updateInput = {
          stock: Number(product.stock) + 1,
        };
      } else {
        updateInput = {
          stock: Number(product.stock) - 1,
        };
      }
      let updatedProduct = await Product.update(updateInput, productCondition);
      let updatedCart = await Cart.update({ qty, total }, condition);
      res.status(200).json('Successfully Update Cart');
    } catch (err) {
      next(err);
    }
  }

  static async getAll(req, res, next) {
    try {
      let condition = {
        where: {
          UserId: req.userId,
        },
        include: Product,
      };
      let cart = await Cart.findAll(condition);
      res.status(200).json(cart);
    } catch (err) {
      next(err);
    }
  }

  static async removeProduct(req, res, next) {
    try {
      let condition = {
        where: {
          ProductId: req.params.id,
          UserId: req.userId,
        },
      };
      let updateCondition = {
        where: {
          id: req.params.id,
        },
      };
      let oneCart = await Cart.findOne(condition);
      let product = await Product.findOne(updateCondition);
      let inputUpdate = {
        stock: Number(product.stock) + Number(oneCart.qty),
      };
      let updated = await Product.update(inputUpdate, updateCondition);
      let removed = await Cart.destroy(condition);
      if (removed) {
        res.status(200).json({ Message: 'Succesfully remove product from cart' });
      }
    } catch (err) {
      next(err);
    }
  }

  static async checkout(req, res, next) {
    console.log(req);
    try {
      let condition = {
        where: {
          UserId: req.userId,
        },
      };
      let removed = await Cart.destroy(condition);
      if (removed) {
        res.status(200).json({ Message: 'Succesfully delete cart' });
      } else {
        throw new Error('Data not found');
      }
    } catch (err) {
      next(err);
    }
  }
}
module.exports = Controller;
