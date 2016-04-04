/**
 * Created by usman on 3/25/16.
 */
module.exports = {
    notFound : function(res){
        res.status(404).send({
            err: true,
            error: "Not found"
        })
    },
    databaseCatch : function(res, error){
        res.status(400).send({
            err: true,
            error: error
        })
    },
    serverError: function(res, error){
        res.status(500).send({
            err: true,
            error: error
        })
    }
};
