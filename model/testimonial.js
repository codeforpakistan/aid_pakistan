/**
 * Created by usman on 3/24/16.
 */
module.exports = function(sequelize, Sequelize){
    var Testimonial = sequelize.define("testimonial", {
        id: {
            type: Sequelize.BIGINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        text: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        pictures: {
            type: Sequelize.JSONB
        }
    });

    return Testimonial;
};

