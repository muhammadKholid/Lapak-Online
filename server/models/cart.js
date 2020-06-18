'use strict';
module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define(
    'Cart',
    {
      UserId: DataTypes.INTEGER,
      ProductId: DataTypes.INTEGER,
      qty: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 0,
          isNumeric: true,
          isInt: true,
          notEmpty: true,
        },
      },
      total: {
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
  Cart.associate = function (models) {
    // associations can be defined here
    Cart.belongsTo(models.User);
    Cart.belongsTo(models.Product);
  };
  return Cart;
};

