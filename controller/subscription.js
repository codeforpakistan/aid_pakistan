/**
 * Created by usman on 5/9/16.
 */
var genericResponses = require("../helper/generic_responses");
module.exports = function(db) {
    return {
        subscribe: function (req, res) {
            var email = req.body.email;
            db.Subscription.insert(email).then(function(sub){
                res.send({
                    err: false,
                    result: "Success"
                });
            }).catch(function(err){
                genericResponses.serverError(res, err);
            });
        }
    }
};

