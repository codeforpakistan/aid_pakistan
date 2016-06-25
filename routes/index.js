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
//   var multiparty = require('connect-multiparty'),
//      multipartyMiddleware = multiparty();


    app.get('/', function(req, res){
      var promiseArray = [
        organization.getOrganizations(""),
        organization.getOrganizations("H"),
        organization.getOrganizations("E"),
        organization.getOrganizations("W"),
        organization.getOrganizations("C"),
        organization.getOrganizations("D")
      ];
      Promise.all(promiseArray).then(function(values){
          console.log(JSON.stringify(values));
          var data = {
            all: values[0],
            health: values[1],
            education: values[2],
            women: values[3],
            children: values[4],
            disaster: values[5]
          }
          res.render('home', data);   // this is the important part
      }).catch(function(error){
        console.error(error);
        res.render('server_fault');
      })
    });

    app.get('/organization/:oid', function(req, res){
      var id = req.params.oid;
      var promiseArray = [
        organization.getOrganization(id),
        paymentMethod.getPaymentMethods(id)
      ]
      Promise.all(promiseArray).then(function(values){
        if(!values[0]){
          res.render('not_found');
        } else {
          console.log("Payment Methods" + JSON.stringify(values[1]));
          res.render('organization', {
            organization: values[0],
            payment_method: values[1]
          });
        }
      }).catch(function(error){
        console.error(error);
        res.render('server_fault');
      });
    });

    app.post('/signup', user.signup);
    app.post('/authenticate', user.login);
    //organization routes
    app.get('/organisation', organization.getOrganizations);
    app.get('/organisation/:oid', organization.getOrganization);
    app.post('/organization', organization.addOrganization);
    app.put('/organization/:oid/image',organization.addOrganizationImages);
    //payment routes
    app.post('/organization/:oid/payment_method', paymentMethod.addPaymentMethod);

    //payment routes
    //app.get('/organization/:oid/payment_method', paymentMethod.getPaymentMethods);

    //achievement routes
    app.post('/organization/:oid/achievement/', achievement.addAchievement);
    app.post('/organization/:oid/achievement/:aid', achievement.deleteAchievement);
    //Subscriptions
    app.post('/subscribe', subscription.subscribe);
};
