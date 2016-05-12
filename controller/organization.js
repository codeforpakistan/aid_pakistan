/**
 * Created by usman on 3/25/16.
 */

var genericResponses = require("../helper/generic_responses");
var multer = require('multer');
var Sequelize = require("sequelize");
var fs = require("fs");
var _ = require("underscore");
var path = require("path");
var fs = require('fs'),
    S3FS = require('s3fs'),
    s3fsImpl = new S3FS('aidpakistan-images', {
        accessKeyId: "AKIAJFPDUZOGCU5BFGHQ",
        secretAccessKey: "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"
    });

const util = require('util');

// Create our bucket if it doesn't exist
s3fsImpl.create();

/*
var storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './public/img/organization/'+req.params.oid+ "/")
    },
    filename: function(req, file, cb){
        console.log(file);
        if(file.fieldname == "cover") {
            cb(null, file.fieldname + '.jpg')
        } else {
            cb(null, file.originalname )
        }
    }
});*/
/*

var upload = multer({ storage: storage });

var uploadOrganizationPictures = upload.fields([{ name: "cover", maxCount: 1},
    { name: "gallery", maxCount: 15}]);
*/

module.exports = function(db){
    return {
        getOrganization : function(req, res){
            var organizationId = req.params.oid;

            db.Organization.findOne({
                where: {
                    id: organizationId
                }
            }).then(function(organization){
                if( organization== null ){ return genericResponses.notFound(res) }
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
            var limit = req.query.limit;
            var offset = req.query.offset;
            var conditions = {};
            if(req.query.categories != null){
                var categories = req.query.categories;
                var categoriesArray = _.map(categories, function(cat){
                    return  {
                        categories: {
                            $ilike: "%" + cat + "%"
                        }
                    };
                });
            }
            if(req.query.name != null){
                conditions.name = {
                    $ilike: "%"+ req.query.name+"%"
                }
            }
            if(req.query.location != null){
                conditions.city = {
                    $ilike: "%"+ req.query.location+"%"
                };
            }
            if(limit == null) {limit = 10}
            if(offset == null) {offset = 0}
            db.Organization.findAll({
                where: Sequelize.and(
                    conditions,
                    {
                        $or: categoriesArray
                    }
            ),
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
            db.Organization.create(organizationData)
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
            var organizationId = req.params.oid;
/*            if(req.body.cover == null && req.body.gallery== null){
                return res.send({
                    err: true,
                    error: "Files not sent"
             });
             }*/
            console.log(util.inspect(req, { showHidden: true, depth: 1 }));
            console.log((JSON.stringify(req.files)));
            db.Organization.findById(organizationId)
                .then(function(organization) {
                    if (organization == null) {
                        genericResponses.notFound(res);
                    } else {
                        var directoryName = "./public/img/organization/"+ req.params.oid;
                        console.log(JSON.stringify(req.files));
                        _.each(req.files, function(file){
                            console.log(file);
                            var stream = fs.createReadStream(file.path);
                            s3fsImpl.writeFile(file.originalFilename, stream).then(function () {
                                fs.unlink(file.path, function (err) {
                                    if (err) {
                                        console.error(err);
                                    }
                                });
                            });
                        });

                        //Here I am supposed to write
                        organization.pictures = {
                            cover: path.join(directoryName, "/cover.jpg"),
                            gallery:gallery
                        };
                        organization.save().then(function(organization){
                                res.send({
                                    err: false,
                                    result: organization
                                });
                            }
                        ).catch(function(error){
                                return genericResponses.databaseCatch(res, error);
                            })
                    }
                }).catch(function(error){
                    return genericResponses.databaseCatch(res, error)
                });
        }
    }
};
function ensureExists(path, mask, cb) {
    if (typeof mask == 'function') { // allow the `mask` parameter to be optional
        cb = mask;
        mask = 0777;
    }
    fs.mkdir(path, mask, function(err) {
        if (err) {
            if (err.code == 'EEXIST') cb(null); // ignore the error if the folder already exists
            else cb(err); // something else went wrong
        } else cb(null); // successfully created folder
    });
}
