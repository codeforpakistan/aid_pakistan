/**
 * Created by usman on 2/28/16.
 */


function checkHeader(req) {
    var bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== 'undefined') {
        req.token = bearerHeader;
        return req;
    } else {
        return null;
    }
};

module.exports = function(db) {
    return {
        ensureAuthentication : function (req, res, next) {
            req = checkHeader(req);
            if (req == null) {
                return res.status(403).send({
                    result: false,
                    err: "Token not set"
                })
            }
            console.log(req.token);
            db.User.findOne({
                where: { token: req.token }
            }).then(function(user) {
                if(user){
                    req.user = user;
                    next();
                }else {
                    res.status(401).json({
                        result: false,
                        err: "Invalid token"
                    })
                }
            });
        }
    };
};
