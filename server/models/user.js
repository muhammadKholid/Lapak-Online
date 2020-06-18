'use strict';
const bcrypt = require('bcrypt');
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
          notEmpty: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          is: {
            args: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
            msg:
              'The password must contain atleast 8 characters including at least 1 uppercase, 1 lowercase and one number.',
          },
          notEmpty: true,
        },
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
    },
    {
      sequelize,
      hooks: {
        beforeCreate: (User, options) => {
          const salt = bcrypt.genSaltSync(8);
          const hash = bcrypt.hashSync(User.password, salt);
          User.password = hash;
        },
      },
    }
  );
  User.associate = function (models) {
    // associations can be defined here
    User.hasMany(models.Cart);
    // User.belongsToMany(models.Product, { through: 'Carts', foreignKey: 'ProductId' });
  };
  return User;
};

