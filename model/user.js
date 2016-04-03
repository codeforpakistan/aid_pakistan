/**
 * Created by usman on 2/28/16.
 */

var helper = require('../helper/password');
var jwt = require("jsonwebtoken");

module.exports = function(sequelize, Sequelize){
    var User = sequelize.define('user', {
        username: { type: Sequelize.STRING()},
        password: { type: Sequelize.STRING()},
        token: { type: Sequelize.STRING()},
        phone: { type: Sequelize.STRING()},
        address_line1: { type: Sequelize.STRING()},
        address_line2: { type: Sequelize.STRING()},
        city: { type: Sequelize.STRING()},
        country: { type: Sequelize.STRING()},
        admin: {type: Sequelize.BOOLEAN()}

    },{
        timestamps: false,
        freezeTableName: true
    });

    User.beforeCreate(function(user, options){
        console.log("Before Create method");
        return new Promise(function(resolove, reject){
            helper.hashPassword(user.password, function (hashed_password) {
                if(!hashed_password) { return reject(); }
                else{
                    user.token = jwt.sign(user.username + user.password, "asdasdasdasdasd");
                    user.password = hashed_password;
                    console.log("Hashed password as I am saving: " , hashed_password);
                    resolove(user)
                }
            });
        });
    });
    return User;
};



