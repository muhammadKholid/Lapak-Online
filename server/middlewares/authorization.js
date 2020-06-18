const { User } = require('../models');
module.exports = {
  admin(req, res, next) {
    try {
      if (req.role == 'admin') {
        next();
      } else {
        throw new Error('You are unauthorized for this field!');
      }
    } catch (err) {
      next(err);
    }
  },
  user(req, res, next) {
    User.findOne({
      where: {
        id: req.params.id,
      },
    })
      .then((response) => {
        if (response) {
          if (response.id == req.userId) {
            next();
          } else {
            throw new Error('Access denied');
          }
        } else {
          throw new Error('user not found');
        }
      })
      .catch((err) => {
        next(err);
      });
  },
};
