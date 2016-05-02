/**
 * Created by usman on 2/28/16.
 */
var Sequelize = require('sequelize');

var User = require('../model/user');
var Organization = require('../model/organization');
var Achievement = require('../model/achievement');
var PaymentMethod = require('../model/payment_method');
var Testimonial = require('../model/testimonial');
const util = require('util');


var sequelize = new Sequelize('fund_pakistan', 'ali', 'ali', {
    host: '127.0.0.1',
    dialect: 'postgres'
});

db = {};

db.User = User(sequelize, Sequelize);
db.Organization = Organization(sequelize, Sequelize);
db.Achievement = Achievement(sequelize, Sequelize);
db.PaymentMethod = PaymentMethod(sequelize, Sequelize);
db.Testimonial = Testimonial(sequelize, Sequelize);

console.log(util.inspect(db, { showHidden: true, depth: 1 }));

db.User.belongsTo(db.Organization, {
    foreignKey: 'organization_id',
    targetKey: 'id'
});
db.Achievement.belongsTo(db.Organization, {
    foreignKey: 'organization_id',
    targetKey: 'id'
});
db.PaymentMethod.belongsTo(db.Organization, {
    foreignKey: 'organization_id',
    targetKey: 'id'
});
db.Testimonial.belongsTo(db.Organization, {
    foreignKey: 'organization_id',
    targetKey: 'id'
});
/*

db.Comment.belongsTo(User, {
    foreignKey: 'organization_id',
    targetKey: 'id'
});
*/

sequelize.sync({
    force:false
}).then(function(log){
    console.log("Models configured." + log );
}).catch(function(err){
    console.log("bad stuff: ", err);
});

module.exports = db;
