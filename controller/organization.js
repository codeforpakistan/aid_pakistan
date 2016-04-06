/**
 * Created by usman on 3/25/16.
 */

var genericResponses = require("../helper/generic_responses");
var multer = require('multer');
var storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, '../public/img/organization/'+ req.param.id +'/')
    },
    filename: function(req, file, cb){
        cb(null, file.fieldname + '-' + Date.now())
    }
});

var upload = multer.({ storage: storage });

var uploadOrganizationPictures = upload.fields([{ name: "cover", maxCount: 1},
    { name: "gallery", maxCount: 15}]);

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
                return genericResponses.databaseCatch(res, error)
            });
        },
        getOrganizations: function(req, res) {
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
                if(organization == null){ return genericResponses.notFound(res) }
                else {
                    return res.send({
                        err: false,
                        result: organization
                    });
                }

            }).catch(function(error){
                return genericResponses.databaseCatch(res, error)
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
                    return genericResponses.databaseCatch(res, error);
                });
        },
        addOrganizationImages: function(req, res) {
            var organizationId = req.params.id;
            db.Organization.findById(organizationId)
                .then(function(organization){
                    if(organization == null){
                        genericResponses.notFound(res);
                    } else {
                        uploadOrganizationPictures(req, res, function(error){
                            if(error){
                                genericResponses.serverError(res, error)
                            }else {
                                //Here I am supposed to write
                                organization.pictures = {
                                    cover: "./img/organization/" + organizationId + "/cover.jpg"
                                }
                            }
                        }).then(function(organization){
                            res.status(201).send({
                                err: false,
                                result: organization
                            });
                        }).catch(function(error){
                            return genericResponses.databaseCatch(res, error)
                        });
                    }
                })
                .catch(function(error){
                    return genericResponses.databaseCatch(res, error)
                });
        }
    }
};
