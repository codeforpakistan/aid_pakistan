/**
 * Created by usman on 3/25/16.
 */

var genericResponses = require("../helper/generic_responses");

module.exports = function(db){
    return {
        getOrganization : function(req, res){
            var organizationId = req.params.id;
            db.Organization.findOne({
                where: {
                    id: organizationId
                }
            }).then(function(organization){
                if(organization== null){ return genericResponses.notFound(res) }
                else {
                    return res.send({
                        err: false,
                        result: organization
                    });
                }

            }).catch(function(error){
                return genericResponses.databaseCatch(error)
            });
        },
        getOrganizations: function(req, res){
            var organizationId = req.params.id;
            var limit = req.query.limit;
            var offset = req.query.offset;
            if(limit == null) {limit = 10}
            if(offset == null) {offset = 0}
            db.Organization.findAll({
                where: {
                    id: organizationId
                },
                limit: limit,
                offset: offset
            }).then(function(organization){
                if(organization== null){ return genericResponses.notFound(res) }
                else {
                    return res.send({
                        err: false,
                        result: organization
                    });
                }

            }).catch(function(error){
                return genericResponses.databaseCatch(error)
            });
        },
        addOrganization: function(req, res){
            var organizationData = req.body;
            db.Organization.insert(organizationData)
                .then(function(organization){
                    res.status(201).send({
                        err: false,
                        result: {
                            id: organization.id
                        }
                    });
                })
                .catch(function(error){
                    return genericResponses.databaseCatch(error);
                });
        }
    }
};
