const { verify } = require('../helpers/jwt');
const authentication = (req, res, next) => {
  const token = req.headers.token;
  try {
    if (token) {
      const decoded = verify(token);
      req.userId = decoded.userId;
      req.role = decoded.role;
      next();
    } else {
      throw new Error('token not found');
    }
  } catch (err) {
    next(err);
  }
};

module.exports = authentication;
