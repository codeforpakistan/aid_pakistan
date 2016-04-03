var bcrypt = require("bcrypt");


exports.hashPassword = function(password, cb) {
    bcrypt.hash(password, 10, function (err, hash) {
        if (err) {
            var err = new Error("Error hashing password.");
            console.log(err);
            cb(null);
        } else {
            console.log(hash);
            cb(hash);
        }
    });
};
