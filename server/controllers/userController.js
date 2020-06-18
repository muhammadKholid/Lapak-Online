const { User } = require('../models');
const { sign } = require('../helpers/jwt');
const checkPass = require('../helpers/checkPass');

class Controller {
  static login(req, res, next) {
    const { email, password } = req.body;
    User.findOne({
      where: {
        email,
      },
    })
      .then((response) => {
        console.log(response);
        if (response.role == 'admin') {
          if (response.password == 'adminku') {
            const token = sign(response.id, response.role);
            res.status(200).json({ message: 'Berhasil login', data: response, token: token });
          } else {
            throw new Error('wrong password');
          }
        } else {
          if (!response) {
            throw new Error('Data not found');
          } else {
            const check = checkPass(password, response.password);
            if (check) {
              const token = sign(response.id, response.role);
              res
                .status(200)
                .json({ message: 'Anda berhasil login', token: token, data: response });
            } else {
              throw new Error('Wrong password');
            }
          }
        }
      })
      .catch((err) => {
        next(err);
      });
  }

  static register(req, res, next) {
    console.log(req.body);
    const { name, email, password, role } = req.body;
    let newRole;
    if (role == '') {
      newRole = 'buyer';
    }
    console.log({ name, email, password, role: newRole });
    console.log(req.body);
    User.create({
      name,
      email,
      password,
      role,
    })
      .then((response) => {
        const token = sign(response.id, response.role);
        res.status(201).json({ message: 'Registrasi berhasil', token, data: response });
      })
      .catch((err) => {
        next(err);
      });
  }

  static update(req, res, next) {
    const theUser = req.body;
    User.update(
      {
        name: theUser.name,
        email: theUser.email,
        password: theUser.password,
        role: theUser.role,
      },
      { where: { id: req.params.id } }
    )
      .then((response) => {
        res.status(200).json({ message: 'Data berhasil terupdate', data: response });
      })
      .catch((err) => {
        next(err);
      });
  }

  static delete(req, res, next) {
    User.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then((response) => {
        res.status(200).json({ message: 'Data berhasil terupdate', data: response });
      })
      .catch((err) => {
        next(err);
      });
  }
}

module.exports = Controller;
