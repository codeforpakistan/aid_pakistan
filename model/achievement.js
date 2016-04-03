/**
 * Created by usman on 3/25/16.
 */
module.exports = function(sequelize, Sequelize){
    var Achievement = sequelize.define("achievement", {
        id: {
            type: Sequelize.BIGINT(),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        text: {
            type: Sequelize.STRING(),
            allowNull: false
        },
        type: {
            type: Sequelize.STRING(),
            allowNull: false
        }

    });
    return Achievement;
};




