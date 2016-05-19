/**
 * Created by usman on 3/24/16.
 */

module.exports = function(sequelize, Sequelize){
    var Organization = sequelize.define('organization', {
        id : {
            type: Sequelize.BIGINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        description:{
            type: Sequelize.TEXT,
            allowNull: false
        },
        pictures: {
            type: Sequelize.JSONB
        },
        categories: {
           /*  categories for same organization can be selected. For­example, an organization
           that belongs  to Education and health, the categories field will have value 'EH'.*/
            type: Sequelize.STRING,
            allowNull: false
        },
        fundsToRaise: {
            type: Sequelize.BIGINT
        },
        fundsRaised: {
            type: Sequelize.BIGINT
        },
        address: {
            type: Sequelize.STRING
        },
        city: {
            type: Sequelize.STRING
        },
        address_others: {
            type: Sequelize.JSONB
        },
        is_visible: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        social_links: {
          type: Sequelize.JSONB,
        }
    });

    return Organization;
};

