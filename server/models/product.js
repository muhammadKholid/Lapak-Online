'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    'Product',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      image_url: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 0,
          isNumeric: true,
          isInt: true,
          notEmpty: true,
        },
      },
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 0,
          isNumeric: true,
          isInt: true,
          notEmpty: true,
        },
      },
    },
    { sequelize }
  );
  Product.associate = function (models) {
    // // associations can be defined here
    Product.hasMany(models.Cart);
    // Product.belongsToMany(models.User, { through: 'Carts', foreignKey: 'UserId' });
  };
  return Product;
};

