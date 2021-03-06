const { Product } = require('../models');
class Controller {
  static getAll(req, res, next) {
    Product.findAll()
      .then((response) => {
        res.status(200).json({ message: 'Semua data ditampilkan', data: response });
      })
      .catch((err) => {
        next(err);
      });
  }

  static getOne(req, res, next) {
    Product.findOne({
      where: {
        id: req.params.id,
      },
    })
      .then((response) => {
        res.status(200).json({
          message: `Data dengan id: ${req.params.id} ditemukan`,
          data: response.dataValues,
        });
      })
      .catch((err) => {
        next(err);
      });
  }

  static addProduct(req, res, next) {
    Product.create({
      name: req.body.name,
      image_url: req.body.image_url,
      price: req.body.price,
      stock: req.body.stock,
    })
      .then((response) => {
        res.status(201).json({ message: 'Berhasil menambah product baru', data: response });
      })
      .catch((err) => {
        next(err);
      });
  }

  static update(req, res, next) {
    Product.update(
      {
        name: req.body.name,
        image_url: req.body.image_url,
        price: Number(req.body.price),
        stock: Number(req.body.stock),
      },
      {
        where: {
          id: req.params.id,
        },
      }
    )
      .then((response) => {
        res.status(201).json({ message: 'Data berhasil diubah', data: response });
      })
      .catch((err) => {
        console.log(err);
        next(err);
      });
  }

  static delete(req, res, next) {
    Product.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then((response) => {
        res.status(200).json({ message: 'Data berhasil dihapus', idProduct: req.params.id });
      })
      .catch((err) => {
        next(err);
      });
  }
}

module.exports = Controller;
