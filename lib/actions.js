'use strict';

var util = require('utility');
var nodeValue = require('./nodeValue');
var form = require('./form');
/**
 * Actions Module
 *
 * @module lib/actions
 * @author Hasan Abbas
 * @version 2.0.0
 * @description test description
 * @copyright Kwantu Ltd RSA 2009-2015.
 *
 */


var community = (function() {

    return {

        createCommunity: function(_def, uuid, _WFInstance) {

            return new Promise(function(resolve, reject) {

                var workerObject = worker.getWorkerWrapper();

                workerObject._id = generateUUID();
                workerObject.communityId = app.SCOPE.getCommunityId();
                workerObject.applicationId = app.SCOPE.applicationId;
                workerObject.createdDateTime = new Date().toString();
                workerObject.senderUserId = LOCAL_SETTINGS.SUBSCRIPTIONS.userId;
                var uuidCommunity = JSON.xpath("/indicators[category/term eq 'Community']/_id", _WFInstance, {})[0];
                var action = {
                    "createCommunity": {
                        "newCommunityId": _WFInstance.profile,
                        "indicatorUUID": {
                            "Community": uuidCommunity
                        }
                    }
                };
                workerObject.action = action;
                worker.send(workerObject).then(function(workerSuccess) {

                    var success = util.success('Worker processed successfully.', workerSuccess);
                    resolve(success);

                }, function(workerFail) {
                    reject(workerFail);
                });
            });
        },
        userJoinCommunity: function(_def, uuid, _WFInstance) {

            return new Promise(function(resolve, reject) {

            });

        },
        releaseAdoptedApplication: function(_def, uuid, _WFInstance) {

            return new Promise(function(resolve, reject) {

                var workerObject = worker.getWorkerWrapper();

                workerObject._id = generateUUID();
                workerObject.communityId = app.SCOPE.getCommunityId();
                workerObject.applicationId = app.SCOPE.applicationId;
                workerObject.createdDateTime = new Date().toString();
                workerObject.senderUserId = LOCAL_SETTINGS.SUBSCRIPTIONS.userId;

                var uuidReleaseAdoptedApplication = JSON.xpath("/subprocesses[_id eq '" + uuid + "']/indicators[id eq 'adoptedApplication']/instances[1]/uuid", _WFInstance, {})[0];


                var action = {
                    "releaseAdoptedApplication": {
                        "communityId": _WFInstance.profile,
                        "indicatorUUID": {
                            "adoptedApplication": uuidReleaseAdoptedApplication
                        }
                    }
                };
                workerObject.action = action;
                worker.send(workerObject).then(function(workerSuccess) {

                    var success = util.success('Worker processes successfully.', workerSuccess);
                    resolve(success);

                }, function(workerFail) {
                    reject(workerFail);
                });
            });
        }

    }

})();

