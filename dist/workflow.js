(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Workflow = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var Process = require('./lib/process');
var util = require('utility');
var userInterface = require('./lib/interface');
var helper = require('./lib/helper');


/*globals */

/**
 * A new Workflow constructor instance contains the reference to the application
 * and associated profile which it requires as the first two parameters. It also
 * requires a workflow configuration, as the third parameter, which is used to
 * descibe the workflow processes. If a workflow instance exists you can pass it
 * in as the fourth parameter which it will then use, else create a new one.
 *
 * @constructor
 *
 * @param {string} profile - The current profile id
 * @param {string} app - The associated application id
 * @param {Object} config - The application workflow configuration / definition
 * @param {Object} [instance] - An existing application profile workflow instance based
 * on the definition
 *
 * @author Brent Gordon
 * @version 0.1.0
 *
 * @example
 * var config = { '_id': 'abc123' };

 * var instance = { '_id': 'instance_abc123' };

 * // If there isn't an existing instance
 * var workflow = new Workflow('1234', '5678', config);
 * // If there is an existing instance
 * var workflow = new Workflow('1234', '5678', config, instance);
 *
 * @return {Object} new Workflow object
 *
 * @throws Error: A profile id is required
 * @throws Error: An app id is required
 * @throws Error: A workflow configuration is required
 *
 */

function Workflow(profile, communityId, app, config) {
    var _this = this;

    // Community ID validation checks
    if (communityId == '' || communityId == undefined) {
        throw util.error('ParamRequired', 'A community id is required.');
    } else if (typeof (communityId) !== 'string') {
        throw new Error('The community id must be a javascript string.');
    } else {
        _this.communityId = communityId || '';
    }

    // Profile ID validation checks
    if (profile == '' || profile == undefined) {
        throw util.error('ParamRequired', 'A profile id is required.');
    } else if (typeof (profile) !== 'string') {
        throw new Error('The profile id must be a javascript string.');
    } else {
        _this.profile = profile || '';
    }

    // App ID validation checks
    if (app == '' || app == undefined) {
        throw util.error('ParamRequired', 'An app id is required.');
    } else if (typeof (app) !== 'string') {
        throw new Error('The app id must be a javascript string.');
    } else {
        _this.app = app || '';
    }

    // Workflow configuration validation checks
    if (config == '' || config == undefined) {
        throw util.error('ParamRequired', 'A workflow configuration is required.');
    } else if (typeof (config) !== 'object') {
        _this.config = JSON.parse(config);
    } else {
        _this.config = config;
    }

    // Workflow instance validation checks
    _this.instance;
    // Workflow sub-processes validation checks
    _this.subprocesses = [];
    // Workflow indicators place holder
    _this.indicators = [];
    

}

/**
 * Workflow get profile id.
 *
 * @example ""
 *
 * @return ""
 *
 */
Workflow.prototype.getProfile = function () {
    return this.profile;
};

/**
 * Workflow get app id.
 *
 * @example ""
 *
 * @return ""
 *
 */
Workflow.prototype.getApp = function () {
    return this.app;
};

/**
 * Workflow get config.
 *
 * @example ""
 *
 * @return ""
 *
 */
Workflow.prototype.getConfig = function () {
    return this.config;
};

/**
 * Workflow get instance.
 *
 * @example ""
 *
 * @return ""
 *
 */

Workflow.prototype.getInstance = function () {
    return this.instance;
};

/**
 * Workflow set the instance data.
 *
 * @param {Object} data - the workflow process instance data
 *
 * @example ""
 *
 * @return ""
 *
 */
Workflow.prototype.setInstance = function (data) {
    this.instance = data;
};

/**
 * Workflow get sub-processes data.
 *
 * @example ""
 *
 * @return ""
 *
 */
Workflow.prototype.getSubProcesses = function () {
    return this.subprocesses;
};

/**
 * Workflow set the sub-processes data.
 *
 * @param {Object} data - the workflow process instance data
 *
 * @example ""
 *
 * @return ""
 *
 */
Workflow.prototype.setSubProcesses = function (data) {
    this.subprocesses = data;
};

/**
 * Workflow get indicator set data.
 *
 * @example ""
 *
 * @return ""
 *
 */
Workflow.prototype.getIndicators = function () {
    return this.indicators;
};

/**
 * Workflow set the indicator set data.
 *
 * @param {Object} data - the workflow process instance data
 *
 * @example ""
 *
 * @return ""
 *
 */
Workflow.prototype.setIndicators = function (data) {
    this.indicators = data;
};

/**
 * Set the variable value.
 *
 * @param {string} processId - the Workflow config / definition process id
 * @param {number} processSeq - the Workflow instance process seq
 * @param {string} subProcessId - the Workflow config / definition sub-process id
 * @param {number} subProcessSeq - the Workflow instance sub-process seq
 * @param {string} stepId - the Workflow config / definition step id
 * @param {Object} variable - the Workflow variable object
 *
 * @example ''
 *
 * @return ''
 *
 */
// Workflow.prototype.setVariable = function(processId, processSeq, subProcessId, subProcessSeq, stepId, variable){
// 	var _this = this;
// 	return new Promise(function(resolve, reject) {
// 		try {
// 			Process.getVariable(processId, processSeq, subProcessId, subProcessSeq, stepId, variable).then(funcion(result){
// 				resolve(result.data);
// 			}, function(err){
// 				reject(err);
// 			})
// 		} catch (err) {
// 			reject(err);
// 		}

// 	});
// };

/**
 * Get the variable value.
 *
 * @param {string} processId - the Workflow config / definition process id
 * @param {number} processSeq - the Workflow instance process seq
 * @param {string} subProcessId - the Workflow config / definition sub-process id
 * @param {number} subProcessSeq - the Workflow instance sub-process seq
 * @param {string} stepId - the Workflow config / definition step id
 * @param {string} key - the Workflow variable id
 *
 * @example ''
 *
 * @return ''
 *
 */
// Workflow.prototype.getVariable = function(processId, processSeq, subProcessId, subProcessSeq, stepId, key){
// 	var _this = this;
// 	return new Promise(function(resolve, reject) {
// 		try {
// 			Process.setVariable(processId, processSeq, subProcessId, subProcessSeq, stepId, key).then(funcion(result){
// 				resolve(result.data);
// 			}, function(err){
// 				reject(err);
// 			})
// 		} catch (err) {
// 			reject(err);
// 		}

// 	});
// };

/**
 * This method creates a new workflow process i.e. it creates a workflow processes instance
 * object with the minimum required data. This instance can be referenced in the following
 * way, see example below.
 *
 * @example
 * var config = { '_id': 'abc123' };

 * var workflow = new Workflow('1234', '5678', config);
 * workflow.create().then(function(result){
 *	console.log(result.message);
 *	// The following properties can now be accessed
 * 	var profile = workflow.profile;
 * 	var app = workflow.app;
 * 	var config = workflow.config;
 *	// On success you can access the instance the following way
 *	var instance = workflow.instance;
 * }, function(error){
 *	console.log(error);
 * });
 *
 * @return {Object} new Workflow instance with updated instance data.
 *
 */

Workflow.prototype.create = function () {
    var _this = this;
    return new Promise(function (resolve, reject) {
        try {
            if (_this.instance !== undefined) {
                var warn = util.warn('Instance already exists.', _this)
                resolve(warn);
            } else {
                // Create the workflow processes instance object
                var model = {
                    _id: '',
                    version: '',
                    type: 'workflowInstance',
                    processes: [],
                    channels: [
                        "community_" + app.SCOPE.getCommunityId(),
                        "profile_" + app.SCOPE.profileId,
                        "application_" + app.SCOPE.applicationId,
                        "community_" + app.SCOPE.getCommunityId() + "_application_" + app.SCOPE.applicationId
                    ]
                };

                model._id = "_local/"+_this.profile + ':processes:local';
                //model._id = _this.profile + ':processes';
                
                model.version = _this.config.version;
                _this.instance = model;
                var success = util.success('Workflow processes instance created successfully.', _this);
                resolve(success);

            }

        } catch (err) {
            reject(err);
        }

    });
};

/**
 * Workflow initialise, this function executes a process within a workflow
 * configuration.
 *
 * @param {string} processId - the process id to process
 * @param {object} [data] - the input data to process
 *
 * @example
 * Workflow.initialise('processId', { validDate: 'date' });
 *
 * @return ""
 *
 */
Workflow.prototype.initialise = function (processId, data, subprofileId) {
    var _this = this;
    return new Promise(function (resolve, reject) {
        try {
            var configProcess = [];
            // Check the passed in parameters
            if (processId !== '' && processId !== undefined) {
                // Get the current process config
                configProcess = _this.config.processes.filter(function (objProcess) {
                    if (objProcess._id == processId) {
                        return objProcess;
                    }

                });
                if (configProcess[0]._id == undefined) {
                    var error = util.error('WFConfigError', 'No valid process definition found with process id: ' + processId);
                    reject(error);
                }

            } else {
                configProcess.push(_this.config.processes[0]);
                processId = _this.config.processes[0]._id;
            }

            // Get the current list of process instances
            // var processSeq = 1;
            var currentProcess = [];
            _this.instance.processes.filter(function (processItem) {
                if (processItem.id == processId) {
                    currentProcess.push(processItem);
                }

            });
            var processSeq = currentProcess.length + 1;
            // var nextSeq = processSeq + 1;
            // Push the process object into the array
            var processModel = {
                id: '',
                seq: '',
                subProcesses: []
            }

            // 1. Update the process id and seq
            processModel.id = processId;
            processModel.seq = processSeq;
            _this.instance.processes.push(processModel);
            // Parameters
            var subProcessId = configProcess[0].subProcesses[0]._id;
            var subProcessSeq = 1;
            _this.instance.processes.filter(function (processItem) {
                if (processItem.id == processId && processItem.seq == processSeq) {
                    subProcessSeq = processItem.subProcesses.length + 1
                }

            })
            // Call the subprocess method

            Process.subProcess(processId, processSeq, subProcessId, subProcessSeq, subprofileId, data, _this).then(function (subProcess) {
                // Generate the uuid

                var uuid = subProcess.data._id; //_this.profile + ':' + _this.app + ':' + processId + ':' + processSeq + ':' + subProcessId + ':' + subProcessSeq;
               
                // Build the sub-process reference object
                
                var groupKey = subProcess.data.groupKey;
                //TODO: Change required to move isActive to subProcess file.Remove from here
                if(subprofileId == undefined){
                    subprofileId = '';
                }
                var subProcessRef = {
                    id: subProcessId,
                    subprofileId: subprofileId,
                    seq: subProcess.data["meta-data"].subProcessInsSeq,
                    uuid: uuid,
                    groupKey: groupKey

                }

                // Add the reference to the process model
                processModel.subProcesses.push(subProcessRef);
                // Add the subProcess model to the subprocesses array
                //_this.subprocesses.push(subProcess.data);
                // _this.instance.processes.push(processModel);
                for (var index = 0; index < _this.instance.processes.length; index++) {
                    var processItem = _this.instance.processes[index];
                    if (processItem.id == processId && processItem.seq == processSeq) {
                        // Remove the current process from the array and add the updated processModel
                        _this.instance.processes.splice(index, 1, processModel)
                    }

                }

                // Process the indicator documents workflow processes updates
                var indicators = subProcess.data.indicators;
                var step = subProcess.data.step;
                Process.indicatorDocs(processId, indicators, step, _this).then(function (result) {
                    var success = util.success('Process: ' + _this.config.processes[0]._id + ' initialized successfully.', subProcessRef);
                    resolve(success);
                }, function (err) {
                    reject(err);
                });

            }, function (err) {
                _this.instance.processes = _this.instance.processes.filter(function (obj) {
                    return !(obj.id == processId && obj.seq == processSeq);
                });
                console.log(err);
                reject(err);
            });
        } catch (err) {
            reject(err);
        }

    });
};

/**
 * Workflow transition to the next step. This moves the workflow from the current process,
 * sub-process step to the next one as specified.
 *
 * @param {string} processId - the Workflow config / definition process id
 * @param {number} processSeq - the Workflow instance process seq
 * @param {string} subProcessId - the Workflow config / definition sub-process id
 * @param {number} subProcessSeq - the Workflow instance sub-process seq
 * @param {string} stepId - the Workflow config / definition step id 
 * @param {string} transitionId - the Workflow config / definition transition id
 * @param {object} data - any additional data passed in as key value pairs
 *
 * @example
 * Workflow.transition('processId', 1, 'subProcessId', 1, 'stepId', 'transitionId', { key: '', value: '' });
 *
 * @return ""
 *
 */
Workflow.prototype.transition = function (processId, processSeq, subProcessId, subProcessSeq, stepId, transitionId, data, spuuid) {
    // Re-assign this
    var _this = this;
    return new Promise(function (resolve, reject) {
        try {
            var model = JSON.xpath("/subprocesses[_id eq '" + spuuid + "']/step", app.SCOPE.workflow, {})[0];
            var stepObject = JSON.xpath("/processes[_id eq '" + processId + "']/subProcesses[_id eq '" + subProcessId + "']/steps[_id eq '" + stepId + "']", _this.config, {})[0];
            var subProcessSeq = JSON.xpath("/subprocesses[_id eq '" + spuuid + "']/meta-data/subProcessInsSeq", app.SCOPE.workflow, {})[0];

            // Update the current sub-process step data
            var update = function (type, result) {
                _this.instance.processes.filter(function (processItem) {
                    if (processItem.id == processId && processItem.seq == processSeq) {

                        processItem.subProcesses.filter(function (subProcessItem) {
                            if (subProcessItem.id == subProcessId) {

                                _this.subprocesses.filter(function (subProcessObj) {
                                    if (subProcessObj._id == spuuid) {

                                        if (type == 'step') {

                                            subProcessObj.step = result.data.step;
                                            var success = util.success(result.message, subProcessObj);

                                            resolve(success);
                                        } else if (type == 'stepComplete') {

                                            subProcessObj.step = result.data.step;
                                            subProcessObj.complete = true
                                            var success = util.success(result.message, subProcessObj.step);

                                            resolve(success);
                                        }

                                    }

                                })
                            }

                        })
                    }

                })
            }


            if (stepObject.function.task != undefined && stepObject.function.task.postActions != undefined) {


                var postActions = stepObject.function.task.postActions;
                Process.postActions(postActions, _this, spuuid).then(function (success) {
                     
                    Process.transition(processId, processSeq, subProcessId, subProcessSeq, stepId, transitionId, data, _this, spuuid, model).then(function (result) {

                        if (result.data.subProcessComplete) {

                            update('stepComplete', result);
                        } else {

                            update('step', result);
                        }

                    }, function (err) {

                        reject(err);
                    });

                }, function (err) {

                    reject(err);

                });


            } else {


                Process.transition(processId, processSeq, subProcessId, subProcessSeq, stepId, transitionId, data, _this, spuuid, model).then(function (result) {

                    if (result.data.subProcessComplete) {

                        update('stepComplete', result);
                    } else {

                        update('step', result);
                    }

                }, function (err) {

                    reject(err);
                });

            }

        } catch (err) {

            reject(err);
        }

    });
};

/**
 * Workflow assign user.
 *
 * @param {string} processId - the Workflow config / definition process id
 * @param {number} processSeq - the Workflow instance process seq
 * @param {string} subProcessId - the Workflow config / definition sub-process id
 * @param {number} subProcessSeq - the Workflow instance sub-process seq
 * @param {string} stepId - the Workflow config / definition step id
 * @param {object} user - the user id and name data
 *
 * @example ""
 *
 * @return ""
 *
 */
Workflow.prototype.assignUser = function (processId, processSeq, subProcessId, subProcessSeq, user, uuid) {
    // Re-assign the Workflow constructor instance as _this
    var _this = this;
    return new Promise(function (resolve, reject) {
        try {
            Process.assignUser(processId, processSeq, subProcessId, subProcessSeq, user, uuid, _this).then(function (result) {
                resolve(result);
            }, function (err) {
                reject(err);
            })
        } catch (err) {
            reject(err);
        }

    })
};

/**
 * Workflow task, this method executes a specific task.
 *
 * @param {string} processId - the process id to process
 * @param {object} inputData - the input data to process
 *
 * @example
 * Workflow.initialize('processId', { validDate: 'date' });
 *
 * @return ""
 *
 */
Workflow.prototype.ui = function () {
    // Re-assign the Workflow constructor instance as _this
    var _this = this;
    return {
        getProcess: function (processId, lang) {
            return new Promise(function (resolve, reject) {
                try {
                    userInterface.getProcess(processId, lang, _this).then(function (model) {
                        resolve(model);
                    }, function (err) {
                        reject(err);
                    })
                } catch (err) {
                    reject(err);
                }

            })
        }

    }

};

/**
 * Workflow task, this method executes a specific task.
 *
 * @param {object} data - the process id to process
 * @param {object} _WFInstance - the input data to process
 * * @param {string} uuid - the input data to process
 *
 * @example
 * Workflow.getNodeValue(data, _WFInstance, uuid);
 *
 * @return ""
 *
 */

Workflow.prototype.getNodeValue = function (data, uuid) {
    // Re-assign the Workflow constructor instance as _this
    var _this = this;
    return new Promise(function (resolve, reject) {
        try {
            helper.getNodeValue(data, _this, uuid).then(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
            });
        } catch (err) {
            reject(err);
        }

    })
};

/**
 * Workflow task, this method executes a specific task.
 *
 * @param {object} data - the process id to process
 * @param {object} _WFInstance - the input data to process
 *
 * @example
 * Workflow.takeAssignment(spuuid, _WFInstance);
 *
 * @return ""
 *
 */

Workflow.prototype.takeAssignment = function (spuuid) {
    // Re-assign the Workflow constructor instance as _this
    var _this = this;

    return new Promise(function (resolve, reject) {

        try {

            //Assignment are executing here
            
            var spObject = JSON.xpath("/subprocesses[_id eq '" + spuuid + "']", _this, {})[0];
            var assignee = JSON.xpath("/step/assignedTo", spObject, {})[0];
            //Pushing older record in reAssign array
            
            if(spObject.step.assignmentHistory == undefined){
                spObject.step.assignmentHistory = [];
            }
            if(assignee.userId != "" && assignee.name != ""){
                spObject.step.assignmentHistory.push(JSON.parse(JSON.stringify(assignee)));
            }
            

            
            assignee.name = LOCAL_SETTINGS.SESSION.firstName + " "+ LOCAL_SETTINGS.SESSION.lastName;
            assignee.userId = LOCAL_SETTINGS.SUBSCRIPTIONS.userId + "";
            assignee.dateTime = new Date();
            assignee.type = ASSIGNMENT_TYPE_ACCEPTANCE;
            assignee.dueDateTime = '';
            assignee.by = LOCAL_SETTINGS.SUBSCRIPTIONS.userId + "";
           

            //fetch preWorkActions here 

            var processId = JSON.xpath("/instance/processes[subProcesses/uuid eq '" + spuuid + "']/id", _this, {})[0];
            var subProcessId = JSON.xpath("/instance/processes/subProcesses[uuid eq '" + spuuid + "']/id", _this, {})[0];
            var stepId = JSON.xpath("/subprocesses[_id eq '" + spuuid + "']/step/id", _this, {})[0];
            var stepObject = JSON.xpath("/processes[_id eq '" + processId + "']/subProcesses[_id eq '" + subProcessId + "']/steps[_id eq '" + stepId + "']", _this.config, {})[0];

            if (stepObject.function.task.preWorkActions != undefined) {

                var preWorkActions = stepObject.function.task.preWorkActions;
                Process.preWorkActions(preWorkActions, _this).then(function (success) {

                    resolve(_this);

                }, function (err) {

                    reject(err);

                });

            } else {

                resolve(_this);

            }

        } catch (err) {

            reject(err);

        }

    });
};



module.exports = Workflow;
},{"./lib/helper":4,"./lib/interface":5,"./lib/process":7,"utility":8}],2:[function(require,module,exports){
'use strict';

var util = require('utility');
var nodeValue = require('./nodeValue');
var form = require('./form');
var helper = require('./helper');

var gatekeeper = new GK();

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

/**
 *  Form Module actions needs to be moved here.
 *  This actions module will be cental place to hold all functions.
 *  
 */

var community = (function () {

    return {

        createCommunity: function (_def, uuid, _WFInstance) {

            return new Promise(function (resolve, reject) {

                var workerObject = worker.getWorkerWrapper();

                workerObject._id = generateUUID();
                workerObject.communityId = app.SCOPE.getCommunityId();
                workerObject.applicationId = app.SCOPE.applicationId;
                workerObject.createdDateTime = new Date().toString();
                workerObject.senderUserId = LOCAL_SETTINGS.SUBSCRIPTIONS.userId;
                workerObject.profileId = _WFInstance.profile;
                workerObject.channels.push("dataRegistry");
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
                worker.send(workerObject).then(function (workerSuccess) {

                    var success = util.success('Worker processed successfully.', workerSuccess);
                    resolve(success);

                }, function (workerFail) {
                    reject(workerFail);
                });
            });
        },
        userJoinCommunity: function (_def, uuid, _WFInstance) {

            return new Promise(function (resolve, reject) {

            });

        },
        releaseAdoptedApplication: function (_def, uuid, _WFInstance) {

            return new Promise(function (resolve, reject) {

                var workerObject = worker.getWorkerWrapper();

                workerObject._id = generateUUID();
                workerObject.communityId = app.SCOPE.getCommunityId();
                workerObject.applicationId = app.SCOPE.applicationId;
                workerObject.createdDateTime = new Date().toString();
                workerObject.senderUserId = LOCAL_SETTINGS.SUBSCRIPTIONS.userId;
                workerObject.profileId = _WFInstance.profile;
                workerObject.channels.push("dataRegistry");
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
                worker.send(workerObject).then(function (workerSuccess) {

                    var success = util.success('Worker processes successfully.', workerSuccess);
                    resolve(success);

                }, function (workerFail) {
                    reject(workerFail);
                });
            });
        }

    }

})();

var application = (function () {

    return {

        createAppDefinition: function (_def, uuid, _WFInstance) {

            return new Promise(function (resolve, reject) {

                var workerObject = worker.getWorkerWrapper();

                workerObject._id = generateUUID();
                workerObject.communityId = app.SCOPE.getCommunityId();
                workerObject.applicationId = app.SCOPE.applicationId;
                workerObject.createdDateTime = new Date().toString();
                workerObject.senderUserId = LOCAL_SETTINGS.SUBSCRIPTIONS.userId;
                workerObject.profileId = _WFInstance.profile;
                workerObject.channels.push("dataRegistry");
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
                worker.send(workerObject).then(function (workerSuccess) {

                    var success = util.success('Worker processes successfully.', workerSuccess);
                    resolve(success);

                }, function (workerFail) {
                    reject(workerFail);
                });
            });

        },

        buildApplication: function (_def, uuid, _WFInstance) {

            return new Promise(function (resolve, reject) {

                var workerObject = worker.getWorkerWrapper();

                workerObject._id = generateUUID();
                workerObject.communityId = app.SCOPE.getCommunityId();
                workerObject.applicationId = app.SCOPE.applicationId;
                workerObject.createdDateTime = new Date().toString();
                workerObject.senderUserId = LOCAL_SETTINGS.SUBSCRIPTIONS.userId;
                workerObject.profileId = _WFInstance.profile;
                workerObject.channels.push("dataRegistry");
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
                worker.send(workerObject).then(function (workerSuccess) {

                    var success = util.success('Worker processes successfully.', workerSuccess);
                    resolve(success);

                }, function (workerFail) {
                    reject(workerFail);
                });
            });

        },

        applicationAdoption: function (_def, uuid, _WFInstance) {

            return new Promise(function (resolve, reject) {

                var workerObject = worker.getWorkerWrapper();

                workerObject._id = generateUUID();
                workerObject.communityId = app.SCOPE.getCommunityId();
                workerObject.applicationId = app.SCOPE.applicationId;
                workerObject.createdDateTime = new Date().toString();
                workerObject.senderUserId = LOCAL_SETTINGS.SUBSCRIPTIONS.userId;
                workerObject.profileId = _WFInstance.profile;
                workerObject.channels.push("dataRegistry");
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
                worker.send(workerObject).then(function (workerSuccess) {

                    var success = util.success('Worker processes successfully.', workerSuccess);
                    resolve(success);

                }, function (workerFail) {
                    reject(workerFail);
                });
            });

        },

        createTaxonomy: function (_def, uuid, _WFInstance) {

            return new Promise(function (resolve, reject) {

                var workerObject = worker.getWorkerWrapper();

                workerObject._id = generateUUID();
                workerObject.communityId = app.SCOPE.getCommunityId();
                workerObject.applicationId = app.SCOPE.applicationId;
                workerObject.createdDateTime = new Date().toString();
                workerObject.senderUserId = LOCAL_SETTINGS.SUBSCRIPTIONS.userId;
                workerObject.profileId = _WFInstance.profile;
                workerObject.channels.push("dataRegistry");
                var taxonomyUUID = JSON.xpath("/subprocesses[_id eq '" + uuid + "']/indicators[id eq 'Taxonomy']/instances[1]/uuid", _WFInstance, {})[0];

                var action = {
                    "createTaxonomy": {
                        "taxonomyUUID": taxonomyUUID
                    }

                };

                workerObject.action = action;
                worker.send(workerObject).then(function (workerSuccess) {

                    var success = util.success('Worker processes successfully.', workerSuccess);
                    resolve(success);

                }, function (workerFail) {
                    reject(workerFail);
                });
            });

        }

    }

})();



var performance = (function () {

    return {

        create: function (_def, uuid, _WFInstance) {

            return new Promise(function (resolve, reject) {

                var workerObject = worker.getWorkerWrapper();

                workerObject._id = generateUUID();
                workerObject.communityId = app.SCOPE.getCommunityId();
                workerObject.applicationId = app.SCOPE.applicationId;
                workerObject.createdDateTime = new Date().toString();
                workerObject.senderUserId = LOCAL_SETTINGS.SUBSCRIPTIONS.userId;
                workerObject.profileId = _WFInstance.profile;
                workerObject.channels.push("createPlan");
                var uuidCommunity = JSON.xpath("/indicators[category/term eq 'plan']/_id", _WFInstance, {})[0];
                var action = {
                    "createPlan": {
                        "planUUID": uuidCommunity
                    }

                };

                workerObject.action = action;
                worker.send(workerObject).then(function (workerSuccess) {

                    var success = util.success('Worker processed successfully.', workerSuccess);
                    resolve(success);

                }, function (workerFail) {
                    reject(workerFail);
                });
            });
        },

        configureNode: function (_def, uuid, _WFInstance) {

            return new Promise(function (resolve, reject) {

                var workerObject = worker.getWorkerWrapper();

                workerObject._id = generateUUID();
                workerObject.communityId = app.SCOPE.getCommunityId();
                workerObject.applicationId = app.SCOPE.applicationId;
                workerObject.createdDateTime = new Date().toString();
                workerObject.senderUserId = LOCAL_SETTINGS.SUBSCRIPTIONS.userId;
                workerObject.profileId = _WFInstance.profile;
                workerObject.channels.push("configureNode");
                var uuidNodeInSubProcess = JSON.xpath("/subprocesses[_id eq '" + uuid + "']/indicators[id eq 'node']/instances[1]/uuid", _WFInstance, {})[0];

                var action = {
                    "configureNode": {
                        "nodeUUID": uuidNodeInSubProcess
                    }

                };

                workerObject.action = action;
                worker.send(workerObject).then(function (workerSuccess) {

                    var success = util.success('Worker processed successfully.', workerSuccess);
                    resolve(success);

                }, function (workerFail) {
                    reject(workerFail);
                });
            });
        },
        unlockPeriod: function (_def, uuid, _WFInstance) {

            return new Promise(function (resolve, reject) {

                var subprocessObject = JSON.xpath("/subprocesses[_id eq '" + uuid + "']", _WFInstance, {})[0];

                // message from step : TODO 

                var entryUUID = JSON.xpath("/indicators[id eq '" + PERIOD_SET_ID + "']/instances/uuid", subprocessObject, {})[0];
                var enddate = subprocessObject.dates.valid;

                library.unlockPeriod(entryUUID, enddate, uuid).then(function (data) {

                    var success = util.success('Unlock period.', data);
                    resolve(success);



                }, function (error) {
                    reject(error);
                });






            });
        },

        setModelStatus: function (_def, uuid, _WFInstance) {

            return new Promise(function (resolve, reject) {


                var subprocessObject = JSON.xpath("/subprocesses[_id eq '" + uuid + "']", _WFInstance, {})[0];
                var entryUUID = JSON.xpath("/indicators[id eq '" + PERIOD_SET_ID + "']/instances/uuid", subprocessObject, {})[0];
                var enddate = subprocessObject.dates.valid;

                var statusi18nLabel = JSON.xpath("/label", _def , {})[0];
                var status = helper.getLanguageMessage(statusi18nLabel);


                library.setPeriodStatus(entryUUID, enddate, status, uuid).then(function (data) {

                    var success = util.success('setModelStatus', data);
                    resolve(success);


                }, function (error) {
                    reject(error);
                });






            });
        },

       
        lockPerformanceModel: function (_def, uuid, _WFInstance) {

            return new Promise(function (resolve, reject) {

                var subprocessObject = JSON.xpath("/subprocesses[_id eq '" + uuid + "']", _WFInstance, {})[0];

                var entryUUID = JSON.xpath("/indicators[id eq '" + PERFORMANCE_SET_ID + "']/instances/uuid", subprocessObject, {})[0];
                var enddate = subprocessObject.dates.valid;

                library.lockPerformanceModel(entryUUID, enddate, uuid).then(function (data) {

                    var success = util.success('Lock performance model.', data);
                    resolve(success);


                }, function (error) {
                    reject(error);
                });






            });
        }

    }

})();

var sdo = (function () {

    return {

        create: function (_def, uuid, _WFInstance) {

            return new Promise(function (resolve, reject) {

                var workerObject = worker.getWorkerWrapper();

                workerObject._id = generateUUID();
                workerObject.communityId = app.SCOPE.getCommunityId();
                workerObject.applicationId = app.SCOPE.applicationId;
                workerObject.createdDateTime = new Date().toString();
                workerObject.senderUserId = LOCAL_SETTINGS.SUBSCRIPTIONS.userId;
                workerObject.profileId = _WFInstance.profile;
                workerObject.channels.push("dataRegistry");
                var sdoUUID = JSON.xpath("/subprocesses[_id eq '" + uuid + "']/indicators[id eq 'SDO']/instances[1]/uuid", _WFInstance, {})[0];

                var action = {
                    "createSDO": {
                        "sdoUUID": sdoUUID
                    }

                };

                workerObject.action = action;
                worker.send(workerObject).then(function (workerSuccess) {

                    var success = util.success('Worker processes successfully.', workerSuccess);
                    resolve(success);

                }, function (workerFail) {
                    reject(workerFail);
                });
            });

        }

    }

})();

var taxonomy = (function () {

    return {

        create: function (_def, uuid, _WFInstance) {

            return new Promise(function (resolve, reject) {

                var workerObject = worker.getWorkerWrapper();

                workerObject._id = generateUUID();
                workerObject.communityId = app.SCOPE.getCommunityId();
                workerObject.applicationId = app.SCOPE.applicationId;
                workerObject.createdDateTime = new Date().toString();
                workerObject.senderUserId = LOCAL_SETTINGS.SUBSCRIPTIONS.userId;
                workerObject.profileId = _WFInstance.profile;
                workerObject.channels.push("dataRegistry");
                var taxonomyUUID = JSON.xpath("/subprocesses[_id eq '" + uuid + "']/indicators[id eq 'Taxonomy']/instances[1]/uuid", _WFInstance, {})[0];

                var action = {
                    "createTaxonomy": {
                        "taxonomyUUID": taxonomyUUID
                    }

                };

                workerObject.action = action;
                worker.send(workerObject).then(function (workerSuccess) {

                    var success = util.success('Worker processes successfully.', workerSuccess);
                    resolve(success);

                }, function (workerFail) {
                    reject(workerFail);
                });
            });

        }

    }

})();

var subProcessInstance = (function () {

    return {

        setTitle: function (_def, uuid, dataValue, _WFInstance) {

            return new Promise(function (resolve, reject) {

                var spProcessObject = JSON.xpath("/subprocesses[_id eq '" + uuid + "']", app.SCOPE.workflow, {})[0];
                spProcessObject.label = dataValue;

                var itemsToProcess = 1;
                var stuff = [];
                var obj = {};

                obj.model = _WFInstance.subprocesses;
                stuff.push(obj);
                var success = util.success('Subprocess setTitle success.', _WFInstance.subprocesses);
                resolve(success);
            });

        },

        setValidDate: function (_def, uuid, dataValue, _WFInstance) {

            return new Promise(function (resolve, reject) {

                var spProcessObject = JSON.xpath("/subprocesses[_id eq '" + uuid + "']", app.SCOPE.workflow, {})[0];
                spProcessObject.dates.valid = dataValue;

                var itemsToProcess = 1;
                var stuff = [];
                var obj = {};

                obj.model = spProcessObject;
                stuff.push(obj);

                var success = util.success('valid date set.', _WFInstance.subprocesses);
                resolve(success);
            });

        }

    }

})();

var variables = (function () {

    return {

        setVariable: function (setVariable, _WFInstance, uuid) {

            return new Promise(function (resolve, reject) {

                helper.getNodeValue(setVariable.data, _WFInstance, uuid).then(function (dataValue) {


                    var scope = setVariable.scope;
                    var variableName = setVariable.name;
                    var variableType = setVariable.variableType;

                    var validDate = JSON.xpath("/subprocesses[_id eq '" + uuid + "']/dates/valid", _WFInstance, {})[0];

                    switch (scope) {
                        case 'profile':

                            var profileId = _WFInstance.profile;
                            var profileVariableFileName = profileId + ':variables';
                            dao.get(profileVariableFileName).then(function (file) {

                                if (variableType == 'periodic') {

                                    // TODO: Overwrite the existing variable in case where same variable is assigned at multiple steps.

                                    var processObj = JSON.xpath("/instance/processes[subProcesses/uuid eq '" + uuid + "']", _WFInstance, {})[0];
                                    var seq = processObj.seq;
                                    var obj = {
                                        "subProcessUUID": uuid,
                                        "user": {
                                            "userName": LOCAL_SETTINGS.SUBSCRIPTIONS.username,
                                            "userId": LOCAL_SETTINGS.SUBSCRIPTIONS.userProfileId
                                        },
                                        "seq": seq,
                                        "validDate": validDate,
                                        "value": dataValue
                                    }

                                    if(file[variableName] != undefined){
                                        eval('file.' + variableName + '.push(obj)');
                                    } else {
                                        file[variableName] = [obj];
                                    }   

                                } else {
                                    file[variableName] = dataValue;
                                }

                                dao.upsert(file).then(function (data) {
                                    resolve("Variable set successfully");
                                }).catch(function (error) {
                                    reject("Failed to set Variable");
                                });

                            }).catch(function (error) {

                                var file = {
                                    "_id": profileVariableFileName
                                }
                                file.channels = app.profile.channels;

                                if (variableType == 'periodic') {
                                    var processObj = JSON.xpath("/instance/processes[subProcesses/uuid eq '" + uuid + "']", _WFInstance, {})[0];
                                    var seq = processObj.seq;
                                    file[variableName] = [{
                                        "subProcessUUID": uuid,
                                        "user": {
                                            "userName": LOCAL_SETTINGS.SUBSCRIPTIONS.username,
                                            "userId": LOCAL_SETTINGS.SUBSCRIPTIONS.userProfileId
                                        },
                                        "seq": seq,
                                        "validDate": validDate,
                                        "value": dataValue
                                    }];
                                } else {
                                    file[variableName] = dataValue;
                                }

                                dao.upsert(file).then(function (data) {
                                    resolve("Variable set successfully");
                                }).catch(function (error) {
                                    reject("Failed to set Variable");
                                });

                            });



                            break;
                        case 'subProcessInstance':

                            resolve("not implemented");

                            break;
                        case 'step':

                            resolve("not implemented");

                            break;

                       
                        case 'subProfileSubProcessInstance':

                            var subProfileId = app.profile.subprofileId;
                            var subProfileVariableFileName = subProfileId + ':variables';
                            dao.get(subProfileVariableFileName).then(function (file) {

                                if (variableType == 'periodic') {

                                    var part = library.getSubprofileSubprocessIds();
                                    var seq = JSON.xpath("count(/subprocesses[_id eq '" + uuid + "']/preceding-sibling::node()[id = /subprocesses[_id eq '" + uuid + "']/id and _id = /subprocesses[_id = "+part+"]/_id])", _WFInstance, {})[0] + 1;                   


                                    var obj = {
                                        "subProcessUUID": uuid,
                                        "user": {
                                            "userName": LOCAL_SETTINGS.SUBSCRIPTIONS.username,
                                            "userId": LOCAL_SETTINGS.SUBSCRIPTIONS.userProfileId
                                        },
                                        "seq": seq,
                                        "validDate": validDate,
                                        "value": dataValue
                                    }

                                    if(file[variableName] != undefined){
                                        eval('file.' + variableName + '.push(obj)');
                                    } else {
                                        file[variableName] = [obj];
                                    }   

                                } else {
                                    file[variableName] = dataValue;
                                }

                                dao.upsert(file).then(function (data) {
                                    resolve("Variable at subprofile set successfully");
                                }).catch(function (error) {
                                    reject("Failed to set Variable at subprofile");
                                });

                            }).catch(function (error) {

                                var file = {
                                    "_id": subProfileVariableFileName
                                }
                                file.channels = app.profile.channels;

                                if (variableType == 'periodic') {
                                    //var processObj = JSON.xpath("/instance/processes[subProcesses/uuid eq '" + uuid + "']", _WFInstance, {})[0];
                                    //var seq = processObj.seq;

                                    //var seq = JSON.xpath("count(/subprocesses[_id eq '" + uuid + "']/preceding-sibling::node()[id = /subprocesses[_id eq '" + uuid + "']/id and id = /subprocesses[_id = /instance/processes/subProcesses[subprofileId eq '" + subProfileId + "']/uuid]/_id])", _WFInstance, {})[0] + 1;
                                    var part = library.getSubprofileSubprocessIds();
                                    var seq = JSON.xpath("count(/subprocesses[_id eq '" + uuid + "']/preceding-sibling::node()[id = /subprocesses[_id eq '" + uuid + "']/id and _id = /subprocesses[_id = "+part+"]/_id])", _WFInstance, {})[0] + 1;                   



                                    file[variableName] = [{
                                        "subProcessUUID": uuid,
                                        "user": {
                                            "userName": LOCAL_SETTINGS.SUBSCRIPTIONS.username,
                                            "userId": LOCAL_SETTINGS.SUBSCRIPTIONS.userProfileId
                                        },
                                        "seq": seq,
                                        "validDate": validDate,
                                        "value": dataValue
                                    }];
                                } else {
                                    file[variableName] = dataValue;
                                }

                                dao.upsert(file).then(function (data) {
                                    resolve("Variable at subprofile set successfully");
                                }).catch(function (error) {
                                    reject("Failed to set Variable at subprofile");
                                });
                                

                            });

                            break;
                        default:
                            break;
                    }

                }, function (err) {
                    reject("getNodeValue value not found.");
                });



            });

        }

    }

})();

var notification = (function () {

    return {

        sendNotificationWorker: function (notification, _WFInstance, uuid) {

            return new Promise(function (resolve, reject) {


                var getRecipients = function(notification) {

                    return new Promise(function (resolve, reject) {
                        var recipients = {};
                        if(notification.recipients.role != undefined){

                            recipients.role = notification.recipients.role;
                            resolve(recipients);

                        } else if(notification.recipients.profileRole != undefined) {

                            recipients.profileRole = {};
                            recipients.profileRole.role = notification.recipients.profileRole.role;
                            recipients.profileRole.profile = notification.recipients.profileRole.profile;
                            resolve(recipients);
                            
                        } else if(notification.recipients.subProfileRole != undefined) {

                            recipients.subProfileRole = {};
                            recipients.subProfileRole.role = notification.recipients.subProfileRole.role;
                            recipients.subProfileRole.subProfileCategory = notification.recipients.subProfileRole.subProfileCategory;
                            recipients.subProfileRole.profile = notification.recipients.subProfileRole.profile;
                            resolve(recipients);

                        } else if(notification.recipients.function != undefined){

                            recipients.function = {};
                            recipients.function.users = {};

                            helper.getNodeValue(notification.recipients.function.users, _WFInstance, uuid).then(function (dataValue) {

                                recipients.function.users =  dataValue;
                                resolve(recipients);

                            }, function (err) {
                                rej(err);
                            });
                            
                            
                                                 

                        }
                    });
                }

                var workerObject = worker.getWorkerWrapper();

                workerObject._id = generateUUID();
                workerObject.applicationId = app.SCOPE.applicationId;
                workerObject.communityId = app.SCOPE.getCommunityId();
                workerObject.createdDateTime = new Date().toString();
                workerObject.senderUserId = LOCAL_SETTINGS.SUBSCRIPTIONS.userId;
                workerObject.profileId = _WFInstance.profile;
                workerObject.messageType = "notification";
                workerObject.channels.push("notification");
                var subProfileId = JSON.xpath("/subprocesses[_id eq '"+ uuid +"']/meta-data/subprofileId", _WFInstance ,{})[0];
               
                var pathArray = window.location.pathname.split( '/' );
                var baseURL = window.location.protocol + "//" + window.location.host + "/" + pathArray[1];

                var action = {
                    "notification": {
                        "message": {

                        },
                        "messageType":"",
                        "meta-data": {
                            "applicationId": _WFInstance.app,
                            "communityId": _WFInstance.communityId,
                            "profileId": _WFInstance.profile,
                            "subProcessUUID": uuid,
                            "subProfileId": subProfileId
                        },
                        "notificationType":"",
                        "priority":"",
                        "recipients": {

                        },
                        "url":baseURL,
                        "keys":{
                            "profile":{
                                "name": "",
                                "id":""
                            },
                            "community":{
                                "name":"",
                                "id":""
                            },
                            "application":{
                                "name":"",
                                "id":""
                            },
                            "currentUser":{
                                "name":"",
                                "id":""
                            },
                            "subProcess":{
                                "name":"",
                                "id":""
                            }
                        }
                    }
                };

                /**
                * 
                Keys message 
                */

                action.notification.keys.profile.name = app.profile.title;
                action.notification.keys.profile.id = app.profile._id;

                action.notification.keys.community.name = app.getNameByLang(LOCAL_SETTINGS.COMMUNITY_CONFIG.communityName);
                action.notification.keys.community.id = LOCAL_SETTINGS.COMMUNITY_CONFIG.communityId;

                var application = JSON.xpath("/applications[appId eq '" + app.SCOPE.applicationId + "']", LOCAL_SETTINGS.COMMUNITY_CONFIG, {})[0];

                action.notification.keys.application.name = app.getNameByLang(application.name);
                action.notification.keys.application.id = application.appId;

                action.notification.keys.currentUser.name = LOCAL_SETTINGS.SESSION.firstName + " " + LOCAL_SETTINGS.SESSION.lastName;
                action.notification.keys.currentUser.id = LOCAL_SETTINGS.SUBSCRIPTIONS.userId;


                action.notification.keys.subProcess.name = JSON.xpath("/subprocesses[_id eq '"+ uuid +"']/label", _WFInstance , {})[0];
                action.notification.keys.subProcess.id = uuid;

                /**
                * 
                Worker message 
                */
                action.notification.message.default = notification.message.default;
                action.notification.message.title = notification.message.title;

                if(notification.message.rtf != undefined){
                    action.notification.message.rtf = {};
                    if(notification.message.rtf.template!= undefined){
                        action.notification.message.rtf.template = notification.message.rtf.template;
                    } else if (notification.message.rtf.markup!= undefined){
                        action.notification.message.rtf.markup = notification.message.rtf.markup;
                    }
                }
                /**
                * 
                Worker messageType 
                */
                action.notification.messageType = notification.messageType;
                /**
                * 
                Worker notificationType 
                */
                action.notification.notificationType = notification.notificationType;
                /**
                * 
                Worker priority 
                */
                action.notification.priority = notification.priority;
                /**
                * 
                Worker notificationAction if exists 
                */

                if(notification.notificationAction != undefined){

                    action.notification.notificationAction = {};
                    action.notification.notificationAction.label = notification.notificationAction.label;
                    if(notification.notificationAction.action.URI != undefined){
                         
                         action.notification.notificationAction.action = {};
                         action.notification.notificationAction.action.URI = notification.notificationAction.action.URI;
                         
                    } else if(notification.notificationAction.action.goto != undefined) {
                         
                         action.notification.notificationAction.action = {};
                         action.notification.notificationAction.action.goto = notification.notificationAction.action.goto;

                    }
                }
               


                 /**
                * 
                Worker recipients
                */
                
                getRecipients(notification).then(function(recipient){
                    action.notification.recipients = recipient;
                    workerObject.action = action;
                    worker.send(workerObject).then(function (workerSuccess) {
                        console.log(workerObject);
                        var success = util.success('Notification Worker processes successfully.', workerSuccess);
                        resolve(success);

                    }, function (workerFail) {
                        resolve(workerFail);
                    });


                }).catch(function(err){

                    console.log("Notification - getRecipients failed with error "+ err);
                    reject(err);


                });
               
            });

        },


        reAssignmentNotification: function (notification, _WFInstance, uuid, user) {

            return new Promise(function (resolve, reject) {


                var getRecipients = function(userObj) {

                    return new Promise(function (resolve, reject) {
                        var recipients = {};
                        recipients.function = {};
                        recipients.function.users = {};
                        recipients.function.users =  userObj.id;
                        resolve(recipients);
                    });
                }

                var workerObject = worker.getWorkerWrapper();

                workerObject._id = generateUUID();
                workerObject.applicationId = app.SCOPE.applicationId;
                workerObject.communityId = app.SCOPE.getCommunityId();
                workerObject.createdDateTime = new Date().toString();
                workerObject.senderUserId = LOCAL_SETTINGS.SUBSCRIPTIONS.userId;
                workerObject.profileId = _WFInstance.profile;
                workerObject.messageType = "notification";
                workerObject.channels.push("notification");
                var subProfileId = JSON.xpath("/subprocesses[_id eq '"+ uuid +"']/meta-data/subprofileId", _WFInstance ,{})[0];

                var pathArray = window.location.pathname.split( '/' );
                var baseURL = window.location.protocol + "//" + window.location.host + "/" + pathArray[1];


                var action = {
                    "notification": {
                        "message": {
                            "rtf":{

                            }
                        },
                        "messageType":"",
                        "meta-data": {
                            "applicationId": _WFInstance.app,
                            "communityId": _WFInstance.communityId,
                            "profileId": _WFInstance.profile,
                            "subProcessUUID": uuid,
                            "subProfileId": subProfileId
                        },
                        "notificationType":"workflow",
                        "priority":"",
                        "recipients": {

                        },
                        "url":baseURL,
                        "keys":{
                            "profile":{
                                "name": "",
                                "id":""
                            },
                            "community":{
                                "name":"",
                                "id":""
                            },
                            "application":{
                                "name":"",
                                "id":""
                            },
                            "currentUser":{
                                "name":"",
                                "id":""
                            },
                            "subProcess":{
                                "name":"",
                                "id":""
                            }
                        }
                    }
                };

                /**
                * 
                Keys message 
                */

                action.notification.keys.profile.name = app.profile.title;
                action.notification.keys.profile.id = app.profile._id;

                action.notification.keys.community.name = app.getNameByLang(LOCAL_SETTINGS.COMMUNITY_CONFIG.communityName);
                action.notification.keys.community.id = LOCAL_SETTINGS.COMMUNITY_CONFIG.communityId;

                var application = JSON.xpath("/applications[appId eq '" + app.SCOPE.applicationId + "']", LOCAL_SETTINGS.COMMUNITY_CONFIG, {})[0];

                action.notification.keys.application.name = app.getNameByLang(application.name);
                action.notification.keys.application.id = application.appId;

                action.notification.keys.currentUser.name = LOCAL_SETTINGS.SESSION.firstName + " " + LOCAL_SETTINGS.SESSION.lastName;
                action.notification.keys.currentUser.id = LOCAL_SETTINGS.SUBSCRIPTIONS.userId;


                action.notification.keys.subProcess.name = JSON.xpath("/subprocesses[_id eq '"+ uuid +"']/label", _WFInstance , {})[0];
                action.notification.keys.subProcess.id = uuid;

                /**
                * 
                Worker message 
                */
                action.notification.message.default = "";
                action.notification.message.title = notification.reAssignment.title;

                action.notification.message.rtf.markup = notification.reAssignment.message;
                /**
                * 
                Worker messageType 
                */
                action.notification.messageType = notification.reAssignment.messageType;
                

                /**
                * 
                Worker priority 
                */
                action.notification.priority = notification.reAssignment.priority;
                /**
                * 
                Worker notificationAction if exists 
                */

                if(notification.reAssignment.notificationAction != undefined){

                    action.notification.notificationAction = {};
                    action.notification.notificationAction.label = notification.reAssignment.notificationAction.label;
                    if(notification.reAssignment.notificationAction.action.URI != undefined){
                         
                         action.notification.notificationAction.action = {};
                         action.notification.notificationAction.action.URI = notification.reAssignment.notificationAction.action.URI;
                         
                    } else if(notification.reAssignment.notificationAction.action.goto != undefined) {
                         
                         action.notification.notificationAction.action = {};
                         action.notification.notificationAction.action.goto = notification.reAssignment.notificationAction.action.goto;

                    }
                }
               


                 /**
                * 
                Worker recipients
                */
                
                getRecipients(user).then(function(recipient){
                    action.notification.recipients = recipient;
                    workerObject.action = action;
                    worker.send(workerObject).then(function (workerSuccess) {
                        console.log(workerObject);
                        var success = util.success('Notification Worker processes successfully for reassignment.', workerSuccess);
                        resolve(success);

                    }, function (workerFail) {
                        resolve(workerFail);
                    });


                }).catch(function(err){

                    console.log("Notification - getRecipients failed with error "+ err);
                    reject(err);


                });
               
            });

        },

        assignmentNotification: function (notification, _WFInstance, uuid, user) {

            return new Promise(function (resolve, reject) {


                var getRecipients = function(userObj) {

                    return new Promise(function (resolve, reject) {
                        var recipients = {};
                        recipients.function = {};
                        recipients.function.users = {};
                        recipients.function.users =  userObj.id;
                        resolve(recipients);
                    });
                }

                var workerObject = worker.getWorkerWrapper();

                workerObject._id = generateUUID();
                workerObject.applicationId = app.SCOPE.applicationId;
                workerObject.communityId = app.SCOPE.getCommunityId();
                workerObject.createdDateTime = new Date().toString();
                workerObject.senderUserId = LOCAL_SETTINGS.SUBSCRIPTIONS.userId;
                workerObject.profileId = _WFInstance.profile;
                workerObject.messageType = "notification";
                workerObject.channels.push("notification");
                var subProfileId = JSON.xpath("/subprocesses[_id eq '"+ uuid +"']/meta-data/subprofileId", _WFInstance ,{})[0];

                var pathArray = window.location.pathname.split( '/' );
                var baseURL = window.location.protocol + "//" + window.location.host + "/" + pathArray[1];


                var action = {
                    "notification": {
                        "message": {
                            "rtf":{

                            }
                        },
                        "messageType":"",
                        "meta-data": {
                            "applicationId": _WFInstance.app,
                            "communityId": _WFInstance.communityId,
                            "profileId": _WFInstance.profile,
                            "subProcessUUID": uuid,
                            "subProfileId": subProfileId
                        },
                        "notificationType":"workflow",
                        "priority":"",
                        "recipients": {

                        },
                        "url":baseURL,
                        "keys":{
                            "profile":{
                                "name": "",
                                "id":""
                            },
                            "community":{
                                "name":"",
                                "id":""
                            },
                            "application":{
                                "name":"",
                                "id":""
                            },
                            "currentUser":{
                                "name":"",
                                "id":""
                            },
                            "subProcess":{
                                "name":"",
                                "id":""
                            }
                        }
                    }
                };

                /**
                * 
                Keys message 
                */

                action.notification.keys.profile.name = app.profile.title;
                action.notification.keys.profile.id = app.profile._id;

                action.notification.keys.community.name = app.getNameByLang(LOCAL_SETTINGS.COMMUNITY_CONFIG.communityName);
                action.notification.keys.community.id = LOCAL_SETTINGS.COMMUNITY_CONFIG.communityId;

                var application = JSON.xpath("/applications[appId eq '" + app.SCOPE.applicationId + "']", LOCAL_SETTINGS.COMMUNITY_CONFIG, {})[0];

                action.notification.keys.application.name = app.getNameByLang(application.name);
                action.notification.keys.application.id = application.appId;

                action.notification.keys.currentUser.name = LOCAL_SETTINGS.SESSION.firstName + " " + LOCAL_SETTINGS.SESSION.lastName;
                action.notification.keys.currentUser.id = LOCAL_SETTINGS.SUBSCRIPTIONS.userId;


                action.notification.keys.subProcess.name = JSON.xpath("/subprocesses[_id eq '"+ uuid +"']/label", _WFInstance , {})[0];
                action.notification.keys.subProcess.id = uuid;

                /**
                * 
                Worker message 
                */
                action.notification.message.default = "";
                action.notification.message.title = notification.assignment.title;

                action.notification.message.rtf.markup = notification.assignment.message;
                /**
                * 
                Worker messageType 
                */
                action.notification.messageType = notification.assignment.messageType;
                

                /**
                * 
                Worker priority 
                */
                action.notification.priority = notification.assignment.priority;
                /**
                * 
                Worker notificationAction if exists 
                */

                if(notification.assignment.notificationAction != undefined){

                    action.notification.notificationAction = {};
                    action.notification.notificationAction.label = notification.assignment.notificationAction.label;
                    if(notification.assignment.notificationAction.action.URI != undefined){
                         
                         action.notification.notificationAction.action = {};
                         action.notification.notificationAction.action.URI = notification.assignment.notificationAction.action.URI;
                         
                    } else if(notification.assignment.notificationAction.action.goto != undefined) {
                         
                         action.notification.notificationAction.action = {};
                         action.notification.notificationAction.action.goto = notification.assignment.notificationAction.action.goto;

                    }
                }
               


                 /**
                * 
                Worker recipients
                */
                
                getRecipients(user).then(function(recipient){
                    action.notification.recipients = recipient;
                    workerObject.action = action;
                    worker.send(workerObject).then(function (workerSuccess) {
                        console.log(workerObject);
                        var success = util.success('Notification Worker processes successfully for assignment.', workerSuccess);
                        resolve(success);

                    }, function (workerFail) {
                        resolve(workerFail);
                    });


                }).catch(function(err){

                    console.log("Notification - getRecipients failed with error "+ err);
                    reject(err);


                });
               
            });

        },

        acceptanceNotification: function (notification, _WFInstance, uuid, role) {

            return new Promise(function (resolve, reject) {


                var getRoles = function(role) {

                    return new Promise(function (resolve, reject) {
                        var recipients = {};
                        recipients.role = role;
                        resolve(recipients);
                    });
                }

                var workerObject = worker.getWorkerWrapper();

                workerObject._id = generateUUID();
                workerObject.applicationId = app.SCOPE.applicationId;
                workerObject.communityId = app.SCOPE.getCommunityId();
                workerObject.createdDateTime = new Date().toString();
                workerObject.senderUserId = LOCAL_SETTINGS.SUBSCRIPTIONS.userId;
                workerObject.profileId = _WFInstance.profile;
                workerObject.messageType = "notification";
                workerObject.channels.push("notification");
                var subProfileId = JSON.xpath("/subprocesses[_id eq '"+ uuid +"']/meta-data/subprofileId", _WFInstance ,{})[0];

                var pathArray = window.location.pathname.split( '/' );
                var baseURL = window.location.protocol + "//" + window.location.host + "/" + pathArray[1];


                var action = {
                    "notification": {
                        "message": {
                            "rtf":{

                            }
                        },
                        "messageType":"",
                        "meta-data": {
                            "applicationId": _WFInstance.app,
                            "communityId": _WFInstance.communityId,
                            "profileId": _WFInstance.profile,
                            "subProcessUUID": uuid,
                            "subProfileId": subProfileId
                        },
                        "notificationType":"workflow",
                        "priority":"",
                        "recipients": {

                        },
                        "url":baseURL,
                        "keys":{
                            "profile":{
                                "name": "",
                                "id":""
                            },
                            "community":{
                                "name":"",
                                "id":""
                            },
                            "application":{
                                "name":"",
                                "id":""
                            },
                            "currentUser":{
                                "name":"",
                                "id":""
                            },
                            "subProcess":{
                                "name":"",
                                "id":""
                            }
                        }
                    }
                };

                /**
                * 
                Keys message 
                */

                action.notification.keys.profile.name = app.profile.title;
                action.notification.keys.profile.id = app.profile._id;

                action.notification.keys.community.name = app.getNameByLang(LOCAL_SETTINGS.COMMUNITY_CONFIG.communityName);
                action.notification.keys.community.id = LOCAL_SETTINGS.COMMUNITY_CONFIG.communityId;

                var application = JSON.xpath("/applications[appId eq '" + app.SCOPE.applicationId + "']", LOCAL_SETTINGS.COMMUNITY_CONFIG, {})[0];

                action.notification.keys.application.name = app.getNameByLang(application.name);
                action.notification.keys.application.id = application.appId;

                action.notification.keys.currentUser.name = LOCAL_SETTINGS.SESSION.firstName + " " + LOCAL_SETTINGS.SESSION.lastName;
                action.notification.keys.currentUser.id = LOCAL_SETTINGS.SUBSCRIPTIONS.userId;


                action.notification.keys.subProcess.name = JSON.xpath("/subprocesses[_id eq '"+ uuid +"']/label", _WFInstance , {})[0];
                action.notification.keys.subProcess.id = uuid;

                /**
                * 
                Worker message 
                */
                action.notification.message.default = "";
                action.notification.message.title = notification.assignmentAcceptance.title;

                action.notification.message.rtf.markup = notification.assignmentAcceptance.message;
                /**
                * 
                Worker messageType 
                */
                action.notification.messageType = notification.assignmentAcceptance.messageType;
                

                /**
                * 
                Worker priority 
                */
                action.notification.priority = notification.assignmentAcceptance.priority;
                /**
                * 
                Worker notificationAction if exists 
                */

                if(notification.assignmentAcceptance.notificationAction != undefined){

                    action.notification.notificationAction = {};
                    action.notification.notificationAction.label = notification.assignmentAcceptance.notificationAction.label;
                    if(notification.assignmentAcceptance.notificationAction.action.URI != undefined){
                         
                         action.notification.notificationAction.action = {};
                         action.notification.notificationAction.action.URI = notification.assignmentAcceptance.notificationAction.action.URI;
                         
                    } else if(notification.assignmentAcceptance.notificationAction.action.goto != undefined) {
                         
                         action.notification.notificationAction.action = {};
                         action.notification.notificationAction.action.goto = notification.assignmentAcceptance.notificationAction.action.goto;

                    }
                }
               


                 /**
                * 
                Worker recipients
                */
                
                getRoles(role).then(function(recipient){
                    action.notification.recipients = recipient;
                    workerObject.action = action;
                    worker.send(workerObject).then(function (workerSuccess) {
                        console.log(workerObject);
                        var success = util.success('Notification Worker processes successfully for assignment.', workerSuccess);
                        resolve(success);

                    }, function (workerFail) {
                        resolve(workerFail);
                    });


                }).catch(function(err){

                    console.log("Notification - getRecipients failed with error "+ err);
                    reject(err);


                });
               
            });

        }


    }

})();


var report = (function () {

    return {




        createPerformanceReport: function (performanceReportObject, _WFInstance, uuid) {

            return new Promise(function (resolve, reject) {

                var workerObject = worker.getWorkerWrapper();

                workerObject._id = generateUUID();
                workerObject.communityId = app.SCOPE.getCommunityId();
                workerObject.applicationId = app.SCOPE.applicationId;
                workerObject.createdDateTime = new Date().toString();
                workerObject.senderUserId = LOCAL_SETTINGS.SUBSCRIPTIONS.userId;
                workerObject.profileId = _WFInstance.profile;
                workerObject.channels.push("createPerformanceReport");
                var workplanSetId = performanceReportObject.workplanSetId;
                var configSetId = performanceReportObject.configSetId;


                // workplanSetId scope is profile
                // configSetId scope is subprocesses
                
                var workplanUUID = JSON.xpath("/indicators[category/term eq '"+ workplanSetId +"']/_id",app.SCOPE.workflow, {})[0];
                var configUUID = JSON.xpath("/subprocesses[_id eq '" + uuid + "']/indicators[id eq '"+ configSetId +"']/instances[1]/uuid", _WFInstance, {})[0];

                
                var action = {
                    "createPerformanceReport": {
                        "workplanUUID": workplanUUID,
                        "configUUID": configUUID,
                        "profilId": _WFInstance.profile   
                    }
                };

                workerObject.action = action;
                worker.send(workerObject).then(function (workerSuccess) {

                    var success = util.success('WorkplanReport Worker processed successfully.', workerSuccess);
                    resolve(success);

                }, function (workerFail) {
                    reject(workerFail);
                });
            });

        },

        createReport: function (createReport, _WFInstance, uuid) {

            return new Promise(function (resolve, reject) {

                var workerObject = worker.getWorkerWrapper();

                workerObject._id = generateUUID();
                workerObject.communityId = app.SCOPE.getCommunityId();
                workerObject.applicationId = app.SCOPE.applicationId;
                workerObject.createdDateTime = new Date().toString();
                workerObject.senderUserId = LOCAL_SETTINGS.SUBSCRIPTIONS.userId;
                workerObject.profileId = _WFInstance.profile;
                workerObject.channels.push("createReport");
                
                var performanceReportDefinition = JSON.xpath("/indicators[category/term eq 'PerformanceReportDefinition']/_id", _WFInstance, {})[0];
                var reportingSDO = JSON.xpath("/subprocesses[_id eq '" + uuid + "']/indicators[id eq 'reportingSDO']/instances[1]/uuid", _WFInstance, {})[0];

                
                var action = {
                    "createReport": {
                        "performanceReportDefinition": performanceReportDefinition,
                        "reportingSDO": reportingSDO,
                        "profilId": _WFInstance.profile   
                    }
                };

                workerObject.action = action;
                worker.send(workerObject).then(function (workerSuccess) {

                    var success = util.success('Reprot Worker processed successfully.', workerSuccess);
                    resolve(success);

                }, function (workerFail) {
                    reject(workerFail);
                });
            });

        },


       

        sdoReport: function (sdoReport, _WFInstance, uuid) {
            
            return new Promise(function (resolve, reject) {

                var workerObject = worker.getWorkerWrapper();

                workerObject._id = generateUUID();
                workerObject.communityId = app.SCOPE.getCommunityId();
                workerObject.applicationId = app.SCOPE.applicationId;
                workerObject.createdDateTime = new Date().toString();
                workerObject.senderUserId = LOCAL_SETTINGS.SUBSCRIPTIONS.userId;
                workerObject.profileId = _WFInstance.profile;
                workerObject.channels.push("sdoReport");
                
                var setId = sdoReport.indicatorSetId;
                var sdoReportUUID = JSON.xpath("/subprocesses[_id eq '" + uuid + "']/indicators[id eq '"+ setId +"']/instances[1]/uuid", _WFInstance, {})[0];

                
                var action = {
                    "sdoReport": {
                        "sdoReportUUID": sdoReportUUID,
                        "applicationId": app.SCOPE.applicationId,
                        "communityId": app.SCOPE.getCommunityId(),
                        "profileId": app.SCOPE.workflow.profile,
                        "subProcessUUID": uuid  
                    }
                };

                workerObject.action = action;
                worker.send(workerObject).then(function (workerSuccess) {

                    var success = util.success('report Worker processed successfully.', workerSuccess);
                    resolve(success);

                }, function (workerFail) {
                    reject(workerFail);
                });
            });

        },

        executeReport: function (executeReport, _WFInstance, uuid) {
            
            return new Promise(function (resolve, reject) {

                var workerObject = worker.getWorkerWrapper();

                workerObject._id = generateUUID();
                workerObject.communityId = app.SCOPE.getCommunityId();
                workerObject.applicationId = app.SCOPE.applicationId;
                workerObject.createdDateTime = new Date().toString();
                workerObject.senderUserId = LOCAL_SETTINGS.SUBSCRIPTIONS.userId;
                workerObject.profileId = _WFInstance.profile;
                workerObject.channels.push("executeReport");
                
               
               
                var SDOreportSetId = executeReport.SDOreportSetId;
                var reportingSDOSetid = executeReport.reportingSDOSetid;


                var SDOreportUUID = JSON.xpath("/subprocesses[_id eq '" + uuid + "']/indicators[id eq '"+ SDOreportSetId +"']/instances[1]/uuid", _WFInstance, {})[0];
                var reportingSDOUUID = JSON.xpath("/subprocesses[_id eq '" + uuid + "']/indicators[id eq '"+ reportingSDOSetid +"']/instances[1]/uuid", _WFInstance, {})[0];
                
                if(SDOreportUUID == undefined){
                    SDOreportUUID = JSON.xpath("/indicators[category/term eq '"+ SDOreportSetId +"']/_id",_WFInstance,{})[0];
                }

                
                var action = {
                    "executeReport": {
                        "sdoReportUUID": SDOreportUUID,
                        "reportingSDOUUID": reportingSDOUUID,
                        "applicationId": app.SCOPE.applicationId,
                        "communityId": app.SCOPE.getCommunityId(),
                        "profileId": app.SCOPE.workflow.profile,
                        "subProcessUUID": uuid  
                    }
                };

                workerObject.action = action;
                worker.send(workerObject).then(function (workerSuccess) {

                    var success = util.success('report Worker processed successfully.', workerSuccess);
                    resolve(success);

                }, function (workerFail) {
                    reject(workerFail);
                });
            });

        },

        generateView: function (generateView, _WFInstance, uuid) {
            
            return new Promise(function (resolve, reject) {

                var workerObject = worker.getWorkerWrapper();

                workerObject._id = generateUUID();
                workerObject.communityId = app.SCOPE.getCommunityId();
                workerObject.applicationId = app.SCOPE.applicationId;
                workerObject.createdDateTime = new Date().toString();
                workerObject.senderUserId = LOCAL_SETTINGS.SUBSCRIPTIONS.userId;
                workerObject.profileId = _WFInstance.profile;
                workerObject.channels.push("generateView");
                
                var ViewConfigSetId = generateView.ViewConfigSetId;

               

                var ViewConfigUUID = JSON.xpath("/subprocesses[_id eq '" + uuid + "']/indicators[id eq '"+ ViewConfigSetId +"']/instances[1]/uuid", _WFInstance, {})[0];
                
                
                var action = {
                    "generateView": {
                        "viewConfigUUID": ViewConfigUUID,
                        "applicationId": app.SCOPE.applicationId,
                        "communityId": app.SCOPE.getCommunityId(),
                        "profileId": app.SCOPE.workflow.profile,
                        "subProcessUUID": uuid  
                    }
                };

                workerObject.action = action;
                worker.send(workerObject).then(function (workerSuccess) {

                    var success = util.success('report Worker processed successfully.', workerSuccess);
                    resolve(success);

                }, function (workerFail) {
                    reject(workerFail);
                });
            });

        }




    }

})();

var worker = (function () {

    return {

        getWorkerWrapper: function () {

            var wrapper = {
                "source": "remote",
                "type": "workerObject",
                "_id": "",
                "channels": [],
                "profileId":"",
                "communityId": "",
                "applicationId": "",
                "message": "",
                "messageType": "info",
                "createdDateTime": "",
                "senderUserId": "",
                "action": {

                }

            };

            return wrapper;

        },
        send: function (workerObject) {

            return new Promise(function (resolve, reject) {

                console.log('Submitting Worker Object to server');
                console.log(workerObject);
                dao.save(workerObject).then(function (workerResponse) {
                    resolve(workerResponse);
                }).catch(function (err) {
                    console.log('Error submitting worker response !!' + err);
                    reject(err);
                })

            });

        },

        sendWorker: function (workerConfig, _WFInstance, uuid) {

            return new Promise(function (resolve, reject) {

                var workerObject = worker.getWorkerWrapper();

                workerObject._id = generateUUID();
                workerObject.communityId = app.SCOPE.getCommunityId();
                workerObject.applicationId = app.SCOPE.applicationId;
                workerObject.createdDateTime = new Date().toString();
                workerObject.senderUserId = LOCAL_SETTINGS.SUBSCRIPTIONS.userId;
                workerObject.profileId = _WFInstance.profile;
                workerObject.channels.push("sendWorker");
                var processGetNodeValue = function(paramBlock, seq, paramName){
                    
                    return new Promise(function(res, rej){

                        helper.getNodeValue(paramBlock, _WFInstance, uuid).then(function (dataValue) {

                           res({
                            "seq":seq,
                            "paramName":paramName,
                            "dataValue":dataValue
                           });

                        }, function (err) {
                            rej(err);
                        });


                    });

                };
                var processParams = function(configParam) {

                    return new Promise(function(res, rej){
                        var parametersArray = [];
                        var itemsToProcess = configParam.length;
                        for(var i=0; i<configParam.length; i++){
                            var paramBlock = configParam[i].parameterValue;
                            var seq = configParam[i].seq;
                            var paramName = configParam[i].parameterName;
                            
                            var paramValue = processGetNodeValue(paramBlock, seq, paramName).then(function(response){

                                parametersArray.push({
                                    "seq": response.seq,
                                    "paramName": response.paramName, 
                                    "paramValue": response.dataValue
                                })

                                itemsToProcess--;
                                if (itemsToProcess == 0) {
                                    parametersArray.push({
                                        "seq": itemsToProcess+1,
                                        "paramName": "communityId", 
                                        "paramValue": _WFInstance.communityId
                                    });

                                    parametersArray.push({
                                        "seq": itemsToProcess+2,
                                        "paramName": "applicationId", 
                                        "paramValue": _WFInstance.app
                                    });

                                    parametersArray.push({
                                        "seq": itemsToProcess+3,
                                        "paramName": "profileId", 
                                        "paramValue": _WFInstance.profile
                                    });

                                    parametersArray.push({
                                        "seq": itemsToProcess+4,
                                        "paramName": "subProcessUUID", 
                                        "paramValue": uuid
                                    });

                                    res(parametersArray);
                                }
                            },function(err){
                                itemsToProcess--;
                                if (itemsToProcess == 0) {
                                    parametersArray.push({
                                        "seq": itemsToProcess+1,
                                        "paramName": "communityId", 
                                        "paramValue": _WFInstance.communityId
                                    });

                                    parametersArray.push({
                                        "seq": itemsToProcess+2,
                                        "paramName": "applicationId", 
                                        "paramValue": _WFInstance.app
                                    });

                                    parametersArray.push({
                                        "seq": itemsToProcess+3,
                                        "paramName": "profileId", 
                                        "paramValue": _WFInstance.profile
                                    });

                                    parametersArray.push({
                                        "seq": itemsToProcess+4,
                                        "paramName": "subProcessUUID", 
                                        "paramValue": uuid
                                    });
                                    
                                    res(parametersArray);
                                }
                            })

                            
                        }
                    });
                };

                var type = null;
                if(workerConfig.rest != undefined){
               
                    var configParam = workerConfig.rest.parameters;
                    processParams(configParam).then(function(paramsArray){
                        var action={
                            "sendWorker":{
                                "rest":{

                                }
                            }
                        };
                        action.sendWorker.rest.uri = workerConfig.rest.uri;
                        action.sendWorker.rest.profilId = _WFInstance.profile;
                        action.sendWorker.rest.parameters = paramsArray;

                        workerObject.action = action;
                        worker.send(workerObject).then(function (workerSuccess) {
                            


                            var spObject = JSON.xpath("/subprocesses[_id eq '"+ uuid +"']",_WFInstance,{})[0];
                            spObject.spStatus = 'submitted';
            
                            if(spObject.messages == undefined){
                                spObject.messages = [];
                            }
                            var pendingSubmissionObject = {
                                "message":{
                                    "i18n":{
                                        "_id":"",
                                        "en": "Server request is pending"
                                    }
                                },
                                "type":"info"
                            };
                            spObject.messages.push(pendingSubmissionObject);
            
                            persistData('subprocesses', app.SCOPE.workflow, uuid)
                            .then(function(saved){
                                
                                var success = util.success('Worker Rest processed successfully.', workerSuccess);
                                resolve(success);

                            }).catch(function(failed){
                                console.log('Worker submitted subprocess file update failed');
                                reject(failed);
                            });



                            

                        }, function (workerFail) {
                            console.log('Worker failed ');
                            reject(workerFail);
                        });

                    },function(err){
                        console.log("parameter creation failed. Abording worker object");
                    });

               } else if(workerConfig.functional != undefined) {

                   var configParam = workerConfig.functional.parameters;
                   processParams(configParam).then(function(paramsArray){
                        var action = {
                            "sendWorker":{
                                "functional":{

                                }
                            }
                        };
                        action.sendWorker.functional.methodName = workerConfig.functional.methodName;
                        action.sendWorker.functional.profilId = _WFInstance.profile;
                        action.sendWorker.functional.parameters = paramsArray;
                        workerObject.action = action;
                        worker.send(workerObject).then(function (workerSuccess) {

                            var spObject = JSON.xpath("/subprocesses[_id eq '"+ uuid +"']",_WFInstance,{})[0];
                            spObject.spStatus = 'submitted';
            
                            if(spObject.messages == undefined){
                                spObject.messages = [];
                            }
                            var pendingSubmissionObject = {
                                "message":{
                                    "i18n":{
                                        "_id":"",
                                        "en": "Server request is pending"
                                    }
                                },
                                "type":"info"
                            };
                            spObject.messages.push(pendingSubmissionObject);
            
                            persistData('subprocesses', app.SCOPE.workflow, uuid)
                            .then(function(saved){
                                
                                var success = util.success('Worker functional processed successfully.', workerSuccess);
                                resolve(success);

                            }).catch(function(failed){
                                console.log('Worker submitted subprocess file update failed');
                                reject(failed);
                            });



                        }, function (workerFail) {
                            console.log('Worker failed ');
                            reject(workerFail);
                        });

                    },function(err){
                        console.log("parameter creation failed. Abording worker object");
                    });
               }
                
            });

        },

        executeLocal: function (workerConfig, _WFInstance, uuid) {

            return new Promise(function (resolve, reject) {

              

                var processGetNodeValue = function(paramBlock, seq, dataType){
                    
                    return new Promise(function(res, rej){

                        helper.getNodeValue(paramBlock, _WFInstance, uuid).then(function (dataValue) {

                           res({
                            "seq": seq,
                            "dataType": dataType,
                            "dataValue": dataValue
                           });

                        }, function (err) {
                            rej(err);
                        });


                    });

                };

                var processParams = function(configParam) {

                    return new Promise(function(res, rej){
                        var parametersArray = [];
                        var itemsToProcess = configParam.length;
                        for(var i=0; i<configParam.length; i++){
                            var paramBlock = configParam[i].parameterValue;
                            var seq = configParam[i].seq;
                            var dataType = configParam[i].dataType.dataType;
                            var paramValue = processGetNodeValue(paramBlock, seq, dataType).then(function(response){

                                parametersArray.push({
                                    "seq": response.seq,
                                    "dataType": response.dataType, 
                                    "paramValue": response.dataValue
                                })

                                itemsToProcess--;
                                if (itemsToProcess == 0) {
                                    res(parametersArray);
                                }
                            },function(err){
                                itemsToProcess--;
                                if (itemsToProcess == 0) {
                                    res(parametersArray);
                                }
                            })

                            
                        }
                    });
                };

                var fixParamType = function(paramValue, dataType){

                    switch (dataType) {
                        case "string":
                            var txt = paramValue.replace(/'/g, "\\'");
                            return "'" + txt + "'";
                            break;
                        case "date":
                        case "dateTime":
                            return "'" + paramValue + "'";
                            break;
                        case "number":
                        case "decimal":
                            return  paramValue;
                            break;
                        default:
                            break;
                    }

                };

                var methodName = workerConfig.methodName;
                var configParam = workerConfig.parameters;
                processParams(configParam).then(function(paramsArray){
                   
                    var pList = '';
                    for(var i =0; i< paramsArray.length-1; i++){
                        pList = pList + fixParamType(paramsArray[i].paramValue,paramsArray[i].dataType) + ',';
                    }
                    pList = pList + fixParamType(paramsArray[i].paramValue, paramsArray[i].dataType)
                    
                    var callbackSuccess = function() { 
                        return resolve("Function '"+ methodName + "' executed. Response success.");
                    };
                    var callbackFailure = function() { 
                        return reject("Function '"+ methodName + "' executed. Response failed.");
                    };    
                    
                    var func = methodName+'('+ pList +',callbackSuccess, callbackFailure)';
                    eval(func);
                    

                },function(err){
                    console.log("parameter creation failed. Abording worker object");
                    reject(err);
                });

               
                
            });

        }

    }

})();


module.exports = {

    community: community,
    application: application,
    performance: performance,
    worker: worker,
    sdo: sdo,
    taxonomy: taxonomy,
    subProcessInstance: subProcessInstance,
    variables: variables,
    notification: notification,
    report:report
}
},{"./form":3,"./helper":4,"./nodeValue":6,"utility":8}],3:[function(require,module,exports){
'use strict';

//var gatekeeper = require('../bower_components/gatekeeper');
var util = require('utility');

// var uuid = require('node-uuid');

var gatekeeper = new GK();

/**
 * Form Module
 *
 * @module lib/form
 * @author Brent Gordon
 * @version 2.0.0
 * @description test description
 * @copyright Kwantu Ltd RSA 2009-2015.
 *
 */

function create(args) {

    var processId = args[0] || '';

    var subProcess = args[1] || {};

    var step = args[2] || {};

    var action = args[3] || {};

    var _WFInstance = args[6] || {};

    var data = args[6] || {};

    var indicators = subProcess.indicators || [];

    var result = [];

    var indicatorType = action._type;

    var processSeq = args[4] || '';

    var subProcessSeq = args[5] || '';

    var createType = args[7] || '';

    var subProcessId = subProcess._id;

    var uuid = args[8] || '';

    var baseUUID = args[9] || '';

    var profile = _WFInstance.profile;

    var inputData = args[10] || {};

    var formCreateType = action.method.form.create;

    var formType = action.method.form.type;

    var paramObject = {

        "formCreateType": formCreateType,
        "formType": formType

    }

    return new Promise(function(resolve, reject) {
        var toProcess = indicators.length;

        var subprocessType = JSON.xpath("/config/processes/subProcesses[_id eq '" + subProcessId + "']/type", _WFInstance, {})[0];

        var formCreateFn = function(indicatorType, indicatorId, validDate, instantiateSource) {

            gatekeeper.instantiate(baseUUID, indicatorType, indicatorId, _WFInstance.profile, validDate, subProcessId, subprocessType).then(function(docArray) {
                // Update the indicator workflow processes section

                for (var i = 0; i < docArray.length; i++) {
                    var object = docArray[i];
                    if (!object.model._id.endsWith(':approved') && !object.model._id.endsWith(':rejected')) {

                        var workflowObj = {
                            "id": _WFInstance.config._id,
                            "instance": _WFInstance.instance._id,
                            "processes": [{
                                "id": processId,
                                "subProcessId": subProcess._id,
                                "subProcessUUID": uuid,
                                "step": {
                                    "id": step.id,
                                    "seq": step.seq,
                                    "startDate": "",
                                    "status": step.status,
                                    "message": step.message,
                                    "assignedTo": {
                                        "userId": step.assignedTo.userId,
                                        "name": step.assignedTo.name
                                    },
                                    "comment": step.comment,
                                    "complete": false,
                                    "endDate": ""
                                }

                            }]
                        }

                        if (action.setWorkflowLabelInTitle != undefined && action.setWorkflowLabelInTitle != '' && action.setWorkflowLabelInTitle == true) {
                            object.model.title = inputData.label;
                        }

                        if (action.setDraft != undefined && action.setDraft != '' && action.setDraft == true) {
                            object.model.control.draft = true;
                        }

                        object.model.workflows.push(workflowObj);
                        var mainId = object.model._id;
                        // persist via gk so that it is save in couch
                        gatekeeper.persist(docArray).then(function(savedArray) {
                            //using same id call initialiseData
                            //call code to set to setInstance
                            dao.get(mainId).then(function(data) {

                                var indicatorModel = ko.mapping.fromJS({
                                    "defaultModel": {
                                        "setId": indicatorId
                                    }

                                });
                                gatekeeper.instantiateData(mainId, instantiateSource, indicatorModel, data.model.pending.seq, paramObject).then(function(data) {
                                    if (data[0].status == "200") {

                                        if (action.setWorkflowLabelInField != undefined && action.setWorkflowLabelInField != '') {
                                            var assignmentSetId = action.setWorkflowLabelInField.split(".")[0];
                                            if (assignmentSetId == indicatorId) {
                                                console.log(data[0]);
                                                var txt = inputData.label;
                                                var squote = txt.replace(/'/g, "\\'");
                                                var path = "data[0].model.model.pending.data." + action.setWorkflowLabelInField + "='" + squote + "'";
                                                eval(path);
                                            }

                                        }

                                        gatekeeper.persist(data).then(function(savedArray) {
                                            dao.get(mainId).then(function(data) {
                                                if (_WFInstance.indicators.length == 0) {
                                                    _WFInstance.indicators.push(data);
                                                    toProcess--;
                                                    if (toProcess == 0) {

                                                        persistData('indicators', _WFInstance, uuid).then(function (data) {
                                                            
                                                            var success = util.success('Form create indicator persist success.', _WFInstance.indicators);
                                                            resolve(success);

                                                        }).catch(function (err) {

                                                            console.error(err);
                                                            var failure = util.success('Form create indicator persist failed.' + err[0].message, {});
                                                            reject(failure);

                                                        })


                                                      
                                                    }

                                                } else {
                                                    var found = false;
                                                    for (var index = 0; index < _WFInstance.indicators.length; index++) {
                                                        var indicator = _WFInstance.indicators[index];
                                                        if (indicator._id == data._id) {
                                                            found = true;
                                                            // Remove the current item from the array and add the updated processModel
                                                            _WFInstance.indicators.splice(index, 1);
                                                            _WFInstance.indicators.push(data);
                                                            toProcess--;
                                                            if (toProcess == 0) {
                                                                persistData('indicators', _WFInstance, uuid).then(function (data) {
                                                                    
                                                                    var success = util.success('Form create indicator persist success.', _WFInstance.indicators);
                                                                    resolve(success);
        
                                                                }).catch(function (err) {
        
                                                                    console.error(err);
                                                                    var failure = util.success('Form create indicator persist failed.' + err[0].message, {});
                                                                    reject(failure);
        
                                                                })
                                                            }

                                                        }

                                                    }

                                                    if (found == false) {
                                                        _WFInstance.indicators.push(data);

                                                        toProcess--;
                                                        if (toProcess == 0) {
                                                            persistData('indicators', _WFInstance, uuid).then(function (data) {
                                                                
                                                                var success = util.success('Form create indicator persist success.', _WFInstance.indicators);
                                                                resolve(success);
    
                                                            }).catch(function (err) {
    
                                                                console.error(err);
                                                                var failure = util.success('Form create indicator persist failed.' + err[0].message, {});
                                                                reject(failure);
    
                                                            })
                                                        }

                                                    }

                                                }

                                            }).catch(function(err) {
                                                console.error(err);
                                                var failure = util.success('1 Gatekeeper initialisation failed with initialiseData message ' + err[0].message, {});
                                                reject(failure);
                                            });

                                        }, function(err) {
                                            console.error(err);
                                            var failure = util.success('2 Gatekeeper initialisation failed with initialiseData message ' + err[0].message, {});
                                            reject(failure);
                                        });

                                    } else {
                                        var failure = util.success('3 Gatekeeper initialisation failed with initialiseData message ' + err[0].message, {});
                                        reject(failure);
                                    }

                                }, function(err) {
                                    var failure = util.success('4 Gatekeeper initialisation failed with initialiseData message ' + err[0].message, {});
                                    reject(failure);
                                });

                            }).catch(function(err) {
                                console.error(err);
                                var failure = util.success('5 Gatekeeper initialisation failed with initialiseData message ' + err[0].message, {});
                                reject(failure);
                            })
                        }, function(err) {
                            console.error(err);
                            var failure = util.success('6 Gatekeeper initialisation failed with initialiseData message ' + err[0].message, {});
                            reject(failure);
                        });
                    }

                }

            }, function(err) {

                var toAddProcess = [];
                for (var i = 0; i < _WFInstance.instance.processes.length; i++) {
                    if (_WFInstance.instance.processes[i].subProcesses.length > 0) {
                        toAddProcess.push(_WFInstance.instance.processes[i]);
                    }

                }

                _WFInstance.instance.processes = [];
                _WFInstance.instance.processes = toAddProcess;

                var toAddSubProcess = [];
                for (var i = 0; i < _WFInstance.subprocesses.length; i++) {
                    if (_WFInstance.subprocesses[i].indicators.length > 0) {
                        toAddSubProcess.push(_WFInstance.subprocesses[i]);
                    }

                }

                _WFInstance.subprocesses = [];
                _WFInstance.subprocesses = toAddSubProcess;

                console.error(err);
                var failure = util.success('7 Gatekeeper initialisation failed with initialiseData message ' + err[0].message, {});
                reject(failure);
            });
        };

        var instantiateSource = FROM_DEFINITION;

        for (var counter = 0; counter < indicators.length; counter++) {
            var indicatorId = indicators[counter]._id;
            var indicatorName = util.getName(indicators[counter].name, 'en');

            var source = indicators[counter].initiateData;

            var initType = '';
            if (subProcess.instanceType.newSequence != undefined) {
                initType = INSTANCE_TYPE_NEW_SEQ;
            } else if (subProcess.instanceType.newInstance != undefined) {
                initType = INSTANCE_TYPE_NEW_INS;
            }

            var indicatorDoc = {};
            if (baseUUID != undefined && baseUUID != '' && baseUUID.length > 0) {

                var sp = JSON.xpath("/subprocesses[_id eq '" + baseUUID + "']", _WFInstance, {})[0];
                
                if(subProcess.periodType.periodic == undefined){

                    if(baseUUID != uuid){
                        sp.active = false;
                    }
            
                }
                
                
                
                instantiateSource = FROM_AUTHORISED;

            } else {
                var cardinality = JSON.xpath("/indicators[setId eq '" + indicatorId + "']/cardinality", app.SCOPE.APP_CONFIG, {})[0];

                if (initType == INSTANCE_TYPE_NEW_INS) {

                    if (cardinality == INDICATOR_CARDINALITY_SINGLE) {

                        var existingUUID = JSON.xpath("/indicators[category/term eq '" + indicatorId + "']/_id", _WFInstance, {});

                        if (existingUUID.length > 0) {
                            instantiateSource = FROM_AUTHORISED;
                        } else {
                            instantiateSource = FROM_DEFINITION;
                        }


                    } else {

                        instantiateSource = FROM_DEFINITION;

                    }



                } else {

                    if (cardinality == INDICATOR_CARDINALITY_SINGLE) {

                        var existingUUID = JSON.xpath("/indicators[category/term eq '" + indicatorId + "']/_id", app.SCOPE.workflow, {});

                        if (existingUUID.length > 0) {
                            instantiateSource = FROM_AUTHORISED;
                        } else {
                            instantiateSource = FROM_DEFINITION;
                        }

                    } else {


                        var path = "/indicators[category/term eq '" + indicatorId + "' and id = /subprocesses[id = '" + subProcessId + "']/indicators/instances/uuid]/_id";
                        var part = library.getSubprofileSubprocessIds();
                        if (subprocessType == PROCESS_TYPE_SUBPROFILE) {
                            path = "/indicators[category/term eq '" + indicatorId + "' and id = /subprocesses[id = '" + subProcessId + "' and id = "+part+"]/indicators/instances/uuid]/_id";
                        }
                        var existingUUID = JSON.xpath(path, _WFInstance, {});

                        if (existingUUID.length > 0) {
                            instantiateSource = FROM_AUTHORISED;
                        } else {
                            instantiateSource = FROM_DEFINITION;
                        }

                    }



                }


            }

            formCreateFn(initType, indicatorId, '', instantiateSource);
        }

    });
};

function setInstanceTitle(args) {

    var _WFInstance = args[0] || {};

    var uuid = args[2] || '';
    var data = args[4] || {};

    var title = data.label;

    return new Promise(function(resolve, reject) {

        var subProcessInstance = JSON.xpath("/subprocesses[_id eq '" + uuid + "']", _WFInstance, {})[0];
        var indicatorInstances = subProcessInstance.indicators;

        for (var i = 0; i < indicatorInstances.length; i++) {
            var indicatorUUID = indicatorInstances[i].instances[0].uuid;
            var indicatorInstance = JSON.xpath("/indicators[_id eq '" + indicatorUUID + "']", _WFInstance, {})[0];
            indicatorInstance.title = indicatorInstances[i].id + ' ' + title;
        };

        resolve("Set Title Success", indicatorInstances);

    });

};

function deleteProfile(args) {

    var _WFInstance = args[0] || {};

    var profileId = _WFInstance.profile;

    return new Promise(function(resolve, reject) {

        var workerObject = {
            "source": "remote",
            "type": "workerObject",
            "_id": generateUUID(),
            "channels": ["deleteProfile"],
            "communityId": app.SCOPE.getCommunityId(),
            "applicationId": app.SCOPE.applicationId,
            "profileId": _WFInstance.profile,
            "message": "",
            "messageType": "info",
            "createdDateTime": moment().format(),
            "senderUserId": LOCAL_SETTINGS.SUBSCRIPTIONS.userId,
            "notification": {

            },
            "profile": {
                "action": "deleteProfile",
                "profileId": profileId
            }

        }

        console.log(workerObject);
        dao.upsert(workerObject).then(function(data) {
            console.log("Worker Object submitted for profile(" + profileId + ") deletion.");
            console.log(data);
            resolve(data);
        }).catch(function(err) {
            console.log(err);
            reject(data);
        });

    });

};

function createProfile(args) {

    var _WFInstance = args[1] || {};

    var communityId = _WFInstance.communityId;
    var profileId = _WFInstance.profile;

    return new Promise(function(resolve, reject) {

        library.createProfileDocuments(communityId, profileId).then(function(data) {

            var success = util.success('Form created successfully.', data);
            resolve(success);

        }).catch(function(err) {

            console.error(err);
            var failure = util.success('ERROR: Profile creation failed' + err[0].message, {});
            reject(failure);

        });

    });
};

function setDraft(args) {

    var _WFInstance = args[0] || {};

    var communityId = _WFInstance.communityId;
    var profileId = _WFInstance.profile;
    var uuid = args[2] || '';

    return new Promise(function(resolve, reject) {

        var subProcessInstance = JSON.xpath("/subprocesses[_id eq '" + uuid + "']", _WFInstance, {})[0];
        var indicatorInstances = subProcessInstance.indicators;

        for (var i = 0; i < indicatorInstances.length; i++) {
            var indicatorUUID = indicatorInstances[i].instances[0].uuid;
            var indicatorInstance = JSON.xpath("/indicators[_id eq '" + indicatorUUID + "']", _WFInstance, {})[0];
            indicatorInstance.control.draft = true;
        };

        resolve("Set Draft Success", indicatorInstances);

    });
};

function setUnDraft(args) {

    var _WFInstance = args[0] || {};

    var communityId = _WFInstance.communityId;
    var profileId = _WFInstance.profile;
    var uuid = args[2] || '';

    return new Promise(function(resolve, reject) {

        var subProcessInstance = JSON.xpath("/subprocesses[_id eq '" + uuid + "']", _WFInstance, {})[0];
        var indicatorInstances = subProcessInstance.indicators;

        for (var i = 0; i < indicatorInstances.length; i++) {
            var indicatorUUID = indicatorInstances[i].instances[0].uuid;
            var indicatorInstance = JSON.xpath("/indicators[_id eq '" + indicatorUUID + "']", _WFInstance, {})[0];
            indicatorInstance.control.draft = false;
        };

        resolve("Set Draft Success", indicatorInstances);

    });
};

function save(indicator) {
    var completed = [];
    var result = {
        complete: true,
        data: []
    };

    return new Promise(function(resolve, reject) {
        var success = util.success('Form indicator set saved successfully.', result);
        resolve(success);
    });
};

function submit(form) {
    var completed = [];
    var result = {
        complete: true,
        data: []
    };

    return new Promise(function(resolve, reject) {
        var success = util.success('Form submitted successfully.', result);
        resolve(success);
    });
};

function authorise(form) {
    var completed = [];
    var result = {
        complete: true,
        data: []
    };

    var processId = form[0] || '';

    var subProcess = form[1] || {};

    var subProcessId = subProcess._id;

    var processSeq = form[2] || '';

    var subProcessSeq = form[3] || '';

    var _WFInstance = form[4] || {};

    var subProcessUUID = form[6] || '';

    return new Promise(function(resolve, reject) {

        //var subProcessUUID = JSON.xpath("/processes[id eq '" + processId + "' and seq eq '" + processSeq + "']/subProcesses[id eq '" + subProcessId + "' and seq eq '" + subProcessSeq + "']/uuid", _WFInstance.instance, {})[0];
        var spIndicators = JSON.xpath("/subprocesses[_id eq '" + subProcessUUID + "']/indicators/instances/uuid", _WFInstance, {});
        var itemsToProcess = spIndicators.length;
        var updatedObjectsArray = [];
        var tempArray = [];

        for (var i = 0; i < spIndicators.length; i++) {

            gatekeeper.authorise(spIndicators[i]).then(function(authorisedReturn) {

                gatekeeper.persist(authorisedReturn).then(function(savedArray) {

                    var uuidSavedIndicator = '';
                    for (var c = 0; c < savedArray.length; c++) {
                        if (!savedArray[c].id.endsWith(':approved')) {
                            uuidSavedIndicator = savedArray[c].id;
                        }

                    }

                    dao.get(uuidSavedIndicator).then(function(data) {

                        if (_WFInstance.indicators.length == 0) {
                            _WFInstance.indicators.push(data);
                            itemsToProcess--;
                            if (itemsToProcess == 0) {

                                

                                persistData('indicators', _WFInstance, subProcessUUID).then(function (data) {
                                    
                                    var success = util.success('Form authorised successfully.', updatedObjectsArray);
                                    resolve(success);

                                }).catch(function (err) {

                                    console.error(err);
                                    var failure = util.success('Form authorised persist failed.' + err[0].message, {});
                                    reject(failure);

                                });


                            }

                        } else {
                            var found = false;
                            
                            for (var index = 0; index < _WFInstance.indicators.length; index++) {
                                var indicator = _WFInstance.indicators[index];
                                if (indicator._id == data._id) {
                                    found = true;
                                    // Remove the current item from the array and add the updated processModel
                                    tempArray.push(data);
                                    //_WFInstance.indicators.splice(index, 1);
                                    //_WFInstance.indicators.push(data);
                                    itemsToProcess--;
                                    if (itemsToProcess == 0) {
                                        var indLength = _WFInstance.indicators.length;
                                        var tempLength = tempArray.length;

                                        for(var p = 0; p < indLength; p++){
                                            var tempObj=false;
                                            for(var q=0; q < tempLength; q++){
                                                if(_WFInstance.indicators[p]._id == tempArray[q]._id){
                                                    tempObj = true;
                                                }
                                            }
                                            if(!tempObj){ 
                                                tempArray.push(_WFInstance.indicators[p])
                                            }
                                        }
                                        
                                        _WFInstance.indicators = tempArray;
                                        
                                        break;
                                    }

                                }

                            }

                            if (found == true && itemsToProcess == 0){

                                persistData('indicators', _WFInstance, subProcessUUID).then(function (data) {
                                    
                                    var success = util.success('Form authorised successfully.', updatedObjectsArray);
                                    resolve(success);

                                }).catch(function (err) {

                                    console.error(err);
                                    var failure = util.success('Form authorised persist failed.' + err[0].message, {});
                                    reject(failure);

                                });
                                
                            }

                        }

                    }).catch(function(err) {
                        console.error(err);
                    });

                }, function(error) {
                    console.error(err);
                });

            }, function(error) {
                itemsToProcess--;
                if (itemsToProcess == 0) {

                    var success = util.success('Form authorised successfully.', updatedObjectsArray);
                    resolve(success);
                }

            });

        }

    });
};

function close(form) {
    var completed = [];
    var result = {
        complete: true,
        data: []
    };

    return new Promise(function(resolve, reject) {
        var success = util.success('Form closed successfully.', result);
        resolve(success);
    });
};



function updateIndicator(args) {

    var _WFInstance = args[0] || {};

    var uuid = args[1] || '';
    var path = args[2] || '';
    var dataValue = args[3] || '';

    return new Promise(function(resolve, reject) {

        var setId = path.split(".", 1)[0];
        var indObject = JSON.xpath("/indicators[workflows/processes/subProcessUUID = '"+ uuid +"' and category/term = '"+ setId +"']", _WFInstance ,{})[0];

        var squote = dataValue.replace(/'/g, "\\'");
        var expr = "indObject.model.pending.data." + path + " = '" + squote + "'";
        eval(expr);
        var itemsToProcess = 1;
        var stuff = [];
        var obj = {};

        obj.model = indObject;
        stuff.push(obj);

        var success = util.success('Indicator updated.', stuff);
        resolve(success);

    });
};


function updateIndicatorWrapper(args) {

    var _WFInstance = args[0] || {};

    var uuid = args[1] || '';
    var path = args[2] || '';
    var dataValue = args[3] || '';
    var indicatorSetId = args[4] || '';

    return new Promise(function(resolve, reject) {

       
        var indObject = JSON.xpath("/indicators[workflows/processes/subProcessUUID = '"+ uuid +"' and category/term = '"+ indicatorSetId +"']", _WFInstance ,{})[0];

        
        
        var squote = dataValue.replace(/'/g, "\\'");
        var expr = "indObject." + path + " = '" + squote + "'";
        eval(expr);
        var itemsToProcess = 1;
        var stuff = [];
        var obj = {};

        obj.model = indObject;
        stuff.push(obj);

        var success = util.success('Indicator updated.', stuff);
            resolve(success);

    });
};

function markUpdateIndicator(args) {

    var _WFInstance = args[0] || {};

    var uuid = args[1] || '';
    var status = args[2] || '';
    var indicatorSetId = args[3] || '';
    
    return new Promise(function(resolve, reject) {

        var indObject = JSON.xpath("/indicators[workflows/processes/subProcessUUID = '"+ uuid +"' and category/term = '"+ indicatorSetId +"']", _WFInstance ,{})[0];        
        indObject.model.pending.status = status;
        var itemsToProcess = 1;
        var stuff = [];
        var obj = {};
        obj.model = indObject;
        stuff.push(obj);

        var success = util.success('Indicator updated.', stuff);
        resolve(success);

    });
};


function setStatus(args) {


    // Currently setting status to subprocess instance. it should update some field in appProfile or whatever indicator the profile has.
    var _WFInstance = args[0] || {};
    var uuid = args[1] || '';
    var status = args[2] || '';

    return new Promise(function(resolve, reject) {

        var subProcessInstance = JSON.xpath("/subprocesses[_id eq '" + uuid + "']", _WFInstance, {})[0];
        subProcessInstance.step.message = status;

        resolve("Set profile status Success", subProcessInstance);

    });

};

module.exports = {

    create: create,
    save: save,
    submit: submit,
    authorise: authorise,
    close: close,
    setDraft: setDraft,
    setUnDraft: setUnDraft,
    createProfile: createProfile,
    setInstanceTitle: setInstanceTitle,
    deleteProfile: deleteProfile,
    updateIndicator: updateIndicator,
    markUpdateIndicator: markUpdateIndicator,
    updateIndicatorWrapper: updateIndicatorWrapper

}
},{"utility":8}],4:[function(require,module,exports){
'use strict';


function getLanguageMessage(message) {

    var language = service.getLanguage();
    var res = eval("message.i18n." + language);
    return res;

};

function getNodeValue(data, _WFInstance, uuid) {

    return new Promise(function(resolve, reject) {

        if (data.value != undefined) {        
                    
            var inputDataType = 'string';

            if(data.value.datatype.dataType != undefined){
                inputDataType = data.value.datatype.dataType;
            } else {
                inputDataType = data.value.datatype;
            } 

            
            var inputValue = data.value.data;

            if(inputDataType == 'number' ){
                resolve(Number(inputValue));
            } else if(inputDataType == 'string') {
                resolve(inputValue);
            } else if(inputDataType == 'integer'){
                resolve(parseInt(inputValue));
            } else if(inputDataType == 'decimal'){
                resolve(parseFloat(inputValue));
            } else if(inputDataType == 'date' || inputDataType == 'dateTime' ){
                resolve(inputValue);
            } else {
                // In case data type not matched
                resolve(inputValue);
            }

        } else if (data.indicatorUUID != undefined) {

            // A change is required to make sure proper scope is identified.
            var indicatorUUID = null;
            
            var subprocess = JSON.xpath("/subprocesses[_id eq '" + uuid + "']", _WFInstance, {})[0];
            if(subprocess.indicators.length == 0){

                indicatorUUID = JSON.xpath("/indicators[category/term eq '"+ data.indicatorUUID.indicatorSetId +"']/_id", _WFInstance , {})[0];
                
            } else {

                 indicatorUUID = JSON.xpath("/indicators[id eq '" + data.indicatorUUID.indicatorSetId + "']/instances/uuid", subprocess, {})[0];
                 if(indicatorUUID == undefined){
                    indicatorUUID = JSON.xpath("/indicators[category/term eq '"+ data.indicatorUUID.indicatorSetId +"']/_id",_WFInstance,{})[0];
                 }
            }



            resolve(indicatorUUID);

        } else if (data.indicator != undefined) {

            var indicatorUUID = JSON.xpath("/subprocesses[_id eq '" + uuid + "']/indicators[id eq '" + data.indicator.indicatorSetId + "']/instances/uuid", _WFInstance, {})[0];
            var indObject = JSON.xpath("/indicators[_id eq '" + indicatorUUID + "']", _WFInstance, {})[0];
            var xpath = '/model/pending/data/' + data.indicator.indicatorSetId + '/' + data.indicator.elementId;

            var seq = JSON.xpath("count(/subprocesses[_id eq '" + uuid + "']/preceding-sibling::node()[id = /subprocesses[_id eq '" + uuid + "']/id])", _WFInstance, {})[0] + 1;
            var subprocessType = JSON.xpath("/config/processes/subProcesses[_id eq /subprocesses[_id eq '" + uuid + "']/id]/type", _WFInstance, {})[0];
            var part = library.getSubprofileSubprocessIds();

            if (subprocessType == PROCESS_TYPE_SUBPROFILE) {
                seq = JSON.xpath("count(/subprocesses[_id eq '" + uuid + "']/preceding-sibling::node()[id = /subprocesses[_id eq '" + uuid + "']/id and _id = /subprocesses[_id = "+part+"]/_id])", _WFInstance, {})[0] + 1;
            }

            var replacedPath = replaceAll(xpath, '#SEQUENCE#', seq);

            var validDate = JSON.xpath("/subprocesses[_id eq '" + uuid + "']/dates/valid", _WFInstance, {})[0];
            var concatValidDate = "'" + validDate + "'";
            var newPath = replaceAll(replacedPath, '#END_DATE#', concatValidDate);
            var dotReplaced = replaceAll(newPath, '[.]', '/');
            var retValue = JSON.xpath(dotReplaced, indObject, {})[0];

            resolve(retValue);

        } else if (data.system != undefined) {

            resolve("ERROR: Unimplemented system type found.");

        } else if (data.variable != undefined) {

            /**
             * 
             * Taken out of schema
             * 
                        "subProcessInstance": {
                            "type": "string",
                            "description": "value of the variable subProcessInstance variable current subprocessInstance"
                        },
                        "step": {
                            "type": "string",
                            "description": "value of the variable in the current step"
                        },
                        "subProcessId": {
                            "type": "string",
                            "description": "value of the current applicaiton ID"
                        }
             * 
             * 
             * 
             */
            if (data.variable.profile != undefined) {

                var variableName = data.variable.profile;

                var profileId = _WFInstance.profile;
                var profileVariableFileName = profileId + ':variables';

                dao.get(profileVariableFileName).then(function(file) {

                    var obj = eval('file.' + variableName);

                    if (typeof obj == 'object') {

                        var seq = JSON.xpath("count(/subprocesses[_id eq '" + uuid + "']/preceding-sibling::node()[id = /subprocesses[_id eq '" + uuid + "']/id])", _WFInstance, {})[0] + 1;
                        var subprocessType = JSON.xpath("/config/processes/subProcesses[_id eq /subprocesses[_id eq '" + uuid + "']/id]/type", _WFInstance, {})[0];
                        var part = library.getSubprofileSubprocessIds();

                        if (subprocessType == PROCESS_TYPE_SUBPROFILE) {
                            seq = JSON.xpath("count(/subprocesses[_id eq '" + uuid + "']/preceding-sibling::node()[id = /subprocesses[_id eq '" + uuid + "']/id and _id = /subprocesses[_id = "+part+"]/_id])", _WFInstance, {})[0] + 1;
                        }

                        var valuePath = "/" + variableName + "[seq eq '" + seq + "']/value";
                        var retValue = JSON.xpath(valuePath, file, {})[0];
                        resolve(retValue);



                    } else if (typeof obj == 'string') {

                        resolve(obj);

                    }

                }).catch(function(error) {

                    reject("ERROR: Profile variables not found");

                });

            } else {
                reject("ERROR: Unimplemented profile type found.");
            }

        } else if (data.indicatorWrapper != undefined) {

            var indicatorSet = data.indicatorWrapper.indicatorSetId;
            var indicatorUUID = JSON.xpath("/subprocesses[_id eq '" + uuid + "']/indicators[id eq '" + indicatorSet + "']/instances/uuid", _WFInstance, {})[0];
            var indObject = JSON.xpath("/indicators[_id eq '" + indicatorUUID + "']", _WFInstance, {})[0];
            var elementpath = replaceAll(data.indicatorWrapper.path,"[.]","/")
            var xpath = '/'+elementpath
            var value = JSON.xpath(xpath, indObject, {})[0];
            resolve(value);

        } else if (data.calculated != undefined) {


            var value = '';
            var separator = data.calculated.separator;

            for(var i = 0; i < data.calculated.elements.length - 1; i++){
                 
                 var elements = data.calculated.elements;
                 
                 var possibleItems = ["elementProperty","constantValue","elementWrapper","currentDate","randomDigits", "profileObjectElement","profileObjectWrapper","currentFinancialYear"];
                    switch (propertyExists(elements[i], possibleItems)) {

                        case 'elementProperty':
                            var indicatorSet = elements[i].elementProperty.indicatorSetId;
                            var indicatorUUID = JSON.xpath("/subprocesses[_id eq '" + uuid + "']/indicators[id eq '" + indicatorSet + "']/instances/uuid", _WFInstance, {})[0];
                            var indObject = JSON.xpath("/indicators[_id eq '" + indicatorUUID + "']", _WFInstance, {})[0];
                            var elementpath = replaceAll(elements[i].elementProperty.elementId,"[.]","/")
                            var xpath = '/model/pending/data/'+ indicatorSet +'/' + elementpath;
                            var itemValue = JSON.xpath(xpath, indObject, {})[0];
                            value = value + itemValue + separator;
                            break;


                        case 'constantValue':

                            var itemValue = elements[i].constantValue.value;
                            value = value + itemValue+separator;
                            break;

                        case 'elementWrapper':
                            var indicatorSet = elements[i].elementWrapper.indicatorSetId;
                            var indicatorUUID = JSON.xpath("/subprocesses[_id eq '" + uuid + "']/indicators[id eq '" + indicatorSet + "']/instances/uuid", _WFInstance, {})[0];
                            var indObject = JSON.xpath("/indicators[_id eq '" + indicatorUUID + "']", _WFInstance, {})[0];
                            var elementpath = replaceAll(elements[i].elementWrapper.elementId,"[.]","/")
                            var xpath = '/' + elementpath;
                            var itemValue = JSON.xpath(xpath, indObject, {})[0];
                            value = value + itemValue+separator;
                            break;


                        case 'currentDate':

                            value = value + formatDate(new Date())+separator;
                             break;

                        case 'randomDigits':
                           var digits = elements[i].randomDigits.digits;
                           var random = Math.random();
                           var exp = Math.pow(10, digits);
                           var intPart =  (random * exp) ^ 0
                           value = value + intPart+separator;
                            break;

                        case 'profileObjectElement':
                        
                            var indicatorSet = elements[i].profileObjectElement.indicatorSetId;
                            var indObject = JSON.xpath("/indicators[category/term eq 'appProfile']",app.SCOPE.workflow,{})[0];
                            var elementpath = replaceAll(elements[i].profileObjectElement.elementId,"[.]","/")
                            var xpath = '/model/pending/data/'+ indicatorSet +'/' + elementpath;
                            var itemValue = JSON.xpath(xpath, indObject, {})[0];
                            value = value + itemValue+separator;
                            break;

                        case 'profileObjectWrapper':
                        
                            var indicatorSet = elements[i].profileObjectWrapper.indicatorSetId;
                            var indObject = JSON.xpath("/indicators[category/term eq 'appProfile']",app.SCOPE.workflow,{})[0];
                            var elementpath = replaceAll(elements[i].profileObjectWrapper.wrapperElementId,"[.]","/")
                            var xpath = '/' + elementpath;
                            var itemValue = JSON.xpath(xpath, indObject, {})[0];
                            value = value + itemValue+separator;
                            break;
                       case 'currentFinancialYear':
                            
                            var startDate = elements[i].currentFinancialYear.startDate;
                            var startMonth = elements[i].currentFinancialYear.startMonth;
                            var financialYear = new Date().getFullYear() + "-" + startMonth + "-" + startDate;
                            value = value + financialYear + separator;
                             break;
                            

                        default:
                            reject("No method found from implemented list.");
                            break;
                    }

            }

                 var i = data.calculated.elements.length - 1;
                 var elements = data.calculated.elements;

                    var possibleItems = ["elementProperty","constantValue","elementWrapper","currentDate","randomDigits", "profileObjectElement","profileObjectWrapper","currentFinancialYear"];
                    switch (propertyExists(elements[i], possibleItems)) {

                        case 'elementProperty':
                            var indicatorSet = elements[i].elementProperty.indicatorSetId;
                            var indicatorUUID = JSON.xpath("/subprocesses[_id eq '" + uuid + "']/indicators[id eq '" + indicatorSet + "']/instances/uuid", _WFInstance, {})[0];
                            var indObject = JSON.xpath("/indicators[_id eq '" + indicatorUUID + "']", _WFInstance, {})[0];
                            var elementpath = replaceAll(elements[i].elementProperty.elementId,"[.]","/")
                            var xpath = '/model/pending/data/'+ indicatorSet +'/' + elementpath;
                            var itemValue = JSON.xpath(xpath, indObject, {})[0];
                            value = value + itemValue ;
                            break;


                        case 'constantValue':

                            var itemValue = elements[i].constantValue.value;
                            value = value + itemValue;
                            break;

                        case 'elementWrapper':
                            var indicatorSet = elements[i].elementWrapper.indicatorSetId;
                            var indicatorUUID = JSON.xpath("/subprocesses[_id eq '" + uuid + "']/indicators[id eq '" + indicatorSet + "']/instances/uuid", _WFInstance, {})[0];
                            var indObject = JSON.xpath("/indicators[_id eq '" + indicatorUUID + "']", _WFInstance, {})[0];
                            var elementpath = replaceAll(elements[i].elementWrapper.elementId,"[.]","/")
                            var xpath = '/' + elementpath;
                            var itemValue = JSON.xpath(xpath, indObject, {})[0];
                            value = value + itemValue;
                            break;


                        case 'currentDate':

                            value = value + formatDate(new Date());
                             break;

                        case 'randomDigits':
                           var digits = elements[i].randomDigits.digits;
                           var random = Math.random();
                           var exp = Math.pow(10, digits);
                           var intPart =  (random * exp) ^ 0
                           value = value + intPart;
                            break;

                        case 'profileObjectElement':
                        
                            var indicatorSet = elements[i].profileObjectElement.indicatorSetId;
                            var indObject = JSON.xpath("/indicators[category/term eq 'appProfile']",app.SCOPE.workflow,{})[0];
                            var elementpath = replaceAll(elements[i].profileObjectElement.elementId,"[.]","/")
                            var xpath = '/model/pending/data/'+ indicatorSet +'/' + elementpath;
                            var itemValue = JSON.xpath(xpath, indObject, {})[0];
                            value = value + itemValue;
                            break;

                        case 'profileObjectWrapper':
                        
                            var indicatorSet = elements[i].profileObjectWrapper.indicatorSetId;
                            var indObject = JSON.xpath("/indicators[category/term eq 'appProfile']",app.SCOPE.workflow,{})[0];
                            var elementpath = replaceAll(elements[i].profileObjectWrapper.wrapperElementId,"[.]","/")
                            var xpath = '/' + elementpath;
                            var itemValue = JSON.xpath(xpath, indObject, {})[0];
                            value = value + itemValue;
                            break;
                       
                        case 'currentFinancialYear':
                            
                            var startDate = elements[i].currentFinancialYear.startDate;
                            var startMonth = elements[i].currentFinancialYear.startMonth;
                            var financialYear = new Date().getFullYear() + "-" + startMonth + "-" + startDate;
                            value = value + financialYear;
                             break;

                        default:
                            reject("No method found from implemented list.");
                            break;
                    }




            resolve(value);
        
        }

    });



};


function replaceAll(txt, replace, with_this) {
    if (typeof txt.replace != 'function') {
        console.log(replace + ' ' + with_this);
        console.log(txt);
    }
    return txt.replace(new RegExp(replace, 'g'), with_this);
}

function formatDate(date) {
  
  var day = date.getDate();
  var monthIndex = date.getMonth();
  var year = date.getFullYear();

  return day + '-' + monthIndex + '-' + year;
}


module.exports = {

    getLanguageMessage: getLanguageMessage,
    getNodeValue: getNodeValue

}
},{}],5:[function(require,module,exports){
'use strict';

var util = require('utility');

/**
 * User Interface Module
 *
 * @module lib/ui
 * @author Brent Gordon
 * @version 0.1.0
 * @description test description
 *
 */

 /**
  * Get all process sub-processes user interface data
  *
  * @param {string} processId - the Workflow config / definition process id
  * @param {string} lang - the user preffered langauge
  * @param {object} _WFInstance - the current workflow constructor instance
  *
  * @example ''
  *
  * @return ''
  *
  */
 function getProcess(processId, lang, _WFInstance){
  return new Promise(function(resolve, reject) {
    try {
      var processModel = [];
      var processInstance = [];
    	_WFInstance.instance.processes.filter(function(processItem){
    		if (processItem.id == processId) {
    			processInstance = processItem;
    		}
    	})
      // console.log(processInstance.subProcesses.length);
      util.syncLoop(processInstance.subProcesses.length, function(loop){
  			var counter = loop.iteration();
        var processSeq = processInstance.seq;
        var subProcessId = processInstance.subProcesses[counter].id;
        var subProcessSeq = processInstance.subProcesses[counter].seq;
        getSubProcess(processId, processSeq, subProcessId, subProcessSeq, lang, _WFInstance).then(function(model){
          // console.log(model);
          processModel.push(model);
          loop.next();
          // console.log(processModel);
  			}, function(err){
          // console.log(processModel);
  				loop.break();
  				reject(err);
  			});
  		}, function(){
        // console.log(processModel);
  			resolve(processModel);
  		});
    } catch(err){
      reject(err);
    }
  })
};

 /**
  * Get SubProcess user interface data
  *
  * @param {string} processId - the Workflow config / definition process id
  * @param {number} processSeq - the Workflow instance process seq
  * @param {string} subProcessId - the Workflow config / definition sub-process id
  * @param {number} subProcessSeq - the Workflow instance sub-process seq
  * @param {object} _WFInstance - the current workflow constructor instance
  *
  * @example ''
  *
  * @return ''
  *
  */
function getSubProcess(processId, processSeq, subProcessId, subProcessSeq, lang, _WFInstance){
  return new Promise(function(resolve, reject) {
    try {
      var model = {
        id: '',
        seq: '',
        name: '',
        help: '',
        dates: '',
        step: ''
      };
      var subProcess = [];
    	var subProcessConf = [];
    	_WFInstance.instance.processes.filter(function(processItem){
    		if (processItem.id == processId && processItem.seq == processSeq) {
    			var spLength = processItem.subProcesses.length;
    			processItem.subProcesses.filter(function(subProcessItem){
    				if (subProcessItem.id == subProcessId && subProcessItem.seq == subProcessSeq && subProcessItem.complete == false) {
    					subProcess = subProcessItem;
    				}
    			})
    		}
    	})
    	// Get the current subProcess configuration
    	_WFInstance.config.processes.filter(function(processConfig){
    		if (processConfig._id == processId) {
    			processConfig.subProcesses.filter(function(subProcessConfig){
    				if (subProcessConfig._id == subProcessId) {
    					subProcessConf = subProcessConfig;
    				}
    			})
    		}
    	})
      // Update the model
      model.id = subProcessConf._id;
      model.seq = subProcess.seq;
      model.name = util.getName(subProcessConf.name, lang);
      model.help = util.getName(subProcessConf.help, lang);
      model.dates = subProcess.dates;
      model.step = subProcess.step;
      resolve(model);
    } catch(err) {
      reject(err);
    }
  })
};




function prepareNotificationScreen(){

  ""
};

 module.exports = {

  getProcess: getProcess

 }

},{"utility":8}],6:[function(require,module,exports){
'use strict';


function get() {

    return new Promise(function(resolve, reject) {

    });

};

module.exports = {

    get: get

}
},{}],7:[function(require,module,exports){
'use strict';

var util = require('utility');
var actionsModule = require('./actions');
var helper = require('./helper');
var form = require('./form');

/**
 * Process Module
 *
 * @module lib/process
 * @author Hasan Abbas
 * @version 0.2.1
 * @description Workflow implementation changed as per new schema implementation
 *
 */

/**
 * Count an array of items
 *
 * @param {Array} arr - the array data
 *
 * @example ''
 *
 * @return ''
 *
 */
function count(arr) {
    if (arr !== undefined) {
        return arr.length;
    } else {
        return 0;
    }

};

/**
 * Process pre-requisites
 *
 * @param {object} prerequisites - the pre-requisites config data
 *
 * @example ''
 *
 * @return ''
 *
 */
function preRequisites(prerequisites, _WFInstance, spuuid) {
    return new Promise(function (resolve, reject) {
        // Uncomment below section when ready to implement
        var completed = [];
        try {
            util.syncLoop(prerequisites.length, function (loop) {
                var counter = loop.iteration();
                preRequisite(prerequisites[counter], _WFInstance, spuuid).then(function (data) {
                    // Check if all pre-requisites completed successfully.
                    completed.push(true);
                    loop.next();
                }, function (err) {
                    completed.push(false);
                    loop.break();
                    reject(err);
                });
            }, function () {
                if (completed.every(Boolean)) {
                    var success = util.success('Pre-requisites completed successfully.', {});
                    resolve(success);
                } else {
                    var error = util.error('WFPreRequisiteError', 'Not all pre-requisites passed.');
                    reject(error);
                }

            });
        } catch (err) {
            reject(err);
        }

    });
};

/**
 * Process pre-requisite, execute the pre-requisite condition.
 *
 * @param {object} prerequisite - the pre-requisite config data
 * @param {object} _WFInstance - the workflow constructor instance
 *
 * @example
 * Process.preRequisite(config, counter, instance, doc);
 *
 * @return ''
 *
 */
function preRequisite(prerequisite, _WFInstance, spuuid) {
    return new Promise(function (resolve, reject) {

       

        if (prerequisite.check.numberProcessInstances != undefined) {

            var numberProcessInstances = prerequisite.check.numberProcessInstances;
            var _filterOperator = numberProcessInstances.operator;
            var xpathOperator = '';
            switch (_filterOperator) {
                case 'greaterThan':
                    xpathOperator = 'gt';
                    break;
                case 'lessThan':
                    xpathOperator = 'lt';
                    break;
                case 'greaterThanEqual':
                    xpathOperator = 'ge';
                    break;
                case 'lessThanEqual':
                    xpathOperator = 'le';
                    break;
                case 'equalTo':
                    xpathOperator = 'eq';
                    break;
                case 'notEqualTo':
                    xpathOperator = 'ne';
                    break;
            }

            var _subprocessId = numberProcessInstances.subProcessId;
            var _filterElement = "step/status";
            var _filterValue = numberProcessInstances.type;
            var innerXpath = "/" + _filterElement + "[. eq '" + _filterValue + "']";

            var fullPath = "count(/subprocesses[id eq '" + _subprocessId + "']" + innerXpath + ")";

            var prereqProcessType = JSON.xpath("/config/processes/subProcesses[_id eq '" + _subprocessId + "']/type", _WFInstance, {})[0];
            var part = library.getSubprofileSubprocessIds();

            if (app.profile.subprofileId != undefined && app.profile.subprofileId != '' && prereqProcessType != undefined && prereqProcessType == PROCESS_TYPE_SUBPROFILE) {
                fullPath = "count(/subprocesses[id eq '" + _subprocessId + "' and _id = "+part+"]" + innerXpath + ")";
            }
           
            var subjectCount = JSON.xpath(fullPath, _WFInstance, {})[0];
            var countValue = prerequisite.check.numberProcessInstances.count;
            var compare = util.compare(subjectCount, prerequisite.check.numberProcessInstances.operator, parseInt(countValue));


            if (compare) {
                var success = util.success('Pre-requisites passed.', {});
                resolve(success);
            } else {

                var message = helper.getLanguageMessage(prerequisite.message);
                var error = util.error('WFPreRequisiteError', message);
                reject(error);
            }


        } else if (prerequisite.check.variable != undefined) {

            var scope = prerequisite.check.variable.scope;
            var fileName = '';
            
            if(scope  == "profile"){
                
                var profileId = _WFInstance.profile;
                fileName = profileId + ':variables';

            } else if (scope  == "subProfileSubProcessInstance") {

                var subProfileId = app.profile.subprofileId;
                fileName = subProfileId + ':variables';

            } else {
                reject("ERROR: Scope '"+ scope +"' not implemented in pre-requisites");
            }

            dao.get(fileName).then(function(file) {

                var variableName = prerequisite.check.variable.name;
                var obj = eval('file.' + variableName);
                var subjectValueCalculated;

                if (typeof obj == 'object') {

                    var seq = JSON.xpath("count(/subprocesses[_id eq '" + spuuid + "']/preceding-sibling::node()[id = /subprocesses[_id eq '" + spuuid + "']/id])", _WFInstance, {})[0] + 1;
                    var subprocessType = JSON.xpath("/config/processes/subProcesses[_id eq /subprocesses[_id eq '" + spuuid + "']/id]/type", _WFInstance, {})[0];
                    var part = library.getSubprofileSubprocessIds();
                    if (subprocessType == PROCESS_TYPE_SUBPROFILE) {
                        seq = JSON.xpath("count(/subprocesses[_id eq '" + spuuid + "']/preceding-sibling::node()[id = /subprocesses[_id eq '" + spuuid + "']/id and _id = /subprocesses[_id = "+part+"]/_id])", _WFInstance, {})[0] + 1;
                    }
                    var valuePath = "/" + variableName + "[seq eq '" + seq + "']/value";
                    subjectValueCalculated = JSON.xpath(valuePath, file, {})[0];

                } else if (typeof obj == 'string') {

                    subjectValueCalculated = obj;

                }


                var inputValue = prerequisite.check.variable.value.data;
                var inputDataType = prerequisite.check.variable.value.dataType.dataType;
                
                var finalValue;
                if(inputDataType == 'number' ){
                    finalValue = Number(inputValue);
                } else if(inputDataType == 'string') {
                    finalValue = inputValue;
                } else if(inputDataType == 'integer'){
                    finalValue = parseInt(inputValue);
                } else if(inputDataType == 'decimal'){
                    finalValue = parseFloat(inputValue);
                } else if(inputDataType == 'date' || inputDataType == 'dateTime' ){
                    finalValue = inputValue;
                }

                var compare = util.compare(subjectValueCalculated, prerequisite.check.variable.operator, finalValue);
                if (compare) {
                    var success = util.success('Variable Pre-requisites passed.', {});
                    resolve(success);
                } else {

                    var message = helper.getLanguageMessage(prerequisite.message);
                    var error = util.error('WFPreRequisiteError', message);
                    reject(error);
                }
            }).catch(function(error) {

                var message = helper.getLanguageMessage(prerequisite.message);
                var error = util.error('WFPreRequisiteError:', message);
                reject(error);

            });

        } else {

            var error = util.error('WFPreRequisiteError', 'Pre-requisite type not defined.');
            reject(error);

        }

       

    });
};

/**
 * Process pre-actionss
 *
 * @param {object} preActions - the pre-actions config data
 * @param {object} _WFInstance - the current workflow constructor instance
 *
 * @example ''
 *
 * @return ''
 *
 */
function preActions(preActions, _WFInstance, spuuid) {
    return new Promise(function (resolve, reject) {
        var completed = [];
        try {

            var  spObject = JSON.xpath("/subprocesses[_id eq '"+ spuuid +"']", _WFInstance , {})[0];
            var processID = spObject["meta-data"].processConfigId;
            var processId = spObject["meta-data"].subProcessConfigId;
            var processSEQ = spObject["meta-data"].subProcessInsSeq;
            var processSeq = spObject["meta-data"].subProcessInsSeq;

            var subProcessConfigObject = JSON.xpath("/processes[_id eq '"+processID+"']/subProcesses[_id eq '"+ processId+"']", _WFInstance.config , {})[0];
            var stepObject = JSON.xpath("/subprocesses[_id eq '"+ spuuid +"']/step",_WFInstance, {})[0];
            util.syncLoop(preActions.length, function (loop) {
                var counter = loop.iteration();
                action(preActions[counter], processID, processSEQ, processId, processSeq, subProcessConfigObject, stepObject ,_WFInstance, {}, spuuid).then(function (data) {
                    // Check if all pre-requisites completed successfully.
                    completed.push(true);
                    loop.next();
                }, function (err) {
                    completed.push(false);
                    loop.break();
                    reject(err);
                });
            }, function () {
                if (completed.every(Boolean)) {
                    var success = util.success('Pre-actions completed successfully.', {});
                    resolve(success);
                } else {
                    var error = util.error('WFPreRequisiteError', 'Not all pre-actions passed.');
                    reject(error);
                }

            });
        } catch (err) {
            reject(err);
        }

    });
};

/**
 * Workflow get sub-process data.
 *
 * @param {string} id - the subProcess config id
 * @param {object} _WFInstance - the current workflow constructor instance
 *
 * @example ""
 *
 * @return ""
 *
 */
function getSubProcess(id, _WFInstance) {
    if (_WFInstance.subprocesses == undefined) {
        return [];
    } else {
        _WFInstance.subprocesses.filter(function (subProcess) {
            if (subProcess.id == id) {
                return subProcess;
            }

        });
    }

};

/**
 * Process sub-process
 *
 * @param {object} process - the current process id and seq
 * @param {object} subProcess - the sub-process id and seq
 * @param {object} data - the user input data
 * @param {object} _WFInstance - the current workflow constructor instance
 *
 * @example ''
 *
 * @return ''
 *
 */
function subProcess(processId, processSeq, subProcessId, subProcessSeq, subprofileId, data, _WFInstance) {
    // Get the current process subProcess instance
    // var subProcessSeq = 1;
    var subProcess = [];
    var processConf = [];
    var subProcessConf = [];
    _WFInstance.instance.processes.filter(function (objProcess) {
        if (objProcess.id == processId && objProcess.seq == processSeq) {
            var spLength = objProcess.subProcesses.length;
            objProcess.subProcesses.filter(function (objSubProcess) {
                if (objSubProcess.id == subProcessId && objSubProcess.seq == subProcessSeq) {
                    var uuid = objSubProcess.uuid;
                    _WFInstance.subprocesses.filter(function (subProcessItem) {
                        if (subProcessItem._id == uuid) {
                            subProcess = subProcessItem;
                        }

                    })
                }

            })
        }

    });
    // Get the current subProcess configuration
    _WFInstance.config.processes.filter(function (processConfig) {
        if (processConfig._id == processId) {
            processConf = processConfig;
            processConfig.subProcesses.filter(function (subProcessConfig) {
                if (subProcessConfig._id == subProcessId) {
                    subProcessConf = subProcessConfig;
                }

            })
        }

    });

    //TODO: Change required to move isActive to subProcess file.Here
    var groupKey = '';
    var baseUUID = data.baseUUID;
    
    if (baseUUID != undefined && baseUUID != '' && baseUUID.length > 0) {
        
        var previousObject = JSON.xpath("/subprocesses[_id eq '" + baseUUID + "']", _WFInstance, {})[0];
        groupKey = previousObject.groupKey;

    } else {

        var cardIndList = '';
        for(var i = 0; i < subProcessConf.indicators.length-1; i++){
            cardIndList = cardIndList + "'"+ subProcessConf.indicators[i]._id + "',";
        }
        cardIndList = cardIndList + "'"+ subProcessConf.indicators[i]._id + "'";
        var singleCard = JSON.xpath("/indicators[setId = ("+ cardIndList +") and cardinality eq 'single']", app.SCOPE.APP_CONFIG,{}).length;

        if(subProcessConf.instanceType.newSequence != undefined || singleCard > 0){
            var previousObject = JSON.xpath("/instance/processes[id eq '" + processId + "']", _WFInstance, {})[0];
            if(previousObject != undefined && previousObject.subProcesses.length > 0) {
                groupKey = previousObject.subProcesses[0].groupKey;
            } else {
                groupKey = generateUUID();
            }
        } else {
            groupKey = generateUUID();

        } 
     }
    
    var countSubprocessInContext = JSON.xpath("count(/processes/subProcesses[groupKey eq '"+ groupKey +"'])", _WFInstance.instance ,{})[0];
    var label = data.label;
    var subProcessObjectId = generateUUID();
    var model = {
        _id: subProcessObjectId,
        id: subProcessId,
        type: 'workflowInstanceSubProcess',
        dateTimeCreated: new Date(),
        dueDateTime: new Date(),
        seq: subProcessSeq,
        initiated: false,
        dates: {
            created: '',
            valid: '',
            start: '',
            due: '',
            closed: ''
        },
        complete: false,
        indicators: [],
        step: {},
        active: true,
        groupKey: groupKey,
        label: label,
        channels: [
            "community_" + app.SCOPE.getCommunityId(),
            "profile_" + app.SCOPE.profileId,
            "application_" + app.SCOPE.applicationId,
            "community_" + app.SCOPE.getCommunityId() + "_application_" + app.SCOPE.applicationId
        ],
        history: [],
        //meta information added for server side conflict management and merger
        "meta-data": {
            applicationId: app.SCOPE.applicationId,
            communityId: app.SCOPE.getCommunityId(),
            profileId: app.SCOPE.profileId,
            subprofileId: subprofileId == undefined? '': subprofileId,
            processConfigId: processId,
            subProcessConfigId: subProcessId,
            subProcessInsSeq: countSubprocessInContext + 1
        },
        messages: [],
        spStatus:''
    };

    _WFInstance.subprocesses.push(model);
    // Return a promise
    return new Promise(function (resolve, reject) {
        // Catch all uncaught errors
        try {
            // 1. Process the pre-actions
            var preActionsConf = processConf.preActions;
            //action(actions[counter], processId, processSeq, subProcessId, subProcessSeq, subProcess, step, _WFInstance, data, uuid)
            preActions(preActionsConf, _WFInstance, subProcessObjectId).then(function (result) {
                // 2. Process the pre-requisites
                var prerequisiteConf = processConf.prerequisites;
                preRequisites(prerequisiteConf, _WFInstance, subProcessObjectId).then(function (result) {
                    // 3. Initiate the subProcess
                    var initiateConf = subProcessConf.initiate;
                    initiate(initiateConf, subProcess, data).then(function (result) {
                        //Update the subProcess model
                        model.initiated = result.data.initiated;
                        model.dates = result.data.dates;
                        // Execute the first step
                        var stepId = subProcessConf.steps[0]._id;
                        var transitionId = subProcessConf.steps[0].transition[0]._id;
                        var stepSeq = 1;
                        step(processId, processSeq, subProcessId, subProcessSeq, stepId, stepSeq, data, _WFInstance, subProcessObjectId)
                            .then(function (result) {
                                model.step = result.data;
                                indicators(subProcessConf.indicators, _WFInstance, model._id).then(function (result1) {
                                    model.indicators = result1.data;
                                    // Execute the transitions, if auto
                                    //Subprocess postActions removed from here as they should be executed at the end of the subProcess, means at last step after transition, just before finish.

                                     // Can add history object here in case for first step, i.e initialisation
                                    // model.history.push(result.data);


                                    var success = util.success(result1.message, model);
                                    resolve(success);


                                }, function (err) {
                                    reject(err);
                                })
                            }, function (err) {
                                reject(err);
                            })
                    }, function (err) {
                        _WFInstance.subprocesses = _WFInstance.subprocesses.filter(function (obj) {
                            return !(obj._id == subProcessObjectId);
                        });
                        reject(err);
                    })
                }, function (err) {
                    _WFInstance.subprocesses = _WFInstance.subprocesses.filter(function (obj) {
                        return !(obj._id == subProcessObjectId);
                    });
                    reject(err);
                })
            }, function (err) {
                _WFInstance.subprocesses = _WFInstance.subprocesses.filter(function (obj) {
                    return !(obj._id == subProcessObjectId);
                });
                reject(err);
            })
        } catch (err) {
            reject(err);
        }

    });
};

/**
 * Process initiate
 *
 * @param {object} initiate - the initiate config data
 * @param {object} data - the user input data
 *
 * @example ''
 *
 * @return ''
 *
 */
function initiate(initiate, subProcess, data) {
    var completed = [];
    var result = {
        initiated: false,
        dates: {
            created: '',
            valid: '',
            start: '',
            due: '',
            closed: ''
        }

    };

    return new Promise(function (resolve, reject) {
        var init = function () {

            if (initiate.user != undefined) {
                result.dates.created = data.createdDate;
                if (initiate.user.validDate._type == 'userSelected' || initiate.user.validDate._type == 'autoSelected') {
                    if (data.validDate != undefined) {
                        result.dates.valid = data.validDate;
                    } else {
                        result.dates.valid = new Date().toISOString().substring(0,10);
                    }

                }

                if (initiate.user.dueDate._type == 'userSelected' || initiate.user.dueDate._type == 'autoSelected') {
                    if (data.dueDate !== undefined) {
                        result.dates.due = data.dueDate;
                    } else {
                        util.warn('WFInitiateError', 'No due date passed in - {data.dueDate}');
                    }

                }

                result.dates.start = data.firstDate;



                result.initiated = true;
                var success = util.success('Sub-Process initiate completed successfully.', result);
                resolve(success);

            } else if (initiate.auto != undefined) {

                /*
                result.dates.created = data.createdDate;

                if (initiate.dates.valid._type == 'userSelected' || initiate.dates.valid._type == 'autoSelected') {
                    if (data.validDate !== undefined) {
                        result.dates.valid = data.validDate;
                    } else {
                        util.warn('WFInitiateError', 'No valid date passed in - {data.validDate}');
                    }

                }

                if (initiate.dates.due._type == 'userSelected' || initiate.dates.due._type == 'autoSelected') {
                    if (data.dueDate !== undefined) {
                        result.dates.due = data.dueDate;
                    } else {
                        util.warn('WFInitiateError', 'No due date passed in - {data.dueDate}');
                    }

                }

                result.initiated = true;
                var success = util.success('Sub-Process initiate completed successfully.', result);
                resolve(success);*/

            } else {

                var error = util.error('WFInitiateError', 'Initiate type: ' + initiate._type + ' not defined.');
                reject(error);

            }

        }

        if (subProcess.complete == undefined) {
            init();
        } else if (!subProcess.complete) {
            if (initiate.parallelInstances) {
                init();
            } else {
                var error = util.error('WFInitiateError', 'Sub-process: ' + subProcess.id + ' still active and parallel instances are not allowed.');
                reject(error);
            }

        }

    });
};

/**
 * Process step
 *
 * @param {string} processId - the current process id
 * @param {string} subProcessId - the current sub-process id
 * @param {string} stepId - the current sub-process step id
 * @param {number} stepSeq - the current sub-process step instance counter / sequence
 * @param {object} data - the user input data
 * @param {object} _WFInstance - the current _WFInstance constructor instance
 *
 * @example ''
 *
 * @return ''
 *
 */
function step(processId, processSeq, subProcessId, subProcessSeq, stepId, stepSeq, data, _WFInstance, spuuid) {

    // Default step model
    var model = {
        key: generateUUID(),
        id: '',
        seq: '',
        status: '',
        message: '',
        assignedTo: {
            userId: '',
            name: '',
            dateTime:'',
            type:'',
            dueDateTime:'',
            by:''
        },
        assignmentHistory:[],
        dateTimeCreated: new Date(),
        dueDateTime: new Date(),
        transition:{
            transitionId:'',
            dateTime:'',
            userId: ''
        },
        assignment: {},
        comment: ''
    };

    var subProcess = {};

    var uuid = '';
    var instSubProcess;
    var step = {};

    var transitionId = '';
    return new Promise(function (resolve, reject) {
        try {
            //Get the current subProcess instance data
            _WFInstance.instance.processes.filter(function (objProcess) {
                if (objProcess.id == processId && objProcess.seq == processSeq) {
                    objProcess.subProcesses.filter(function (objSubProcess) {
                        if (objSubProcess.id == subProcessId && objSubProcess.seq == subProcessSeq) {
                            uuid = objSubProcess.uuid;
                        }

                    })
                }

            })
            _WFInstance.subprocesses.filter(function (subProcessItem) {
                if (subProcessItem._id == uuid) {
                    instSubProcess = subProcessItem;
                }

            })
            _WFInstance.config.processes.filter(function (objProcess) {
                if (objProcess._id == processId) {
                    objProcess.subProcesses.filter(function (objSubProcess) {
                        if (objSubProcess._id == subProcessId) {
                            subProcess = objSubProcess;
                            objSubProcess.steps.filter(function (objStep) {
                                if (objStep._id == stepId) {
                                    step = objStep;
                                }

                            })
                        }

                    })
                }

            });
            // Update the sub-process step data
            model.id = stepId;
            model.seq = stepSeq;

            var instanceStatus = '';
            if (step.setInstanceStatusTo.NotStarted != undefined) {
                instanceStatus = "NotStarted";
            } else if (step.setInstanceStatusTo.Created != undefined) {
                instanceStatus = "Created";
            } else if (step.setInstanceStatusTo.InProgress != undefined) {
                instanceStatus = "InProgress";
            } else if (step.setInstanceStatusTo.Submitted != undefined) {
                instanceStatus = "Submitted";
            } else if (step.setInstanceStatusTo.Complete != undefined) {
                instanceStatus = "Complete";
            }

            var language = service.getLanguage();

            model.status = instanceStatus;
            model.message = eval("step.setInstanceStatusTo." + instanceStatus + ".label.i18n." + language);
            model.comment = data.comment !== undefined ? data.comment : '';
            var indicators = instSubProcess !== undefined ? instSubProcess.indicators : [];

            var updateSPIndicatorObject = function(indicators, _WFInstance){

                if(indicators.length > 0){

                    for(var i=0 ; i < indicators.length; i++){
                        var indicatorObject  = indicators[i];
                        var uuid = indicatorObject.instances[0].uuid;
                        var updatedSeq = JSON.xpath("/indicators[_id eq '"+ uuid +"']/model/pending/seq", _WFInstance, {})[0];
                        indicatorObject.instances[0].seq = updatedSeq;
                    }

                }
            };
            
            indicatorDocs(processId, indicators, model, _WFInstance).then(function (result) {
                uuid = spuuid;

                if (step.function.actions != undefined) {
                    actions(step.function.actions, processId, processSeq, subProcessId, subProcessSeq, subProcess, model, _WFInstance, data, spuuid)
                        .then(function (result) {
                            updateSPIndicatorObject(indicators, _WFInstance);
                            var transitionId = step.transition[0]._id;
                            transition(processId, processSeq, subProcessId, subProcessSeq, stepId, transitionId, data, _WFInstance, spuuid, model).then(function (result) {
                                var success = util.success('Transition completed successfully.', result.data.step);
                                resolve(success);
                            }, function (err) {
                                reject(err);
                            });
                        }, function (err) {
                            reject(err);
                        })
                 
                } else if (step.function.task != undefined) {
                    // Make assignments
                    task(processId, processSeq, step.function.task, spuuid, model).then(function (result) {

                        updateSPIndicatorObject(indicators, _WFInstance);
                        var success = util.success('Task awaiting user action.', model);
                        resolve(success);
                    }, function (err) {
                        reject(err);
                    });

                } else if (step.function.server != undefined) {
                    // Make assignments
                    server(step.function.server, processId, processSeq, subProcessId, subProcessSeq, subProcess, model, _WFInstance, data, spuuid).then(function (result) {

                        updateSPIndicatorObject(indicators, _WFInstance);
                        var success = util.success('Server awaiting server response.', model);
                        resolve(success);
                    }, function (err) {
                        reject(err);
                    });

                }

            }, function (err) {
                reject(err);
            })
        } catch (err) {
            reject(err);
        }

    });
};

/**
 * Process indicator updates
 *
 * @param {object} actions - the actions config data
 * @param {object} subProcess - the current sub-process form config data
 * @param {object} _WFInstance - the current workflow constructor instance
 *
 * @example ''
 *
 * @return ''
 *
 */
function indicators(indicators, _WFInstance, spuuid) {
    var model = [];
    return new Promise(function (resolve, reject) {
        try {
            var array = JSON.xpath("indicators[fn:count(./workflows/processes[subProcessUUID eq '" + spuuid + "']) gt 0]", _WFInstance, {});
            for (var j = 0; j < array.length; j++) {
                var indicator = array[j];
                var indicatorModel = {
                    id: '',
                    instances: []
                }

                var instanceModel = {
                    uuid: '',
                    title: '',
                    key: '',
                    seq: 1,
                    rev: ''
                }

                indicatorModel.id = indicator.category.term;
                instanceModel.uuid = indicator._id;
                instanceModel.rev = indicator._rev;
                instanceModel.title = indicator.title;
                instanceModel.key = '';
                instanceModel.seq = indicator.model.pending.seq; // indicator seq number here which is getting updated.
                indicatorModel.instances.push(instanceModel);
                model.push(indicatorModel);
            }

            var success = util.success('Process indicator model updated.', model);
            resolve(success);
        } catch (err) {
            reject(err);
        }

    })
};

/**
 * Process assign user
 *
 * @param {string} processId - the Workflow config / definition process id
 * @param {number} processSeq - the Workflow instance process seq
 * @param {string} subProcessId - the Workflow config / definition sub-process id
 * @param {number} subProcessSeq - the Workflow instance sub-process seq
 * @param {string} stepId - the Workflow config / definition step id
 * @param {string} transitionId - the Workflow config / definition transition id
 * @param {object} user - the user to assign to
 * @param {object} _WFInstance - the current workflow constructor instance
 *
 * @example ''
 *
 * @return ''
 *
 */
function assignUser(processId, processSeq, subProcessId, subProcessSeq, user, uuid, _WFInstance) {
    return new Promise(function (resolve, reject) {
        try {
           
            // Get the current subProcess instance data

            /*
            _WFInstance.instance.processes.filter(function (objProcess) {
                if (objProcess.id == processId && objProcess.seq == processSeq) {
                    objProcess.subProcesses.filter(function (objSubProcess) {
                        if (objSubProcess.id == subProcessId && objSubProcess.seq == subProcessSeq) {
                            uuid = objSubProcess.uuid;
                        }
                    });
                }
            });
            */
            
            _WFInstance.subprocesses.filter(function (subProcessItem) {
                if (subProcessItem._id == uuid) {
                    //Added to hstory
                    if(subProcessItem.step.assignmentHistory == undefined){
                        subProcessItem.step.assignmentHistory = [];
                    }
                    if(subProcessItem.step.assignedTo.userId != "" && subProcessItem.step.assignedTo.name != ""){
                        subProcessItem.step.assignmentHistory.push(JSON.parse(JSON.stringify(subProcessItem.step.assignedTo)));
                    }
                    

                    // Set the user details
                    subProcessItem.step.assignedTo.userId = user.id;
                    subProcessItem.step.assignedTo.name = user.name;
                    subProcessItem.step.assignedTo.dateTime = new Date();
                    subProcessItem.step.assignedTo.type = ASSIGNMENT_TYPE_REASSIGNMENT;
                    subProcessItem.step.assignedTo.dueDateTime = '';
                    subProcessItem.step.assignedTo.by = LOCAL_SETTINGS.SUBSCRIPTIONS.userId + "";
                    
                    // Update the indicators user details
                    var indicators = subProcessItem.indicators;
                    for (var i = 0; i < indicators.length; i++) {
                        var indicator = indicators[i];
                        for (var j = 0; j < indicator.instances.length; j++) {
                            var instance = indicator.instances[j];
                            for (var k = 0; k < _WFInstance.indicators.length; k++) {
                                var doc = _WFInstance.indicators[k];
                                if (instance.uuid == doc._id) {
                                    doc.workflows.filter(function (workflow) {
                                        if (workflow.id == _WFInstance.config._id) {
                                            workflow.processes.filter(function (processItem) {
                                                if (processItem.id == processId) {
                                                    // Update the user id and name in the document
                                                    processItem.step.assignedTo.userId = user.id;
                                                    processItem.step.assignedTo.name = user.name;
                                                }

                                            })
                                        }

                                    })
                                }

                            }

                        }

                    }
                    //Send assign user notification from here

                    var notification = JSON.xpath("/processes[_id eq '"+ processId +"']/notifications",_WFInstance.config, {})[0];

                    if(notification != undefined && notification.reAssignment != undefined){

                        actionsModule.notification.reAssignmentNotification(notification, _WFInstance, uuid, user).then(
                            function(success){
                                var success = util.success('User assigned successfully. UserId: "' + user.id + '", Name: "' + user.name + '"', subProcessItem);
                                resolve(success);
                        }).catch(
                            function(fail){
                            resolve(fail);
                        });
                        

                    } else {

                        var success = util.success('User assigned successfully. UserId: "' + user.id + '", Name: "' + user.name + '"', subProcessItem);
                        resolve(success);

                    }

                   


                    
                }

            })
        } catch (err) {
            reject(err);
        }

    });
};

/**
 * Process indicator document updates
 *
 * @param {object} actions - the actions config data
 * @param {object} subProcess - the current sub-process form config data
 * @param {object} _WFInstance - the current workflow constructor instance
 *
 * @example ''
 *
 * @return ''
 *
 */
function indicatorDocs(processId, indicators, step, _WFInstance) {
    return new Promise(function (resolve, reject) {
        try {
            // Update the indicator sections of the subProcess
            if (indicators == undefined) {
                var error = util.error('WFIndicatorsUpdate', 'Indicators parameter is required. - Value: ' + indicators)
                reject(err);
            } else {
                for (var i = 0; i < indicators.length; i++) {
                    var indicator = indicators[i];
                    for (var j = 0; j < indicator.instances.length; j++) {
                        var instance = indicator.instances[j];
                        for (var k = 0; k < _WFInstance.indicators.length; k++) {
                            var doc = _WFInstance.indicators[k];
                            if (instance.uuid == doc._id) {
                                doc.workflows.filter(function (workflow) {
                                    if (workflow.id == _WFInstance.config._id) {
                                        workflow.processes.filter(function (processItem) {
                                            if (processItem.id == processId) {
                                                processItem.step.id = step.id;
                                                processItem.step.seq = step.seq;
                                                processItem.step.status = step.status;
                                                processItem.step.message = step.message;
                                                processItem.step.assignedTo.userId = step.assignedTo.userId;
                                                processItem.step.assignedTo.name = step.assignedTo.name;
                                                processItem.step.comment = step.comment !== undefined ? step.comment : '';
                                            }

                                        })
                                    }

                                })
                            }

                        }

                    }

                }

                var success = util.success('Indicator documents workflow process model updated.', _WFInstance);
                resolve(success);
            }

        } catch (err) {
            reject(err);
        }

    })
};

/**
 * Process actions
 *
 * @param {object} actions - the actions config data
 * @param {object} subProcess - the current sub-process form config data
 * @param {object} _WFInstance - the current workflow constructor instance
 *
 * @example ''
 *
 * @return ''
 *
 */

function actions(actions, processId, processSeq, subProcessId, subProcessSeq, subProcess, step, _WFInstance, data, uuid) {
    var arrActions = [];
    return new Promise(function (resolve, reject) {
        util.syncLoop(actions.length, function (loop) {
            var counter = loop.iteration();
            action(actions[counter], processId, processSeq, subProcessId, subProcessSeq, subProcess, step, _WFInstance, data, uuid)
                .then(function (result) {
                    var retAction = {
                        id: actions[counter]._id,
                        seq: counter,
                        data: result
                    };

                    arrActions.push(retAction);
                    loop.next();
                }, function (err) {
                    loop.break();
                    reject(err);
                });
        }, function () {
            var success = util.success('Actions completed successfully.', arrActions);
            resolve(success);
        });
    });
};

/**
 * Process action
 *
 * @param {object} action - the action config data
 * @param {object} subProcess - the current sub-process form config data
 * @param {object} _WFInstance - the current workflow constructor instance
 *
 * @example ''
 *
 * @return ''
 *
 */ 
function action(action, processId, processSeq, subProcessId, subProcessSeq, subProcess, step, _WFInstance, data, uuid) {
    return new Promise(function (resolve, reject) {

        if (action.method != undefined) {
            var methodPossibleItems = ["form", "indicator", "profile", "subProcessInstance", "step", "community", "application", "user", "sdo", "performance", "taxonomy", "variables", "notification","report","worker"];
            switch (propertyExists(action.method, methodPossibleItems)) {
                case 'form':
                    if (action.method.form.create != undefined) {

                        var args = [];
                        args.push(processId);
                        args.push(subProcess);
                        args.push(step);
                        args.push(action);
                        args.push(processSeq);
                        args.push(subProcessSeq);

                        args.push(_WFInstance);
                        args.push(data.createType);
                        args.push(uuid);
                        args.push(data.baseUUID);
                        args.push(data);

                        form.create(args).then(function (result) {
                            resolve(result.data);
                        }, function (err) {
                            reject(err);
                        });

                    } else if (action.method.form.authorise != undefined) {

                        var args = [];
                        args.push(processId);
                        args.push(subProcess);
                        args.push(processSeq);
                        args.push(subProcessSeq);
                        args.push(_WFInstance);
                        args.push(data.createType);
                        args.push(uuid);
                        args.push(data.baseUUID);
                        args.push(data);
                        form.authorise(args).then(function (result) {
                            resolve(result.data);
                        }, function (err) {
                            reject(err);
                        });

                    } else if (action.method.form.undraft != undefined) {
                        var args = [];
                        args.push(_WFInstance);
                        args.push(data.createType);
                        args.push(uuid);
                        args.push(data.baseUUID);
                        args.push(data);
                        form.setUnDraft(args).then(function (result) {
                            resolve(result.data);
                        }, function (err) {
                            reject(err);
                        });

                    } else if (action.method.form.draft != undefined) {
                        var args = [];
                        args.push(_WFInstance);
                        args.push(data.createType);
                        args.push(uuid);
                        args.push(data.baseUUID);
                        args.push(data);
                        form.setDraft(args).then(function (result) {
                            resolve(result.data);
                        }, function (err) {
                            reject(err);
                        });

                    } else if (action.method.form.close != undefined) {

                        var args = [];
                        args.push(subProcess.indicators);
                        args.push(_WFInstance);
                        args.push(data.createType);
                        args.push(uuid);
                        args.push(data.baseUUID);
                        args.push(data);
                        form.close(args).then(function (result) {
                            resolve(result.data);
                        }, function (err) {
                            reject(err);
                        });

                    } else if (action.method.form.authoriseAndCreateNewSeq != undefined) {

                        var args = [];
                        args.push(processId);
                        args.push(subProcess);
                        args.push(processSeq);
                        args.push(subProcessSeq);
                        args.push(_WFInstance);
                        args.push(data.createType);
                        args.push(uuid);
                        args.push(data.baseUUID);
                        args.push(data);
                        form.authorise(args).then(function (result) {
                            
                             // Create new sequence

                            var args = [];
                            args.push(processId);
                            args.push(subProcess);
                            args.push(step);
                            args.push(action);
                            args.push(processSeq);
                            args.push(subProcessSeq);

                            args.push(_WFInstance);
                            args.push(data.createType);
                            args.push(uuid);
                            args.push(uuid);
                            args.push(data);

                            form.create(args).then(function (result) {
                                resolve(result.data);
                            }, function (err) {
                                reject(err);
                            });



                            //Ed creation of new sequence



                        }, function (err) {
                            reject(err);
                        });

                    } 

                    break;
                case 'indicator':
                    if (action.method.indicator.create != undefined) {

                        resolve("Not implemented");

                    } else if (action.method.indicator.instantiate != undefined) {

                        resolve("Not implemented");

                    } else if (action.method.indicator.setValue != undefined) {

                        var path = action.method.indicator.setValue.path;

                        helper.getNodeValue(action.method.indicator.setValue.data, _WFInstance, uuid).then(function (dataValue) {

                            var args = [];
                            args.push(_WFInstance);
                            args.push(uuid);
                            args.push(path);
                            args.push(dataValue);

                            form.updateIndicator(args).then(function (result) {
                                resolve(result.data);
                            }, function (err) {
                                reject(err);
                            });

                        }, function (err) {
                            reject(err);
                        });


                    } else if (action.method.indicator.updateStatus != undefined) {

                        var indicatorSetId = action.method.indicator.indicatorSetId;
                        var args = [];
                        args.push(_WFInstance);
                        args.push(uuid);

                        if (action.method.indicator.updateStatus != undefined) {
                            var status = action.method.indicator.updateStatus;
                            args.push(status);
                            args.push(indicatorSetId);
                            // Keep indicator functions in indiator file istead of form file.
                            form.markUpdateIndicator(args).then(function (result) {
                                resolve(result.data);
                            }, function (err) {
                                reject(err);
                            });

                        } else {
                            resolve("Action indicator sub type not found.");
                        }

                    } else if (action.method.indicator.setWrapperElement != undefined) {

                        var path = action.method.indicator.setWrapperElement.path;
                        var indicatorSetId = action.method.indicator.setWrapperElement.indicatorSetId;

                        helper.getNodeValue(action.method.indicator.setWrapperElement.data, _WFInstance, uuid).then(function (dataValue) {

                            var args = [];
                            args.push(_WFInstance);
                            args.push(uuid);
                            args.push(path);
                            args.push(dataValue);
                            args.push(indicatorSetId);

                            form.updateIndicatorWrapper(args).then(function (result) {
                                resolve(result.data);
                            }, function (err) {
                                reject(err);
                            });

                        }, function (err) {
                            reject(err);
                        });


                    }

                    break;
                case 'profile':
                    if (action.method.profile.create != undefined) {

                        var args = [];
                        args.push(processId);
                        args.push(_WFInstance);
                        args.push(data.createType);
                        args.push(uuid);
                        args.push(data.baseUUID);
                        args.push(data);
                        form.createProfile(args).then(function (result) {
                            resolve(result.data);
                        }, function (err) {
                            reject(err);
                        });

                    } else if (action.method.profile.setStatusTo != undefined) {

                            var args = [];
                            var status = action.method.profile.setStatusTo;
                            
                            args.push(_WFInstance);
                            args.push(uuid);
                            args.push(status);
                           
                            form.setStatus(args).then(function (result) {
                                resolve(result.data);
                            }, function (err) {
                                reject(err);
                            });

                    }

                    break;
                case 'subProcessInstance':
                    var spPossibleItems = ["instantiate", "authorise", "close", "setVariable", "setStatusTo", "setStatusMsgTo", "setTitle", "setValidDate"];
                    switch (propertyExists(action.method.subProcessInstance, spPossibleItems)) {

                        case 'setTitle':
                            helper.getNodeValue(action.method.subProcessInstance.setTitle, _WFInstance, uuid).then(function (dataValue) {

                                actionsModule.subProcessInstance.setTitle(action.method.subProcessInstance.setTitle, uuid, dataValue, _WFInstance).then(function (result) {
                                    resolve(result.data);
                                }, function (err) {
                                    reject(err);
                                });

                            }, function (err) {
                                reject(err);
                            });

                            //update subprocess label in workflow instance process object: TODO
                            break;

                        case 'setValidDate':
                            helper.getNodeValue(action.method.subProcessInstance.setValidDate, _WFInstance, uuid).then(function (dataValue) {
                                actionsModule.subProcessInstance.setValidDate(action.method.subProcessInstance.setValidDate, uuid, dataValue, _WFInstance).then(function (result) {
                                    resolve(result.data);
                                }, function (err) {
                                    reject(err);
                                });
                            }, function (err) {
                                reject(err);
                            });

                            //update subprocess label in workflow instance process object: TODO
                            break;

                        default:
                            reject("No method found from implemented list in subprocess action.");
                            break;
                    }

                    break;
                case 'step':
                    break;
                case 'community':
                    var communityPossibleItems = ["createCommunity", "releaseAdoptedApplication", "userJoinCommunity"];
                    switch (propertyExists(action.method.community, communityPossibleItems)) {

                        case 'createCommunity':
                            return actionsModule.community.createCommunity(action.method.community.createCommunity, uuid, _WFInstance).then(function (result) {
                                resolve(result.data);
                            }, function (err) {
                                reject(err);
                            });

                        case 'releaseAdoptedApplication':
                            return actionsModule.community.releaseAdoptedApplication(action.method.community.releaseAdoptedApplication, uuid, _WFInstance).then(function (result) {
                                resolve(result.data);
                            }, function (err) {
                                reject(err);
                            });

                        case 'userJoinCommunity':
                            return actionsModule.community.userJoinCommunity(action.method.community.userJoinCommunity, uuid, _WFInstance).then(function (result) {
                                resolve(result.data);
                            }, function (err) {
                                reject(err);
                            });

                        default:
                            reject("No method found from implemented list.");
                            break;
                    }

                    break;
                case 'application':
                    var applicationPossibleItems = ["createAppDefinition", "buildApplication", "applicationAdoption"];
                    switch (propertyExists(action.method.application, applicationPossibleItems)) {

                        case 'createAppDefinition':
                            return actionsModule.application.createAppDefinition(action.method.application.createAppDefinition, uuid, _WFInstance).then(function (result) {
                                resolve(result.data);
                            }, function (err) {
                                reject(err);
                            });

                        case 'buildApplication':
                            return actionsModule.application.buildApplication(action.method.application.buildApplication, uuid, _WFInstance).then(function (result) {
                                resolve(result.data);
                            }, function (err) {
                                reject(err);
                            });

                        case 'applicationAdoption':
                            return actionsModule.application.applicationAdoption(action.method.application.applicationAdoption, uuid, _WFInstance).then(function (result) {
                                resolve(result.data);
                            }, function (err) {
                                reject(err);
                            });

                        default:
                            reject("No method found from implemented list.");
                            break;
                    }

                    break;

                case 'user':
                    break;
                case 'sdo':
                    var sdoPossibleItems = ["create","enrollCourse"];
                    switch (propertyExists(action.method.sdo, sdoPossibleItems)) {

                        case 'create':
                            return actionsModule.sdo.create(action.method.sdo.create, uuid, _WFInstance).then(function (result) {
                                resolve(result.data);
                            }, function (err) {
                                reject(err);
                            });
                        case 'enrollCourse':
                            return actionsModule.sdo.enrollCourse(action.method.sdo.enrollCourse, uuid, _WFInstance).then(function (result) {
                                resolve(result.data);
                            }, function (err) {
                                reject(err);
                            });

                        default:
                            reject("No method found from implemented list.");
                            break;
                    }

                    break;

                case 'performance':
                    var performancePossibleItems = ["create", "configureNode", "unlockPeriod", "lockPerformanceModel", "setModelStatus"];
                    switch (propertyExists(action.method.performance, performancePossibleItems)) {

                        case 'create':
                            return actionsModule.performance.create(action.method.performance.create, uuid, _WFInstance).then(function (result) {
                                resolve(result.data);
                            }, function (err) {
                                reject(err);
                            });
                        case 'configureNode':
                            return actionsModule.performance.configureNode(action.method.performance.configureNode, uuid, _WFInstance).then(function (result) {
                                resolve(result.data);
                            }, function (err) {
                                reject(err);
                            });
                        case 'unlockPeriod':
                            return actionsModule.performance.unlockPeriod(action.method.performance.unlockPeriod, uuid, _WFInstance).then(function (result) {
                                resolve(result.data);
                            }, function (err) {
                                reject(err);
                            });
                        case 'setModelStatus':
                            return actionsModule.performance.setModelStatus(action.method.performance.setModelStatus, uuid, _WFInstance).then(function (result) {
                                resolve(result.data);
                            }, function (err) {
                                reject(err);
                            });
                        case 'lockPerformanceModel':
                            return actionsModule.performance.lockPerformanceModel(action.method.performance.lockPerformanceModel, uuid, _WFInstance).then(function (result) {
                                resolve(result.data);
                            }, function (err) {
                                reject(err);
                            });


                        default:
                            reject("No method found from implemented list.");
                            break;
                    }

                    break;

                case 'taxonomy':
                    var taxonomyPossibleItems = ["create"];
                    switch (propertyExists(action.method.taxonomy, taxonomyPossibleItems)) {

                        case 'create':
                            return actionsModule.taxonomy.create(action.method.taxonomy.create, uuid, _WFInstance).then(function (result) {
                                resolve(result.data);
                            }, function (err) {
                                reject(err);
                            });

                        default:
                            reject("No method found from implemented list.");
                            break;
                    }

                    break;
                case 'variables':
                    var variablesPossibleItems = ["setVariable"];
                    switch (propertyExists(action.method.variables, variablesPossibleItems)) {

                        case 'setVariable':

                            return actionsModule.variables.setVariable(action.method.variables.setVariable, _WFInstance, uuid).then(function (result) {
                                resolve(result.data);
                            }, function (err) {
                                reject(err);
                            });

                        default:
                            reject("No method found from implemented list.");
                            break;
                    }

                    break;
                case 'notification':
                    
                    return actionsModule.notification.sendNotificationWorker(action.method.notification, _WFInstance, uuid).then(function (result) {
                                resolve(result.data);
                            }, function (err) {
                                reject(err);
                            });
                    break;
                    
                case 'report':
                    var reportPossibleItems = ["createPerformanceReport","createReport","sdoReport","executeReport","generateView"];
                    switch (propertyExists(action.method.report, reportPossibleItems)) {

                        case 'createPerformanceReport':

                            return actionsModule.report.createPerformanceReport(action.method.report.createPerformanceReport, _WFInstance, uuid).then(function (result) {
                                resolve(result.data);
                            }, function (err) {
                                reject(err);
                            });

                        case 'createReport':
                            return actionsModule.report.createReport(action.method.report.createReport, _WFInstance, uuid ).then(function (result) {
                                resolve(result.data);
                            }, function (err) {
                                reject(err);
                            });
                        case 'sdoReport':
                            return actionsModule.report.sdoReport(action.method.report.sdoReport, _WFInstance, uuid ).then(function (result) {
                                resolve(result.data);
                            }, function (err) {
                                reject(err);
                            });
                        case 'executeReport':
                            return actionsModule.report.executeReport(action.method.report.executeReport, _WFInstance, uuid ).then(function (result) {
                                resolve(result.data);
                            }, function (err) {
                                reject(err);
                            });
                        case 'generateView':
                            return actionsModule.report.generateView(action.method.report.generateView, _WFInstance, uuid ).then(function (result) {
                                resolve(result.data);
                            }, function (err) {
                                reject(err);
                            });
                            
                            
                            
                     

                        default:
                            reject("No method found from implemented list.");
                            break;
                    }

                    break;

                case 'worker':
                    var workerPossibleItems = ["sendWorker", "executeLocal"];
                    switch (propertyExists(action.method.worker, workerPossibleItems)) {

                        case 'sendWorker':

                            return actionsModule.worker.sendWorker(action.method.worker.sendWorker, _WFInstance, uuid).then(function (result) {
                                resolve(result.data);
                            }, function (err) {
                                reject(err);
                            });
                        
                        case 'executeLocal':

                            return actionsModule.worker.executeLocal(action.method.worker.executeLocal, _WFInstance, uuid).then(function (result) {
                                resolve(result.data);
                            }, function (err) {
                                reject(err);
                            });

                        default:
                            reject("No method found from implemented list.");
                            break;
                    }

                    break;
              
                
                
                
                
                default:
                    reject("method not defined in configuration");
                    break;
            }

        } else {
            reject("No method found from implemented list.");

        }

    });
};

/**
 * Process tasks
 *
 * @param {object} task - the task config data
 * @param {object} inputData - the user input data
 *
 * @example ''
 *
 * @return ''
 *
 */
function task(subprocessID, subprocessSEQ, task, spuuid, model) {

    return new Promise(function (resolve, reject) {

        var _WFInstance = app.SCOPE.workflow;
        var preActionsConf = task.preActions;
        preActions(preActionsConf, _WFInstance, spuuid).then(function (preActionResult) {

            var list = [];
            if (task.assign.role != undefined) {
                var assignType = 'profileRole';
                var profileId = _WFInstance.profile;
                var id = '';
                if (task.assign.role.profile == 'current') {
                    id = _WFInstance.profile;
                } else if (task.assign.role.profile == 'community') {
                    id = app.SCOPE.getCommunityId();
                }

                var role = task.assign.role.roleId;

                library.getUsersListByRole(id, role).then(function (list) {
                    if (list != undefined) {

                        if (list.length > 1) {  

                            // New requirement here will automatically assign the step to current user if this user falls under the provided group.
                            // RULE INTRODUCED ON 16-MARCH-2017
                            // If current user lies within the specified role, it will be automatically assigned to that user.
                            
                            var isCurrentUserExistInGivenRole = false;
                            var rolesObject = library.getCurrentUserRoles();
                            
                            var isCurrentUserRole1 = rolesObject.profile.indexOf(role);
                            var isCurrentUserRole2 = rolesObject.community.indexOf(role);
                            var isCurrentUserRole3 = rolesObject.implicit.indexOf(role);
                            var isCurrentUserRole4 = rolesObject.adoption.indexOf(role);
                            var isCurrentUserRole5 = rolesObject.subprofile.indexOf(role);

                            if(isCurrentUserRole1 > -1 || isCurrentUserRole2 > -1 || isCurrentUserRole3 > -1 || isCurrentUserRole4 > -1 || isCurrentUserRole5 > -1){
                                isCurrentUserExistInGivenRole = true;
                            } else {
                                isCurrentUserExistInGivenRole = false;
                            }
                        
                            if (isCurrentUserExistInGivenRole){
                                if(model.assignmentHistory == undefined){
                                    model.assignmentHistory = [];
                                }
                                var assignee = model.assignedTo;
                                if(assignee.userId !="" && assignee.name != ""){
                                    var newObj = JSON.parse(JSON.stringify(assignee));
                                    model.assignmentHistory.push(newObj);
                                }
                                

                                assignee.name = LOCAL_SETTINGS.SUBSCRIPTIONS.username + "";
                                assignee.userId = LOCAL_SETTINGS.SUBSCRIPTIONS.userId + "";
                                assignee.dateTime = new Date();
                                assignee.type = ASSIGNMENT_TYPE_AUTO;
                                assignee.dueDateTime = '';
                                assignee.by = LOCAL_SETTINGS.SUBSCRIPTIONS.userId + "";

                                // Notification that its been automatically assigned to you
                                //Send assign user notification from here
                                var notification = JSON.xpath("/processes[_id eq '"+ subprocessID +"']/notifications",_WFInstance.config, {})[0];
                                if(notification != undefined && notification.assignment != undefined){
                                    var user = { 'id': LOCAL_SETTINGS.SUBSCRIPTIONS.userId, 'name': LOCAL_SETTINGS.SUBSCRIPTIONS.username };
                                    actionsModule.notification.assignmentNotification(notification, _WFInstance, spuuid, user).then(
                                        function(success){
                                            console.log('User assigned successfully. UserId: "' + user.id + '", Name: "' + user.name + '"');    
                                        }
                                    ).catch(
                                        function(fail){
                                            console.log('User assignment notification failed to user UserId: "' + user.id + '", Name: "' + user.name + '"');
                                        }
                                    );
                                }
                            }

                            var assignment = '';
                            if (task.assign.assignment != undefined) {

                                var assignment = model.assignment;
                                var accept = {
                                    "show": task.assign.assignment.accept.show,
                                    "label": _getNameByLang(task.assign.assignment.accept.label.i18n)
                                };

                                assignment.accept = accept;
                                assignment.message = _getNameByLang(task.assign.assignment.message.i18n);
                                var reject = {
                                    "show": task.assign.assignment.reject.show,
                                    "label": _getNameByLang(task.assign.assignment.reject.label.i18n)
                                };

                                assignment.reject = reject;
                                var value = {
                                    "profileId": profileId,
                                    "roleId": role,
                                    "type": "role"
                                };

                                assignment.value = value;
                                assignment.profileRoleId = id;

                            }

                            

                            if (isCurrentUserExistInGivenRole) {
                                //Fire Pre-workActions here

                                var processId = JSON.xpath("/instance/processes[subProcesses/uuid eq '" + spuuid + "']/id", _WFInstance, {})[0];
                                var subProcessId = JSON.xpath("/instance/processes/subProcesses[uuid eq '" + spuuid + "']/id", _WFInstance, {})[0];
                                var stepId = JSON.xpath("/subprocesses[_id eq '" + spuuid + "']/step/id", _WFInstance, {})[0];
                                var stepObject = JSON.xpath("/processes[_id eq '" + processId + "']/subProcesses[_id eq '" + subProcessId + "']/steps[_id eq '" + stepId + "']", _WFInstance.config, {})[0];


                                if (task.preWorkActions != undefined) {

                                    var preWorkActionsObj = task.preWorkActions;
                                    preWorkActions(preWorkActionsObj, _WFInstance).then(function (success) {
                                        resolve('Assignment is made. Pre work actions found and executed ');
                                    }, function (err) {
                                        reject(err);
                                    });

                                } else {
                                    resolve('Assignment is made. No pre work actions found. ');
                                }

                            } else {

                                // Notification that its been released for acceptance

                                var notification = JSON.xpath("/processes[_id eq '"+ subprocessID +"']/notifications",_WFInstance.config, {})[0];
                                //issue here
                                if(notification != undefined && notification.assignmentAcceptance != undefined){
                                    var user = { 'id': LOCAL_SETTINGS.SUBSCRIPTIONS.userId, 'name': LOCAL_SETTINGS.SUBSCRIPTIONS.username };
                                    actionsModule.notification.acceptanceNotification(notification, _WFInstance, spuuid, role).then(
                                        function(success){
                                            console.log('User assigned successfully. UserId: "' + user.id + '", Name: "' + user.name + '"');    
                                            resolve('Notifications request submitted for acceptance.');
                                        }
                                    ).catch(
                                        function(fail){
                                            resolve('Notifications failed');
                                            console.log('User assignment notification failed to user UserId: "' + user.id + '", Name: "' + user.name + '"');
                                        }
                                    );
                                } else {
                                    resolve('Notifications not found');
                                }

                               

                            }
                            

                        } else if (list.length == 1) {
                            // Implement here preWorkAction as this is automatically assigned in case of 1 user and will not go trough acceptance function.

                            var userId = list[0].id;
                            var username = list[0].name;

                            if(model.assignmentHistory == undefined){
                                model.assignmentHistory = [];
                            }

                            var assignee = model.assignedTo;
                            if(assignee.userId !="" && assignee.name != ""){
                                var newObj = JSON.parse(JSON.stringify(assignee));
                                model.assignmentHistory.push(newObj);
                            }


                            

                            assignee.name = username + "";
                            assignee.userId = userId + "";
                            assignee.dateTime = new Date();
                            assignee.type = ASSIGNMENT_TYPE_AUTO;
                            assignee.dueDateTime = '';
                            assignee.by = LOCAL_SETTINGS.SUBSCRIPTIONS.userId + "";

                            var assignment = '';
                            if (task.assign.assignment != undefined) {

                                var assignment = model.assignment;
                                var accept = {
                                    "show": task.assign.assignment.accept.show,
                                    "label": _getNameByLang(task.assign.assignment.accept.label.i18n)
                                };

                                assignment.accept = accept;
                                assignment.message = _getNameByLang(task.assign.assignment.message.i18n);
                                var reject = {
                                    "show": task.assign.assignment.reject.show,
                                    "label": _getNameByLang(task.assign.assignment.reject.label.i18n)
                                };

                                assignment.reject = reject;
                                var value = {
                                    "profileId": profileId,
                                    "roleId": role,
                                    "type": "role"
                                };

                                assignment.value = value;
                                assignment.profileRoleId = id;

                            }

                            // Notification that its been automatically assigned to you
                            //Send assign user notification from here
                            
                            var notification = JSON.xpath("/processes[_id eq '"+ subprocessID +"']/notifications",_WFInstance.config, {})[0];
                            if(notification != undefined && notification.assignment != undefined){
                                var user = { 'id': userId, 'name': username };
                                actionsModule.notification.assignmentNotification(notification, _WFInstance, spuuid, user).then(
                                    function(success){
                                        console.log('User assigned successfully. UserId: "' + user.id + '", Name: "' + user.name + '"');    
                                    }
                                ).catch(
                                    function(fail){
                                        console.log('User assignment notification failed to user UserId: "' + user.id + '", Name: "' + user.name + '"');
                                    }
                                );
                            }
                            
                            //Fire Pre-workActions here

                            var processId = JSON.xpath("/instance/processes[subProcesses/uuid eq '" + spuuid + "']/id", _WFInstance, {})[0];
                            var subProcessId = JSON.xpath("/instance/processes/subProcesses[uuid eq '" + spuuid + "']/id", _WFInstance, {})[0];
                            var stepId = JSON.xpath("/subprocesses[_id eq '" + spuuid + "']/step/id", _WFInstance, {})[0];
                            var stepObject = JSON.xpath("/processes[_id eq '" + processId + "']/subProcesses[_id eq '" + subProcessId + "']/steps[_id eq '" + stepId + "']", _WFInstance.config, {})[0];

                            if (task.preWorkActions != undefined) {

                                var preWorkActionsObj = task.preWorkActions;
                                preWorkActions(preWorkActionsObj, _WFInstance).then(function (success) {
                                        resolve('Assigned to the only user in role. Pre work actions executed');
                                }, function (err) {
                                    reject(err);
                                });

                            } else {
                                resolve('Assigned to the only user in role. No pre work actions found.');
                            }

                        } else {
                            //Case where users list = 0
                            var assignee = model.assignedTo;
                            assignee.name = "";
                            assignee.userId = "";

                            var assignment = '';
                            if (task.assign.assignment != undefined) {

                                var assignment = model.assignment;
                                var accept = {
                                    "show": task.assign.assignment.accept.show,
                                    "label": _getNameByLang(task.assign.assignment.accept.label.i18n)
                                };

                                assignment.accept = accept;
                                assignment.message = _getNameByLang(task.assign.assignment.message.i18n);
                                var reject = {
                                    "show": task.assign.assignment.reject.show,
                                    "label": _getNameByLang(task.assign.assignment.reject.label.i18n)
                                };

                                assignment.reject = reject;
                                var value = {
                                    "profileId": profileId,
                                    "roleId": role,
                                    "type": "role"
                                };

                                assignment.value = value;
                                assignment.profileRoleId = id;

                            }
                            //Will be fired from TakeAssignment path
                            resolve("No users found in list. Assigning blank ");

                        }

                    } else {
                        console.log('Error in getUsersListByRole undefined');
                        reject(err);
                    }

                }, function (err) {
                    console.log('Error in getUsersListByRole');
                    reject(err);
                });
            } else if (task.assign.swimlane != undefined) {
                resolve('swimlane');
                console.log('Swimlane implementation !!');
            }


        }, function (err) {

            reject(err);

        });




    });

};



/**
 * Process tasks
 *
 * @param {object} task - the task config data
 * @param {object} inputData - the user input data
 *
 * @example ''
 *
 * @return ''
 *
 */
function server(server, processId, processSeq, subProcessId, subProcessSeq, subProcess, model, _WFInstance, data, uuid) {
    
        return new Promise(function (resolve, reject) {
           
            //var _WFInstance = app.SCOPE.workflow;
            var profileId = _WFInstance.profile;
            var actionBlock = server.serverAction[0];
            if(model.assignmentHistory == undefined){
                model.assignmentHistory = [];
            }

            var assignee = model.assignedTo;
            if(assignee.userId !="" && assignee.name != ""){
                var newObj = JSON.parse(JSON.stringify(assignee));
                model.assignmentHistory.push(newObj);
            }
            assignee.name = LOCAL_SETTINGS.SUBSCRIPTIONS.username + "";
            assignee.userId = LOCAL_SETTINGS.SUBSCRIPTIONS.userId + "";
            assignee.dateTime = new Date();
            assignee.type = ASSIGNMENT_TYPE_AUTO;
            assignee.dueDateTime = '';
            assignee.by = LOCAL_SETTINGS.SUBSCRIPTIONS.userId + "";

            action(actionBlock, processId, processSeq, subProcessId, subProcessSeq, subProcess, model, _WFInstance, data, uuid)
            .then(function (result) {
                resolve("No users found in list. Assigning blank ");
            }, function (err) {
                reject("Server action error found rejected")
            });
        });
    
    };

/**
 * Process transition
 *
 * @param {string} processId - the Workflow config / definition process id
 * @param {number} processSeq - the Workflow instance process seq
 * @param {string} subProcessId - the Workflow config / definition sub-process id
 * @param {number} subProcessSeq - the Workflow instance sub-process seq
 * @param {string} stepId - the Workflow config / definition step id
 * @param {string} transitionId - the Workflow config / definition transition id
 * @param {object} data - any additional data passed in as key value pairs
 * @param {object} _WFInstance - the current workflow constructor instance
 *
 * @example ''
 *
 * @return ''
 *
 */
function transition(processId, processSeq, subProcessId, subProcessSeq, stepId, transitionId, data, _WFInstance, spuuid, model) {
    return new Promise(function (resolve, reject) {
        try {
            var stepSeq = 0;
            var nextStepId = '';
            var nextStepSeq = 0;
            var subProcess = [];
            var currentProcess = _WFInstance.config.processes.filter(function (objProcess) {
                if (objProcess._id == processId) {
                    return objProcess;
                }

            });
            var currentSubProcess = currentProcess[0].subProcesses.filter(function (objSubProcess) {
                if (objSubProcess._id == subProcessId) {
                    return objSubProcess;
                }

            });
            var currentStep = currentSubProcess[0].steps.filter(function (objStep) {
                if (objStep._id == stepId) {
                    return objStep;
                }

            });
            var transition = currentStep[0].transition.filter(function (objTransition) {
                if (objTransition._id == transitionId) {
                    return objTransition;
                }

            });
            for (var i = 0; i < currentSubProcess[0].steps.length; i++) {
                if (currentSubProcess[0].steps[i]._id == stepId) {
                    stepSeq = parseInt(currentSubProcess[0].steps[i]._seq);
                }

            }

            currentSubProcess[0].steps.filter(function (stepItem) {
                nextStepSeq = stepSeq + 1;
                if (parseInt(stepItem._seq) == nextStepSeq) {
                    nextStepId = stepItem._id;
                }

            })
       
       
       
            
            var maxSteps = currentSubProcess[0].steps.length;
            var spinstanceObject = JSON.xpath("/subprocesses[_id eq '"+ spuuid +"']", _WFInstance, {})[0];
            var spInstanceStepObject = JSON.xpath("/subprocesses[_id eq '"+ spuuid +"']/step", _WFInstance, {})[0];

            // Adding step Object in subprocess history From second step. As first step is added at subProcess() function 
            if (spinstanceObject.history == undefined) {
                spinstanceObject.history = [];
            }
            var pushIndicatorToModel = function(model){

                // In both  the cases the list is differnet that needs to be made same.
               
                var indicatorList = JSON.xpath("/subprocesses[_id eq '"+ spuuid +"']/indicators", _WFInstance ,{});
                var isFirst = false;
                if(indicatorList == undefined || indicatorList.length == 0){
                    isFirst = true;
                    indicatorList = JSON.xpath("/indicators[workflows/processes[subProcessUUID eq '"+ spuuid +"']]", _WFInstance ,{});
                }
                if(model.indicators == undefined){
                   model.indicators = [];
                }
                for (var j = 0; j < indicatorList.length; j++) {
                    
                    if(isFirst){

                        var uuid = indicatorList[j]._id;
                        var rev = JSON.xpath("/indicators[_id eq '"+ uuid +"']/_rev" , _WFInstance, {})[0];
                        var seq = indicatorList[j].model.pending.seq;
                        var status = indicatorList[j].model.pending.status;
                        var indObject = {
                            uuid: uuid,
                            rev: rev,
                            seq: seq,
                            status: status
                        }
                        model.indicators.push(indObject);

                    } else {
    
                        var uuid = indicatorList[j].instances[0].uuid;
                        var rev = JSON.xpath("/indicators[_id eq '"+ uuid +"']/_rev" , _WFInstance, {})[0];
                        var seq = JSON.xpath("/indicators[_id eq '"+ uuid +"']/model/pending/seq",_WFInstance,{})[0];
                        var status = JSON.xpath("/indicators[_id eq '"+ uuid +"']/model/pending/status",_WFInstance,{})[0];
                        var indObject = {
                            uuid: uuid,
                            rev: rev,
                            seq: seq,
                            status: status
                        }
                        model.indicators.push(indObject);
                        
                    }   
                }
                delete model.assignedTo;
                delete model.assignment;
                return model;
            }

            // add information to transtion object.
            var  trnObject = {
                transitionId: transition[0]._id,
                dateTime: new Date(),
                userId: LOCAL_SETTINGS.SUBSCRIPTIONS.userId + ""
            }
            if(model != undefined && Object.keys(model).length > 0){
                model.transition = trnObject;    
            } else {
                spInstanceStepObject.transition = trnObject;
            }

            // copy current assignedTo to reAssignment object
            
            if(model != undefined && Object.keys(model).length > 0){
                if(model.assignmentHistory == undefined){
                    model.assignmentHistory = [];
                }
                var assigneeObj = JSON.parse(JSON.stringify(model.assignedTo));
                if(assigneeObj.userId != "" && assigneeObj.name != ""){
                    model.assignmentHistory.push(assigneeObj);
                }
                
            } else {
                if(spInstanceStepObject.assignmentHistory == undefined){
                    spInstanceStepObject.assignmentHistory = [];
                }
                var assigneeObj = JSON.parse(JSON.stringify(spInstanceStepObject.assignedTo));
                if(assigneeObj.userId != "" && assigneeObj.name != ""){
                    spInstanceStepObject.assignmentHistory.push(assigneeObj);
                }
                
            }
            var historyModel;
            if(model != undefined && Object.keys(model).length > 0){
                 historyModel = JSON.parse(JSON.stringify(model));
            } else {
                 historyModel = JSON.parse(JSON.stringify(spInstanceStepObject));
            }
            var indModelInStep = pushIndicatorToModel(historyModel);
            spinstanceObject.history.push(indModelInStep); 

            if (transition[0].transitionAction.goToStep != undefined) {

               

                var nextSeq = parseInt(currentStep[0]._seq) + parseInt(transition[0].transitionAction.goToStep.default);
                var nextId = '';
                currentSubProcess[0].steps.filter(function (stepItem) {

                    if (parseInt(stepItem._seq) == nextStepSeq) {
                        nextId = stepItem._id;
                    }

                });

                step(processId, processSeq, subProcessId, subProcessSeq, nextId, nextSeq, data, _WFInstance, spuuid).then(function (result) {
                    if (nextSeq == maxSteps) {
                        var success = util.success('All Step transitions have completed successfully.', {
                            subProcessComplete: true,
                            step: result.data
                        });
                        resolve(success);
                    } else {

                        var success = util.success('Step transition completed successfully.', {
                            subProcessComplete: false,
                            step: result.data
                        });
                        resolve(success);

                    }

                }, function (err) {
                    reject(err);
                });

            } else if (transition[0].transitionAction.goToStepId != undefined) {

                

                var goToStepId = transition[0].transitionAction.goToStepId.stepId;
                var goToStepSeq = 1;

                currentSubProcess[0].steps.filter(function (stepItem) {
                    if (stepItem._id == goToStepId) {
                        goToStepSeq = parseInt(stepItem._seq);
                    }

                });

                step(processId, processSeq, subProcessId, subProcessSeq, goToStepId, goToStepSeq, data, _WFInstance, spuuid).then(function (result) {
                    if (goToStepSeq == maxSteps) {

                        var success = util.success('All Step transitions have completed successfully.', {
                            subProcessComplete: true,
                            step: result.data
                        });
                        resolve(success);

                    } else {

                        var success = util.success('Step transition completed successfully.', {
                            subProcessComplete: false,
                            step: result.data
                        });
                        resolve(success);

                    }

                }, function (err) {
                    reject(err);
                });
            } else if (transition[0].transitionAction.stop != undefined) {

                // As this is the last step (where stop is defied) , subProcess postActions should come here.

                var postActionsConf = currentProcess[0].postActions;
                postActions(postActionsConf, _WFInstance, spuuid).then(function (result) {

                    var success = util.success('Step transition completed successfully.Workflow stopped.', {
                        subProcessComplete: true,
                        step: model
                    });
                    resolve(success);

                }, function (err) {
                    reject(err);
                });

            }

        } catch (err) {
            reject(err);
        }

    });
};

/**
 * Process postActions
 *
 * @param {object} postActions - the postActions config data
 *
 * @example ''
 *
 * @return ''
 *
 */
function postActions(postActions, _WFInstance, spuuid) {
    return new Promise(function (resolve, reject) {
        var completed = [];
        try {

            
            var spObject = JSON.xpath("/subprocesses[_id eq '"+ spuuid +"']", _WFInstance , {})[0];
            var processID = spObject["meta-data"].processConfigId;
            var processId = spObject["meta-data"].subProcessConfigId;
            var processSEQ = spObject["meta-data"].subProcessInsSeq;
            var processSeq = spObject["meta-data"].subProcessInsSeq;

            var subProcessConfigObject = JSON.xpath("/config/processes[_id eq '"+ processID+"']/subProcesses[_id eq '"+ processId+"']", _WFInstance , {})[0];
            var stepObject = JSON.xpath("/subprocesses[_id eq '"+ spuuid +"']/step",_WFInstance, {})[0];
            

            util.syncLoop(postActions.length, function (loop) {
                var counter = loop.iteration();
                action(postActions[counter], processID, processSEQ, processId, processSeq, subProcessConfigObject, stepObject,_WFInstance, {}, spuuid).then(function (data) {
                    // Check if all pre-requisites completed successfully.
                    completed.push(true);
                    loop.next();
                }, function (err) {
                    completed.push(false);
                    loop.break();
                    reject(err);
                });
            }, function () {
                if (completed.every(Boolean)) {
                    var success = util.success('Post-actions completed successfully.', {});
                    resolve(success);
                } else {
                    var error = util.error('WFPreActionsError', 'Not all post-actions passed.');
                    reject(error);
                }

            });
        } catch (err) {
            reject(err);
        }

    });
};

/*
function sendNotifications(usersList, spuuid){

  // get users list 
  // sen notifications to users y adding channels to them

  var channelArray = [];

  for(i=0;i<usersList.length; i++){
    channelArray.push("user_"+usersList[i].id);
  }

  assignToUsers(processWorkflowMessage(NOTIFICATION_USER_MSG_ACCEPT, spuuid), channelArray);

};*/

/*function assignToUsers(message, channelArray){

     var channels = channelArray;

     var notification =  { 
          "_id": generateUUID(),
          "channels":channels,
          "message": message,
          "messageType": "info",
          "createdDateTime": moment().format(),
          "read": false,
          "readDateTime": "",
          "type": "notification",
          "senderUserId": LOCAL_SETTINGS.SUBSCRIPTIONS.userId
       };

       console.log(notification);
       dao.upsert(notification);

  };*/

function processWorkflowMessage(message, spuuid) {

    var replacedMsg = message;

    if (replacedMsg.indexOf('#INSTANCE_LABEL') !== -1) {
        var val = JSON.xpath("/instance/processes/subProcesses[uuid eq '" + spuuid + "']/label", app.SCOPE.workflow, {})[0];
        replacedMsg = replacedMsg.replace('#INSTANCE_LABEL', val);

    }

    if (replacedMsg.indexOf('#USER_NAME') !== -1) {
        var val = JSON.xpath("/subprocesses[_id eq '" + spuuid + "']/step/assignedTo/name", app.SCOPE.workflow, {})[0];
        replacedMsg = replacedMsg.replace('#USER_NAME', val);

    }

    if (replacedMsg.indexOf('#PROFILE_TITLE') !== -1) {
        var val = app.profile.title;
        replacedMsg = replacedMsg.replace('#PROFILE_TITLE', val);

    }

    if (replacedMsg.indexOf('#PROFILE_TYPE') !== -1) {
        var val = app.SCOPE.APP_CONFIG.name;
        replacedMsg = replacedMsg.replace('#PROFILE_TYPE', val);

    }

    if (replacedMsg.indexOf('#VAR_SPUUID') !== -1) {
        var val = spuuid;
        replacedMsg = replacedMsg.replace('#VAR_SPUUID', val);

    }

    return replacedMsg;
};

function _getName(arr, lang) {
    if (arr !== undefined) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i]._lang === lang) {
                return arr[i].value;
            }

        }

    }

};

function _getNameByLang(obj) {
    return library.getNameByLang(obj);
};





/**
 * Process preWorkActions
 *
 * @param {object} preWorkActions - the preWorkActions config data
 *
 * @example ''
 *
 * @return ''
 *
 */

function preWorkActions(preWorkActions, _WFInstance) {
    return new Promise(function (resolve, reject) {
        var completed = [];
        try {
            var subProcessConfigObject = JSON.xpath("/config/processes[_id eq '"+app.processID+"']/subProcesses[_id eq '"+ app.processId+"']", _WFInstance , {})[0];
            var stepObject = JSON.xpath("/subprocesses[_id eq '"+ app.SCOPE.processUUID +"']/step",_WFInstance, {})[0];
            util.syncLoop(preWorkActions.length, function (loop) {
                var counter = loop.iteration();
                action(preWorkActions[counter], app.processID, app.processSEQ, app.processId, app.processSeq, subProcessConfigObject, stepObject ,_WFInstance, {}, app.SCOPE.processUUID).then(function (data) {
                    // Check if all pre-requisites completed successfully.
                    completed.push(true);
                    loop.next();
                }, function (err) {
                    completed.push(false);
                    loop.break();
                    reject(err);
                });
            }, function () {
                if (completed.every(Boolean)) {
                    var success = util.success('PreWork-actions completed successfully.', {});
                    resolve(success);
                } else {
                    var error = util.error('WFPreActionsError', 'Not all pre-work-actions passed.');
                    reject(error);
                }

            });
        } catch (err) {
            reject(err);
        }

    });
};


module.exports = {

    preRequisites: preRequisites,
    preActions: preActions,
    postActions: postActions,
    preWorkActions: preWorkActions,
    subProcess: subProcess,
    indicatorDocs: indicatorDocs,
    task: task,
    transition: transition,
    assignUser: assignUser

}
},{"./actions":2,"./form":3,"./helper":4,"utility":8}],8:[function(require,module,exports){
'use strict';

/**
 * Utility Module
 *
 * @module lib/util
 *
 * @author Brent Gordon
 * @version 0.1.0
 *
 * @description
 * Workflow utility module used to format the return and error objects, and
 * contains some other utility functions such as a sync loop and compare.
 *
 */

/**
 * Success block return object, contains a message and optional data object.
 *
 * @param {string} message - the success message
 * @param {string|Object} [data] - the success returned data
 *
 * @example
 * // Return success without a data block
 * var success = util.success('Success message goes here...');
 *
 * @return {Object} - with message and data properties
 *
 */
function success(message, data){
	return {
		message: message,
		data: data
	};
};

/**
 * Warning block return object, contains a message and optional data object.
 *
 * @param {string} message - the warning message
 * @param {string|Object} [data] - the returned data
 *
 * @example
 * // Return success without a data block
 * var success = util.warn('Warning message goes here...');
 *
 * @return {Object} with message and data properties, and logs the warning to the console.
 *
 */
function warn(message, data){
	console.warn(data);
	return {
		warning: message,
		data: data
	};
};

/**
 * Error block JS error object, contains a code and message for the error.
 *
 * @param {string} code - the error code
 * @param {string} message - the error message
 *
 * @example
 * var success = util.error('Error001','Error message goes here...');
 *
 * @return {Object} with a code and message properties.
 *
 */
function error(code, message){
	var err = new Error('');
	err.name = code;
	err.message = message;
	return err;
};

/**
 * A loop which can loop X amount of times, which carries out
 * asynchronous code, but waits for that code to complete before looping.
 *
 * @param {number} iterations - the number of iterations to carry out
 * @param {function} process - the code/function we're running for every
 * iteration
 * @param {function} exit - an optional callback to carry out once the loop
 * has completed
 *
 * @example
 * util.syncLoop(5, function(loop){
 * 	var counter = loop.iteration();
 * 	// Add async calls here..
 *
 * }, function(){
 * 	// On complete perform actions here...
 *
 * });
 *
 * @return {Object} the loop control object.
 *
 */
function syncLoop(iterations, process, exit){
    var index = 0,
        done = false,
        shouldExit = false;
    var loop = {
        next:function(){
            if(done){
                if(shouldExit && exit){
                    return exit(); // Exit if we're done
                }
            }
            // If we're not finished
            if(index < iterations){
                index++; // Increment our index
                process(loop); // Run our process, pass in the loop
            // Otherwise we're done
            } else {
                done = true; // Make sure we say we're done
                if(exit) exit(); // Call the callback on exit
            }
        },
        iteration:function(){
            return index - 1; // Return the loop number we're on
        },
        break:function(end){
            done = true; // End the loop
            shouldExit = end; // Passing end as true means we still call the exit callback
        }
    };
    loop.next();
    return loop;
};

function compare(subject, operator, value) {
  	switch (operator) {
  		case 'greaterThan':
			return subject > value;
		case 'lessThan':
			return subject < value;
		case 'greaterThanEqual':
			return subject >= value;
		case 'lessThanEqual':
			return subject <= value;
		case 'equalTo':
			return subject === value;
		case 'notEqualTo':
			return subject !== value;
  	}
};

function getName(arr, lang){
	if (arr !== undefined) {
		for (var i = 0; i < arr.length ; i++) {
			if (arr[i].i18n._lang === lang) {
				return arr[i].i18n.value;
			}
		}
	}
}

module.exports = {

 	success: success,
 	warn: warn,
 	error: error,
 	syncLoop: syncLoop,
 	compare: compare,
	getName: getName

 }

},{}]},{},[1])(1)
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJpbmRleC5qcyIsImxpYi9hY3Rpb25zLmpzIiwibGliL2Zvcm0uanMiLCJsaWIvaGVscGVyLmpzIiwibGliL2ludGVyZmFjZS5qcyIsImxpYi9ub2RlVmFsdWUuanMiLCJsaWIvcHJvY2Vzcy5qcyIsIm5vZGVfbW9kdWxlcy91dGlsaXR5L2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVvRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcjBCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdFhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeElBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMzdFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIid1c2Ugc3RyaWN0JztcblxudmFyIFByb2Nlc3MgPSByZXF1aXJlKCcuL2xpYi9wcm9jZXNzJyk7XG52YXIgdXRpbCA9IHJlcXVpcmUoJ3V0aWxpdHknKTtcbnZhciB1c2VySW50ZXJmYWNlID0gcmVxdWlyZSgnLi9saWIvaW50ZXJmYWNlJyk7XG52YXIgaGVscGVyID0gcmVxdWlyZSgnLi9saWIvaGVscGVyJyk7XG5cblxuLypnbG9iYWxzICovXG5cbi8qKlxuICogQSBuZXcgV29ya2Zsb3cgY29uc3RydWN0b3IgaW5zdGFuY2UgY29udGFpbnMgdGhlIHJlZmVyZW5jZSB0byB0aGUgYXBwbGljYXRpb25cbiAqIGFuZCBhc3NvY2lhdGVkIHByb2ZpbGUgd2hpY2ggaXQgcmVxdWlyZXMgYXMgdGhlIGZpcnN0IHR3byBwYXJhbWV0ZXJzLiBJdCBhbHNvXG4gKiByZXF1aXJlcyBhIHdvcmtmbG93IGNvbmZpZ3VyYXRpb24sIGFzIHRoZSB0aGlyZCBwYXJhbWV0ZXIsIHdoaWNoIGlzIHVzZWQgdG9cbiAqIGRlc2NpYmUgdGhlIHdvcmtmbG93IHByb2Nlc3Nlcy4gSWYgYSB3b3JrZmxvdyBpbnN0YW5jZSBleGlzdHMgeW91IGNhbiBwYXNzIGl0XG4gKiBpbiBhcyB0aGUgZm91cnRoIHBhcmFtZXRlciB3aGljaCBpdCB3aWxsIHRoZW4gdXNlLCBlbHNlIGNyZWF0ZSBhIG5ldyBvbmUuXG4gKlxuICogQGNvbnN0cnVjdG9yXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHByb2ZpbGUgLSBUaGUgY3VycmVudCBwcm9maWxlIGlkXG4gKiBAcGFyYW0ge3N0cmluZ30gYXBwIC0gVGhlIGFzc29jaWF0ZWQgYXBwbGljYXRpb24gaWRcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgLSBUaGUgYXBwbGljYXRpb24gd29ya2Zsb3cgY29uZmlndXJhdGlvbiAvIGRlZmluaXRpb25cbiAqIEBwYXJhbSB7T2JqZWN0fSBbaW5zdGFuY2VdIC0gQW4gZXhpc3RpbmcgYXBwbGljYXRpb24gcHJvZmlsZSB3b3JrZmxvdyBpbnN0YW5jZSBiYXNlZFxuICogb24gdGhlIGRlZmluaXRpb25cbiAqXG4gKiBAYXV0aG9yIEJyZW50IEdvcmRvblxuICogQHZlcnNpb24gMC4xLjBcbiAqXG4gKiBAZXhhbXBsZVxuICogdmFyIGNvbmZpZyA9IHsgJ19pZCc6ICdhYmMxMjMnIH07XG5cbiAqIHZhciBpbnN0YW5jZSA9IHsgJ19pZCc6ICdpbnN0YW5jZV9hYmMxMjMnIH07XG5cbiAqIC8vIElmIHRoZXJlIGlzbid0IGFuIGV4aXN0aW5nIGluc3RhbmNlXG4gKiB2YXIgd29ya2Zsb3cgPSBuZXcgV29ya2Zsb3coJzEyMzQnLCAnNTY3OCcsIGNvbmZpZyk7XG4gKiAvLyBJZiB0aGVyZSBpcyBhbiBleGlzdGluZyBpbnN0YW5jZVxuICogdmFyIHdvcmtmbG93ID0gbmV3IFdvcmtmbG93KCcxMjM0JywgJzU2NzgnLCBjb25maWcsIGluc3RhbmNlKTtcbiAqXG4gKiBAcmV0dXJuIHtPYmplY3R9IG5ldyBXb3JrZmxvdyBvYmplY3RcbiAqXG4gKiBAdGhyb3dzIEVycm9yOiBBIHByb2ZpbGUgaWQgaXMgcmVxdWlyZWRcbiAqIEB0aHJvd3MgRXJyb3I6IEFuIGFwcCBpZCBpcyByZXF1aXJlZFxuICogQHRocm93cyBFcnJvcjogQSB3b3JrZmxvdyBjb25maWd1cmF0aW9uIGlzIHJlcXVpcmVkXG4gKlxuICovXG5cbmZ1bmN0aW9uIFdvcmtmbG93KHByb2ZpbGUsIGNvbW11bml0eUlkLCBhcHAsIGNvbmZpZykge1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICAvLyBDb21tdW5pdHkgSUQgdmFsaWRhdGlvbiBjaGVja3NcbiAgICBpZiAoY29tbXVuaXR5SWQgPT0gJycgfHwgY29tbXVuaXR5SWQgPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRocm93IHV0aWwuZXJyb3IoJ1BhcmFtUmVxdWlyZWQnLCAnQSBjb21tdW5pdHkgaWQgaXMgcmVxdWlyZWQuJyk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgKGNvbW11bml0eUlkKSAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGUgY29tbXVuaXR5IGlkIG11c3QgYmUgYSBqYXZhc2NyaXB0IHN0cmluZy4nKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBfdGhpcy5jb21tdW5pdHlJZCA9IGNvbW11bml0eUlkIHx8ICcnO1xuICAgIH1cblxuICAgIC8vIFByb2ZpbGUgSUQgdmFsaWRhdGlvbiBjaGVja3NcbiAgICBpZiAocHJvZmlsZSA9PSAnJyB8fCBwcm9maWxlID09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aHJvdyB1dGlsLmVycm9yKCdQYXJhbVJlcXVpcmVkJywgJ0EgcHJvZmlsZSBpZCBpcyByZXF1aXJlZC4nKTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiAocHJvZmlsZSkgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignVGhlIHByb2ZpbGUgaWQgbXVzdCBiZSBhIGphdmFzY3JpcHQgc3RyaW5nLicpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIF90aGlzLnByb2ZpbGUgPSBwcm9maWxlIHx8ICcnO1xuICAgIH1cblxuICAgIC8vIEFwcCBJRCB2YWxpZGF0aW9uIGNoZWNrc1xuICAgIGlmIChhcHAgPT0gJycgfHwgYXBwID09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aHJvdyB1dGlsLmVycm9yKCdQYXJhbVJlcXVpcmVkJywgJ0FuIGFwcCBpZCBpcyByZXF1aXJlZC4nKTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiAoYXBwKSAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGUgYXBwIGlkIG11c3QgYmUgYSBqYXZhc2NyaXB0IHN0cmluZy4nKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBfdGhpcy5hcHAgPSBhcHAgfHwgJyc7XG4gICAgfVxuXG4gICAgLy8gV29ya2Zsb3cgY29uZmlndXJhdGlvbiB2YWxpZGF0aW9uIGNoZWNrc1xuICAgIGlmIChjb25maWcgPT0gJycgfHwgY29uZmlnID09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aHJvdyB1dGlsLmVycm9yKCdQYXJhbVJlcXVpcmVkJywgJ0Egd29ya2Zsb3cgY29uZmlndXJhdGlvbiBpcyByZXF1aXJlZC4nKTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiAoY29uZmlnKSAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgX3RoaXMuY29uZmlnID0gSlNPTi5wYXJzZShjb25maWcpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIF90aGlzLmNvbmZpZyA9IGNvbmZpZztcbiAgICB9XG5cbiAgICAvLyBXb3JrZmxvdyBpbnN0YW5jZSB2YWxpZGF0aW9uIGNoZWNrc1xuICAgIF90aGlzLmluc3RhbmNlO1xuICAgIC8vIFdvcmtmbG93IHN1Yi1wcm9jZXNzZXMgdmFsaWRhdGlvbiBjaGVja3NcbiAgICBfdGhpcy5zdWJwcm9jZXNzZXMgPSBbXTtcbiAgICAvLyBXb3JrZmxvdyBpbmRpY2F0b3JzIHBsYWNlIGhvbGRlclxuICAgIF90aGlzLmluZGljYXRvcnMgPSBbXTtcbiAgICBcblxufVxuXG4vKipcbiAqIFdvcmtmbG93IGdldCBwcm9maWxlIGlkLlxuICpcbiAqIEBleGFtcGxlIFwiXCJcbiAqXG4gKiBAcmV0dXJuIFwiXCJcbiAqXG4gKi9cbldvcmtmbG93LnByb3RvdHlwZS5nZXRQcm9maWxlID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLnByb2ZpbGU7XG59O1xuXG4vKipcbiAqIFdvcmtmbG93IGdldCBhcHAgaWQuXG4gKlxuICogQGV4YW1wbGUgXCJcIlxuICpcbiAqIEByZXR1cm4gXCJcIlxuICpcbiAqL1xuV29ya2Zsb3cucHJvdG90eXBlLmdldEFwcCA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5hcHA7XG59O1xuXG4vKipcbiAqIFdvcmtmbG93IGdldCBjb25maWcuXG4gKlxuICogQGV4YW1wbGUgXCJcIlxuICpcbiAqIEByZXR1cm4gXCJcIlxuICpcbiAqL1xuV29ya2Zsb3cucHJvdG90eXBlLmdldENvbmZpZyA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5jb25maWc7XG59O1xuXG4vKipcbiAqIFdvcmtmbG93IGdldCBpbnN0YW5jZS5cbiAqXG4gKiBAZXhhbXBsZSBcIlwiXG4gKlxuICogQHJldHVybiBcIlwiXG4gKlxuICovXG5cbldvcmtmbG93LnByb3RvdHlwZS5nZXRJbnN0YW5jZSA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5pbnN0YW5jZTtcbn07XG5cbi8qKlxuICogV29ya2Zsb3cgc2V0IHRoZSBpbnN0YW5jZSBkYXRhLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhIC0gdGhlIHdvcmtmbG93IHByb2Nlc3MgaW5zdGFuY2UgZGF0YVxuICpcbiAqIEBleGFtcGxlIFwiXCJcbiAqXG4gKiBAcmV0dXJuIFwiXCJcbiAqXG4gKi9cbldvcmtmbG93LnByb3RvdHlwZS5zZXRJbnN0YW5jZSA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgdGhpcy5pbnN0YW5jZSA9IGRhdGE7XG59O1xuXG4vKipcbiAqIFdvcmtmbG93IGdldCBzdWItcHJvY2Vzc2VzIGRhdGEuXG4gKlxuICogQGV4YW1wbGUgXCJcIlxuICpcbiAqIEByZXR1cm4gXCJcIlxuICpcbiAqL1xuV29ya2Zsb3cucHJvdG90eXBlLmdldFN1YlByb2Nlc3NlcyA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5zdWJwcm9jZXNzZXM7XG59O1xuXG4vKipcbiAqIFdvcmtmbG93IHNldCB0aGUgc3ViLXByb2Nlc3NlcyBkYXRhLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhIC0gdGhlIHdvcmtmbG93IHByb2Nlc3MgaW5zdGFuY2UgZGF0YVxuICpcbiAqIEBleGFtcGxlIFwiXCJcbiAqXG4gKiBAcmV0dXJuIFwiXCJcbiAqXG4gKi9cbldvcmtmbG93LnByb3RvdHlwZS5zZXRTdWJQcm9jZXNzZXMgPSBmdW5jdGlvbiAoZGF0YSkge1xuICAgIHRoaXMuc3VicHJvY2Vzc2VzID0gZGF0YTtcbn07XG5cbi8qKlxuICogV29ya2Zsb3cgZ2V0IGluZGljYXRvciBzZXQgZGF0YS5cbiAqXG4gKiBAZXhhbXBsZSBcIlwiXG4gKlxuICogQHJldHVybiBcIlwiXG4gKlxuICovXG5Xb3JrZmxvdy5wcm90b3R5cGUuZ2V0SW5kaWNhdG9ycyA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5pbmRpY2F0b3JzO1xufTtcblxuLyoqXG4gKiBXb3JrZmxvdyBzZXQgdGhlIGluZGljYXRvciBzZXQgZGF0YS5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gZGF0YSAtIHRoZSB3b3JrZmxvdyBwcm9jZXNzIGluc3RhbmNlIGRhdGFcbiAqXG4gKiBAZXhhbXBsZSBcIlwiXG4gKlxuICogQHJldHVybiBcIlwiXG4gKlxuICovXG5Xb3JrZmxvdy5wcm90b3R5cGUuc2V0SW5kaWNhdG9ycyA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgdGhpcy5pbmRpY2F0b3JzID0gZGF0YTtcbn07XG5cbi8qKlxuICogU2V0IHRoZSB2YXJpYWJsZSB2YWx1ZS5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gcHJvY2Vzc0lkIC0gdGhlIFdvcmtmbG93IGNvbmZpZyAvIGRlZmluaXRpb24gcHJvY2VzcyBpZFxuICogQHBhcmFtIHtudW1iZXJ9IHByb2Nlc3NTZXEgLSB0aGUgV29ya2Zsb3cgaW5zdGFuY2UgcHJvY2VzcyBzZXFcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdWJQcm9jZXNzSWQgLSB0aGUgV29ya2Zsb3cgY29uZmlnIC8gZGVmaW5pdGlvbiBzdWItcHJvY2VzcyBpZFxuICogQHBhcmFtIHtudW1iZXJ9IHN1YlByb2Nlc3NTZXEgLSB0aGUgV29ya2Zsb3cgaW5zdGFuY2Ugc3ViLXByb2Nlc3Mgc2VxXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RlcElkIC0gdGhlIFdvcmtmbG93IGNvbmZpZyAvIGRlZmluaXRpb24gc3RlcCBpZFxuICogQHBhcmFtIHtPYmplY3R9IHZhcmlhYmxlIC0gdGhlIFdvcmtmbG93IHZhcmlhYmxlIG9iamVjdFxuICpcbiAqIEBleGFtcGxlICcnXG4gKlxuICogQHJldHVybiAnJ1xuICpcbiAqL1xuLy8gV29ya2Zsb3cucHJvdG90eXBlLnNldFZhcmlhYmxlID0gZnVuY3Rpb24ocHJvY2Vzc0lkLCBwcm9jZXNzU2VxLCBzdWJQcm9jZXNzSWQsIHN1YlByb2Nlc3NTZXEsIHN0ZXBJZCwgdmFyaWFibGUpe1xuLy8gXHR2YXIgX3RoaXMgPSB0aGlzO1xuLy8gXHRyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4vLyBcdFx0dHJ5IHtcbi8vIFx0XHRcdFByb2Nlc3MuZ2V0VmFyaWFibGUocHJvY2Vzc0lkLCBwcm9jZXNzU2VxLCBzdWJQcm9jZXNzSWQsIHN1YlByb2Nlc3NTZXEsIHN0ZXBJZCwgdmFyaWFibGUpLnRoZW4oZnVuY2lvbihyZXN1bHQpe1xuLy8gXHRcdFx0XHRyZXNvbHZlKHJlc3VsdC5kYXRhKTtcbi8vIFx0XHRcdH0sIGZ1bmN0aW9uKGVycil7XG4vLyBcdFx0XHRcdHJlamVjdChlcnIpO1xuLy8gXHRcdFx0fSlcbi8vIFx0XHR9IGNhdGNoIChlcnIpIHtcbi8vIFx0XHRcdHJlamVjdChlcnIpO1xuLy8gXHRcdH1cblxuLy8gXHR9KTtcbi8vIH07XG5cbi8qKlxuICogR2V0IHRoZSB2YXJpYWJsZSB2YWx1ZS5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gcHJvY2Vzc0lkIC0gdGhlIFdvcmtmbG93IGNvbmZpZyAvIGRlZmluaXRpb24gcHJvY2VzcyBpZFxuICogQHBhcmFtIHtudW1iZXJ9IHByb2Nlc3NTZXEgLSB0aGUgV29ya2Zsb3cgaW5zdGFuY2UgcHJvY2VzcyBzZXFcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdWJQcm9jZXNzSWQgLSB0aGUgV29ya2Zsb3cgY29uZmlnIC8gZGVmaW5pdGlvbiBzdWItcHJvY2VzcyBpZFxuICogQHBhcmFtIHtudW1iZXJ9IHN1YlByb2Nlc3NTZXEgLSB0aGUgV29ya2Zsb3cgaW5zdGFuY2Ugc3ViLXByb2Nlc3Mgc2VxXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RlcElkIC0gdGhlIFdvcmtmbG93IGNvbmZpZyAvIGRlZmluaXRpb24gc3RlcCBpZFxuICogQHBhcmFtIHtzdHJpbmd9IGtleSAtIHRoZSBXb3JrZmxvdyB2YXJpYWJsZSBpZFxuICpcbiAqIEBleGFtcGxlICcnXG4gKlxuICogQHJldHVybiAnJ1xuICpcbiAqL1xuLy8gV29ya2Zsb3cucHJvdG90eXBlLmdldFZhcmlhYmxlID0gZnVuY3Rpb24ocHJvY2Vzc0lkLCBwcm9jZXNzU2VxLCBzdWJQcm9jZXNzSWQsIHN1YlByb2Nlc3NTZXEsIHN0ZXBJZCwga2V5KXtcbi8vIFx0dmFyIF90aGlzID0gdGhpcztcbi8vIFx0cmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuLy8gXHRcdHRyeSB7XG4vLyBcdFx0XHRQcm9jZXNzLnNldFZhcmlhYmxlKHByb2Nlc3NJZCwgcHJvY2Vzc1NlcSwgc3ViUHJvY2Vzc0lkLCBzdWJQcm9jZXNzU2VxLCBzdGVwSWQsIGtleSkudGhlbihmdW5jaW9uKHJlc3VsdCl7XG4vLyBcdFx0XHRcdHJlc29sdmUocmVzdWx0LmRhdGEpO1xuLy8gXHRcdFx0fSwgZnVuY3Rpb24oZXJyKXtcbi8vIFx0XHRcdFx0cmVqZWN0KGVycik7XG4vLyBcdFx0XHR9KVxuLy8gXHRcdH0gY2F0Y2ggKGVycikge1xuLy8gXHRcdFx0cmVqZWN0KGVycik7XG4vLyBcdFx0fVxuXG4vLyBcdH0pO1xuLy8gfTtcblxuLyoqXG4gKiBUaGlzIG1ldGhvZCBjcmVhdGVzIGEgbmV3IHdvcmtmbG93IHByb2Nlc3MgaS5lLiBpdCBjcmVhdGVzIGEgd29ya2Zsb3cgcHJvY2Vzc2VzIGluc3RhbmNlXG4gKiBvYmplY3Qgd2l0aCB0aGUgbWluaW11bSByZXF1aXJlZCBkYXRhLiBUaGlzIGluc3RhbmNlIGNhbiBiZSByZWZlcmVuY2VkIGluIHRoZSBmb2xsb3dpbmdcbiAqIHdheSwgc2VlIGV4YW1wbGUgYmVsb3cuXG4gKlxuICogQGV4YW1wbGVcbiAqIHZhciBjb25maWcgPSB7ICdfaWQnOiAnYWJjMTIzJyB9O1xuXG4gKiB2YXIgd29ya2Zsb3cgPSBuZXcgV29ya2Zsb3coJzEyMzQnLCAnNTY3OCcsIGNvbmZpZyk7XG4gKiB3b3JrZmxvdy5jcmVhdGUoKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCl7XG4gKlx0Y29uc29sZS5sb2cocmVzdWx0Lm1lc3NhZ2UpO1xuICpcdC8vIFRoZSBmb2xsb3dpbmcgcHJvcGVydGllcyBjYW4gbm93IGJlIGFjY2Vzc2VkXG4gKiBcdHZhciBwcm9maWxlID0gd29ya2Zsb3cucHJvZmlsZTtcbiAqIFx0dmFyIGFwcCA9IHdvcmtmbG93LmFwcDtcbiAqIFx0dmFyIGNvbmZpZyA9IHdvcmtmbG93LmNvbmZpZztcbiAqXHQvLyBPbiBzdWNjZXNzIHlvdSBjYW4gYWNjZXNzIHRoZSBpbnN0YW5jZSB0aGUgZm9sbG93aW5nIHdheVxuICpcdHZhciBpbnN0YW5jZSA9IHdvcmtmbG93Lmluc3RhbmNlO1xuICogfSwgZnVuY3Rpb24oZXJyb3Ipe1xuICpcdGNvbnNvbGUubG9nKGVycm9yKTtcbiAqIH0pO1xuICpcbiAqIEByZXR1cm4ge09iamVjdH0gbmV3IFdvcmtmbG93IGluc3RhbmNlIHdpdGggdXBkYXRlZCBpbnN0YW5jZSBkYXRhLlxuICpcbiAqL1xuXG5Xb3JrZmxvdy5wcm90b3R5cGUuY3JlYXRlID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmIChfdGhpcy5pbnN0YW5jZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdmFyIHdhcm4gPSB1dGlsLndhcm4oJ0luc3RhbmNlIGFscmVhZHkgZXhpc3RzLicsIF90aGlzKVxuICAgICAgICAgICAgICAgIHJlc29sdmUod2Fybik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIENyZWF0ZSB0aGUgd29ya2Zsb3cgcHJvY2Vzc2VzIGluc3RhbmNlIG9iamVjdFxuICAgICAgICAgICAgICAgIHZhciBtb2RlbCA9IHtcbiAgICAgICAgICAgICAgICAgICAgX2lkOiAnJyxcbiAgICAgICAgICAgICAgICAgICAgdmVyc2lvbjogJycsXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICd3b3JrZmxvd0luc3RhbmNlJyxcbiAgICAgICAgICAgICAgICAgICAgcHJvY2Vzc2VzOiBbXSxcbiAgICAgICAgICAgICAgICAgICAgY2hhbm5lbHM6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiY29tbXVuaXR5X1wiICsgYXBwLlNDT1BFLmdldENvbW11bml0eUlkKCksXG4gICAgICAgICAgICAgICAgICAgICAgICBcInByb2ZpbGVfXCIgKyBhcHAuU0NPUEUucHJvZmlsZUlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJhcHBsaWNhdGlvbl9cIiArIGFwcC5TQ09QRS5hcHBsaWNhdGlvbklkLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJjb21tdW5pdHlfXCIgKyBhcHAuU0NPUEUuZ2V0Q29tbXVuaXR5SWQoKSArIFwiX2FwcGxpY2F0aW9uX1wiICsgYXBwLlNDT1BFLmFwcGxpY2F0aW9uSWRcbiAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICBtb2RlbC5faWQgPSBcIl9sb2NhbC9cIitfdGhpcy5wcm9maWxlICsgJzpwcm9jZXNzZXM6bG9jYWwnO1xuICAgICAgICAgICAgICAgIC8vbW9kZWwuX2lkID0gX3RoaXMucHJvZmlsZSArICc6cHJvY2Vzc2VzJztcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBtb2RlbC52ZXJzaW9uID0gX3RoaXMuY29uZmlnLnZlcnNpb247XG4gICAgICAgICAgICAgICAgX3RoaXMuaW5zdGFuY2UgPSBtb2RlbDtcbiAgICAgICAgICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnV29ya2Zsb3cgcHJvY2Vzc2VzIGluc3RhbmNlIGNyZWF0ZWQgc3VjY2Vzc2Z1bGx5LicsIF90aGlzKTtcbiAgICAgICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgfVxuXG4gICAgfSk7XG59O1xuXG4vKipcbiAqIFdvcmtmbG93IGluaXRpYWxpc2UsIHRoaXMgZnVuY3Rpb24gZXhlY3V0ZXMgYSBwcm9jZXNzIHdpdGhpbiBhIHdvcmtmbG93XG4gKiBjb25maWd1cmF0aW9uLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBwcm9jZXNzSWQgLSB0aGUgcHJvY2VzcyBpZCB0byBwcm9jZXNzXG4gKiBAcGFyYW0ge29iamVjdH0gW2RhdGFdIC0gdGhlIGlucHV0IGRhdGEgdG8gcHJvY2Vzc1xuICpcbiAqIEBleGFtcGxlXG4gKiBXb3JrZmxvdy5pbml0aWFsaXNlKCdwcm9jZXNzSWQnLCB7IHZhbGlkRGF0ZTogJ2RhdGUnIH0pO1xuICpcbiAqIEByZXR1cm4gXCJcIlxuICpcbiAqL1xuV29ya2Zsb3cucHJvdG90eXBlLmluaXRpYWxpc2UgPSBmdW5jdGlvbiAocHJvY2Vzc0lkLCBkYXRhLCBzdWJwcm9maWxlSWQpIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICB2YXIgY29uZmlnUHJvY2VzcyA9IFtdO1xuICAgICAgICAgICAgLy8gQ2hlY2sgdGhlIHBhc3NlZCBpbiBwYXJhbWV0ZXJzXG4gICAgICAgICAgICBpZiAocHJvY2Vzc0lkICE9PSAnJyAmJiBwcm9jZXNzSWQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIC8vIEdldCB0aGUgY3VycmVudCBwcm9jZXNzIGNvbmZpZ1xuICAgICAgICAgICAgICAgIGNvbmZpZ1Byb2Nlc3MgPSBfdGhpcy5jb25maWcucHJvY2Vzc2VzLmZpbHRlcihmdW5jdGlvbiAob2JqUHJvY2Vzcykge1xuICAgICAgICAgICAgICAgICAgICBpZiAob2JqUHJvY2Vzcy5faWQgPT0gcHJvY2Vzc0lkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gb2JqUHJvY2VzcztcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgaWYgKGNvbmZpZ1Byb2Nlc3NbMF0uX2lkID09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgZXJyb3IgPSB1dGlsLmVycm9yKCdXRkNvbmZpZ0Vycm9yJywgJ05vIHZhbGlkIHByb2Nlc3MgZGVmaW5pdGlvbiBmb3VuZCB3aXRoIHByb2Nlc3MgaWQ6ICcgKyBwcm9jZXNzSWQpO1xuICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25maWdQcm9jZXNzLnB1c2goX3RoaXMuY29uZmlnLnByb2Nlc3Nlc1swXSk7XG4gICAgICAgICAgICAgICAgcHJvY2Vzc0lkID0gX3RoaXMuY29uZmlnLnByb2Nlc3Nlc1swXS5faWQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIEdldCB0aGUgY3VycmVudCBsaXN0IG9mIHByb2Nlc3MgaW5zdGFuY2VzXG4gICAgICAgICAgICAvLyB2YXIgcHJvY2Vzc1NlcSA9IDE7XG4gICAgICAgICAgICB2YXIgY3VycmVudFByb2Nlc3MgPSBbXTtcbiAgICAgICAgICAgIF90aGlzLmluc3RhbmNlLnByb2Nlc3Nlcy5maWx0ZXIoZnVuY3Rpb24gKHByb2Nlc3NJdGVtKSB7XG4gICAgICAgICAgICAgICAgaWYgKHByb2Nlc3NJdGVtLmlkID09IHByb2Nlc3NJZCkge1xuICAgICAgICAgICAgICAgICAgICBjdXJyZW50UHJvY2Vzcy5wdXNoKHByb2Nlc3NJdGVtKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdmFyIHByb2Nlc3NTZXEgPSBjdXJyZW50UHJvY2Vzcy5sZW5ndGggKyAxO1xuICAgICAgICAgICAgLy8gdmFyIG5leHRTZXEgPSBwcm9jZXNzU2VxICsgMTtcbiAgICAgICAgICAgIC8vIFB1c2ggdGhlIHByb2Nlc3Mgb2JqZWN0IGludG8gdGhlIGFycmF5XG4gICAgICAgICAgICB2YXIgcHJvY2Vzc01vZGVsID0ge1xuICAgICAgICAgICAgICAgIGlkOiAnJyxcbiAgICAgICAgICAgICAgICBzZXE6ICcnLFxuICAgICAgICAgICAgICAgIHN1YlByb2Nlc3NlczogW11cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gMS4gVXBkYXRlIHRoZSBwcm9jZXNzIGlkIGFuZCBzZXFcbiAgICAgICAgICAgIHByb2Nlc3NNb2RlbC5pZCA9IHByb2Nlc3NJZDtcbiAgICAgICAgICAgIHByb2Nlc3NNb2RlbC5zZXEgPSBwcm9jZXNzU2VxO1xuICAgICAgICAgICAgX3RoaXMuaW5zdGFuY2UucHJvY2Vzc2VzLnB1c2gocHJvY2Vzc01vZGVsKTtcbiAgICAgICAgICAgIC8vIFBhcmFtZXRlcnNcbiAgICAgICAgICAgIHZhciBzdWJQcm9jZXNzSWQgPSBjb25maWdQcm9jZXNzWzBdLnN1YlByb2Nlc3Nlc1swXS5faWQ7XG4gICAgICAgICAgICB2YXIgc3ViUHJvY2Vzc1NlcSA9IDE7XG4gICAgICAgICAgICBfdGhpcy5pbnN0YW5jZS5wcm9jZXNzZXMuZmlsdGVyKGZ1bmN0aW9uIChwcm9jZXNzSXRlbSkge1xuICAgICAgICAgICAgICAgIGlmIChwcm9jZXNzSXRlbS5pZCA9PSBwcm9jZXNzSWQgJiYgcHJvY2Vzc0l0ZW0uc2VxID09IHByb2Nlc3NTZXEpIHtcbiAgICAgICAgICAgICAgICAgICAgc3ViUHJvY2Vzc1NlcSA9IHByb2Nlc3NJdGVtLnN1YlByb2Nlc3Nlcy5sZW5ndGggKyAxXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLy8gQ2FsbCB0aGUgc3VicHJvY2VzcyBtZXRob2RcblxuICAgICAgICAgICAgUHJvY2Vzcy5zdWJQcm9jZXNzKHByb2Nlc3NJZCwgcHJvY2Vzc1NlcSwgc3ViUHJvY2Vzc0lkLCBzdWJQcm9jZXNzU2VxLCBzdWJwcm9maWxlSWQsIGRhdGEsIF90aGlzKS50aGVuKGZ1bmN0aW9uIChzdWJQcm9jZXNzKSB7XG4gICAgICAgICAgICAgICAgLy8gR2VuZXJhdGUgdGhlIHV1aWRcblxuICAgICAgICAgICAgICAgIHZhciB1dWlkID0gc3ViUHJvY2Vzcy5kYXRhLl9pZDsgLy9fdGhpcy5wcm9maWxlICsgJzonICsgX3RoaXMuYXBwICsgJzonICsgcHJvY2Vzc0lkICsgJzonICsgcHJvY2Vzc1NlcSArICc6JyArIHN1YlByb2Nlc3NJZCArICc6JyArIHN1YlByb2Nlc3NTZXE7XG4gICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAvLyBCdWlsZCB0aGUgc3ViLXByb2Nlc3MgcmVmZXJlbmNlIG9iamVjdFxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHZhciBncm91cEtleSA9IHN1YlByb2Nlc3MuZGF0YS5ncm91cEtleTtcbiAgICAgICAgICAgICAgICAvL1RPRE86IENoYW5nZSByZXF1aXJlZCB0byBtb3ZlIGlzQWN0aXZlIHRvIHN1YlByb2Nlc3MgZmlsZS5SZW1vdmUgZnJvbSBoZXJlXG4gICAgICAgICAgICAgICAgaWYoc3VicHJvZmlsZUlkID09IHVuZGVmaW5lZCl7XG4gICAgICAgICAgICAgICAgICAgIHN1YnByb2ZpbGVJZCA9ICcnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB2YXIgc3ViUHJvY2Vzc1JlZiA9IHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IHN1YlByb2Nlc3NJZCxcbiAgICAgICAgICAgICAgICAgICAgc3VicHJvZmlsZUlkOiBzdWJwcm9maWxlSWQsXG4gICAgICAgICAgICAgICAgICAgIHNlcTogc3ViUHJvY2Vzcy5kYXRhW1wibWV0YS1kYXRhXCJdLnN1YlByb2Nlc3NJbnNTZXEsXG4gICAgICAgICAgICAgICAgICAgIHV1aWQ6IHV1aWQsXG4gICAgICAgICAgICAgICAgICAgIGdyb3VwS2V5OiBncm91cEtleVxuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gQWRkIHRoZSByZWZlcmVuY2UgdG8gdGhlIHByb2Nlc3MgbW9kZWxcbiAgICAgICAgICAgICAgICBwcm9jZXNzTW9kZWwuc3ViUHJvY2Vzc2VzLnB1c2goc3ViUHJvY2Vzc1JlZik7XG4gICAgICAgICAgICAgICAgLy8gQWRkIHRoZSBzdWJQcm9jZXNzIG1vZGVsIHRvIHRoZSBzdWJwcm9jZXNzZXMgYXJyYXlcbiAgICAgICAgICAgICAgICAvL190aGlzLnN1YnByb2Nlc3Nlcy5wdXNoKHN1YlByb2Nlc3MuZGF0YSk7XG4gICAgICAgICAgICAgICAgLy8gX3RoaXMuaW5zdGFuY2UucHJvY2Vzc2VzLnB1c2gocHJvY2Vzc01vZGVsKTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpbmRleCA9IDA7IGluZGV4IDwgX3RoaXMuaW5zdGFuY2UucHJvY2Vzc2VzLmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgcHJvY2Vzc0l0ZW0gPSBfdGhpcy5pbnN0YW5jZS5wcm9jZXNzZXNbaW5kZXhdO1xuICAgICAgICAgICAgICAgICAgICBpZiAocHJvY2Vzc0l0ZW0uaWQgPT0gcHJvY2Vzc0lkICYmIHByb2Nlc3NJdGVtLnNlcSA9PSBwcm9jZXNzU2VxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBSZW1vdmUgdGhlIGN1cnJlbnQgcHJvY2VzcyBmcm9tIHRoZSBhcnJheSBhbmQgYWRkIHRoZSB1cGRhdGVkIHByb2Nlc3NNb2RlbFxuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuaW5zdGFuY2UucHJvY2Vzc2VzLnNwbGljZShpbmRleCwgMSwgcHJvY2Vzc01vZGVsKVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBQcm9jZXNzIHRoZSBpbmRpY2F0b3IgZG9jdW1lbnRzIHdvcmtmbG93IHByb2Nlc3NlcyB1cGRhdGVzXG4gICAgICAgICAgICAgICAgdmFyIGluZGljYXRvcnMgPSBzdWJQcm9jZXNzLmRhdGEuaW5kaWNhdG9ycztcbiAgICAgICAgICAgICAgICB2YXIgc3RlcCA9IHN1YlByb2Nlc3MuZGF0YS5zdGVwO1xuICAgICAgICAgICAgICAgIFByb2Nlc3MuaW5kaWNhdG9yRG9jcyhwcm9jZXNzSWQsIGluZGljYXRvcnMsIHN0ZXAsIF90aGlzKS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ1Byb2Nlc3M6ICcgKyBfdGhpcy5jb25maWcucHJvY2Vzc2VzWzBdLl9pZCArICcgaW5pdGlhbGl6ZWQgc3VjY2Vzc2Z1bGx5LicsIHN1YlByb2Nlc3NSZWYpO1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5pbnN0YW5jZS5wcm9jZXNzZXMgPSBfdGhpcy5pbnN0YW5jZS5wcm9jZXNzZXMuZmlsdGVyKGZ1bmN0aW9uIChvYmopIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICEob2JqLmlkID09IHByb2Nlc3NJZCAmJiBvYmouc2VxID09IHByb2Nlc3NTZXEpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgfVxuXG4gICAgfSk7XG59O1xuXG4vKipcbiAqIFdvcmtmbG93IHRyYW5zaXRpb24gdG8gdGhlIG5leHQgc3RlcC4gVGhpcyBtb3ZlcyB0aGUgd29ya2Zsb3cgZnJvbSB0aGUgY3VycmVudCBwcm9jZXNzLFxuICogc3ViLXByb2Nlc3Mgc3RlcCB0byB0aGUgbmV4dCBvbmUgYXMgc3BlY2lmaWVkLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBwcm9jZXNzSWQgLSB0aGUgV29ya2Zsb3cgY29uZmlnIC8gZGVmaW5pdGlvbiBwcm9jZXNzIGlkXG4gKiBAcGFyYW0ge251bWJlcn0gcHJvY2Vzc1NlcSAtIHRoZSBXb3JrZmxvdyBpbnN0YW5jZSBwcm9jZXNzIHNlcVxuICogQHBhcmFtIHtzdHJpbmd9IHN1YlByb2Nlc3NJZCAtIHRoZSBXb3JrZmxvdyBjb25maWcgLyBkZWZpbml0aW9uIHN1Yi1wcm9jZXNzIGlkXG4gKiBAcGFyYW0ge251bWJlcn0gc3ViUHJvY2Vzc1NlcSAtIHRoZSBXb3JrZmxvdyBpbnN0YW5jZSBzdWItcHJvY2VzcyBzZXFcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdGVwSWQgLSB0aGUgV29ya2Zsb3cgY29uZmlnIC8gZGVmaW5pdGlvbiBzdGVwIGlkIFxuICogQHBhcmFtIHtzdHJpbmd9IHRyYW5zaXRpb25JZCAtIHRoZSBXb3JrZmxvdyBjb25maWcgLyBkZWZpbml0aW9uIHRyYW5zaXRpb24gaWRcbiAqIEBwYXJhbSB7b2JqZWN0fSBkYXRhIC0gYW55IGFkZGl0aW9uYWwgZGF0YSBwYXNzZWQgaW4gYXMga2V5IHZhbHVlIHBhaXJzXG4gKlxuICogQGV4YW1wbGVcbiAqIFdvcmtmbG93LnRyYW5zaXRpb24oJ3Byb2Nlc3NJZCcsIDEsICdzdWJQcm9jZXNzSWQnLCAxLCAnc3RlcElkJywgJ3RyYW5zaXRpb25JZCcsIHsga2V5OiAnJywgdmFsdWU6ICcnIH0pO1xuICpcbiAqIEByZXR1cm4gXCJcIlxuICpcbiAqL1xuV29ya2Zsb3cucHJvdG90eXBlLnRyYW5zaXRpb24gPSBmdW5jdGlvbiAocHJvY2Vzc0lkLCBwcm9jZXNzU2VxLCBzdWJQcm9jZXNzSWQsIHN1YlByb2Nlc3NTZXEsIHN0ZXBJZCwgdHJhbnNpdGlvbklkLCBkYXRhLCBzcHV1aWQpIHtcbiAgICAvLyBSZS1hc3NpZ24gdGhpc1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHZhciBtb2RlbCA9IEpTT04ueHBhdGgoXCIvc3VicHJvY2Vzc2VzW19pZCBlcSAnXCIgKyBzcHV1aWQgKyBcIiddL3N0ZXBcIiwgYXBwLlNDT1BFLndvcmtmbG93LCB7fSlbMF07XG4gICAgICAgICAgICB2YXIgc3RlcE9iamVjdCA9IEpTT04ueHBhdGgoXCIvcHJvY2Vzc2VzW19pZCBlcSAnXCIgKyBwcm9jZXNzSWQgKyBcIiddL3N1YlByb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgc3ViUHJvY2Vzc0lkICsgXCInXS9zdGVwc1tfaWQgZXEgJ1wiICsgc3RlcElkICsgXCInXVwiLCBfdGhpcy5jb25maWcsIHt9KVswXTtcbiAgICAgICAgICAgIHZhciBzdWJQcm9jZXNzU2VxID0gSlNPTi54cGF0aChcIi9zdWJwcm9jZXNzZXNbX2lkIGVxICdcIiArIHNwdXVpZCArIFwiJ10vbWV0YS1kYXRhL3N1YlByb2Nlc3NJbnNTZXFcIiwgYXBwLlNDT1BFLndvcmtmbG93LCB7fSlbMF07XG5cbiAgICAgICAgICAgIC8vIFVwZGF0ZSB0aGUgY3VycmVudCBzdWItcHJvY2VzcyBzdGVwIGRhdGFcbiAgICAgICAgICAgIHZhciB1cGRhdGUgPSBmdW5jdGlvbiAodHlwZSwgcmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuaW5zdGFuY2UucHJvY2Vzc2VzLmZpbHRlcihmdW5jdGlvbiAocHJvY2Vzc0l0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHByb2Nlc3NJdGVtLmlkID09IHByb2Nlc3NJZCAmJiBwcm9jZXNzSXRlbS5zZXEgPT0gcHJvY2Vzc1NlcSkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9jZXNzSXRlbS5zdWJQcm9jZXNzZXMuZmlsdGVyKGZ1bmN0aW9uIChzdWJQcm9jZXNzSXRlbSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzdWJQcm9jZXNzSXRlbS5pZCA9PSBzdWJQcm9jZXNzSWQpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5zdWJwcm9jZXNzZXMuZmlsdGVyKGZ1bmN0aW9uIChzdWJQcm9jZXNzT2JqKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3ViUHJvY2Vzc09iai5faWQgPT0gc3B1dWlkKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZSA9PSAnc3RlcCcpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWJQcm9jZXNzT2JqLnN0ZXAgPSByZXN1bHQuZGF0YS5zdGVwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcyhyZXN1bHQubWVzc2FnZSwgc3ViUHJvY2Vzc09iaik7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGUgPT0gJ3N0ZXBDb21wbGV0ZScpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWJQcm9jZXNzT2JqLnN0ZXAgPSByZXN1bHQuZGF0YS5zdGVwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWJQcm9jZXNzT2JqLmNvbXBsZXRlID0gdHJ1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcyhyZXN1bHQubWVzc2FnZSwgc3ViUHJvY2Vzc09iai5zdGVwKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIGlmIChzdGVwT2JqZWN0LmZ1bmN0aW9uLnRhc2sgIT0gdW5kZWZpbmVkICYmIHN0ZXBPYmplY3QuZnVuY3Rpb24udGFzay5wb3N0QWN0aW9ucyAhPSB1bmRlZmluZWQpIHtcblxuXG4gICAgICAgICAgICAgICAgdmFyIHBvc3RBY3Rpb25zID0gc3RlcE9iamVjdC5mdW5jdGlvbi50YXNrLnBvc3RBY3Rpb25zO1xuICAgICAgICAgICAgICAgIFByb2Nlc3MucG9zdEFjdGlvbnMocG9zdEFjdGlvbnMsIF90aGlzLCBzcHV1aWQpLnRoZW4oZnVuY3Rpb24gKHN1Y2Nlc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBQcm9jZXNzLnRyYW5zaXRpb24ocHJvY2Vzc0lkLCBwcm9jZXNzU2VxLCBzdWJQcm9jZXNzSWQsIHN1YlByb2Nlc3NTZXEsIHN0ZXBJZCwgdHJhbnNpdGlvbklkLCBkYXRhLCBfdGhpcywgc3B1dWlkLCBtb2RlbCkudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQuZGF0YS5zdWJQcm9jZXNzQ29tcGxldGUpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVwZGF0ZSgnc3RlcENvbXBsZXRlJywgcmVzdWx0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cGRhdGUoJ3N0ZXAnLCByZXN1bHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChlcnIpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGVycikge1xuXG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuXG4gICAgICAgICAgICAgICAgfSk7XG5cblxuICAgICAgICAgICAgfSBlbHNlIHtcblxuXG4gICAgICAgICAgICAgICAgUHJvY2Vzcy50cmFuc2l0aW9uKHByb2Nlc3NJZCwgcHJvY2Vzc1NlcSwgc3ViUHJvY2Vzc0lkLCBzdWJQcm9jZXNzU2VxLCBzdGVwSWQsIHRyYW5zaXRpb25JZCwgZGF0YSwgX3RoaXMsIHNwdXVpZCwgbW9kZWwpLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQuZGF0YS5zdWJQcm9jZXNzQ29tcGxldGUpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdXBkYXRlKCdzdGVwQ29tcGxldGUnLCByZXN1bHQpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB1cGRhdGUoJ3N0ZXAnLCByZXN1bHQpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcblxuICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgIH1cblxuICAgIH0pO1xufTtcblxuLyoqXG4gKiBXb3JrZmxvdyBhc3NpZ24gdXNlci5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gcHJvY2Vzc0lkIC0gdGhlIFdvcmtmbG93IGNvbmZpZyAvIGRlZmluaXRpb24gcHJvY2VzcyBpZFxuICogQHBhcmFtIHtudW1iZXJ9IHByb2Nlc3NTZXEgLSB0aGUgV29ya2Zsb3cgaW5zdGFuY2UgcHJvY2VzcyBzZXFcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdWJQcm9jZXNzSWQgLSB0aGUgV29ya2Zsb3cgY29uZmlnIC8gZGVmaW5pdGlvbiBzdWItcHJvY2VzcyBpZFxuICogQHBhcmFtIHtudW1iZXJ9IHN1YlByb2Nlc3NTZXEgLSB0aGUgV29ya2Zsb3cgaW5zdGFuY2Ugc3ViLXByb2Nlc3Mgc2VxXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RlcElkIC0gdGhlIFdvcmtmbG93IGNvbmZpZyAvIGRlZmluaXRpb24gc3RlcCBpZFxuICogQHBhcmFtIHtvYmplY3R9IHVzZXIgLSB0aGUgdXNlciBpZCBhbmQgbmFtZSBkYXRhXG4gKlxuICogQGV4YW1wbGUgXCJcIlxuICpcbiAqIEByZXR1cm4gXCJcIlxuICpcbiAqL1xuV29ya2Zsb3cucHJvdG90eXBlLmFzc2lnblVzZXIgPSBmdW5jdGlvbiAocHJvY2Vzc0lkLCBwcm9jZXNzU2VxLCBzdWJQcm9jZXNzSWQsIHN1YlByb2Nlc3NTZXEsIHVzZXIsIHV1aWQpIHtcbiAgICAvLyBSZS1hc3NpZ24gdGhlIFdvcmtmbG93IGNvbnN0cnVjdG9yIGluc3RhbmNlIGFzIF90aGlzXG4gICAgdmFyIF90aGlzID0gdGhpcztcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgUHJvY2Vzcy5hc3NpZ25Vc2VyKHByb2Nlc3NJZCwgcHJvY2Vzc1NlcSwgc3ViUHJvY2Vzc0lkLCBzdWJQcm9jZXNzU2VxLCB1c2VyLCB1dWlkLCBfdGhpcykudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQpO1xuICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgfVxuXG4gICAgfSlcbn07XG5cbi8qKlxuICogV29ya2Zsb3cgdGFzaywgdGhpcyBtZXRob2QgZXhlY3V0ZXMgYSBzcGVjaWZpYyB0YXNrLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBwcm9jZXNzSWQgLSB0aGUgcHJvY2VzcyBpZCB0byBwcm9jZXNzXG4gKiBAcGFyYW0ge29iamVjdH0gaW5wdXREYXRhIC0gdGhlIGlucHV0IGRhdGEgdG8gcHJvY2Vzc1xuICpcbiAqIEBleGFtcGxlXG4gKiBXb3JrZmxvdy5pbml0aWFsaXplKCdwcm9jZXNzSWQnLCB7IHZhbGlkRGF0ZTogJ2RhdGUnIH0pO1xuICpcbiAqIEByZXR1cm4gXCJcIlxuICpcbiAqL1xuV29ya2Zsb3cucHJvdG90eXBlLnVpID0gZnVuY3Rpb24gKCkge1xuICAgIC8vIFJlLWFzc2lnbiB0aGUgV29ya2Zsb3cgY29uc3RydWN0b3IgaW5zdGFuY2UgYXMgX3RoaXNcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgIHJldHVybiB7XG4gICAgICAgIGdldFByb2Nlc3M6IGZ1bmN0aW9uIChwcm9jZXNzSWQsIGxhbmcpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgdXNlckludGVyZmFjZS5nZXRQcm9jZXNzKHByb2Nlc3NJZCwgbGFuZywgX3RoaXMpLnRoZW4oZnVuY3Rpb24gKG1vZGVsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKG1vZGVsKTtcbiAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuXG4gICAgfVxuXG59O1xuXG4vKipcbiAqIFdvcmtmbG93IHRhc2ssIHRoaXMgbWV0aG9kIGV4ZWN1dGVzIGEgc3BlY2lmaWMgdGFzay5cbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gZGF0YSAtIHRoZSBwcm9jZXNzIGlkIHRvIHByb2Nlc3NcbiAqIEBwYXJhbSB7b2JqZWN0fSBfV0ZJbnN0YW5jZSAtIHRoZSBpbnB1dCBkYXRhIHRvIHByb2Nlc3NcbiAqICogQHBhcmFtIHtzdHJpbmd9IHV1aWQgLSB0aGUgaW5wdXQgZGF0YSB0byBwcm9jZXNzXG4gKlxuICogQGV4YW1wbGVcbiAqIFdvcmtmbG93LmdldE5vZGVWYWx1ZShkYXRhLCBfV0ZJbnN0YW5jZSwgdXVpZCk7XG4gKlxuICogQHJldHVybiBcIlwiXG4gKlxuICovXG5cbldvcmtmbG93LnByb3RvdHlwZS5nZXROb2RlVmFsdWUgPSBmdW5jdGlvbiAoZGF0YSwgdXVpZCkge1xuICAgIC8vIFJlLWFzc2lnbiB0aGUgV29ya2Zsb3cgY29uc3RydWN0b3IgaW5zdGFuY2UgYXMgX3RoaXNcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBoZWxwZXIuZ2V0Tm9kZVZhbHVlKGRhdGEsIF90aGlzLCB1dWlkKS50aGVuKGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICAgICAgICByZXNvbHZlKHJlcyk7XG4gICAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgfVxuXG4gICAgfSlcbn07XG5cbi8qKlxuICogV29ya2Zsb3cgdGFzaywgdGhpcyBtZXRob2QgZXhlY3V0ZXMgYSBzcGVjaWZpYyB0YXNrLlxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBkYXRhIC0gdGhlIHByb2Nlc3MgaWQgdG8gcHJvY2Vzc1xuICogQHBhcmFtIHtvYmplY3R9IF9XRkluc3RhbmNlIC0gdGhlIGlucHV0IGRhdGEgdG8gcHJvY2Vzc1xuICpcbiAqIEBleGFtcGxlXG4gKiBXb3JrZmxvdy50YWtlQXNzaWdubWVudChzcHV1aWQsIF9XRkluc3RhbmNlKTtcbiAqXG4gKiBAcmV0dXJuIFwiXCJcbiAqXG4gKi9cblxuV29ya2Zsb3cucHJvdG90eXBlLnRha2VBc3NpZ25tZW50ID0gZnVuY3Rpb24gKHNwdXVpZCkge1xuICAgIC8vIFJlLWFzc2lnbiB0aGUgV29ya2Zsb3cgY29uc3RydWN0b3IgaW5zdGFuY2UgYXMgX3RoaXNcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcblxuICAgICAgICB0cnkge1xuXG4gICAgICAgICAgICAvL0Fzc2lnbm1lbnQgYXJlIGV4ZWN1dGluZyBoZXJlXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHZhciBzcE9iamVjdCA9IEpTT04ueHBhdGgoXCIvc3VicHJvY2Vzc2VzW19pZCBlcSAnXCIgKyBzcHV1aWQgKyBcIiddXCIsIF90aGlzLCB7fSlbMF07XG4gICAgICAgICAgICB2YXIgYXNzaWduZWUgPSBKU09OLnhwYXRoKFwiL3N0ZXAvYXNzaWduZWRUb1wiLCBzcE9iamVjdCwge30pWzBdO1xuICAgICAgICAgICAgLy9QdXNoaW5nIG9sZGVyIHJlY29yZCBpbiByZUFzc2lnbiBhcnJheVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZihzcE9iamVjdC5zdGVwLmFzc2lnbm1lbnRIaXN0b3J5ID09IHVuZGVmaW5lZCl7XG4gICAgICAgICAgICAgICAgc3BPYmplY3Quc3RlcC5hc3NpZ25tZW50SGlzdG9yeSA9IFtdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYoYXNzaWduZWUudXNlcklkICE9IFwiXCIgJiYgYXNzaWduZWUubmFtZSAhPSBcIlwiKXtcbiAgICAgICAgICAgICAgICBzcE9iamVjdC5zdGVwLmFzc2lnbm1lbnRIaXN0b3J5LnB1c2goSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShhc3NpZ25lZSkpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGFzc2lnbmVlLm5hbWUgPSBMT0NBTF9TRVRUSU5HUy5TRVNTSU9OLmZpcnN0TmFtZSArIFwiIFwiKyBMT0NBTF9TRVRUSU5HUy5TRVNTSU9OLmxhc3ROYW1lO1xuICAgICAgICAgICAgYXNzaWduZWUudXNlcklkID0gTE9DQUxfU0VUVElOR1MuU1VCU0NSSVBUSU9OUy51c2VySWQgKyBcIlwiO1xuICAgICAgICAgICAgYXNzaWduZWUuZGF0ZVRpbWUgPSBuZXcgRGF0ZSgpO1xuICAgICAgICAgICAgYXNzaWduZWUudHlwZSA9IEFTU0lHTk1FTlRfVFlQRV9BQ0NFUFRBTkNFO1xuICAgICAgICAgICAgYXNzaWduZWUuZHVlRGF0ZVRpbWUgPSAnJztcbiAgICAgICAgICAgIGFzc2lnbmVlLmJ5ID0gTE9DQUxfU0VUVElOR1MuU1VCU0NSSVBUSU9OUy51c2VySWQgKyBcIlwiO1xuICAgICAgICAgICBcblxuICAgICAgICAgICAgLy9mZXRjaCBwcmVXb3JrQWN0aW9ucyBoZXJlIFxuXG4gICAgICAgICAgICB2YXIgcHJvY2Vzc0lkID0gSlNPTi54cGF0aChcIi9pbnN0YW5jZS9wcm9jZXNzZXNbc3ViUHJvY2Vzc2VzL3V1aWQgZXEgJ1wiICsgc3B1dWlkICsgXCInXS9pZFwiLCBfdGhpcywge30pWzBdO1xuICAgICAgICAgICAgdmFyIHN1YlByb2Nlc3NJZCA9IEpTT04ueHBhdGgoXCIvaW5zdGFuY2UvcHJvY2Vzc2VzL3N1YlByb2Nlc3Nlc1t1dWlkIGVxICdcIiArIHNwdXVpZCArIFwiJ10vaWRcIiwgX3RoaXMsIHt9KVswXTtcbiAgICAgICAgICAgIHZhciBzdGVwSWQgPSBKU09OLnhwYXRoKFwiL3N1YnByb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgc3B1dWlkICsgXCInXS9zdGVwL2lkXCIsIF90aGlzLCB7fSlbMF07XG4gICAgICAgICAgICB2YXIgc3RlcE9iamVjdCA9IEpTT04ueHBhdGgoXCIvcHJvY2Vzc2VzW19pZCBlcSAnXCIgKyBwcm9jZXNzSWQgKyBcIiddL3N1YlByb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgc3ViUHJvY2Vzc0lkICsgXCInXS9zdGVwc1tfaWQgZXEgJ1wiICsgc3RlcElkICsgXCInXVwiLCBfdGhpcy5jb25maWcsIHt9KVswXTtcblxuICAgICAgICAgICAgaWYgKHN0ZXBPYmplY3QuZnVuY3Rpb24udGFzay5wcmVXb3JrQWN0aW9ucyAhPSB1bmRlZmluZWQpIHtcblxuICAgICAgICAgICAgICAgIHZhciBwcmVXb3JrQWN0aW9ucyA9IHN0ZXBPYmplY3QuZnVuY3Rpb24udGFzay5wcmVXb3JrQWN0aW9ucztcbiAgICAgICAgICAgICAgICBQcm9jZXNzLnByZVdvcmtBY3Rpb25zKHByZVdvcmtBY3Rpb25zLCBfdGhpcykudGhlbihmdW5jdGlvbiAoc3VjY2Vzcykge1xuXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoX3RoaXMpO1xuXG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGVycikge1xuXG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICByZXNvbHZlKF90aGlzKTtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xuXG4gICAgICAgICAgICByZWplY3QoZXJyKTtcblxuICAgICAgICB9XG5cbiAgICB9KTtcbn07XG5cblxuXG5tb2R1bGUuZXhwb3J0cyA9IFdvcmtmbG93OyIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWwgPSByZXF1aXJlKCd1dGlsaXR5Jyk7XG52YXIgbm9kZVZhbHVlID0gcmVxdWlyZSgnLi9ub2RlVmFsdWUnKTtcbnZhciBmb3JtID0gcmVxdWlyZSgnLi9mb3JtJyk7XG52YXIgaGVscGVyID0gcmVxdWlyZSgnLi9oZWxwZXInKTtcblxudmFyIGdhdGVrZWVwZXIgPSBuZXcgR0soKTtcblxuLyoqXG4gKiBBY3Rpb25zIE1vZHVsZVxuICpcbiAqIEBtb2R1bGUgbGliL2FjdGlvbnNcbiAqIEBhdXRob3IgSGFzYW4gQWJiYXNcbiAqIEB2ZXJzaW9uIDIuMC4wXG4gKiBAZGVzY3JpcHRpb24gdGVzdCBkZXNjcmlwdGlvblxuICogQGNvcHlyaWdodCBLd2FudHUgTHRkIFJTQSAyMDA5LTIwMTUuXG4gKlxuICovXG5cbi8qKlxuICogIEZvcm0gTW9kdWxlIGFjdGlvbnMgbmVlZHMgdG8gYmUgbW92ZWQgaGVyZS5cbiAqICBUaGlzIGFjdGlvbnMgbW9kdWxlIHdpbGwgYmUgY2VudGFsIHBsYWNlIHRvIGhvbGQgYWxsIGZ1bmN0aW9ucy5cbiAqICBcbiAqL1xuXG52YXIgY29tbXVuaXR5ID0gKGZ1bmN0aW9uICgpIHtcblxuICAgIHJldHVybiB7XG5cbiAgICAgICAgY3JlYXRlQ29tbXVuaXR5OiBmdW5jdGlvbiAoX2RlZiwgdXVpZCwgX1dGSW5zdGFuY2UpIHtcblxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcblxuICAgICAgICAgICAgICAgIHZhciB3b3JrZXJPYmplY3QgPSB3b3JrZXIuZ2V0V29ya2VyV3JhcHBlcigpO1xuXG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0Ll9pZCA9IGdlbmVyYXRlVVVJRCgpO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5jb21tdW5pdHlJZCA9IGFwcC5TQ09QRS5nZXRDb21tdW5pdHlJZCgpO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5hcHBsaWNhdGlvbklkID0gYXBwLlNDT1BFLmFwcGxpY2F0aW9uSWQ7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmNyZWF0ZWREYXRlVGltZSA9IG5ldyBEYXRlKCkudG9TdHJpbmcoKTtcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3Quc2VuZGVyVXNlcklkID0gTE9DQUxfU0VUVElOR1MuU1VCU0NSSVBUSU9OUy51c2VySWQ7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LnByb2ZpbGVJZCA9IF9XRkluc3RhbmNlLnByb2ZpbGU7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmNoYW5uZWxzLnB1c2goXCJkYXRhUmVnaXN0cnlcIik7XG4gICAgICAgICAgICAgICAgdmFyIHV1aWRDb21tdW5pdHkgPSBKU09OLnhwYXRoKFwiL2luZGljYXRvcnNbY2F0ZWdvcnkvdGVybSBlcSAnQ29tbXVuaXR5J10vX2lkXCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XG4gICAgICAgICAgICAgICAgdmFyIGFjdGlvbiA9IHtcbiAgICAgICAgICAgICAgICAgICAgXCJjcmVhdGVDb21tdW5pdHlcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJuZXdDb21tdW5pdHlJZFwiOiBfV0ZJbnN0YW5jZS5wcm9maWxlLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJpbmRpY2F0b3JVVUlEXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkNvbW11bml0eVwiOiB1dWlkQ29tbXVuaXR5XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5hY3Rpb24gPSBhY3Rpb247XG4gICAgICAgICAgICAgICAgd29ya2VyLnNlbmQod29ya2VyT2JqZWN0KS50aGVuKGZ1bmN0aW9uICh3b3JrZXJTdWNjZXNzKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ1dvcmtlciBwcm9jZXNzZWQgc3VjY2Vzc2Z1bGx5LicsIHdvcmtlclN1Y2Nlc3MpO1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xuXG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKHdvcmtlckZhaWwpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KHdvcmtlckZhaWwpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIHVzZXJKb2luQ29tbXVuaXR5OiBmdW5jdGlvbiAoX2RlZiwgdXVpZCwgX1dGSW5zdGFuY2UpIHtcblxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcblxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfSxcbiAgICAgICAgcmVsZWFzZUFkb3B0ZWRBcHBsaWNhdGlvbjogZnVuY3Rpb24gKF9kZWYsIHV1aWQsIF9XRkluc3RhbmNlKSB7XG5cbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG5cbiAgICAgICAgICAgICAgICB2YXIgd29ya2VyT2JqZWN0ID0gd29ya2VyLmdldFdvcmtlcldyYXBwZXIoKTtcblxuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5faWQgPSBnZW5lcmF0ZVVVSUQoKTtcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuY29tbXVuaXR5SWQgPSBhcHAuU0NPUEUuZ2V0Q29tbXVuaXR5SWQoKTtcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuYXBwbGljYXRpb25JZCA9IGFwcC5TQ09QRS5hcHBsaWNhdGlvbklkO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5jcmVhdGVkRGF0ZVRpbWUgPSBuZXcgRGF0ZSgpLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LnNlbmRlclVzZXJJZCA9IExPQ0FMX1NFVFRJTkdTLlNVQlNDUklQVElPTlMudXNlcklkO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5wcm9maWxlSWQgPSBfV0ZJbnN0YW5jZS5wcm9maWxlO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5jaGFubmVscy5wdXNoKFwiZGF0YVJlZ2lzdHJ5XCIpO1xuICAgICAgICAgICAgICAgIHZhciB1dWlkUmVsZWFzZUFkb3B0ZWRBcHBsaWNhdGlvbiA9IEpTT04ueHBhdGgoXCIvc3VicHJvY2Vzc2VzW19pZCBlcSAnXCIgKyB1dWlkICsgXCInXS9pbmRpY2F0b3JzW2lkIGVxICdhZG9wdGVkQXBwbGljYXRpb24nXS9pbnN0YW5jZXNbMV0vdXVpZFwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xuXG4gICAgICAgICAgICAgICAgdmFyIGFjdGlvbiA9IHtcbiAgICAgICAgICAgICAgICAgICAgXCJyZWxlYXNlQWRvcHRlZEFwcGxpY2F0aW9uXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiY29tbXVuaXR5SWRcIjogX1dGSW5zdGFuY2UucHJvZmlsZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiaW5kaWNhdG9yVVVJRFwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhZG9wdGVkQXBwbGljYXRpb25cIjogdXVpZFJlbGVhc2VBZG9wdGVkQXBwbGljYXRpb25cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmFjdGlvbiA9IGFjdGlvbjtcbiAgICAgICAgICAgICAgICB3b3JrZXIuc2VuZCh3b3JrZXJPYmplY3QpLnRoZW4oZnVuY3Rpb24gKHdvcmtlclN1Y2Nlc3MpIHtcblxuICAgICAgICAgICAgICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnV29ya2VyIHByb2Nlc3NlcyBzdWNjZXNzZnVsbHkuJywgd29ya2VyU3VjY2Vzcyk7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoc3VjY2Vzcyk7XG5cbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAod29ya2VyRmFpbCkge1xuICAgICAgICAgICAgICAgICAgICByZWplY3Qod29ya2VyRmFpbCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG59KSgpO1xuXG52YXIgYXBwbGljYXRpb24gPSAoZnVuY3Rpb24gKCkge1xuXG4gICAgcmV0dXJuIHtcblxuICAgICAgICBjcmVhdGVBcHBEZWZpbml0aW9uOiBmdW5jdGlvbiAoX2RlZiwgdXVpZCwgX1dGSW5zdGFuY2UpIHtcblxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcblxuICAgICAgICAgICAgICAgIHZhciB3b3JrZXJPYmplY3QgPSB3b3JrZXIuZ2V0V29ya2VyV3JhcHBlcigpO1xuXG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0Ll9pZCA9IGdlbmVyYXRlVVVJRCgpO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5jb21tdW5pdHlJZCA9IGFwcC5TQ09QRS5nZXRDb21tdW5pdHlJZCgpO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5hcHBsaWNhdGlvbklkID0gYXBwLlNDT1BFLmFwcGxpY2F0aW9uSWQ7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmNyZWF0ZWREYXRlVGltZSA9IG5ldyBEYXRlKCkudG9TdHJpbmcoKTtcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3Quc2VuZGVyVXNlcklkID0gTE9DQUxfU0VUVElOR1MuU1VCU0NSSVBUSU9OUy51c2VySWQ7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LnByb2ZpbGVJZCA9IF9XRkluc3RhbmNlLnByb2ZpbGU7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmNoYW5uZWxzLnB1c2goXCJkYXRhUmVnaXN0cnlcIik7XG4gICAgICAgICAgICAgICAgdmFyIHV1aWRBcHBsaWNhdGlvbiA9IEpTT04ueHBhdGgoXCIvaW5kaWNhdG9yc1tjYXRlZ29yeS90ZXJtIGVxICdBcHBsaWNhdGlvbiddL19pZFwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xuICAgICAgICAgICAgICAgIHZhciBhY3Rpb24gPSB7XG4gICAgICAgICAgICAgICAgICAgIFwiY3JlYXRlQXBwbGljYXRpb25cIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJuZXdBcHBsaWNhdGlvbklkXCI6IF9XRkluc3RhbmNlLnByb2ZpbGUsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImluZGljYXRvclVVSURcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQXBwbGljYXRpb25cIjogdXVpZEFwcGxpY2F0aW9uXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5hY3Rpb24gPSBhY3Rpb247XG4gICAgICAgICAgICAgICAgd29ya2VyLnNlbmQod29ya2VyT2JqZWN0KS50aGVuKGZ1bmN0aW9uICh3b3JrZXJTdWNjZXNzKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ1dvcmtlciBwcm9jZXNzZXMgc3VjY2Vzc2Z1bGx5LicsIHdvcmtlclN1Y2Nlc3MpO1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xuXG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKHdvcmtlckZhaWwpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KHdvcmtlckZhaWwpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfSxcblxuICAgICAgICBidWlsZEFwcGxpY2F0aW9uOiBmdW5jdGlvbiAoX2RlZiwgdXVpZCwgX1dGSW5zdGFuY2UpIHtcblxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcblxuICAgICAgICAgICAgICAgIHZhciB3b3JrZXJPYmplY3QgPSB3b3JrZXIuZ2V0V29ya2VyV3JhcHBlcigpO1xuXG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0Ll9pZCA9IGdlbmVyYXRlVVVJRCgpO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5jb21tdW5pdHlJZCA9IGFwcC5TQ09QRS5nZXRDb21tdW5pdHlJZCgpO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5hcHBsaWNhdGlvbklkID0gYXBwLlNDT1BFLmFwcGxpY2F0aW9uSWQ7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmNyZWF0ZWREYXRlVGltZSA9IG5ldyBEYXRlKCkudG9TdHJpbmcoKTtcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3Quc2VuZGVyVXNlcklkID0gTE9DQUxfU0VUVElOR1MuU1VCU0NSSVBUSU9OUy51c2VySWQ7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LnByb2ZpbGVJZCA9IF9XRkluc3RhbmNlLnByb2ZpbGU7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmNoYW5uZWxzLnB1c2goXCJkYXRhUmVnaXN0cnlcIik7XG4gICAgICAgICAgICAgICAgdmFyIHV1aWRQdWJsaXNoQXBwbGljYXRpb24gPSBKU09OLnhwYXRoKFwiL3N1YnByb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgdXVpZCArIFwiJ10vaW5kaWNhdG9yc1tpZCBlcSAnUHVibGlzaEFwcGxpY2F0aW9uJ10vaW5zdGFuY2VzWzFdL3V1aWRcIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcblxuICAgICAgICAgICAgICAgIHZhciB1dWlkQXBwbGljYXRpb25EZWZpbml0aW9uID0gSlNPTi54cGF0aChcIi9pbmRpY2F0b3JzW2NhdGVnb3J5L3Rlcm0gZXEgJ0FwcGxpY2F0aW9uRGVmaW5pdGlvbiddL19pZFwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xuICAgICAgICAgICAgICAgIHZhciB1dWlkUm9sZXMgPSBKU09OLnhwYXRoKFwiL2luZGljYXRvcnNbY2F0ZWdvcnkvdGVybSBlcSAnUm9sZXMnXS9faWRcIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcbiAgICAgICAgICAgICAgICB2YXIgdXVpZEFwcGxpY2F0aW9uID0gSlNPTi54cGF0aChcIi9pbmRpY2F0b3JzW2NhdGVnb3J5L3Rlcm0gZXEgJ0FwcGxpY2F0aW9uJ10vX2lkXCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XG4gICAgICAgICAgICAgICAgdmFyIHV1aWRBcHBQZXJtaXNzaW9ucyA9IEpTT04ueHBhdGgoXCIvaW5kaWNhdG9yc1tjYXRlZ29yeS90ZXJtIGVxICdBcHBQZXJtaXNzaW9ucyddL19pZFwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xuXG4gICAgICAgICAgICAgICAgdmFyIGFjdGlvbiA9IHtcbiAgICAgICAgICAgICAgICAgICAgXCJidWlsZEFwcGxpY2F0aW9uXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYXBwbGljYXRpb25JZFwiOiBfV0ZJbnN0YW5jZS5wcm9maWxlLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJpbmRpY2F0b3JVVUlEXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlB1Ymxpc2hBcHBsaWNhdGlvblwiOiB1dWlkUHVibGlzaEFwcGxpY2F0aW9uLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQXBwbGljYXRpb25EZWZpbml0aW9uXCI6IHV1aWRBcHBsaWNhdGlvbkRlZmluaXRpb24sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJSb2xlc1wiOiB1dWlkUm9sZXMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJBcHBsaWNhdGlvblwiOiB1dWlkQXBwbGljYXRpb24sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJBcHBQZXJtaXNzaW9uc1wiOiB1dWlkQXBwUGVybWlzc2lvbnNcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmFjdGlvbiA9IGFjdGlvbjtcbiAgICAgICAgICAgICAgICB3b3JrZXIuc2VuZCh3b3JrZXJPYmplY3QpLnRoZW4oZnVuY3Rpb24gKHdvcmtlclN1Y2Nlc3MpIHtcblxuICAgICAgICAgICAgICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnV29ya2VyIHByb2Nlc3NlcyBzdWNjZXNzZnVsbHkuJywgd29ya2VyU3VjY2Vzcyk7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoc3VjY2Vzcyk7XG5cbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAod29ya2VyRmFpbCkge1xuICAgICAgICAgICAgICAgICAgICByZWplY3Qod29ya2VyRmFpbCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9LFxuXG4gICAgICAgIGFwcGxpY2F0aW9uQWRvcHRpb246IGZ1bmN0aW9uIChfZGVmLCB1dWlkLCBfV0ZJbnN0YW5jZSkge1xuXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuXG4gICAgICAgICAgICAgICAgdmFyIHdvcmtlck9iamVjdCA9IHdvcmtlci5nZXRXb3JrZXJXcmFwcGVyKCk7XG5cbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuX2lkID0gZ2VuZXJhdGVVVUlEKCk7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmNvbW11bml0eUlkID0gYXBwLlNDT1BFLmdldENvbW11bml0eUlkKCk7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmFwcGxpY2F0aW9uSWQgPSBhcHAuU0NPUEUuYXBwbGljYXRpb25JZDtcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuY3JlYXRlZERhdGVUaW1lID0gbmV3IERhdGUoKS50b1N0cmluZygpO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5zZW5kZXJVc2VySWQgPSBMT0NBTF9TRVRUSU5HUy5TVUJTQ1JJUFRJT05TLnVzZXJJZDtcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QucHJvZmlsZUlkID0gX1dGSW5zdGFuY2UucHJvZmlsZTtcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuY2hhbm5lbHMucHVzaChcImRhdGFSZWdpc3RyeVwiKTtcbiAgICAgICAgICAgICAgICB2YXIgdXVpZEFkb3B0aW9uID0gSlNPTi54cGF0aChcIi9zdWJwcm9jZXNzZXNbX2lkIGVxICdcIiArIHV1aWQgKyBcIiddL2luZGljYXRvcnNbaWQgZXEgJ0Fkb3B0aW9uJ10vaW5zdGFuY2VzWzFdL3V1aWRcIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcblxuICAgICAgICAgICAgICAgIHZhciB1dWlkUHVibGlzaEFwcGxpY2F0aW9uID0gSlNPTi54cGF0aChcIi9pbmRpY2F0b3JzW2NhdGVnb3J5L3Rlcm0gZXEgJ1B1Ymxpc2hBcHBsaWNhdGlvbiddL19pZFwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xuICAgICAgICAgICAgICAgIHZhciB1dWlkQXBwbGljYXRpb24gPSBKU09OLnhwYXRoKFwiL2luZGljYXRvcnNbY2F0ZWdvcnkvdGVybSBlcSAnQXBwbGljYXRpb24nXS9faWRcIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcblxuICAgICAgICAgICAgICAgIHZhciBhY3Rpb24gPSB7XG4gICAgICAgICAgICAgICAgICAgIFwiYWRvcHRBcHBsaWNhdGlvblwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcImFwcGxpY2F0aW9uSWRcIjogX1dGSW5zdGFuY2UucHJvZmlsZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiaW5kaWNhdG9yVVVJRFwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJBZG9wdGlvblwiOiB1dWlkQWRvcHRpb24sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJQdWJsaXNoQXBwbGljYXRpb25cIjogdXVpZFB1Ymxpc2hBcHBsaWNhdGlvbixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkFwcGxpY2F0aW9uXCI6IHV1aWRBcHBsaWNhdGlvblxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuYWN0aW9uID0gYWN0aW9uO1xuICAgICAgICAgICAgICAgIHdvcmtlci5zZW5kKHdvcmtlck9iamVjdCkudGhlbihmdW5jdGlvbiAod29ya2VyU3VjY2Vzcykge1xuXG4gICAgICAgICAgICAgICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdXb3JrZXIgcHJvY2Vzc2VzIHN1Y2Nlc3NmdWxseS4nLCB3b3JrZXJTdWNjZXNzKTtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcblxuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uICh3b3JrZXJGYWlsKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdCh3b3JrZXJGYWlsKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH0sXG5cbiAgICAgICAgY3JlYXRlVGF4b25vbXk6IGZ1bmN0aW9uIChfZGVmLCB1dWlkLCBfV0ZJbnN0YW5jZSkge1xuXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuXG4gICAgICAgICAgICAgICAgdmFyIHdvcmtlck9iamVjdCA9IHdvcmtlci5nZXRXb3JrZXJXcmFwcGVyKCk7XG5cbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuX2lkID0gZ2VuZXJhdGVVVUlEKCk7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmNvbW11bml0eUlkID0gYXBwLlNDT1BFLmdldENvbW11bml0eUlkKCk7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmFwcGxpY2F0aW9uSWQgPSBhcHAuU0NPUEUuYXBwbGljYXRpb25JZDtcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuY3JlYXRlZERhdGVUaW1lID0gbmV3IERhdGUoKS50b1N0cmluZygpO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5zZW5kZXJVc2VySWQgPSBMT0NBTF9TRVRUSU5HUy5TVUJTQ1JJUFRJT05TLnVzZXJJZDtcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QucHJvZmlsZUlkID0gX1dGSW5zdGFuY2UucHJvZmlsZTtcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuY2hhbm5lbHMucHVzaChcImRhdGFSZWdpc3RyeVwiKTtcbiAgICAgICAgICAgICAgICB2YXIgdGF4b25vbXlVVUlEID0gSlNPTi54cGF0aChcIi9zdWJwcm9jZXNzZXNbX2lkIGVxICdcIiArIHV1aWQgKyBcIiddL2luZGljYXRvcnNbaWQgZXEgJ1RheG9ub215J10vaW5zdGFuY2VzWzFdL3V1aWRcIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcblxuICAgICAgICAgICAgICAgIHZhciBhY3Rpb24gPSB7XG4gICAgICAgICAgICAgICAgICAgIFwiY3JlYXRlVGF4b25vbXlcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJ0YXhvbm9teVVVSURcIjogdGF4b25vbXlVVUlEXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuYWN0aW9uID0gYWN0aW9uO1xuICAgICAgICAgICAgICAgIHdvcmtlci5zZW5kKHdvcmtlck9iamVjdCkudGhlbihmdW5jdGlvbiAod29ya2VyU3VjY2Vzcykge1xuXG4gICAgICAgICAgICAgICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdXb3JrZXIgcHJvY2Vzc2VzIHN1Y2Nlc3NmdWxseS4nLCB3b3JrZXJTdWNjZXNzKTtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcblxuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uICh3b3JrZXJGYWlsKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdCh3b3JrZXJGYWlsKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH1cblxuICAgIH1cblxufSkoKTtcblxuXG5cbnZhciBwZXJmb3JtYW5jZSA9IChmdW5jdGlvbiAoKSB7XG5cbiAgICByZXR1cm4ge1xuXG4gICAgICAgIGNyZWF0ZTogZnVuY3Rpb24gKF9kZWYsIHV1aWQsIF9XRkluc3RhbmNlKSB7XG5cbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG5cbiAgICAgICAgICAgICAgICB2YXIgd29ya2VyT2JqZWN0ID0gd29ya2VyLmdldFdvcmtlcldyYXBwZXIoKTtcblxuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5faWQgPSBnZW5lcmF0ZVVVSUQoKTtcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuY29tbXVuaXR5SWQgPSBhcHAuU0NPUEUuZ2V0Q29tbXVuaXR5SWQoKTtcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuYXBwbGljYXRpb25JZCA9IGFwcC5TQ09QRS5hcHBsaWNhdGlvbklkO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5jcmVhdGVkRGF0ZVRpbWUgPSBuZXcgRGF0ZSgpLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LnNlbmRlclVzZXJJZCA9IExPQ0FMX1NFVFRJTkdTLlNVQlNDUklQVElPTlMudXNlcklkO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5wcm9maWxlSWQgPSBfV0ZJbnN0YW5jZS5wcm9maWxlO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5jaGFubmVscy5wdXNoKFwiY3JlYXRlUGxhblwiKTtcbiAgICAgICAgICAgICAgICB2YXIgdXVpZENvbW11bml0eSA9IEpTT04ueHBhdGgoXCIvaW5kaWNhdG9yc1tjYXRlZ29yeS90ZXJtIGVxICdwbGFuJ10vX2lkXCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XG4gICAgICAgICAgICAgICAgdmFyIGFjdGlvbiA9IHtcbiAgICAgICAgICAgICAgICAgICAgXCJjcmVhdGVQbGFuXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwicGxhblVVSURcIjogdXVpZENvbW11bml0eVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmFjdGlvbiA9IGFjdGlvbjtcbiAgICAgICAgICAgICAgICB3b3JrZXIuc2VuZCh3b3JrZXJPYmplY3QpLnRoZW4oZnVuY3Rpb24gKHdvcmtlclN1Y2Nlc3MpIHtcblxuICAgICAgICAgICAgICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnV29ya2VyIHByb2Nlc3NlZCBzdWNjZXNzZnVsbHkuJywgd29ya2VyU3VjY2Vzcyk7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoc3VjY2Vzcyk7XG5cbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAod29ya2VyRmFpbCkge1xuICAgICAgICAgICAgICAgICAgICByZWplY3Qod29ya2VyRmFpbCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcblxuICAgICAgICBjb25maWd1cmVOb2RlOiBmdW5jdGlvbiAoX2RlZiwgdXVpZCwgX1dGSW5zdGFuY2UpIHtcblxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcblxuICAgICAgICAgICAgICAgIHZhciB3b3JrZXJPYmplY3QgPSB3b3JrZXIuZ2V0V29ya2VyV3JhcHBlcigpO1xuXG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0Ll9pZCA9IGdlbmVyYXRlVVVJRCgpO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5jb21tdW5pdHlJZCA9IGFwcC5TQ09QRS5nZXRDb21tdW5pdHlJZCgpO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5hcHBsaWNhdGlvbklkID0gYXBwLlNDT1BFLmFwcGxpY2F0aW9uSWQ7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmNyZWF0ZWREYXRlVGltZSA9IG5ldyBEYXRlKCkudG9TdHJpbmcoKTtcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3Quc2VuZGVyVXNlcklkID0gTE9DQUxfU0VUVElOR1MuU1VCU0NSSVBUSU9OUy51c2VySWQ7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LnByb2ZpbGVJZCA9IF9XRkluc3RhbmNlLnByb2ZpbGU7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmNoYW5uZWxzLnB1c2goXCJjb25maWd1cmVOb2RlXCIpO1xuICAgICAgICAgICAgICAgIHZhciB1dWlkTm9kZUluU3ViUHJvY2VzcyA9IEpTT04ueHBhdGgoXCIvc3VicHJvY2Vzc2VzW19pZCBlcSAnXCIgKyB1dWlkICsgXCInXS9pbmRpY2F0b3JzW2lkIGVxICdub2RlJ10vaW5zdGFuY2VzWzFdL3V1aWRcIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcblxuICAgICAgICAgICAgICAgIHZhciBhY3Rpb24gPSB7XG4gICAgICAgICAgICAgICAgICAgIFwiY29uZmlndXJlTm9kZVwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcIm5vZGVVVUlEXCI6IHV1aWROb2RlSW5TdWJQcm9jZXNzXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuYWN0aW9uID0gYWN0aW9uO1xuICAgICAgICAgICAgICAgIHdvcmtlci5zZW5kKHdvcmtlck9iamVjdCkudGhlbihmdW5jdGlvbiAod29ya2VyU3VjY2Vzcykge1xuXG4gICAgICAgICAgICAgICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdXb3JrZXIgcHJvY2Vzc2VkIHN1Y2Nlc3NmdWxseS4nLCB3b3JrZXJTdWNjZXNzKTtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcblxuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uICh3b3JrZXJGYWlsKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdCh3b3JrZXJGYWlsKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICB1bmxvY2tQZXJpb2Q6IGZ1bmN0aW9uIChfZGVmLCB1dWlkLCBfV0ZJbnN0YW5jZSkge1xuXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuXG4gICAgICAgICAgICAgICAgdmFyIHN1YnByb2Nlc3NPYmplY3QgPSBKU09OLnhwYXRoKFwiL3N1YnByb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgdXVpZCArIFwiJ11cIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcblxuICAgICAgICAgICAgICAgIC8vIG1lc3NhZ2UgZnJvbSBzdGVwIDogVE9ETyBcblxuICAgICAgICAgICAgICAgIHZhciBlbnRyeVVVSUQgPSBKU09OLnhwYXRoKFwiL2luZGljYXRvcnNbaWQgZXEgJ1wiICsgUEVSSU9EX1NFVF9JRCArIFwiJ10vaW5zdGFuY2VzL3V1aWRcIiwgc3VicHJvY2Vzc09iamVjdCwge30pWzBdO1xuICAgICAgICAgICAgICAgIHZhciBlbmRkYXRlID0gc3VicHJvY2Vzc09iamVjdC5kYXRlcy52YWxpZDtcblxuICAgICAgICAgICAgICAgIGxpYnJhcnkudW5sb2NrUGVyaW9kKGVudHJ5VVVJRCwgZW5kZGF0ZSwgdXVpZCkudGhlbihmdW5jdGlvbiAoZGF0YSkge1xuXG4gICAgICAgICAgICAgICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdVbmxvY2sgcGVyaW9kLicsIGRhdGEpO1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xuXG5cblxuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICAgICAgICAgIH0pO1xuXG5cblxuXG5cblxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgc2V0TW9kZWxTdGF0dXM6IGZ1bmN0aW9uIChfZGVmLCB1dWlkLCBfV0ZJbnN0YW5jZSkge1xuXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuXG5cbiAgICAgICAgICAgICAgICB2YXIgc3VicHJvY2Vzc09iamVjdCA9IEpTT04ueHBhdGgoXCIvc3VicHJvY2Vzc2VzW19pZCBlcSAnXCIgKyB1dWlkICsgXCInXVwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xuICAgICAgICAgICAgICAgIHZhciBlbnRyeVVVSUQgPSBKU09OLnhwYXRoKFwiL2luZGljYXRvcnNbaWQgZXEgJ1wiICsgUEVSSU9EX1NFVF9JRCArIFwiJ10vaW5zdGFuY2VzL3V1aWRcIiwgc3VicHJvY2Vzc09iamVjdCwge30pWzBdO1xuICAgICAgICAgICAgICAgIHZhciBlbmRkYXRlID0gc3VicHJvY2Vzc09iamVjdC5kYXRlcy52YWxpZDtcblxuICAgICAgICAgICAgICAgIHZhciBzdGF0dXNpMThuTGFiZWwgPSBKU09OLnhwYXRoKFwiL2xhYmVsXCIsIF9kZWYgLCB7fSlbMF07XG4gICAgICAgICAgICAgICAgdmFyIHN0YXR1cyA9IGhlbHBlci5nZXRMYW5ndWFnZU1lc3NhZ2Uoc3RhdHVzaTE4bkxhYmVsKTtcblxuXG4gICAgICAgICAgICAgICAgbGlicmFyeS5zZXRQZXJpb2RTdGF0dXMoZW50cnlVVUlELCBlbmRkYXRlLCBzdGF0dXMsIHV1aWQpLnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcblxuICAgICAgICAgICAgICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2Vzcygnc2V0TW9kZWxTdGF0dXMnLCBkYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcblxuXG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgICAgICAgfSk7XG5cblxuXG5cblxuXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcblxuICAgICAgIFxuICAgICAgICBsb2NrUGVyZm9ybWFuY2VNb2RlbDogZnVuY3Rpb24gKF9kZWYsIHV1aWQsIF9XRkluc3RhbmNlKSB7XG5cbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG5cbiAgICAgICAgICAgICAgICB2YXIgc3VicHJvY2Vzc09iamVjdCA9IEpTT04ueHBhdGgoXCIvc3VicHJvY2Vzc2VzW19pZCBlcSAnXCIgKyB1dWlkICsgXCInXVwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xuXG4gICAgICAgICAgICAgICAgdmFyIGVudHJ5VVVJRCA9IEpTT04ueHBhdGgoXCIvaW5kaWNhdG9yc1tpZCBlcSAnXCIgKyBQRVJGT1JNQU5DRV9TRVRfSUQgKyBcIiddL2luc3RhbmNlcy91dWlkXCIsIHN1YnByb2Nlc3NPYmplY3QsIHt9KVswXTtcbiAgICAgICAgICAgICAgICB2YXIgZW5kZGF0ZSA9IHN1YnByb2Nlc3NPYmplY3QuZGF0ZXMudmFsaWQ7XG5cbiAgICAgICAgICAgICAgICBsaWJyYXJ5LmxvY2tQZXJmb3JtYW5jZU1vZGVsKGVudHJ5VVVJRCwgZW5kZGF0ZSwgdXVpZCkudGhlbihmdW5jdGlvbiAoZGF0YSkge1xuXG4gICAgICAgICAgICAgICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdMb2NrIHBlcmZvcm1hbmNlIG1vZGVsLicsIGRhdGEpO1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xuXG5cbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgICAgICB9KTtcblxuXG5cblxuXG5cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICB9XG5cbn0pKCk7XG5cbnZhciBzZG8gPSAoZnVuY3Rpb24gKCkge1xuXG4gICAgcmV0dXJuIHtcblxuICAgICAgICBjcmVhdGU6IGZ1bmN0aW9uIChfZGVmLCB1dWlkLCBfV0ZJbnN0YW5jZSkge1xuXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuXG4gICAgICAgICAgICAgICAgdmFyIHdvcmtlck9iamVjdCA9IHdvcmtlci5nZXRXb3JrZXJXcmFwcGVyKCk7XG5cbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuX2lkID0gZ2VuZXJhdGVVVUlEKCk7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmNvbW11bml0eUlkID0gYXBwLlNDT1BFLmdldENvbW11bml0eUlkKCk7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmFwcGxpY2F0aW9uSWQgPSBhcHAuU0NPUEUuYXBwbGljYXRpb25JZDtcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuY3JlYXRlZERhdGVUaW1lID0gbmV3IERhdGUoKS50b1N0cmluZygpO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5zZW5kZXJVc2VySWQgPSBMT0NBTF9TRVRUSU5HUy5TVUJTQ1JJUFRJT05TLnVzZXJJZDtcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QucHJvZmlsZUlkID0gX1dGSW5zdGFuY2UucHJvZmlsZTtcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuY2hhbm5lbHMucHVzaChcImRhdGFSZWdpc3RyeVwiKTtcbiAgICAgICAgICAgICAgICB2YXIgc2RvVVVJRCA9IEpTT04ueHBhdGgoXCIvc3VicHJvY2Vzc2VzW19pZCBlcSAnXCIgKyB1dWlkICsgXCInXS9pbmRpY2F0b3JzW2lkIGVxICdTRE8nXS9pbnN0YW5jZXNbMV0vdXVpZFwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xuXG4gICAgICAgICAgICAgICAgdmFyIGFjdGlvbiA9IHtcbiAgICAgICAgICAgICAgICAgICAgXCJjcmVhdGVTRE9cIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJzZG9VVUlEXCI6IHNkb1VVSURcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5hY3Rpb24gPSBhY3Rpb247XG4gICAgICAgICAgICAgICAgd29ya2VyLnNlbmQod29ya2VyT2JqZWN0KS50aGVuKGZ1bmN0aW9uICh3b3JrZXJTdWNjZXNzKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ1dvcmtlciBwcm9jZXNzZXMgc3VjY2Vzc2Z1bGx5LicsIHdvcmtlclN1Y2Nlc3MpO1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xuXG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKHdvcmtlckZhaWwpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KHdvcmtlckZhaWwpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfVxuXG4gICAgfVxuXG59KSgpO1xuXG52YXIgdGF4b25vbXkgPSAoZnVuY3Rpb24gKCkge1xuXG4gICAgcmV0dXJuIHtcblxuICAgICAgICBjcmVhdGU6IGZ1bmN0aW9uIChfZGVmLCB1dWlkLCBfV0ZJbnN0YW5jZSkge1xuXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuXG4gICAgICAgICAgICAgICAgdmFyIHdvcmtlck9iamVjdCA9IHdvcmtlci5nZXRXb3JrZXJXcmFwcGVyKCk7XG5cbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuX2lkID0gZ2VuZXJhdGVVVUlEKCk7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmNvbW11bml0eUlkID0gYXBwLlNDT1BFLmdldENvbW11bml0eUlkKCk7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmFwcGxpY2F0aW9uSWQgPSBhcHAuU0NPUEUuYXBwbGljYXRpb25JZDtcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuY3JlYXRlZERhdGVUaW1lID0gbmV3IERhdGUoKS50b1N0cmluZygpO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5zZW5kZXJVc2VySWQgPSBMT0NBTF9TRVRUSU5HUy5TVUJTQ1JJUFRJT05TLnVzZXJJZDtcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QucHJvZmlsZUlkID0gX1dGSW5zdGFuY2UucHJvZmlsZTtcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuY2hhbm5lbHMucHVzaChcImRhdGFSZWdpc3RyeVwiKTtcbiAgICAgICAgICAgICAgICB2YXIgdGF4b25vbXlVVUlEID0gSlNPTi54cGF0aChcIi9zdWJwcm9jZXNzZXNbX2lkIGVxICdcIiArIHV1aWQgKyBcIiddL2luZGljYXRvcnNbaWQgZXEgJ1RheG9ub215J10vaW5zdGFuY2VzWzFdL3V1aWRcIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcblxuICAgICAgICAgICAgICAgIHZhciBhY3Rpb24gPSB7XG4gICAgICAgICAgICAgICAgICAgIFwiY3JlYXRlVGF4b25vbXlcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJ0YXhvbm9teVVVSURcIjogdGF4b25vbXlVVUlEXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuYWN0aW9uID0gYWN0aW9uO1xuICAgICAgICAgICAgICAgIHdvcmtlci5zZW5kKHdvcmtlck9iamVjdCkudGhlbihmdW5jdGlvbiAod29ya2VyU3VjY2Vzcykge1xuXG4gICAgICAgICAgICAgICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdXb3JrZXIgcHJvY2Vzc2VzIHN1Y2Nlc3NmdWxseS4nLCB3b3JrZXJTdWNjZXNzKTtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcblxuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uICh3b3JrZXJGYWlsKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdCh3b3JrZXJGYWlsKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH1cblxuICAgIH1cblxufSkoKTtcblxudmFyIHN1YlByb2Nlc3NJbnN0YW5jZSA9IChmdW5jdGlvbiAoKSB7XG5cbiAgICByZXR1cm4ge1xuXG4gICAgICAgIHNldFRpdGxlOiBmdW5jdGlvbiAoX2RlZiwgdXVpZCwgZGF0YVZhbHVlLCBfV0ZJbnN0YW5jZSkge1xuXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuXG4gICAgICAgICAgICAgICAgdmFyIHNwUHJvY2Vzc09iamVjdCA9IEpTT04ueHBhdGgoXCIvc3VicHJvY2Vzc2VzW19pZCBlcSAnXCIgKyB1dWlkICsgXCInXVwiLCBhcHAuU0NPUEUud29ya2Zsb3csIHt9KVswXTtcbiAgICAgICAgICAgICAgICBzcFByb2Nlc3NPYmplY3QubGFiZWwgPSBkYXRhVmFsdWU7XG5cbiAgICAgICAgICAgICAgICB2YXIgaXRlbXNUb1Byb2Nlc3MgPSAxO1xuICAgICAgICAgICAgICAgIHZhciBzdHVmZiA9IFtdO1xuICAgICAgICAgICAgICAgIHZhciBvYmogPSB7fTtcblxuICAgICAgICAgICAgICAgIG9iai5tb2RlbCA9IF9XRkluc3RhbmNlLnN1YnByb2Nlc3NlcztcbiAgICAgICAgICAgICAgICBzdHVmZi5wdXNoKG9iaik7XG4gICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ1N1YnByb2Nlc3Mgc2V0VGl0bGUgc3VjY2Vzcy4nLCBfV0ZJbnN0YW5jZS5zdWJwcm9jZXNzZXMpO1xuICAgICAgICAgICAgICAgIHJlc29sdmUoc3VjY2Vzcyk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9LFxuXG4gICAgICAgIHNldFZhbGlkRGF0ZTogZnVuY3Rpb24gKF9kZWYsIHV1aWQsIGRhdGFWYWx1ZSwgX1dGSW5zdGFuY2UpIHtcblxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcblxuICAgICAgICAgICAgICAgIHZhciBzcFByb2Nlc3NPYmplY3QgPSBKU09OLnhwYXRoKFwiL3N1YnByb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgdXVpZCArIFwiJ11cIiwgYXBwLlNDT1BFLndvcmtmbG93LCB7fSlbMF07XG4gICAgICAgICAgICAgICAgc3BQcm9jZXNzT2JqZWN0LmRhdGVzLnZhbGlkID0gZGF0YVZhbHVlO1xuXG4gICAgICAgICAgICAgICAgdmFyIGl0ZW1zVG9Qcm9jZXNzID0gMTtcbiAgICAgICAgICAgICAgICB2YXIgc3R1ZmYgPSBbXTtcbiAgICAgICAgICAgICAgICB2YXIgb2JqID0ge307XG5cbiAgICAgICAgICAgICAgICBvYmoubW9kZWwgPSBzcFByb2Nlc3NPYmplY3Q7XG4gICAgICAgICAgICAgICAgc3R1ZmYucHVzaChvYmopO1xuXG4gICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ3ZhbGlkIGRhdGUgc2V0LicsIF9XRkluc3RhbmNlLnN1YnByb2Nlc3Nlcyk7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH1cblxuICAgIH1cblxufSkoKTtcblxudmFyIHZhcmlhYmxlcyA9IChmdW5jdGlvbiAoKSB7XG5cbiAgICByZXR1cm4ge1xuXG4gICAgICAgIHNldFZhcmlhYmxlOiBmdW5jdGlvbiAoc2V0VmFyaWFibGUsIF9XRkluc3RhbmNlLCB1dWlkKSB7XG5cbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG5cbiAgICAgICAgICAgICAgICBoZWxwZXIuZ2V0Tm9kZVZhbHVlKHNldFZhcmlhYmxlLmRhdGEsIF9XRkluc3RhbmNlLCB1dWlkKS50aGVuKGZ1bmN0aW9uIChkYXRhVmFsdWUpIHtcblxuXG4gICAgICAgICAgICAgICAgICAgIHZhciBzY29wZSA9IHNldFZhcmlhYmxlLnNjb3BlO1xuICAgICAgICAgICAgICAgICAgICB2YXIgdmFyaWFibGVOYW1lID0gc2V0VmFyaWFibGUubmFtZTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHZhcmlhYmxlVHlwZSA9IHNldFZhcmlhYmxlLnZhcmlhYmxlVHlwZTtcblxuICAgICAgICAgICAgICAgICAgICB2YXIgdmFsaWREYXRlID0gSlNPTi54cGF0aChcIi9zdWJwcm9jZXNzZXNbX2lkIGVxICdcIiArIHV1aWQgKyBcIiddL2RhdGVzL3ZhbGlkXCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XG5cbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChzY29wZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAncHJvZmlsZSc6XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcHJvZmlsZUlkID0gX1dGSW5zdGFuY2UucHJvZmlsZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcHJvZmlsZVZhcmlhYmxlRmlsZU5hbWUgPSBwcm9maWxlSWQgKyAnOnZhcmlhYmxlcyc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGFvLmdldChwcm9maWxlVmFyaWFibGVGaWxlTmFtZSkudGhlbihmdW5jdGlvbiAoZmlsZSkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2YXJpYWJsZVR5cGUgPT0gJ3BlcmlvZGljJykge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiBPdmVyd3JpdGUgdGhlIGV4aXN0aW5nIHZhcmlhYmxlIGluIGNhc2Ugd2hlcmUgc2FtZSB2YXJpYWJsZSBpcyBhc3NpZ25lZCBhdCBtdWx0aXBsZSBzdGVwcy5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHByb2Nlc3NPYmogPSBKU09OLnhwYXRoKFwiL2luc3RhbmNlL3Byb2Nlc3Nlc1tzdWJQcm9jZXNzZXMvdXVpZCBlcSAnXCIgKyB1dWlkICsgXCInXVwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNlcSA9IHByb2Nlc3NPYmouc2VxO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG9iaiA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInN1YlByb2Nlc3NVVUlEXCI6IHV1aWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ1c2VyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ1c2VyTmFtZVwiOiBMT0NBTF9TRVRUSU5HUy5TVUJTQ1JJUFRJT05TLnVzZXJuYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInVzZXJJZFwiOiBMT0NBTF9TRVRUSU5HUy5TVUJTQ1JJUFRJT05TLnVzZXJQcm9maWxlSWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic2VxXCI6IHNlcSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInZhbGlkRGF0ZVwiOiB2YWxpZERhdGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBkYXRhVmFsdWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoZmlsZVt2YXJpYWJsZU5hbWVdICE9IHVuZGVmaW5lZCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXZhbCgnZmlsZS4nICsgdmFyaWFibGVOYW1lICsgJy5wdXNoKG9iaiknKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsZVt2YXJpYWJsZU5hbWVdID0gW29ial07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9ICAgXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbGVbdmFyaWFibGVOYW1lXSA9IGRhdGFWYWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhby51cHNlcnQoZmlsZSkudGhlbihmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShcIlZhcmlhYmxlIHNldCBzdWNjZXNzZnVsbHlcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KFwiRmFpbGVkIHRvIHNldCBWYXJpYWJsZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZmlsZSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiX2lkXCI6IHByb2ZpbGVWYXJpYWJsZUZpbGVOYW1lXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsZS5jaGFubmVscyA9IGFwcC5wcm9maWxlLmNoYW5uZWxzO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2YXJpYWJsZVR5cGUgPT0gJ3BlcmlvZGljJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHByb2Nlc3NPYmogPSBKU09OLnhwYXRoKFwiL2luc3RhbmNlL3Byb2Nlc3Nlc1tzdWJQcm9jZXNzZXMvdXVpZCBlcSAnXCIgKyB1dWlkICsgXCInXVwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNlcSA9IHByb2Nlc3NPYmouc2VxO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsZVt2YXJpYWJsZU5hbWVdID0gW3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInN1YlByb2Nlc3NVVUlEXCI6IHV1aWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ1c2VyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ1c2VyTmFtZVwiOiBMT0NBTF9TRVRUSU5HUy5TVUJTQ1JJUFRJT05TLnVzZXJuYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInVzZXJJZFwiOiBMT0NBTF9TRVRUSU5HUy5TVUJTQ1JJUFRJT05TLnVzZXJQcm9maWxlSWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic2VxXCI6IHNlcSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInZhbGlkRGF0ZVwiOiB2YWxpZERhdGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBkYXRhVmFsdWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1dO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsZVt2YXJpYWJsZU5hbWVdID0gZGF0YVZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGFvLnVwc2VydChmaWxlKS50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKFwiVmFyaWFibGUgc2V0IHN1Y2Nlc3NmdWxseVwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoXCJGYWlsZWQgdG8gc2V0IFZhcmlhYmxlXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnc3ViUHJvY2Vzc0luc3RhbmNlJzpcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoXCJub3QgaW1wbGVtZW50ZWRcIik7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ3N0ZXAnOlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShcIm5vdCBpbXBsZW1lbnRlZFwiKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnc3ViUHJvZmlsZVN1YlByb2Nlc3NJbnN0YW5jZSc6XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3ViUHJvZmlsZUlkID0gYXBwLnByb2ZpbGUuc3VicHJvZmlsZUlkO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzdWJQcm9maWxlVmFyaWFibGVGaWxlTmFtZSA9IHN1YlByb2ZpbGVJZCArICc6dmFyaWFibGVzJztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYW8uZ2V0KHN1YlByb2ZpbGVWYXJpYWJsZUZpbGVOYW1lKS50aGVuKGZ1bmN0aW9uIChmaWxlKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZhcmlhYmxlVHlwZSA9PSAncGVyaW9kaWMnKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwYXJ0ID0gbGlicmFyeS5nZXRTdWJwcm9maWxlU3VicHJvY2Vzc0lkcygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNlcSA9IEpTT04ueHBhdGgoXCJjb3VudCgvc3VicHJvY2Vzc2VzW19pZCBlcSAnXCIgKyB1dWlkICsgXCInXS9wcmVjZWRpbmctc2libGluZzo6bm9kZSgpW2lkID0gL3N1YnByb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgdXVpZCArIFwiJ10vaWQgYW5kIF9pZCA9IC9zdWJwcm9jZXNzZXNbX2lkID0gXCIrcGFydCtcIl0vX2lkXSlcIiwgX1dGSW5zdGFuY2UsIHt9KVswXSArIDE7ICAgICAgICAgICAgICAgICAgIFxuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBvYmogPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzdWJQcm9jZXNzVVVJRFwiOiB1dWlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidXNlclwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidXNlck5hbWVcIjogTE9DQUxfU0VUVElOR1MuU1VCU0NSSVBUSU9OUy51c2VybmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ1c2VySWRcIjogTE9DQUxfU0VUVElOR1MuU1VCU0NSSVBUSU9OUy51c2VyUHJvZmlsZUlkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNlcVwiOiBzZXEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2YWxpZERhdGVcIjogdmFsaWREYXRlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogZGF0YVZhbHVlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGZpbGVbdmFyaWFibGVOYW1lXSAhPSB1bmRlZmluZWQpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2YWwoJ2ZpbGUuJyArIHZhcmlhYmxlTmFtZSArICcucHVzaChvYmopJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbGVbdmFyaWFibGVOYW1lXSA9IFtvYmpdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSAgIFxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWxlW3ZhcmlhYmxlTmFtZV0gPSBkYXRhVmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYW8udXBzZXJ0KGZpbGUpLnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoXCJWYXJpYWJsZSBhdCBzdWJwcm9maWxlIHNldCBzdWNjZXNzZnVsbHlcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KFwiRmFpbGVkIHRvIHNldCBWYXJpYWJsZSBhdCBzdWJwcm9maWxlXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmaWxlID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJfaWRcIjogc3ViUHJvZmlsZVZhcmlhYmxlRmlsZU5hbWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWxlLmNoYW5uZWxzID0gYXBwLnByb2ZpbGUuY2hhbm5lbHM7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZhcmlhYmxlVHlwZSA9PSAncGVyaW9kaWMnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3ZhciBwcm9jZXNzT2JqID0gSlNPTi54cGF0aChcIi9pbnN0YW5jZS9wcm9jZXNzZXNbc3ViUHJvY2Vzc2VzL3V1aWQgZXEgJ1wiICsgdXVpZCArIFwiJ11cIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdmFyIHNlcSA9IHByb2Nlc3NPYmouc2VxO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3ZhciBzZXEgPSBKU09OLnhwYXRoKFwiY291bnQoL3N1YnByb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgdXVpZCArIFwiJ10vcHJlY2VkaW5nLXNpYmxpbmc6Om5vZGUoKVtpZCA9IC9zdWJwcm9jZXNzZXNbX2lkIGVxICdcIiArIHV1aWQgKyBcIiddL2lkIGFuZCBpZCA9IC9zdWJwcm9jZXNzZXNbX2lkID0gL2luc3RhbmNlL3Byb2Nlc3Nlcy9zdWJQcm9jZXNzZXNbc3VicHJvZmlsZUlkIGVxICdcIiArIHN1YlByb2ZpbGVJZCArIFwiJ10vdXVpZF0vX2lkXSlcIiwgX1dGSW5zdGFuY2UsIHt9KVswXSArIDE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcGFydCA9IGxpYnJhcnkuZ2V0U3VicHJvZmlsZVN1YnByb2Nlc3NJZHMoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzZXEgPSBKU09OLnhwYXRoKFwiY291bnQoL3N1YnByb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgdXVpZCArIFwiJ10vcHJlY2VkaW5nLXNpYmxpbmc6Om5vZGUoKVtpZCA9IC9zdWJwcm9jZXNzZXNbX2lkIGVxICdcIiArIHV1aWQgKyBcIiddL2lkIGFuZCBfaWQgPSAvc3VicHJvY2Vzc2VzW19pZCA9IFwiK3BhcnQrXCJdL19pZF0pXCIsIF9XRkluc3RhbmNlLCB7fSlbMF0gKyAxOyAgICAgICAgICAgICAgICAgICBcblxuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbGVbdmFyaWFibGVOYW1lXSA9IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzdWJQcm9jZXNzVVVJRFwiOiB1dWlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidXNlclwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidXNlck5hbWVcIjogTE9DQUxfU0VUVElOR1MuU1VCU0NSSVBUSU9OUy51c2VybmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ1c2VySWRcIjogTE9DQUxfU0VUVElOR1MuU1VCU0NSSVBUSU9OUy51c2VyUHJvZmlsZUlkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNlcVwiOiBzZXEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2YWxpZERhdGVcIjogdmFsaWREYXRlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogZGF0YVZhbHVlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbGVbdmFyaWFibGVOYW1lXSA9IGRhdGFWYWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhby51cHNlcnQoZmlsZSkudGhlbihmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShcIlZhcmlhYmxlIGF0IHN1YnByb2ZpbGUgc2V0IHN1Y2Nlc3NmdWxseVwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoXCJGYWlsZWQgdG8gc2V0IFZhcmlhYmxlIGF0IHN1YnByb2ZpbGVcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChcImdldE5vZGVWYWx1ZSB2YWx1ZSBub3QgZm91bmQuXCIpO1xuICAgICAgICAgICAgICAgIH0pO1xuXG5cblxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfVxuXG4gICAgfVxuXG59KSgpO1xuXG52YXIgbm90aWZpY2F0aW9uID0gKGZ1bmN0aW9uICgpIHtcblxuICAgIHJldHVybiB7XG5cbiAgICAgICAgc2VuZE5vdGlmaWNhdGlvbldvcmtlcjogZnVuY3Rpb24gKG5vdGlmaWNhdGlvbiwgX1dGSW5zdGFuY2UsIHV1aWQpIHtcblxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcblxuXG4gICAgICAgICAgICAgICAgdmFyIGdldFJlY2lwaWVudHMgPSBmdW5jdGlvbihub3RpZmljYXRpb24pIHtcblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJlY2lwaWVudHMgPSB7fTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKG5vdGlmaWNhdGlvbi5yZWNpcGllbnRzLnJvbGUgIT0gdW5kZWZpbmVkKXtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlY2lwaWVudHMucm9sZSA9IG5vdGlmaWNhdGlvbi5yZWNpcGllbnRzLnJvbGU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZWNpcGllbnRzKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmKG5vdGlmaWNhdGlvbi5yZWNpcGllbnRzLnByb2ZpbGVSb2xlICE9IHVuZGVmaW5lZCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVjaXBpZW50cy5wcm9maWxlUm9sZSA9IHt9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlY2lwaWVudHMucHJvZmlsZVJvbGUucm9sZSA9IG5vdGlmaWNhdGlvbi5yZWNpcGllbnRzLnByb2ZpbGVSb2xlLnJvbGU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVjaXBpZW50cy5wcm9maWxlUm9sZS5wcm9maWxlID0gbm90aWZpY2F0aW9uLnJlY2lwaWVudHMucHJvZmlsZVJvbGUucHJvZmlsZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlY2lwaWVudHMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmKG5vdGlmaWNhdGlvbi5yZWNpcGllbnRzLnN1YlByb2ZpbGVSb2xlICE9IHVuZGVmaW5lZCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVjaXBpZW50cy5zdWJQcm9maWxlUm9sZSA9IHt9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlY2lwaWVudHMuc3ViUHJvZmlsZVJvbGUucm9sZSA9IG5vdGlmaWNhdGlvbi5yZWNpcGllbnRzLnN1YlByb2ZpbGVSb2xlLnJvbGU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVjaXBpZW50cy5zdWJQcm9maWxlUm9sZS5zdWJQcm9maWxlQ2F0ZWdvcnkgPSBub3RpZmljYXRpb24ucmVjaXBpZW50cy5zdWJQcm9maWxlUm9sZS5zdWJQcm9maWxlQ2F0ZWdvcnk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVjaXBpZW50cy5zdWJQcm9maWxlUm9sZS5wcm9maWxlID0gbm90aWZpY2F0aW9uLnJlY2lwaWVudHMuc3ViUHJvZmlsZVJvbGUucHJvZmlsZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlY2lwaWVudHMpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYobm90aWZpY2F0aW9uLnJlY2lwaWVudHMuZnVuY3Rpb24gIT0gdW5kZWZpbmVkKXtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlY2lwaWVudHMuZnVuY3Rpb24gPSB7fTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWNpcGllbnRzLmZ1bmN0aW9uLnVzZXJzID0ge307XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWxwZXIuZ2V0Tm9kZVZhbHVlKG5vdGlmaWNhdGlvbi5yZWNpcGllbnRzLmZ1bmN0aW9uLnVzZXJzLCBfV0ZJbnN0YW5jZSwgdXVpZCkudGhlbihmdW5jdGlvbiAoZGF0YVZhbHVlKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVjaXBpZW50cy5mdW5jdGlvbi51c2VycyA9ICBkYXRhVmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVjaXBpZW50cyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlaihlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHZhciB3b3JrZXJPYmplY3QgPSB3b3JrZXIuZ2V0V29ya2VyV3JhcHBlcigpO1xuXG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0Ll9pZCA9IGdlbmVyYXRlVVVJRCgpO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5hcHBsaWNhdGlvbklkID0gYXBwLlNDT1BFLmFwcGxpY2F0aW9uSWQ7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmNvbW11bml0eUlkID0gYXBwLlNDT1BFLmdldENvbW11bml0eUlkKCk7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmNyZWF0ZWREYXRlVGltZSA9IG5ldyBEYXRlKCkudG9TdHJpbmcoKTtcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3Quc2VuZGVyVXNlcklkID0gTE9DQUxfU0VUVElOR1MuU1VCU0NSSVBUSU9OUy51c2VySWQ7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LnByb2ZpbGVJZCA9IF9XRkluc3RhbmNlLnByb2ZpbGU7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0Lm1lc3NhZ2VUeXBlID0gXCJub3RpZmljYXRpb25cIjtcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuY2hhbm5lbHMucHVzaChcIm5vdGlmaWNhdGlvblwiKTtcbiAgICAgICAgICAgICAgICB2YXIgc3ViUHJvZmlsZUlkID0gSlNPTi54cGF0aChcIi9zdWJwcm9jZXNzZXNbX2lkIGVxICdcIisgdXVpZCArXCInXS9tZXRhLWRhdGEvc3VicHJvZmlsZUlkXCIsIF9XRkluc3RhbmNlICx7fSlbMF07XG4gICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB2YXIgcGF0aEFycmF5ID0gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lLnNwbGl0KCAnLycgKTtcbiAgICAgICAgICAgICAgICB2YXIgYmFzZVVSTCA9IHdpbmRvdy5sb2NhdGlvbi5wcm90b2NvbCArIFwiLy9cIiArIHdpbmRvdy5sb2NhdGlvbi5ob3N0ICsgXCIvXCIgKyBwYXRoQXJyYXlbMV07XG5cbiAgICAgICAgICAgICAgICB2YXIgYWN0aW9uID0ge1xuICAgICAgICAgICAgICAgICAgICBcIm5vdGlmaWNhdGlvblwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcIm1lc3NhZ2VcIjoge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJtZXNzYWdlVHlwZVwiOlwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcIm1ldGEtZGF0YVwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhcHBsaWNhdGlvbklkXCI6IF9XRkluc3RhbmNlLmFwcCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNvbW11bml0eUlkXCI6IF9XRkluc3RhbmNlLmNvbW11bml0eUlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicHJvZmlsZUlkXCI6IF9XRkluc3RhbmNlLnByb2ZpbGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzdWJQcm9jZXNzVVVJRFwiOiB1dWlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic3ViUHJvZmlsZUlkXCI6IHN1YlByb2ZpbGVJZFxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwibm90aWZpY2F0aW9uVHlwZVwiOlwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcInByaW9yaXR5XCI6XCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwicmVjaXBpZW50c1wiOiB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBcInVybFwiOmJhc2VVUkwsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImtleXNcIjp7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwcm9maWxlXCI6e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIm5hbWVcIjogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJpZFwiOlwiXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY29tbXVuaXR5XCI6e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIm5hbWVcIjpcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImlkXCI6XCJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhcHBsaWNhdGlvblwiOntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJuYW1lXCI6XCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJpZFwiOlwiXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY3VycmVudFVzZXJcIjp7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibmFtZVwiOlwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiaWRcIjpcIlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInN1YlByb2Nlc3NcIjp7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibmFtZVwiOlwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiaWRcIjpcIlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICogXG4gICAgICAgICAgICAgICAgS2V5cyBtZXNzYWdlIFxuICAgICAgICAgICAgICAgICovXG5cbiAgICAgICAgICAgICAgICBhY3Rpb24ubm90aWZpY2F0aW9uLmtleXMucHJvZmlsZS5uYW1lID0gYXBwLnByb2ZpbGUudGl0bGU7XG4gICAgICAgICAgICAgICAgYWN0aW9uLm5vdGlmaWNhdGlvbi5rZXlzLnByb2ZpbGUuaWQgPSBhcHAucHJvZmlsZS5faWQ7XG5cbiAgICAgICAgICAgICAgICBhY3Rpb24ubm90aWZpY2F0aW9uLmtleXMuY29tbXVuaXR5Lm5hbWUgPSBhcHAuZ2V0TmFtZUJ5TGFuZyhMT0NBTF9TRVRUSU5HUy5DT01NVU5JVFlfQ09ORklHLmNvbW11bml0eU5hbWUpO1xuICAgICAgICAgICAgICAgIGFjdGlvbi5ub3RpZmljYXRpb24ua2V5cy5jb21tdW5pdHkuaWQgPSBMT0NBTF9TRVRUSU5HUy5DT01NVU5JVFlfQ09ORklHLmNvbW11bml0eUlkO1xuXG4gICAgICAgICAgICAgICAgdmFyIGFwcGxpY2F0aW9uID0gSlNPTi54cGF0aChcIi9hcHBsaWNhdGlvbnNbYXBwSWQgZXEgJ1wiICsgYXBwLlNDT1BFLmFwcGxpY2F0aW9uSWQgKyBcIiddXCIsIExPQ0FMX1NFVFRJTkdTLkNPTU1VTklUWV9DT05GSUcsIHt9KVswXTtcblxuICAgICAgICAgICAgICAgIGFjdGlvbi5ub3RpZmljYXRpb24ua2V5cy5hcHBsaWNhdGlvbi5uYW1lID0gYXBwLmdldE5hbWVCeUxhbmcoYXBwbGljYXRpb24ubmFtZSk7XG4gICAgICAgICAgICAgICAgYWN0aW9uLm5vdGlmaWNhdGlvbi5rZXlzLmFwcGxpY2F0aW9uLmlkID0gYXBwbGljYXRpb24uYXBwSWQ7XG5cbiAgICAgICAgICAgICAgICBhY3Rpb24ubm90aWZpY2F0aW9uLmtleXMuY3VycmVudFVzZXIubmFtZSA9IExPQ0FMX1NFVFRJTkdTLlNFU1NJT04uZmlyc3ROYW1lICsgXCIgXCIgKyBMT0NBTF9TRVRUSU5HUy5TRVNTSU9OLmxhc3ROYW1lO1xuICAgICAgICAgICAgICAgIGFjdGlvbi5ub3RpZmljYXRpb24ua2V5cy5jdXJyZW50VXNlci5pZCA9IExPQ0FMX1NFVFRJTkdTLlNVQlNDUklQVElPTlMudXNlcklkO1xuXG5cbiAgICAgICAgICAgICAgICBhY3Rpb24ubm90aWZpY2F0aW9uLmtleXMuc3ViUHJvY2Vzcy5uYW1lID0gSlNPTi54cGF0aChcIi9zdWJwcm9jZXNzZXNbX2lkIGVxICdcIisgdXVpZCArXCInXS9sYWJlbFwiLCBfV0ZJbnN0YW5jZSAsIHt9KVswXTtcbiAgICAgICAgICAgICAgICBhY3Rpb24ubm90aWZpY2F0aW9uLmtleXMuc3ViUHJvY2Vzcy5pZCA9IHV1aWQ7XG5cbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAqIFxuICAgICAgICAgICAgICAgIFdvcmtlciBtZXNzYWdlIFxuICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgYWN0aW9uLm5vdGlmaWNhdGlvbi5tZXNzYWdlLmRlZmF1bHQgPSBub3RpZmljYXRpb24ubWVzc2FnZS5kZWZhdWx0O1xuICAgICAgICAgICAgICAgIGFjdGlvbi5ub3RpZmljYXRpb24ubWVzc2FnZS50aXRsZSA9IG5vdGlmaWNhdGlvbi5tZXNzYWdlLnRpdGxlO1xuXG4gICAgICAgICAgICAgICAgaWYobm90aWZpY2F0aW9uLm1lc3NhZ2UucnRmICE9IHVuZGVmaW5lZCl7XG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbi5ub3RpZmljYXRpb24ubWVzc2FnZS5ydGYgPSB7fTtcbiAgICAgICAgICAgICAgICAgICAgaWYobm90aWZpY2F0aW9uLm1lc3NhZ2UucnRmLnRlbXBsYXRlIT0gdW5kZWZpbmVkKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbi5ub3RpZmljYXRpb24ubWVzc2FnZS5ydGYudGVtcGxhdGUgPSBub3RpZmljYXRpb24ubWVzc2FnZS5ydGYudGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAobm90aWZpY2F0aW9uLm1lc3NhZ2UucnRmLm1hcmt1cCE9IHVuZGVmaW5lZCl7XG4gICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb24ubm90aWZpY2F0aW9uLm1lc3NhZ2UucnRmLm1hcmt1cCA9IG5vdGlmaWNhdGlvbi5tZXNzYWdlLnJ0Zi5tYXJrdXA7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgKiBcbiAgICAgICAgICAgICAgICBXb3JrZXIgbWVzc2FnZVR5cGUgXG4gICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICBhY3Rpb24ubm90aWZpY2F0aW9uLm1lc3NhZ2VUeXBlID0gbm90aWZpY2F0aW9uLm1lc3NhZ2VUeXBlO1xuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICogXG4gICAgICAgICAgICAgICAgV29ya2VyIG5vdGlmaWNhdGlvblR5cGUgXG4gICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICBhY3Rpb24ubm90aWZpY2F0aW9uLm5vdGlmaWNhdGlvblR5cGUgPSBub3RpZmljYXRpb24ubm90aWZpY2F0aW9uVHlwZTtcbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAqIFxuICAgICAgICAgICAgICAgIFdvcmtlciBwcmlvcml0eSBcbiAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIGFjdGlvbi5ub3RpZmljYXRpb24ucHJpb3JpdHkgPSBub3RpZmljYXRpb24ucHJpb3JpdHk7XG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgKiBcbiAgICAgICAgICAgICAgICBXb3JrZXIgbm90aWZpY2F0aW9uQWN0aW9uIGlmIGV4aXN0cyBcbiAgICAgICAgICAgICAgICAqL1xuXG4gICAgICAgICAgICAgICAgaWYobm90aWZpY2F0aW9uLm5vdGlmaWNhdGlvbkFjdGlvbiAhPSB1bmRlZmluZWQpe1xuXG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbi5ub3RpZmljYXRpb24ubm90aWZpY2F0aW9uQWN0aW9uID0ge307XG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbi5ub3RpZmljYXRpb24ubm90aWZpY2F0aW9uQWN0aW9uLmxhYmVsID0gbm90aWZpY2F0aW9uLm5vdGlmaWNhdGlvbkFjdGlvbi5sYWJlbDtcbiAgICAgICAgICAgICAgICAgICAgaWYobm90aWZpY2F0aW9uLm5vdGlmaWNhdGlvbkFjdGlvbi5hY3Rpb24uVVJJICE9IHVuZGVmaW5lZCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uLm5vdGlmaWNhdGlvbi5ub3RpZmljYXRpb25BY3Rpb24uYWN0aW9uID0ge307XG4gICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uLm5vdGlmaWNhdGlvbi5ub3RpZmljYXRpb25BY3Rpb24uYWN0aW9uLlVSSSA9IG5vdGlmaWNhdGlvbi5ub3RpZmljYXRpb25BY3Rpb24uYWN0aW9uLlVSSTtcbiAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmKG5vdGlmaWNhdGlvbi5ub3RpZmljYXRpb25BY3Rpb24uYWN0aW9uLmdvdG8gIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uLm5vdGlmaWNhdGlvbi5ub3RpZmljYXRpb25BY3Rpb24uYWN0aW9uID0ge307XG4gICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uLm5vdGlmaWNhdGlvbi5ub3RpZmljYXRpb25BY3Rpb24uYWN0aW9uLmdvdG8gPSBub3RpZmljYXRpb24ubm90aWZpY2F0aW9uQWN0aW9uLmFjdGlvbi5nb3RvO1xuXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICBcblxuXG4gICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICogXG4gICAgICAgICAgICAgICAgV29ya2VyIHJlY2lwaWVudHNcbiAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGdldFJlY2lwaWVudHMobm90aWZpY2F0aW9uKS50aGVuKGZ1bmN0aW9uKHJlY2lwaWVudCl7XG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbi5ub3RpZmljYXRpb24ucmVjaXBpZW50cyA9IHJlY2lwaWVudDtcbiAgICAgICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmFjdGlvbiA9IGFjdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgd29ya2VyLnNlbmQod29ya2VyT2JqZWN0KS50aGVuKGZ1bmN0aW9uICh3b3JrZXJTdWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh3b3JrZXJPYmplY3QpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ05vdGlmaWNhdGlvbiBXb3JrZXIgcHJvY2Vzc2VzIHN1Y2Nlc3NmdWxseS4nLCB3b3JrZXJTdWNjZXNzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoc3VjY2Vzcyk7XG5cbiAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKHdvcmtlckZhaWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUod29ya2VyRmFpbCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG5cbiAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpe1xuXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiTm90aWZpY2F0aW9uIC0gZ2V0UmVjaXBpZW50cyBmYWlsZWQgd2l0aCBlcnJvciBcIisgZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG5cblxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9LFxuXG5cbiAgICAgICAgcmVBc3NpZ25tZW50Tm90aWZpY2F0aW9uOiBmdW5jdGlvbiAobm90aWZpY2F0aW9uLCBfV0ZJbnN0YW5jZSwgdXVpZCwgdXNlcikge1xuXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuXG5cbiAgICAgICAgICAgICAgICB2YXIgZ2V0UmVjaXBpZW50cyA9IGZ1bmN0aW9uKHVzZXJPYmopIHtcblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJlY2lwaWVudHMgPSB7fTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlY2lwaWVudHMuZnVuY3Rpb24gPSB7fTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlY2lwaWVudHMuZnVuY3Rpb24udXNlcnMgPSB7fTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlY2lwaWVudHMuZnVuY3Rpb24udXNlcnMgPSAgdXNlck9iai5pZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVjaXBpZW50cyk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHZhciB3b3JrZXJPYmplY3QgPSB3b3JrZXIuZ2V0V29ya2VyV3JhcHBlcigpO1xuXG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0Ll9pZCA9IGdlbmVyYXRlVVVJRCgpO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5hcHBsaWNhdGlvbklkID0gYXBwLlNDT1BFLmFwcGxpY2F0aW9uSWQ7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmNvbW11bml0eUlkID0gYXBwLlNDT1BFLmdldENvbW11bml0eUlkKCk7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmNyZWF0ZWREYXRlVGltZSA9IG5ldyBEYXRlKCkudG9TdHJpbmcoKTtcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3Quc2VuZGVyVXNlcklkID0gTE9DQUxfU0VUVElOR1MuU1VCU0NSSVBUSU9OUy51c2VySWQ7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LnByb2ZpbGVJZCA9IF9XRkluc3RhbmNlLnByb2ZpbGU7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0Lm1lc3NhZ2VUeXBlID0gXCJub3RpZmljYXRpb25cIjtcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuY2hhbm5lbHMucHVzaChcIm5vdGlmaWNhdGlvblwiKTtcbiAgICAgICAgICAgICAgICB2YXIgc3ViUHJvZmlsZUlkID0gSlNPTi54cGF0aChcIi9zdWJwcm9jZXNzZXNbX2lkIGVxICdcIisgdXVpZCArXCInXS9tZXRhLWRhdGEvc3VicHJvZmlsZUlkXCIsIF9XRkluc3RhbmNlICx7fSlbMF07XG5cbiAgICAgICAgICAgICAgICB2YXIgcGF0aEFycmF5ID0gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lLnNwbGl0KCAnLycgKTtcbiAgICAgICAgICAgICAgICB2YXIgYmFzZVVSTCA9IHdpbmRvdy5sb2NhdGlvbi5wcm90b2NvbCArIFwiLy9cIiArIHdpbmRvdy5sb2NhdGlvbi5ob3N0ICsgXCIvXCIgKyBwYXRoQXJyYXlbMV07XG5cblxuICAgICAgICAgICAgICAgIHZhciBhY3Rpb24gPSB7XG4gICAgICAgICAgICAgICAgICAgIFwibm90aWZpY2F0aW9uXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwibWVzc2FnZVwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJydGZcIjp7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJtZXNzYWdlVHlwZVwiOlwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcIm1ldGEtZGF0YVwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhcHBsaWNhdGlvbklkXCI6IF9XRkluc3RhbmNlLmFwcCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNvbW11bml0eUlkXCI6IF9XRkluc3RhbmNlLmNvbW11bml0eUlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicHJvZmlsZUlkXCI6IF9XRkluc3RhbmNlLnByb2ZpbGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzdWJQcm9jZXNzVVVJRFwiOiB1dWlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic3ViUHJvZmlsZUlkXCI6IHN1YlByb2ZpbGVJZFxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwibm90aWZpY2F0aW9uVHlwZVwiOlwid29ya2Zsb3dcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwicHJpb3JpdHlcIjpcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJyZWNpcGllbnRzXCI6IHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidXJsXCI6YmFzZVVSTCxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwia2V5c1wiOntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInByb2ZpbGVcIjp7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibmFtZVwiOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImlkXCI6XCJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjb21tdW5pdHlcIjp7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibmFtZVwiOlwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiaWRcIjpcIlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImFwcGxpY2F0aW9uXCI6e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIm5hbWVcIjpcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImlkXCI6XCJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjdXJyZW50VXNlclwiOntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJuYW1lXCI6XCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJpZFwiOlwiXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic3ViUHJvY2Vzc1wiOntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJuYW1lXCI6XCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJpZFwiOlwiXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgKiBcbiAgICAgICAgICAgICAgICBLZXlzIG1lc3NhZ2UgXG4gICAgICAgICAgICAgICAgKi9cblxuICAgICAgICAgICAgICAgIGFjdGlvbi5ub3RpZmljYXRpb24ua2V5cy5wcm9maWxlLm5hbWUgPSBhcHAucHJvZmlsZS50aXRsZTtcbiAgICAgICAgICAgICAgICBhY3Rpb24ubm90aWZpY2F0aW9uLmtleXMucHJvZmlsZS5pZCA9IGFwcC5wcm9maWxlLl9pZDtcblxuICAgICAgICAgICAgICAgIGFjdGlvbi5ub3RpZmljYXRpb24ua2V5cy5jb21tdW5pdHkubmFtZSA9IGFwcC5nZXROYW1lQnlMYW5nKExPQ0FMX1NFVFRJTkdTLkNPTU1VTklUWV9DT05GSUcuY29tbXVuaXR5TmFtZSk7XG4gICAgICAgICAgICAgICAgYWN0aW9uLm5vdGlmaWNhdGlvbi5rZXlzLmNvbW11bml0eS5pZCA9IExPQ0FMX1NFVFRJTkdTLkNPTU1VTklUWV9DT05GSUcuY29tbXVuaXR5SWQ7XG5cbiAgICAgICAgICAgICAgICB2YXIgYXBwbGljYXRpb24gPSBKU09OLnhwYXRoKFwiL2FwcGxpY2F0aW9uc1thcHBJZCBlcSAnXCIgKyBhcHAuU0NPUEUuYXBwbGljYXRpb25JZCArIFwiJ11cIiwgTE9DQUxfU0VUVElOR1MuQ09NTVVOSVRZX0NPTkZJRywge30pWzBdO1xuXG4gICAgICAgICAgICAgICAgYWN0aW9uLm5vdGlmaWNhdGlvbi5rZXlzLmFwcGxpY2F0aW9uLm5hbWUgPSBhcHAuZ2V0TmFtZUJ5TGFuZyhhcHBsaWNhdGlvbi5uYW1lKTtcbiAgICAgICAgICAgICAgICBhY3Rpb24ubm90aWZpY2F0aW9uLmtleXMuYXBwbGljYXRpb24uaWQgPSBhcHBsaWNhdGlvbi5hcHBJZDtcblxuICAgICAgICAgICAgICAgIGFjdGlvbi5ub3RpZmljYXRpb24ua2V5cy5jdXJyZW50VXNlci5uYW1lID0gTE9DQUxfU0VUVElOR1MuU0VTU0lPTi5maXJzdE5hbWUgKyBcIiBcIiArIExPQ0FMX1NFVFRJTkdTLlNFU1NJT04ubGFzdE5hbWU7XG4gICAgICAgICAgICAgICAgYWN0aW9uLm5vdGlmaWNhdGlvbi5rZXlzLmN1cnJlbnRVc2VyLmlkID0gTE9DQUxfU0VUVElOR1MuU1VCU0NSSVBUSU9OUy51c2VySWQ7XG5cblxuICAgICAgICAgICAgICAgIGFjdGlvbi5ub3RpZmljYXRpb24ua2V5cy5zdWJQcm9jZXNzLm5hbWUgPSBKU09OLnhwYXRoKFwiL3N1YnByb2Nlc3Nlc1tfaWQgZXEgJ1wiKyB1dWlkICtcIiddL2xhYmVsXCIsIF9XRkluc3RhbmNlICwge30pWzBdO1xuICAgICAgICAgICAgICAgIGFjdGlvbi5ub3RpZmljYXRpb24ua2V5cy5zdWJQcm9jZXNzLmlkID0gdXVpZDtcblxuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICogXG4gICAgICAgICAgICAgICAgV29ya2VyIG1lc3NhZ2UgXG4gICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICBhY3Rpb24ubm90aWZpY2F0aW9uLm1lc3NhZ2UuZGVmYXVsdCA9IFwiXCI7XG4gICAgICAgICAgICAgICAgYWN0aW9uLm5vdGlmaWNhdGlvbi5tZXNzYWdlLnRpdGxlID0gbm90aWZpY2F0aW9uLnJlQXNzaWdubWVudC50aXRsZTtcblxuICAgICAgICAgICAgICAgIGFjdGlvbi5ub3RpZmljYXRpb24ubWVzc2FnZS5ydGYubWFya3VwID0gbm90aWZpY2F0aW9uLnJlQXNzaWdubWVudC5tZXNzYWdlO1xuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICogXG4gICAgICAgICAgICAgICAgV29ya2VyIG1lc3NhZ2VUeXBlIFxuICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgYWN0aW9uLm5vdGlmaWNhdGlvbi5tZXNzYWdlVHlwZSA9IG5vdGlmaWNhdGlvbi5yZUFzc2lnbm1lbnQubWVzc2FnZVR5cGU7XG4gICAgICAgICAgICAgICAgXG5cbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAqIFxuICAgICAgICAgICAgICAgIFdvcmtlciBwcmlvcml0eSBcbiAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIGFjdGlvbi5ub3RpZmljYXRpb24ucHJpb3JpdHkgPSBub3RpZmljYXRpb24ucmVBc3NpZ25tZW50LnByaW9yaXR5O1xuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICogXG4gICAgICAgICAgICAgICAgV29ya2VyIG5vdGlmaWNhdGlvbkFjdGlvbiBpZiBleGlzdHMgXG4gICAgICAgICAgICAgICAgKi9cblxuICAgICAgICAgICAgICAgIGlmKG5vdGlmaWNhdGlvbi5yZUFzc2lnbm1lbnQubm90aWZpY2F0aW9uQWN0aW9uICE9IHVuZGVmaW5lZCl7XG5cbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uLm5vdGlmaWNhdGlvbi5ub3RpZmljYXRpb25BY3Rpb24gPSB7fTtcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uLm5vdGlmaWNhdGlvbi5ub3RpZmljYXRpb25BY3Rpb24ubGFiZWwgPSBub3RpZmljYXRpb24ucmVBc3NpZ25tZW50Lm5vdGlmaWNhdGlvbkFjdGlvbi5sYWJlbDtcbiAgICAgICAgICAgICAgICAgICAgaWYobm90aWZpY2F0aW9uLnJlQXNzaWdubWVudC5ub3RpZmljYXRpb25BY3Rpb24uYWN0aW9uLlVSSSAhPSB1bmRlZmluZWQpe1xuICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbi5ub3RpZmljYXRpb24ubm90aWZpY2F0aW9uQWN0aW9uLmFjdGlvbiA9IHt9O1xuICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbi5ub3RpZmljYXRpb24ubm90aWZpY2F0aW9uQWN0aW9uLmFjdGlvbi5VUkkgPSBub3RpZmljYXRpb24ucmVBc3NpZ25tZW50Lm5vdGlmaWNhdGlvbkFjdGlvbi5hY3Rpb24uVVJJO1xuICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYobm90aWZpY2F0aW9uLnJlQXNzaWdubWVudC5ub3RpZmljYXRpb25BY3Rpb24uYWN0aW9uLmdvdG8gIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uLm5vdGlmaWNhdGlvbi5ub3RpZmljYXRpb25BY3Rpb24uYWN0aW9uID0ge307XG4gICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uLm5vdGlmaWNhdGlvbi5ub3RpZmljYXRpb25BY3Rpb24uYWN0aW9uLmdvdG8gPSBub3RpZmljYXRpb24ucmVBc3NpZ25tZW50Lm5vdGlmaWNhdGlvbkFjdGlvbi5hY3Rpb24uZ290bztcblxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgXG5cblxuICAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAqIFxuICAgICAgICAgICAgICAgIFdvcmtlciByZWNpcGllbnRzXG4gICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBnZXRSZWNpcGllbnRzKHVzZXIpLnRoZW4oZnVuY3Rpb24ocmVjaXBpZW50KXtcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uLm5vdGlmaWNhdGlvbi5yZWNpcGllbnRzID0gcmVjaXBpZW50O1xuICAgICAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuYWN0aW9uID0gYWN0aW9uO1xuICAgICAgICAgICAgICAgICAgICB3b3JrZXIuc2VuZCh3b3JrZXJPYmplY3QpLnRoZW4oZnVuY3Rpb24gKHdvcmtlclN1Y2Nlc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHdvcmtlck9iamVjdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnTm90aWZpY2F0aW9uIFdvcmtlciBwcm9jZXNzZXMgc3VjY2Vzc2Z1bGx5IGZvciByZWFzc2lnbm1lbnQuJywgd29ya2VyU3VjY2Vzcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xuXG4gICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uICh3b3JrZXJGYWlsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHdvcmtlckZhaWwpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcblxuXG4gICAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKXtcblxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIk5vdGlmaWNhdGlvbiAtIGdldFJlY2lwaWVudHMgZmFpbGVkIHdpdGggZXJyb3IgXCIrIGVycik7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuXG5cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfSxcblxuICAgICAgICBhc3NpZ25tZW50Tm90aWZpY2F0aW9uOiBmdW5jdGlvbiAobm90aWZpY2F0aW9uLCBfV0ZJbnN0YW5jZSwgdXVpZCwgdXNlcikge1xuXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuXG5cbiAgICAgICAgICAgICAgICB2YXIgZ2V0UmVjaXBpZW50cyA9IGZ1bmN0aW9uKHVzZXJPYmopIHtcblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJlY2lwaWVudHMgPSB7fTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlY2lwaWVudHMuZnVuY3Rpb24gPSB7fTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlY2lwaWVudHMuZnVuY3Rpb24udXNlcnMgPSB7fTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlY2lwaWVudHMuZnVuY3Rpb24udXNlcnMgPSAgdXNlck9iai5pZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVjaXBpZW50cyk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHZhciB3b3JrZXJPYmplY3QgPSB3b3JrZXIuZ2V0V29ya2VyV3JhcHBlcigpO1xuXG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0Ll9pZCA9IGdlbmVyYXRlVVVJRCgpO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5hcHBsaWNhdGlvbklkID0gYXBwLlNDT1BFLmFwcGxpY2F0aW9uSWQ7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmNvbW11bml0eUlkID0gYXBwLlNDT1BFLmdldENvbW11bml0eUlkKCk7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmNyZWF0ZWREYXRlVGltZSA9IG5ldyBEYXRlKCkudG9TdHJpbmcoKTtcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3Quc2VuZGVyVXNlcklkID0gTE9DQUxfU0VUVElOR1MuU1VCU0NSSVBUSU9OUy51c2VySWQ7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LnByb2ZpbGVJZCA9IF9XRkluc3RhbmNlLnByb2ZpbGU7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0Lm1lc3NhZ2VUeXBlID0gXCJub3RpZmljYXRpb25cIjtcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuY2hhbm5lbHMucHVzaChcIm5vdGlmaWNhdGlvblwiKTtcbiAgICAgICAgICAgICAgICB2YXIgc3ViUHJvZmlsZUlkID0gSlNPTi54cGF0aChcIi9zdWJwcm9jZXNzZXNbX2lkIGVxICdcIisgdXVpZCArXCInXS9tZXRhLWRhdGEvc3VicHJvZmlsZUlkXCIsIF9XRkluc3RhbmNlICx7fSlbMF07XG5cbiAgICAgICAgICAgICAgICB2YXIgcGF0aEFycmF5ID0gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lLnNwbGl0KCAnLycgKTtcbiAgICAgICAgICAgICAgICB2YXIgYmFzZVVSTCA9IHdpbmRvdy5sb2NhdGlvbi5wcm90b2NvbCArIFwiLy9cIiArIHdpbmRvdy5sb2NhdGlvbi5ob3N0ICsgXCIvXCIgKyBwYXRoQXJyYXlbMV07XG5cblxuICAgICAgICAgICAgICAgIHZhciBhY3Rpb24gPSB7XG4gICAgICAgICAgICAgICAgICAgIFwibm90aWZpY2F0aW9uXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwibWVzc2FnZVwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJydGZcIjp7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJtZXNzYWdlVHlwZVwiOlwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcIm1ldGEtZGF0YVwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhcHBsaWNhdGlvbklkXCI6IF9XRkluc3RhbmNlLmFwcCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNvbW11bml0eUlkXCI6IF9XRkluc3RhbmNlLmNvbW11bml0eUlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicHJvZmlsZUlkXCI6IF9XRkluc3RhbmNlLnByb2ZpbGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzdWJQcm9jZXNzVVVJRFwiOiB1dWlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic3ViUHJvZmlsZUlkXCI6IHN1YlByb2ZpbGVJZFxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwibm90aWZpY2F0aW9uVHlwZVwiOlwid29ya2Zsb3dcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwicHJpb3JpdHlcIjpcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJyZWNpcGllbnRzXCI6IHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidXJsXCI6YmFzZVVSTCxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwia2V5c1wiOntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInByb2ZpbGVcIjp7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibmFtZVwiOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImlkXCI6XCJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjb21tdW5pdHlcIjp7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibmFtZVwiOlwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiaWRcIjpcIlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImFwcGxpY2F0aW9uXCI6e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIm5hbWVcIjpcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImlkXCI6XCJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjdXJyZW50VXNlclwiOntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJuYW1lXCI6XCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJpZFwiOlwiXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic3ViUHJvY2Vzc1wiOntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJuYW1lXCI6XCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJpZFwiOlwiXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgKiBcbiAgICAgICAgICAgICAgICBLZXlzIG1lc3NhZ2UgXG4gICAgICAgICAgICAgICAgKi9cblxuICAgICAgICAgICAgICAgIGFjdGlvbi5ub3RpZmljYXRpb24ua2V5cy5wcm9maWxlLm5hbWUgPSBhcHAucHJvZmlsZS50aXRsZTtcbiAgICAgICAgICAgICAgICBhY3Rpb24ubm90aWZpY2F0aW9uLmtleXMucHJvZmlsZS5pZCA9IGFwcC5wcm9maWxlLl9pZDtcblxuICAgICAgICAgICAgICAgIGFjdGlvbi5ub3RpZmljYXRpb24ua2V5cy5jb21tdW5pdHkubmFtZSA9IGFwcC5nZXROYW1lQnlMYW5nKExPQ0FMX1NFVFRJTkdTLkNPTU1VTklUWV9DT05GSUcuY29tbXVuaXR5TmFtZSk7XG4gICAgICAgICAgICAgICAgYWN0aW9uLm5vdGlmaWNhdGlvbi5rZXlzLmNvbW11bml0eS5pZCA9IExPQ0FMX1NFVFRJTkdTLkNPTU1VTklUWV9DT05GSUcuY29tbXVuaXR5SWQ7XG5cbiAgICAgICAgICAgICAgICB2YXIgYXBwbGljYXRpb24gPSBKU09OLnhwYXRoKFwiL2FwcGxpY2F0aW9uc1thcHBJZCBlcSAnXCIgKyBhcHAuU0NPUEUuYXBwbGljYXRpb25JZCArIFwiJ11cIiwgTE9DQUxfU0VUVElOR1MuQ09NTVVOSVRZX0NPTkZJRywge30pWzBdO1xuXG4gICAgICAgICAgICAgICAgYWN0aW9uLm5vdGlmaWNhdGlvbi5rZXlzLmFwcGxpY2F0aW9uLm5hbWUgPSBhcHAuZ2V0TmFtZUJ5TGFuZyhhcHBsaWNhdGlvbi5uYW1lKTtcbiAgICAgICAgICAgICAgICBhY3Rpb24ubm90aWZpY2F0aW9uLmtleXMuYXBwbGljYXRpb24uaWQgPSBhcHBsaWNhdGlvbi5hcHBJZDtcblxuICAgICAgICAgICAgICAgIGFjdGlvbi5ub3RpZmljYXRpb24ua2V5cy5jdXJyZW50VXNlci5uYW1lID0gTE9DQUxfU0VUVElOR1MuU0VTU0lPTi5maXJzdE5hbWUgKyBcIiBcIiArIExPQ0FMX1NFVFRJTkdTLlNFU1NJT04ubGFzdE5hbWU7XG4gICAgICAgICAgICAgICAgYWN0aW9uLm5vdGlmaWNhdGlvbi5rZXlzLmN1cnJlbnRVc2VyLmlkID0gTE9DQUxfU0VUVElOR1MuU1VCU0NSSVBUSU9OUy51c2VySWQ7XG5cblxuICAgICAgICAgICAgICAgIGFjdGlvbi5ub3RpZmljYXRpb24ua2V5cy5zdWJQcm9jZXNzLm5hbWUgPSBKU09OLnhwYXRoKFwiL3N1YnByb2Nlc3Nlc1tfaWQgZXEgJ1wiKyB1dWlkICtcIiddL2xhYmVsXCIsIF9XRkluc3RhbmNlICwge30pWzBdO1xuICAgICAgICAgICAgICAgIGFjdGlvbi5ub3RpZmljYXRpb24ua2V5cy5zdWJQcm9jZXNzLmlkID0gdXVpZDtcblxuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICogXG4gICAgICAgICAgICAgICAgV29ya2VyIG1lc3NhZ2UgXG4gICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICBhY3Rpb24ubm90aWZpY2F0aW9uLm1lc3NhZ2UuZGVmYXVsdCA9IFwiXCI7XG4gICAgICAgICAgICAgICAgYWN0aW9uLm5vdGlmaWNhdGlvbi5tZXNzYWdlLnRpdGxlID0gbm90aWZpY2F0aW9uLmFzc2lnbm1lbnQudGl0bGU7XG5cbiAgICAgICAgICAgICAgICBhY3Rpb24ubm90aWZpY2F0aW9uLm1lc3NhZ2UucnRmLm1hcmt1cCA9IG5vdGlmaWNhdGlvbi5hc3NpZ25tZW50Lm1lc3NhZ2U7XG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgKiBcbiAgICAgICAgICAgICAgICBXb3JrZXIgbWVzc2FnZVR5cGUgXG4gICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICBhY3Rpb24ubm90aWZpY2F0aW9uLm1lc3NhZ2VUeXBlID0gbm90aWZpY2F0aW9uLmFzc2lnbm1lbnQubWVzc2FnZVR5cGU7XG4gICAgICAgICAgICAgICAgXG5cbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAqIFxuICAgICAgICAgICAgICAgIFdvcmtlciBwcmlvcml0eSBcbiAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIGFjdGlvbi5ub3RpZmljYXRpb24ucHJpb3JpdHkgPSBub3RpZmljYXRpb24uYXNzaWdubWVudC5wcmlvcml0eTtcbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAqIFxuICAgICAgICAgICAgICAgIFdvcmtlciBub3RpZmljYXRpb25BY3Rpb24gaWYgZXhpc3RzIFxuICAgICAgICAgICAgICAgICovXG5cbiAgICAgICAgICAgICAgICBpZihub3RpZmljYXRpb24uYXNzaWdubWVudC5ub3RpZmljYXRpb25BY3Rpb24gIT0gdW5kZWZpbmVkKXtcblxuICAgICAgICAgICAgICAgICAgICBhY3Rpb24ubm90aWZpY2F0aW9uLm5vdGlmaWNhdGlvbkFjdGlvbiA9IHt9O1xuICAgICAgICAgICAgICAgICAgICBhY3Rpb24ubm90aWZpY2F0aW9uLm5vdGlmaWNhdGlvbkFjdGlvbi5sYWJlbCA9IG5vdGlmaWNhdGlvbi5hc3NpZ25tZW50Lm5vdGlmaWNhdGlvbkFjdGlvbi5sYWJlbDtcbiAgICAgICAgICAgICAgICAgICAgaWYobm90aWZpY2F0aW9uLmFzc2lnbm1lbnQubm90aWZpY2F0aW9uQWN0aW9uLmFjdGlvbi5VUkkgIT0gdW5kZWZpbmVkKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb24ubm90aWZpY2F0aW9uLm5vdGlmaWNhdGlvbkFjdGlvbi5hY3Rpb24gPSB7fTtcbiAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb24ubm90aWZpY2F0aW9uLm5vdGlmaWNhdGlvbkFjdGlvbi5hY3Rpb24uVVJJID0gbm90aWZpY2F0aW9uLmFzc2lnbm1lbnQubm90aWZpY2F0aW9uQWN0aW9uLmFjdGlvbi5VUkk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZihub3RpZmljYXRpb24uYXNzaWdubWVudC5ub3RpZmljYXRpb25BY3Rpb24uYWN0aW9uLmdvdG8gIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uLm5vdGlmaWNhdGlvbi5ub3RpZmljYXRpb25BY3Rpb24uYWN0aW9uID0ge307XG4gICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uLm5vdGlmaWNhdGlvbi5ub3RpZmljYXRpb25BY3Rpb24uYWN0aW9uLmdvdG8gPSBub3RpZmljYXRpb24uYXNzaWdubWVudC5ub3RpZmljYXRpb25BY3Rpb24uYWN0aW9uLmdvdG87XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgIFxuXG5cbiAgICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgKiBcbiAgICAgICAgICAgICAgICBXb3JrZXIgcmVjaXBpZW50c1xuICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgZ2V0UmVjaXBpZW50cyh1c2VyKS50aGVuKGZ1bmN0aW9uKHJlY2lwaWVudCl7XG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbi5ub3RpZmljYXRpb24ucmVjaXBpZW50cyA9IHJlY2lwaWVudDtcbiAgICAgICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmFjdGlvbiA9IGFjdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgd29ya2VyLnNlbmQod29ya2VyT2JqZWN0KS50aGVuKGZ1bmN0aW9uICh3b3JrZXJTdWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh3b3JrZXJPYmplY3QpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ05vdGlmaWNhdGlvbiBXb3JrZXIgcHJvY2Vzc2VzIHN1Y2Nlc3NmdWxseSBmb3IgYXNzaWdubWVudC4nLCB3b3JrZXJTdWNjZXNzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoc3VjY2Vzcyk7XG5cbiAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKHdvcmtlckZhaWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUod29ya2VyRmFpbCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG5cbiAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpe1xuXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiTm90aWZpY2F0aW9uIC0gZ2V0UmVjaXBpZW50cyBmYWlsZWQgd2l0aCBlcnJvciBcIisgZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG5cblxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9LFxuXG4gICAgICAgIGFjY2VwdGFuY2VOb3RpZmljYXRpb246IGZ1bmN0aW9uIChub3RpZmljYXRpb24sIF9XRkluc3RhbmNlLCB1dWlkLCByb2xlKSB7XG5cbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG5cblxuICAgICAgICAgICAgICAgIHZhciBnZXRSb2xlcyA9IGZ1bmN0aW9uKHJvbGUpIHtcblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJlY2lwaWVudHMgPSB7fTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlY2lwaWVudHMucm9sZSA9IHJvbGU7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlY2lwaWVudHMpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB2YXIgd29ya2VyT2JqZWN0ID0gd29ya2VyLmdldFdvcmtlcldyYXBwZXIoKTtcblxuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5faWQgPSBnZW5lcmF0ZVVVSUQoKTtcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuYXBwbGljYXRpb25JZCA9IGFwcC5TQ09QRS5hcHBsaWNhdGlvbklkO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5jb21tdW5pdHlJZCA9IGFwcC5TQ09QRS5nZXRDb21tdW5pdHlJZCgpO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5jcmVhdGVkRGF0ZVRpbWUgPSBuZXcgRGF0ZSgpLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LnNlbmRlclVzZXJJZCA9IExPQ0FMX1NFVFRJTkdTLlNVQlNDUklQVElPTlMudXNlcklkO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5wcm9maWxlSWQgPSBfV0ZJbnN0YW5jZS5wcm9maWxlO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5tZXNzYWdlVHlwZSA9IFwibm90aWZpY2F0aW9uXCI7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmNoYW5uZWxzLnB1c2goXCJub3RpZmljYXRpb25cIik7XG4gICAgICAgICAgICAgICAgdmFyIHN1YlByb2ZpbGVJZCA9IEpTT04ueHBhdGgoXCIvc3VicHJvY2Vzc2VzW19pZCBlcSAnXCIrIHV1aWQgK1wiJ10vbWV0YS1kYXRhL3N1YnByb2ZpbGVJZFwiLCBfV0ZJbnN0YW5jZSAse30pWzBdO1xuXG4gICAgICAgICAgICAgICAgdmFyIHBhdGhBcnJheSA9IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZS5zcGxpdCggJy8nICk7XG4gICAgICAgICAgICAgICAgdmFyIGJhc2VVUkwgPSB3aW5kb3cubG9jYXRpb24ucHJvdG9jb2wgKyBcIi8vXCIgKyB3aW5kb3cubG9jYXRpb24uaG9zdCArIFwiL1wiICsgcGF0aEFycmF5WzFdO1xuXG5cbiAgICAgICAgICAgICAgICB2YXIgYWN0aW9uID0ge1xuICAgICAgICAgICAgICAgICAgICBcIm5vdGlmaWNhdGlvblwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcIm1lc3NhZ2VcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicnRmXCI6e1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwibWVzc2FnZVR5cGVcIjpcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJtZXRhLWRhdGFcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYXBwbGljYXRpb25JZFwiOiBfV0ZJbnN0YW5jZS5hcHAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjb21tdW5pdHlJZFwiOiBfV0ZJbnN0YW5jZS5jb21tdW5pdHlJZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInByb2ZpbGVJZFwiOiBfV0ZJbnN0YW5jZS5wcm9maWxlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic3ViUHJvY2Vzc1VVSURcIjogdXVpZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInN1YlByb2ZpbGVJZFwiOiBzdWJQcm9maWxlSWRcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBcIm5vdGlmaWNhdGlvblR5cGVcIjpcIndvcmtmbG93XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcInByaW9yaXR5XCI6XCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwicmVjaXBpZW50c1wiOiB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBcInVybFwiOmJhc2VVUkwsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImtleXNcIjp7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwcm9maWxlXCI6e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIm5hbWVcIjogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJpZFwiOlwiXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY29tbXVuaXR5XCI6e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIm5hbWVcIjpcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImlkXCI6XCJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhcHBsaWNhdGlvblwiOntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJuYW1lXCI6XCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJpZFwiOlwiXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY3VycmVudFVzZXJcIjp7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibmFtZVwiOlwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiaWRcIjpcIlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInN1YlByb2Nlc3NcIjp7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibmFtZVwiOlwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiaWRcIjpcIlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICogXG4gICAgICAgICAgICAgICAgS2V5cyBtZXNzYWdlIFxuICAgICAgICAgICAgICAgICovXG5cbiAgICAgICAgICAgICAgICBhY3Rpb24ubm90aWZpY2F0aW9uLmtleXMucHJvZmlsZS5uYW1lID0gYXBwLnByb2ZpbGUudGl0bGU7XG4gICAgICAgICAgICAgICAgYWN0aW9uLm5vdGlmaWNhdGlvbi5rZXlzLnByb2ZpbGUuaWQgPSBhcHAucHJvZmlsZS5faWQ7XG5cbiAgICAgICAgICAgICAgICBhY3Rpb24ubm90aWZpY2F0aW9uLmtleXMuY29tbXVuaXR5Lm5hbWUgPSBhcHAuZ2V0TmFtZUJ5TGFuZyhMT0NBTF9TRVRUSU5HUy5DT01NVU5JVFlfQ09ORklHLmNvbW11bml0eU5hbWUpO1xuICAgICAgICAgICAgICAgIGFjdGlvbi5ub3RpZmljYXRpb24ua2V5cy5jb21tdW5pdHkuaWQgPSBMT0NBTF9TRVRUSU5HUy5DT01NVU5JVFlfQ09ORklHLmNvbW11bml0eUlkO1xuXG4gICAgICAgICAgICAgICAgdmFyIGFwcGxpY2F0aW9uID0gSlNPTi54cGF0aChcIi9hcHBsaWNhdGlvbnNbYXBwSWQgZXEgJ1wiICsgYXBwLlNDT1BFLmFwcGxpY2F0aW9uSWQgKyBcIiddXCIsIExPQ0FMX1NFVFRJTkdTLkNPTU1VTklUWV9DT05GSUcsIHt9KVswXTtcblxuICAgICAgICAgICAgICAgIGFjdGlvbi5ub3RpZmljYXRpb24ua2V5cy5hcHBsaWNhdGlvbi5uYW1lID0gYXBwLmdldE5hbWVCeUxhbmcoYXBwbGljYXRpb24ubmFtZSk7XG4gICAgICAgICAgICAgICAgYWN0aW9uLm5vdGlmaWNhdGlvbi5rZXlzLmFwcGxpY2F0aW9uLmlkID0gYXBwbGljYXRpb24uYXBwSWQ7XG5cbiAgICAgICAgICAgICAgICBhY3Rpb24ubm90aWZpY2F0aW9uLmtleXMuY3VycmVudFVzZXIubmFtZSA9IExPQ0FMX1NFVFRJTkdTLlNFU1NJT04uZmlyc3ROYW1lICsgXCIgXCIgKyBMT0NBTF9TRVRUSU5HUy5TRVNTSU9OLmxhc3ROYW1lO1xuICAgICAgICAgICAgICAgIGFjdGlvbi5ub3RpZmljYXRpb24ua2V5cy5jdXJyZW50VXNlci5pZCA9IExPQ0FMX1NFVFRJTkdTLlNVQlNDUklQVElPTlMudXNlcklkO1xuXG5cbiAgICAgICAgICAgICAgICBhY3Rpb24ubm90aWZpY2F0aW9uLmtleXMuc3ViUHJvY2Vzcy5uYW1lID0gSlNPTi54cGF0aChcIi9zdWJwcm9jZXNzZXNbX2lkIGVxICdcIisgdXVpZCArXCInXS9sYWJlbFwiLCBfV0ZJbnN0YW5jZSAsIHt9KVswXTtcbiAgICAgICAgICAgICAgICBhY3Rpb24ubm90aWZpY2F0aW9uLmtleXMuc3ViUHJvY2Vzcy5pZCA9IHV1aWQ7XG5cbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAqIFxuICAgICAgICAgICAgICAgIFdvcmtlciBtZXNzYWdlIFxuICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgYWN0aW9uLm5vdGlmaWNhdGlvbi5tZXNzYWdlLmRlZmF1bHQgPSBcIlwiO1xuICAgICAgICAgICAgICAgIGFjdGlvbi5ub3RpZmljYXRpb24ubWVzc2FnZS50aXRsZSA9IG5vdGlmaWNhdGlvbi5hc3NpZ25tZW50QWNjZXB0YW5jZS50aXRsZTtcblxuICAgICAgICAgICAgICAgIGFjdGlvbi5ub3RpZmljYXRpb24ubWVzc2FnZS5ydGYubWFya3VwID0gbm90aWZpY2F0aW9uLmFzc2lnbm1lbnRBY2NlcHRhbmNlLm1lc3NhZ2U7XG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgKiBcbiAgICAgICAgICAgICAgICBXb3JrZXIgbWVzc2FnZVR5cGUgXG4gICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICBhY3Rpb24ubm90aWZpY2F0aW9uLm1lc3NhZ2VUeXBlID0gbm90aWZpY2F0aW9uLmFzc2lnbm1lbnRBY2NlcHRhbmNlLm1lc3NhZ2VUeXBlO1xuICAgICAgICAgICAgICAgIFxuXG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgKiBcbiAgICAgICAgICAgICAgICBXb3JrZXIgcHJpb3JpdHkgXG4gICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICBhY3Rpb24ubm90aWZpY2F0aW9uLnByaW9yaXR5ID0gbm90aWZpY2F0aW9uLmFzc2lnbm1lbnRBY2NlcHRhbmNlLnByaW9yaXR5O1xuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICogXG4gICAgICAgICAgICAgICAgV29ya2VyIG5vdGlmaWNhdGlvbkFjdGlvbiBpZiBleGlzdHMgXG4gICAgICAgICAgICAgICAgKi9cblxuICAgICAgICAgICAgICAgIGlmKG5vdGlmaWNhdGlvbi5hc3NpZ25tZW50QWNjZXB0YW5jZS5ub3RpZmljYXRpb25BY3Rpb24gIT0gdW5kZWZpbmVkKXtcblxuICAgICAgICAgICAgICAgICAgICBhY3Rpb24ubm90aWZpY2F0aW9uLm5vdGlmaWNhdGlvbkFjdGlvbiA9IHt9O1xuICAgICAgICAgICAgICAgICAgICBhY3Rpb24ubm90aWZpY2F0aW9uLm5vdGlmaWNhdGlvbkFjdGlvbi5sYWJlbCA9IG5vdGlmaWNhdGlvbi5hc3NpZ25tZW50QWNjZXB0YW5jZS5ub3RpZmljYXRpb25BY3Rpb24ubGFiZWw7XG4gICAgICAgICAgICAgICAgICAgIGlmKG5vdGlmaWNhdGlvbi5hc3NpZ25tZW50QWNjZXB0YW5jZS5ub3RpZmljYXRpb25BY3Rpb24uYWN0aW9uLlVSSSAhPSB1bmRlZmluZWQpe1xuICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbi5ub3RpZmljYXRpb24ubm90aWZpY2F0aW9uQWN0aW9uLmFjdGlvbiA9IHt9O1xuICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbi5ub3RpZmljYXRpb24ubm90aWZpY2F0aW9uQWN0aW9uLmFjdGlvbi5VUkkgPSBub3RpZmljYXRpb24uYXNzaWdubWVudEFjY2VwdGFuY2Uubm90aWZpY2F0aW9uQWN0aW9uLmFjdGlvbi5VUkk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZihub3RpZmljYXRpb24uYXNzaWdubWVudEFjY2VwdGFuY2Uubm90aWZpY2F0aW9uQWN0aW9uLmFjdGlvbi5nb3RvICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbi5ub3RpZmljYXRpb24ubm90aWZpY2F0aW9uQWN0aW9uLmFjdGlvbiA9IHt9O1xuICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbi5ub3RpZmljYXRpb24ubm90aWZpY2F0aW9uQWN0aW9uLmFjdGlvbi5nb3RvID0gbm90aWZpY2F0aW9uLmFzc2lnbm1lbnRBY2NlcHRhbmNlLm5vdGlmaWNhdGlvbkFjdGlvbi5hY3Rpb24uZ290bztcblxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgXG5cblxuICAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAqIFxuICAgICAgICAgICAgICAgIFdvcmtlciByZWNpcGllbnRzXG4gICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBnZXRSb2xlcyhyb2xlKS50aGVuKGZ1bmN0aW9uKHJlY2lwaWVudCl7XG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbi5ub3RpZmljYXRpb24ucmVjaXBpZW50cyA9IHJlY2lwaWVudDtcbiAgICAgICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmFjdGlvbiA9IGFjdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgd29ya2VyLnNlbmQod29ya2VyT2JqZWN0KS50aGVuKGZ1bmN0aW9uICh3b3JrZXJTdWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh3b3JrZXJPYmplY3QpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ05vdGlmaWNhdGlvbiBXb3JrZXIgcHJvY2Vzc2VzIHN1Y2Nlc3NmdWxseSBmb3IgYXNzaWdubWVudC4nLCB3b3JrZXJTdWNjZXNzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoc3VjY2Vzcyk7XG5cbiAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKHdvcmtlckZhaWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUod29ya2VyRmFpbCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG5cbiAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpe1xuXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiTm90aWZpY2F0aW9uIC0gZ2V0UmVjaXBpZW50cyBmYWlsZWQgd2l0aCBlcnJvciBcIisgZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG5cblxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9XG5cblxuICAgIH1cblxufSkoKTtcblxuXG52YXIgcmVwb3J0ID0gKGZ1bmN0aW9uICgpIHtcblxuICAgIHJldHVybiB7XG5cblxuXG5cbiAgICAgICAgY3JlYXRlUGVyZm9ybWFuY2VSZXBvcnQ6IGZ1bmN0aW9uIChwZXJmb3JtYW5jZVJlcG9ydE9iamVjdCwgX1dGSW5zdGFuY2UsIHV1aWQpIHtcblxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcblxuICAgICAgICAgICAgICAgIHZhciB3b3JrZXJPYmplY3QgPSB3b3JrZXIuZ2V0V29ya2VyV3JhcHBlcigpO1xuXG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0Ll9pZCA9IGdlbmVyYXRlVVVJRCgpO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5jb21tdW5pdHlJZCA9IGFwcC5TQ09QRS5nZXRDb21tdW5pdHlJZCgpO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5hcHBsaWNhdGlvbklkID0gYXBwLlNDT1BFLmFwcGxpY2F0aW9uSWQ7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmNyZWF0ZWREYXRlVGltZSA9IG5ldyBEYXRlKCkudG9TdHJpbmcoKTtcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3Quc2VuZGVyVXNlcklkID0gTE9DQUxfU0VUVElOR1MuU1VCU0NSSVBUSU9OUy51c2VySWQ7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LnByb2ZpbGVJZCA9IF9XRkluc3RhbmNlLnByb2ZpbGU7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmNoYW5uZWxzLnB1c2goXCJjcmVhdGVQZXJmb3JtYW5jZVJlcG9ydFwiKTtcbiAgICAgICAgICAgICAgICB2YXIgd29ya3BsYW5TZXRJZCA9IHBlcmZvcm1hbmNlUmVwb3J0T2JqZWN0LndvcmtwbGFuU2V0SWQ7XG4gICAgICAgICAgICAgICAgdmFyIGNvbmZpZ1NldElkID0gcGVyZm9ybWFuY2VSZXBvcnRPYmplY3QuY29uZmlnU2V0SWQ7XG5cblxuICAgICAgICAgICAgICAgIC8vIHdvcmtwbGFuU2V0SWQgc2NvcGUgaXMgcHJvZmlsZVxuICAgICAgICAgICAgICAgIC8vIGNvbmZpZ1NldElkIHNjb3BlIGlzIHN1YnByb2Nlc3Nlc1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHZhciB3b3JrcGxhblVVSUQgPSBKU09OLnhwYXRoKFwiL2luZGljYXRvcnNbY2F0ZWdvcnkvdGVybSBlcSAnXCIrIHdvcmtwbGFuU2V0SWQgK1wiJ10vX2lkXCIsYXBwLlNDT1BFLndvcmtmbG93LCB7fSlbMF07XG4gICAgICAgICAgICAgICAgdmFyIGNvbmZpZ1VVSUQgPSBKU09OLnhwYXRoKFwiL3N1YnByb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgdXVpZCArIFwiJ10vaW5kaWNhdG9yc1tpZCBlcSAnXCIrIGNvbmZpZ1NldElkICtcIiddL2luc3RhbmNlc1sxXS91dWlkXCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XG5cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB2YXIgYWN0aW9uID0ge1xuICAgICAgICAgICAgICAgICAgICBcImNyZWF0ZVBlcmZvcm1hbmNlUmVwb3J0XCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwid29ya3BsYW5VVUlEXCI6IHdvcmtwbGFuVVVJRCxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiY29uZmlnVVVJRFwiOiBjb25maWdVVUlELFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJwcm9maWxJZFwiOiBfV0ZJbnN0YW5jZS5wcm9maWxlICAgXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmFjdGlvbiA9IGFjdGlvbjtcbiAgICAgICAgICAgICAgICB3b3JrZXIuc2VuZCh3b3JrZXJPYmplY3QpLnRoZW4oZnVuY3Rpb24gKHdvcmtlclN1Y2Nlc3MpIHtcblxuICAgICAgICAgICAgICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnV29ya3BsYW5SZXBvcnQgV29ya2VyIHByb2Nlc3NlZCBzdWNjZXNzZnVsbHkuJywgd29ya2VyU3VjY2Vzcyk7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoc3VjY2Vzcyk7XG5cbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAod29ya2VyRmFpbCkge1xuICAgICAgICAgICAgICAgICAgICByZWplY3Qod29ya2VyRmFpbCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9LFxuXG4gICAgICAgIGNyZWF0ZVJlcG9ydDogZnVuY3Rpb24gKGNyZWF0ZVJlcG9ydCwgX1dGSW5zdGFuY2UsIHV1aWQpIHtcblxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcblxuICAgICAgICAgICAgICAgIHZhciB3b3JrZXJPYmplY3QgPSB3b3JrZXIuZ2V0V29ya2VyV3JhcHBlcigpO1xuXG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0Ll9pZCA9IGdlbmVyYXRlVVVJRCgpO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5jb21tdW5pdHlJZCA9IGFwcC5TQ09QRS5nZXRDb21tdW5pdHlJZCgpO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5hcHBsaWNhdGlvbklkID0gYXBwLlNDT1BFLmFwcGxpY2F0aW9uSWQ7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmNyZWF0ZWREYXRlVGltZSA9IG5ldyBEYXRlKCkudG9TdHJpbmcoKTtcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3Quc2VuZGVyVXNlcklkID0gTE9DQUxfU0VUVElOR1MuU1VCU0NSSVBUSU9OUy51c2VySWQ7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LnByb2ZpbGVJZCA9IF9XRkluc3RhbmNlLnByb2ZpbGU7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmNoYW5uZWxzLnB1c2goXCJjcmVhdGVSZXBvcnRcIik7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgdmFyIHBlcmZvcm1hbmNlUmVwb3J0RGVmaW5pdGlvbiA9IEpTT04ueHBhdGgoXCIvaW5kaWNhdG9yc1tjYXRlZ29yeS90ZXJtIGVxICdQZXJmb3JtYW5jZVJlcG9ydERlZmluaXRpb24nXS9faWRcIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcbiAgICAgICAgICAgICAgICB2YXIgcmVwb3J0aW5nU0RPID0gSlNPTi54cGF0aChcIi9zdWJwcm9jZXNzZXNbX2lkIGVxICdcIiArIHV1aWQgKyBcIiddL2luZGljYXRvcnNbaWQgZXEgJ3JlcG9ydGluZ1NETyddL2luc3RhbmNlc1sxXS91dWlkXCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XG5cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB2YXIgYWN0aW9uID0ge1xuICAgICAgICAgICAgICAgICAgICBcImNyZWF0ZVJlcG9ydFwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcInBlcmZvcm1hbmNlUmVwb3J0RGVmaW5pdGlvblwiOiBwZXJmb3JtYW5jZVJlcG9ydERlZmluaXRpb24sXG4gICAgICAgICAgICAgICAgICAgICAgICBcInJlcG9ydGluZ1NET1wiOiByZXBvcnRpbmdTRE8sXG4gICAgICAgICAgICAgICAgICAgICAgICBcInByb2ZpbElkXCI6IF9XRkluc3RhbmNlLnByb2ZpbGUgICBcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuYWN0aW9uID0gYWN0aW9uO1xuICAgICAgICAgICAgICAgIHdvcmtlci5zZW5kKHdvcmtlck9iamVjdCkudGhlbihmdW5jdGlvbiAod29ya2VyU3VjY2Vzcykge1xuXG4gICAgICAgICAgICAgICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdSZXByb3QgV29ya2VyIHByb2Nlc3NlZCBzdWNjZXNzZnVsbHkuJywgd29ya2VyU3VjY2Vzcyk7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoc3VjY2Vzcyk7XG5cbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAod29ya2VyRmFpbCkge1xuICAgICAgICAgICAgICAgICAgICByZWplY3Qod29ya2VyRmFpbCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9LFxuXG5cbiAgICAgICBcblxuICAgICAgICBzZG9SZXBvcnQ6IGZ1bmN0aW9uIChzZG9SZXBvcnQsIF9XRkluc3RhbmNlLCB1dWlkKSB7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG5cbiAgICAgICAgICAgICAgICB2YXIgd29ya2VyT2JqZWN0ID0gd29ya2VyLmdldFdvcmtlcldyYXBwZXIoKTtcblxuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5faWQgPSBnZW5lcmF0ZVVVSUQoKTtcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuY29tbXVuaXR5SWQgPSBhcHAuU0NPUEUuZ2V0Q29tbXVuaXR5SWQoKTtcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuYXBwbGljYXRpb25JZCA9IGFwcC5TQ09QRS5hcHBsaWNhdGlvbklkO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5jcmVhdGVkRGF0ZVRpbWUgPSBuZXcgRGF0ZSgpLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LnNlbmRlclVzZXJJZCA9IExPQ0FMX1NFVFRJTkdTLlNVQlNDUklQVElPTlMudXNlcklkO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5wcm9maWxlSWQgPSBfV0ZJbnN0YW5jZS5wcm9maWxlO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5jaGFubmVscy5wdXNoKFwic2RvUmVwb3J0XCIpO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHZhciBzZXRJZCA9IHNkb1JlcG9ydC5pbmRpY2F0b3JTZXRJZDtcbiAgICAgICAgICAgICAgICB2YXIgc2RvUmVwb3J0VVVJRCA9IEpTT04ueHBhdGgoXCIvc3VicHJvY2Vzc2VzW19pZCBlcSAnXCIgKyB1dWlkICsgXCInXS9pbmRpY2F0b3JzW2lkIGVxICdcIisgc2V0SWQgK1wiJ10vaW5zdGFuY2VzWzFdL3V1aWRcIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcblxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHZhciBhY3Rpb24gPSB7XG4gICAgICAgICAgICAgICAgICAgIFwic2RvUmVwb3J0XCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwic2RvUmVwb3J0VVVJRFwiOiBzZG9SZXBvcnRVVUlELFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJhcHBsaWNhdGlvbklkXCI6IGFwcC5TQ09QRS5hcHBsaWNhdGlvbklkLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJjb21tdW5pdHlJZFwiOiBhcHAuU0NPUEUuZ2V0Q29tbXVuaXR5SWQoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwicHJvZmlsZUlkXCI6IGFwcC5TQ09QRS53b3JrZmxvdy5wcm9maWxlLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJzdWJQcm9jZXNzVVVJRFwiOiB1dWlkICBcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuYWN0aW9uID0gYWN0aW9uO1xuICAgICAgICAgICAgICAgIHdvcmtlci5zZW5kKHdvcmtlck9iamVjdCkudGhlbihmdW5jdGlvbiAod29ya2VyU3VjY2Vzcykge1xuXG4gICAgICAgICAgICAgICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdyZXBvcnQgV29ya2VyIHByb2Nlc3NlZCBzdWNjZXNzZnVsbHkuJywgd29ya2VyU3VjY2Vzcyk7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoc3VjY2Vzcyk7XG5cbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAod29ya2VyRmFpbCkge1xuICAgICAgICAgICAgICAgICAgICByZWplY3Qod29ya2VyRmFpbCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9LFxuXG4gICAgICAgIGV4ZWN1dGVSZXBvcnQ6IGZ1bmN0aW9uIChleGVjdXRlUmVwb3J0LCBfV0ZJbnN0YW5jZSwgdXVpZCkge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuXG4gICAgICAgICAgICAgICAgdmFyIHdvcmtlck9iamVjdCA9IHdvcmtlci5nZXRXb3JrZXJXcmFwcGVyKCk7XG5cbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuX2lkID0gZ2VuZXJhdGVVVUlEKCk7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmNvbW11bml0eUlkID0gYXBwLlNDT1BFLmdldENvbW11bml0eUlkKCk7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmFwcGxpY2F0aW9uSWQgPSBhcHAuU0NPUEUuYXBwbGljYXRpb25JZDtcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuY3JlYXRlZERhdGVUaW1lID0gbmV3IERhdGUoKS50b1N0cmluZygpO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5zZW5kZXJVc2VySWQgPSBMT0NBTF9TRVRUSU5HUy5TVUJTQ1JJUFRJT05TLnVzZXJJZDtcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QucHJvZmlsZUlkID0gX1dGSW5zdGFuY2UucHJvZmlsZTtcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuY2hhbm5lbHMucHVzaChcImV4ZWN1dGVSZXBvcnRcIik7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHZhciBTRE9yZXBvcnRTZXRJZCA9IGV4ZWN1dGVSZXBvcnQuU0RPcmVwb3J0U2V0SWQ7XG4gICAgICAgICAgICAgICAgdmFyIHJlcG9ydGluZ1NET1NldGlkID0gZXhlY3V0ZVJlcG9ydC5yZXBvcnRpbmdTRE9TZXRpZDtcblxuXG4gICAgICAgICAgICAgICAgdmFyIFNET3JlcG9ydFVVSUQgPSBKU09OLnhwYXRoKFwiL3N1YnByb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgdXVpZCArIFwiJ10vaW5kaWNhdG9yc1tpZCBlcSAnXCIrIFNET3JlcG9ydFNldElkICtcIiddL2luc3RhbmNlc1sxXS91dWlkXCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XG4gICAgICAgICAgICAgICAgdmFyIHJlcG9ydGluZ1NET1VVSUQgPSBKU09OLnhwYXRoKFwiL3N1YnByb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgdXVpZCArIFwiJ10vaW5kaWNhdG9yc1tpZCBlcSAnXCIrIHJlcG9ydGluZ1NET1NldGlkICtcIiddL2luc3RhbmNlc1sxXS91dWlkXCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYoU0RPcmVwb3J0VVVJRCA9PSB1bmRlZmluZWQpe1xuICAgICAgICAgICAgICAgICAgICBTRE9yZXBvcnRVVUlEID0gSlNPTi54cGF0aChcIi9pbmRpY2F0b3JzW2NhdGVnb3J5L3Rlcm0gZXEgJ1wiKyBTRE9yZXBvcnRTZXRJZCArXCInXS9faWRcIixfV0ZJbnN0YW5jZSx7fSlbMF07XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgdmFyIGFjdGlvbiA9IHtcbiAgICAgICAgICAgICAgICAgICAgXCJleGVjdXRlUmVwb3J0XCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwic2RvUmVwb3J0VVVJRFwiOiBTRE9yZXBvcnRVVUlELFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJyZXBvcnRpbmdTRE9VVUlEXCI6IHJlcG9ydGluZ1NET1VVSUQsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImFwcGxpY2F0aW9uSWRcIjogYXBwLlNDT1BFLmFwcGxpY2F0aW9uSWQsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImNvbW11bml0eUlkXCI6IGFwcC5TQ09QRS5nZXRDb21tdW5pdHlJZCgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJwcm9maWxlSWRcIjogYXBwLlNDT1BFLndvcmtmbG93LnByb2ZpbGUsXG4gICAgICAgICAgICAgICAgICAgICAgICBcInN1YlByb2Nlc3NVVUlEXCI6IHV1aWQgIFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5hY3Rpb24gPSBhY3Rpb247XG4gICAgICAgICAgICAgICAgd29ya2VyLnNlbmQod29ya2VyT2JqZWN0KS50aGVuKGZ1bmN0aW9uICh3b3JrZXJTdWNjZXNzKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ3JlcG9ydCBXb3JrZXIgcHJvY2Vzc2VkIHN1Y2Nlc3NmdWxseS4nLCB3b3JrZXJTdWNjZXNzKTtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcblxuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uICh3b3JrZXJGYWlsKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdCh3b3JrZXJGYWlsKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH0sXG5cbiAgICAgICAgZ2VuZXJhdGVWaWV3OiBmdW5jdGlvbiAoZ2VuZXJhdGVWaWV3LCBfV0ZJbnN0YW5jZSwgdXVpZCkge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuXG4gICAgICAgICAgICAgICAgdmFyIHdvcmtlck9iamVjdCA9IHdvcmtlci5nZXRXb3JrZXJXcmFwcGVyKCk7XG5cbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuX2lkID0gZ2VuZXJhdGVVVUlEKCk7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmNvbW11bml0eUlkID0gYXBwLlNDT1BFLmdldENvbW11bml0eUlkKCk7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmFwcGxpY2F0aW9uSWQgPSBhcHAuU0NPUEUuYXBwbGljYXRpb25JZDtcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuY3JlYXRlZERhdGVUaW1lID0gbmV3IERhdGUoKS50b1N0cmluZygpO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5zZW5kZXJVc2VySWQgPSBMT0NBTF9TRVRUSU5HUy5TVUJTQ1JJUFRJT05TLnVzZXJJZDtcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QucHJvZmlsZUlkID0gX1dGSW5zdGFuY2UucHJvZmlsZTtcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuY2hhbm5lbHMucHVzaChcImdlbmVyYXRlVmlld1wiKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB2YXIgVmlld0NvbmZpZ1NldElkID0gZ2VuZXJhdGVWaWV3LlZpZXdDb25maWdTZXRJZDtcblxuICAgICAgICAgICAgICAgXG5cbiAgICAgICAgICAgICAgICB2YXIgVmlld0NvbmZpZ1VVSUQgPSBKU09OLnhwYXRoKFwiL3N1YnByb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgdXVpZCArIFwiJ10vaW5kaWNhdG9yc1tpZCBlcSAnXCIrIFZpZXdDb25maWdTZXRJZCArXCInXS9pbnN0YW5jZXNbMV0vdXVpZFwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHZhciBhY3Rpb24gPSB7XG4gICAgICAgICAgICAgICAgICAgIFwiZ2VuZXJhdGVWaWV3XCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidmlld0NvbmZpZ1VVSURcIjogVmlld0NvbmZpZ1VVSUQsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImFwcGxpY2F0aW9uSWRcIjogYXBwLlNDT1BFLmFwcGxpY2F0aW9uSWQsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImNvbW11bml0eUlkXCI6IGFwcC5TQ09QRS5nZXRDb21tdW5pdHlJZCgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJwcm9maWxlSWRcIjogYXBwLlNDT1BFLndvcmtmbG93LnByb2ZpbGUsXG4gICAgICAgICAgICAgICAgICAgICAgICBcInN1YlByb2Nlc3NVVUlEXCI6IHV1aWQgIFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5hY3Rpb24gPSBhY3Rpb247XG4gICAgICAgICAgICAgICAgd29ya2VyLnNlbmQod29ya2VyT2JqZWN0KS50aGVuKGZ1bmN0aW9uICh3b3JrZXJTdWNjZXNzKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ3JlcG9ydCBXb3JrZXIgcHJvY2Vzc2VkIHN1Y2Nlc3NmdWxseS4nLCB3b3JrZXJTdWNjZXNzKTtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcblxuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uICh3b3JrZXJGYWlsKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdCh3b3JrZXJGYWlsKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH1cblxuXG5cblxuICAgIH1cblxufSkoKTtcblxudmFyIHdvcmtlciA9IChmdW5jdGlvbiAoKSB7XG5cbiAgICByZXR1cm4ge1xuXG4gICAgICAgIGdldFdvcmtlcldyYXBwZXI6IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgICAgdmFyIHdyYXBwZXIgPSB7XG4gICAgICAgICAgICAgICAgXCJzb3VyY2VcIjogXCJyZW1vdGVcIixcbiAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJ3b3JrZXJPYmplY3RcIixcbiAgICAgICAgICAgICAgICBcIl9pZFwiOiBcIlwiLFxuICAgICAgICAgICAgICAgIFwiY2hhbm5lbHNcIjogW10sXG4gICAgICAgICAgICAgICAgXCJwcm9maWxlSWRcIjpcIlwiLFxuICAgICAgICAgICAgICAgIFwiY29tbXVuaXR5SWRcIjogXCJcIixcbiAgICAgICAgICAgICAgICBcImFwcGxpY2F0aW9uSWRcIjogXCJcIixcbiAgICAgICAgICAgICAgICBcIm1lc3NhZ2VcIjogXCJcIixcbiAgICAgICAgICAgICAgICBcIm1lc3NhZ2VUeXBlXCI6IFwiaW5mb1wiLFxuICAgICAgICAgICAgICAgIFwiY3JlYXRlZERhdGVUaW1lXCI6IFwiXCIsXG4gICAgICAgICAgICAgICAgXCJzZW5kZXJVc2VySWRcIjogXCJcIixcbiAgICAgICAgICAgICAgICBcImFjdGlvblwiOiB7XG5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHJldHVybiB3cmFwcGVyO1xuXG4gICAgICAgIH0sXG4gICAgICAgIHNlbmQ6IGZ1bmN0aW9uICh3b3JrZXJPYmplY3QpIHtcblxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcblxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdTdWJtaXR0aW5nIFdvcmtlciBPYmplY3QgdG8gc2VydmVyJyk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cod29ya2VyT2JqZWN0KTtcbiAgICAgICAgICAgICAgICBkYW8uc2F2ZSh3b3JrZXJPYmplY3QpLnRoZW4oZnVuY3Rpb24gKHdvcmtlclJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUod29ya2VyUmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0Vycm9yIHN1Ym1pdHRpbmcgd29ya2VyIHJlc3BvbnNlICEhJyArIGVycik7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH0sXG5cbiAgICAgICAgc2VuZFdvcmtlcjogZnVuY3Rpb24gKHdvcmtlckNvbmZpZywgX1dGSW5zdGFuY2UsIHV1aWQpIHtcblxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcblxuICAgICAgICAgICAgICAgIHZhciB3b3JrZXJPYmplY3QgPSB3b3JrZXIuZ2V0V29ya2VyV3JhcHBlcigpO1xuXG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0Ll9pZCA9IGdlbmVyYXRlVVVJRCgpO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5jb21tdW5pdHlJZCA9IGFwcC5TQ09QRS5nZXRDb21tdW5pdHlJZCgpO1xuICAgICAgICAgICAgICAgIHdvcmtlck9iamVjdC5hcHBsaWNhdGlvbklkID0gYXBwLlNDT1BFLmFwcGxpY2F0aW9uSWQ7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmNyZWF0ZWREYXRlVGltZSA9IG5ldyBEYXRlKCkudG9TdHJpbmcoKTtcbiAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3Quc2VuZGVyVXNlcklkID0gTE9DQUxfU0VUVElOR1MuU1VCU0NSSVBUSU9OUy51c2VySWQ7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LnByb2ZpbGVJZCA9IF9XRkluc3RhbmNlLnByb2ZpbGU7XG4gICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmNoYW5uZWxzLnB1c2goXCJzZW5kV29ya2VyXCIpO1xuICAgICAgICAgICAgICAgIHZhciBwcm9jZXNzR2V0Tm9kZVZhbHVlID0gZnVuY3Rpb24ocGFyYW1CbG9jaywgc2VxLCBwYXJhbU5hbWUpe1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlcywgcmVqKXtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaGVscGVyLmdldE5vZGVWYWx1ZShwYXJhbUJsb2NrLCBfV0ZJbnN0YW5jZSwgdXVpZCkudGhlbihmdW5jdGlvbiAoZGF0YVZhbHVlKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcyh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzZXFcIjpzZXEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwYXJhbU5hbWVcIjpwYXJhbU5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJkYXRhVmFsdWVcIjpkYXRhVmFsdWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqKGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB2YXIgcHJvY2Vzc1BhcmFtcyA9IGZ1bmN0aW9uKGNvbmZpZ1BhcmFtKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlcywgcmVqKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwYXJhbWV0ZXJzQXJyYXkgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpdGVtc1RvUHJvY2VzcyA9IGNvbmZpZ1BhcmFtLmxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcih2YXIgaT0wOyBpPGNvbmZpZ1BhcmFtLmxlbmd0aDsgaSsrKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcGFyYW1CbG9jayA9IGNvbmZpZ1BhcmFtW2ldLnBhcmFtZXRlclZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzZXEgPSBjb25maWdQYXJhbVtpXS5zZXE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHBhcmFtTmFtZSA9IGNvbmZpZ1BhcmFtW2ldLnBhcmFtZXRlck5hbWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHBhcmFtVmFsdWUgPSBwcm9jZXNzR2V0Tm9kZVZhbHVlKHBhcmFtQmxvY2ssIHNlcSwgcGFyYW1OYW1lKS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKXtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJhbWV0ZXJzQXJyYXkucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNlcVwiOiByZXNwb25zZS5zZXEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInBhcmFtTmFtZVwiOiByZXNwb25zZS5wYXJhbU5hbWUsIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwYXJhbVZhbHVlXCI6IHJlc3BvbnNlLmRhdGFWYWx1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1zVG9Qcm9jZXNzLS07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpdGVtc1RvUHJvY2VzcyA9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJhbWV0ZXJzQXJyYXkucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzZXFcIjogaXRlbXNUb1Byb2Nlc3MrMSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInBhcmFtTmFtZVwiOiBcImNvbW11bml0eUlkXCIsIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicGFyYW1WYWx1ZVwiOiBfV0ZJbnN0YW5jZS5jb21tdW5pdHlJZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcmFtZXRlcnNBcnJheS5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNlcVwiOiBpdGVtc1RvUHJvY2VzcysyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicGFyYW1OYW1lXCI6IFwiYXBwbGljYXRpb25JZFwiLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInBhcmFtVmFsdWVcIjogX1dGSW5zdGFuY2UuYXBwXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyYW1ldGVyc0FycmF5LnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic2VxXCI6IGl0ZW1zVG9Qcm9jZXNzKzMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwYXJhbU5hbWVcIjogXCJwcm9maWxlSWRcIiwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwYXJhbVZhbHVlXCI6IF9XRkluc3RhbmNlLnByb2ZpbGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJhbWV0ZXJzQXJyYXkucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzZXFcIjogaXRlbXNUb1Byb2Nlc3MrNCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInBhcmFtTmFtZVwiOiBcInN1YlByb2Nlc3NVVUlEXCIsIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicGFyYW1WYWx1ZVwiOiB1dWlkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzKHBhcmFtZXRlcnNBcnJheSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LGZ1bmN0aW9uKGVycil7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1zVG9Qcm9jZXNzLS07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpdGVtc1RvUHJvY2VzcyA9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJhbWV0ZXJzQXJyYXkucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzZXFcIjogaXRlbXNUb1Byb2Nlc3MrMSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInBhcmFtTmFtZVwiOiBcImNvbW11bml0eUlkXCIsIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicGFyYW1WYWx1ZVwiOiBfV0ZJbnN0YW5jZS5jb21tdW5pdHlJZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcmFtZXRlcnNBcnJheS5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNlcVwiOiBpdGVtc1RvUHJvY2VzcysyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicGFyYW1OYW1lXCI6IFwiYXBwbGljYXRpb25JZFwiLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInBhcmFtVmFsdWVcIjogX1dGSW5zdGFuY2UuYXBwXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyYW1ldGVyc0FycmF5LnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic2VxXCI6IGl0ZW1zVG9Qcm9jZXNzKzMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwYXJhbU5hbWVcIjogXCJwcm9maWxlSWRcIiwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwYXJhbVZhbHVlXCI6IF9XRkluc3RhbmNlLnByb2ZpbGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJhbWV0ZXJzQXJyYXkucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzZXFcIjogaXRlbXNUb1Byb2Nlc3MrNCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInBhcmFtTmFtZVwiOiBcInN1YlByb2Nlc3NVVUlEXCIsIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicGFyYW1WYWx1ZVwiOiB1dWlkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzKHBhcmFtZXRlcnNBcnJheSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICB2YXIgdHlwZSA9IG51bGw7XG4gICAgICAgICAgICAgICAgaWYod29ya2VyQ29uZmlnLnJlc3QgIT0gdW5kZWZpbmVkKXtcbiAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICB2YXIgY29uZmlnUGFyYW0gPSB3b3JrZXJDb25maWcucmVzdC5wYXJhbWV0ZXJzO1xuICAgICAgICAgICAgICAgICAgICBwcm9jZXNzUGFyYW1zKGNvbmZpZ1BhcmFtKS50aGVuKGZ1bmN0aW9uKHBhcmFtc0FycmF5KXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhY3Rpb249e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic2VuZFdvcmtlclwiOntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJyZXN0XCI6e1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uLnNlbmRXb3JrZXIucmVzdC51cmkgPSB3b3JrZXJDb25maWcucmVzdC51cmk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb24uc2VuZFdvcmtlci5yZXN0LnByb2ZpbElkID0gX1dGSW5zdGFuY2UucHJvZmlsZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbi5zZW5kV29ya2VyLnJlc3QucGFyYW1ldGVycyA9IHBhcmFtc0FycmF5O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB3b3JrZXJPYmplY3QuYWN0aW9uID0gYWN0aW9uO1xuICAgICAgICAgICAgICAgICAgICAgICAgd29ya2VyLnNlbmQod29ya2VyT2JqZWN0KS50aGVuKGZ1bmN0aW9uICh3b3JrZXJTdWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzcE9iamVjdCA9IEpTT04ueHBhdGgoXCIvc3VicHJvY2Vzc2VzW19pZCBlcSAnXCIrIHV1aWQgK1wiJ11cIixfV0ZJbnN0YW5jZSx7fSlbMF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3BPYmplY3Quc3BTdGF0dXMgPSAnc3VibWl0dGVkJztcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNwT2JqZWN0Lm1lc3NhZ2VzID09IHVuZGVmaW5lZCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwT2JqZWN0Lm1lc3NhZ2VzID0gW107XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwZW5kaW5nU3VibWlzc2lvbk9iamVjdCA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJtZXNzYWdlXCI6e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJpMThuXCI6e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiX2lkXCI6XCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImVuXCI6IFwiU2VydmVyIHJlcXVlc3QgaXMgcGVuZGluZ1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOlwiaW5mb1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcE9iamVjdC5tZXNzYWdlcy5wdXNoKHBlbmRpbmdTdWJtaXNzaW9uT2JqZWN0KTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBlcnNpc3REYXRhKCdzdWJwcm9jZXNzZXMnLCBhcHAuU0NPUEUud29ya2Zsb3csIHV1aWQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24oc2F2ZWQpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ1dvcmtlciBSZXN0IHByb2Nlc3NlZCBzdWNjZXNzZnVsbHkuJywgd29ya2VyU3VjY2Vzcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoc3VjY2Vzcyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihmYWlsZWQpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnV29ya2VyIHN1Ym1pdHRlZCBzdWJwcm9jZXNzIGZpbGUgdXBkYXRlIGZhaWxlZCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZmFpbGVkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKHdvcmtlckZhaWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnV29ya2VyIGZhaWxlZCAnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3Qod29ya2VyRmFpbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICB9LGZ1bmN0aW9uKGVycil7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInBhcmFtZXRlciBjcmVhdGlvbiBmYWlsZWQuIEFib3JkaW5nIHdvcmtlciBvYmplY3RcIik7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICB9IGVsc2UgaWYod29ya2VyQ29uZmlnLmZ1bmN0aW9uYWwgIT0gdW5kZWZpbmVkKSB7XG5cbiAgICAgICAgICAgICAgICAgICB2YXIgY29uZmlnUGFyYW0gPSB3b3JrZXJDb25maWcuZnVuY3Rpb25hbC5wYXJhbWV0ZXJzO1xuICAgICAgICAgICAgICAgICAgIHByb2Nlc3NQYXJhbXMoY29uZmlnUGFyYW0pLnRoZW4oZnVuY3Rpb24ocGFyYW1zQXJyYXkpe1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFjdGlvbiA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNlbmRXb3JrZXJcIjp7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZnVuY3Rpb25hbFwiOntcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbi5zZW5kV29ya2VyLmZ1bmN0aW9uYWwubWV0aG9kTmFtZSA9IHdvcmtlckNvbmZpZy5mdW5jdGlvbmFsLm1ldGhvZE5hbWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb24uc2VuZFdvcmtlci5mdW5jdGlvbmFsLnByb2ZpbElkID0gX1dGSW5zdGFuY2UucHJvZmlsZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbi5zZW5kV29ya2VyLmZ1bmN0aW9uYWwucGFyYW1ldGVycyA9IHBhcmFtc0FycmF5O1xuICAgICAgICAgICAgICAgICAgICAgICAgd29ya2VyT2JqZWN0LmFjdGlvbiA9IGFjdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdvcmtlci5zZW5kKHdvcmtlck9iamVjdCkudGhlbihmdW5jdGlvbiAod29ya2VyU3VjY2Vzcykge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNwT2JqZWN0ID0gSlNPTi54cGF0aChcIi9zdWJwcm9jZXNzZXNbX2lkIGVxICdcIisgdXVpZCArXCInXVwiLF9XRkluc3RhbmNlLHt9KVswXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcE9iamVjdC5zcFN0YXR1cyA9ICdzdWJtaXR0ZWQnO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoc3BPYmplY3QubWVzc2FnZXMgPT0gdW5kZWZpbmVkKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3BPYmplY3QubWVzc2FnZXMgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHBlbmRpbmdTdWJtaXNzaW9uT2JqZWN0ID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIm1lc3NhZ2VcIjp7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImkxOG5cIjp7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJfaWRcIjpcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZW5cIjogXCJTZXJ2ZXIgcmVxdWVzdCBpcyBwZW5kaW5nXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6XCJpbmZvXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwT2JqZWN0Lm1lc3NhZ2VzLnB1c2gocGVuZGluZ1N1Ym1pc3Npb25PYmplY3QpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGVyc2lzdERhdGEoJ3N1YnByb2Nlc3NlcycsIGFwcC5TQ09QRS53b3JrZmxvdywgdXVpZClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbihzYXZlZCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnV29ya2VyIGZ1bmN0aW9uYWwgcHJvY2Vzc2VkIHN1Y2Nlc3NmdWxseS4nLCB3b3JrZXJTdWNjZXNzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGZhaWxlZCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdXb3JrZXIgc3VibWl0dGVkIHN1YnByb2Nlc3MgZmlsZSB1cGRhdGUgZmFpbGVkJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChmYWlsZWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG5cblxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKHdvcmtlckZhaWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnV29ya2VyIGZhaWxlZCAnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3Qod29ya2VyRmFpbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICB9LGZ1bmN0aW9uKGVycil7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInBhcmFtZXRlciBjcmVhdGlvbiBmYWlsZWQuIEFib3JkaW5nIHdvcmtlciBvYmplY3RcIik7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfSxcblxuICAgICAgICBleGVjdXRlTG9jYWw6IGZ1bmN0aW9uICh3b3JrZXJDb25maWcsIF9XRkluc3RhbmNlLCB1dWlkKSB7XG5cbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG5cbiAgICAgICAgICAgICAgXG5cbiAgICAgICAgICAgICAgICB2YXIgcHJvY2Vzc0dldE5vZGVWYWx1ZSA9IGZ1bmN0aW9uKHBhcmFtQmxvY2ssIHNlcSwgZGF0YVR5cGUpe1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlcywgcmVqKXtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaGVscGVyLmdldE5vZGVWYWx1ZShwYXJhbUJsb2NrLCBfV0ZJbnN0YW5jZSwgdXVpZCkudGhlbihmdW5jdGlvbiAoZGF0YVZhbHVlKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcyh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzZXFcIjogc2VxLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZGF0YVR5cGVcIjogZGF0YVR5cGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJkYXRhVmFsdWVcIjogZGF0YVZhbHVlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlaihlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cblxuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICB2YXIgcHJvY2Vzc1BhcmFtcyA9IGZ1bmN0aW9uKGNvbmZpZ1BhcmFtKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlcywgcmVqKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwYXJhbWV0ZXJzQXJyYXkgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpdGVtc1RvUHJvY2VzcyA9IGNvbmZpZ1BhcmFtLmxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcih2YXIgaT0wOyBpPGNvbmZpZ1BhcmFtLmxlbmd0aDsgaSsrKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcGFyYW1CbG9jayA9IGNvbmZpZ1BhcmFtW2ldLnBhcmFtZXRlclZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzZXEgPSBjb25maWdQYXJhbVtpXS5zZXE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRhdGFUeXBlID0gY29uZmlnUGFyYW1baV0uZGF0YVR5cGUuZGF0YVR5cGU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHBhcmFtVmFsdWUgPSBwcm9jZXNzR2V0Tm9kZVZhbHVlKHBhcmFtQmxvY2ssIHNlcSwgZGF0YVR5cGUpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2Upe1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcmFtZXRlcnNBcnJheS5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic2VxXCI6IHJlc3BvbnNlLnNlcSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZGF0YVR5cGVcIjogcmVzcG9uc2UuZGF0YVR5cGUsIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwYXJhbVZhbHVlXCI6IHJlc3BvbnNlLmRhdGFWYWx1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1zVG9Qcm9jZXNzLS07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpdGVtc1RvUHJvY2VzcyA9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXMocGFyYW1ldGVyc0FycmF5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sZnVuY3Rpb24oZXJyKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbXNUb1Byb2Nlc3MtLTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW1zVG9Qcm9jZXNzID09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcyhwYXJhbWV0ZXJzQXJyYXkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgdmFyIGZpeFBhcmFtVHlwZSA9IGZ1bmN0aW9uKHBhcmFtVmFsdWUsIGRhdGFUeXBlKXtcblxuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKGRhdGFUeXBlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwic3RyaW5nXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHR4dCA9IHBhcmFtVmFsdWUucmVwbGFjZSgvJy9nLCBcIlxcXFwnXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBcIidcIiArIHR4dCArIFwiJ1wiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcImRhdGVcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJkYXRlVGltZVwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBcIidcIiArIHBhcmFtVmFsdWUgKyBcIidcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJudW1iZXJcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJkZWNpbWFsXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICBwYXJhbVZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIHZhciBtZXRob2ROYW1lID0gd29ya2VyQ29uZmlnLm1ldGhvZE5hbWU7XG4gICAgICAgICAgICAgICAgdmFyIGNvbmZpZ1BhcmFtID0gd29ya2VyQ29uZmlnLnBhcmFtZXRlcnM7XG4gICAgICAgICAgICAgICAgcHJvY2Vzc1BhcmFtcyhjb25maWdQYXJhbSkudGhlbihmdW5jdGlvbihwYXJhbXNBcnJheSl7XG4gICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIHZhciBwTGlzdCA9ICcnO1xuICAgICAgICAgICAgICAgICAgICBmb3IodmFyIGkgPTA7IGk8IHBhcmFtc0FycmF5Lmxlbmd0aC0xOyBpKyspe1xuICAgICAgICAgICAgICAgICAgICAgICAgcExpc3QgPSBwTGlzdCArIGZpeFBhcmFtVHlwZShwYXJhbXNBcnJheVtpXS5wYXJhbVZhbHVlLHBhcmFtc0FycmF5W2ldLmRhdGFUeXBlKSArICcsJztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBwTGlzdCA9IHBMaXN0ICsgZml4UGFyYW1UeXBlKHBhcmFtc0FycmF5W2ldLnBhcmFtVmFsdWUsIHBhcmFtc0FycmF5W2ldLmRhdGFUeXBlKVxuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNhbGxiYWNrU3VjY2VzcyA9IGZ1bmN0aW9uKCkgeyBcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKFwiRnVuY3Rpb24gJ1wiKyBtZXRob2ROYW1lICsgXCInIGV4ZWN1dGVkLiBSZXNwb25zZSBzdWNjZXNzLlwiKTtcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNhbGxiYWNrRmFpbHVyZSA9IGZ1bmN0aW9uKCkgeyBcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZWplY3QoXCJGdW5jdGlvbiAnXCIrIG1ldGhvZE5hbWUgKyBcIicgZXhlY3V0ZWQuIFJlc3BvbnNlIGZhaWxlZC5cIik7XG4gICAgICAgICAgICAgICAgICAgIH07ICAgIFxuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgdmFyIGZ1bmMgPSBtZXRob2ROYW1lKycoJysgcExpc3QgKycsY2FsbGJhY2tTdWNjZXNzLCBjYWxsYmFja0ZhaWx1cmUpJztcbiAgICAgICAgICAgICAgICAgICAgZXZhbChmdW5jKTtcbiAgICAgICAgICAgICAgICAgICAgXG5cbiAgICAgICAgICAgICAgICB9LGZ1bmN0aW9uKGVycil7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicGFyYW1ldGVyIGNyZWF0aW9uIGZhaWxlZC4gQWJvcmRpbmcgd29ya2VyIG9iamVjdFwiKTtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfVxuXG4gICAgfVxuXG59KSgpO1xuXG5cbm1vZHVsZS5leHBvcnRzID0ge1xuXG4gICAgY29tbXVuaXR5OiBjb21tdW5pdHksXG4gICAgYXBwbGljYXRpb246IGFwcGxpY2F0aW9uLFxuICAgIHBlcmZvcm1hbmNlOiBwZXJmb3JtYW5jZSxcbiAgICB3b3JrZXI6IHdvcmtlcixcbiAgICBzZG86IHNkbyxcbiAgICB0YXhvbm9teTogdGF4b25vbXksXG4gICAgc3ViUHJvY2Vzc0luc3RhbmNlOiBzdWJQcm9jZXNzSW5zdGFuY2UsXG4gICAgdmFyaWFibGVzOiB2YXJpYWJsZXMsXG4gICAgbm90aWZpY2F0aW9uOiBub3RpZmljYXRpb24sXG4gICAgcmVwb3J0OnJlcG9ydFxufSIsIid1c2Ugc3RyaWN0JztcblxuLy92YXIgZ2F0ZWtlZXBlciA9IHJlcXVpcmUoJy4uL2Jvd2VyX2NvbXBvbmVudHMvZ2F0ZWtlZXBlcicpO1xudmFyIHV0aWwgPSByZXF1aXJlKCd1dGlsaXR5Jyk7XG5cbi8vIHZhciB1dWlkID0gcmVxdWlyZSgnbm9kZS11dWlkJyk7XG5cbnZhciBnYXRla2VlcGVyID0gbmV3IEdLKCk7XG5cbi8qKlxuICogRm9ybSBNb2R1bGVcbiAqXG4gKiBAbW9kdWxlIGxpYi9mb3JtXG4gKiBAYXV0aG9yIEJyZW50IEdvcmRvblxuICogQHZlcnNpb24gMi4wLjBcbiAqIEBkZXNjcmlwdGlvbiB0ZXN0IGRlc2NyaXB0aW9uXG4gKiBAY29weXJpZ2h0IEt3YW50dSBMdGQgUlNBIDIwMDktMjAxNS5cbiAqXG4gKi9cblxuZnVuY3Rpb24gY3JlYXRlKGFyZ3MpIHtcblxuICAgIHZhciBwcm9jZXNzSWQgPSBhcmdzWzBdIHx8ICcnO1xuXG4gICAgdmFyIHN1YlByb2Nlc3MgPSBhcmdzWzFdIHx8IHt9O1xuXG4gICAgdmFyIHN0ZXAgPSBhcmdzWzJdIHx8IHt9O1xuXG4gICAgdmFyIGFjdGlvbiA9IGFyZ3NbM10gfHwge307XG5cbiAgICB2YXIgX1dGSW5zdGFuY2UgPSBhcmdzWzZdIHx8IHt9O1xuXG4gICAgdmFyIGRhdGEgPSBhcmdzWzZdIHx8IHt9O1xuXG4gICAgdmFyIGluZGljYXRvcnMgPSBzdWJQcm9jZXNzLmluZGljYXRvcnMgfHwgW107XG5cbiAgICB2YXIgcmVzdWx0ID0gW107XG5cbiAgICB2YXIgaW5kaWNhdG9yVHlwZSA9IGFjdGlvbi5fdHlwZTtcblxuICAgIHZhciBwcm9jZXNzU2VxID0gYXJnc1s0XSB8fCAnJztcblxuICAgIHZhciBzdWJQcm9jZXNzU2VxID0gYXJnc1s1XSB8fCAnJztcblxuICAgIHZhciBjcmVhdGVUeXBlID0gYXJnc1s3XSB8fCAnJztcblxuICAgIHZhciBzdWJQcm9jZXNzSWQgPSBzdWJQcm9jZXNzLl9pZDtcblxuICAgIHZhciB1dWlkID0gYXJnc1s4XSB8fCAnJztcblxuICAgIHZhciBiYXNlVVVJRCA9IGFyZ3NbOV0gfHwgJyc7XG5cbiAgICB2YXIgcHJvZmlsZSA9IF9XRkluc3RhbmNlLnByb2ZpbGU7XG5cbiAgICB2YXIgaW5wdXREYXRhID0gYXJnc1sxMF0gfHwge307XG5cbiAgICB2YXIgZm9ybUNyZWF0ZVR5cGUgPSBhY3Rpb24ubWV0aG9kLmZvcm0uY3JlYXRlO1xuXG4gICAgdmFyIGZvcm1UeXBlID0gYWN0aW9uLm1ldGhvZC5mb3JtLnR5cGU7XG5cbiAgICB2YXIgcGFyYW1PYmplY3QgPSB7XG5cbiAgICAgICAgXCJmb3JtQ3JlYXRlVHlwZVwiOiBmb3JtQ3JlYXRlVHlwZSxcbiAgICAgICAgXCJmb3JtVHlwZVwiOiBmb3JtVHlwZVxuXG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICB2YXIgdG9Qcm9jZXNzID0gaW5kaWNhdG9ycy5sZW5ndGg7XG5cbiAgICAgICAgdmFyIHN1YnByb2Nlc3NUeXBlID0gSlNPTi54cGF0aChcIi9jb25maWcvcHJvY2Vzc2VzL3N1YlByb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgc3ViUHJvY2Vzc0lkICsgXCInXS90eXBlXCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XG5cbiAgICAgICAgdmFyIGZvcm1DcmVhdGVGbiA9IGZ1bmN0aW9uKGluZGljYXRvclR5cGUsIGluZGljYXRvcklkLCB2YWxpZERhdGUsIGluc3RhbnRpYXRlU291cmNlKSB7XG5cbiAgICAgICAgICAgIGdhdGVrZWVwZXIuaW5zdGFudGlhdGUoYmFzZVVVSUQsIGluZGljYXRvclR5cGUsIGluZGljYXRvcklkLCBfV0ZJbnN0YW5jZS5wcm9maWxlLCB2YWxpZERhdGUsIHN1YlByb2Nlc3NJZCwgc3VicHJvY2Vzc1R5cGUpLnRoZW4oZnVuY3Rpb24oZG9jQXJyYXkpIHtcbiAgICAgICAgICAgICAgICAvLyBVcGRhdGUgdGhlIGluZGljYXRvciB3b3JrZmxvdyBwcm9jZXNzZXMgc2VjdGlvblxuXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkb2NBcnJheS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgb2JqZWN0ID0gZG9jQXJyYXlbaV07XG4gICAgICAgICAgICAgICAgICAgIGlmICghb2JqZWN0Lm1vZGVsLl9pZC5lbmRzV2l0aCgnOmFwcHJvdmVkJykgJiYgIW9iamVjdC5tb2RlbC5faWQuZW5kc1dpdGgoJzpyZWplY3RlZCcpKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB3b3JrZmxvd09iaiA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImlkXCI6IF9XRkluc3RhbmNlLmNvbmZpZy5faWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJpbnN0YW5jZVwiOiBfV0ZJbnN0YW5jZS5pbnN0YW5jZS5faWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwcm9jZXNzZXNcIjogW3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJpZFwiOiBwcm9jZXNzSWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic3ViUHJvY2Vzc0lkXCI6IHN1YlByb2Nlc3MuX2lkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInN1YlByb2Nlc3NVVUlEXCI6IHV1aWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic3RlcFwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImlkXCI6IHN0ZXAuaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNlcVwiOiBzdGVwLnNlcSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic3RhcnREYXRlXCI6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInN0YXR1c1wiOiBzdGVwLnN0YXR1cyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibWVzc2FnZVwiOiBzdGVwLm1lc3NhZ2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImFzc2lnbmVkVG9cIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidXNlcklkXCI6IHN0ZXAuYXNzaWduZWRUby51c2VySWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJuYW1lXCI6IHN0ZXAuYXNzaWduZWRUby5uYW1lXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjb21tZW50XCI6IHN0ZXAuY29tbWVudCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY29tcGxldGVcIjogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImVuZERhdGVcIjogXCJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYWN0aW9uLnNldFdvcmtmbG93TGFiZWxJblRpdGxlICE9IHVuZGVmaW5lZCAmJiBhY3Rpb24uc2V0V29ya2Zsb3dMYWJlbEluVGl0bGUgIT0gJycgJiYgYWN0aW9uLnNldFdvcmtmbG93TGFiZWxJblRpdGxlID09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmplY3QubW9kZWwudGl0bGUgPSBpbnB1dERhdGEubGFiZWw7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhY3Rpb24uc2V0RHJhZnQgIT0gdW5kZWZpbmVkICYmIGFjdGlvbi5zZXREcmFmdCAhPSAnJyAmJiBhY3Rpb24uc2V0RHJhZnQgPT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iamVjdC5tb2RlbC5jb250cm9sLmRyYWZ0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgb2JqZWN0Lm1vZGVsLndvcmtmbG93cy5wdXNoKHdvcmtmbG93T2JqKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBtYWluSWQgPSBvYmplY3QubW9kZWwuX2lkO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gcGVyc2lzdCB2aWEgZ2sgc28gdGhhdCBpdCBpcyBzYXZlIGluIGNvdWNoXG4gICAgICAgICAgICAgICAgICAgICAgICBnYXRla2VlcGVyLnBlcnNpc3QoZG9jQXJyYXkpLnRoZW4oZnVuY3Rpb24oc2F2ZWRBcnJheSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdXNpbmcgc2FtZSBpZCBjYWxsIGluaXRpYWxpc2VEYXRhXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9jYWxsIGNvZGUgdG8gc2V0IHRvIHNldEluc3RhbmNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGFvLmdldChtYWluSWQpLnRoZW4oZnVuY3Rpb24oZGF0YSkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpbmRpY2F0b3JNb2RlbCA9IGtvLm1hcHBpbmcuZnJvbUpTKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZGVmYXVsdE1vZGVsXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNldElkXCI6IGluZGljYXRvcklkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdhdGVrZWVwZXIuaW5zdGFudGlhdGVEYXRhKG1haW5JZCwgaW5zdGFudGlhdGVTb3VyY2UsIGluZGljYXRvck1vZGVsLCBkYXRhLm1vZGVsLnBlbmRpbmcuc2VxLCBwYXJhbU9iamVjdCkudGhlbihmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YVswXS5zdGF0dXMgPT0gXCIyMDBcIikge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFjdGlvbi5zZXRXb3JrZmxvd0xhYmVsSW5GaWVsZCAhPSB1bmRlZmluZWQgJiYgYWN0aW9uLnNldFdvcmtmbG93TGFiZWxJbkZpZWxkICE9ICcnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhc3NpZ25tZW50U2V0SWQgPSBhY3Rpb24uc2V0V29ya2Zsb3dMYWJlbEluRmllbGQuc3BsaXQoXCIuXCIpWzBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYXNzaWdubWVudFNldElkID09IGluZGljYXRvcklkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhWzBdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0eHQgPSBpbnB1dERhdGEubGFiZWw7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3F1b3RlID0gdHh0LnJlcGxhY2UoLycvZywgXCJcXFxcJ1wiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwYXRoID0gXCJkYXRhWzBdLm1vZGVsLm1vZGVsLnBlbmRpbmcuZGF0YS5cIiArIGFjdGlvbi5zZXRXb3JrZmxvd0xhYmVsSW5GaWVsZCArIFwiPSdcIiArIHNxdW90ZSArIFwiJ1wiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXZhbChwYXRoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2F0ZWtlZXBlci5wZXJzaXN0KGRhdGEpLnRoZW4oZnVuY3Rpb24oc2F2ZWRBcnJheSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYW8uZ2V0KG1haW5JZCkudGhlbihmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoX1dGSW5zdGFuY2UuaW5kaWNhdG9ycy5sZW5ndGggPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9XRkluc3RhbmNlLmluZGljYXRvcnMucHVzaChkYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b1Byb2Nlc3MtLTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodG9Qcm9jZXNzID09IDApIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwZXJzaXN0RGF0YSgnaW5kaWNhdG9ycycsIF9XRkluc3RhbmNlLCB1dWlkKS50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdGb3JtIGNyZWF0ZSBpbmRpY2F0b3IgcGVyc2lzdCBzdWNjZXNzLicsIF9XRkluc3RhbmNlLmluZGljYXRvcnMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmYWlsdXJlID0gdXRpbC5zdWNjZXNzKCdGb3JtIGNyZWF0ZSBpbmRpY2F0b3IgcGVyc2lzdCBmYWlsZWQuJyArIGVyclswXS5tZXNzYWdlLCB7fSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZmFpbHVyZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcblxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZvdW5kID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaW5kZXggPSAwOyBpbmRleCA8IF9XRkluc3RhbmNlLmluZGljYXRvcnMubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpbmRpY2F0b3IgPSBfV0ZJbnN0YW5jZS5pbmRpY2F0b3JzW2luZGV4XTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGluZGljYXRvci5faWQgPT0gZGF0YS5faWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvdW5kID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFJlbW92ZSB0aGUgY3VycmVudCBpdGVtIGZyb20gdGhlIGFycmF5IGFuZCBhZGQgdGhlIHVwZGF0ZWQgcHJvY2Vzc01vZGVsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfV0ZJbnN0YW5jZS5pbmRpY2F0b3JzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfV0ZJbnN0YW5jZS5pbmRpY2F0b3JzLnB1c2goZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b1Byb2Nlc3MtLTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0b1Byb2Nlc3MgPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBlcnNpc3REYXRhKCdpbmRpY2F0b3JzJywgX1dGSW5zdGFuY2UsIHV1aWQpLnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdGb3JtIGNyZWF0ZSBpbmRpY2F0b3IgcGVyc2lzdCBzdWNjZXNzLicsIF9XRkluc3RhbmNlLmluZGljYXRvcnMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xuICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmYWlsdXJlID0gdXRpbC5zdWNjZXNzKCdGb3JtIGNyZWF0ZSBpbmRpY2F0b3IgcGVyc2lzdCBmYWlsZWQuJyArIGVyclswXS5tZXNzYWdlLCB7fSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChmYWlsdXJlKTtcbiAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZm91bmQgPT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX1dGSW5zdGFuY2UuaW5kaWNhdG9ycy5wdXNoKGRhdGEpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvUHJvY2Vzcy0tO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodG9Qcm9jZXNzID09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBlcnNpc3REYXRhKCdpbmRpY2F0b3JzJywgX1dGSW5zdGFuY2UsIHV1aWQpLnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnRm9ybSBjcmVhdGUgaW5kaWNhdG9yIHBlcnNpc3Qgc3VjY2Vzcy4nLCBfV0ZJbnN0YW5jZS5pbmRpY2F0b3JzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xuICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZmFpbHVyZSA9IHV0aWwuc3VjY2VzcygnRm9ybSBjcmVhdGUgaW5kaWNhdG9yIHBlcnNpc3QgZmFpbGVkLicgKyBlcnJbMF0ubWVzc2FnZSwge30pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChmYWlsdXJlKTtcbiAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZhaWx1cmUgPSB1dGlsLnN1Y2Nlc3MoJzEgR2F0ZWtlZXBlciBpbml0aWFsaXNhdGlvbiBmYWlsZWQgd2l0aCBpbml0aWFsaXNlRGF0YSBtZXNzYWdlICcgKyBlcnJbMF0ubWVzc2FnZSwge30pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGZhaWx1cmUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmYWlsdXJlID0gdXRpbC5zdWNjZXNzKCcyIEdhdGVrZWVwZXIgaW5pdGlhbGlzYXRpb24gZmFpbGVkIHdpdGggaW5pdGlhbGlzZURhdGEgbWVzc2FnZSAnICsgZXJyWzBdLm1lc3NhZ2UsIHt9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGZhaWx1cmUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmYWlsdXJlID0gdXRpbC5zdWNjZXNzKCczIEdhdGVrZWVwZXIgaW5pdGlhbGlzYXRpb24gZmFpbGVkIHdpdGggaW5pdGlhbGlzZURhdGEgbWVzc2FnZSAnICsgZXJyWzBdLm1lc3NhZ2UsIHt9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZmFpbHVyZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZmFpbHVyZSA9IHV0aWwuc3VjY2VzcygnNCBHYXRla2VlcGVyIGluaXRpYWxpc2F0aW9uIGZhaWxlZCB3aXRoIGluaXRpYWxpc2VEYXRhIG1lc3NhZ2UgJyArIGVyclswXS5tZXNzYWdlLCB7fSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZmFpbHVyZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZhaWx1cmUgPSB1dGlsLnN1Y2Nlc3MoJzUgR2F0ZWtlZXBlciBpbml0aWFsaXNhdGlvbiBmYWlsZWQgd2l0aCBpbml0aWFsaXNlRGF0YSBtZXNzYWdlICcgKyBlcnJbMF0ubWVzc2FnZSwge30pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZmFpbHVyZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZmFpbHVyZSA9IHV0aWwuc3VjY2VzcygnNiBHYXRla2VlcGVyIGluaXRpYWxpc2F0aW9uIGZhaWxlZCB3aXRoIGluaXRpYWxpc2VEYXRhIG1lc3NhZ2UgJyArIGVyclswXS5tZXNzYWdlLCB7fSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGZhaWx1cmUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XG5cbiAgICAgICAgICAgICAgICB2YXIgdG9BZGRQcm9jZXNzID0gW107XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBfV0ZJbnN0YW5jZS5pbnN0YW5jZS5wcm9jZXNzZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKF9XRkluc3RhbmNlLmluc3RhbmNlLnByb2Nlc3Nlc1tpXS5zdWJQcm9jZXNzZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdG9BZGRQcm9jZXNzLnB1c2goX1dGSW5zdGFuY2UuaW5zdGFuY2UucHJvY2Vzc2VzW2ldKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgX1dGSW5zdGFuY2UuaW5zdGFuY2UucHJvY2Vzc2VzID0gW107XG4gICAgICAgICAgICAgICAgX1dGSW5zdGFuY2UuaW5zdGFuY2UucHJvY2Vzc2VzID0gdG9BZGRQcm9jZXNzO1xuXG4gICAgICAgICAgICAgICAgdmFyIHRvQWRkU3ViUHJvY2VzcyA9IFtdO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgX1dGSW5zdGFuY2Uuc3VicHJvY2Vzc2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChfV0ZJbnN0YW5jZS5zdWJwcm9jZXNzZXNbaV0uaW5kaWNhdG9ycy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0b0FkZFN1YlByb2Nlc3MucHVzaChfV0ZJbnN0YW5jZS5zdWJwcm9jZXNzZXNbaV0pO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBfV0ZJbnN0YW5jZS5zdWJwcm9jZXNzZXMgPSBbXTtcbiAgICAgICAgICAgICAgICBfV0ZJbnN0YW5jZS5zdWJwcm9jZXNzZXMgPSB0b0FkZFN1YlByb2Nlc3M7XG5cbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgICAgICAgICAgICAgdmFyIGZhaWx1cmUgPSB1dGlsLnN1Y2Nlc3MoJzcgR2F0ZWtlZXBlciBpbml0aWFsaXNhdGlvbiBmYWlsZWQgd2l0aCBpbml0aWFsaXNlRGF0YSBtZXNzYWdlICcgKyBlcnJbMF0ubWVzc2FnZSwge30pO1xuICAgICAgICAgICAgICAgIHJlamVjdChmYWlsdXJlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuXG4gICAgICAgIHZhciBpbnN0YW50aWF0ZVNvdXJjZSA9IEZST01fREVGSU5JVElPTjtcblxuICAgICAgICBmb3IgKHZhciBjb3VudGVyID0gMDsgY291bnRlciA8IGluZGljYXRvcnMubGVuZ3RoOyBjb3VudGVyKyspIHtcbiAgICAgICAgICAgIHZhciBpbmRpY2F0b3JJZCA9IGluZGljYXRvcnNbY291bnRlcl0uX2lkO1xuICAgICAgICAgICAgdmFyIGluZGljYXRvck5hbWUgPSB1dGlsLmdldE5hbWUoaW5kaWNhdG9yc1tjb3VudGVyXS5uYW1lLCAnZW4nKTtcblxuICAgICAgICAgICAgdmFyIHNvdXJjZSA9IGluZGljYXRvcnNbY291bnRlcl0uaW5pdGlhdGVEYXRhO1xuXG4gICAgICAgICAgICB2YXIgaW5pdFR5cGUgPSAnJztcbiAgICAgICAgICAgIGlmIChzdWJQcm9jZXNzLmluc3RhbmNlVHlwZS5uZXdTZXF1ZW5jZSAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBpbml0VHlwZSA9IElOU1RBTkNFX1RZUEVfTkVXX1NFUTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoc3ViUHJvY2Vzcy5pbnN0YW5jZVR5cGUubmV3SW5zdGFuY2UgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgaW5pdFR5cGUgPSBJTlNUQU5DRV9UWVBFX05FV19JTlM7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBpbmRpY2F0b3JEb2MgPSB7fTtcbiAgICAgICAgICAgIGlmIChiYXNlVVVJRCAhPSB1bmRlZmluZWQgJiYgYmFzZVVVSUQgIT0gJycgJiYgYmFzZVVVSUQubGVuZ3RoID4gMCkge1xuXG4gICAgICAgICAgICAgICAgdmFyIHNwID0gSlNPTi54cGF0aChcIi9zdWJwcm9jZXNzZXNbX2lkIGVxICdcIiArIGJhc2VVVUlEICsgXCInXVwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGlmKHN1YlByb2Nlc3MucGVyaW9kVHlwZS5wZXJpb2RpYyA9PSB1bmRlZmluZWQpe1xuXG4gICAgICAgICAgICAgICAgICAgIGlmKGJhc2VVVUlEICE9IHV1aWQpe1xuICAgICAgICAgICAgICAgICAgICAgICAgc3AuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBpbnN0YW50aWF0ZVNvdXJjZSA9IEZST01fQVVUSE9SSVNFRDtcblxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB2YXIgY2FyZGluYWxpdHkgPSBKU09OLnhwYXRoKFwiL2luZGljYXRvcnNbc2V0SWQgZXEgJ1wiICsgaW5kaWNhdG9ySWQgKyBcIiddL2NhcmRpbmFsaXR5XCIsIGFwcC5TQ09QRS5BUFBfQ09ORklHLCB7fSlbMF07XG5cbiAgICAgICAgICAgICAgICBpZiAoaW5pdFR5cGUgPT0gSU5TVEFOQ0VfVFlQRV9ORVdfSU5TKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGNhcmRpbmFsaXR5ID09IElORElDQVRPUl9DQVJESU5BTElUWV9TSU5HTEUpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGV4aXN0aW5nVVVJRCA9IEpTT04ueHBhdGgoXCIvaW5kaWNhdG9yc1tjYXRlZ29yeS90ZXJtIGVxICdcIiArIGluZGljYXRvcklkICsgXCInXS9faWRcIiwgX1dGSW5zdGFuY2UsIHt9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGV4aXN0aW5nVVVJRC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5zdGFudGlhdGVTb3VyY2UgPSBGUk9NX0FVVEhPUklTRUQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluc3RhbnRpYXRlU291cmNlID0gRlJPTV9ERUZJTklUSU9OO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaW5zdGFudGlhdGVTb3VyY2UgPSBGUk9NX0RFRklOSVRJT047XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuXG5cblxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGNhcmRpbmFsaXR5ID09IElORElDQVRPUl9DQVJESU5BTElUWV9TSU5HTEUpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGV4aXN0aW5nVVVJRCA9IEpTT04ueHBhdGgoXCIvaW5kaWNhdG9yc1tjYXRlZ29yeS90ZXJtIGVxICdcIiArIGluZGljYXRvcklkICsgXCInXS9faWRcIiwgYXBwLlNDT1BFLndvcmtmbG93LCB7fSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChleGlzdGluZ1VVSUQubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluc3RhbnRpYXRlU291cmNlID0gRlJPTV9BVVRIT1JJU0VEO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnN0YW50aWF0ZVNvdXJjZSA9IEZST01fREVGSU5JVElPTjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwYXRoID0gXCIvaW5kaWNhdG9yc1tjYXRlZ29yeS90ZXJtIGVxICdcIiArIGluZGljYXRvcklkICsgXCInIGFuZCBpZCA9IC9zdWJwcm9jZXNzZXNbaWQgPSAnXCIgKyBzdWJQcm9jZXNzSWQgKyBcIiddL2luZGljYXRvcnMvaW5zdGFuY2VzL3V1aWRdL19pZFwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHBhcnQgPSBsaWJyYXJ5LmdldFN1YnByb2ZpbGVTdWJwcm9jZXNzSWRzKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3VicHJvY2Vzc1R5cGUgPT0gUFJPQ0VTU19UWVBFX1NVQlBST0ZJTEUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXRoID0gXCIvaW5kaWNhdG9yc1tjYXRlZ29yeS90ZXJtIGVxICdcIiArIGluZGljYXRvcklkICsgXCInIGFuZCBpZCA9IC9zdWJwcm9jZXNzZXNbaWQgPSAnXCIgKyBzdWJQcm9jZXNzSWQgKyBcIicgYW5kIGlkID0gXCIrcGFydCtcIl0vaW5kaWNhdG9ycy9pbnN0YW5jZXMvdXVpZF0vX2lkXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZXhpc3RpbmdVVUlEID0gSlNPTi54cGF0aChwYXRoLCBfV0ZJbnN0YW5jZSwge30pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXhpc3RpbmdVVUlELmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnN0YW50aWF0ZVNvdXJjZSA9IEZST01fQVVUSE9SSVNFRDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5zdGFudGlhdGVTb3VyY2UgPSBGUk9NX0RFRklOSVRJT047XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuXG5cblxuICAgICAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZvcm1DcmVhdGVGbihpbml0VHlwZSwgaW5kaWNhdG9ySWQsICcnLCBpbnN0YW50aWF0ZVNvdXJjZSk7XG4gICAgICAgIH1cblxuICAgIH0pO1xufTtcblxuZnVuY3Rpb24gc2V0SW5zdGFuY2VUaXRsZShhcmdzKSB7XG5cbiAgICB2YXIgX1dGSW5zdGFuY2UgPSBhcmdzWzBdIHx8IHt9O1xuXG4gICAgdmFyIHV1aWQgPSBhcmdzWzJdIHx8ICcnO1xuICAgIHZhciBkYXRhID0gYXJnc1s0XSB8fCB7fTtcblxuICAgIHZhciB0aXRsZSA9IGRhdGEubGFiZWw7XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG5cbiAgICAgICAgdmFyIHN1YlByb2Nlc3NJbnN0YW5jZSA9IEpTT04ueHBhdGgoXCIvc3VicHJvY2Vzc2VzW19pZCBlcSAnXCIgKyB1dWlkICsgXCInXVwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xuICAgICAgICB2YXIgaW5kaWNhdG9ySW5zdGFuY2VzID0gc3ViUHJvY2Vzc0luc3RhbmNlLmluZGljYXRvcnM7XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBpbmRpY2F0b3JJbnN0YW5jZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBpbmRpY2F0b3JVVUlEID0gaW5kaWNhdG9ySW5zdGFuY2VzW2ldLmluc3RhbmNlc1swXS51dWlkO1xuICAgICAgICAgICAgdmFyIGluZGljYXRvckluc3RhbmNlID0gSlNPTi54cGF0aChcIi9pbmRpY2F0b3JzW19pZCBlcSAnXCIgKyBpbmRpY2F0b3JVVUlEICsgXCInXVwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xuICAgICAgICAgICAgaW5kaWNhdG9ySW5zdGFuY2UudGl0bGUgPSBpbmRpY2F0b3JJbnN0YW5jZXNbaV0uaWQgKyAnICcgKyB0aXRsZTtcbiAgICAgICAgfTtcblxuICAgICAgICByZXNvbHZlKFwiU2V0IFRpdGxlIFN1Y2Nlc3NcIiwgaW5kaWNhdG9ySW5zdGFuY2VzKTtcblxuICAgIH0pO1xuXG59O1xuXG5mdW5jdGlvbiBkZWxldGVQcm9maWxlKGFyZ3MpIHtcblxuICAgIHZhciBfV0ZJbnN0YW5jZSA9IGFyZ3NbMF0gfHwge307XG5cbiAgICB2YXIgcHJvZmlsZUlkID0gX1dGSW5zdGFuY2UucHJvZmlsZTtcblxuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcblxuICAgICAgICB2YXIgd29ya2VyT2JqZWN0ID0ge1xuICAgICAgICAgICAgXCJzb3VyY2VcIjogXCJyZW1vdGVcIixcbiAgICAgICAgICAgIFwidHlwZVwiOiBcIndvcmtlck9iamVjdFwiLFxuICAgICAgICAgICAgXCJfaWRcIjogZ2VuZXJhdGVVVUlEKCksXG4gICAgICAgICAgICBcImNoYW5uZWxzXCI6IFtcImRlbGV0ZVByb2ZpbGVcIl0sXG4gICAgICAgICAgICBcImNvbW11bml0eUlkXCI6IGFwcC5TQ09QRS5nZXRDb21tdW5pdHlJZCgpLFxuICAgICAgICAgICAgXCJhcHBsaWNhdGlvbklkXCI6IGFwcC5TQ09QRS5hcHBsaWNhdGlvbklkLFxuICAgICAgICAgICAgXCJwcm9maWxlSWRcIjogX1dGSW5zdGFuY2UucHJvZmlsZSxcbiAgICAgICAgICAgIFwibWVzc2FnZVwiOiBcIlwiLFxuICAgICAgICAgICAgXCJtZXNzYWdlVHlwZVwiOiBcImluZm9cIixcbiAgICAgICAgICAgIFwiY3JlYXRlZERhdGVUaW1lXCI6IG1vbWVudCgpLmZvcm1hdCgpLFxuICAgICAgICAgICAgXCJzZW5kZXJVc2VySWRcIjogTE9DQUxfU0VUVElOR1MuU1VCU0NSSVBUSU9OUy51c2VySWQsXG4gICAgICAgICAgICBcIm5vdGlmaWNhdGlvblwiOiB7XG5cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcInByb2ZpbGVcIjoge1xuICAgICAgICAgICAgICAgIFwiYWN0aW9uXCI6IFwiZGVsZXRlUHJvZmlsZVwiLFxuICAgICAgICAgICAgICAgIFwicHJvZmlsZUlkXCI6IHByb2ZpbGVJZFxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgICAgICBjb25zb2xlLmxvZyh3b3JrZXJPYmplY3QpO1xuICAgICAgICBkYW8udXBzZXJ0KHdvcmtlck9iamVjdCkudGhlbihmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIldvcmtlciBPYmplY3Qgc3VibWl0dGVkIGZvciBwcm9maWxlKFwiICsgcHJvZmlsZUlkICsgXCIpIGRlbGV0aW9uLlwiKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICAgICAgcmVzb2x2ZShkYXRhKTtcbiAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgICAgICAgcmVqZWN0KGRhdGEpO1xuICAgICAgICB9KTtcblxuICAgIH0pO1xuXG59O1xuXG5mdW5jdGlvbiBjcmVhdGVQcm9maWxlKGFyZ3MpIHtcblxuICAgIHZhciBfV0ZJbnN0YW5jZSA9IGFyZ3NbMV0gfHwge307XG5cbiAgICB2YXIgY29tbXVuaXR5SWQgPSBfV0ZJbnN0YW5jZS5jb21tdW5pdHlJZDtcbiAgICB2YXIgcHJvZmlsZUlkID0gX1dGSW5zdGFuY2UucHJvZmlsZTtcblxuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcblxuICAgICAgICBsaWJyYXJ5LmNyZWF0ZVByb2ZpbGVEb2N1bWVudHMoY29tbXVuaXR5SWQsIHByb2ZpbGVJZCkudGhlbihmdW5jdGlvbihkYXRhKSB7XG5cbiAgICAgICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdGb3JtIGNyZWF0ZWQgc3VjY2Vzc2Z1bGx5LicsIGRhdGEpO1xuICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcblxuICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcblxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgICAgICAgICAgdmFyIGZhaWx1cmUgPSB1dGlsLnN1Y2Nlc3MoJ0VSUk9SOiBQcm9maWxlIGNyZWF0aW9uIGZhaWxlZCcgKyBlcnJbMF0ubWVzc2FnZSwge30pO1xuICAgICAgICAgICAgcmVqZWN0KGZhaWx1cmUpO1xuXG4gICAgICAgIH0pO1xuXG4gICAgfSk7XG59O1xuXG5mdW5jdGlvbiBzZXREcmFmdChhcmdzKSB7XG5cbiAgICB2YXIgX1dGSW5zdGFuY2UgPSBhcmdzWzBdIHx8IHt9O1xuXG4gICAgdmFyIGNvbW11bml0eUlkID0gX1dGSW5zdGFuY2UuY29tbXVuaXR5SWQ7XG4gICAgdmFyIHByb2ZpbGVJZCA9IF9XRkluc3RhbmNlLnByb2ZpbGU7XG4gICAgdmFyIHV1aWQgPSBhcmdzWzJdIHx8ICcnO1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuXG4gICAgICAgIHZhciBzdWJQcm9jZXNzSW5zdGFuY2UgPSBKU09OLnhwYXRoKFwiL3N1YnByb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgdXVpZCArIFwiJ11cIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcbiAgICAgICAgdmFyIGluZGljYXRvckluc3RhbmNlcyA9IHN1YlByb2Nlc3NJbnN0YW5jZS5pbmRpY2F0b3JzO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaW5kaWNhdG9ySW5zdGFuY2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgaW5kaWNhdG9yVVVJRCA9IGluZGljYXRvckluc3RhbmNlc1tpXS5pbnN0YW5jZXNbMF0udXVpZDtcbiAgICAgICAgICAgIHZhciBpbmRpY2F0b3JJbnN0YW5jZSA9IEpTT04ueHBhdGgoXCIvaW5kaWNhdG9yc1tfaWQgZXEgJ1wiICsgaW5kaWNhdG9yVVVJRCArIFwiJ11cIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcbiAgICAgICAgICAgIGluZGljYXRvckluc3RhbmNlLmNvbnRyb2wuZHJhZnQgPSB0cnVlO1xuICAgICAgICB9O1xuXG4gICAgICAgIHJlc29sdmUoXCJTZXQgRHJhZnQgU3VjY2Vzc1wiLCBpbmRpY2F0b3JJbnN0YW5jZXMpO1xuXG4gICAgfSk7XG59O1xuXG5mdW5jdGlvbiBzZXRVbkRyYWZ0KGFyZ3MpIHtcblxuICAgIHZhciBfV0ZJbnN0YW5jZSA9IGFyZ3NbMF0gfHwge307XG5cbiAgICB2YXIgY29tbXVuaXR5SWQgPSBfV0ZJbnN0YW5jZS5jb21tdW5pdHlJZDtcbiAgICB2YXIgcHJvZmlsZUlkID0gX1dGSW5zdGFuY2UucHJvZmlsZTtcbiAgICB2YXIgdXVpZCA9IGFyZ3NbMl0gfHwgJyc7XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG5cbiAgICAgICAgdmFyIHN1YlByb2Nlc3NJbnN0YW5jZSA9IEpTT04ueHBhdGgoXCIvc3VicHJvY2Vzc2VzW19pZCBlcSAnXCIgKyB1dWlkICsgXCInXVwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xuICAgICAgICB2YXIgaW5kaWNhdG9ySW5zdGFuY2VzID0gc3ViUHJvY2Vzc0luc3RhbmNlLmluZGljYXRvcnM7XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBpbmRpY2F0b3JJbnN0YW5jZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBpbmRpY2F0b3JVVUlEID0gaW5kaWNhdG9ySW5zdGFuY2VzW2ldLmluc3RhbmNlc1swXS51dWlkO1xuICAgICAgICAgICAgdmFyIGluZGljYXRvckluc3RhbmNlID0gSlNPTi54cGF0aChcIi9pbmRpY2F0b3JzW19pZCBlcSAnXCIgKyBpbmRpY2F0b3JVVUlEICsgXCInXVwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xuICAgICAgICAgICAgaW5kaWNhdG9ySW5zdGFuY2UuY29udHJvbC5kcmFmdCA9IGZhbHNlO1xuICAgICAgICB9O1xuXG4gICAgICAgIHJlc29sdmUoXCJTZXQgRHJhZnQgU3VjY2Vzc1wiLCBpbmRpY2F0b3JJbnN0YW5jZXMpO1xuXG4gICAgfSk7XG59O1xuXG5mdW5jdGlvbiBzYXZlKGluZGljYXRvcikge1xuICAgIHZhciBjb21wbGV0ZWQgPSBbXTtcbiAgICB2YXIgcmVzdWx0ID0ge1xuICAgICAgICBjb21wbGV0ZTogdHJ1ZSxcbiAgICAgICAgZGF0YTogW11cbiAgICB9O1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnRm9ybSBpbmRpY2F0b3Igc2V0IHNhdmVkIHN1Y2Nlc3NmdWxseS4nLCByZXN1bHQpO1xuICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xuICAgIH0pO1xufTtcblxuZnVuY3Rpb24gc3VibWl0KGZvcm0pIHtcbiAgICB2YXIgY29tcGxldGVkID0gW107XG4gICAgdmFyIHJlc3VsdCA9IHtcbiAgICAgICAgY29tcGxldGU6IHRydWUsXG4gICAgICAgIGRhdGE6IFtdXG4gICAgfTtcblxuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ0Zvcm0gc3VibWl0dGVkIHN1Y2Nlc3NmdWxseS4nLCByZXN1bHQpO1xuICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xuICAgIH0pO1xufTtcblxuZnVuY3Rpb24gYXV0aG9yaXNlKGZvcm0pIHtcbiAgICB2YXIgY29tcGxldGVkID0gW107XG4gICAgdmFyIHJlc3VsdCA9IHtcbiAgICAgICAgY29tcGxldGU6IHRydWUsXG4gICAgICAgIGRhdGE6IFtdXG4gICAgfTtcblxuICAgIHZhciBwcm9jZXNzSWQgPSBmb3JtWzBdIHx8ICcnO1xuXG4gICAgdmFyIHN1YlByb2Nlc3MgPSBmb3JtWzFdIHx8IHt9O1xuXG4gICAgdmFyIHN1YlByb2Nlc3NJZCA9IHN1YlByb2Nlc3MuX2lkO1xuXG4gICAgdmFyIHByb2Nlc3NTZXEgPSBmb3JtWzJdIHx8ICcnO1xuXG4gICAgdmFyIHN1YlByb2Nlc3NTZXEgPSBmb3JtWzNdIHx8ICcnO1xuXG4gICAgdmFyIF9XRkluc3RhbmNlID0gZm9ybVs0XSB8fCB7fTtcblxuICAgIHZhciBzdWJQcm9jZXNzVVVJRCA9IGZvcm1bNl0gfHwgJyc7XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG5cbiAgICAgICAgLy92YXIgc3ViUHJvY2Vzc1VVSUQgPSBKU09OLnhwYXRoKFwiL3Byb2Nlc3Nlc1tpZCBlcSAnXCIgKyBwcm9jZXNzSWQgKyBcIicgYW5kIHNlcSBlcSAnXCIgKyBwcm9jZXNzU2VxICsgXCInXS9zdWJQcm9jZXNzZXNbaWQgZXEgJ1wiICsgc3ViUHJvY2Vzc0lkICsgXCInIGFuZCBzZXEgZXEgJ1wiICsgc3ViUHJvY2Vzc1NlcSArIFwiJ10vdXVpZFwiLCBfV0ZJbnN0YW5jZS5pbnN0YW5jZSwge30pWzBdO1xuICAgICAgICB2YXIgc3BJbmRpY2F0b3JzID0gSlNPTi54cGF0aChcIi9zdWJwcm9jZXNzZXNbX2lkIGVxICdcIiArIHN1YlByb2Nlc3NVVUlEICsgXCInXS9pbmRpY2F0b3JzL2luc3RhbmNlcy91dWlkXCIsIF9XRkluc3RhbmNlLCB7fSk7XG4gICAgICAgIHZhciBpdGVtc1RvUHJvY2VzcyA9IHNwSW5kaWNhdG9ycy5sZW5ndGg7XG4gICAgICAgIHZhciB1cGRhdGVkT2JqZWN0c0FycmF5ID0gW107XG4gICAgICAgIHZhciB0ZW1wQXJyYXkgPSBbXTtcblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNwSW5kaWNhdG9ycy5sZW5ndGg7IGkrKykge1xuXG4gICAgICAgICAgICBnYXRla2VlcGVyLmF1dGhvcmlzZShzcEluZGljYXRvcnNbaV0pLnRoZW4oZnVuY3Rpb24oYXV0aG9yaXNlZFJldHVybikge1xuXG4gICAgICAgICAgICAgICAgZ2F0ZWtlZXBlci5wZXJzaXN0KGF1dGhvcmlzZWRSZXR1cm4pLnRoZW4oZnVuY3Rpb24oc2F2ZWRBcnJheSkge1xuXG4gICAgICAgICAgICAgICAgICAgIHZhciB1dWlkU2F2ZWRJbmRpY2F0b3IgPSAnJztcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgYyA9IDA7IGMgPCBzYXZlZEFycmF5Lmxlbmd0aDsgYysrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXNhdmVkQXJyYXlbY10uaWQuZW5kc1dpdGgoJzphcHByb3ZlZCcpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXVpZFNhdmVkSW5kaWNhdG9yID0gc2F2ZWRBcnJheVtjXS5pZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgZGFvLmdldCh1dWlkU2F2ZWRJbmRpY2F0b3IpLnRoZW4oZnVuY3Rpb24oZGF0YSkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoX1dGSW5zdGFuY2UuaW5kaWNhdG9ycy5sZW5ndGggPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9XRkluc3RhbmNlLmluZGljYXRvcnMucHVzaChkYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtc1RvUHJvY2Vzcy0tO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpdGVtc1RvUHJvY2VzcyA9PSAwKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGVyc2lzdERhdGEoJ2luZGljYXRvcnMnLCBfV0ZJbnN0YW5jZSwgc3ViUHJvY2Vzc1VVSUQpLnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ0Zvcm0gYXV0aG9yaXNlZCBzdWNjZXNzZnVsbHkuJywgdXBkYXRlZE9iamVjdHNBcnJheSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZhaWx1cmUgPSB1dGlsLnN1Y2Nlc3MoJ0Zvcm0gYXV0aG9yaXNlZCBwZXJzaXN0IGZhaWxlZC4nICsgZXJyWzBdLm1lc3NhZ2UsIHt9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChmYWlsdXJlKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmb3VuZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGluZGV4ID0gMDsgaW5kZXggPCBfV0ZJbnN0YW5jZS5pbmRpY2F0b3JzLmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgaW5kaWNhdG9yID0gX1dGSW5zdGFuY2UuaW5kaWNhdG9yc1tpbmRleF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbmRpY2F0b3IuX2lkID09IGRhdGEuX2lkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3VuZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBSZW1vdmUgdGhlIGN1cnJlbnQgaXRlbSBmcm9tIHRoZSBhcnJheSBhbmQgYWRkIHRoZSB1cGRhdGVkIHByb2Nlc3NNb2RlbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVtcEFycmF5LnB1c2goZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL19XRkluc3RhbmNlLmluZGljYXRvcnMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vX1dGSW5zdGFuY2UuaW5kaWNhdG9ycy5wdXNoKGRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbXNUb1Byb2Nlc3MtLTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpdGVtc1RvUHJvY2VzcyA9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGluZExlbmd0aCA9IF9XRkluc3RhbmNlLmluZGljYXRvcnMubGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0ZW1wTGVuZ3RoID0gdGVtcEFycmF5Lmxlbmd0aDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcih2YXIgcCA9IDA7IHAgPCBpbmRMZW5ndGg7IHArKyl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0ZW1wT2JqPWZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IodmFyIHE9MDsgcSA8IHRlbXBMZW5ndGg7IHErKyl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihfV0ZJbnN0YW5jZS5pbmRpY2F0b3JzW3BdLl9pZCA9PSB0ZW1wQXJyYXlbcV0uX2lkKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZW1wT2JqID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZighdGVtcE9iail7IFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVtcEFycmF5LnB1c2goX1dGSW5zdGFuY2UuaW5kaWNhdG9yc1twXSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfV0ZJbnN0YW5jZS5pbmRpY2F0b3JzID0gdGVtcEFycmF5O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmb3VuZCA9PSB0cnVlICYmIGl0ZW1zVG9Qcm9jZXNzID09IDApe1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBlcnNpc3REYXRhKCdpbmRpY2F0b3JzJywgX1dGSW5zdGFuY2UsIHN1YlByb2Nlc3NVVUlEKS50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdGb3JtIGF1dGhvcmlzZWQgc3VjY2Vzc2Z1bGx5LicsIHVwZGF0ZWRPYmplY3RzQXJyYXkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmYWlsdXJlID0gdXRpbC5zdWNjZXNzKCdGb3JtIGF1dGhvcmlzZWQgcGVyc2lzdCBmYWlsZWQuJyArIGVyclswXS5tZXNzYWdlLCB7fSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZmFpbHVyZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBpdGVtc1RvUHJvY2Vzcy0tO1xuICAgICAgICAgICAgICAgIGlmIChpdGVtc1RvUHJvY2VzcyA9PSAwKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ0Zvcm0gYXV0aG9yaXNlZCBzdWNjZXNzZnVsbHkuJywgdXBkYXRlZE9iamVjdHNBcnJheSk7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoc3VjY2Vzcyk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9XG5cbiAgICB9KTtcbn07XG5cbmZ1bmN0aW9uIGNsb3NlKGZvcm0pIHtcbiAgICB2YXIgY29tcGxldGVkID0gW107XG4gICAgdmFyIHJlc3VsdCA9IHtcbiAgICAgICAgY29tcGxldGU6IHRydWUsXG4gICAgICAgIGRhdGE6IFtdXG4gICAgfTtcblxuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ0Zvcm0gY2xvc2VkIHN1Y2Nlc3NmdWxseS4nLCByZXN1bHQpO1xuICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xuICAgIH0pO1xufTtcblxuXG5cbmZ1bmN0aW9uIHVwZGF0ZUluZGljYXRvcihhcmdzKSB7XG5cbiAgICB2YXIgX1dGSW5zdGFuY2UgPSBhcmdzWzBdIHx8IHt9O1xuXG4gICAgdmFyIHV1aWQgPSBhcmdzWzFdIHx8ICcnO1xuICAgIHZhciBwYXRoID0gYXJnc1syXSB8fCAnJztcbiAgICB2YXIgZGF0YVZhbHVlID0gYXJnc1szXSB8fCAnJztcblxuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcblxuICAgICAgICB2YXIgc2V0SWQgPSBwYXRoLnNwbGl0KFwiLlwiLCAxKVswXTtcbiAgICAgICAgdmFyIGluZE9iamVjdCA9IEpTT04ueHBhdGgoXCIvaW5kaWNhdG9yc1t3b3JrZmxvd3MvcHJvY2Vzc2VzL3N1YlByb2Nlc3NVVUlEID0gJ1wiKyB1dWlkICtcIicgYW5kIGNhdGVnb3J5L3Rlcm0gPSAnXCIrIHNldElkICtcIiddXCIsIF9XRkluc3RhbmNlICx7fSlbMF07XG5cbiAgICAgICAgdmFyIHNxdW90ZSA9IGRhdGFWYWx1ZS5yZXBsYWNlKC8nL2csIFwiXFxcXCdcIik7XG4gICAgICAgIHZhciBleHByID0gXCJpbmRPYmplY3QubW9kZWwucGVuZGluZy5kYXRhLlwiICsgcGF0aCArIFwiID0gJ1wiICsgc3F1b3RlICsgXCInXCI7XG4gICAgICAgIGV2YWwoZXhwcik7XG4gICAgICAgIHZhciBpdGVtc1RvUHJvY2VzcyA9IDE7XG4gICAgICAgIHZhciBzdHVmZiA9IFtdO1xuICAgICAgICB2YXIgb2JqID0ge307XG5cbiAgICAgICAgb2JqLm1vZGVsID0gaW5kT2JqZWN0O1xuICAgICAgICBzdHVmZi5wdXNoKG9iaik7XG5cbiAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ0luZGljYXRvciB1cGRhdGVkLicsIHN0dWZmKTtcbiAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcblxuICAgIH0pO1xufTtcblxuXG5mdW5jdGlvbiB1cGRhdGVJbmRpY2F0b3JXcmFwcGVyKGFyZ3MpIHtcblxuICAgIHZhciBfV0ZJbnN0YW5jZSA9IGFyZ3NbMF0gfHwge307XG5cbiAgICB2YXIgdXVpZCA9IGFyZ3NbMV0gfHwgJyc7XG4gICAgdmFyIHBhdGggPSBhcmdzWzJdIHx8ICcnO1xuICAgIHZhciBkYXRhVmFsdWUgPSBhcmdzWzNdIHx8ICcnO1xuICAgIHZhciBpbmRpY2F0b3JTZXRJZCA9IGFyZ3NbNF0gfHwgJyc7XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG5cbiAgICAgICBcbiAgICAgICAgdmFyIGluZE9iamVjdCA9IEpTT04ueHBhdGgoXCIvaW5kaWNhdG9yc1t3b3JrZmxvd3MvcHJvY2Vzc2VzL3N1YlByb2Nlc3NVVUlEID0gJ1wiKyB1dWlkICtcIicgYW5kIGNhdGVnb3J5L3Rlcm0gPSAnXCIrIGluZGljYXRvclNldElkICtcIiddXCIsIF9XRkluc3RhbmNlICx7fSlbMF07XG5cbiAgICAgICAgXG4gICAgICAgIFxuICAgICAgICB2YXIgc3F1b3RlID0gZGF0YVZhbHVlLnJlcGxhY2UoLycvZywgXCJcXFxcJ1wiKTtcbiAgICAgICAgdmFyIGV4cHIgPSBcImluZE9iamVjdC5cIiArIHBhdGggKyBcIiA9ICdcIiArIHNxdW90ZSArIFwiJ1wiO1xuICAgICAgICBldmFsKGV4cHIpO1xuICAgICAgICB2YXIgaXRlbXNUb1Byb2Nlc3MgPSAxO1xuICAgICAgICB2YXIgc3R1ZmYgPSBbXTtcbiAgICAgICAgdmFyIG9iaiA9IHt9O1xuXG4gICAgICAgIG9iai5tb2RlbCA9IGluZE9iamVjdDtcbiAgICAgICAgc3R1ZmYucHVzaChvYmopO1xuXG4gICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdJbmRpY2F0b3IgdXBkYXRlZC4nLCBzdHVmZik7XG4gICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xuXG4gICAgfSk7XG59O1xuXG5mdW5jdGlvbiBtYXJrVXBkYXRlSW5kaWNhdG9yKGFyZ3MpIHtcblxuICAgIHZhciBfV0ZJbnN0YW5jZSA9IGFyZ3NbMF0gfHwge307XG5cbiAgICB2YXIgdXVpZCA9IGFyZ3NbMV0gfHwgJyc7XG4gICAgdmFyIHN0YXR1cyA9IGFyZ3NbMl0gfHwgJyc7XG4gICAgdmFyIGluZGljYXRvclNldElkID0gYXJnc1szXSB8fCAnJztcbiAgICBcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG5cbiAgICAgICAgdmFyIGluZE9iamVjdCA9IEpTT04ueHBhdGgoXCIvaW5kaWNhdG9yc1t3b3JrZmxvd3MvcHJvY2Vzc2VzL3N1YlByb2Nlc3NVVUlEID0gJ1wiKyB1dWlkICtcIicgYW5kIGNhdGVnb3J5L3Rlcm0gPSAnXCIrIGluZGljYXRvclNldElkICtcIiddXCIsIF9XRkluc3RhbmNlICx7fSlbMF07ICAgICAgICBcbiAgICAgICAgaW5kT2JqZWN0Lm1vZGVsLnBlbmRpbmcuc3RhdHVzID0gc3RhdHVzO1xuICAgICAgICB2YXIgaXRlbXNUb1Byb2Nlc3MgPSAxO1xuICAgICAgICB2YXIgc3R1ZmYgPSBbXTtcbiAgICAgICAgdmFyIG9iaiA9IHt9O1xuICAgICAgICBvYmoubW9kZWwgPSBpbmRPYmplY3Q7XG4gICAgICAgIHN0dWZmLnB1c2gob2JqKTtcblxuICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnSW5kaWNhdG9yIHVwZGF0ZWQuJywgc3R1ZmYpO1xuICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xuXG4gICAgfSk7XG59O1xuXG5cbmZ1bmN0aW9uIHNldFN0YXR1cyhhcmdzKSB7XG5cblxuICAgIC8vIEN1cnJlbnRseSBzZXR0aW5nIHN0YXR1cyB0byBzdWJwcm9jZXNzIGluc3RhbmNlLiBpdCBzaG91bGQgdXBkYXRlIHNvbWUgZmllbGQgaW4gYXBwUHJvZmlsZSBvciB3aGF0ZXZlciBpbmRpY2F0b3IgdGhlIHByb2ZpbGUgaGFzLlxuICAgIHZhciBfV0ZJbnN0YW5jZSA9IGFyZ3NbMF0gfHwge307XG4gICAgdmFyIHV1aWQgPSBhcmdzWzFdIHx8ICcnO1xuICAgIHZhciBzdGF0dXMgPSBhcmdzWzJdIHx8ICcnO1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuXG4gICAgICAgIHZhciBzdWJQcm9jZXNzSW5zdGFuY2UgPSBKU09OLnhwYXRoKFwiL3N1YnByb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgdXVpZCArIFwiJ11cIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcbiAgICAgICAgc3ViUHJvY2Vzc0luc3RhbmNlLnN0ZXAubWVzc2FnZSA9IHN0YXR1cztcblxuICAgICAgICByZXNvbHZlKFwiU2V0IHByb2ZpbGUgc3RhdHVzIFN1Y2Nlc3NcIiwgc3ViUHJvY2Vzc0luc3RhbmNlKTtcblxuICAgIH0pO1xuXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcblxuICAgIGNyZWF0ZTogY3JlYXRlLFxuICAgIHNhdmU6IHNhdmUsXG4gICAgc3VibWl0OiBzdWJtaXQsXG4gICAgYXV0aG9yaXNlOiBhdXRob3Jpc2UsXG4gICAgY2xvc2U6IGNsb3NlLFxuICAgIHNldERyYWZ0OiBzZXREcmFmdCxcbiAgICBzZXRVbkRyYWZ0OiBzZXRVbkRyYWZ0LFxuICAgIGNyZWF0ZVByb2ZpbGU6IGNyZWF0ZVByb2ZpbGUsXG4gICAgc2V0SW5zdGFuY2VUaXRsZTogc2V0SW5zdGFuY2VUaXRsZSxcbiAgICBkZWxldGVQcm9maWxlOiBkZWxldGVQcm9maWxlLFxuICAgIHVwZGF0ZUluZGljYXRvcjogdXBkYXRlSW5kaWNhdG9yLFxuICAgIG1hcmtVcGRhdGVJbmRpY2F0b3I6IG1hcmtVcGRhdGVJbmRpY2F0b3IsXG4gICAgdXBkYXRlSW5kaWNhdG9yV3JhcHBlcjogdXBkYXRlSW5kaWNhdG9yV3JhcHBlclxuXG59IiwiJ3VzZSBzdHJpY3QnO1xuXG5cbmZ1bmN0aW9uIGdldExhbmd1YWdlTWVzc2FnZShtZXNzYWdlKSB7XG5cbiAgICB2YXIgbGFuZ3VhZ2UgPSBzZXJ2aWNlLmdldExhbmd1YWdlKCk7XG4gICAgdmFyIHJlcyA9IGV2YWwoXCJtZXNzYWdlLmkxOG4uXCIgKyBsYW5ndWFnZSk7XG4gICAgcmV0dXJuIHJlcztcblxufTtcblxuZnVuY3Rpb24gZ2V0Tm9kZVZhbHVlKGRhdGEsIF9XRkluc3RhbmNlLCB1dWlkKSB7XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG5cbiAgICAgICAgaWYgKGRhdGEudmFsdWUgIT0gdW5kZWZpbmVkKSB7ICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB2YXIgaW5wdXREYXRhVHlwZSA9ICdzdHJpbmcnO1xuXG4gICAgICAgICAgICBpZihkYXRhLnZhbHVlLmRhdGF0eXBlLmRhdGFUeXBlICE9IHVuZGVmaW5lZCl7XG4gICAgICAgICAgICAgICAgaW5wdXREYXRhVHlwZSA9IGRhdGEudmFsdWUuZGF0YXR5cGUuZGF0YVR5cGU7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlucHV0RGF0YVR5cGUgPSBkYXRhLnZhbHVlLmRhdGF0eXBlO1xuICAgICAgICAgICAgfSBcblxuICAgICAgICAgICAgXG4gICAgICAgICAgICB2YXIgaW5wdXRWYWx1ZSA9IGRhdGEudmFsdWUuZGF0YTtcblxuICAgICAgICAgICAgaWYoaW5wdXREYXRhVHlwZSA9PSAnbnVtYmVyJyApe1xuICAgICAgICAgICAgICAgIHJlc29sdmUoTnVtYmVyKGlucHV0VmFsdWUpKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZihpbnB1dERhdGFUeXBlID09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShpbnB1dFZhbHVlKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZihpbnB1dERhdGFUeXBlID09ICdpbnRlZ2VyJyl7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShwYXJzZUludChpbnB1dFZhbHVlKSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYoaW5wdXREYXRhVHlwZSA9PSAnZGVjaW1hbCcpe1xuICAgICAgICAgICAgICAgIHJlc29sdmUocGFyc2VGbG9hdChpbnB1dFZhbHVlKSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYoaW5wdXREYXRhVHlwZSA9PSAnZGF0ZScgfHwgaW5wdXREYXRhVHlwZSA9PSAnZGF0ZVRpbWUnICl7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShpbnB1dFZhbHVlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gSW4gY2FzZSBkYXRhIHR5cGUgbm90IG1hdGNoZWRcbiAgICAgICAgICAgICAgICByZXNvbHZlKGlucHV0VmFsdWUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0gZWxzZSBpZiAoZGF0YS5pbmRpY2F0b3JVVUlEICE9IHVuZGVmaW5lZCkge1xuXG4gICAgICAgICAgICAvLyBBIGNoYW5nZSBpcyByZXF1aXJlZCB0byBtYWtlIHN1cmUgcHJvcGVyIHNjb3BlIGlzIGlkZW50aWZpZWQuXG4gICAgICAgICAgICB2YXIgaW5kaWNhdG9yVVVJRCA9IG51bGw7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHZhciBzdWJwcm9jZXNzID0gSlNPTi54cGF0aChcIi9zdWJwcm9jZXNzZXNbX2lkIGVxICdcIiArIHV1aWQgKyBcIiddXCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XG4gICAgICAgICAgICBpZihzdWJwcm9jZXNzLmluZGljYXRvcnMubGVuZ3RoID09IDApe1xuXG4gICAgICAgICAgICAgICAgaW5kaWNhdG9yVVVJRCA9IEpTT04ueHBhdGgoXCIvaW5kaWNhdG9yc1tjYXRlZ29yeS90ZXJtIGVxICdcIisgZGF0YS5pbmRpY2F0b3JVVUlELmluZGljYXRvclNldElkICtcIiddL19pZFwiLCBfV0ZJbnN0YW5jZSAsIHt9KVswXTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICAgaW5kaWNhdG9yVVVJRCA9IEpTT04ueHBhdGgoXCIvaW5kaWNhdG9yc1tpZCBlcSAnXCIgKyBkYXRhLmluZGljYXRvclVVSUQuaW5kaWNhdG9yU2V0SWQgKyBcIiddL2luc3RhbmNlcy91dWlkXCIsIHN1YnByb2Nlc3MsIHt9KVswXTtcbiAgICAgICAgICAgICAgICAgaWYoaW5kaWNhdG9yVVVJRCA9PSB1bmRlZmluZWQpe1xuICAgICAgICAgICAgICAgICAgICBpbmRpY2F0b3JVVUlEID0gSlNPTi54cGF0aChcIi9pbmRpY2F0b3JzW2NhdGVnb3J5L3Rlcm0gZXEgJ1wiKyBkYXRhLmluZGljYXRvclVVSUQuaW5kaWNhdG9yU2V0SWQgK1wiJ10vX2lkXCIsX1dGSW5zdGFuY2Use30pWzBdO1xuICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cblxuXG4gICAgICAgICAgICByZXNvbHZlKGluZGljYXRvclVVSUQpO1xuXG4gICAgICAgIH0gZWxzZSBpZiAoZGF0YS5pbmRpY2F0b3IgIT0gdW5kZWZpbmVkKSB7XG5cbiAgICAgICAgICAgIHZhciBpbmRpY2F0b3JVVUlEID0gSlNPTi54cGF0aChcIi9zdWJwcm9jZXNzZXNbX2lkIGVxICdcIiArIHV1aWQgKyBcIiddL2luZGljYXRvcnNbaWQgZXEgJ1wiICsgZGF0YS5pbmRpY2F0b3IuaW5kaWNhdG9yU2V0SWQgKyBcIiddL2luc3RhbmNlcy91dWlkXCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XG4gICAgICAgICAgICB2YXIgaW5kT2JqZWN0ID0gSlNPTi54cGF0aChcIi9pbmRpY2F0b3JzW19pZCBlcSAnXCIgKyBpbmRpY2F0b3JVVUlEICsgXCInXVwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xuICAgICAgICAgICAgdmFyIHhwYXRoID0gJy9tb2RlbC9wZW5kaW5nL2RhdGEvJyArIGRhdGEuaW5kaWNhdG9yLmluZGljYXRvclNldElkICsgJy8nICsgZGF0YS5pbmRpY2F0b3IuZWxlbWVudElkO1xuXG4gICAgICAgICAgICB2YXIgc2VxID0gSlNPTi54cGF0aChcImNvdW50KC9zdWJwcm9jZXNzZXNbX2lkIGVxICdcIiArIHV1aWQgKyBcIiddL3ByZWNlZGluZy1zaWJsaW5nOjpub2RlKClbaWQgPSAvc3VicHJvY2Vzc2VzW19pZCBlcSAnXCIgKyB1dWlkICsgXCInXS9pZF0pXCIsIF9XRkluc3RhbmNlLCB7fSlbMF0gKyAxO1xuICAgICAgICAgICAgdmFyIHN1YnByb2Nlc3NUeXBlID0gSlNPTi54cGF0aChcIi9jb25maWcvcHJvY2Vzc2VzL3N1YlByb2Nlc3Nlc1tfaWQgZXEgL3N1YnByb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgdXVpZCArIFwiJ10vaWRdL3R5cGVcIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcbiAgICAgICAgICAgIHZhciBwYXJ0ID0gbGlicmFyeS5nZXRTdWJwcm9maWxlU3VicHJvY2Vzc0lkcygpO1xuXG4gICAgICAgICAgICBpZiAoc3VicHJvY2Vzc1R5cGUgPT0gUFJPQ0VTU19UWVBFX1NVQlBST0ZJTEUpIHtcbiAgICAgICAgICAgICAgICBzZXEgPSBKU09OLnhwYXRoKFwiY291bnQoL3N1YnByb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgdXVpZCArIFwiJ10vcHJlY2VkaW5nLXNpYmxpbmc6Om5vZGUoKVtpZCA9IC9zdWJwcm9jZXNzZXNbX2lkIGVxICdcIiArIHV1aWQgKyBcIiddL2lkIGFuZCBfaWQgPSAvc3VicHJvY2Vzc2VzW19pZCA9IFwiK3BhcnQrXCJdL19pZF0pXCIsIF9XRkluc3RhbmNlLCB7fSlbMF0gKyAxO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgcmVwbGFjZWRQYXRoID0gcmVwbGFjZUFsbCh4cGF0aCwgJyNTRVFVRU5DRSMnLCBzZXEpO1xuXG4gICAgICAgICAgICB2YXIgdmFsaWREYXRlID0gSlNPTi54cGF0aChcIi9zdWJwcm9jZXNzZXNbX2lkIGVxICdcIiArIHV1aWQgKyBcIiddL2RhdGVzL3ZhbGlkXCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XG4gICAgICAgICAgICB2YXIgY29uY2F0VmFsaWREYXRlID0gXCInXCIgKyB2YWxpZERhdGUgKyBcIidcIjtcbiAgICAgICAgICAgIHZhciBuZXdQYXRoID0gcmVwbGFjZUFsbChyZXBsYWNlZFBhdGgsICcjRU5EX0RBVEUjJywgY29uY2F0VmFsaWREYXRlKTtcbiAgICAgICAgICAgIHZhciBkb3RSZXBsYWNlZCA9IHJlcGxhY2VBbGwobmV3UGF0aCwgJ1suXScsICcvJyk7XG4gICAgICAgICAgICB2YXIgcmV0VmFsdWUgPSBKU09OLnhwYXRoKGRvdFJlcGxhY2VkLCBpbmRPYmplY3QsIHt9KVswXTtcblxuICAgICAgICAgICAgcmVzb2x2ZShyZXRWYWx1ZSk7XG5cbiAgICAgICAgfSBlbHNlIGlmIChkYXRhLnN5c3RlbSAhPSB1bmRlZmluZWQpIHtcblxuICAgICAgICAgICAgcmVzb2x2ZShcIkVSUk9SOiBVbmltcGxlbWVudGVkIHN5c3RlbSB0eXBlIGZvdW5kLlwiKTtcblxuICAgICAgICB9IGVsc2UgaWYgKGRhdGEudmFyaWFibGUgIT0gdW5kZWZpbmVkKSB7XG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogXG4gICAgICAgICAgICAgKiBUYWtlbiBvdXQgb2Ygc2NoZW1hXG4gICAgICAgICAgICAgKiBcbiAgICAgICAgICAgICAgICAgICAgICAgIFwic3ViUHJvY2Vzc0luc3RhbmNlXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImRlc2NyaXB0aW9uXCI6IFwidmFsdWUgb2YgdGhlIHZhcmlhYmxlIHN1YlByb2Nlc3NJbnN0YW5jZSB2YXJpYWJsZSBjdXJyZW50IHN1YnByb2Nlc3NJbnN0YW5jZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJzdGVwXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImRlc2NyaXB0aW9uXCI6IFwidmFsdWUgb2YgdGhlIHZhcmlhYmxlIGluIHRoZSBjdXJyZW50IHN0ZXBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwic3ViUHJvY2Vzc0lkXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImRlc2NyaXB0aW9uXCI6IFwidmFsdWUgb2YgdGhlIGN1cnJlbnQgYXBwbGljYWl0b24gSURcIlxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICogXG4gICAgICAgICAgICAgKiBcbiAgICAgICAgICAgICAqIFxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBpZiAoZGF0YS52YXJpYWJsZS5wcm9maWxlICE9IHVuZGVmaW5lZCkge1xuXG4gICAgICAgICAgICAgICAgdmFyIHZhcmlhYmxlTmFtZSA9IGRhdGEudmFyaWFibGUucHJvZmlsZTtcblxuICAgICAgICAgICAgICAgIHZhciBwcm9maWxlSWQgPSBfV0ZJbnN0YW5jZS5wcm9maWxlO1xuICAgICAgICAgICAgICAgIHZhciBwcm9maWxlVmFyaWFibGVGaWxlTmFtZSA9IHByb2ZpbGVJZCArICc6dmFyaWFibGVzJztcblxuICAgICAgICAgICAgICAgIGRhby5nZXQocHJvZmlsZVZhcmlhYmxlRmlsZU5hbWUpLnRoZW4oZnVuY3Rpb24oZmlsZSkge1xuXG4gICAgICAgICAgICAgICAgICAgIHZhciBvYmogPSBldmFsKCdmaWxlLicgKyB2YXJpYWJsZU5hbWUpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2Ygb2JqID09ICdvYmplY3QnKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzZXEgPSBKU09OLnhwYXRoKFwiY291bnQoL3N1YnByb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgdXVpZCArIFwiJ10vcHJlY2VkaW5nLXNpYmxpbmc6Om5vZGUoKVtpZCA9IC9zdWJwcm9jZXNzZXNbX2lkIGVxICdcIiArIHV1aWQgKyBcIiddL2lkXSlcIiwgX1dGSW5zdGFuY2UsIHt9KVswXSArIDE7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3VicHJvY2Vzc1R5cGUgPSBKU09OLnhwYXRoKFwiL2NvbmZpZy9wcm9jZXNzZXMvc3ViUHJvY2Vzc2VzW19pZCBlcSAvc3VicHJvY2Vzc2VzW19pZCBlcSAnXCIgKyB1dWlkICsgXCInXS9pZF0vdHlwZVwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHBhcnQgPSBsaWJyYXJ5LmdldFN1YnByb2ZpbGVTdWJwcm9jZXNzSWRzKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzdWJwcm9jZXNzVHlwZSA9PSBQUk9DRVNTX1RZUEVfU1VCUFJPRklMRSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlcSA9IEpTT04ueHBhdGgoXCJjb3VudCgvc3VicHJvY2Vzc2VzW19pZCBlcSAnXCIgKyB1dWlkICsgXCInXS9wcmVjZWRpbmctc2libGluZzo6bm9kZSgpW2lkID0gL3N1YnByb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgdXVpZCArIFwiJ10vaWQgYW5kIF9pZCA9IC9zdWJwcm9jZXNzZXNbX2lkID0gXCIrcGFydCtcIl0vX2lkXSlcIiwgX1dGSW5zdGFuY2UsIHt9KVswXSArIDE7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB2YWx1ZVBhdGggPSBcIi9cIiArIHZhcmlhYmxlTmFtZSArIFwiW3NlcSBlcSAnXCIgKyBzZXEgKyBcIiddL3ZhbHVlXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmV0VmFsdWUgPSBKU09OLnhwYXRoKHZhbHVlUGF0aCwgZmlsZSwge30pWzBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXRWYWx1ZSk7XG5cblxuXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIG9iaiA9PSAnc3RyaW5nJykge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKG9iaik7XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyb3IpIHtcblxuICAgICAgICAgICAgICAgICAgICByZWplY3QoXCJFUlJPUjogUHJvZmlsZSB2YXJpYWJsZXMgbm90IGZvdW5kXCIpO1xuXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVqZWN0KFwiRVJST1I6IFVuaW1wbGVtZW50ZWQgcHJvZmlsZSB0eXBlIGZvdW5kLlwiKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9IGVsc2UgaWYgKGRhdGEuaW5kaWNhdG9yV3JhcHBlciAhPSB1bmRlZmluZWQpIHtcblxuICAgICAgICAgICAgdmFyIGluZGljYXRvclNldCA9IGRhdGEuaW5kaWNhdG9yV3JhcHBlci5pbmRpY2F0b3JTZXRJZDtcbiAgICAgICAgICAgIHZhciBpbmRpY2F0b3JVVUlEID0gSlNPTi54cGF0aChcIi9zdWJwcm9jZXNzZXNbX2lkIGVxICdcIiArIHV1aWQgKyBcIiddL2luZGljYXRvcnNbaWQgZXEgJ1wiICsgaW5kaWNhdG9yU2V0ICsgXCInXS9pbnN0YW5jZXMvdXVpZFwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xuICAgICAgICAgICAgdmFyIGluZE9iamVjdCA9IEpTT04ueHBhdGgoXCIvaW5kaWNhdG9yc1tfaWQgZXEgJ1wiICsgaW5kaWNhdG9yVVVJRCArIFwiJ11cIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcbiAgICAgICAgICAgIHZhciBlbGVtZW50cGF0aCA9IHJlcGxhY2VBbGwoZGF0YS5pbmRpY2F0b3JXcmFwcGVyLnBhdGgsXCJbLl1cIixcIi9cIilcbiAgICAgICAgICAgIHZhciB4cGF0aCA9ICcvJytlbGVtZW50cGF0aFxuICAgICAgICAgICAgdmFyIHZhbHVlID0gSlNPTi54cGF0aCh4cGF0aCwgaW5kT2JqZWN0LCB7fSlbMF07XG4gICAgICAgICAgICByZXNvbHZlKHZhbHVlKTtcblxuICAgICAgICB9IGVsc2UgaWYgKGRhdGEuY2FsY3VsYXRlZCAhPSB1bmRlZmluZWQpIHtcblxuXG4gICAgICAgICAgICB2YXIgdmFsdWUgPSAnJztcbiAgICAgICAgICAgIHZhciBzZXBhcmF0b3IgPSBkYXRhLmNhbGN1bGF0ZWQuc2VwYXJhdG9yO1xuXG4gICAgICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgZGF0YS5jYWxjdWxhdGVkLmVsZW1lbnRzLmxlbmd0aCAtIDE7IGkrKyl7XG4gICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICB2YXIgZWxlbWVudHMgPSBkYXRhLmNhbGN1bGF0ZWQuZWxlbWVudHM7XG4gICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICB2YXIgcG9zc2libGVJdGVtcyA9IFtcImVsZW1lbnRQcm9wZXJ0eVwiLFwiY29uc3RhbnRWYWx1ZVwiLFwiZWxlbWVudFdyYXBwZXJcIixcImN1cnJlbnREYXRlXCIsXCJyYW5kb21EaWdpdHNcIiwgXCJwcm9maWxlT2JqZWN0RWxlbWVudFwiLFwicHJvZmlsZU9iamVjdFdyYXBwZXJcIixcImN1cnJlbnRGaW5hbmNpYWxZZWFyXCJdO1xuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKHByb3BlcnR5RXhpc3RzKGVsZW1lbnRzW2ldLCBwb3NzaWJsZUl0ZW1zKSkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdlbGVtZW50UHJvcGVydHknOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpbmRpY2F0b3JTZXQgPSBlbGVtZW50c1tpXS5lbGVtZW50UHJvcGVydHkuaW5kaWNhdG9yU2V0SWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGluZGljYXRvclVVSUQgPSBKU09OLnhwYXRoKFwiL3N1YnByb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgdXVpZCArIFwiJ10vaW5kaWNhdG9yc1tpZCBlcSAnXCIgKyBpbmRpY2F0b3JTZXQgKyBcIiddL2luc3RhbmNlcy91dWlkXCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGluZE9iamVjdCA9IEpTT04ueHBhdGgoXCIvaW5kaWNhdG9yc1tfaWQgZXEgJ1wiICsgaW5kaWNhdG9yVVVJRCArIFwiJ11cIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZWxlbWVudHBhdGggPSByZXBsYWNlQWxsKGVsZW1lbnRzW2ldLmVsZW1lbnRQcm9wZXJ0eS5lbGVtZW50SWQsXCJbLl1cIixcIi9cIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgeHBhdGggPSAnL21vZGVsL3BlbmRpbmcvZGF0YS8nKyBpbmRpY2F0b3JTZXQgKycvJyArIGVsZW1lbnRwYXRoO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpdGVtVmFsdWUgPSBKU09OLnhwYXRoKHhwYXRoLCBpbmRPYmplY3QsIHt9KVswXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IHZhbHVlICsgaXRlbVZhbHVlICsgc2VwYXJhdG9yO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2NvbnN0YW50VmFsdWUnOlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGl0ZW1WYWx1ZSA9IGVsZW1lbnRzW2ldLmNvbnN0YW50VmFsdWUudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZSArIGl0ZW1WYWx1ZStzZXBhcmF0b3I7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2VsZW1lbnRXcmFwcGVyJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgaW5kaWNhdG9yU2V0ID0gZWxlbWVudHNbaV0uZWxlbWVudFdyYXBwZXIuaW5kaWNhdG9yU2V0SWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGluZGljYXRvclVVSUQgPSBKU09OLnhwYXRoKFwiL3N1YnByb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgdXVpZCArIFwiJ10vaW5kaWNhdG9yc1tpZCBlcSAnXCIgKyBpbmRpY2F0b3JTZXQgKyBcIiddL2luc3RhbmNlcy91dWlkXCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGluZE9iamVjdCA9IEpTT04ueHBhdGgoXCIvaW5kaWNhdG9yc1tfaWQgZXEgJ1wiICsgaW5kaWNhdG9yVVVJRCArIFwiJ11cIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZWxlbWVudHBhdGggPSByZXBsYWNlQWxsKGVsZW1lbnRzW2ldLmVsZW1lbnRXcmFwcGVyLmVsZW1lbnRJZCxcIlsuXVwiLFwiL1wiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB4cGF0aCA9ICcvJyArIGVsZW1lbnRwYXRoO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpdGVtVmFsdWUgPSBKU09OLnhwYXRoKHhwYXRoLCBpbmRPYmplY3QsIHt9KVswXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IHZhbHVlICsgaXRlbVZhbHVlK3NlcGFyYXRvcjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdjdXJyZW50RGF0ZSc6XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IHZhbHVlICsgZm9ybWF0RGF0ZShuZXcgRGF0ZSgpKStzZXBhcmF0b3I7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdyYW5kb21EaWdpdHMnOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRpZ2l0cyA9IGVsZW1lbnRzW2ldLnJhbmRvbURpZ2l0cy5kaWdpdHM7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmFuZG9tID0gTWF0aC5yYW5kb20oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBleHAgPSBNYXRoLnBvdygxMCwgZGlnaXRzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpbnRQYXJ0ID0gIChyYW5kb20gKiBleHApIF4gMFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZSArIGludFBhcnQrc2VwYXJhdG9yO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdwcm9maWxlT2JqZWN0RWxlbWVudCc6XG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgaW5kaWNhdG9yU2V0ID0gZWxlbWVudHNbaV0ucHJvZmlsZU9iamVjdEVsZW1lbnQuaW5kaWNhdG9yU2V0SWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGluZE9iamVjdCA9IEpTT04ueHBhdGgoXCIvaW5kaWNhdG9yc1tjYXRlZ29yeS90ZXJtIGVxICdhcHBQcm9maWxlJ11cIixhcHAuU0NPUEUud29ya2Zsb3cse30pWzBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBlbGVtZW50cGF0aCA9IHJlcGxhY2VBbGwoZWxlbWVudHNbaV0ucHJvZmlsZU9iamVjdEVsZW1lbnQuZWxlbWVudElkLFwiWy5dXCIsXCIvXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHhwYXRoID0gJy9tb2RlbC9wZW5kaW5nL2RhdGEvJysgaW5kaWNhdG9yU2V0ICsnLycgKyBlbGVtZW50cGF0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgaXRlbVZhbHVlID0gSlNPTi54cGF0aCh4cGF0aCwgaW5kT2JqZWN0LCB7fSlbMF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZSArIGl0ZW1WYWx1ZStzZXBhcmF0b3I7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ3Byb2ZpbGVPYmplY3RXcmFwcGVyJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpbmRpY2F0b3JTZXQgPSBlbGVtZW50c1tpXS5wcm9maWxlT2JqZWN0V3JhcHBlci5pbmRpY2F0b3JTZXRJZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgaW5kT2JqZWN0ID0gSlNPTi54cGF0aChcIi9pbmRpY2F0b3JzW2NhdGVnb3J5L3Rlcm0gZXEgJ2FwcFByb2ZpbGUnXVwiLGFwcC5TQ09QRS53b3JrZmxvdyx7fSlbMF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGVsZW1lbnRwYXRoID0gcmVwbGFjZUFsbChlbGVtZW50c1tpXS5wcm9maWxlT2JqZWN0V3JhcHBlci53cmFwcGVyRWxlbWVudElkLFwiWy5dXCIsXCIvXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHhwYXRoID0gJy8nICsgZWxlbWVudHBhdGg7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGl0ZW1WYWx1ZSA9IEpTT04ueHBhdGgoeHBhdGgsIGluZE9iamVjdCwge30pWzBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlID0gdmFsdWUgKyBpdGVtVmFsdWUrc2VwYXJhdG9yO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdjdXJyZW50RmluYW5jaWFsWWVhcic6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN0YXJ0RGF0ZSA9IGVsZW1lbnRzW2ldLmN1cnJlbnRGaW5hbmNpYWxZZWFyLnN0YXJ0RGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3RhcnRNb250aCA9IGVsZW1lbnRzW2ldLmN1cnJlbnRGaW5hbmNpYWxZZWFyLnN0YXJ0TW9udGg7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZpbmFuY2lhbFllYXIgPSBuZXcgRGF0ZSgpLmdldEZ1bGxZZWFyKCkgKyBcIi1cIiArIHN0YXJ0TW9udGggKyBcIi1cIiArIHN0YXJ0RGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IHZhbHVlICsgZmluYW5jaWFsWWVhciArIHNlcGFyYXRvcjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KFwiTm8gbWV0aG9kIGZvdW5kIGZyb20gaW1wbGVtZW50ZWQgbGlzdC5cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgIHZhciBpID0gZGF0YS5jYWxjdWxhdGVkLmVsZW1lbnRzLmxlbmd0aCAtIDE7XG4gICAgICAgICAgICAgICAgIHZhciBlbGVtZW50cyA9IGRhdGEuY2FsY3VsYXRlZC5lbGVtZW50cztcblxuICAgICAgICAgICAgICAgICAgICB2YXIgcG9zc2libGVJdGVtcyA9IFtcImVsZW1lbnRQcm9wZXJ0eVwiLFwiY29uc3RhbnRWYWx1ZVwiLFwiZWxlbWVudFdyYXBwZXJcIixcImN1cnJlbnREYXRlXCIsXCJyYW5kb21EaWdpdHNcIiwgXCJwcm9maWxlT2JqZWN0RWxlbWVudFwiLFwicHJvZmlsZU9iamVjdFdyYXBwZXJcIixcImN1cnJlbnRGaW5hbmNpYWxZZWFyXCJdO1xuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKHByb3BlcnR5RXhpc3RzKGVsZW1lbnRzW2ldLCBwb3NzaWJsZUl0ZW1zKSkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdlbGVtZW50UHJvcGVydHknOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpbmRpY2F0b3JTZXQgPSBlbGVtZW50c1tpXS5lbGVtZW50UHJvcGVydHkuaW5kaWNhdG9yU2V0SWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGluZGljYXRvclVVSUQgPSBKU09OLnhwYXRoKFwiL3N1YnByb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgdXVpZCArIFwiJ10vaW5kaWNhdG9yc1tpZCBlcSAnXCIgKyBpbmRpY2F0b3JTZXQgKyBcIiddL2luc3RhbmNlcy91dWlkXCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGluZE9iamVjdCA9IEpTT04ueHBhdGgoXCIvaW5kaWNhdG9yc1tfaWQgZXEgJ1wiICsgaW5kaWNhdG9yVVVJRCArIFwiJ11cIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZWxlbWVudHBhdGggPSByZXBsYWNlQWxsKGVsZW1lbnRzW2ldLmVsZW1lbnRQcm9wZXJ0eS5lbGVtZW50SWQsXCJbLl1cIixcIi9cIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgeHBhdGggPSAnL21vZGVsL3BlbmRpbmcvZGF0YS8nKyBpbmRpY2F0b3JTZXQgKycvJyArIGVsZW1lbnRwYXRoO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpdGVtVmFsdWUgPSBKU09OLnhwYXRoKHhwYXRoLCBpbmRPYmplY3QsIHt9KVswXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IHZhbHVlICsgaXRlbVZhbHVlIDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdjb25zdGFudFZhbHVlJzpcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpdGVtVmFsdWUgPSBlbGVtZW50c1tpXS5jb25zdGFudFZhbHVlLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlID0gdmFsdWUgKyBpdGVtVmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2VsZW1lbnRXcmFwcGVyJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgaW5kaWNhdG9yU2V0ID0gZWxlbWVudHNbaV0uZWxlbWVudFdyYXBwZXIuaW5kaWNhdG9yU2V0SWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGluZGljYXRvclVVSUQgPSBKU09OLnhwYXRoKFwiL3N1YnByb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgdXVpZCArIFwiJ10vaW5kaWNhdG9yc1tpZCBlcSAnXCIgKyBpbmRpY2F0b3JTZXQgKyBcIiddL2luc3RhbmNlcy91dWlkXCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGluZE9iamVjdCA9IEpTT04ueHBhdGgoXCIvaW5kaWNhdG9yc1tfaWQgZXEgJ1wiICsgaW5kaWNhdG9yVVVJRCArIFwiJ11cIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZWxlbWVudHBhdGggPSByZXBsYWNlQWxsKGVsZW1lbnRzW2ldLmVsZW1lbnRXcmFwcGVyLmVsZW1lbnRJZCxcIlsuXVwiLFwiL1wiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB4cGF0aCA9ICcvJyArIGVsZW1lbnRwYXRoO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpdGVtVmFsdWUgPSBKU09OLnhwYXRoKHhwYXRoLCBpbmRPYmplY3QsIHt9KVswXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IHZhbHVlICsgaXRlbVZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2N1cnJlbnREYXRlJzpcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlID0gdmFsdWUgKyBmb3JtYXREYXRlKG5ldyBEYXRlKCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAncmFuZG9tRGlnaXRzJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkaWdpdHMgPSBlbGVtZW50c1tpXS5yYW5kb21EaWdpdHMuZGlnaXRzO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJhbmRvbSA9IE1hdGgucmFuZG9tKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZXhwID0gTWF0aC5wb3coMTAsIGRpZ2l0cyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgaW50UGFydCA9ICAocmFuZG9tICogZXhwKSBeIDBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlID0gdmFsdWUgKyBpbnRQYXJ0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdwcm9maWxlT2JqZWN0RWxlbWVudCc6XG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgaW5kaWNhdG9yU2V0ID0gZWxlbWVudHNbaV0ucHJvZmlsZU9iamVjdEVsZW1lbnQuaW5kaWNhdG9yU2V0SWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGluZE9iamVjdCA9IEpTT04ueHBhdGgoXCIvaW5kaWNhdG9yc1tjYXRlZ29yeS90ZXJtIGVxICdhcHBQcm9maWxlJ11cIixhcHAuU0NPUEUud29ya2Zsb3cse30pWzBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBlbGVtZW50cGF0aCA9IHJlcGxhY2VBbGwoZWxlbWVudHNbaV0ucHJvZmlsZU9iamVjdEVsZW1lbnQuZWxlbWVudElkLFwiWy5dXCIsXCIvXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHhwYXRoID0gJy9tb2RlbC9wZW5kaW5nL2RhdGEvJysgaW5kaWNhdG9yU2V0ICsnLycgKyBlbGVtZW50cGF0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgaXRlbVZhbHVlID0gSlNPTi54cGF0aCh4cGF0aCwgaW5kT2JqZWN0LCB7fSlbMF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZSArIGl0ZW1WYWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAncHJvZmlsZU9iamVjdFdyYXBwZXInOlxuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGluZGljYXRvclNldCA9IGVsZW1lbnRzW2ldLnByb2ZpbGVPYmplY3RXcmFwcGVyLmluZGljYXRvclNldElkO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpbmRPYmplY3QgPSBKU09OLnhwYXRoKFwiL2luZGljYXRvcnNbY2F0ZWdvcnkvdGVybSBlcSAnYXBwUHJvZmlsZSddXCIsYXBwLlNDT1BFLndvcmtmbG93LHt9KVswXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZWxlbWVudHBhdGggPSByZXBsYWNlQWxsKGVsZW1lbnRzW2ldLnByb2ZpbGVPYmplY3RXcmFwcGVyLndyYXBwZXJFbGVtZW50SWQsXCJbLl1cIixcIi9cIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgeHBhdGggPSAnLycgKyBlbGVtZW50cGF0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgaXRlbVZhbHVlID0gSlNPTi54cGF0aCh4cGF0aCwgaW5kT2JqZWN0LCB7fSlbMF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZSArIGl0ZW1WYWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdjdXJyZW50RmluYW5jaWFsWWVhcic6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN0YXJ0RGF0ZSA9IGVsZW1lbnRzW2ldLmN1cnJlbnRGaW5hbmNpYWxZZWFyLnN0YXJ0RGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3RhcnRNb250aCA9IGVsZW1lbnRzW2ldLmN1cnJlbnRGaW5hbmNpYWxZZWFyLnN0YXJ0TW9udGg7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZpbmFuY2lhbFllYXIgPSBuZXcgRGF0ZSgpLmdldEZ1bGxZZWFyKCkgKyBcIi1cIiArIHN0YXJ0TW9udGggKyBcIi1cIiArIHN0YXJ0RGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IHZhbHVlICsgZmluYW5jaWFsWWVhcjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KFwiTm8gbWV0aG9kIGZvdW5kIGZyb20gaW1wbGVtZW50ZWQgbGlzdC5cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuXG5cblxuICAgICAgICAgICAgcmVzb2x2ZSh2YWx1ZSk7XG4gICAgICAgIFxuICAgICAgICB9XG5cbiAgICB9KTtcblxuXG5cbn07XG5cblxuZnVuY3Rpb24gcmVwbGFjZUFsbCh0eHQsIHJlcGxhY2UsIHdpdGhfdGhpcykge1xuICAgIGlmICh0eXBlb2YgdHh0LnJlcGxhY2UgIT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBjb25zb2xlLmxvZyhyZXBsYWNlICsgJyAnICsgd2l0aF90aGlzKTtcbiAgICAgICAgY29uc29sZS5sb2codHh0KTtcbiAgICB9XG4gICAgcmV0dXJuIHR4dC5yZXBsYWNlKG5ldyBSZWdFeHAocmVwbGFjZSwgJ2cnKSwgd2l0aF90aGlzKTtcbn1cblxuZnVuY3Rpb24gZm9ybWF0RGF0ZShkYXRlKSB7XG4gIFxuICB2YXIgZGF5ID0gZGF0ZS5nZXREYXRlKCk7XG4gIHZhciBtb250aEluZGV4ID0gZGF0ZS5nZXRNb250aCgpO1xuICB2YXIgeWVhciA9IGRhdGUuZ2V0RnVsbFllYXIoKTtcblxuICByZXR1cm4gZGF5ICsgJy0nICsgbW9udGhJbmRleCArICctJyArIHllYXI7XG59XG5cblxubW9kdWxlLmV4cG9ydHMgPSB7XG5cbiAgICBnZXRMYW5ndWFnZU1lc3NhZ2U6IGdldExhbmd1YWdlTWVzc2FnZSxcbiAgICBnZXROb2RlVmFsdWU6IGdldE5vZGVWYWx1ZVxuXG59IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbCA9IHJlcXVpcmUoJ3V0aWxpdHknKTtcblxuLyoqXG4gKiBVc2VyIEludGVyZmFjZSBNb2R1bGVcbiAqXG4gKiBAbW9kdWxlIGxpYi91aVxuICogQGF1dGhvciBCcmVudCBHb3Jkb25cbiAqIEB2ZXJzaW9uIDAuMS4wXG4gKiBAZGVzY3JpcHRpb24gdGVzdCBkZXNjcmlwdGlvblxuICpcbiAqL1xuXG4gLyoqXG4gICogR2V0IGFsbCBwcm9jZXNzIHN1Yi1wcm9jZXNzZXMgdXNlciBpbnRlcmZhY2UgZGF0YVxuICAqXG4gICogQHBhcmFtIHtzdHJpbmd9IHByb2Nlc3NJZCAtIHRoZSBXb3JrZmxvdyBjb25maWcgLyBkZWZpbml0aW9uIHByb2Nlc3MgaWRcbiAgKiBAcGFyYW0ge3N0cmluZ30gbGFuZyAtIHRoZSB1c2VyIHByZWZmZXJlZCBsYW5nYXVnZVxuICAqIEBwYXJhbSB7b2JqZWN0fSBfV0ZJbnN0YW5jZSAtIHRoZSBjdXJyZW50IHdvcmtmbG93IGNvbnN0cnVjdG9yIGluc3RhbmNlXG4gICpcbiAgKiBAZXhhbXBsZSAnJ1xuICAqXG4gICogQHJldHVybiAnJ1xuICAqXG4gICovXG4gZnVuY3Rpb24gZ2V0UHJvY2Vzcyhwcm9jZXNzSWQsIGxhbmcsIF9XRkluc3RhbmNlKXtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgIHRyeSB7XG4gICAgICB2YXIgcHJvY2Vzc01vZGVsID0gW107XG4gICAgICB2YXIgcHJvY2Vzc0luc3RhbmNlID0gW107XG4gICAgXHRfV0ZJbnN0YW5jZS5pbnN0YW5jZS5wcm9jZXNzZXMuZmlsdGVyKGZ1bmN0aW9uKHByb2Nlc3NJdGVtKXtcbiAgICBcdFx0aWYgKHByb2Nlc3NJdGVtLmlkID09IHByb2Nlc3NJZCkge1xuICAgIFx0XHRcdHByb2Nlc3NJbnN0YW5jZSA9IHByb2Nlc3NJdGVtO1xuICAgIFx0XHR9XG4gICAgXHR9KVxuICAgICAgLy8gY29uc29sZS5sb2cocHJvY2Vzc0luc3RhbmNlLnN1YlByb2Nlc3Nlcy5sZW5ndGgpO1xuICAgICAgdXRpbC5zeW5jTG9vcChwcm9jZXNzSW5zdGFuY2Uuc3ViUHJvY2Vzc2VzLmxlbmd0aCwgZnVuY3Rpb24obG9vcCl7XG4gIFx0XHRcdHZhciBjb3VudGVyID0gbG9vcC5pdGVyYXRpb24oKTtcbiAgICAgICAgdmFyIHByb2Nlc3NTZXEgPSBwcm9jZXNzSW5zdGFuY2Uuc2VxO1xuICAgICAgICB2YXIgc3ViUHJvY2Vzc0lkID0gcHJvY2Vzc0luc3RhbmNlLnN1YlByb2Nlc3Nlc1tjb3VudGVyXS5pZDtcbiAgICAgICAgdmFyIHN1YlByb2Nlc3NTZXEgPSBwcm9jZXNzSW5zdGFuY2Uuc3ViUHJvY2Vzc2VzW2NvdW50ZXJdLnNlcTtcbiAgICAgICAgZ2V0U3ViUHJvY2Vzcyhwcm9jZXNzSWQsIHByb2Nlc3NTZXEsIHN1YlByb2Nlc3NJZCwgc3ViUHJvY2Vzc1NlcSwgbGFuZywgX1dGSW5zdGFuY2UpLnRoZW4oZnVuY3Rpb24obW9kZWwpe1xuICAgICAgICAgIC8vIGNvbnNvbGUubG9nKG1vZGVsKTtcbiAgICAgICAgICBwcm9jZXNzTW9kZWwucHVzaChtb2RlbCk7XG4gICAgICAgICAgbG9vcC5uZXh0KCk7XG4gICAgICAgICAgLy8gY29uc29sZS5sb2cocHJvY2Vzc01vZGVsKTtcbiAgXHRcdFx0fSwgZnVuY3Rpb24oZXJyKXtcbiAgICAgICAgICAvLyBjb25zb2xlLmxvZyhwcm9jZXNzTW9kZWwpO1xuICBcdFx0XHRcdGxvb3AuYnJlYWsoKTtcbiAgXHRcdFx0XHRyZWplY3QoZXJyKTtcbiAgXHRcdFx0fSk7XG4gIFx0XHR9LCBmdW5jdGlvbigpe1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhwcm9jZXNzTW9kZWwpO1xuICBcdFx0XHRyZXNvbHZlKHByb2Nlc3NNb2RlbCk7XG4gIFx0XHR9KTtcbiAgICB9IGNhdGNoKGVycil7XG4gICAgICByZWplY3QoZXJyKTtcbiAgICB9XG4gIH0pXG59O1xuXG4gLyoqXG4gICogR2V0IFN1YlByb2Nlc3MgdXNlciBpbnRlcmZhY2UgZGF0YVxuICAqXG4gICogQHBhcmFtIHtzdHJpbmd9IHByb2Nlc3NJZCAtIHRoZSBXb3JrZmxvdyBjb25maWcgLyBkZWZpbml0aW9uIHByb2Nlc3MgaWRcbiAgKiBAcGFyYW0ge251bWJlcn0gcHJvY2Vzc1NlcSAtIHRoZSBXb3JrZmxvdyBpbnN0YW5jZSBwcm9jZXNzIHNlcVxuICAqIEBwYXJhbSB7c3RyaW5nfSBzdWJQcm9jZXNzSWQgLSB0aGUgV29ya2Zsb3cgY29uZmlnIC8gZGVmaW5pdGlvbiBzdWItcHJvY2VzcyBpZFxuICAqIEBwYXJhbSB7bnVtYmVyfSBzdWJQcm9jZXNzU2VxIC0gdGhlIFdvcmtmbG93IGluc3RhbmNlIHN1Yi1wcm9jZXNzIHNlcVxuICAqIEBwYXJhbSB7b2JqZWN0fSBfV0ZJbnN0YW5jZSAtIHRoZSBjdXJyZW50IHdvcmtmbG93IGNvbnN0cnVjdG9yIGluc3RhbmNlXG4gICpcbiAgKiBAZXhhbXBsZSAnJ1xuICAqXG4gICogQHJldHVybiAnJ1xuICAqXG4gICovXG5mdW5jdGlvbiBnZXRTdWJQcm9jZXNzKHByb2Nlc3NJZCwgcHJvY2Vzc1NlcSwgc3ViUHJvY2Vzc0lkLCBzdWJQcm9jZXNzU2VxLCBsYW5nLCBfV0ZJbnN0YW5jZSl7XG4gIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICB0cnkge1xuICAgICAgdmFyIG1vZGVsID0ge1xuICAgICAgICBpZDogJycsXG4gICAgICAgIHNlcTogJycsXG4gICAgICAgIG5hbWU6ICcnLFxuICAgICAgICBoZWxwOiAnJyxcbiAgICAgICAgZGF0ZXM6ICcnLFxuICAgICAgICBzdGVwOiAnJ1xuICAgICAgfTtcbiAgICAgIHZhciBzdWJQcm9jZXNzID0gW107XG4gICAgXHR2YXIgc3ViUHJvY2Vzc0NvbmYgPSBbXTtcbiAgICBcdF9XRkluc3RhbmNlLmluc3RhbmNlLnByb2Nlc3Nlcy5maWx0ZXIoZnVuY3Rpb24ocHJvY2Vzc0l0ZW0pe1xuICAgIFx0XHRpZiAocHJvY2Vzc0l0ZW0uaWQgPT0gcHJvY2Vzc0lkICYmIHByb2Nlc3NJdGVtLnNlcSA9PSBwcm9jZXNzU2VxKSB7XG4gICAgXHRcdFx0dmFyIHNwTGVuZ3RoID0gcHJvY2Vzc0l0ZW0uc3ViUHJvY2Vzc2VzLmxlbmd0aDtcbiAgICBcdFx0XHRwcm9jZXNzSXRlbS5zdWJQcm9jZXNzZXMuZmlsdGVyKGZ1bmN0aW9uKHN1YlByb2Nlc3NJdGVtKXtcbiAgICBcdFx0XHRcdGlmIChzdWJQcm9jZXNzSXRlbS5pZCA9PSBzdWJQcm9jZXNzSWQgJiYgc3ViUHJvY2Vzc0l0ZW0uc2VxID09IHN1YlByb2Nlc3NTZXEgJiYgc3ViUHJvY2Vzc0l0ZW0uY29tcGxldGUgPT0gZmFsc2UpIHtcbiAgICBcdFx0XHRcdFx0c3ViUHJvY2VzcyA9IHN1YlByb2Nlc3NJdGVtO1xuICAgIFx0XHRcdFx0fVxuICAgIFx0XHRcdH0pXG4gICAgXHRcdH1cbiAgICBcdH0pXG4gICAgXHQvLyBHZXQgdGhlIGN1cnJlbnQgc3ViUHJvY2VzcyBjb25maWd1cmF0aW9uXG4gICAgXHRfV0ZJbnN0YW5jZS5jb25maWcucHJvY2Vzc2VzLmZpbHRlcihmdW5jdGlvbihwcm9jZXNzQ29uZmlnKXtcbiAgICBcdFx0aWYgKHByb2Nlc3NDb25maWcuX2lkID09IHByb2Nlc3NJZCkge1xuICAgIFx0XHRcdHByb2Nlc3NDb25maWcuc3ViUHJvY2Vzc2VzLmZpbHRlcihmdW5jdGlvbihzdWJQcm9jZXNzQ29uZmlnKXtcbiAgICBcdFx0XHRcdGlmIChzdWJQcm9jZXNzQ29uZmlnLl9pZCA9PSBzdWJQcm9jZXNzSWQpIHtcbiAgICBcdFx0XHRcdFx0c3ViUHJvY2Vzc0NvbmYgPSBzdWJQcm9jZXNzQ29uZmlnO1xuICAgIFx0XHRcdFx0fVxuICAgIFx0XHRcdH0pXG4gICAgXHRcdH1cbiAgICBcdH0pXG4gICAgICAvLyBVcGRhdGUgdGhlIG1vZGVsXG4gICAgICBtb2RlbC5pZCA9IHN1YlByb2Nlc3NDb25mLl9pZDtcbiAgICAgIG1vZGVsLnNlcSA9IHN1YlByb2Nlc3Muc2VxO1xuICAgICAgbW9kZWwubmFtZSA9IHV0aWwuZ2V0TmFtZShzdWJQcm9jZXNzQ29uZi5uYW1lLCBsYW5nKTtcbiAgICAgIG1vZGVsLmhlbHAgPSB1dGlsLmdldE5hbWUoc3ViUHJvY2Vzc0NvbmYuaGVscCwgbGFuZyk7XG4gICAgICBtb2RlbC5kYXRlcyA9IHN1YlByb2Nlc3MuZGF0ZXM7XG4gICAgICBtb2RlbC5zdGVwID0gc3ViUHJvY2Vzcy5zdGVwO1xuICAgICAgcmVzb2x2ZShtb2RlbCk7XG4gICAgfSBjYXRjaChlcnIpIHtcbiAgICAgIHJlamVjdChlcnIpO1xuICAgIH1cbiAgfSlcbn07XG5cblxuXG5cbmZ1bmN0aW9uIHByZXBhcmVOb3RpZmljYXRpb25TY3JlZW4oKXtcblxuICBcIlwiXG59O1xuXG4gbW9kdWxlLmV4cG9ydHMgPSB7XG5cbiAgZ2V0UHJvY2VzczogZ2V0UHJvY2Vzc1xuXG4gfVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5cbmZ1bmN0aW9uIGdldCgpIHtcblxuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcblxuICAgIH0pO1xuXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcblxuICAgIGdldDogZ2V0XG5cbn0iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlsID0gcmVxdWlyZSgndXRpbGl0eScpO1xudmFyIGFjdGlvbnNNb2R1bGUgPSByZXF1aXJlKCcuL2FjdGlvbnMnKTtcbnZhciBoZWxwZXIgPSByZXF1aXJlKCcuL2hlbHBlcicpO1xudmFyIGZvcm0gPSByZXF1aXJlKCcuL2Zvcm0nKTtcblxuLyoqXG4gKiBQcm9jZXNzIE1vZHVsZVxuICpcbiAqIEBtb2R1bGUgbGliL3Byb2Nlc3NcbiAqIEBhdXRob3IgSGFzYW4gQWJiYXNcbiAqIEB2ZXJzaW9uIDAuMi4xXG4gKiBAZGVzY3JpcHRpb24gV29ya2Zsb3cgaW1wbGVtZW50YXRpb24gY2hhbmdlZCBhcyBwZXIgbmV3IHNjaGVtYSBpbXBsZW1lbnRhdGlvblxuICpcbiAqL1xuXG4vKipcbiAqIENvdW50IGFuIGFycmF5IG9mIGl0ZW1zXG4gKlxuICogQHBhcmFtIHtBcnJheX0gYXJyIC0gdGhlIGFycmF5IGRhdGFcbiAqXG4gKiBAZXhhbXBsZSAnJ1xuICpcbiAqIEByZXR1cm4gJydcbiAqXG4gKi9cbmZ1bmN0aW9uIGNvdW50KGFycikge1xuICAgIGlmIChhcnIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gYXJyLmxlbmd0aDtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gMDtcbiAgICB9XG5cbn07XG5cbi8qKlxuICogUHJvY2VzcyBwcmUtcmVxdWlzaXRlc1xuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBwcmVyZXF1aXNpdGVzIC0gdGhlIHByZS1yZXF1aXNpdGVzIGNvbmZpZyBkYXRhXG4gKlxuICogQGV4YW1wbGUgJydcbiAqXG4gKiBAcmV0dXJuICcnXG4gKlxuICovXG5mdW5jdGlvbiBwcmVSZXF1aXNpdGVzKHByZXJlcXVpc2l0ZXMsIF9XRkluc3RhbmNlLCBzcHV1aWQpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAvLyBVbmNvbW1lbnQgYmVsb3cgc2VjdGlvbiB3aGVuIHJlYWR5IHRvIGltcGxlbWVudFxuICAgICAgICB2YXIgY29tcGxldGVkID0gW107XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICB1dGlsLnN5bmNMb29wKHByZXJlcXVpc2l0ZXMubGVuZ3RoLCBmdW5jdGlvbiAobG9vcCkge1xuICAgICAgICAgICAgICAgIHZhciBjb3VudGVyID0gbG9vcC5pdGVyYXRpb24oKTtcbiAgICAgICAgICAgICAgICBwcmVSZXF1aXNpdGUocHJlcmVxdWlzaXRlc1tjb3VudGVyXSwgX1dGSW5zdGFuY2UsIHNwdXVpZCkudGhlbihmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBDaGVjayBpZiBhbGwgcHJlLXJlcXVpc2l0ZXMgY29tcGxldGVkIHN1Y2Nlc3NmdWxseS5cbiAgICAgICAgICAgICAgICAgICAgY29tcGxldGVkLnB1c2godHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIGxvb3AubmV4dCgpO1xuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgY29tcGxldGVkLnB1c2goZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICBsb29wLmJyZWFrKCk7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGlmIChjb21wbGV0ZWQuZXZlcnkoQm9vbGVhbikpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ1ByZS1yZXF1aXNpdGVzIGNvbXBsZXRlZCBzdWNjZXNzZnVsbHkuJywge30pO1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBlcnJvciA9IHV0aWwuZXJyb3IoJ1dGUHJlUmVxdWlzaXRlRXJyb3InLCAnTm90IGFsbCBwcmUtcmVxdWlzaXRlcyBwYXNzZWQuJyk7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgfVxuXG4gICAgfSk7XG59O1xuXG4vKipcbiAqIFByb2Nlc3MgcHJlLXJlcXVpc2l0ZSwgZXhlY3V0ZSB0aGUgcHJlLXJlcXVpc2l0ZSBjb25kaXRpb24uXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IHByZXJlcXVpc2l0ZSAtIHRoZSBwcmUtcmVxdWlzaXRlIGNvbmZpZyBkYXRhXG4gKiBAcGFyYW0ge29iamVjdH0gX1dGSW5zdGFuY2UgLSB0aGUgd29ya2Zsb3cgY29uc3RydWN0b3IgaW5zdGFuY2VcbiAqXG4gKiBAZXhhbXBsZVxuICogUHJvY2Vzcy5wcmVSZXF1aXNpdGUoY29uZmlnLCBjb3VudGVyLCBpbnN0YW5jZSwgZG9jKTtcbiAqXG4gKiBAcmV0dXJuICcnXG4gKlxuICovXG5mdW5jdGlvbiBwcmVSZXF1aXNpdGUocHJlcmVxdWlzaXRlLCBfV0ZJbnN0YW5jZSwgc3B1dWlkKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcblxuICAgICAgIFxuXG4gICAgICAgIGlmIChwcmVyZXF1aXNpdGUuY2hlY2subnVtYmVyUHJvY2Vzc0luc3RhbmNlcyAhPSB1bmRlZmluZWQpIHtcblxuICAgICAgICAgICAgdmFyIG51bWJlclByb2Nlc3NJbnN0YW5jZXMgPSBwcmVyZXF1aXNpdGUuY2hlY2subnVtYmVyUHJvY2Vzc0luc3RhbmNlcztcbiAgICAgICAgICAgIHZhciBfZmlsdGVyT3BlcmF0b3IgPSBudW1iZXJQcm9jZXNzSW5zdGFuY2VzLm9wZXJhdG9yO1xuICAgICAgICAgICAgdmFyIHhwYXRoT3BlcmF0b3IgPSAnJztcbiAgICAgICAgICAgIHN3aXRjaCAoX2ZpbHRlck9wZXJhdG9yKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnZ3JlYXRlclRoYW4nOlxuICAgICAgICAgICAgICAgICAgICB4cGF0aE9wZXJhdG9yID0gJ2d0JztcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnbGVzc1RoYW4nOlxuICAgICAgICAgICAgICAgICAgICB4cGF0aE9wZXJhdG9yID0gJ2x0JztcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnZ3JlYXRlclRoYW5FcXVhbCc6XG4gICAgICAgICAgICAgICAgICAgIHhwYXRoT3BlcmF0b3IgPSAnZ2UnO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdsZXNzVGhhbkVxdWFsJzpcbiAgICAgICAgICAgICAgICAgICAgeHBhdGhPcGVyYXRvciA9ICdsZSc7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2VxdWFsVG8nOlxuICAgICAgICAgICAgICAgICAgICB4cGF0aE9wZXJhdG9yID0gJ2VxJztcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnbm90RXF1YWxUbyc6XG4gICAgICAgICAgICAgICAgICAgIHhwYXRoT3BlcmF0b3IgPSAnbmUnO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIF9zdWJwcm9jZXNzSWQgPSBudW1iZXJQcm9jZXNzSW5zdGFuY2VzLnN1YlByb2Nlc3NJZDtcbiAgICAgICAgICAgIHZhciBfZmlsdGVyRWxlbWVudCA9IFwic3RlcC9zdGF0dXNcIjtcbiAgICAgICAgICAgIHZhciBfZmlsdGVyVmFsdWUgPSBudW1iZXJQcm9jZXNzSW5zdGFuY2VzLnR5cGU7XG4gICAgICAgICAgICB2YXIgaW5uZXJYcGF0aCA9IFwiL1wiICsgX2ZpbHRlckVsZW1lbnQgKyBcIlsuIGVxICdcIiArIF9maWx0ZXJWYWx1ZSArIFwiJ11cIjtcblxuICAgICAgICAgICAgdmFyIGZ1bGxQYXRoID0gXCJjb3VudCgvc3VicHJvY2Vzc2VzW2lkIGVxICdcIiArIF9zdWJwcm9jZXNzSWQgKyBcIiddXCIgKyBpbm5lclhwYXRoICsgXCIpXCI7XG5cbiAgICAgICAgICAgIHZhciBwcmVyZXFQcm9jZXNzVHlwZSA9IEpTT04ueHBhdGgoXCIvY29uZmlnL3Byb2Nlc3Nlcy9zdWJQcm9jZXNzZXNbX2lkIGVxICdcIiArIF9zdWJwcm9jZXNzSWQgKyBcIiddL3R5cGVcIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcbiAgICAgICAgICAgIHZhciBwYXJ0ID0gbGlicmFyeS5nZXRTdWJwcm9maWxlU3VicHJvY2Vzc0lkcygpO1xuXG4gICAgICAgICAgICBpZiAoYXBwLnByb2ZpbGUuc3VicHJvZmlsZUlkICE9IHVuZGVmaW5lZCAmJiBhcHAucHJvZmlsZS5zdWJwcm9maWxlSWQgIT0gJycgJiYgcHJlcmVxUHJvY2Vzc1R5cGUgIT0gdW5kZWZpbmVkICYmIHByZXJlcVByb2Nlc3NUeXBlID09IFBST0NFU1NfVFlQRV9TVUJQUk9GSUxFKSB7XG4gICAgICAgICAgICAgICAgZnVsbFBhdGggPSBcImNvdW50KC9zdWJwcm9jZXNzZXNbaWQgZXEgJ1wiICsgX3N1YnByb2Nlc3NJZCArIFwiJyBhbmQgX2lkID0gXCIrcGFydCtcIl1cIiArIGlubmVyWHBhdGggKyBcIilcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgXG4gICAgICAgICAgICB2YXIgc3ViamVjdENvdW50ID0gSlNPTi54cGF0aChmdWxsUGF0aCwgX1dGSW5zdGFuY2UsIHt9KVswXTtcbiAgICAgICAgICAgIHZhciBjb3VudFZhbHVlID0gcHJlcmVxdWlzaXRlLmNoZWNrLm51bWJlclByb2Nlc3NJbnN0YW5jZXMuY291bnQ7XG4gICAgICAgICAgICB2YXIgY29tcGFyZSA9IHV0aWwuY29tcGFyZShzdWJqZWN0Q291bnQsIHByZXJlcXVpc2l0ZS5jaGVjay5udW1iZXJQcm9jZXNzSW5zdGFuY2VzLm9wZXJhdG9yLCBwYXJzZUludChjb3VudFZhbHVlKSk7XG5cblxuICAgICAgICAgICAgaWYgKGNvbXBhcmUpIHtcbiAgICAgICAgICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnUHJlLXJlcXVpc2l0ZXMgcGFzc2VkLicsIHt9KTtcbiAgICAgICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xuICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgIHZhciBtZXNzYWdlID0gaGVscGVyLmdldExhbmd1YWdlTWVzc2FnZShwcmVyZXF1aXNpdGUubWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgdmFyIGVycm9yID0gdXRpbC5lcnJvcignV0ZQcmVSZXF1aXNpdGVFcnJvcicsIG1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgICB9XG5cblxuICAgICAgICB9IGVsc2UgaWYgKHByZXJlcXVpc2l0ZS5jaGVjay52YXJpYWJsZSAhPSB1bmRlZmluZWQpIHtcblxuICAgICAgICAgICAgdmFyIHNjb3BlID0gcHJlcmVxdWlzaXRlLmNoZWNrLnZhcmlhYmxlLnNjb3BlO1xuICAgICAgICAgICAgdmFyIGZpbGVOYW1lID0gJyc7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmKHNjb3BlICA9PSBcInByb2ZpbGVcIil7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgdmFyIHByb2ZpbGVJZCA9IF9XRkluc3RhbmNlLnByb2ZpbGU7XG4gICAgICAgICAgICAgICAgZmlsZU5hbWUgPSBwcm9maWxlSWQgKyAnOnZhcmlhYmxlcyc7XG5cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoc2NvcGUgID09IFwic3ViUHJvZmlsZVN1YlByb2Nlc3NJbnN0YW5jZVwiKSB7XG5cbiAgICAgICAgICAgICAgICB2YXIgc3ViUHJvZmlsZUlkID0gYXBwLnByb2ZpbGUuc3VicHJvZmlsZUlkO1xuICAgICAgICAgICAgICAgIGZpbGVOYW1lID0gc3ViUHJvZmlsZUlkICsgJzp2YXJpYWJsZXMnO1xuXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJlamVjdChcIkVSUk9SOiBTY29wZSAnXCIrIHNjb3BlICtcIicgbm90IGltcGxlbWVudGVkIGluIHByZS1yZXF1aXNpdGVzXCIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBkYW8uZ2V0KGZpbGVOYW1lKS50aGVuKGZ1bmN0aW9uKGZpbGUpIHtcblxuICAgICAgICAgICAgICAgIHZhciB2YXJpYWJsZU5hbWUgPSBwcmVyZXF1aXNpdGUuY2hlY2sudmFyaWFibGUubmFtZTtcbiAgICAgICAgICAgICAgICB2YXIgb2JqID0gZXZhbCgnZmlsZS4nICsgdmFyaWFibGVOYW1lKTtcbiAgICAgICAgICAgICAgICB2YXIgc3ViamVjdFZhbHVlQ2FsY3VsYXRlZDtcblxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2Ygb2JqID09ICdvYmplY3QnKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIHNlcSA9IEpTT04ueHBhdGgoXCJjb3VudCgvc3VicHJvY2Vzc2VzW19pZCBlcSAnXCIgKyBzcHV1aWQgKyBcIiddL3ByZWNlZGluZy1zaWJsaW5nOjpub2RlKClbaWQgPSAvc3VicHJvY2Vzc2VzW19pZCBlcSAnXCIgKyBzcHV1aWQgKyBcIiddL2lkXSlcIiwgX1dGSW5zdGFuY2UsIHt9KVswXSArIDE7XG4gICAgICAgICAgICAgICAgICAgIHZhciBzdWJwcm9jZXNzVHlwZSA9IEpTT04ueHBhdGgoXCIvY29uZmlnL3Byb2Nlc3Nlcy9zdWJQcm9jZXNzZXNbX2lkIGVxIC9zdWJwcm9jZXNzZXNbX2lkIGVxICdcIiArIHNwdXVpZCArIFwiJ10vaWRdL3R5cGVcIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBhcnQgPSBsaWJyYXJ5LmdldFN1YnByb2ZpbGVTdWJwcm9jZXNzSWRzKCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzdWJwcm9jZXNzVHlwZSA9PSBQUk9DRVNTX1RZUEVfU1VCUFJPRklMRSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VxID0gSlNPTi54cGF0aChcImNvdW50KC9zdWJwcm9jZXNzZXNbX2lkIGVxICdcIiArIHNwdXVpZCArIFwiJ10vcHJlY2VkaW5nLXNpYmxpbmc6Om5vZGUoKVtpZCA9IC9zdWJwcm9jZXNzZXNbX2lkIGVxICdcIiArIHNwdXVpZCArIFwiJ10vaWQgYW5kIF9pZCA9IC9zdWJwcm9jZXNzZXNbX2lkID0gXCIrcGFydCtcIl0vX2lkXSlcIiwgX1dGSW5zdGFuY2UsIHt9KVswXSArIDE7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdmFyIHZhbHVlUGF0aCA9IFwiL1wiICsgdmFyaWFibGVOYW1lICsgXCJbc2VxIGVxICdcIiArIHNlcSArIFwiJ10vdmFsdWVcIjtcbiAgICAgICAgICAgICAgICAgICAgc3ViamVjdFZhbHVlQ2FsY3VsYXRlZCA9IEpTT04ueHBhdGgodmFsdWVQYXRoLCBmaWxlLCB7fSlbMF07XG5cbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBvYmogPT0gJ3N0cmluZycpIHtcblxuICAgICAgICAgICAgICAgICAgICBzdWJqZWN0VmFsdWVDYWxjdWxhdGVkID0gb2JqO1xuXG4gICAgICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgICAgICB2YXIgaW5wdXRWYWx1ZSA9IHByZXJlcXVpc2l0ZS5jaGVjay52YXJpYWJsZS52YWx1ZS5kYXRhO1xuICAgICAgICAgICAgICAgIHZhciBpbnB1dERhdGFUeXBlID0gcHJlcmVxdWlzaXRlLmNoZWNrLnZhcmlhYmxlLnZhbHVlLmRhdGFUeXBlLmRhdGFUeXBlO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHZhciBmaW5hbFZhbHVlO1xuICAgICAgICAgICAgICAgIGlmKGlucHV0RGF0YVR5cGUgPT0gJ251bWJlcicgKXtcbiAgICAgICAgICAgICAgICAgICAgZmluYWxWYWx1ZSA9IE51bWJlcihpbnB1dFZhbHVlKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYoaW5wdXREYXRhVHlwZSA9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgICAgICBmaW5hbFZhbHVlID0gaW5wdXRWYWx1ZTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYoaW5wdXREYXRhVHlwZSA9PSAnaW50ZWdlcicpe1xuICAgICAgICAgICAgICAgICAgICBmaW5hbFZhbHVlID0gcGFyc2VJbnQoaW5wdXRWYWx1ZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKGlucHV0RGF0YVR5cGUgPT0gJ2RlY2ltYWwnKXtcbiAgICAgICAgICAgICAgICAgICAgZmluYWxWYWx1ZSA9IHBhcnNlRmxvYXQoaW5wdXRWYWx1ZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKGlucHV0RGF0YVR5cGUgPT0gJ2RhdGUnIHx8IGlucHV0RGF0YVR5cGUgPT0gJ2RhdGVUaW1lJyApe1xuICAgICAgICAgICAgICAgICAgICBmaW5hbFZhbHVlID0gaW5wdXRWYWx1ZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB2YXIgY29tcGFyZSA9IHV0aWwuY29tcGFyZShzdWJqZWN0VmFsdWVDYWxjdWxhdGVkLCBwcmVyZXF1aXNpdGUuY2hlY2sudmFyaWFibGUub3BlcmF0b3IsIGZpbmFsVmFsdWUpO1xuICAgICAgICAgICAgICAgIGlmIChjb21wYXJlKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdWYXJpYWJsZSBQcmUtcmVxdWlzaXRlcyBwYXNzZWQuJywge30pO1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBoZWxwZXIuZ2V0TGFuZ3VhZ2VNZXNzYWdlKHByZXJlcXVpc2l0ZS5tZXNzYWdlKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGVycm9yID0gdXRpbC5lcnJvcignV0ZQcmVSZXF1aXNpdGVFcnJvcicsIG1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycm9yKSB7XG5cbiAgICAgICAgICAgICAgICB2YXIgbWVzc2FnZSA9IGhlbHBlci5nZXRMYW5ndWFnZU1lc3NhZ2UocHJlcmVxdWlzaXRlLm1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgIHZhciBlcnJvciA9IHV0aWwuZXJyb3IoJ1dGUHJlUmVxdWlzaXRlRXJyb3I6JywgbWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcblxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgdmFyIGVycm9yID0gdXRpbC5lcnJvcignV0ZQcmVSZXF1aXNpdGVFcnJvcicsICdQcmUtcmVxdWlzaXRlIHR5cGUgbm90IGRlZmluZWQuJyk7XG4gICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuXG4gICAgICAgIH1cblxuICAgICAgIFxuXG4gICAgfSk7XG59O1xuXG4vKipcbiAqIFByb2Nlc3MgcHJlLWFjdGlvbnNzXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IHByZUFjdGlvbnMgLSB0aGUgcHJlLWFjdGlvbnMgY29uZmlnIGRhdGFcbiAqIEBwYXJhbSB7b2JqZWN0fSBfV0ZJbnN0YW5jZSAtIHRoZSBjdXJyZW50IHdvcmtmbG93IGNvbnN0cnVjdG9yIGluc3RhbmNlXG4gKlxuICogQGV4YW1wbGUgJydcbiAqXG4gKiBAcmV0dXJuICcnXG4gKlxuICovXG5mdW5jdGlvbiBwcmVBY3Rpb25zKHByZUFjdGlvbnMsIF9XRkluc3RhbmNlLCBzcHV1aWQpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICB2YXIgY29tcGxldGVkID0gW107XG4gICAgICAgIHRyeSB7XG5cbiAgICAgICAgICAgIHZhciAgc3BPYmplY3QgPSBKU09OLnhwYXRoKFwiL3N1YnByb2Nlc3Nlc1tfaWQgZXEgJ1wiKyBzcHV1aWQgK1wiJ11cIiwgX1dGSW5zdGFuY2UgLCB7fSlbMF07XG4gICAgICAgICAgICB2YXIgcHJvY2Vzc0lEID0gc3BPYmplY3RbXCJtZXRhLWRhdGFcIl0ucHJvY2Vzc0NvbmZpZ0lkO1xuICAgICAgICAgICAgdmFyIHByb2Nlc3NJZCA9IHNwT2JqZWN0W1wibWV0YS1kYXRhXCJdLnN1YlByb2Nlc3NDb25maWdJZDtcbiAgICAgICAgICAgIHZhciBwcm9jZXNzU0VRID0gc3BPYmplY3RbXCJtZXRhLWRhdGFcIl0uc3ViUHJvY2Vzc0luc1NlcTtcbiAgICAgICAgICAgIHZhciBwcm9jZXNzU2VxID0gc3BPYmplY3RbXCJtZXRhLWRhdGFcIl0uc3ViUHJvY2Vzc0luc1NlcTtcblxuICAgICAgICAgICAgdmFyIHN1YlByb2Nlc3NDb25maWdPYmplY3QgPSBKU09OLnhwYXRoKFwiL3Byb2Nlc3Nlc1tfaWQgZXEgJ1wiK3Byb2Nlc3NJRCtcIiddL3N1YlByb2Nlc3Nlc1tfaWQgZXEgJ1wiKyBwcm9jZXNzSWQrXCInXVwiLCBfV0ZJbnN0YW5jZS5jb25maWcgLCB7fSlbMF07XG4gICAgICAgICAgICB2YXIgc3RlcE9iamVjdCA9IEpTT04ueHBhdGgoXCIvc3VicHJvY2Vzc2VzW19pZCBlcSAnXCIrIHNwdXVpZCArXCInXS9zdGVwXCIsX1dGSW5zdGFuY2UsIHt9KVswXTtcbiAgICAgICAgICAgIHV0aWwuc3luY0xvb3AocHJlQWN0aW9ucy5sZW5ndGgsIGZ1bmN0aW9uIChsb29wKSB7XG4gICAgICAgICAgICAgICAgdmFyIGNvdW50ZXIgPSBsb29wLml0ZXJhdGlvbigpO1xuICAgICAgICAgICAgICAgIGFjdGlvbihwcmVBY3Rpb25zW2NvdW50ZXJdLCBwcm9jZXNzSUQsIHByb2Nlc3NTRVEsIHByb2Nlc3NJZCwgcHJvY2Vzc1NlcSwgc3ViUHJvY2Vzc0NvbmZpZ09iamVjdCwgc3RlcE9iamVjdCAsX1dGSW5zdGFuY2UsIHt9LCBzcHV1aWQpLnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gQ2hlY2sgaWYgYWxsIHByZS1yZXF1aXNpdGVzIGNvbXBsZXRlZCBzdWNjZXNzZnVsbHkuXG4gICAgICAgICAgICAgICAgICAgIGNvbXBsZXRlZC5wdXNoKHRydWUpO1xuICAgICAgICAgICAgICAgICAgICBsb29wLm5leHQoKTtcbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbXBsZXRlZC5wdXNoKGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgbG9vcC5icmVhaygpO1xuICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpZiAoY29tcGxldGVkLmV2ZXJ5KEJvb2xlYW4pKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdQcmUtYWN0aW9ucyBjb21wbGV0ZWQgc3VjY2Vzc2Z1bGx5LicsIHt9KTtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB2YXIgZXJyb3IgPSB1dGlsLmVycm9yKCdXRlByZVJlcXVpc2l0ZUVycm9yJywgJ05vdCBhbGwgcHJlLWFjdGlvbnMgcGFzc2VkLicpO1xuICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgIH1cblxuICAgIH0pO1xufTtcblxuLyoqXG4gKiBXb3JrZmxvdyBnZXQgc3ViLXByb2Nlc3MgZGF0YS5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gaWQgLSB0aGUgc3ViUHJvY2VzcyBjb25maWcgaWRcbiAqIEBwYXJhbSB7b2JqZWN0fSBfV0ZJbnN0YW5jZSAtIHRoZSBjdXJyZW50IHdvcmtmbG93IGNvbnN0cnVjdG9yIGluc3RhbmNlXG4gKlxuICogQGV4YW1wbGUgXCJcIlxuICpcbiAqIEByZXR1cm4gXCJcIlxuICpcbiAqL1xuZnVuY3Rpb24gZ2V0U3ViUHJvY2VzcyhpZCwgX1dGSW5zdGFuY2UpIHtcbiAgICBpZiAoX1dGSW5zdGFuY2Uuc3VicHJvY2Vzc2VzID09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gW107XG4gICAgfSBlbHNlIHtcbiAgICAgICAgX1dGSW5zdGFuY2Uuc3VicHJvY2Vzc2VzLmZpbHRlcihmdW5jdGlvbiAoc3ViUHJvY2Vzcykge1xuICAgICAgICAgICAgaWYgKHN1YlByb2Nlc3MuaWQgPT0gaWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc3ViUHJvY2VzcztcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9KTtcbiAgICB9XG5cbn07XG5cbi8qKlxuICogUHJvY2VzcyBzdWItcHJvY2Vzc1xuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBwcm9jZXNzIC0gdGhlIGN1cnJlbnQgcHJvY2VzcyBpZCBhbmQgc2VxXG4gKiBAcGFyYW0ge29iamVjdH0gc3ViUHJvY2VzcyAtIHRoZSBzdWItcHJvY2VzcyBpZCBhbmQgc2VxXG4gKiBAcGFyYW0ge29iamVjdH0gZGF0YSAtIHRoZSB1c2VyIGlucHV0IGRhdGFcbiAqIEBwYXJhbSB7b2JqZWN0fSBfV0ZJbnN0YW5jZSAtIHRoZSBjdXJyZW50IHdvcmtmbG93IGNvbnN0cnVjdG9yIGluc3RhbmNlXG4gKlxuICogQGV4YW1wbGUgJydcbiAqXG4gKiBAcmV0dXJuICcnXG4gKlxuICovXG5mdW5jdGlvbiBzdWJQcm9jZXNzKHByb2Nlc3NJZCwgcHJvY2Vzc1NlcSwgc3ViUHJvY2Vzc0lkLCBzdWJQcm9jZXNzU2VxLCBzdWJwcm9maWxlSWQsIGRhdGEsIF9XRkluc3RhbmNlKSB7XG4gICAgLy8gR2V0IHRoZSBjdXJyZW50IHByb2Nlc3Mgc3ViUHJvY2VzcyBpbnN0YW5jZVxuICAgIC8vIHZhciBzdWJQcm9jZXNzU2VxID0gMTtcbiAgICB2YXIgc3ViUHJvY2VzcyA9IFtdO1xuICAgIHZhciBwcm9jZXNzQ29uZiA9IFtdO1xuICAgIHZhciBzdWJQcm9jZXNzQ29uZiA9IFtdO1xuICAgIF9XRkluc3RhbmNlLmluc3RhbmNlLnByb2Nlc3Nlcy5maWx0ZXIoZnVuY3Rpb24gKG9ialByb2Nlc3MpIHtcbiAgICAgICAgaWYgKG9ialByb2Nlc3MuaWQgPT0gcHJvY2Vzc0lkICYmIG9ialByb2Nlc3Muc2VxID09IHByb2Nlc3NTZXEpIHtcbiAgICAgICAgICAgIHZhciBzcExlbmd0aCA9IG9ialByb2Nlc3Muc3ViUHJvY2Vzc2VzLmxlbmd0aDtcbiAgICAgICAgICAgIG9ialByb2Nlc3Muc3ViUHJvY2Vzc2VzLmZpbHRlcihmdW5jdGlvbiAob2JqU3ViUHJvY2Vzcykge1xuICAgICAgICAgICAgICAgIGlmIChvYmpTdWJQcm9jZXNzLmlkID09IHN1YlByb2Nlc3NJZCAmJiBvYmpTdWJQcm9jZXNzLnNlcSA9PSBzdWJQcm9jZXNzU2VxKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB1dWlkID0gb2JqU3ViUHJvY2Vzcy51dWlkO1xuICAgICAgICAgICAgICAgICAgICBfV0ZJbnN0YW5jZS5zdWJwcm9jZXNzZXMuZmlsdGVyKGZ1bmN0aW9uIChzdWJQcm9jZXNzSXRlbSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHN1YlByb2Nlc3NJdGVtLl9pZCA9PSB1dWlkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3ViUHJvY2VzcyA9IHN1YlByb2Nlc3NJdGVtO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG5cbiAgICB9KTtcbiAgICAvLyBHZXQgdGhlIGN1cnJlbnQgc3ViUHJvY2VzcyBjb25maWd1cmF0aW9uXG4gICAgX1dGSW5zdGFuY2UuY29uZmlnLnByb2Nlc3Nlcy5maWx0ZXIoZnVuY3Rpb24gKHByb2Nlc3NDb25maWcpIHtcbiAgICAgICAgaWYgKHByb2Nlc3NDb25maWcuX2lkID09IHByb2Nlc3NJZCkge1xuICAgICAgICAgICAgcHJvY2Vzc0NvbmYgPSBwcm9jZXNzQ29uZmlnO1xuICAgICAgICAgICAgcHJvY2Vzc0NvbmZpZy5zdWJQcm9jZXNzZXMuZmlsdGVyKGZ1bmN0aW9uIChzdWJQcm9jZXNzQ29uZmlnKSB7XG4gICAgICAgICAgICAgICAgaWYgKHN1YlByb2Nlc3NDb25maWcuX2lkID09IHN1YlByb2Nlc3NJZCkge1xuICAgICAgICAgICAgICAgICAgICBzdWJQcm9jZXNzQ29uZiA9IHN1YlByb2Nlc3NDb25maWc7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG5cbiAgICB9KTtcblxuICAgIC8vVE9ETzogQ2hhbmdlIHJlcXVpcmVkIHRvIG1vdmUgaXNBY3RpdmUgdG8gc3ViUHJvY2VzcyBmaWxlLkhlcmVcbiAgICB2YXIgZ3JvdXBLZXkgPSAnJztcbiAgICB2YXIgYmFzZVVVSUQgPSBkYXRhLmJhc2VVVUlEO1xuICAgIFxuICAgIGlmIChiYXNlVVVJRCAhPSB1bmRlZmluZWQgJiYgYmFzZVVVSUQgIT0gJycgJiYgYmFzZVVVSUQubGVuZ3RoID4gMCkge1xuICAgICAgICBcbiAgICAgICAgdmFyIHByZXZpb3VzT2JqZWN0ID0gSlNPTi54cGF0aChcIi9zdWJwcm9jZXNzZXNbX2lkIGVxICdcIiArIGJhc2VVVUlEICsgXCInXVwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xuICAgICAgICBncm91cEtleSA9IHByZXZpb3VzT2JqZWN0Lmdyb3VwS2V5O1xuXG4gICAgfSBlbHNlIHtcblxuICAgICAgICB2YXIgY2FyZEluZExpc3QgPSAnJztcbiAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IHN1YlByb2Nlc3NDb25mLmluZGljYXRvcnMubGVuZ3RoLTE7IGkrKyl7XG4gICAgICAgICAgICBjYXJkSW5kTGlzdCA9IGNhcmRJbmRMaXN0ICsgXCInXCIrIHN1YlByb2Nlc3NDb25mLmluZGljYXRvcnNbaV0uX2lkICsgXCInLFwiO1xuICAgICAgICB9XG4gICAgICAgIGNhcmRJbmRMaXN0ID0gY2FyZEluZExpc3QgKyBcIidcIisgc3ViUHJvY2Vzc0NvbmYuaW5kaWNhdG9yc1tpXS5faWQgKyBcIidcIjtcbiAgICAgICAgdmFyIHNpbmdsZUNhcmQgPSBKU09OLnhwYXRoKFwiL2luZGljYXRvcnNbc2V0SWQgPSAoXCIrIGNhcmRJbmRMaXN0ICtcIikgYW5kIGNhcmRpbmFsaXR5IGVxICdzaW5nbGUnXVwiLCBhcHAuU0NPUEUuQVBQX0NPTkZJRyx7fSkubGVuZ3RoO1xuXG4gICAgICAgIGlmKHN1YlByb2Nlc3NDb25mLmluc3RhbmNlVHlwZS5uZXdTZXF1ZW5jZSAhPSB1bmRlZmluZWQgfHwgc2luZ2xlQ2FyZCA+IDApe1xuICAgICAgICAgICAgdmFyIHByZXZpb3VzT2JqZWN0ID0gSlNPTi54cGF0aChcIi9pbnN0YW5jZS9wcm9jZXNzZXNbaWQgZXEgJ1wiICsgcHJvY2Vzc0lkICsgXCInXVwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xuICAgICAgICAgICAgaWYocHJldmlvdXNPYmplY3QgIT0gdW5kZWZpbmVkICYmIHByZXZpb3VzT2JqZWN0LnN1YlByb2Nlc3Nlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgZ3JvdXBLZXkgPSBwcmV2aW91c09iamVjdC5zdWJQcm9jZXNzZXNbMF0uZ3JvdXBLZXk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGdyb3VwS2V5ID0gZ2VuZXJhdGVVVUlEKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBncm91cEtleSA9IGdlbmVyYXRlVVVJRCgpO1xuXG4gICAgICAgIH0gXG4gICAgIH1cbiAgICBcbiAgICB2YXIgY291bnRTdWJwcm9jZXNzSW5Db250ZXh0ID0gSlNPTi54cGF0aChcImNvdW50KC9wcm9jZXNzZXMvc3ViUHJvY2Vzc2VzW2dyb3VwS2V5IGVxICdcIisgZ3JvdXBLZXkgK1wiJ10pXCIsIF9XRkluc3RhbmNlLmluc3RhbmNlICx7fSlbMF07XG4gICAgdmFyIGxhYmVsID0gZGF0YS5sYWJlbDtcbiAgICB2YXIgc3ViUHJvY2Vzc09iamVjdElkID0gZ2VuZXJhdGVVVUlEKCk7XG4gICAgdmFyIG1vZGVsID0ge1xuICAgICAgICBfaWQ6IHN1YlByb2Nlc3NPYmplY3RJZCxcbiAgICAgICAgaWQ6IHN1YlByb2Nlc3NJZCxcbiAgICAgICAgdHlwZTogJ3dvcmtmbG93SW5zdGFuY2VTdWJQcm9jZXNzJyxcbiAgICAgICAgZGF0ZVRpbWVDcmVhdGVkOiBuZXcgRGF0ZSgpLFxuICAgICAgICBkdWVEYXRlVGltZTogbmV3IERhdGUoKSxcbiAgICAgICAgc2VxOiBzdWJQcm9jZXNzU2VxLFxuICAgICAgICBpbml0aWF0ZWQ6IGZhbHNlLFxuICAgICAgICBkYXRlczoge1xuICAgICAgICAgICAgY3JlYXRlZDogJycsXG4gICAgICAgICAgICB2YWxpZDogJycsXG4gICAgICAgICAgICBzdGFydDogJycsXG4gICAgICAgICAgICBkdWU6ICcnLFxuICAgICAgICAgICAgY2xvc2VkOiAnJ1xuICAgICAgICB9LFxuICAgICAgICBjb21wbGV0ZTogZmFsc2UsXG4gICAgICAgIGluZGljYXRvcnM6IFtdLFxuICAgICAgICBzdGVwOiB7fSxcbiAgICAgICAgYWN0aXZlOiB0cnVlLFxuICAgICAgICBncm91cEtleTogZ3JvdXBLZXksXG4gICAgICAgIGxhYmVsOiBsYWJlbCxcbiAgICAgICAgY2hhbm5lbHM6IFtcbiAgICAgICAgICAgIFwiY29tbXVuaXR5X1wiICsgYXBwLlNDT1BFLmdldENvbW11bml0eUlkKCksXG4gICAgICAgICAgICBcInByb2ZpbGVfXCIgKyBhcHAuU0NPUEUucHJvZmlsZUlkLFxuICAgICAgICAgICAgXCJhcHBsaWNhdGlvbl9cIiArIGFwcC5TQ09QRS5hcHBsaWNhdGlvbklkLFxuICAgICAgICAgICAgXCJjb21tdW5pdHlfXCIgKyBhcHAuU0NPUEUuZ2V0Q29tbXVuaXR5SWQoKSArIFwiX2FwcGxpY2F0aW9uX1wiICsgYXBwLlNDT1BFLmFwcGxpY2F0aW9uSWRcbiAgICAgICAgXSxcbiAgICAgICAgaGlzdG9yeTogW10sXG4gICAgICAgIC8vbWV0YSBpbmZvcm1hdGlvbiBhZGRlZCBmb3Igc2VydmVyIHNpZGUgY29uZmxpY3QgbWFuYWdlbWVudCBhbmQgbWVyZ2VyXG4gICAgICAgIFwibWV0YS1kYXRhXCI6IHtcbiAgICAgICAgICAgIGFwcGxpY2F0aW9uSWQ6IGFwcC5TQ09QRS5hcHBsaWNhdGlvbklkLFxuICAgICAgICAgICAgY29tbXVuaXR5SWQ6IGFwcC5TQ09QRS5nZXRDb21tdW5pdHlJZCgpLFxuICAgICAgICAgICAgcHJvZmlsZUlkOiBhcHAuU0NPUEUucHJvZmlsZUlkLFxuICAgICAgICAgICAgc3VicHJvZmlsZUlkOiBzdWJwcm9maWxlSWQgPT0gdW5kZWZpbmVkPyAnJzogc3VicHJvZmlsZUlkLFxuICAgICAgICAgICAgcHJvY2Vzc0NvbmZpZ0lkOiBwcm9jZXNzSWQsXG4gICAgICAgICAgICBzdWJQcm9jZXNzQ29uZmlnSWQ6IHN1YlByb2Nlc3NJZCxcbiAgICAgICAgICAgIHN1YlByb2Nlc3NJbnNTZXE6IGNvdW50U3VicHJvY2Vzc0luQ29udGV4dCArIDFcbiAgICAgICAgfSxcbiAgICAgICAgbWVzc2FnZXM6IFtdLFxuICAgICAgICBzcFN0YXR1czonJ1xuICAgIH07XG5cbiAgICBfV0ZJbnN0YW5jZS5zdWJwcm9jZXNzZXMucHVzaChtb2RlbCk7XG4gICAgLy8gUmV0dXJuIGEgcHJvbWlzZVxuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIC8vIENhdGNoIGFsbCB1bmNhdWdodCBlcnJvcnNcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIDEuIFByb2Nlc3MgdGhlIHByZS1hY3Rpb25zXG4gICAgICAgICAgICB2YXIgcHJlQWN0aW9uc0NvbmYgPSBwcm9jZXNzQ29uZi5wcmVBY3Rpb25zO1xuICAgICAgICAgICAgLy9hY3Rpb24oYWN0aW9uc1tjb3VudGVyXSwgcHJvY2Vzc0lkLCBwcm9jZXNzU2VxLCBzdWJQcm9jZXNzSWQsIHN1YlByb2Nlc3NTZXEsIHN1YlByb2Nlc3MsIHN0ZXAsIF9XRkluc3RhbmNlLCBkYXRhLCB1dWlkKVxuICAgICAgICAgICAgcHJlQWN0aW9ucyhwcmVBY3Rpb25zQ29uZiwgX1dGSW5zdGFuY2UsIHN1YlByb2Nlc3NPYmplY3RJZCkudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgLy8gMi4gUHJvY2VzcyB0aGUgcHJlLXJlcXVpc2l0ZXNcbiAgICAgICAgICAgICAgICB2YXIgcHJlcmVxdWlzaXRlQ29uZiA9IHByb2Nlc3NDb25mLnByZXJlcXVpc2l0ZXM7XG4gICAgICAgICAgICAgICAgcHJlUmVxdWlzaXRlcyhwcmVyZXF1aXNpdGVDb25mLCBfV0ZJbnN0YW5jZSwgc3ViUHJvY2Vzc09iamVjdElkKS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gMy4gSW5pdGlhdGUgdGhlIHN1YlByb2Nlc3NcbiAgICAgICAgICAgICAgICAgICAgdmFyIGluaXRpYXRlQ29uZiA9IHN1YlByb2Nlc3NDb25mLmluaXRpYXRlO1xuICAgICAgICAgICAgICAgICAgICBpbml0aWF0ZShpbml0aWF0ZUNvbmYsIHN1YlByb2Nlc3MsIGRhdGEpLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy9VcGRhdGUgdGhlIHN1YlByb2Nlc3MgbW9kZWxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsLmluaXRpYXRlZCA9IHJlc3VsdC5kYXRhLmluaXRpYXRlZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsLmRhdGVzID0gcmVzdWx0LmRhdGEuZGF0ZXM7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBFeGVjdXRlIHRoZSBmaXJzdCBzdGVwXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3RlcElkID0gc3ViUHJvY2Vzc0NvbmYuc3RlcHNbMF0uX2lkO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRyYW5zaXRpb25JZCA9IHN1YlByb2Nlc3NDb25mLnN0ZXBzWzBdLnRyYW5zaXRpb25bMF0uX2lkO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN0ZXBTZXEgPSAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RlcChwcm9jZXNzSWQsIHByb2Nlc3NTZXEsIHN1YlByb2Nlc3NJZCwgc3ViUHJvY2Vzc1NlcSwgc3RlcElkLCBzdGVwU2VxLCBkYXRhLCBfV0ZJbnN0YW5jZSwgc3ViUHJvY2Vzc09iamVjdElkKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWwuc3RlcCA9IHJlc3VsdC5kYXRhO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmRpY2F0b3JzKHN1YlByb2Nlc3NDb25mLmluZGljYXRvcnMsIF9XRkluc3RhbmNlLCBtb2RlbC5faWQpLnRoZW4oZnVuY3Rpb24gKHJlc3VsdDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsLmluZGljYXRvcnMgPSByZXN1bHQxLmRhdGE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBFeGVjdXRlIHRoZSB0cmFuc2l0aW9ucywgaWYgYXV0b1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9TdWJwcm9jZXNzIHBvc3RBY3Rpb25zIHJlbW92ZWQgZnJvbSBoZXJlIGFzIHRoZXkgc2hvdWxkIGJlIGV4ZWN1dGVkIGF0IHRoZSBlbmQgb2YgdGhlIHN1YlByb2Nlc3MsIG1lYW5zIGF0IGxhc3Qgc3RlcCBhZnRlciB0cmFuc2l0aW9uLCBqdXN0IGJlZm9yZSBmaW5pc2guXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBDYW4gYWRkIGhpc3Rvcnkgb2JqZWN0IGhlcmUgaW4gY2FzZSBmb3IgZmlyc3Qgc3RlcCwgaS5lIGluaXRpYWxpc2F0aW9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBtb2RlbC5oaXN0b3J5LnB1c2gocmVzdWx0LmRhdGEpO1xuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKHJlc3VsdDEubWVzc2FnZSwgbW9kZWwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcblxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgX1dGSW5zdGFuY2Uuc3VicHJvY2Vzc2VzID0gX1dGSW5zdGFuY2Uuc3VicHJvY2Vzc2VzLmZpbHRlcihmdW5jdGlvbiAob2JqKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICEob2JqLl9pZCA9PSBzdWJQcm9jZXNzT2JqZWN0SWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIF9XRkluc3RhbmNlLnN1YnByb2Nlc3NlcyA9IF9XRkluc3RhbmNlLnN1YnByb2Nlc3Nlcy5maWx0ZXIoZnVuY3Rpb24gKG9iaikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICEob2JqLl9pZCA9PSBzdWJQcm9jZXNzT2JqZWN0SWQpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICBfV0ZJbnN0YW5jZS5zdWJwcm9jZXNzZXMgPSBfV0ZJbnN0YW5jZS5zdWJwcm9jZXNzZXMuZmlsdGVyKGZ1bmN0aW9uIChvYmopIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICEob2JqLl9pZCA9PSBzdWJQcm9jZXNzT2JqZWN0SWQpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgfVxuXG4gICAgfSk7XG59O1xuXG4vKipcbiAqIFByb2Nlc3MgaW5pdGlhdGVcbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gaW5pdGlhdGUgLSB0aGUgaW5pdGlhdGUgY29uZmlnIGRhdGFcbiAqIEBwYXJhbSB7b2JqZWN0fSBkYXRhIC0gdGhlIHVzZXIgaW5wdXQgZGF0YVxuICpcbiAqIEBleGFtcGxlICcnXG4gKlxuICogQHJldHVybiAnJ1xuICpcbiAqL1xuZnVuY3Rpb24gaW5pdGlhdGUoaW5pdGlhdGUsIHN1YlByb2Nlc3MsIGRhdGEpIHtcbiAgICB2YXIgY29tcGxldGVkID0gW107XG4gICAgdmFyIHJlc3VsdCA9IHtcbiAgICAgICAgaW5pdGlhdGVkOiBmYWxzZSxcbiAgICAgICAgZGF0ZXM6IHtcbiAgICAgICAgICAgIGNyZWF0ZWQ6ICcnLFxuICAgICAgICAgICAgdmFsaWQ6ICcnLFxuICAgICAgICAgICAgc3RhcnQ6ICcnLFxuICAgICAgICAgICAgZHVlOiAnJyxcbiAgICAgICAgICAgIGNsb3NlZDogJydcbiAgICAgICAgfVxuXG4gICAgfTtcblxuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIHZhciBpbml0ID0gZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICAgICBpZiAoaW5pdGlhdGUudXNlciAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQuZGF0ZXMuY3JlYXRlZCA9IGRhdGEuY3JlYXRlZERhdGU7XG4gICAgICAgICAgICAgICAgaWYgKGluaXRpYXRlLnVzZXIudmFsaWREYXRlLl90eXBlID09ICd1c2VyU2VsZWN0ZWQnIHx8IGluaXRpYXRlLnVzZXIudmFsaWREYXRlLl90eXBlID09ICdhdXRvU2VsZWN0ZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLnZhbGlkRGF0ZSAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5kYXRlcy52YWxpZCA9IGRhdGEudmFsaWREYXRlO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0LmRhdGVzLnZhbGlkID0gbmV3IERhdGUoKS50b0lTT1N0cmluZygpLnN1YnN0cmluZygwLDEwKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKGluaXRpYXRlLnVzZXIuZHVlRGF0ZS5fdHlwZSA9PSAndXNlclNlbGVjdGVkJyB8fCBpbml0aWF0ZS51c2VyLmR1ZURhdGUuX3R5cGUgPT0gJ2F1dG9TZWxlY3RlZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuZHVlRGF0ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQuZGF0ZXMuZHVlID0gZGF0YS5kdWVEYXRlO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdXRpbC53YXJuKCdXRkluaXRpYXRlRXJyb3InLCAnTm8gZHVlIGRhdGUgcGFzc2VkIGluIC0ge2RhdGEuZHVlRGF0ZX0nKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmVzdWx0LmRhdGVzLnN0YXJ0ID0gZGF0YS5maXJzdERhdGU7XG5cblxuXG4gICAgICAgICAgICAgICAgcmVzdWx0LmluaXRpYXRlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ1N1Yi1Qcm9jZXNzIGluaXRpYXRlIGNvbXBsZXRlZCBzdWNjZXNzZnVsbHkuJywgcmVzdWx0KTtcbiAgICAgICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xuXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGluaXRpYXRlLmF1dG8gIT0gdW5kZWZpbmVkKSB7XG5cbiAgICAgICAgICAgICAgICAvKlxuICAgICAgICAgICAgICAgIHJlc3VsdC5kYXRlcy5jcmVhdGVkID0gZGF0YS5jcmVhdGVkRGF0ZTtcblxuICAgICAgICAgICAgICAgIGlmIChpbml0aWF0ZS5kYXRlcy52YWxpZC5fdHlwZSA9PSAndXNlclNlbGVjdGVkJyB8fCBpbml0aWF0ZS5kYXRlcy52YWxpZC5fdHlwZSA9PSAnYXV0b1NlbGVjdGVkJykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS52YWxpZERhdGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0LmRhdGVzLnZhbGlkID0gZGF0YS52YWxpZERhdGU7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB1dGlsLndhcm4oJ1dGSW5pdGlhdGVFcnJvcicsICdObyB2YWxpZCBkYXRlIHBhc3NlZCBpbiAtIHtkYXRhLnZhbGlkRGF0ZX0nKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKGluaXRpYXRlLmRhdGVzLmR1ZS5fdHlwZSA9PSAndXNlclNlbGVjdGVkJyB8fCBpbml0aWF0ZS5kYXRlcy5kdWUuX3R5cGUgPT0gJ2F1dG9TZWxlY3RlZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuZHVlRGF0ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQuZGF0ZXMuZHVlID0gZGF0YS5kdWVEYXRlO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdXRpbC53YXJuKCdXRkluaXRpYXRlRXJyb3InLCAnTm8gZHVlIGRhdGUgcGFzc2VkIGluIC0ge2RhdGEuZHVlRGF0ZX0nKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmVzdWx0LmluaXRpYXRlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ1N1Yi1Qcm9jZXNzIGluaXRpYXRlIGNvbXBsZXRlZCBzdWNjZXNzZnVsbHkuJywgcmVzdWx0KTtcbiAgICAgICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpOyovXG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICB2YXIgZXJyb3IgPSB1dGlsLmVycm9yKCdXRkluaXRpYXRlRXJyb3InLCAnSW5pdGlhdGUgdHlwZTogJyArIGluaXRpYXRlLl90eXBlICsgJyBub3QgZGVmaW5lZC4nKTtcbiAgICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzdWJQcm9jZXNzLmNvbXBsZXRlID09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgaW5pdCgpO1xuICAgICAgICB9IGVsc2UgaWYgKCFzdWJQcm9jZXNzLmNvbXBsZXRlKSB7XG4gICAgICAgICAgICBpZiAoaW5pdGlhdGUucGFyYWxsZWxJbnN0YW5jZXMpIHtcbiAgICAgICAgICAgICAgICBpbml0KCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHZhciBlcnJvciA9IHV0aWwuZXJyb3IoJ1dGSW5pdGlhdGVFcnJvcicsICdTdWItcHJvY2VzczogJyArIHN1YlByb2Nlc3MuaWQgKyAnIHN0aWxsIGFjdGl2ZSBhbmQgcGFyYWxsZWwgaW5zdGFuY2VzIGFyZSBub3QgYWxsb3dlZC4nKTtcbiAgICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgIH0pO1xufTtcblxuLyoqXG4gKiBQcm9jZXNzIHN0ZXBcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gcHJvY2Vzc0lkIC0gdGhlIGN1cnJlbnQgcHJvY2VzcyBpZFxuICogQHBhcmFtIHtzdHJpbmd9IHN1YlByb2Nlc3NJZCAtIHRoZSBjdXJyZW50IHN1Yi1wcm9jZXNzIGlkXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RlcElkIC0gdGhlIGN1cnJlbnQgc3ViLXByb2Nlc3Mgc3RlcCBpZFxuICogQHBhcmFtIHtudW1iZXJ9IHN0ZXBTZXEgLSB0aGUgY3VycmVudCBzdWItcHJvY2VzcyBzdGVwIGluc3RhbmNlIGNvdW50ZXIgLyBzZXF1ZW5jZVxuICogQHBhcmFtIHtvYmplY3R9IGRhdGEgLSB0aGUgdXNlciBpbnB1dCBkYXRhXG4gKiBAcGFyYW0ge29iamVjdH0gX1dGSW5zdGFuY2UgLSB0aGUgY3VycmVudCBfV0ZJbnN0YW5jZSBjb25zdHJ1Y3RvciBpbnN0YW5jZVxuICpcbiAqIEBleGFtcGxlICcnXG4gKlxuICogQHJldHVybiAnJ1xuICpcbiAqL1xuZnVuY3Rpb24gc3RlcChwcm9jZXNzSWQsIHByb2Nlc3NTZXEsIHN1YlByb2Nlc3NJZCwgc3ViUHJvY2Vzc1NlcSwgc3RlcElkLCBzdGVwU2VxLCBkYXRhLCBfV0ZJbnN0YW5jZSwgc3B1dWlkKSB7XG5cbiAgICAvLyBEZWZhdWx0IHN0ZXAgbW9kZWxcbiAgICB2YXIgbW9kZWwgPSB7XG4gICAgICAgIGtleTogZ2VuZXJhdGVVVUlEKCksXG4gICAgICAgIGlkOiAnJyxcbiAgICAgICAgc2VxOiAnJyxcbiAgICAgICAgc3RhdHVzOiAnJyxcbiAgICAgICAgbWVzc2FnZTogJycsXG4gICAgICAgIGFzc2lnbmVkVG86IHtcbiAgICAgICAgICAgIHVzZXJJZDogJycsXG4gICAgICAgICAgICBuYW1lOiAnJyxcbiAgICAgICAgICAgIGRhdGVUaW1lOicnLFxuICAgICAgICAgICAgdHlwZTonJyxcbiAgICAgICAgICAgIGR1ZURhdGVUaW1lOicnLFxuICAgICAgICAgICAgYnk6JydcbiAgICAgICAgfSxcbiAgICAgICAgYXNzaWdubWVudEhpc3Rvcnk6W10sXG4gICAgICAgIGRhdGVUaW1lQ3JlYXRlZDogbmV3IERhdGUoKSxcbiAgICAgICAgZHVlRGF0ZVRpbWU6IG5ldyBEYXRlKCksXG4gICAgICAgIHRyYW5zaXRpb246e1xuICAgICAgICAgICAgdHJhbnNpdGlvbklkOicnLFxuICAgICAgICAgICAgZGF0ZVRpbWU6JycsXG4gICAgICAgICAgICB1c2VySWQ6ICcnXG4gICAgICAgIH0sXG4gICAgICAgIGFzc2lnbm1lbnQ6IHt9LFxuICAgICAgICBjb21tZW50OiAnJ1xuICAgIH07XG5cbiAgICB2YXIgc3ViUHJvY2VzcyA9IHt9O1xuXG4gICAgdmFyIHV1aWQgPSAnJztcbiAgICB2YXIgaW5zdFN1YlByb2Nlc3M7XG4gICAgdmFyIHN0ZXAgPSB7fTtcblxuICAgIHZhciB0cmFuc2l0aW9uSWQgPSAnJztcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy9HZXQgdGhlIGN1cnJlbnQgc3ViUHJvY2VzcyBpbnN0YW5jZSBkYXRhXG4gICAgICAgICAgICBfV0ZJbnN0YW5jZS5pbnN0YW5jZS5wcm9jZXNzZXMuZmlsdGVyKGZ1bmN0aW9uIChvYmpQcm9jZXNzKSB7XG4gICAgICAgICAgICAgICAgaWYgKG9ialByb2Nlc3MuaWQgPT0gcHJvY2Vzc0lkICYmIG9ialByb2Nlc3Muc2VxID09IHByb2Nlc3NTZXEpIHtcbiAgICAgICAgICAgICAgICAgICAgb2JqUHJvY2Vzcy5zdWJQcm9jZXNzZXMuZmlsdGVyKGZ1bmN0aW9uIChvYmpTdWJQcm9jZXNzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob2JqU3ViUHJvY2Vzcy5pZCA9PSBzdWJQcm9jZXNzSWQgJiYgb2JqU3ViUHJvY2Vzcy5zZXEgPT0gc3ViUHJvY2Vzc1NlcSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV1aWQgPSBvYmpTdWJQcm9jZXNzLnV1aWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBfV0ZJbnN0YW5jZS5zdWJwcm9jZXNzZXMuZmlsdGVyKGZ1bmN0aW9uIChzdWJQcm9jZXNzSXRlbSkge1xuICAgICAgICAgICAgICAgIGlmIChzdWJQcm9jZXNzSXRlbS5faWQgPT0gdXVpZCkge1xuICAgICAgICAgICAgICAgICAgICBpbnN0U3ViUHJvY2VzcyA9IHN1YlByb2Nlc3NJdGVtO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIF9XRkluc3RhbmNlLmNvbmZpZy5wcm9jZXNzZXMuZmlsdGVyKGZ1bmN0aW9uIChvYmpQcm9jZXNzKSB7XG4gICAgICAgICAgICAgICAgaWYgKG9ialByb2Nlc3MuX2lkID09IHByb2Nlc3NJZCkge1xuICAgICAgICAgICAgICAgICAgICBvYmpQcm9jZXNzLnN1YlByb2Nlc3Nlcy5maWx0ZXIoZnVuY3Rpb24gKG9ialN1YlByb2Nlc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvYmpTdWJQcm9jZXNzLl9pZCA9PSBzdWJQcm9jZXNzSWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWJQcm9jZXNzID0gb2JqU3ViUHJvY2VzcztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmpTdWJQcm9jZXNzLnN0ZXBzLmZpbHRlcihmdW5jdGlvbiAob2JqU3RlcCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob2JqU3RlcC5faWQgPT0gc3RlcElkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGVwID0gb2JqU3RlcDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAvLyBVcGRhdGUgdGhlIHN1Yi1wcm9jZXNzIHN0ZXAgZGF0YVxuICAgICAgICAgICAgbW9kZWwuaWQgPSBzdGVwSWQ7XG4gICAgICAgICAgICBtb2RlbC5zZXEgPSBzdGVwU2VxO1xuXG4gICAgICAgICAgICB2YXIgaW5zdGFuY2VTdGF0dXMgPSAnJztcbiAgICAgICAgICAgIGlmIChzdGVwLnNldEluc3RhbmNlU3RhdHVzVG8uTm90U3RhcnRlZCAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBpbnN0YW5jZVN0YXR1cyA9IFwiTm90U3RhcnRlZFwiO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChzdGVwLnNldEluc3RhbmNlU3RhdHVzVG8uQ3JlYXRlZCAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBpbnN0YW5jZVN0YXR1cyA9IFwiQ3JlYXRlZFwiO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChzdGVwLnNldEluc3RhbmNlU3RhdHVzVG8uSW5Qcm9ncmVzcyAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBpbnN0YW5jZVN0YXR1cyA9IFwiSW5Qcm9ncmVzc1wiO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChzdGVwLnNldEluc3RhbmNlU3RhdHVzVG8uU3VibWl0dGVkICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGluc3RhbmNlU3RhdHVzID0gXCJTdWJtaXR0ZWRcIjtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoc3RlcC5zZXRJbnN0YW5jZVN0YXR1c1RvLkNvbXBsZXRlICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGluc3RhbmNlU3RhdHVzID0gXCJDb21wbGV0ZVwiO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgbGFuZ3VhZ2UgPSBzZXJ2aWNlLmdldExhbmd1YWdlKCk7XG5cbiAgICAgICAgICAgIG1vZGVsLnN0YXR1cyA9IGluc3RhbmNlU3RhdHVzO1xuICAgICAgICAgICAgbW9kZWwubWVzc2FnZSA9IGV2YWwoXCJzdGVwLnNldEluc3RhbmNlU3RhdHVzVG8uXCIgKyBpbnN0YW5jZVN0YXR1cyArIFwiLmxhYmVsLmkxOG4uXCIgKyBsYW5ndWFnZSk7XG4gICAgICAgICAgICBtb2RlbC5jb21tZW50ID0gZGF0YS5jb21tZW50ICE9PSB1bmRlZmluZWQgPyBkYXRhLmNvbW1lbnQgOiAnJztcbiAgICAgICAgICAgIHZhciBpbmRpY2F0b3JzID0gaW5zdFN1YlByb2Nlc3MgIT09IHVuZGVmaW5lZCA/IGluc3RTdWJQcm9jZXNzLmluZGljYXRvcnMgOiBbXTtcblxuICAgICAgICAgICAgdmFyIHVwZGF0ZVNQSW5kaWNhdG9yT2JqZWN0ID0gZnVuY3Rpb24oaW5kaWNhdG9ycywgX1dGSW5zdGFuY2Upe1xuXG4gICAgICAgICAgICAgICAgaWYoaW5kaWNhdG9ycy5sZW5ndGggPiAwKXtcblxuICAgICAgICAgICAgICAgICAgICBmb3IodmFyIGk9MCA7IGkgPCBpbmRpY2F0b3JzLmxlbmd0aDsgaSsrKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpbmRpY2F0b3JPYmplY3QgID0gaW5kaWNhdG9yc1tpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB1dWlkID0gaW5kaWNhdG9yT2JqZWN0Lmluc3RhbmNlc1swXS51dWlkO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHVwZGF0ZWRTZXEgPSBKU09OLnhwYXRoKFwiL2luZGljYXRvcnNbX2lkIGVxICdcIisgdXVpZCArXCInXS9tb2RlbC9wZW5kaW5nL3NlcVwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5kaWNhdG9yT2JqZWN0Lmluc3RhbmNlc1swXS5zZXEgPSB1cGRhdGVkU2VxO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpbmRpY2F0b3JEb2NzKHByb2Nlc3NJZCwgaW5kaWNhdG9ycywgbW9kZWwsIF9XRkluc3RhbmNlKS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICB1dWlkID0gc3B1dWlkO1xuXG4gICAgICAgICAgICAgICAgaWYgKHN0ZXAuZnVuY3Rpb24uYWN0aW9ucyAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9ucyhzdGVwLmZ1bmN0aW9uLmFjdGlvbnMsIHByb2Nlc3NJZCwgcHJvY2Vzc1NlcSwgc3ViUHJvY2Vzc0lkLCBzdWJQcm9jZXNzU2VxLCBzdWJQcm9jZXNzLCBtb2RlbCwgX1dGSW5zdGFuY2UsIGRhdGEsIHNwdXVpZClcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cGRhdGVTUEluZGljYXRvck9iamVjdChpbmRpY2F0b3JzLCBfV0ZJbnN0YW5jZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRyYW5zaXRpb25JZCA9IHN0ZXAudHJhbnNpdGlvblswXS5faWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNpdGlvbihwcm9jZXNzSWQsIHByb2Nlc3NTZXEsIHN1YlByb2Nlc3NJZCwgc3ViUHJvY2Vzc1NlcSwgc3RlcElkLCB0cmFuc2l0aW9uSWQsIGRhdGEsIF9XRkluc3RhbmNlLCBzcHV1aWQsIG1vZGVsKS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ1RyYW5zaXRpb24gY29tcGxldGVkIHN1Y2Nlc3NmdWxseS4nLCByZXN1bHQuZGF0YS5zdGVwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChzdGVwLmZ1bmN0aW9uLnRhc2sgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIE1ha2UgYXNzaWdubWVudHNcbiAgICAgICAgICAgICAgICAgICAgdGFzayhwcm9jZXNzSWQsIHByb2Nlc3NTZXEsIHN0ZXAuZnVuY3Rpb24udGFzaywgc3B1dWlkLCBtb2RlbCkudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHVwZGF0ZVNQSW5kaWNhdG9yT2JqZWN0KGluZGljYXRvcnMsIF9XRkluc3RhbmNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdUYXNrIGF3YWl0aW5nIHVzZXIgYWN0aW9uLicsIG1vZGVsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoc3VjY2Vzcyk7XG4gICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoc3RlcC5mdW5jdGlvbi5zZXJ2ZXIgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIE1ha2UgYXNzaWdubWVudHNcbiAgICAgICAgICAgICAgICAgICAgc2VydmVyKHN0ZXAuZnVuY3Rpb24uc2VydmVyLCBwcm9jZXNzSWQsIHByb2Nlc3NTZXEsIHN1YlByb2Nlc3NJZCwgc3ViUHJvY2Vzc1NlcSwgc3ViUHJvY2VzcywgbW9kZWwsIF9XRkluc3RhbmNlLCBkYXRhLCBzcHV1aWQpLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB1cGRhdGVTUEluZGljYXRvck9iamVjdChpbmRpY2F0b3JzLCBfV0ZJbnN0YW5jZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnU2VydmVyIGF3YWl0aW5nIHNlcnZlciByZXNwb25zZS4nLCBtb2RlbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xuICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgIH1cblxuICAgIH0pO1xufTtcblxuLyoqXG4gKiBQcm9jZXNzIGluZGljYXRvciB1cGRhdGVzXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IGFjdGlvbnMgLSB0aGUgYWN0aW9ucyBjb25maWcgZGF0YVxuICogQHBhcmFtIHtvYmplY3R9IHN1YlByb2Nlc3MgLSB0aGUgY3VycmVudCBzdWItcHJvY2VzcyBmb3JtIGNvbmZpZyBkYXRhXG4gKiBAcGFyYW0ge29iamVjdH0gX1dGSW5zdGFuY2UgLSB0aGUgY3VycmVudCB3b3JrZmxvdyBjb25zdHJ1Y3RvciBpbnN0YW5jZVxuICpcbiAqIEBleGFtcGxlICcnXG4gKlxuICogQHJldHVybiAnJ1xuICpcbiAqL1xuZnVuY3Rpb24gaW5kaWNhdG9ycyhpbmRpY2F0b3JzLCBfV0ZJbnN0YW5jZSwgc3B1dWlkKSB7XG4gICAgdmFyIG1vZGVsID0gW107XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHZhciBhcnJheSA9IEpTT04ueHBhdGgoXCJpbmRpY2F0b3JzW2ZuOmNvdW50KC4vd29ya2Zsb3dzL3Byb2Nlc3Nlc1tzdWJQcm9jZXNzVVVJRCBlcSAnXCIgKyBzcHV1aWQgKyBcIiddKSBndCAwXVwiLCBfV0ZJbnN0YW5jZSwge30pO1xuICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBhcnJheS5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgIHZhciBpbmRpY2F0b3IgPSBhcnJheVtqXTtcbiAgICAgICAgICAgICAgICB2YXIgaW5kaWNhdG9yTW9kZWwgPSB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiAnJyxcbiAgICAgICAgICAgICAgICAgICAgaW5zdGFuY2VzOiBbXVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHZhciBpbnN0YW5jZU1vZGVsID0ge1xuICAgICAgICAgICAgICAgICAgICB1dWlkOiAnJyxcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICcnLFxuICAgICAgICAgICAgICAgICAgICBrZXk6ICcnLFxuICAgICAgICAgICAgICAgICAgICBzZXE6IDEsXG4gICAgICAgICAgICAgICAgICAgIHJldjogJydcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpbmRpY2F0b3JNb2RlbC5pZCA9IGluZGljYXRvci5jYXRlZ29yeS50ZXJtO1xuICAgICAgICAgICAgICAgIGluc3RhbmNlTW9kZWwudXVpZCA9IGluZGljYXRvci5faWQ7XG4gICAgICAgICAgICAgICAgaW5zdGFuY2VNb2RlbC5yZXYgPSBpbmRpY2F0b3IuX3JldjtcbiAgICAgICAgICAgICAgICBpbnN0YW5jZU1vZGVsLnRpdGxlID0gaW5kaWNhdG9yLnRpdGxlO1xuICAgICAgICAgICAgICAgIGluc3RhbmNlTW9kZWwua2V5ID0gJyc7XG4gICAgICAgICAgICAgICAgaW5zdGFuY2VNb2RlbC5zZXEgPSBpbmRpY2F0b3IubW9kZWwucGVuZGluZy5zZXE7IC8vIGluZGljYXRvciBzZXEgbnVtYmVyIGhlcmUgd2hpY2ggaXMgZ2V0dGluZyB1cGRhdGVkLlxuICAgICAgICAgICAgICAgIGluZGljYXRvck1vZGVsLmluc3RhbmNlcy5wdXNoKGluc3RhbmNlTW9kZWwpO1xuICAgICAgICAgICAgICAgIG1vZGVsLnB1c2goaW5kaWNhdG9yTW9kZWwpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnUHJvY2VzcyBpbmRpY2F0b3IgbW9kZWwgdXBkYXRlZC4nLCBtb2RlbCk7XG4gICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xuICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICB9XG5cbiAgICB9KVxufTtcblxuLyoqXG4gKiBQcm9jZXNzIGFzc2lnbiB1c2VyXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHByb2Nlc3NJZCAtIHRoZSBXb3JrZmxvdyBjb25maWcgLyBkZWZpbml0aW9uIHByb2Nlc3MgaWRcbiAqIEBwYXJhbSB7bnVtYmVyfSBwcm9jZXNzU2VxIC0gdGhlIFdvcmtmbG93IGluc3RhbmNlIHByb2Nlc3Mgc2VxXG4gKiBAcGFyYW0ge3N0cmluZ30gc3ViUHJvY2Vzc0lkIC0gdGhlIFdvcmtmbG93IGNvbmZpZyAvIGRlZmluaXRpb24gc3ViLXByb2Nlc3MgaWRcbiAqIEBwYXJhbSB7bnVtYmVyfSBzdWJQcm9jZXNzU2VxIC0gdGhlIFdvcmtmbG93IGluc3RhbmNlIHN1Yi1wcm9jZXNzIHNlcVxuICogQHBhcmFtIHtzdHJpbmd9IHN0ZXBJZCAtIHRoZSBXb3JrZmxvdyBjb25maWcgLyBkZWZpbml0aW9uIHN0ZXAgaWRcbiAqIEBwYXJhbSB7c3RyaW5nfSB0cmFuc2l0aW9uSWQgLSB0aGUgV29ya2Zsb3cgY29uZmlnIC8gZGVmaW5pdGlvbiB0cmFuc2l0aW9uIGlkXG4gKiBAcGFyYW0ge29iamVjdH0gdXNlciAtIHRoZSB1c2VyIHRvIGFzc2lnbiB0b1xuICogQHBhcmFtIHtvYmplY3R9IF9XRkluc3RhbmNlIC0gdGhlIGN1cnJlbnQgd29ya2Zsb3cgY29uc3RydWN0b3IgaW5zdGFuY2VcbiAqXG4gKiBAZXhhbXBsZSAnJ1xuICpcbiAqIEByZXR1cm4gJydcbiAqXG4gKi9cbmZ1bmN0aW9uIGFzc2lnblVzZXIocHJvY2Vzc0lkLCBwcm9jZXNzU2VxLCBzdWJQcm9jZXNzSWQsIHN1YlByb2Nlc3NTZXEsIHVzZXIsIHV1aWQsIF9XRkluc3RhbmNlKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgXG4gICAgICAgICAgICAvLyBHZXQgdGhlIGN1cnJlbnQgc3ViUHJvY2VzcyBpbnN0YW5jZSBkYXRhXG5cbiAgICAgICAgICAgIC8qXG4gICAgICAgICAgICBfV0ZJbnN0YW5jZS5pbnN0YW5jZS5wcm9jZXNzZXMuZmlsdGVyKGZ1bmN0aW9uIChvYmpQcm9jZXNzKSB7XG4gICAgICAgICAgICAgICAgaWYgKG9ialByb2Nlc3MuaWQgPT0gcHJvY2Vzc0lkICYmIG9ialByb2Nlc3Muc2VxID09IHByb2Nlc3NTZXEpIHtcbiAgICAgICAgICAgICAgICAgICAgb2JqUHJvY2Vzcy5zdWJQcm9jZXNzZXMuZmlsdGVyKGZ1bmN0aW9uIChvYmpTdWJQcm9jZXNzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob2JqU3ViUHJvY2Vzcy5pZCA9PSBzdWJQcm9jZXNzSWQgJiYgb2JqU3ViUHJvY2Vzcy5zZXEgPT0gc3ViUHJvY2Vzc1NlcSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV1aWQgPSBvYmpTdWJQcm9jZXNzLnV1aWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgX1dGSW5zdGFuY2Uuc3VicHJvY2Vzc2VzLmZpbHRlcihmdW5jdGlvbiAoc3ViUHJvY2Vzc0l0ZW0pIHtcbiAgICAgICAgICAgICAgICBpZiAoc3ViUHJvY2Vzc0l0ZW0uX2lkID09IHV1aWQpIHtcbiAgICAgICAgICAgICAgICAgICAgLy9BZGRlZCB0byBoc3RvcnlcbiAgICAgICAgICAgICAgICAgICAgaWYoc3ViUHJvY2Vzc0l0ZW0uc3RlcC5hc3NpZ25tZW50SGlzdG9yeSA9PSB1bmRlZmluZWQpe1xuICAgICAgICAgICAgICAgICAgICAgICAgc3ViUHJvY2Vzc0l0ZW0uc3RlcC5hc3NpZ25tZW50SGlzdG9yeSA9IFtdO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmKHN1YlByb2Nlc3NJdGVtLnN0ZXAuYXNzaWduZWRUby51c2VySWQgIT0gXCJcIiAmJiBzdWJQcm9jZXNzSXRlbS5zdGVwLmFzc2lnbmVkVG8ubmFtZSAhPSBcIlwiKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1YlByb2Nlc3NJdGVtLnN0ZXAuYXNzaWdubWVudEhpc3RvcnkucHVzaChKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHN1YlByb2Nlc3NJdGVtLnN0ZXAuYXNzaWduZWRUbykpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBcblxuICAgICAgICAgICAgICAgICAgICAvLyBTZXQgdGhlIHVzZXIgZGV0YWlsc1xuICAgICAgICAgICAgICAgICAgICBzdWJQcm9jZXNzSXRlbS5zdGVwLmFzc2lnbmVkVG8udXNlcklkID0gdXNlci5pZDtcbiAgICAgICAgICAgICAgICAgICAgc3ViUHJvY2Vzc0l0ZW0uc3RlcC5hc3NpZ25lZFRvLm5hbWUgPSB1c2VyLm5hbWU7XG4gICAgICAgICAgICAgICAgICAgIHN1YlByb2Nlc3NJdGVtLnN0ZXAuYXNzaWduZWRUby5kYXRlVGltZSA9IG5ldyBEYXRlKCk7XG4gICAgICAgICAgICAgICAgICAgIHN1YlByb2Nlc3NJdGVtLnN0ZXAuYXNzaWduZWRUby50eXBlID0gQVNTSUdOTUVOVF9UWVBFX1JFQVNTSUdOTUVOVDtcbiAgICAgICAgICAgICAgICAgICAgc3ViUHJvY2Vzc0l0ZW0uc3RlcC5hc3NpZ25lZFRvLmR1ZURhdGVUaW1lID0gJyc7XG4gICAgICAgICAgICAgICAgICAgIHN1YlByb2Nlc3NJdGVtLnN0ZXAuYXNzaWduZWRUby5ieSA9IExPQ0FMX1NFVFRJTkdTLlNVQlNDUklQVElPTlMudXNlcklkICsgXCJcIjtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIC8vIFVwZGF0ZSB0aGUgaW5kaWNhdG9ycyB1c2VyIGRldGFpbHNcbiAgICAgICAgICAgICAgICAgICAgdmFyIGluZGljYXRvcnMgPSBzdWJQcm9jZXNzSXRlbS5pbmRpY2F0b3JzO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGluZGljYXRvcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpbmRpY2F0b3IgPSBpbmRpY2F0b3JzW2ldO1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBpbmRpY2F0b3IuaW5zdGFuY2VzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGluc3RhbmNlID0gaW5kaWNhdG9yLmluc3RhbmNlc1tqXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBrID0gMDsgayA8IF9XRkluc3RhbmNlLmluZGljYXRvcnMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRvYyA9IF9XRkluc3RhbmNlLmluZGljYXRvcnNba107XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbnN0YW5jZS51dWlkID09IGRvYy5faWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvYy53b3JrZmxvd3MuZmlsdGVyKGZ1bmN0aW9uICh3b3JrZmxvdykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh3b3JrZmxvdy5pZCA9PSBfV0ZJbnN0YW5jZS5jb25maWcuX2lkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdvcmtmbG93LnByb2Nlc3Nlcy5maWx0ZXIoZnVuY3Rpb24gKHByb2Nlc3NJdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocHJvY2Vzc0l0ZW0uaWQgPT0gcHJvY2Vzc0lkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVXBkYXRlIHRoZSB1c2VyIGlkIGFuZCBuYW1lIGluIHRoZSBkb2N1bWVudFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2Nlc3NJdGVtLnN0ZXAuYXNzaWduZWRUby51c2VySWQgPSB1c2VyLmlkO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2Nlc3NJdGVtLnN0ZXAuYXNzaWduZWRUby5uYW1lID0gdXNlci5uYW1lO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIC8vU2VuZCBhc3NpZ24gdXNlciBub3RpZmljYXRpb24gZnJvbSBoZXJlXG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIG5vdGlmaWNhdGlvbiA9IEpTT04ueHBhdGgoXCIvcHJvY2Vzc2VzW19pZCBlcSAnXCIrIHByb2Nlc3NJZCArXCInXS9ub3RpZmljYXRpb25zXCIsX1dGSW5zdGFuY2UuY29uZmlnLCB7fSlbMF07XG5cbiAgICAgICAgICAgICAgICAgICAgaWYobm90aWZpY2F0aW9uICE9IHVuZGVmaW5lZCAmJiBub3RpZmljYXRpb24ucmVBc3NpZ25tZW50ICE9IHVuZGVmaW5lZCl7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbnNNb2R1bGUubm90aWZpY2F0aW9uLnJlQXNzaWdubWVudE5vdGlmaWNhdGlvbihub3RpZmljYXRpb24sIF9XRkluc3RhbmNlLCB1dWlkLCB1c2VyKS50aGVuKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uKHN1Y2Nlc3Mpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnVXNlciBhc3NpZ25lZCBzdWNjZXNzZnVsbHkuIFVzZXJJZDogXCInICsgdXNlci5pZCArICdcIiwgTmFtZTogXCInICsgdXNlci5uYW1lICsgJ1wiJywgc3ViUHJvY2Vzc0l0ZW0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24oZmFpbCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShmYWlsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgXG5cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ1VzZXIgYXNzaWduZWQgc3VjY2Vzc2Z1bGx5LiBVc2VySWQ6IFwiJyArIHVzZXIuaWQgKyAnXCIsIE5hbWU6IFwiJyArIHVzZXIubmFtZSArICdcIicsIHN1YlByb2Nlc3NJdGVtKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoc3VjY2Vzcyk7XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgXG5cblxuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgIH1cblxuICAgIH0pO1xufTtcblxuLyoqXG4gKiBQcm9jZXNzIGluZGljYXRvciBkb2N1bWVudCB1cGRhdGVzXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IGFjdGlvbnMgLSB0aGUgYWN0aW9ucyBjb25maWcgZGF0YVxuICogQHBhcmFtIHtvYmplY3R9IHN1YlByb2Nlc3MgLSB0aGUgY3VycmVudCBzdWItcHJvY2VzcyBmb3JtIGNvbmZpZyBkYXRhXG4gKiBAcGFyYW0ge29iamVjdH0gX1dGSW5zdGFuY2UgLSB0aGUgY3VycmVudCB3b3JrZmxvdyBjb25zdHJ1Y3RvciBpbnN0YW5jZVxuICpcbiAqIEBleGFtcGxlICcnXG4gKlxuICogQHJldHVybiAnJ1xuICpcbiAqL1xuZnVuY3Rpb24gaW5kaWNhdG9yRG9jcyhwcm9jZXNzSWQsIGluZGljYXRvcnMsIHN0ZXAsIF9XRkluc3RhbmNlKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFVwZGF0ZSB0aGUgaW5kaWNhdG9yIHNlY3Rpb25zIG9mIHRoZSBzdWJQcm9jZXNzXG4gICAgICAgICAgICBpZiAoaW5kaWNhdG9ycyA9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICB2YXIgZXJyb3IgPSB1dGlsLmVycm9yKCdXRkluZGljYXRvcnNVcGRhdGUnLCAnSW5kaWNhdG9ycyBwYXJhbWV0ZXIgaXMgcmVxdWlyZWQuIC0gVmFsdWU6ICcgKyBpbmRpY2F0b3JzKVxuICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGluZGljYXRvcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGluZGljYXRvciA9IGluZGljYXRvcnNbaV07XG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgaW5kaWNhdG9yLmluc3RhbmNlcy5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGluc3RhbmNlID0gaW5kaWNhdG9yLmluc3RhbmNlc1tqXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgX1dGSW5zdGFuY2UuaW5kaWNhdG9ycy5sZW5ndGg7IGsrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkb2MgPSBfV0ZJbnN0YW5jZS5pbmRpY2F0b3JzW2tdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbnN0YW5jZS51dWlkID09IGRvYy5faWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9jLndvcmtmbG93cy5maWx0ZXIoZnVuY3Rpb24gKHdvcmtmbG93KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAod29ya2Zsb3cuaWQgPT0gX1dGSW5zdGFuY2UuY29uZmlnLl9pZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdvcmtmbG93LnByb2Nlc3Nlcy5maWx0ZXIoZnVuY3Rpb24gKHByb2Nlc3NJdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwcm9jZXNzSXRlbS5pZCA9PSBwcm9jZXNzSWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2Nlc3NJdGVtLnN0ZXAuaWQgPSBzdGVwLmlkO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvY2Vzc0l0ZW0uc3RlcC5zZXEgPSBzdGVwLnNlcTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2Nlc3NJdGVtLnN0ZXAuc3RhdHVzID0gc3RlcC5zdGF0dXM7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9jZXNzSXRlbS5zdGVwLm1lc3NhZ2UgPSBzdGVwLm1lc3NhZ2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9jZXNzSXRlbS5zdGVwLmFzc2lnbmVkVG8udXNlcklkID0gc3RlcC5hc3NpZ25lZFRvLnVzZXJJZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2Nlc3NJdGVtLnN0ZXAuYXNzaWduZWRUby5uYW1lID0gc3RlcC5hc3NpZ25lZFRvLm5hbWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9jZXNzSXRlbS5zdGVwLmNvbW1lbnQgPSBzdGVwLmNvbW1lbnQgIT09IHVuZGVmaW5lZCA/IHN0ZXAuY29tbWVudCA6ICcnO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ0luZGljYXRvciBkb2N1bWVudHMgd29ya2Zsb3cgcHJvY2VzcyBtb2RlbCB1cGRhdGVkLicsIF9XRkluc3RhbmNlKTtcbiAgICAgICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgIH1cblxuICAgIH0pXG59O1xuXG4vKipcbiAqIFByb2Nlc3MgYWN0aW9uc1xuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBhY3Rpb25zIC0gdGhlIGFjdGlvbnMgY29uZmlnIGRhdGFcbiAqIEBwYXJhbSB7b2JqZWN0fSBzdWJQcm9jZXNzIC0gdGhlIGN1cnJlbnQgc3ViLXByb2Nlc3MgZm9ybSBjb25maWcgZGF0YVxuICogQHBhcmFtIHtvYmplY3R9IF9XRkluc3RhbmNlIC0gdGhlIGN1cnJlbnQgd29ya2Zsb3cgY29uc3RydWN0b3IgaW5zdGFuY2VcbiAqXG4gKiBAZXhhbXBsZSAnJ1xuICpcbiAqIEByZXR1cm4gJydcbiAqXG4gKi9cblxuZnVuY3Rpb24gYWN0aW9ucyhhY3Rpb25zLCBwcm9jZXNzSWQsIHByb2Nlc3NTZXEsIHN1YlByb2Nlc3NJZCwgc3ViUHJvY2Vzc1NlcSwgc3ViUHJvY2Vzcywgc3RlcCwgX1dGSW5zdGFuY2UsIGRhdGEsIHV1aWQpIHtcbiAgICB2YXIgYXJyQWN0aW9ucyA9IFtdO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIHV0aWwuc3luY0xvb3AoYWN0aW9ucy5sZW5ndGgsIGZ1bmN0aW9uIChsb29wKSB7XG4gICAgICAgICAgICB2YXIgY291bnRlciA9IGxvb3AuaXRlcmF0aW9uKCk7XG4gICAgICAgICAgICBhY3Rpb24oYWN0aW9uc1tjb3VudGVyXSwgcHJvY2Vzc0lkLCBwcm9jZXNzU2VxLCBzdWJQcm9jZXNzSWQsIHN1YlByb2Nlc3NTZXEsIHN1YlByb2Nlc3MsIHN0ZXAsIF9XRkluc3RhbmNlLCBkYXRhLCB1dWlkKVxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJldEFjdGlvbiA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBhY3Rpb25zW2NvdW50ZXJdLl9pZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlcTogY291bnRlcixcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IHJlc3VsdFxuICAgICAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgICAgIGFyckFjdGlvbnMucHVzaChyZXRBY3Rpb24pO1xuICAgICAgICAgICAgICAgICAgICBsb29wLm5leHQoKTtcbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIGxvb3AuYnJlYWsoKTtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdBY3Rpb25zIGNvbXBsZXRlZCBzdWNjZXNzZnVsbHkuJywgYXJyQWN0aW9ucyk7XG4gICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn07XG5cbi8qKlxuICogUHJvY2VzcyBhY3Rpb25cbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gYWN0aW9uIC0gdGhlIGFjdGlvbiBjb25maWcgZGF0YVxuICogQHBhcmFtIHtvYmplY3R9IHN1YlByb2Nlc3MgLSB0aGUgY3VycmVudCBzdWItcHJvY2VzcyBmb3JtIGNvbmZpZyBkYXRhXG4gKiBAcGFyYW0ge29iamVjdH0gX1dGSW5zdGFuY2UgLSB0aGUgY3VycmVudCB3b3JrZmxvdyBjb25zdHJ1Y3RvciBpbnN0YW5jZVxuICpcbiAqIEBleGFtcGxlICcnXG4gKlxuICogQHJldHVybiAnJ1xuICpcbiAqLyBcbmZ1bmN0aW9uIGFjdGlvbihhY3Rpb24sIHByb2Nlc3NJZCwgcHJvY2Vzc1NlcSwgc3ViUHJvY2Vzc0lkLCBzdWJQcm9jZXNzU2VxLCBzdWJQcm9jZXNzLCBzdGVwLCBfV0ZJbnN0YW5jZSwgZGF0YSwgdXVpZCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG5cbiAgICAgICAgaWYgKGFjdGlvbi5tZXRob2QgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB2YXIgbWV0aG9kUG9zc2libGVJdGVtcyA9IFtcImZvcm1cIiwgXCJpbmRpY2F0b3JcIiwgXCJwcm9maWxlXCIsIFwic3ViUHJvY2Vzc0luc3RhbmNlXCIsIFwic3RlcFwiLCBcImNvbW11bml0eVwiLCBcImFwcGxpY2F0aW9uXCIsIFwidXNlclwiLCBcInNkb1wiLCBcInBlcmZvcm1hbmNlXCIsIFwidGF4b25vbXlcIiwgXCJ2YXJpYWJsZXNcIiwgXCJub3RpZmljYXRpb25cIixcInJlcG9ydFwiLFwid29ya2VyXCJdO1xuICAgICAgICAgICAgc3dpdGNoIChwcm9wZXJ0eUV4aXN0cyhhY3Rpb24ubWV0aG9kLCBtZXRob2RQb3NzaWJsZUl0ZW1zKSkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ2Zvcm0nOlxuICAgICAgICAgICAgICAgICAgICBpZiAoYWN0aW9uLm1ldGhvZC5mb3JtLmNyZWF0ZSAhPSB1bmRlZmluZWQpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFyZ3MgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChwcm9jZXNzSWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKHN1YlByb2Nlc3MpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKHN0ZXApO1xuICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKGFjdGlvbik7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2gocHJvY2Vzc1NlcSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2goc3ViUHJvY2Vzc1NlcSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChfV0ZJbnN0YW5jZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2goZGF0YS5jcmVhdGVUeXBlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaCh1dWlkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChkYXRhLmJhc2VVVUlEKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChkYXRhKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgZm9ybS5jcmVhdGUoYXJncykudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQuZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGFjdGlvbi5tZXRob2QuZm9ybS5hdXRob3Jpc2UgIT0gdW5kZWZpbmVkKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhcmdzID0gW107XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2gocHJvY2Vzc0lkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChzdWJQcm9jZXNzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChwcm9jZXNzU2VxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChzdWJQcm9jZXNzU2VxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChfV0ZJbnN0YW5jZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2goZGF0YS5jcmVhdGVUeXBlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaCh1dWlkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChkYXRhLmJhc2VVVUlEKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChkYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcm0uYXV0aG9yaXNlKGFyZ3MpLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzdWx0LmRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChhY3Rpb24ubWV0aG9kLmZvcm0udW5kcmFmdCAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhcmdzID0gW107XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2goX1dGSW5zdGFuY2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKGRhdGEuY3JlYXRlVHlwZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2godXVpZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2goZGF0YS5iYXNlVVVJRCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2goZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtLnNldFVuRHJhZnQoYXJncykudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQuZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGFjdGlvbi5tZXRob2QuZm9ybS5kcmFmdCAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhcmdzID0gW107XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2goX1dGSW5zdGFuY2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKGRhdGEuY3JlYXRlVHlwZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2godXVpZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2goZGF0YS5iYXNlVVVJRCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2goZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtLnNldERyYWZ0KGFyZ3MpLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzdWx0LmRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChhY3Rpb24ubWV0aG9kLmZvcm0uY2xvc2UgIT0gdW5kZWZpbmVkKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhcmdzID0gW107XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2goc3ViUHJvY2Vzcy5pbmRpY2F0b3JzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChfV0ZJbnN0YW5jZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2goZGF0YS5jcmVhdGVUeXBlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaCh1dWlkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChkYXRhLmJhc2VVVUlEKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChkYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcm0uY2xvc2UoYXJncykudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQuZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGFjdGlvbi5tZXRob2QuZm9ybS5hdXRob3Jpc2VBbmRDcmVhdGVOZXdTZXEgIT0gdW5kZWZpbmVkKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhcmdzID0gW107XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2gocHJvY2Vzc0lkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChzdWJQcm9jZXNzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChwcm9jZXNzU2VxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChzdWJQcm9jZXNzU2VxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChfV0ZJbnN0YW5jZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2goZGF0YS5jcmVhdGVUeXBlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaCh1dWlkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChkYXRhLmJhc2VVVUlEKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChkYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcm0uYXV0aG9yaXNlKGFyZ3MpLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBDcmVhdGUgbmV3IHNlcXVlbmNlXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgYXJncyA9IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChwcm9jZXNzSWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChzdWJQcm9jZXNzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2goc3RlcCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKGFjdGlvbik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKHByb2Nlc3NTZXEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChzdWJQcm9jZXNzU2VxKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChfV0ZJbnN0YW5jZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKGRhdGEuY3JlYXRlVHlwZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKHV1aWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaCh1dWlkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2goZGF0YSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtLmNyZWF0ZShhcmdzKS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQuZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL0VkIGNyZWF0aW9uIG9mIG5ldyBzZXF1ZW5jZVxuXG5cblxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgfSBcblxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdpbmRpY2F0b3InOlxuICAgICAgICAgICAgICAgICAgICBpZiAoYWN0aW9uLm1ldGhvZC5pbmRpY2F0b3IuY3JlYXRlICE9IHVuZGVmaW5lZCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKFwiTm90IGltcGxlbWVudGVkXCIpO1xuXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoYWN0aW9uLm1ldGhvZC5pbmRpY2F0b3IuaW5zdGFudGlhdGUgIT0gdW5kZWZpbmVkKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoXCJOb3QgaW1wbGVtZW50ZWRcIik7XG5cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChhY3Rpb24ubWV0aG9kLmluZGljYXRvci5zZXRWYWx1ZSAhPSB1bmRlZmluZWQpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHBhdGggPSBhY3Rpb24ubWV0aG9kLmluZGljYXRvci5zZXRWYWx1ZS5wYXRoO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBoZWxwZXIuZ2V0Tm9kZVZhbHVlKGFjdGlvbi5tZXRob2QuaW5kaWNhdG9yLnNldFZhbHVlLmRhdGEsIF9XRkluc3RhbmNlLCB1dWlkKS50aGVuKGZ1bmN0aW9uIChkYXRhVmFsdWUpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhcmdzID0gW107XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKF9XRkluc3RhbmNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2godXVpZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKHBhdGgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChkYXRhVmFsdWUpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybS51cGRhdGVJbmRpY2F0b3IoYXJncykudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzdWx0LmRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG5cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChhY3Rpb24ubWV0aG9kLmluZGljYXRvci51cGRhdGVTdGF0dXMgIT0gdW5kZWZpbmVkKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpbmRpY2F0b3JTZXRJZCA9IGFjdGlvbi5tZXRob2QuaW5kaWNhdG9yLmluZGljYXRvclNldElkO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFyZ3MgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChfV0ZJbnN0YW5jZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2godXVpZCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhY3Rpb24ubWV0aG9kLmluZGljYXRvci51cGRhdGVTdGF0dXMgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN0YXR1cyA9IGFjdGlvbi5tZXRob2QuaW5kaWNhdG9yLnVwZGF0ZVN0YXR1cztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2goc3RhdHVzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2goaW5kaWNhdG9yU2V0SWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEtlZXAgaW5kaWNhdG9yIGZ1bmN0aW9ucyBpbiBpbmRpYXRvciBmaWxlIGlzdGVhZCBvZiBmb3JtIGZpbGUuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybS5tYXJrVXBkYXRlSW5kaWNhdG9yKGFyZ3MpLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdC5kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoXCJBY3Rpb24gaW5kaWNhdG9yIHN1YiB0eXBlIG5vdCBmb3VuZC5cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChhY3Rpb24ubWV0aG9kLmluZGljYXRvci5zZXRXcmFwcGVyRWxlbWVudCAhPSB1bmRlZmluZWQpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHBhdGggPSBhY3Rpb24ubWV0aG9kLmluZGljYXRvci5zZXRXcmFwcGVyRWxlbWVudC5wYXRoO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGluZGljYXRvclNldElkID0gYWN0aW9uLm1ldGhvZC5pbmRpY2F0b3Iuc2V0V3JhcHBlckVsZW1lbnQuaW5kaWNhdG9yU2V0SWQ7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGhlbHBlci5nZXROb2RlVmFsdWUoYWN0aW9uLm1ldGhvZC5pbmRpY2F0b3Iuc2V0V3JhcHBlckVsZW1lbnQuZGF0YSwgX1dGSW5zdGFuY2UsIHV1aWQpLnRoZW4oZnVuY3Rpb24gKGRhdGFWYWx1ZSkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFyZ3MgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2goX1dGSW5zdGFuY2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaCh1dWlkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2gocGF0aCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKGRhdGFWYWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKGluZGljYXRvclNldElkKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm0udXBkYXRlSW5kaWNhdG9yV3JhcHBlcihhcmdzKS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQuZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cblxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAncHJvZmlsZSc6XG4gICAgICAgICAgICAgICAgICAgIGlmIChhY3Rpb24ubWV0aG9kLnByb2ZpbGUuY3JlYXRlICE9IHVuZGVmaW5lZCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgYXJncyA9IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKHByb2Nlc3NJZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2goX1dGSW5zdGFuY2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKGRhdGEuY3JlYXRlVHlwZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2godXVpZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2goZGF0YS5iYXNlVVVJRCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2goZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtLmNyZWF0ZVByb2ZpbGUoYXJncykudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQuZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGFjdGlvbi5tZXRob2QucHJvZmlsZS5zZXRTdGF0dXNUbyAhPSB1bmRlZmluZWQpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhcmdzID0gW107XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN0YXR1cyA9IGFjdGlvbi5tZXRob2QucHJvZmlsZS5zZXRTdGF0dXNUbztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2goX1dGSW5zdGFuY2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaCh1dWlkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2goc3RhdHVzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm0uc2V0U3RhdHVzKGFyZ3MpLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdC5kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdzdWJQcm9jZXNzSW5zdGFuY2UnOlxuICAgICAgICAgICAgICAgICAgICB2YXIgc3BQb3NzaWJsZUl0ZW1zID0gW1wiaW5zdGFudGlhdGVcIiwgXCJhdXRob3Jpc2VcIiwgXCJjbG9zZVwiLCBcInNldFZhcmlhYmxlXCIsIFwic2V0U3RhdHVzVG9cIiwgXCJzZXRTdGF0dXNNc2dUb1wiLCBcInNldFRpdGxlXCIsIFwic2V0VmFsaWREYXRlXCJdO1xuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKHByb3BlcnR5RXhpc3RzKGFjdGlvbi5tZXRob2Quc3ViUHJvY2Vzc0luc3RhbmNlLCBzcFBvc3NpYmxlSXRlbXMpKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ3NldFRpdGxlJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWxwZXIuZ2V0Tm9kZVZhbHVlKGFjdGlvbi5tZXRob2Quc3ViUHJvY2Vzc0luc3RhbmNlLnNldFRpdGxlLCBfV0ZJbnN0YW5jZSwgdXVpZCkudGhlbihmdW5jdGlvbiAoZGF0YVZhbHVlKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uc01vZHVsZS5zdWJQcm9jZXNzSW5zdGFuY2Uuc2V0VGl0bGUoYWN0aW9uLm1ldGhvZC5zdWJQcm9jZXNzSW5zdGFuY2Uuc2V0VGl0bGUsIHV1aWQsIGRhdGFWYWx1ZSwgX1dGSW5zdGFuY2UpLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQuZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3VwZGF0ZSBzdWJwcm9jZXNzIGxhYmVsIGluIHdvcmtmbG93IGluc3RhbmNlIHByb2Nlc3Mgb2JqZWN0OiBUT0RPXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ3NldFZhbGlkRGF0ZSc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVscGVyLmdldE5vZGVWYWx1ZShhY3Rpb24ubWV0aG9kLnN1YlByb2Nlc3NJbnN0YW5jZS5zZXRWYWxpZERhdGUsIF9XRkluc3RhbmNlLCB1dWlkKS50aGVuKGZ1bmN0aW9uIChkYXRhVmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uc01vZHVsZS5zdWJQcm9jZXNzSW5zdGFuY2Uuc2V0VmFsaWREYXRlKGFjdGlvbi5tZXRob2Quc3ViUHJvY2Vzc0luc3RhbmNlLnNldFZhbGlkRGF0ZSwgdXVpZCwgZGF0YVZhbHVlLCBfV0ZJbnN0YW5jZSkudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdC5kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3VwZGF0ZSBzdWJwcm9jZXNzIGxhYmVsIGluIHdvcmtmbG93IGluc3RhbmNlIHByb2Nlc3Mgb2JqZWN0OiBUT0RPXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KFwiTm8gbWV0aG9kIGZvdW5kIGZyb20gaW1wbGVtZW50ZWQgbGlzdCBpbiBzdWJwcm9jZXNzIGFjdGlvbi5cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdzdGVwJzpcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnY29tbXVuaXR5JzpcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNvbW11bml0eVBvc3NpYmxlSXRlbXMgPSBbXCJjcmVhdGVDb21tdW5pdHlcIiwgXCJyZWxlYXNlQWRvcHRlZEFwcGxpY2F0aW9uXCIsIFwidXNlckpvaW5Db21tdW5pdHlcIl07XG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAocHJvcGVydHlFeGlzdHMoYWN0aW9uLm1ldGhvZC5jb21tdW5pdHksIGNvbW11bml0eVBvc3NpYmxlSXRlbXMpKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2NyZWF0ZUNvbW11bml0eSc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFjdGlvbnNNb2R1bGUuY29tbXVuaXR5LmNyZWF0ZUNvbW11bml0eShhY3Rpb24ubWV0aG9kLmNvbW11bml0eS5jcmVhdGVDb21tdW5pdHksIHV1aWQsIF9XRkluc3RhbmNlKS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQuZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAncmVsZWFzZUFkb3B0ZWRBcHBsaWNhdGlvbic6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFjdGlvbnNNb2R1bGUuY29tbXVuaXR5LnJlbGVhc2VBZG9wdGVkQXBwbGljYXRpb24oYWN0aW9uLm1ldGhvZC5jb21tdW5pdHkucmVsZWFzZUFkb3B0ZWRBcHBsaWNhdGlvbiwgdXVpZCwgX1dGSW5zdGFuY2UpLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdC5kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICd1c2VySm9pbkNvbW11bml0eSc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFjdGlvbnNNb2R1bGUuY29tbXVuaXR5LnVzZXJKb2luQ29tbXVuaXR5KGFjdGlvbi5tZXRob2QuY29tbXVuaXR5LnVzZXJKb2luQ29tbXVuaXR5LCB1dWlkLCBfV0ZJbnN0YW5jZSkudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzdWx0LmRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KFwiTm8gbWV0aG9kIGZvdW5kIGZyb20gaW1wbGVtZW50ZWQgbGlzdC5cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdhcHBsaWNhdGlvbic6XG4gICAgICAgICAgICAgICAgICAgIHZhciBhcHBsaWNhdGlvblBvc3NpYmxlSXRlbXMgPSBbXCJjcmVhdGVBcHBEZWZpbml0aW9uXCIsIFwiYnVpbGRBcHBsaWNhdGlvblwiLCBcImFwcGxpY2F0aW9uQWRvcHRpb25cIl07XG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAocHJvcGVydHlFeGlzdHMoYWN0aW9uLm1ldGhvZC5hcHBsaWNhdGlvbiwgYXBwbGljYXRpb25Qb3NzaWJsZUl0ZW1zKSkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdjcmVhdGVBcHBEZWZpbml0aW9uJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYWN0aW9uc01vZHVsZS5hcHBsaWNhdGlvbi5jcmVhdGVBcHBEZWZpbml0aW9uKGFjdGlvbi5tZXRob2QuYXBwbGljYXRpb24uY3JlYXRlQXBwRGVmaW5pdGlvbiwgdXVpZCwgX1dGSW5zdGFuY2UpLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdC5kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdidWlsZEFwcGxpY2F0aW9uJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYWN0aW9uc01vZHVsZS5hcHBsaWNhdGlvbi5idWlsZEFwcGxpY2F0aW9uKGFjdGlvbi5tZXRob2QuYXBwbGljYXRpb24uYnVpbGRBcHBsaWNhdGlvbiwgdXVpZCwgX1dGSW5zdGFuY2UpLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdC5kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdhcHBsaWNhdGlvbkFkb3B0aW9uJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYWN0aW9uc01vZHVsZS5hcHBsaWNhdGlvbi5hcHBsaWNhdGlvbkFkb3B0aW9uKGFjdGlvbi5tZXRob2QuYXBwbGljYXRpb24uYXBwbGljYXRpb25BZG9wdGlvbiwgdXVpZCwgX1dGSW5zdGFuY2UpLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdC5kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChcIk5vIG1ldGhvZCBmb3VuZCBmcm9tIGltcGxlbWVudGVkIGxpc3QuXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICd1c2VyJzpcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnc2RvJzpcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNkb1Bvc3NpYmxlSXRlbXMgPSBbXCJjcmVhdGVcIixcImVucm9sbENvdXJzZVwiXTtcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChwcm9wZXJ0eUV4aXN0cyhhY3Rpb24ubWV0aG9kLnNkbywgc2RvUG9zc2libGVJdGVtcykpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnY3JlYXRlJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYWN0aW9uc01vZHVsZS5zZG8uY3JlYXRlKGFjdGlvbi5tZXRob2Quc2RvLmNyZWF0ZSwgdXVpZCwgX1dGSW5zdGFuY2UpLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdC5kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnZW5yb2xsQ291cnNlJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYWN0aW9uc01vZHVsZS5zZG8uZW5yb2xsQ291cnNlKGFjdGlvbi5tZXRob2Quc2RvLmVucm9sbENvdXJzZSwgdXVpZCwgX1dGSW5zdGFuY2UpLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdC5kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChcIk5vIG1ldGhvZCBmb3VuZCBmcm9tIGltcGxlbWVudGVkIGxpc3QuXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdwZXJmb3JtYW5jZSc6XG4gICAgICAgICAgICAgICAgICAgIHZhciBwZXJmb3JtYW5jZVBvc3NpYmxlSXRlbXMgPSBbXCJjcmVhdGVcIiwgXCJjb25maWd1cmVOb2RlXCIsIFwidW5sb2NrUGVyaW9kXCIsIFwibG9ja1BlcmZvcm1hbmNlTW9kZWxcIiwgXCJzZXRNb2RlbFN0YXR1c1wiXTtcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChwcm9wZXJ0eUV4aXN0cyhhY3Rpb24ubWV0aG9kLnBlcmZvcm1hbmNlLCBwZXJmb3JtYW5jZVBvc3NpYmxlSXRlbXMpKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2NyZWF0ZSc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFjdGlvbnNNb2R1bGUucGVyZm9ybWFuY2UuY3JlYXRlKGFjdGlvbi5tZXRob2QucGVyZm9ybWFuY2UuY3JlYXRlLCB1dWlkLCBfV0ZJbnN0YW5jZSkudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzdWx0LmRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdjb25maWd1cmVOb2RlJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYWN0aW9uc01vZHVsZS5wZXJmb3JtYW5jZS5jb25maWd1cmVOb2RlKGFjdGlvbi5tZXRob2QucGVyZm9ybWFuY2UuY29uZmlndXJlTm9kZSwgdXVpZCwgX1dGSW5zdGFuY2UpLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdC5kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAndW5sb2NrUGVyaW9kJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYWN0aW9uc01vZHVsZS5wZXJmb3JtYW5jZS51bmxvY2tQZXJpb2QoYWN0aW9uLm1ldGhvZC5wZXJmb3JtYW5jZS51bmxvY2tQZXJpb2QsIHV1aWQsIF9XRkluc3RhbmNlKS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQuZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ3NldE1vZGVsU3RhdHVzJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYWN0aW9uc01vZHVsZS5wZXJmb3JtYW5jZS5zZXRNb2RlbFN0YXR1cyhhY3Rpb24ubWV0aG9kLnBlcmZvcm1hbmNlLnNldE1vZGVsU3RhdHVzLCB1dWlkLCBfV0ZJbnN0YW5jZSkudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzdWx0LmRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdsb2NrUGVyZm9ybWFuY2VNb2RlbCc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFjdGlvbnNNb2R1bGUucGVyZm9ybWFuY2UubG9ja1BlcmZvcm1hbmNlTW9kZWwoYWN0aW9uLm1ldGhvZC5wZXJmb3JtYW5jZS5sb2NrUGVyZm9ybWFuY2VNb2RlbCwgdXVpZCwgX1dGSW5zdGFuY2UpLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdC5kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KFwiTm8gbWV0aG9kIGZvdW5kIGZyb20gaW1wbGVtZW50ZWQgbGlzdC5cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ3RheG9ub215JzpcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRheG9ub215UG9zc2libGVJdGVtcyA9IFtcImNyZWF0ZVwiXTtcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChwcm9wZXJ0eUV4aXN0cyhhY3Rpb24ubWV0aG9kLnRheG9ub215LCB0YXhvbm9teVBvc3NpYmxlSXRlbXMpKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2NyZWF0ZSc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFjdGlvbnNNb2R1bGUudGF4b25vbXkuY3JlYXRlKGFjdGlvbi5tZXRob2QudGF4b25vbXkuY3JlYXRlLCB1dWlkLCBfV0ZJbnN0YW5jZSkudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzdWx0LmRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KFwiTm8gbWV0aG9kIGZvdW5kIGZyb20gaW1wbGVtZW50ZWQgbGlzdC5cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICd2YXJpYWJsZXMnOlxuICAgICAgICAgICAgICAgICAgICB2YXIgdmFyaWFibGVzUG9zc2libGVJdGVtcyA9IFtcInNldFZhcmlhYmxlXCJdO1xuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKHByb3BlcnR5RXhpc3RzKGFjdGlvbi5tZXRob2QudmFyaWFibGVzLCB2YXJpYWJsZXNQb3NzaWJsZUl0ZW1zKSkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdzZXRWYXJpYWJsZSc6XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYWN0aW9uc01vZHVsZS52YXJpYWJsZXMuc2V0VmFyaWFibGUoYWN0aW9uLm1ldGhvZC52YXJpYWJsZXMuc2V0VmFyaWFibGUsIF9XRkluc3RhbmNlLCB1dWlkKS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQuZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoXCJObyBtZXRob2QgZm91bmQgZnJvbSBpbXBsZW1lbnRlZCBsaXN0LlwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ25vdGlmaWNhdGlvbic6XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYWN0aW9uc01vZHVsZS5ub3RpZmljYXRpb24uc2VuZE5vdGlmaWNhdGlvbldvcmtlcihhY3Rpb24ubWV0aG9kLm5vdGlmaWNhdGlvbiwgX1dGSW5zdGFuY2UsIHV1aWQpLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdC5kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgY2FzZSAncmVwb3J0JzpcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJlcG9ydFBvc3NpYmxlSXRlbXMgPSBbXCJjcmVhdGVQZXJmb3JtYW5jZVJlcG9ydFwiLFwiY3JlYXRlUmVwb3J0XCIsXCJzZG9SZXBvcnRcIixcImV4ZWN1dGVSZXBvcnRcIixcImdlbmVyYXRlVmlld1wiXTtcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChwcm9wZXJ0eUV4aXN0cyhhY3Rpb24ubWV0aG9kLnJlcG9ydCwgcmVwb3J0UG9zc2libGVJdGVtcykpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnY3JlYXRlUGVyZm9ybWFuY2VSZXBvcnQnOlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFjdGlvbnNNb2R1bGUucmVwb3J0LmNyZWF0ZVBlcmZvcm1hbmNlUmVwb3J0KGFjdGlvbi5tZXRob2QucmVwb3J0LmNyZWF0ZVBlcmZvcm1hbmNlUmVwb3J0LCBfV0ZJbnN0YW5jZSwgdXVpZCkudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzdWx0LmRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2NyZWF0ZVJlcG9ydCc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFjdGlvbnNNb2R1bGUucmVwb3J0LmNyZWF0ZVJlcG9ydChhY3Rpb24ubWV0aG9kLnJlcG9ydC5jcmVhdGVSZXBvcnQsIF9XRkluc3RhbmNlLCB1dWlkICkudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzdWx0LmRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdzZG9SZXBvcnQnOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBhY3Rpb25zTW9kdWxlLnJlcG9ydC5zZG9SZXBvcnQoYWN0aW9uLm1ldGhvZC5yZXBvcnQuc2RvUmVwb3J0LCBfV0ZJbnN0YW5jZSwgdXVpZCApLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdC5kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnZXhlY3V0ZVJlcG9ydCc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFjdGlvbnNNb2R1bGUucmVwb3J0LmV4ZWN1dGVSZXBvcnQoYWN0aW9uLm1ldGhvZC5yZXBvcnQuZXhlY3V0ZVJlcG9ydCwgX1dGSW5zdGFuY2UsIHV1aWQgKS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQuZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2dlbmVyYXRlVmlldyc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFjdGlvbnNNb2R1bGUucmVwb3J0LmdlbmVyYXRlVmlldyhhY3Rpb24ubWV0aG9kLnJlcG9ydC5nZW5lcmF0ZVZpZXcsIF9XRkluc3RhbmNlLCB1dWlkICkudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzdWx0LmRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICBcblxuICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoXCJObyBtZXRob2QgZm91bmQgZnJvbSBpbXBsZW1lbnRlZCBsaXN0LlwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnd29ya2VyJzpcbiAgICAgICAgICAgICAgICAgICAgdmFyIHdvcmtlclBvc3NpYmxlSXRlbXMgPSBbXCJzZW5kV29ya2VyXCIsIFwiZXhlY3V0ZUxvY2FsXCJdO1xuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKHByb3BlcnR5RXhpc3RzKGFjdGlvbi5tZXRob2Qud29ya2VyLCB3b3JrZXJQb3NzaWJsZUl0ZW1zKSkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdzZW5kV29ya2VyJzpcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBhY3Rpb25zTW9kdWxlLndvcmtlci5zZW5kV29ya2VyKGFjdGlvbi5tZXRob2Qud29ya2VyLnNlbmRXb3JrZXIsIF9XRkluc3RhbmNlLCB1dWlkKS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQuZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnZXhlY3V0ZUxvY2FsJzpcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBhY3Rpb25zTW9kdWxlLndvcmtlci5leGVjdXRlTG9jYWwoYWN0aW9uLm1ldGhvZC53b3JrZXIuZXhlY3V0ZUxvY2FsLCBfV0ZJbnN0YW5jZSwgdXVpZCkudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzdWx0LmRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KFwiTm8gbWV0aG9kIGZvdW5kIGZyb20gaW1wbGVtZW50ZWQgbGlzdC5cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KFwibWV0aG9kIG5vdCBkZWZpbmVkIGluIGNvbmZpZ3VyYXRpb25cIik7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZWplY3QoXCJObyBtZXRob2QgZm91bmQgZnJvbSBpbXBsZW1lbnRlZCBsaXN0LlwiKTtcblxuICAgICAgICB9XG5cbiAgICB9KTtcbn07XG5cbi8qKlxuICogUHJvY2VzcyB0YXNrc1xuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSB0YXNrIC0gdGhlIHRhc2sgY29uZmlnIGRhdGFcbiAqIEBwYXJhbSB7b2JqZWN0fSBpbnB1dERhdGEgLSB0aGUgdXNlciBpbnB1dCBkYXRhXG4gKlxuICogQGV4YW1wbGUgJydcbiAqXG4gKiBAcmV0dXJuICcnXG4gKlxuICovXG5mdW5jdGlvbiB0YXNrKHN1YnByb2Nlc3NJRCwgc3VicHJvY2Vzc1NFUSwgdGFzaywgc3B1dWlkLCBtb2RlbCkge1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcblxuICAgICAgICB2YXIgX1dGSW5zdGFuY2UgPSBhcHAuU0NPUEUud29ya2Zsb3c7XG4gICAgICAgIHZhciBwcmVBY3Rpb25zQ29uZiA9IHRhc2sucHJlQWN0aW9ucztcbiAgICAgICAgcHJlQWN0aW9ucyhwcmVBY3Rpb25zQ29uZiwgX1dGSW5zdGFuY2UsIHNwdXVpZCkudGhlbihmdW5jdGlvbiAocHJlQWN0aW9uUmVzdWx0KSB7XG5cbiAgICAgICAgICAgIHZhciBsaXN0ID0gW107XG4gICAgICAgICAgICBpZiAodGFzay5hc3NpZ24ucm9sZSAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICB2YXIgYXNzaWduVHlwZSA9ICdwcm9maWxlUm9sZSc7XG4gICAgICAgICAgICAgICAgdmFyIHByb2ZpbGVJZCA9IF9XRkluc3RhbmNlLnByb2ZpbGU7XG4gICAgICAgICAgICAgICAgdmFyIGlkID0gJyc7XG4gICAgICAgICAgICAgICAgaWYgKHRhc2suYXNzaWduLnJvbGUucHJvZmlsZSA9PSAnY3VycmVudCcpIHtcbiAgICAgICAgICAgICAgICAgICAgaWQgPSBfV0ZJbnN0YW5jZS5wcm9maWxlO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGFzay5hc3NpZ24ucm9sZS5wcm9maWxlID09ICdjb21tdW5pdHknKSB7XG4gICAgICAgICAgICAgICAgICAgIGlkID0gYXBwLlNDT1BFLmdldENvbW11bml0eUlkKCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdmFyIHJvbGUgPSB0YXNrLmFzc2lnbi5yb2xlLnJvbGVJZDtcblxuICAgICAgICAgICAgICAgIGxpYnJhcnkuZ2V0VXNlcnNMaXN0QnlSb2xlKGlkLCByb2xlKS50aGVuKGZ1bmN0aW9uIChsaXN0KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChsaXN0ICE9IHVuZGVmaW5lZCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobGlzdC5sZW5ndGggPiAxKSB7ICBcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIE5ldyByZXF1aXJlbWVudCBoZXJlIHdpbGwgYXV0b21hdGljYWxseSBhc3NpZ24gdGhlIHN0ZXAgdG8gY3VycmVudCB1c2VyIGlmIHRoaXMgdXNlciBmYWxscyB1bmRlciB0aGUgcHJvdmlkZWQgZ3JvdXAuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gUlVMRSBJTlRST0RVQ0VEIE9OIDE2LU1BUkNILTIwMTdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBJZiBjdXJyZW50IHVzZXIgbGllcyB3aXRoaW4gdGhlIHNwZWNpZmllZCByb2xlLCBpdCB3aWxsIGJlIGF1dG9tYXRpY2FsbHkgYXNzaWduZWQgdG8gdGhhdCB1c2VyLlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpc0N1cnJlbnRVc2VyRXhpc3RJbkdpdmVuUm9sZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciByb2xlc09iamVjdCA9IGxpYnJhcnkuZ2V0Q3VycmVudFVzZXJSb2xlcygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpc0N1cnJlbnRVc2VyUm9sZTEgPSByb2xlc09iamVjdC5wcm9maWxlLmluZGV4T2Yocm9sZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGlzQ3VycmVudFVzZXJSb2xlMiA9IHJvbGVzT2JqZWN0LmNvbW11bml0eS5pbmRleE9mKHJvbGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpc0N1cnJlbnRVc2VyUm9sZTMgPSByb2xlc09iamVjdC5pbXBsaWNpdC5pbmRleE9mKHJvbGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpc0N1cnJlbnRVc2VyUm9sZTQgPSByb2xlc09iamVjdC5hZG9wdGlvbi5pbmRleE9mKHJvbGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpc0N1cnJlbnRVc2VyUm9sZTUgPSByb2xlc09iamVjdC5zdWJwcm9maWxlLmluZGV4T2Yocm9sZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihpc0N1cnJlbnRVc2VyUm9sZTEgPiAtMSB8fCBpc0N1cnJlbnRVc2VyUm9sZTIgPiAtMSB8fCBpc0N1cnJlbnRVc2VyUm9sZTMgPiAtMSB8fCBpc0N1cnJlbnRVc2VyUm9sZTQgPiAtMSB8fCBpc0N1cnJlbnRVc2VyUm9sZTUgPiAtMSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzQ3VycmVudFVzZXJFeGlzdEluR2l2ZW5Sb2xlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc0N1cnJlbnRVc2VyRXhpc3RJbkdpdmVuUm9sZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpc0N1cnJlbnRVc2VyRXhpc3RJbkdpdmVuUm9sZSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKG1vZGVsLmFzc2lnbm1lbnRIaXN0b3J5ID09IHVuZGVmaW5lZCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbC5hc3NpZ25tZW50SGlzdG9yeSA9IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhc3NpZ25lZSA9IG1vZGVsLmFzc2lnbmVkVG87XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGFzc2lnbmVlLnVzZXJJZCAhPVwiXCIgJiYgYXNzaWduZWUubmFtZSAhPSBcIlwiKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBuZXdPYmogPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGFzc2lnbmVlKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbC5hc3NpZ25tZW50SGlzdG9yeS5wdXNoKG5ld09iaik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXNzaWduZWUubmFtZSA9IExPQ0FMX1NFVFRJTkdTLlNVQlNDUklQVElPTlMudXNlcm5hbWUgKyBcIlwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3NpZ25lZS51c2VySWQgPSBMT0NBTF9TRVRUSU5HUy5TVUJTQ1JJUFRJT05TLnVzZXJJZCArIFwiXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzc2lnbmVlLmRhdGVUaW1lID0gbmV3IERhdGUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXNzaWduZWUudHlwZSA9IEFTU0lHTk1FTlRfVFlQRV9BVVRPO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3NpZ25lZS5kdWVEYXRlVGltZSA9ICcnO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3NpZ25lZS5ieSA9IExPQ0FMX1NFVFRJTkdTLlNVQlNDUklQVElPTlMudXNlcklkICsgXCJcIjtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBOb3RpZmljYXRpb24gdGhhdCBpdHMgYmVlbiBhdXRvbWF0aWNhbGx5IGFzc2lnbmVkIHRvIHlvdVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL1NlbmQgYXNzaWduIHVzZXIgbm90aWZpY2F0aW9uIGZyb20gaGVyZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbm90aWZpY2F0aW9uID0gSlNPTi54cGF0aChcIi9wcm9jZXNzZXNbX2lkIGVxICdcIisgc3VicHJvY2Vzc0lEICtcIiddL25vdGlmaWNhdGlvbnNcIixfV0ZJbnN0YW5jZS5jb25maWcsIHt9KVswXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYobm90aWZpY2F0aW9uICE9IHVuZGVmaW5lZCAmJiBub3RpZmljYXRpb24uYXNzaWdubWVudCAhPSB1bmRlZmluZWQpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHVzZXIgPSB7ICdpZCc6IExPQ0FMX1NFVFRJTkdTLlNVQlNDUklQVElPTlMudXNlcklkLCAnbmFtZSc6IExPQ0FMX1NFVFRJTkdTLlNVQlNDUklQVElPTlMudXNlcm5hbWUgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbnNNb2R1bGUubm90aWZpY2F0aW9uLmFzc2lnbm1lbnROb3RpZmljYXRpb24obm90aWZpY2F0aW9uLCBfV0ZJbnN0YW5jZSwgc3B1dWlkLCB1c2VyKS50aGVuKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uKHN1Y2Nlc3Mpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnVXNlciBhc3NpZ25lZCBzdWNjZXNzZnVsbHkuIFVzZXJJZDogXCInICsgdXNlci5pZCArICdcIiwgTmFtZTogXCInICsgdXNlci5uYW1lICsgJ1wiJyk7ICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICkuY2F0Y2goXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24oZmFpbCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdVc2VyIGFzc2lnbm1lbnQgbm90aWZpY2F0aW9uIGZhaWxlZCB0byB1c2VyIFVzZXJJZDogXCInICsgdXNlci5pZCArICdcIiwgTmFtZTogXCInICsgdXNlci5uYW1lICsgJ1wiJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhc3NpZ25tZW50ID0gJyc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRhc2suYXNzaWduLmFzc2lnbm1lbnQgIT0gdW5kZWZpbmVkKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFzc2lnbm1lbnQgPSBtb2RlbC5hc3NpZ25tZW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgYWNjZXB0ID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzaG93XCI6IHRhc2suYXNzaWduLmFzc2lnbm1lbnQuYWNjZXB0LnNob3csXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImxhYmVsXCI6IF9nZXROYW1lQnlMYW5nKHRhc2suYXNzaWduLmFzc2lnbm1lbnQuYWNjZXB0LmxhYmVsLmkxOG4pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXNzaWdubWVudC5hY2NlcHQgPSBhY2NlcHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzc2lnbm1lbnQubWVzc2FnZSA9IF9nZXROYW1lQnlMYW5nKHRhc2suYXNzaWduLmFzc2lnbm1lbnQubWVzc2FnZS5pMThuKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJlamVjdCA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic2hvd1wiOiB0YXNrLmFzc2lnbi5hc3NpZ25tZW50LnJlamVjdC5zaG93LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJsYWJlbFwiOiBfZ2V0TmFtZUJ5TGFuZyh0YXNrLmFzc2lnbi5hc3NpZ25tZW50LnJlamVjdC5sYWJlbC5pMThuKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzc2lnbm1lbnQucmVqZWN0ID0gcmVqZWN0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdmFsdWUgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInByb2ZpbGVJZFwiOiBwcm9maWxlSWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInJvbGVJZFwiOiByb2xlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwicm9sZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXNzaWdubWVudC52YWx1ZSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3NpZ25tZW50LnByb2ZpbGVSb2xlSWQgPSBpZDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlzQ3VycmVudFVzZXJFeGlzdEluR2l2ZW5Sb2xlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vRmlyZSBQcmUtd29ya0FjdGlvbnMgaGVyZVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwcm9jZXNzSWQgPSBKU09OLnhwYXRoKFwiL2luc3RhbmNlL3Byb2Nlc3Nlc1tzdWJQcm9jZXNzZXMvdXVpZCBlcSAnXCIgKyBzcHV1aWQgKyBcIiddL2lkXCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzdWJQcm9jZXNzSWQgPSBKU09OLnhwYXRoKFwiL2luc3RhbmNlL3Byb2Nlc3Nlcy9zdWJQcm9jZXNzZXNbdXVpZCBlcSAnXCIgKyBzcHV1aWQgKyBcIiddL2lkXCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzdGVwSWQgPSBKU09OLnhwYXRoKFwiL3N1YnByb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgc3B1dWlkICsgXCInXS9zdGVwL2lkXCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzdGVwT2JqZWN0ID0gSlNPTi54cGF0aChcIi9wcm9jZXNzZXNbX2lkIGVxICdcIiArIHByb2Nlc3NJZCArIFwiJ10vc3ViUHJvY2Vzc2VzW19pZCBlcSAnXCIgKyBzdWJQcm9jZXNzSWQgKyBcIiddL3N0ZXBzW19pZCBlcSAnXCIgKyBzdGVwSWQgKyBcIiddXCIsIF9XRkluc3RhbmNlLmNvbmZpZywge30pWzBdO1xuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRhc2sucHJlV29ya0FjdGlvbnMgIT0gdW5kZWZpbmVkKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwcmVXb3JrQWN0aW9uc09iaiA9IHRhc2sucHJlV29ya0FjdGlvbnM7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmVXb3JrQWN0aW9ucyhwcmVXb3JrQWN0aW9uc09iaiwgX1dGSW5zdGFuY2UpLnRoZW4oZnVuY3Rpb24gKHN1Y2Nlc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCdBc3NpZ25tZW50IGlzIG1hZGUuIFByZSB3b3JrIGFjdGlvbnMgZm91bmQgYW5kIGV4ZWN1dGVkICcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoJ0Fzc2lnbm1lbnQgaXMgbWFkZS4gTm8gcHJlIHdvcmsgYWN0aW9ucyBmb3VuZC4gJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gTm90aWZpY2F0aW9uIHRoYXQgaXRzIGJlZW4gcmVsZWFzZWQgZm9yIGFjY2VwdGFuY2VcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbm90aWZpY2F0aW9uID0gSlNPTi54cGF0aChcIi9wcm9jZXNzZXNbX2lkIGVxICdcIisgc3VicHJvY2Vzc0lEICtcIiddL25vdGlmaWNhdGlvbnNcIixfV0ZJbnN0YW5jZS5jb25maWcsIHt9KVswXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9pc3N1ZSBoZXJlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKG5vdGlmaWNhdGlvbiAhPSB1bmRlZmluZWQgJiYgbm90aWZpY2F0aW9uLmFzc2lnbm1lbnRBY2NlcHRhbmNlICE9IHVuZGVmaW5lZCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdXNlciA9IHsgJ2lkJzogTE9DQUxfU0VUVElOR1MuU1VCU0NSSVBUSU9OUy51c2VySWQsICduYW1lJzogTE9DQUxfU0VUVElOR1MuU1VCU0NSSVBUSU9OUy51c2VybmFtZSB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uc01vZHVsZS5ub3RpZmljYXRpb24uYWNjZXB0YW5jZU5vdGlmaWNhdGlvbihub3RpZmljYXRpb24sIF9XRkluc3RhbmNlLCBzcHV1aWQsIHJvbGUpLnRoZW4oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24oc3VjY2Vzcyl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdVc2VyIGFzc2lnbmVkIHN1Y2Nlc3NmdWxseS4gVXNlcklkOiBcIicgKyB1c2VyLmlkICsgJ1wiLCBOYW1lOiBcIicgKyB1c2VyLm5hbWUgKyAnXCInKTsgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoJ05vdGlmaWNhdGlvbnMgcmVxdWVzdCBzdWJtaXR0ZWQgZm9yIGFjY2VwdGFuY2UuJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKS5jYXRjaChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbihmYWlsKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgnTm90aWZpY2F0aW9ucyBmYWlsZWQnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1VzZXIgYXNzaWdubWVudCBub3RpZmljYXRpb24gZmFpbGVkIHRvIHVzZXIgVXNlcklkOiBcIicgKyB1c2VyLmlkICsgJ1wiLCBOYW1lOiBcIicgKyB1c2VyLm5hbWUgKyAnXCInKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgnTm90aWZpY2F0aW9ucyBub3QgZm91bmQnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAobGlzdC5sZW5ndGggPT0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEltcGxlbWVudCBoZXJlIHByZVdvcmtBY3Rpb24gYXMgdGhpcyBpcyBhdXRvbWF0aWNhbGx5IGFzc2lnbmVkIGluIGNhc2Ugb2YgMSB1c2VyIGFuZCB3aWxsIG5vdCBnbyB0cm91Z2ggYWNjZXB0YW5jZSBmdW5jdGlvbi5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB1c2VySWQgPSBsaXN0WzBdLmlkO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB1c2VybmFtZSA9IGxpc3RbMF0ubmFtZTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKG1vZGVsLmFzc2lnbm1lbnRIaXN0b3J5ID09IHVuZGVmaW5lZCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsLmFzc2lnbm1lbnRIaXN0b3J5ID0gW107XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFzc2lnbmVlID0gbW9kZWwuYXNzaWduZWRUbztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihhc3NpZ25lZS51c2VySWQgIT1cIlwiICYmIGFzc2lnbmVlLm5hbWUgIT0gXCJcIil7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBuZXdPYmogPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGFzc2lnbmVlKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsLmFzc2lnbm1lbnRIaXN0b3J5LnB1c2gobmV3T2JqKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXNzaWduZWUubmFtZSA9IHVzZXJuYW1lICsgXCJcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3NpZ25lZS51c2VySWQgPSB1c2VySWQgKyBcIlwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzc2lnbmVlLmRhdGVUaW1lID0gbmV3IERhdGUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3NpZ25lZS50eXBlID0gQVNTSUdOTUVOVF9UWVBFX0FVVE87XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXNzaWduZWUuZHVlRGF0ZVRpbWUgPSAnJztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3NpZ25lZS5ieSA9IExPQ0FMX1NFVFRJTkdTLlNVQlNDUklQVElPTlMudXNlcklkICsgXCJcIjtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhc3NpZ25tZW50ID0gJyc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRhc2suYXNzaWduLmFzc2lnbm1lbnQgIT0gdW5kZWZpbmVkKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFzc2lnbm1lbnQgPSBtb2RlbC5hc3NpZ25tZW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgYWNjZXB0ID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzaG93XCI6IHRhc2suYXNzaWduLmFzc2lnbm1lbnQuYWNjZXB0LnNob3csXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImxhYmVsXCI6IF9nZXROYW1lQnlMYW5nKHRhc2suYXNzaWduLmFzc2lnbm1lbnQuYWNjZXB0LmxhYmVsLmkxOG4pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXNzaWdubWVudC5hY2NlcHQgPSBhY2NlcHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzc2lnbm1lbnQubWVzc2FnZSA9IF9nZXROYW1lQnlMYW5nKHRhc2suYXNzaWduLmFzc2lnbm1lbnQubWVzc2FnZS5pMThuKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJlamVjdCA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic2hvd1wiOiB0YXNrLmFzc2lnbi5hc3NpZ25tZW50LnJlamVjdC5zaG93LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJsYWJlbFwiOiBfZ2V0TmFtZUJ5TGFuZyh0YXNrLmFzc2lnbi5hc3NpZ25tZW50LnJlamVjdC5sYWJlbC5pMThuKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzc2lnbm1lbnQucmVqZWN0ID0gcmVqZWN0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdmFsdWUgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInByb2ZpbGVJZFwiOiBwcm9maWxlSWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInJvbGVJZFwiOiByb2xlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwicm9sZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXNzaWdubWVudC52YWx1ZSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3NpZ25tZW50LnByb2ZpbGVSb2xlSWQgPSBpZDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIE5vdGlmaWNhdGlvbiB0aGF0IGl0cyBiZWVuIGF1dG9tYXRpY2FsbHkgYXNzaWduZWQgdG8geW91XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9TZW5kIGFzc2lnbiB1c2VyIG5vdGlmaWNhdGlvbiBmcm9tIGhlcmVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbm90aWZpY2F0aW9uID0gSlNPTi54cGF0aChcIi9wcm9jZXNzZXNbX2lkIGVxICdcIisgc3VicHJvY2Vzc0lEICtcIiddL25vdGlmaWNhdGlvbnNcIixfV0ZJbnN0YW5jZS5jb25maWcsIHt9KVswXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihub3RpZmljYXRpb24gIT0gdW5kZWZpbmVkICYmIG5vdGlmaWNhdGlvbi5hc3NpZ25tZW50ICE9IHVuZGVmaW5lZCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB1c2VyID0geyAnaWQnOiB1c2VySWQsICduYW1lJzogdXNlcm5hbWUgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uc01vZHVsZS5ub3RpZmljYXRpb24uYXNzaWdubWVudE5vdGlmaWNhdGlvbihub3RpZmljYXRpb24sIF9XRkluc3RhbmNlLCBzcHV1aWQsIHVzZXIpLnRoZW4oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbihzdWNjZXNzKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnVXNlciBhc3NpZ25lZCBzdWNjZXNzZnVsbHkuIFVzZXJJZDogXCInICsgdXNlci5pZCArICdcIiwgTmFtZTogXCInICsgdXNlci5uYW1lICsgJ1wiJyk7ICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApLmNhdGNoKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24oZmFpbCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1VzZXIgYXNzaWdubWVudCBub3RpZmljYXRpb24gZmFpbGVkIHRvIHVzZXIgVXNlcklkOiBcIicgKyB1c2VyLmlkICsgJ1wiLCBOYW1lOiBcIicgKyB1c2VyLm5hbWUgKyAnXCInKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9GaXJlIFByZS13b3JrQWN0aW9ucyBoZXJlXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcHJvY2Vzc0lkID0gSlNPTi54cGF0aChcIi9pbnN0YW5jZS9wcm9jZXNzZXNbc3ViUHJvY2Vzc2VzL3V1aWQgZXEgJ1wiICsgc3B1dWlkICsgXCInXS9pZFwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzdWJQcm9jZXNzSWQgPSBKU09OLnhwYXRoKFwiL2luc3RhbmNlL3Byb2Nlc3Nlcy9zdWJQcm9jZXNzZXNbdXVpZCBlcSAnXCIgKyBzcHV1aWQgKyBcIiddL2lkXCIsIF9XRkluc3RhbmNlLCB7fSlbMF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN0ZXBJZCA9IEpTT04ueHBhdGgoXCIvc3VicHJvY2Vzc2VzW19pZCBlcSAnXCIgKyBzcHV1aWQgKyBcIiddL3N0ZXAvaWRcIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3RlcE9iamVjdCA9IEpTT04ueHBhdGgoXCIvcHJvY2Vzc2VzW19pZCBlcSAnXCIgKyBwcm9jZXNzSWQgKyBcIiddL3N1YlByb2Nlc3Nlc1tfaWQgZXEgJ1wiICsgc3ViUHJvY2Vzc0lkICsgXCInXS9zdGVwc1tfaWQgZXEgJ1wiICsgc3RlcElkICsgXCInXVwiLCBfV0ZJbnN0YW5jZS5jb25maWcsIHt9KVswXTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0YXNrLnByZVdvcmtBY3Rpb25zICE9IHVuZGVmaW5lZCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwcmVXb3JrQWN0aW9uc09iaiA9IHRhc2sucHJlV29ya0FjdGlvbnM7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByZVdvcmtBY3Rpb25zKHByZVdvcmtBY3Rpb25zT2JqLCBfV0ZJbnN0YW5jZSkudGhlbihmdW5jdGlvbiAoc3VjY2Vzcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoJ0Fzc2lnbmVkIHRvIHRoZSBvbmx5IHVzZXIgaW4gcm9sZS4gUHJlIHdvcmsgYWN0aW9ucyBleGVjdXRlZCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCdBc3NpZ25lZCB0byB0aGUgb25seSB1c2VyIGluIHJvbGUuIE5vIHByZSB3b3JrIGFjdGlvbnMgZm91bmQuJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vQ2FzZSB3aGVyZSB1c2VycyBsaXN0ID0gMFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhc3NpZ25lZSA9IG1vZGVsLmFzc2lnbmVkVG87XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXNzaWduZWUubmFtZSA9IFwiXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXNzaWduZWUudXNlcklkID0gXCJcIjtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhc3NpZ25tZW50ID0gJyc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRhc2suYXNzaWduLmFzc2lnbm1lbnQgIT0gdW5kZWZpbmVkKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFzc2lnbm1lbnQgPSBtb2RlbC5hc3NpZ25tZW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgYWNjZXB0ID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzaG93XCI6IHRhc2suYXNzaWduLmFzc2lnbm1lbnQuYWNjZXB0LnNob3csXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImxhYmVsXCI6IF9nZXROYW1lQnlMYW5nKHRhc2suYXNzaWduLmFzc2lnbm1lbnQuYWNjZXB0LmxhYmVsLmkxOG4pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXNzaWdubWVudC5hY2NlcHQgPSBhY2NlcHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzc2lnbm1lbnQubWVzc2FnZSA9IF9nZXROYW1lQnlMYW5nKHRhc2suYXNzaWduLmFzc2lnbm1lbnQubWVzc2FnZS5pMThuKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJlamVjdCA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic2hvd1wiOiB0YXNrLmFzc2lnbi5hc3NpZ25tZW50LnJlamVjdC5zaG93LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJsYWJlbFwiOiBfZ2V0TmFtZUJ5TGFuZyh0YXNrLmFzc2lnbi5hc3NpZ25tZW50LnJlamVjdC5sYWJlbC5pMThuKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzc2lnbm1lbnQucmVqZWN0ID0gcmVqZWN0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdmFsdWUgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInByb2ZpbGVJZFwiOiBwcm9maWxlSWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInJvbGVJZFwiOiByb2xlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwicm9sZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXNzaWdubWVudC52YWx1ZSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3NpZ25tZW50LnByb2ZpbGVSb2xlSWQgPSBpZDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL1dpbGwgYmUgZmlyZWQgZnJvbSBUYWtlQXNzaWdubWVudCBwYXRoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShcIk5vIHVzZXJzIGZvdW5kIGluIGxpc3QuIEFzc2lnbmluZyBibGFuayBcIik7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0Vycm9yIGluIGdldFVzZXJzTGlzdEJ5Um9sZSB1bmRlZmluZWQnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdFcnJvciBpbiBnZXRVc2Vyc0xpc3RCeVJvbGUnKTtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRhc2suYXNzaWduLnN3aW1sYW5lICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHJlc29sdmUoJ3N3aW1sYW5lJyk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1N3aW1sYW5lIGltcGxlbWVudGF0aW9uICEhJyk7XG4gICAgICAgICAgICB9XG5cblxuICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XG5cbiAgICAgICAgICAgIHJlamVjdChlcnIpO1xuXG4gICAgICAgIH0pO1xuXG5cblxuXG4gICAgfSk7XG5cbn07XG5cblxuXG4vKipcbiAqIFByb2Nlc3MgdGFza3NcbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gdGFzayAtIHRoZSB0YXNrIGNvbmZpZyBkYXRhXG4gKiBAcGFyYW0ge29iamVjdH0gaW5wdXREYXRhIC0gdGhlIHVzZXIgaW5wdXQgZGF0YVxuICpcbiAqIEBleGFtcGxlICcnXG4gKlxuICogQHJldHVybiAnJ1xuICpcbiAqL1xuZnVuY3Rpb24gc2VydmVyKHNlcnZlciwgcHJvY2Vzc0lkLCBwcm9jZXNzU2VxLCBzdWJQcm9jZXNzSWQsIHN1YlByb2Nlc3NTZXEsIHN1YlByb2Nlc3MsIG1vZGVsLCBfV0ZJbnN0YW5jZSwgZGF0YSwgdXVpZCkge1xuICAgIFxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICBcbiAgICAgICAgICAgIC8vdmFyIF9XRkluc3RhbmNlID0gYXBwLlNDT1BFLndvcmtmbG93O1xuICAgICAgICAgICAgdmFyIHByb2ZpbGVJZCA9IF9XRkluc3RhbmNlLnByb2ZpbGU7XG4gICAgICAgICAgICB2YXIgYWN0aW9uQmxvY2sgPSBzZXJ2ZXIuc2VydmVyQWN0aW9uWzBdO1xuICAgICAgICAgICAgaWYobW9kZWwuYXNzaWdubWVudEhpc3RvcnkgPT0gdW5kZWZpbmVkKXtcbiAgICAgICAgICAgICAgICBtb2RlbC5hc3NpZ25tZW50SGlzdG9yeSA9IFtdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgYXNzaWduZWUgPSBtb2RlbC5hc3NpZ25lZFRvO1xuICAgICAgICAgICAgaWYoYXNzaWduZWUudXNlcklkICE9XCJcIiAmJiBhc3NpZ25lZS5uYW1lICE9IFwiXCIpe1xuICAgICAgICAgICAgICAgIHZhciBuZXdPYmogPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGFzc2lnbmVlKSk7XG4gICAgICAgICAgICAgICAgbW9kZWwuYXNzaWdubWVudEhpc3RvcnkucHVzaChuZXdPYmopO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYXNzaWduZWUubmFtZSA9IExPQ0FMX1NFVFRJTkdTLlNVQlNDUklQVElPTlMudXNlcm5hbWUgKyBcIlwiO1xuICAgICAgICAgICAgYXNzaWduZWUudXNlcklkID0gTE9DQUxfU0VUVElOR1MuU1VCU0NSSVBUSU9OUy51c2VySWQgKyBcIlwiO1xuICAgICAgICAgICAgYXNzaWduZWUuZGF0ZVRpbWUgPSBuZXcgRGF0ZSgpO1xuICAgICAgICAgICAgYXNzaWduZWUudHlwZSA9IEFTU0lHTk1FTlRfVFlQRV9BVVRPO1xuICAgICAgICAgICAgYXNzaWduZWUuZHVlRGF0ZVRpbWUgPSAnJztcbiAgICAgICAgICAgIGFzc2lnbmVlLmJ5ID0gTE9DQUxfU0VUVElOR1MuU1VCU0NSSVBUSU9OUy51c2VySWQgKyBcIlwiO1xuXG4gICAgICAgICAgICBhY3Rpb24oYWN0aW9uQmxvY2ssIHByb2Nlc3NJZCwgcHJvY2Vzc1NlcSwgc3ViUHJvY2Vzc0lkLCBzdWJQcm9jZXNzU2VxLCBzdWJQcm9jZXNzLCBtb2RlbCwgX1dGSW5zdGFuY2UsIGRhdGEsIHV1aWQpXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShcIk5vIHVzZXJzIGZvdW5kIGluIGxpc3QuIEFzc2lnbmluZyBibGFuayBcIik7XG4gICAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgcmVqZWN0KFwiU2VydmVyIGFjdGlvbiBlcnJvciBmb3VuZCByZWplY3RlZFwiKVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIFxuICAgIH07XG5cbi8qKlxuICogUHJvY2VzcyB0cmFuc2l0aW9uXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHByb2Nlc3NJZCAtIHRoZSBXb3JrZmxvdyBjb25maWcgLyBkZWZpbml0aW9uIHByb2Nlc3MgaWRcbiAqIEBwYXJhbSB7bnVtYmVyfSBwcm9jZXNzU2VxIC0gdGhlIFdvcmtmbG93IGluc3RhbmNlIHByb2Nlc3Mgc2VxXG4gKiBAcGFyYW0ge3N0cmluZ30gc3ViUHJvY2Vzc0lkIC0gdGhlIFdvcmtmbG93IGNvbmZpZyAvIGRlZmluaXRpb24gc3ViLXByb2Nlc3MgaWRcbiAqIEBwYXJhbSB7bnVtYmVyfSBzdWJQcm9jZXNzU2VxIC0gdGhlIFdvcmtmbG93IGluc3RhbmNlIHN1Yi1wcm9jZXNzIHNlcVxuICogQHBhcmFtIHtzdHJpbmd9IHN0ZXBJZCAtIHRoZSBXb3JrZmxvdyBjb25maWcgLyBkZWZpbml0aW9uIHN0ZXAgaWRcbiAqIEBwYXJhbSB7c3RyaW5nfSB0cmFuc2l0aW9uSWQgLSB0aGUgV29ya2Zsb3cgY29uZmlnIC8gZGVmaW5pdGlvbiB0cmFuc2l0aW9uIGlkXG4gKiBAcGFyYW0ge29iamVjdH0gZGF0YSAtIGFueSBhZGRpdGlvbmFsIGRhdGEgcGFzc2VkIGluIGFzIGtleSB2YWx1ZSBwYWlyc1xuICogQHBhcmFtIHtvYmplY3R9IF9XRkluc3RhbmNlIC0gdGhlIGN1cnJlbnQgd29ya2Zsb3cgY29uc3RydWN0b3IgaW5zdGFuY2VcbiAqXG4gKiBAZXhhbXBsZSAnJ1xuICpcbiAqIEByZXR1cm4gJydcbiAqXG4gKi9cbmZ1bmN0aW9uIHRyYW5zaXRpb24ocHJvY2Vzc0lkLCBwcm9jZXNzU2VxLCBzdWJQcm9jZXNzSWQsIHN1YlByb2Nlc3NTZXEsIHN0ZXBJZCwgdHJhbnNpdGlvbklkLCBkYXRhLCBfV0ZJbnN0YW5jZSwgc3B1dWlkLCBtb2RlbCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICB2YXIgc3RlcFNlcSA9IDA7XG4gICAgICAgICAgICB2YXIgbmV4dFN0ZXBJZCA9ICcnO1xuICAgICAgICAgICAgdmFyIG5leHRTdGVwU2VxID0gMDtcbiAgICAgICAgICAgIHZhciBzdWJQcm9jZXNzID0gW107XG4gICAgICAgICAgICB2YXIgY3VycmVudFByb2Nlc3MgPSBfV0ZJbnN0YW5jZS5jb25maWcucHJvY2Vzc2VzLmZpbHRlcihmdW5jdGlvbiAob2JqUHJvY2Vzcykge1xuICAgICAgICAgICAgICAgIGlmIChvYmpQcm9jZXNzLl9pZCA9PSBwcm9jZXNzSWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9ialByb2Nlc3M7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHZhciBjdXJyZW50U3ViUHJvY2VzcyA9IGN1cnJlbnRQcm9jZXNzWzBdLnN1YlByb2Nlc3Nlcy5maWx0ZXIoZnVuY3Rpb24gKG9ialN1YlByb2Nlc3MpIHtcbiAgICAgICAgICAgICAgICBpZiAob2JqU3ViUHJvY2Vzcy5faWQgPT0gc3ViUHJvY2Vzc0lkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBvYmpTdWJQcm9jZXNzO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB2YXIgY3VycmVudFN0ZXAgPSBjdXJyZW50U3ViUHJvY2Vzc1swXS5zdGVwcy5maWx0ZXIoZnVuY3Rpb24gKG9ialN0ZXApIHtcbiAgICAgICAgICAgICAgICBpZiAob2JqU3RlcC5faWQgPT0gc3RlcElkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBvYmpTdGVwO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB2YXIgdHJhbnNpdGlvbiA9IGN1cnJlbnRTdGVwWzBdLnRyYW5zaXRpb24uZmlsdGVyKGZ1bmN0aW9uIChvYmpUcmFuc2l0aW9uKSB7XG4gICAgICAgICAgICAgICAgaWYgKG9ialRyYW5zaXRpb24uX2lkID09IHRyYW5zaXRpb25JZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gb2JqVHJhbnNpdGlvbjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjdXJyZW50U3ViUHJvY2Vzc1swXS5zdGVwcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmIChjdXJyZW50U3ViUHJvY2Vzc1swXS5zdGVwc1tpXS5faWQgPT0gc3RlcElkKSB7XG4gICAgICAgICAgICAgICAgICAgIHN0ZXBTZXEgPSBwYXJzZUludChjdXJyZW50U3ViUHJvY2Vzc1swXS5zdGVwc1tpXS5fc2VxKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY3VycmVudFN1YlByb2Nlc3NbMF0uc3RlcHMuZmlsdGVyKGZ1bmN0aW9uIChzdGVwSXRlbSkge1xuICAgICAgICAgICAgICAgIG5leHRTdGVwU2VxID0gc3RlcFNlcSArIDE7XG4gICAgICAgICAgICAgICAgaWYgKHBhcnNlSW50KHN0ZXBJdGVtLl9zZXEpID09IG5leHRTdGVwU2VxKSB7XG4gICAgICAgICAgICAgICAgICAgIG5leHRTdGVwSWQgPSBzdGVwSXRlbS5faWQ7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9KVxuICAgICAgIFxuICAgICAgIFxuICAgICAgIFxuICAgICAgICAgICAgXG4gICAgICAgICAgICB2YXIgbWF4U3RlcHMgPSBjdXJyZW50U3ViUHJvY2Vzc1swXS5zdGVwcy5sZW5ndGg7XG4gICAgICAgICAgICB2YXIgc3BpbnN0YW5jZU9iamVjdCA9IEpTT04ueHBhdGgoXCIvc3VicHJvY2Vzc2VzW19pZCBlcSAnXCIrIHNwdXVpZCArXCInXVwiLCBfV0ZJbnN0YW5jZSwge30pWzBdO1xuICAgICAgICAgICAgdmFyIHNwSW5zdGFuY2VTdGVwT2JqZWN0ID0gSlNPTi54cGF0aChcIi9zdWJwcm9jZXNzZXNbX2lkIGVxICdcIisgc3B1dWlkICtcIiddL3N0ZXBcIiwgX1dGSW5zdGFuY2UsIHt9KVswXTtcblxuICAgICAgICAgICAgLy8gQWRkaW5nIHN0ZXAgT2JqZWN0IGluIHN1YnByb2Nlc3MgaGlzdG9yeSBGcm9tIHNlY29uZCBzdGVwLiBBcyBmaXJzdCBzdGVwIGlzIGFkZGVkIGF0IHN1YlByb2Nlc3MoKSBmdW5jdGlvbiBcbiAgICAgICAgICAgIGlmIChzcGluc3RhbmNlT2JqZWN0Lmhpc3RvcnkgPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgc3BpbnN0YW5jZU9iamVjdC5oaXN0b3J5ID0gW107XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgcHVzaEluZGljYXRvclRvTW9kZWwgPSBmdW5jdGlvbihtb2RlbCl7XG5cbiAgICAgICAgICAgICAgICAvLyBJbiBib3RoICB0aGUgY2FzZXMgdGhlIGxpc3QgaXMgZGlmZmVybmV0IHRoYXQgbmVlZHMgdG8gYmUgbWFkZSBzYW1lLlxuICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgdmFyIGluZGljYXRvckxpc3QgPSBKU09OLnhwYXRoKFwiL3N1YnByb2Nlc3Nlc1tfaWQgZXEgJ1wiKyBzcHV1aWQgK1wiJ10vaW5kaWNhdG9yc1wiLCBfV0ZJbnN0YW5jZSAse30pO1xuICAgICAgICAgICAgICAgIHZhciBpc0ZpcnN0ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgaWYoaW5kaWNhdG9yTGlzdCA9PSB1bmRlZmluZWQgfHwgaW5kaWNhdG9yTGlzdC5sZW5ndGggPT0gMCl7XG4gICAgICAgICAgICAgICAgICAgIGlzRmlyc3QgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBpbmRpY2F0b3JMaXN0ID0gSlNPTi54cGF0aChcIi9pbmRpY2F0b3JzW3dvcmtmbG93cy9wcm9jZXNzZXNbc3ViUHJvY2Vzc1VVSUQgZXEgJ1wiKyBzcHV1aWQgK1wiJ11dXCIsIF9XRkluc3RhbmNlICx7fSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmKG1vZGVsLmluZGljYXRvcnMgPT0gdW5kZWZpbmVkKXtcbiAgICAgICAgICAgICAgICAgICBtb2RlbC5pbmRpY2F0b3JzID0gW107XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgaW5kaWNhdG9yTGlzdC5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgaWYoaXNGaXJzdCl7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB1dWlkID0gaW5kaWNhdG9yTGlzdFtqXS5faWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmV2ID0gSlNPTi54cGF0aChcIi9pbmRpY2F0b3JzW19pZCBlcSAnXCIrIHV1aWQgK1wiJ10vX3JldlwiICwgX1dGSW5zdGFuY2UsIHt9KVswXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzZXEgPSBpbmRpY2F0b3JMaXN0W2pdLm1vZGVsLnBlbmRpbmcuc2VxO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN0YXR1cyA9IGluZGljYXRvckxpc3Rbal0ubW9kZWwucGVuZGluZy5zdGF0dXM7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgaW5kT2JqZWN0ID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV1aWQ6IHV1aWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV2OiByZXYsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VxOiBzZXEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsLmluZGljYXRvcnMucHVzaChpbmRPYmplY3QpO1xuXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdXVpZCA9IGluZGljYXRvckxpc3Rbal0uaW5zdGFuY2VzWzBdLnV1aWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmV2ID0gSlNPTi54cGF0aChcIi9pbmRpY2F0b3JzW19pZCBlcSAnXCIrIHV1aWQgK1wiJ10vX3JldlwiICwgX1dGSW5zdGFuY2UsIHt9KVswXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzZXEgPSBKU09OLnhwYXRoKFwiL2luZGljYXRvcnNbX2lkIGVxICdcIisgdXVpZCArXCInXS9tb2RlbC9wZW5kaW5nL3NlcVwiLF9XRkluc3RhbmNlLHt9KVswXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzdGF0dXMgPSBKU09OLnhwYXRoKFwiL2luZGljYXRvcnNbX2lkIGVxICdcIisgdXVpZCArXCInXS9tb2RlbC9wZW5kaW5nL3N0YXR1c1wiLF9XRkluc3RhbmNlLHt9KVswXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpbmRPYmplY3QgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXVpZDogdXVpZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXY6IHJldixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXE6IHNlcSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWwuaW5kaWNhdG9ycy5wdXNoKGluZE9iamVjdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgfSAgIFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBkZWxldGUgbW9kZWwuYXNzaWduZWRUbztcbiAgICAgICAgICAgICAgICBkZWxldGUgbW9kZWwuYXNzaWdubWVudDtcbiAgICAgICAgICAgICAgICByZXR1cm4gbW9kZWw7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGFkZCBpbmZvcm1hdGlvbiB0byB0cmFuc3Rpb24gb2JqZWN0LlxuICAgICAgICAgICAgdmFyICB0cm5PYmplY3QgPSB7XG4gICAgICAgICAgICAgICAgdHJhbnNpdGlvbklkOiB0cmFuc2l0aW9uWzBdLl9pZCxcbiAgICAgICAgICAgICAgICBkYXRlVGltZTogbmV3IERhdGUoKSxcbiAgICAgICAgICAgICAgICB1c2VySWQ6IExPQ0FMX1NFVFRJTkdTLlNVQlNDUklQVElPTlMudXNlcklkICsgXCJcIlxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYobW9kZWwgIT0gdW5kZWZpbmVkICYmIE9iamVjdC5rZXlzKG1vZGVsKS5sZW5ndGggPiAwKXtcbiAgICAgICAgICAgICAgICBtb2RlbC50cmFuc2l0aW9uID0gdHJuT2JqZWN0OyAgICBcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc3BJbnN0YW5jZVN0ZXBPYmplY3QudHJhbnNpdGlvbiA9IHRybk9iamVjdDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gY29weSBjdXJyZW50IGFzc2lnbmVkVG8gdG8gcmVBc3NpZ25tZW50IG9iamVjdFxuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZihtb2RlbCAhPSB1bmRlZmluZWQgJiYgT2JqZWN0LmtleXMobW9kZWwpLmxlbmd0aCA+IDApe1xuICAgICAgICAgICAgICAgIGlmKG1vZGVsLmFzc2lnbm1lbnRIaXN0b3J5ID09IHVuZGVmaW5lZCl7XG4gICAgICAgICAgICAgICAgICAgIG1vZGVsLmFzc2lnbm1lbnRIaXN0b3J5ID0gW107XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHZhciBhc3NpZ25lZU9iaiA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkobW9kZWwuYXNzaWduZWRUbykpO1xuICAgICAgICAgICAgICAgIGlmKGFzc2lnbmVlT2JqLnVzZXJJZCAhPSBcIlwiICYmIGFzc2lnbmVlT2JqLm5hbWUgIT0gXCJcIil7XG4gICAgICAgICAgICAgICAgICAgIG1vZGVsLmFzc2lnbm1lbnRIaXN0b3J5LnB1c2goYXNzaWduZWVPYmopO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYoc3BJbnN0YW5jZVN0ZXBPYmplY3QuYXNzaWdubWVudEhpc3RvcnkgPT0gdW5kZWZpbmVkKXtcbiAgICAgICAgICAgICAgICAgICAgc3BJbnN0YW5jZVN0ZXBPYmplY3QuYXNzaWdubWVudEhpc3RvcnkgPSBbXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdmFyIGFzc2lnbmVlT2JqID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShzcEluc3RhbmNlU3RlcE9iamVjdC5hc3NpZ25lZFRvKSk7XG4gICAgICAgICAgICAgICAgaWYoYXNzaWduZWVPYmoudXNlcklkICE9IFwiXCIgJiYgYXNzaWduZWVPYmoubmFtZSAhPSBcIlwiKXtcbiAgICAgICAgICAgICAgICAgICAgc3BJbnN0YW5jZVN0ZXBPYmplY3QuYXNzaWdubWVudEhpc3RvcnkucHVzaChhc3NpZ25lZU9iaik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIGhpc3RvcnlNb2RlbDtcbiAgICAgICAgICAgIGlmKG1vZGVsICE9IHVuZGVmaW5lZCAmJiBPYmplY3Qua2V5cyhtb2RlbCkubGVuZ3RoID4gMCl7XG4gICAgICAgICAgICAgICAgIGhpc3RvcnlNb2RlbCA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkobW9kZWwpKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgIGhpc3RvcnlNb2RlbCA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoc3BJbnN0YW5jZVN0ZXBPYmplY3QpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBpbmRNb2RlbEluU3RlcCA9IHB1c2hJbmRpY2F0b3JUb01vZGVsKGhpc3RvcnlNb2RlbCk7XG4gICAgICAgICAgICBzcGluc3RhbmNlT2JqZWN0Lmhpc3RvcnkucHVzaChpbmRNb2RlbEluU3RlcCk7IFxuXG4gICAgICAgICAgICBpZiAodHJhbnNpdGlvblswXS50cmFuc2l0aW9uQWN0aW9uLmdvVG9TdGVwICE9IHVuZGVmaW5lZCkge1xuXG4gICAgICAgICAgICAgICBcblxuICAgICAgICAgICAgICAgIHZhciBuZXh0U2VxID0gcGFyc2VJbnQoY3VycmVudFN0ZXBbMF0uX3NlcSkgKyBwYXJzZUludCh0cmFuc2l0aW9uWzBdLnRyYW5zaXRpb25BY3Rpb24uZ29Ub1N0ZXAuZGVmYXVsdCk7XG4gICAgICAgICAgICAgICAgdmFyIG5leHRJZCA9ICcnO1xuICAgICAgICAgICAgICAgIGN1cnJlbnRTdWJQcm9jZXNzWzBdLnN0ZXBzLmZpbHRlcihmdW5jdGlvbiAoc3RlcEl0ZW0pIHtcblxuICAgICAgICAgICAgICAgICAgICBpZiAocGFyc2VJbnQoc3RlcEl0ZW0uX3NlcSkgPT0gbmV4dFN0ZXBTZXEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5leHRJZCA9IHN0ZXBJdGVtLl9pZDtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBzdGVwKHByb2Nlc3NJZCwgcHJvY2Vzc1NlcSwgc3ViUHJvY2Vzc0lkLCBzdWJQcm9jZXNzU2VxLCBuZXh0SWQsIG5leHRTZXEsIGRhdGEsIF9XRkluc3RhbmNlLCBzcHV1aWQpLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAobmV4dFNlcSA9PSBtYXhTdGVwcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ0FsbCBTdGVwIHRyYW5zaXRpb25zIGhhdmUgY29tcGxldGVkIHN1Y2Nlc3NmdWxseS4nLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3ViUHJvY2Vzc0NvbXBsZXRlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0ZXA6IHJlc3VsdC5kYXRhXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoc3VjY2Vzcyk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdTdGVwIHRyYW5zaXRpb24gY29tcGxldGVkIHN1Y2Nlc3NmdWxseS4nLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3ViUHJvY2Vzc0NvbXBsZXRlOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGVwOiByZXN1bHQuZGF0YVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xuXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIH0gZWxzZSBpZiAodHJhbnNpdGlvblswXS50cmFuc2l0aW9uQWN0aW9uLmdvVG9TdGVwSWQgIT0gdW5kZWZpbmVkKSB7XG5cbiAgICAgICAgICAgICAgICBcblxuICAgICAgICAgICAgICAgIHZhciBnb1RvU3RlcElkID0gdHJhbnNpdGlvblswXS50cmFuc2l0aW9uQWN0aW9uLmdvVG9TdGVwSWQuc3RlcElkO1xuICAgICAgICAgICAgICAgIHZhciBnb1RvU3RlcFNlcSA9IDE7XG5cbiAgICAgICAgICAgICAgICBjdXJyZW50U3ViUHJvY2Vzc1swXS5zdGVwcy5maWx0ZXIoZnVuY3Rpb24gKHN0ZXBJdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzdGVwSXRlbS5faWQgPT0gZ29Ub1N0ZXBJZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZ29Ub1N0ZXBTZXEgPSBwYXJzZUludChzdGVwSXRlbS5fc2VxKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBzdGVwKHByb2Nlc3NJZCwgcHJvY2Vzc1NlcSwgc3ViUHJvY2Vzc0lkLCBzdWJQcm9jZXNzU2VxLCBnb1RvU3RlcElkLCBnb1RvU3RlcFNlcSwgZGF0YSwgX1dGSW5zdGFuY2UsIHNwdXVpZCkudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChnb1RvU3RlcFNlcSA9PSBtYXhTdGVwcykge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnQWxsIFN0ZXAgdHJhbnNpdGlvbnMgaGF2ZSBjb21wbGV0ZWQgc3VjY2Vzc2Z1bGx5LicsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWJQcm9jZXNzQ29tcGxldGU6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RlcDogcmVzdWx0LmRhdGFcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcblxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnU3RlcCB0cmFuc2l0aW9uIGNvbXBsZXRlZCBzdWNjZXNzZnVsbHkuJywge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1YlByb2Nlc3NDb21wbGV0ZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RlcDogcmVzdWx0LmRhdGFcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcblxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0cmFuc2l0aW9uWzBdLnRyYW5zaXRpb25BY3Rpb24uc3RvcCAhPSB1bmRlZmluZWQpIHtcblxuICAgICAgICAgICAgICAgIC8vIEFzIHRoaXMgaXMgdGhlIGxhc3Qgc3RlcCAod2hlcmUgc3RvcCBpcyBkZWZpZWQpICwgc3ViUHJvY2VzcyBwb3N0QWN0aW9ucyBzaG91bGQgY29tZSBoZXJlLlxuXG4gICAgICAgICAgICAgICAgdmFyIHBvc3RBY3Rpb25zQ29uZiA9IGN1cnJlbnRQcm9jZXNzWzBdLnBvc3RBY3Rpb25zO1xuICAgICAgICAgICAgICAgIHBvc3RBY3Rpb25zKHBvc3RBY3Rpb25zQ29uZiwgX1dGSW5zdGFuY2UsIHNwdXVpZCkudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ1N0ZXAgdHJhbnNpdGlvbiBjb21wbGV0ZWQgc3VjY2Vzc2Z1bGx5LldvcmtmbG93IHN0b3BwZWQuJywge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3ViUHJvY2Vzc0NvbXBsZXRlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgc3RlcDogbW9kZWxcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoc3VjY2Vzcyk7XG5cbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgfVxuXG4gICAgfSk7XG59O1xuXG4vKipcbiAqIFByb2Nlc3MgcG9zdEFjdGlvbnNcbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gcG9zdEFjdGlvbnMgLSB0aGUgcG9zdEFjdGlvbnMgY29uZmlnIGRhdGFcbiAqXG4gKiBAZXhhbXBsZSAnJ1xuICpcbiAqIEByZXR1cm4gJydcbiAqXG4gKi9cbmZ1bmN0aW9uIHBvc3RBY3Rpb25zKHBvc3RBY3Rpb25zLCBfV0ZJbnN0YW5jZSwgc3B1dWlkKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgdmFyIGNvbXBsZXRlZCA9IFtdO1xuICAgICAgICB0cnkge1xuXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHZhciBzcE9iamVjdCA9IEpTT04ueHBhdGgoXCIvc3VicHJvY2Vzc2VzW19pZCBlcSAnXCIrIHNwdXVpZCArXCInXVwiLCBfV0ZJbnN0YW5jZSAsIHt9KVswXTtcbiAgICAgICAgICAgIHZhciBwcm9jZXNzSUQgPSBzcE9iamVjdFtcIm1ldGEtZGF0YVwiXS5wcm9jZXNzQ29uZmlnSWQ7XG4gICAgICAgICAgICB2YXIgcHJvY2Vzc0lkID0gc3BPYmplY3RbXCJtZXRhLWRhdGFcIl0uc3ViUHJvY2Vzc0NvbmZpZ0lkO1xuICAgICAgICAgICAgdmFyIHByb2Nlc3NTRVEgPSBzcE9iamVjdFtcIm1ldGEtZGF0YVwiXS5zdWJQcm9jZXNzSW5zU2VxO1xuICAgICAgICAgICAgdmFyIHByb2Nlc3NTZXEgPSBzcE9iamVjdFtcIm1ldGEtZGF0YVwiXS5zdWJQcm9jZXNzSW5zU2VxO1xuXG4gICAgICAgICAgICB2YXIgc3ViUHJvY2Vzc0NvbmZpZ09iamVjdCA9IEpTT04ueHBhdGgoXCIvY29uZmlnL3Byb2Nlc3Nlc1tfaWQgZXEgJ1wiKyBwcm9jZXNzSUQrXCInXS9zdWJQcm9jZXNzZXNbX2lkIGVxICdcIisgcHJvY2Vzc0lkK1wiJ11cIiwgX1dGSW5zdGFuY2UgLCB7fSlbMF07XG4gICAgICAgICAgICB2YXIgc3RlcE9iamVjdCA9IEpTT04ueHBhdGgoXCIvc3VicHJvY2Vzc2VzW19pZCBlcSAnXCIrIHNwdXVpZCArXCInXS9zdGVwXCIsX1dGSW5zdGFuY2UsIHt9KVswXTtcbiAgICAgICAgICAgIFxuXG4gICAgICAgICAgICB1dGlsLnN5bmNMb29wKHBvc3RBY3Rpb25zLmxlbmd0aCwgZnVuY3Rpb24gKGxvb3ApIHtcbiAgICAgICAgICAgICAgICB2YXIgY291bnRlciA9IGxvb3AuaXRlcmF0aW9uKCk7XG4gICAgICAgICAgICAgICAgYWN0aW9uKHBvc3RBY3Rpb25zW2NvdW50ZXJdLCBwcm9jZXNzSUQsIHByb2Nlc3NTRVEsIHByb2Nlc3NJZCwgcHJvY2Vzc1NlcSwgc3ViUHJvY2Vzc0NvbmZpZ09iamVjdCwgc3RlcE9iamVjdCxfV0ZJbnN0YW5jZSwge30sIHNwdXVpZCkudGhlbihmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBDaGVjayBpZiBhbGwgcHJlLXJlcXVpc2l0ZXMgY29tcGxldGVkIHN1Y2Nlc3NmdWxseS5cbiAgICAgICAgICAgICAgICAgICAgY29tcGxldGVkLnB1c2godHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIGxvb3AubmV4dCgpO1xuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgY29tcGxldGVkLnB1c2goZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICBsb29wLmJyZWFrKCk7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGlmIChjb21wbGV0ZWQuZXZlcnkoQm9vbGVhbikpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ1Bvc3QtYWN0aW9ucyBjb21wbGV0ZWQgc3VjY2Vzc2Z1bGx5LicsIHt9KTtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB2YXIgZXJyb3IgPSB1dGlsLmVycm9yKCdXRlByZUFjdGlvbnNFcnJvcicsICdOb3QgYWxsIHBvc3QtYWN0aW9ucyBwYXNzZWQuJyk7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgfVxuXG4gICAgfSk7XG59O1xuXG4vKlxuZnVuY3Rpb24gc2VuZE5vdGlmaWNhdGlvbnModXNlcnNMaXN0LCBzcHV1aWQpe1xuXG4gIC8vIGdldCB1c2VycyBsaXN0IFxuICAvLyBzZW4gbm90aWZpY2F0aW9ucyB0byB1c2VycyB5IGFkZGluZyBjaGFubmVscyB0byB0aGVtXG5cbiAgdmFyIGNoYW5uZWxBcnJheSA9IFtdO1xuXG4gIGZvcihpPTA7aTx1c2Vyc0xpc3QubGVuZ3RoOyBpKyspe1xuICAgIGNoYW5uZWxBcnJheS5wdXNoKFwidXNlcl9cIit1c2Vyc0xpc3RbaV0uaWQpO1xuICB9XG5cbiAgYXNzaWduVG9Vc2Vycyhwcm9jZXNzV29ya2Zsb3dNZXNzYWdlKE5PVElGSUNBVElPTl9VU0VSX01TR19BQ0NFUFQsIHNwdXVpZCksIGNoYW5uZWxBcnJheSk7XG5cbn07Ki9cblxuLypmdW5jdGlvbiBhc3NpZ25Ub1VzZXJzKG1lc3NhZ2UsIGNoYW5uZWxBcnJheSl7XG5cbiAgICAgdmFyIGNoYW5uZWxzID0gY2hhbm5lbEFycmF5O1xuXG4gICAgIHZhciBub3RpZmljYXRpb24gPSAgeyBcbiAgICAgICAgICBcIl9pZFwiOiBnZW5lcmF0ZVVVSUQoKSxcbiAgICAgICAgICBcImNoYW5uZWxzXCI6Y2hhbm5lbHMsXG4gICAgICAgICAgXCJtZXNzYWdlXCI6IG1lc3NhZ2UsXG4gICAgICAgICAgXCJtZXNzYWdlVHlwZVwiOiBcImluZm9cIixcbiAgICAgICAgICBcImNyZWF0ZWREYXRlVGltZVwiOiBtb21lbnQoKS5mb3JtYXQoKSxcbiAgICAgICAgICBcInJlYWRcIjogZmFsc2UsXG4gICAgICAgICAgXCJyZWFkRGF0ZVRpbWVcIjogXCJcIixcbiAgICAgICAgICBcInR5cGVcIjogXCJub3RpZmljYXRpb25cIixcbiAgICAgICAgICBcInNlbmRlclVzZXJJZFwiOiBMT0NBTF9TRVRUSU5HUy5TVUJTQ1JJUFRJT05TLnVzZXJJZFxuICAgICAgIH07XG5cbiAgICAgICBjb25zb2xlLmxvZyhub3RpZmljYXRpb24pO1xuICAgICAgIGRhby51cHNlcnQobm90aWZpY2F0aW9uKTtcblxuICB9OyovXG5cbmZ1bmN0aW9uIHByb2Nlc3NXb3JrZmxvd01lc3NhZ2UobWVzc2FnZSwgc3B1dWlkKSB7XG5cbiAgICB2YXIgcmVwbGFjZWRNc2cgPSBtZXNzYWdlO1xuXG4gICAgaWYgKHJlcGxhY2VkTXNnLmluZGV4T2YoJyNJTlNUQU5DRV9MQUJFTCcpICE9PSAtMSkge1xuICAgICAgICB2YXIgdmFsID0gSlNPTi54cGF0aChcIi9pbnN0YW5jZS9wcm9jZXNzZXMvc3ViUHJvY2Vzc2VzW3V1aWQgZXEgJ1wiICsgc3B1dWlkICsgXCInXS9sYWJlbFwiLCBhcHAuU0NPUEUud29ya2Zsb3csIHt9KVswXTtcbiAgICAgICAgcmVwbGFjZWRNc2cgPSByZXBsYWNlZE1zZy5yZXBsYWNlKCcjSU5TVEFOQ0VfTEFCRUwnLCB2YWwpO1xuXG4gICAgfVxuXG4gICAgaWYgKHJlcGxhY2VkTXNnLmluZGV4T2YoJyNVU0VSX05BTUUnKSAhPT0gLTEpIHtcbiAgICAgICAgdmFyIHZhbCA9IEpTT04ueHBhdGgoXCIvc3VicHJvY2Vzc2VzW19pZCBlcSAnXCIgKyBzcHV1aWQgKyBcIiddL3N0ZXAvYXNzaWduZWRUby9uYW1lXCIsIGFwcC5TQ09QRS53b3JrZmxvdywge30pWzBdO1xuICAgICAgICByZXBsYWNlZE1zZyA9IHJlcGxhY2VkTXNnLnJlcGxhY2UoJyNVU0VSX05BTUUnLCB2YWwpO1xuXG4gICAgfVxuXG4gICAgaWYgKHJlcGxhY2VkTXNnLmluZGV4T2YoJyNQUk9GSUxFX1RJVExFJykgIT09IC0xKSB7XG4gICAgICAgIHZhciB2YWwgPSBhcHAucHJvZmlsZS50aXRsZTtcbiAgICAgICAgcmVwbGFjZWRNc2cgPSByZXBsYWNlZE1zZy5yZXBsYWNlKCcjUFJPRklMRV9USVRMRScsIHZhbCk7XG5cbiAgICB9XG5cbiAgICBpZiAocmVwbGFjZWRNc2cuaW5kZXhPZignI1BST0ZJTEVfVFlQRScpICE9PSAtMSkge1xuICAgICAgICB2YXIgdmFsID0gYXBwLlNDT1BFLkFQUF9DT05GSUcubmFtZTtcbiAgICAgICAgcmVwbGFjZWRNc2cgPSByZXBsYWNlZE1zZy5yZXBsYWNlKCcjUFJPRklMRV9UWVBFJywgdmFsKTtcblxuICAgIH1cblxuICAgIGlmIChyZXBsYWNlZE1zZy5pbmRleE9mKCcjVkFSX1NQVVVJRCcpICE9PSAtMSkge1xuICAgICAgICB2YXIgdmFsID0gc3B1dWlkO1xuICAgICAgICByZXBsYWNlZE1zZyA9IHJlcGxhY2VkTXNnLnJlcGxhY2UoJyNWQVJfU1BVVUlEJywgdmFsKTtcblxuICAgIH1cblxuICAgIHJldHVybiByZXBsYWNlZE1zZztcbn07XG5cbmZ1bmN0aW9uIF9nZXROYW1lKGFyciwgbGFuZykge1xuICAgIGlmIChhcnIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKGFycltpXS5fbGFuZyA9PT0gbGFuZykge1xuICAgICAgICAgICAgICAgIHJldHVybiBhcnJbaV0udmFsdWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgfVxuXG59O1xuXG5mdW5jdGlvbiBfZ2V0TmFtZUJ5TGFuZyhvYmopIHtcbiAgICByZXR1cm4gbGlicmFyeS5nZXROYW1lQnlMYW5nKG9iaik7XG59O1xuXG5cblxuXG5cbi8qKlxuICogUHJvY2VzcyBwcmVXb3JrQWN0aW9uc1xuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBwcmVXb3JrQWN0aW9ucyAtIHRoZSBwcmVXb3JrQWN0aW9ucyBjb25maWcgZGF0YVxuICpcbiAqIEBleGFtcGxlICcnXG4gKlxuICogQHJldHVybiAnJ1xuICpcbiAqL1xuXG5mdW5jdGlvbiBwcmVXb3JrQWN0aW9ucyhwcmVXb3JrQWN0aW9ucywgX1dGSW5zdGFuY2UpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICB2YXIgY29tcGxldGVkID0gW107XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICB2YXIgc3ViUHJvY2Vzc0NvbmZpZ09iamVjdCA9IEpTT04ueHBhdGgoXCIvY29uZmlnL3Byb2Nlc3Nlc1tfaWQgZXEgJ1wiK2FwcC5wcm9jZXNzSUQrXCInXS9zdWJQcm9jZXNzZXNbX2lkIGVxICdcIisgYXBwLnByb2Nlc3NJZCtcIiddXCIsIF9XRkluc3RhbmNlICwge30pWzBdO1xuICAgICAgICAgICAgdmFyIHN0ZXBPYmplY3QgPSBKU09OLnhwYXRoKFwiL3N1YnByb2Nlc3Nlc1tfaWQgZXEgJ1wiKyBhcHAuU0NPUEUucHJvY2Vzc1VVSUQgK1wiJ10vc3RlcFwiLF9XRkluc3RhbmNlLCB7fSlbMF07XG4gICAgICAgICAgICB1dGlsLnN5bmNMb29wKHByZVdvcmtBY3Rpb25zLmxlbmd0aCwgZnVuY3Rpb24gKGxvb3ApIHtcbiAgICAgICAgICAgICAgICB2YXIgY291bnRlciA9IGxvb3AuaXRlcmF0aW9uKCk7XG4gICAgICAgICAgICAgICAgYWN0aW9uKHByZVdvcmtBY3Rpb25zW2NvdW50ZXJdLCBhcHAucHJvY2Vzc0lELCBhcHAucHJvY2Vzc1NFUSwgYXBwLnByb2Nlc3NJZCwgYXBwLnByb2Nlc3NTZXEsIHN1YlByb2Nlc3NDb25maWdPYmplY3QsIHN0ZXBPYmplY3QgLF9XRkluc3RhbmNlLCB7fSwgYXBwLlNDT1BFLnByb2Nlc3NVVUlEKS50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIENoZWNrIGlmIGFsbCBwcmUtcmVxdWlzaXRlcyBjb21wbGV0ZWQgc3VjY2Vzc2Z1bGx5LlxuICAgICAgICAgICAgICAgICAgICBjb21wbGV0ZWQucHVzaCh0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgbG9vcC5uZXh0KCk7XG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgICAgICBjb21wbGV0ZWQucHVzaChmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgIGxvb3AuYnJlYWsoKTtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKGNvbXBsZXRlZC5ldmVyeShCb29sZWFuKSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnUHJlV29yay1hY3Rpb25zIGNvbXBsZXRlZCBzdWNjZXNzZnVsbHkuJywge30pO1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHN1Y2Nlc3MpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBlcnJvciA9IHV0aWwuZXJyb3IoJ1dGUHJlQWN0aW9uc0Vycm9yJywgJ05vdCBhbGwgcHJlLXdvcmstYWN0aW9ucyBwYXNzZWQuJyk7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgfVxuXG4gICAgfSk7XG59O1xuXG5cbm1vZHVsZS5leHBvcnRzID0ge1xuXG4gICAgcHJlUmVxdWlzaXRlczogcHJlUmVxdWlzaXRlcyxcbiAgICBwcmVBY3Rpb25zOiBwcmVBY3Rpb25zLFxuICAgIHBvc3RBY3Rpb25zOiBwb3N0QWN0aW9ucyxcbiAgICBwcmVXb3JrQWN0aW9uczogcHJlV29ya0FjdGlvbnMsXG4gICAgc3ViUHJvY2Vzczogc3ViUHJvY2VzcyxcbiAgICBpbmRpY2F0b3JEb2NzOiBpbmRpY2F0b3JEb2NzLFxuICAgIHRhc2s6IHRhc2ssXG4gICAgdHJhbnNpdGlvbjogdHJhbnNpdGlvbixcbiAgICBhc3NpZ25Vc2VyOiBhc3NpZ25Vc2VyXG5cbn0iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogVXRpbGl0eSBNb2R1bGVcbiAqXG4gKiBAbW9kdWxlIGxpYi91dGlsXG4gKlxuICogQGF1dGhvciBCcmVudCBHb3Jkb25cbiAqIEB2ZXJzaW9uIDAuMS4wXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBXb3JrZmxvdyB1dGlsaXR5IG1vZHVsZSB1c2VkIHRvIGZvcm1hdCB0aGUgcmV0dXJuIGFuZCBlcnJvciBvYmplY3RzLCBhbmRcbiAqIGNvbnRhaW5zIHNvbWUgb3RoZXIgdXRpbGl0eSBmdW5jdGlvbnMgc3VjaCBhcyBhIHN5bmMgbG9vcCBhbmQgY29tcGFyZS5cbiAqXG4gKi9cblxuLyoqXG4gKiBTdWNjZXNzIGJsb2NrIHJldHVybiBvYmplY3QsIGNvbnRhaW5zIGEgbWVzc2FnZSBhbmQgb3B0aW9uYWwgZGF0YSBvYmplY3QuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2UgLSB0aGUgc3VjY2VzcyBtZXNzYWdlXG4gKiBAcGFyYW0ge3N0cmluZ3xPYmplY3R9IFtkYXRhXSAtIHRoZSBzdWNjZXNzIHJldHVybmVkIGRhdGFcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gUmV0dXJuIHN1Y2Nlc3Mgd2l0aG91dCBhIGRhdGEgYmxvY2tcbiAqIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdTdWNjZXNzIG1lc3NhZ2UgZ29lcyBoZXJlLi4uJyk7XG4gKlxuICogQHJldHVybiB7T2JqZWN0fSAtIHdpdGggbWVzc2FnZSBhbmQgZGF0YSBwcm9wZXJ0aWVzXG4gKlxuICovXG5mdW5jdGlvbiBzdWNjZXNzKG1lc3NhZ2UsIGRhdGEpe1xuXHRyZXR1cm4ge1xuXHRcdG1lc3NhZ2U6IG1lc3NhZ2UsXG5cdFx0ZGF0YTogZGF0YVxuXHR9O1xufTtcblxuLyoqXG4gKiBXYXJuaW5nIGJsb2NrIHJldHVybiBvYmplY3QsIGNvbnRhaW5zIGEgbWVzc2FnZSBhbmQgb3B0aW9uYWwgZGF0YSBvYmplY3QuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2UgLSB0aGUgd2FybmluZyBtZXNzYWdlXG4gKiBAcGFyYW0ge3N0cmluZ3xPYmplY3R9IFtkYXRhXSAtIHRoZSByZXR1cm5lZCBkYXRhXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIFJldHVybiBzdWNjZXNzIHdpdGhvdXQgYSBkYXRhIGJsb2NrXG4gKiB2YXIgc3VjY2VzcyA9IHV0aWwud2FybignV2FybmluZyBtZXNzYWdlIGdvZXMgaGVyZS4uLicpO1xuICpcbiAqIEByZXR1cm4ge09iamVjdH0gd2l0aCBtZXNzYWdlIGFuZCBkYXRhIHByb3BlcnRpZXMsIGFuZCBsb2dzIHRoZSB3YXJuaW5nIHRvIHRoZSBjb25zb2xlLlxuICpcbiAqL1xuZnVuY3Rpb24gd2FybihtZXNzYWdlLCBkYXRhKXtcblx0Y29uc29sZS53YXJuKGRhdGEpO1xuXHRyZXR1cm4ge1xuXHRcdHdhcm5pbmc6IG1lc3NhZ2UsXG5cdFx0ZGF0YTogZGF0YVxuXHR9O1xufTtcblxuLyoqXG4gKiBFcnJvciBibG9jayBKUyBlcnJvciBvYmplY3QsIGNvbnRhaW5zIGEgY29kZSBhbmQgbWVzc2FnZSBmb3IgdGhlIGVycm9yLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBjb2RlIC0gdGhlIGVycm9yIGNvZGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBtZXNzYWdlIC0gdGhlIGVycm9yIG1lc3NhZ2VcbiAqXG4gKiBAZXhhbXBsZVxuICogdmFyIHN1Y2Nlc3MgPSB1dGlsLmVycm9yKCdFcnJvcjAwMScsJ0Vycm9yIG1lc3NhZ2UgZ29lcyBoZXJlLi4uJyk7XG4gKlxuICogQHJldHVybiB7T2JqZWN0fSB3aXRoIGEgY29kZSBhbmQgbWVzc2FnZSBwcm9wZXJ0aWVzLlxuICpcbiAqL1xuZnVuY3Rpb24gZXJyb3IoY29kZSwgbWVzc2FnZSl7XG5cdHZhciBlcnIgPSBuZXcgRXJyb3IoJycpO1xuXHRlcnIubmFtZSA9IGNvZGU7XG5cdGVyci5tZXNzYWdlID0gbWVzc2FnZTtcblx0cmV0dXJuIGVycjtcbn07XG5cbi8qKlxuICogQSBsb29wIHdoaWNoIGNhbiBsb29wIFggYW1vdW50IG9mIHRpbWVzLCB3aGljaCBjYXJyaWVzIG91dFxuICogYXN5bmNocm9ub3VzIGNvZGUsIGJ1dCB3YWl0cyBmb3IgdGhhdCBjb2RlIHRvIGNvbXBsZXRlIGJlZm9yZSBsb29waW5nLlxuICpcbiAqIEBwYXJhbSB7bnVtYmVyfSBpdGVyYXRpb25zIC0gdGhlIG51bWJlciBvZiBpdGVyYXRpb25zIHRvIGNhcnJ5IG91dFxuICogQHBhcmFtIHtmdW5jdGlvbn0gcHJvY2VzcyAtIHRoZSBjb2RlL2Z1bmN0aW9uIHdlJ3JlIHJ1bm5pbmcgZm9yIGV2ZXJ5XG4gKiBpdGVyYXRpb25cbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGV4aXQgLSBhbiBvcHRpb25hbCBjYWxsYmFjayB0byBjYXJyeSBvdXQgb25jZSB0aGUgbG9vcFxuICogaGFzIGNvbXBsZXRlZFxuICpcbiAqIEBleGFtcGxlXG4gKiB1dGlsLnN5bmNMb29wKDUsIGZ1bmN0aW9uKGxvb3Ape1xuICogXHR2YXIgY291bnRlciA9IGxvb3AuaXRlcmF0aW9uKCk7XG4gKiBcdC8vIEFkZCBhc3luYyBjYWxscyBoZXJlLi5cbiAqXG4gKiB9LCBmdW5jdGlvbigpe1xuICogXHQvLyBPbiBjb21wbGV0ZSBwZXJmb3JtIGFjdGlvbnMgaGVyZS4uLlxuICpcbiAqIH0pO1xuICpcbiAqIEByZXR1cm4ge09iamVjdH0gdGhlIGxvb3AgY29udHJvbCBvYmplY3QuXG4gKlxuICovXG5mdW5jdGlvbiBzeW5jTG9vcChpdGVyYXRpb25zLCBwcm9jZXNzLCBleGl0KXtcbiAgICB2YXIgaW5kZXggPSAwLFxuICAgICAgICBkb25lID0gZmFsc2UsXG4gICAgICAgIHNob3VsZEV4aXQgPSBmYWxzZTtcbiAgICB2YXIgbG9vcCA9IHtcbiAgICAgICAgbmV4dDpmdW5jdGlvbigpe1xuICAgICAgICAgICAgaWYoZG9uZSl7XG4gICAgICAgICAgICAgICAgaWYoc2hvdWxkRXhpdCAmJiBleGl0KXtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGV4aXQoKTsgLy8gRXhpdCBpZiB3ZSdyZSBkb25lXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gSWYgd2UncmUgbm90IGZpbmlzaGVkXG4gICAgICAgICAgICBpZihpbmRleCA8IGl0ZXJhdGlvbnMpe1xuICAgICAgICAgICAgICAgIGluZGV4Kys7IC8vIEluY3JlbWVudCBvdXIgaW5kZXhcbiAgICAgICAgICAgICAgICBwcm9jZXNzKGxvb3ApOyAvLyBSdW4gb3VyIHByb2Nlc3MsIHBhc3MgaW4gdGhlIGxvb3BcbiAgICAgICAgICAgIC8vIE90aGVyd2lzZSB3ZSdyZSBkb25lXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGRvbmUgPSB0cnVlOyAvLyBNYWtlIHN1cmUgd2Ugc2F5IHdlJ3JlIGRvbmVcbiAgICAgICAgICAgICAgICBpZihleGl0KSBleGl0KCk7IC8vIENhbGwgdGhlIGNhbGxiYWNrIG9uIGV4aXRcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgaXRlcmF0aW9uOmZ1bmN0aW9uKCl7XG4gICAgICAgICAgICByZXR1cm4gaW5kZXggLSAxOyAvLyBSZXR1cm4gdGhlIGxvb3AgbnVtYmVyIHdlJ3JlIG9uXG4gICAgICAgIH0sXG4gICAgICAgIGJyZWFrOmZ1bmN0aW9uKGVuZCl7XG4gICAgICAgICAgICBkb25lID0gdHJ1ZTsgLy8gRW5kIHRoZSBsb29wXG4gICAgICAgICAgICBzaG91bGRFeGl0ID0gZW5kOyAvLyBQYXNzaW5nIGVuZCBhcyB0cnVlIG1lYW5zIHdlIHN0aWxsIGNhbGwgdGhlIGV4aXQgY2FsbGJhY2tcbiAgICAgICAgfVxuICAgIH07XG4gICAgbG9vcC5uZXh0KCk7XG4gICAgcmV0dXJuIGxvb3A7XG59O1xuXG5mdW5jdGlvbiBjb21wYXJlKHN1YmplY3QsIG9wZXJhdG9yLCB2YWx1ZSkge1xuICBcdHN3aXRjaCAob3BlcmF0b3IpIHtcbiAgXHRcdGNhc2UgJ2dyZWF0ZXJUaGFuJzpcblx0XHRcdHJldHVybiBzdWJqZWN0ID4gdmFsdWU7XG5cdFx0Y2FzZSAnbGVzc1RoYW4nOlxuXHRcdFx0cmV0dXJuIHN1YmplY3QgPCB2YWx1ZTtcblx0XHRjYXNlICdncmVhdGVyVGhhbkVxdWFsJzpcblx0XHRcdHJldHVybiBzdWJqZWN0ID49IHZhbHVlO1xuXHRcdGNhc2UgJ2xlc3NUaGFuRXF1YWwnOlxuXHRcdFx0cmV0dXJuIHN1YmplY3QgPD0gdmFsdWU7XG5cdFx0Y2FzZSAnZXF1YWxUbyc6XG5cdFx0XHRyZXR1cm4gc3ViamVjdCA9PT0gdmFsdWU7XG5cdFx0Y2FzZSAnbm90RXF1YWxUbyc6XG5cdFx0XHRyZXR1cm4gc3ViamVjdCAhPT0gdmFsdWU7XG4gIFx0fVxufTtcblxuZnVuY3Rpb24gZ2V0TmFtZShhcnIsIGxhbmcpe1xuXHRpZiAoYXJyICE9PSB1bmRlZmluZWQpIHtcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGFyci5sZW5ndGggOyBpKyspIHtcblx0XHRcdGlmIChhcnJbaV0uaTE4bi5fbGFuZyA9PT0gbGFuZykge1xuXHRcdFx0XHRyZXR1cm4gYXJyW2ldLmkxOG4udmFsdWU7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuXG4gXHRzdWNjZXNzOiBzdWNjZXNzLFxuIFx0d2Fybjogd2FybixcbiBcdGVycm9yOiBlcnJvcixcbiBcdHN5bmNMb29wOiBzeW5jTG9vcCxcbiBcdGNvbXBhcmU6IGNvbXBhcmUsXG5cdGdldE5hbWU6IGdldE5hbWVcblxuIH1cbiJdfQ==
