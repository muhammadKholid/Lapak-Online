const { Customer } = require('../models');
const { sign, verify } = require('../helpers/jwt');
const checkPass = require('../helpers/checkPass');

class Controller {
  static login(req, res, next) {
    const { email } = req.body;
    Customer.findOne({
      where: {
        email,
      },
    })
      .then((response) => {
        if (response) {
          const check = checkPass(req.body.password, response.password);
          if (check) {
            const token = sign(response.id, response.username, response.email);
            res.status(200).json({ message: 'Login berhasil!', token, data: response });
          } else {
            throw new Error('wrong password');
          }
        } else {
          throw new Error('user not found');
        }
      })
      .catch((err) => {
        next(err);
      });
  }

  static register(req, res, next) {
    const { username, email, password } = req.body;
    Customer.create({
      username,
      email,
      password,
    })
      .then((response) => {
        const token = sign(response.id, response.username, response.email);
        res.status(201).json({ message: 'Registrasi berhasil', token, data: response });
      })
      .catch((err) => {
        next(err);
      });
  }
}

module.exports = Controller;
