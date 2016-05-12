/**
 * Created by usman on 2/28/16.
 */
var Sequelize = require('sequelize');

var User = require('../model/user');
var Organization = require('../model/organization');
var Achievement = require('../model/achievement');
var PaymentMethod = require('../model/payment_method');
var Testimonial = require('../model/testimonial');
var Subscription = require('../model/subscription');
const util = require('util');


var sequelize = new Sequelize('aidpakistan', 'aidpakistan', 'aidpakistan', {
    host: 'db-aidpakistan.cz0ihya79yam.us-east-1.rds.amazonaws.com',
    dialect: 'postgres',
    port:"5432"
});

db = {};

db.User = User(sequelize, Sequelize);
db.Organization = Organization(sequelize, Sequelize);
db.Achievement = Achievement(sequelize, Sequelize);
db.PaymentMethod = PaymentMethod(sequelize, Sequelize);
db.Testimonial = Testimonial(sequelize, Sequelize);
db.Subscription = Subscription(sequelize, Sequelize);

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
    force:true
}).then(function(log){
    console.log("Models configured." + log );
}).catch(function(err){
    console.log("bad stuff: ", err);
    console.log(util.inspect(err, { showHidden: true, depth: 1 }));
});

module.exports = db;
