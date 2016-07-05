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
            disaster: values[5],
            page_home: true
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
            payment_method: values[1],
            organizations: true,
            helpers: {
              alert: function(){
                alert("Helper");
                return "12"
              }
            }
          });
        }
      }).catch(function(error){
        console.error(error);
        res.render('server_fault');
      });
    });
    app.get('/about/',function(req,res){
      res.sendfile('views/about.html');
    });
    app.get('/contact/',function(req,res){
      res.sendfile('views/contact.html');
    });
    app.get('/organizations/', function(req, res){
      var category = req.query.category;
      var name = req.query.name;
      var offset = req.query.offset;
      organization.getOrganizations(category, name, null, offset).then(function(organizations){
        var pagination= {};
        pagination.current_page = 1;
        pagination.total_pages = 5;

        res.render('organizations', {
          organizations: organizations,
          pagination: pagination,
          page_organizations: true,
          helpers: {
            times: function(n,block){
              var accum = '';
              for(var i = 0; i < n; ++i)
              accum += block.fn(i);
              return accum;
            }
          }
        });
      });

    });
    
    app.post('/signup', user.signup);
    app.post('/authenticate', user.login);
    //organization routes
//  app.get('/organisation', organization.getOrganizations);
//  app.get('/organisation/:oid', organization.getOrganization);
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
    app.get('*',function(req, res){
      res.render('not_found');
    });
};
