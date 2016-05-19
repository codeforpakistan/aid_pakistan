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
    account_detail: {
      type: Sequelize.STRING,
      allowNull: false
    },
    account_name: {
      type: Sequelize.STRING,
      allowNull: false

    }
  });
  return PaymentMethod;
};
