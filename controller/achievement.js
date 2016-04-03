/**
 * Created by usman on 3/25/16.
 */

var genericResponses = require("../helper/generic_responses");
module.exports = function(db){
    return {
        addAchievement : function(req, res){
            var achievement = req.body;
            db.Achievement.insert(achievement)
                .then(function(achievement){
                    return res.status(201).send({
                        err: false,
                        result:{
                            id: achievement.id
                        }
                    })
                })
                .catch(function(error){
                    return genericResponses.databaseCatch(res, error);
                });
        },
        deleteAchievement: function(req, res){
            var achievementId = req.params.id;
            db.Achievement.find({
                where: {
                    id: achievementId
                }
            }).then(function(achievement){
                achievement.destory()
            }).then(function(){
                return res.send({
                    err: false,
                    result: "Deleted"
                });
            }).catch(function(error){
                return genericResponses.databaseCatch(res, error);
            })
        }
    }
};
