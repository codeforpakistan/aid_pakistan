/**
 * Created by usman on 2/28/16.
 */

module.exports = function(app, db){

    var token_auth = require('../helper/token_auth')(db);
    var user = require('./../controller/user')(db);
    var organization = require('./../controller/organization')(db);
    var achievement = require('./../controller/achievement')(db);
    var paymentMethod = require('./../controller/payment_method' )(db);
    var subscription = require('./../controller/subscription')(db);


    app.get('/', function(req, res){
        res.json({
            "result": true
        });
    });

    app.post('/signup', user.signup);
    app.post('/authenticate', user.login);
    //organization routes
    app.get('/organization', organization.getOrganizations);
    app.get('/organization/:oid', organization.getOrganization);
    app.post('/organization', organization.addOrganization);
    app.put('/organization/:oid/image', organization.addOrganizationImages);
    //payment routes
    app.post('/organization/:oid/payment_method/:pid', paymentMethod.addPaymentMethod);
    //achievement routes
    app.post('/organization/:oid/achievement/', achievement.addAchievement);
    app.post('/organization/:oid/achievement/:aid', achievement.deleteAchievement);
    //Subscriptions
    app.post('/subscribe', subscription.subscribe);
//    app.get('/membercreate', member.createMember);
};
