/**
 * Created by usman on 3/25/16.
 */
module.exports = function(sequelize, Sequelize){
    var Subscription = sequelize.define("subscription", {
        id: {
            type: Sequelize.BIGINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                isEmail: true
            }
        }
    });
    return Subscription;
};
