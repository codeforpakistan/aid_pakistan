/**
 * Created by usman on 4/23/16.
 */

var genericResponses = require("../helper/generic_responses");
module.exports = function(db) {
    return {
        addPaymentMethod: function (req, res) {
            var payment = req.body;
            db.PaymentMethod.insert(payment)
                .then(function (paymentMethod) {
                    return res.status(201).send({
                        err: false,
                        result: {
                            id: paymentMethod.id
                        }
                    })
                })
                .catch(function (error) {
                    return genericResponses.databaseCatch(res, error);
                });
        },
        deleteAchievement: function (req, res) {
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
        }
    }
};
