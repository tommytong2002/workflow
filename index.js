'use strict';

var Process = require('./lib/process');
var util = require('utility');
var userInterface = require('./lib/interface');

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

function Workflow(profile, app, config){
	var _this = this;
	// Profile ID validation checks
	if (profile == '' || profile == undefined) {
        throw util.error('ParamRequired', 'A profile id is required.');
    } else if (typeof(profile) !== 'string') {
    	throw new Error('The profile id must be a javascript string.');
    } else {
    	_this.profile = profile || '';
    }
    // App ID validation checks
	if (app == '' || app == undefined) {
        throw util.error('ParamRequired', 'An app id is required.');
    } else if (typeof(app) !== 'string') {
    	throw new Error('The app id must be a javascript string.');
    } else {
    	_this.app = app || '';
    }
    // Workflow configuration validation checks
    if (config == '' || config == undefined) {
    	throw util.error('ParamRequired', 'A workflow configuration is required.');
    } else if (typeof(config) !== 'object') {
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
		// Workflow sub-process step history place holder
		_this.history = [];

}

/**
 * Workflow get profile id.
 *
 * @example ""
 *
 * @return ""
 *
 */
Workflow.prototype.getProfile = function(){
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
Workflow.prototype.getApp = function(){
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
Workflow.prototype.getConfig = function(){
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
Workflow.prototype.getInstance = function(){
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
Workflow.prototype.setInstance = function(data){
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
Workflow.prototype.getSubProcesses = function(){
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
Workflow.prototype.setSubProcesses = function(data){
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
Workflow.prototype.getIndicators = function(){
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
Workflow.prototype.setIndicators = function(data){
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
Workflow.prototype.create = function(){
	var _this = this;
	return new Promise(function(resolve, reject) {
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
				    channels:[
				    	"community_"+app.SCOPE.communityId ,
				    	"profile_"+ app.SCOPE.profileId ,
				    	"application_"+app.SCOPE.applicationId,
				    	"community_"+app.SCOPE.communityId+"_application_"+app.SCOPE.applicationId
				    ]
				};
				model._id = _this.profile + ':processes';
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
Workflow.prototype.initialise = function(processId, data){
	var _this = this;
	return new Promise(function(resolve, reject) {
		try {
			var configProcess = [];
			// Check the passed in parameters
			if (processId !== '' && processId !== undefined) {
				// Get the current process config
				configProcess = _this.config.processes.filter(function(objProcess){
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
			_this.instance.processes.filter(function(processItem){
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
				subProcesses: [],
			}
			// 1. Update the process id and seq
			processModel.id = processId;
			processModel.seq = processSeq;
			_this.instance.processes.push(processModel);
			// Parameters
			var subProcessId = configProcess[0].subProcesses[0]._id;
			var subProcessSeq = 1;
			_this.instance.processes.filter(function(processItem){
				if (processItem.id == processId && processItem.seq == processSeq) {
					subProcessSeq = processItem.subProcesses.length + 1
				}
			})
			// Call the subprocess method
			
			

			Process.subProcess(processId, processSeq, subProcessId, subProcessSeq, data, _this).then(function(subProcess){
				// Generate the uuid
				

				var uuid = _this.profile + ':' + _this.app + ':' + processId + ':' + processSeq + ':' + subProcessId + ':' + subProcessSeq;
				var label = data.label;
				// Build the sub-process reference object

				//TODO: Change required to move isActive to subProcess file.Remove from here


				var subProcessRef = {
					id: subProcessId,
					seq: subProcessSeq,
					uuid: uuid,
					label:label
				}
				// Add the reference to the process model
				processModel.subProcesses.push(subProcessRef);
				// Add the subProcess model to the subprocesses array
				//_this.subprocesses.push(subProcess.data);
				// _this.instance.processes.push(processModel);
				for (var index = 0; index < _this.instance.processes.length; index++){
					var processItem = _this.instance.processes[index];
					if (processItem.id == processId && processItem.seq == processSeq) {
						// Remove the current process from the array and add the updated processModel
						_this.instance.processes.splice(index, 1, processModel)
					}
				}	
				// Process the indicator documents workflow processes updates
				var indicators = subProcess.data.indicators;
				var step = subProcess.data.step;
				Process.indicatorDocs(processId, indicators, step, _this).then(function(result){
					var success = util.success('Process: ' + _this.config.processes[0]._id + ' initialized successfully.', _this);
					resolve(success);
				}, function(err){
					reject(err);
				})


				




			}, function(err){
				_this.instance.processes = _this.instance.processes.filter(function( obj ) {
					return !(obj.id == processId && obj.seq == processSeq);
				});
				console.log(err);
				reject(err);
			});
		} catch(err) {
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
Workflow.prototype.transition = function(processId, processSeq, subProcessId, subProcessSeq, stepId, transitionId, data){
	// Re-assign this
	var _this = this;
	return new Promise(function(resolve, reject) {
		try {
			Process.transition(processId, processSeq, subProcessId, subProcessSeq, stepId, transitionId, data, _this).then(function(result){

				
				// Update the current sub-process step data
				var update = function(type){
					_this.instance.processes.filter(function(processItem){
						if (processItem.id == processId && processItem.seq == processSeq) {

							
							processItem.subProcesses.filter(function(subProcessItem){
								if (subProcessItem.id == subProcessId && subProcessItem.seq == subProcessSeq) {
									

									_this.subprocesses.filter(function(subProcessObj){
										if (subProcessObj._id == subProcessItem.uuid) {
											
											if (type == 'step') {

												subProcessObj.step = result.data;
												var success = util.success(result.message, subProcessObj);
												

												resolve(success);
											} else if (type == 'stepComplete') {
												subProcessObj.step = result.data.step;
												subProcessObj.complete = true
												var success = util.success(result.message, subProcessObj);
												
												resolve(success);
											}
										}
									})
								}
							})
						}
					})
				}
				if (result.data.subProcessComplete) {
					
					update('stepComplete');
				} else {
					
					update('step');
				}
			}, function(err){
				
				reject(err);
			});
		} catch(err) {
			
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
Workflow.prototype.assignUser = function(processId, processSeq, subProcessId, subProcessSeq, user){
	// Re-assign the Workflow constructor instance as _this
	var _this = this;
	return new Promise(function(resolve, reject) {
		try {
			Process.assignUser(processId, processSeq, subProcessId, subProcessSeq, user, _this).then(function(result){
				resolve(result);
			}, function(err){
				reject(err);
			})
		} catch(err) {
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
Workflow.prototype.ui = function(){
	// Re-assign the Workflow constructor instance as _this
	var _this = this;
	return {
		getProcess: function(processId, lang){
			return new Promise(function(resolve, reject) {
				try {
					userInterface.getProcess(processId, lang, _this).then(function(model){
						resolve(model);
					}, function(err){
						reject(err);
					})
				} catch(err) {
					reject(err);
				}
			})
		}
	}
};




module.exports = Workflow;
