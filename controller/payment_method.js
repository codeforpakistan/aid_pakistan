var genericResponses = require("../helper/generic_responses");
const util = require('util');

module.exports = function(db) {
  return {
    addPaymentMethod: function (req, res) {
      console.log(db.Organization.Instance.prototype);
      var paymentJson = req.body;
      var organizationId = req.params.oid;
      console.log("organization"+ organizationId);
      db.Organization.findById(organizationId).then(function(organization){

        console.log("organization"+ organization);
        if(organization){
          console.log("Found organization");
          organization.createPaymentMethod(paymentJson).then(function(payment){
            return res.send({
              err: false,
              result: payment.id
            });
          }).catch(function (error) {
            console.log("Problem creating payment_method" + error);
            return genericResponses.databaseCatch(res, error);
          });
        } else {
          console.log("Organization not found");
          return genericResponses.notFound(res)
        }
      }).catch(function(error){
        console.log("Error finding organization" + error)
        return genericResponses.databaseCatch(res, error);
      })
    },
    deletePaymentMethod: function (req, res) {
      var paymentId = req.params.id;
      db.PaymentMethod.find({
        where: {
          id:paymentId
        }
      }).then(function (paymentMethod) {
        paymentMethod.destory()
      }).then(function () {
        return res.send({
          err: false,
          result: "Deleted"
        });
      }).catch(function (error) {
        return genericResponses.databaseCatch(res, error);
      })
    },
    getPaymentMethods: function(organizationId){
      console.log(db.Organization.Instance.prototype);
      console.log("organization"+ organizationId);
      return db.PaymentMethod.findAll({
        where: {
          organization_id: organizationId
        }
      })
    }
  };
}