var application = (function() {

    return {

        createAppDefinition: function(_def, uuid, _WFInstance) {

            return new Promise(function(resolve, reject) {

                var workerObject = worker.getWorkerWrapper();

                workerObject._id = generateUUID();
                workerObject.communityId = app.SCOPE.getCommunityId();
                workerObject.applicationId = app.SCOPE.applicationId;
                workerObject.createdDateTime = new Date().toString();
                workerObject.senderUserId = LOCAL_SETTINGS.SUBSCRIPTIONS.userId;

                var uuidApplication = JSON.xpath("/indicators[category/term eq 'Application']/_id", _WFInstance, {})[0];
                var action = {
                    "createApplication": {
                        "newApplicationId": _WFInstance.profile,
                        "indicatorUUID": {
                            "Application": uuidApplication
                        }
                    }
                };
                workerObject.action = action;
                worker.send(workerObject).then(function(workerSuccess) {

                    var success = util.success('Worker processes successfully.', workerSuccess);
                    resolve(success);

                }, function(workerFail) {
                    reject(workerFail);
                });
            });

        },

        buildApplication: function(_def, uuid, _WFInstance) {

            return new Promise(function(resolve, reject) {

                var workerObject = worker.getWorkerWrapper();

                workerObject._id = generateUUID();
                workerObject.communityId = app.SCOPE.getCommunityId();
                workerObject.applicationId = app.SCOPE.applicationId;
                workerObject.createdDateTime = new Date().toString();
                workerObject.senderUserId = LOCAL_SETTINGS.SUBSCRIPTIONS.userId;

                var uuidPublishApplication = JSON.xpath("/subprocesses[_id eq '" + uuid + "']/indicators[id eq 'PublishApplication']/instances[1]/uuid", _WFInstance, {})[0];

                var uuidApplicationDefinition = JSON.xpath("/indicators[category/term eq 'ApplicationDefinition']/_id", _WFInstance, {})[0];
                var uuidRoles = JSON.xpath("/indicators[category/term eq 'Roles']/_id", _WFInstance, {})[0];
                var uuidApplication = JSON.xpath("/indicators[category/term eq 'Application']/_id", _WFInstance, {})[0];
                var uuidAppPermissions = JSON.xpath("/indicators[category/term eq 'AppPermissions']/_id", _WFInstance, {})[0];

                var action = {
                    "buildApplication": {
                        "applicationId": _WFInstance.profile,
                        "indicatorUUID": {
                            "PublishApplication": uuidPublishApplication,
                            "ApplicationDefinition": uuidApplicationDefinition,
                            "Roles": uuidRoles,
                            "Application": uuidApplication,
                            "AppPermissions": uuidAppPermissions
                        }
                    }
                };
                workerObject.action = action;
                worker.send(workerObject).then(function(workerSuccess) {

                    var success = util.success('Worker processes successfully.', workerSuccess);
                    resolve(success);

                }, function(workerFail) {
                    reject(workerFail);
                });
            });

        },

        applicationAdoption: function(_def, uuid, _WFInstance) {

            return new Promise(function(resolve, reject) {

                var workerObject = worker.getWorkerWrapper();

                workerObject._id = generateUUID();
                workerObject.communityId = app.SCOPE.getCommunityId();
                workerObject.applicationId = app.SCOPE.applicationId;
                workerObject.createdDateTime = new Date().toString();
                workerObject.senderUserId = LOCAL_SETTINGS.SUBSCRIPTIONS.userId;

                var uuidAdoption = JSON.xpath("/subprocesses[_id eq '" + uuid + "']/indicators[id eq 'Adoption']/instances[1]/uuid", _WFInstance, {})[0];



                var uuidPublishApplication = JSON.xpath("/indicators[category/term eq 'PublishApplication']/_id", _WFInstance, {})[0];
                var uuidApplication = JSON.xpath("/indicators[category/term eq 'Application']/_id", _WFInstance, {})[0];

                var action = {
                    "adoptApplication": {
                        "applicationId": _WFInstance.profile,
                        "indicatorUUID": {
                            "Adoption": uuidAdoption,
                            "PublishApplication": uuidPublishApplication,
                            "Application": uuidApplication
                        }
                    }
                };
                workerObject.action = action;
                worker.send(workerObject).then(function(workerSuccess) {

                    var success = util.success('Worker processes successfully.', workerSuccess);
                    resolve(success);

                }, function(workerFail) {
                    reject(workerFail);
                });
            });

        }
    }

})();


var worker = (function() {


    return {

        getWorkerWrapper: function() {

            var wrapper = {
                "source": "remote",
                "type": "workerObject",
                "_id": "",
                "channels": [],
                "communityId": "",
                "applicationId": "",
                "message": "",
                "messageType": "info",
                "createdDateTime": "",
                "senderUserId": "",
                "notification": {

                },
                "action": {

                }
            };

            return wrapper;

        },
        send: function(workerObject) {

            return new Promise(function(resolve, reject) {

                console.log('Submitting Worker Object to server');
                console.log(workerObject);
                dao.save(workerObject).done(function(workerResponse) {
                    resolve(workerResponse);
                }).fail(function(err) {
                    console.log('Error submitting worker response !!' + err);
                    reject(err);
                })


            });

        }
    }

})();



module.exports = {

    community: community,
    application: application,
    worker: worker

}