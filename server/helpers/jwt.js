const jwt = require('jsonwebtoken');
module.exports = {
  sign(id, role) {
    let token = jwt.sign({ userId: id, role }, process.env.JWT_SECRET);
    return token;
  },
  verify(data) {
    return jwt.verify(data, process.env.JWT_SECRET);
  },
};

