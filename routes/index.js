/**
 * Created by usman on 2/28/16.
 */

module.exports = function(app, db){

    var token_auth = require('../helper/token_auth')(db);
    var user = require('./../controller/user')(db);


    app.get('/', function(req, res){
        res.json({
            "result": true
        });
    });

    app.post('/signup', user.signup);
    app.post('/authenticate', user.login);


//    app.get('/membercreate', member.createMember);
};
