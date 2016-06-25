/**
 * Created by usman on 3/25/16.
 */
module.exports = function(sequelize, Sequelize){
  var PaymentMethod = sequelize.define("payment_method", {
    id: {
      type: Sequelize.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    detail: {
      type: Sequelize.STRING,
      allowNull: false
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false

    },
    image: {
      type: Sequelize.STRING,
      allowNull: false
    },
    link: {
      type: Sequelize.STRING,
      allowNull: false
    }
  });
  return PaymentMethod;
};
