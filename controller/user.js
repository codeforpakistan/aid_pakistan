/**
 * Created by usman on 2/28/16.
 */
var bcrypt = require('bcrypt');


module.exports = function(db) {
    return {
        signup: function (req, res) {
            var username = req.body.username;
            var password = req.body.password;



            console.log("In sign up method");
            console.log("Username"+ username);
            console.log("Password"+ password);
            db.User.findOne({
                where: {
                    username: username
                }
            }).then(function (user) {
                console.log("Checking if a user previously exists");
                if (user) {
                    console.log(user);
                    res.send({
                        result: false,
                        err: "User already exists!"
                    });
                } else {
                    console.log("create method");
                    db.User.create({
                        username: username,
                        password: password
                    }).then(function (user) {
                            console.log("User saved user:" + req.body.password);
                            res.send({
                                result: true,
                                data: {
                                    token: user.token
                                }
                            });
                        }
                    ).catch(function(err){
                            res.send({
                                result: false,
                                err: "Error is" + err
                            })
                        });
                }
            }).catch(function(err){
                res.send({
                    result: false,
                    err:err
                })
            });
        },
        login: function (req, res) {
            var username = req.body.username;
            var password = req.body.password;
            console.log("username: ", username);
            console.log("password: ", password);

            db.User.findOne({
                where: {username: username}
            }).then(function (user) {
                if (user) {
                    console.log("Username returned", user.username);
                    bcrypt.compare(req.body.password, user.password, function (err, result) {
                        console.log("Bcrypt returns: " + result);
                        if (err) {
                            res.status(501).json({
                                result: false,
                                err: "Server error"
                            });
                        } else {
                            if (result) {
                                console.log(user);
                                res.json({
                                    result: true,
                                    data: {token: user.token}
                                });
                            } else {
                                res.status(401).json({
                                    result: false,
                                    data: "Invalid username/password combination"
                                })
                            }
                        }
                    });
                } else {
                    res.status(401).json({
                        result: false,
                        data: "Invalid username/password combination"
                    });
                }
            });
        }
    };
};
