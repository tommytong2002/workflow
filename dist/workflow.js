(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Workflow = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
	if (profile === '' || profile === undefined) {
        throw util.error('ParamRequired', 'A profile id is required.');
    } else if (typeof(profile) !== 'string') {
    	throw new Error('The profile id must be a javascript string.');
    } else {
    	_this.profile = profile || '';
    }
    // App ID validation checks
	if (app === '' || app === undefined) {
        throw util.error('ParamRequired', 'An app id is required.');
    } else if (typeof(app) !== 'string') {
    	throw new Error('The app id must be a javascript string.');
    } else {
    	_this.app = app || '';
    }
    // Workflow configuration validation checks
    if (config === '' || config === undefined) {
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
				    processes: []
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
 * Workflow.initialize('processId', { validDate: 'date' });
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
					if (objProcess._id === processId) {
						return objProcess;
					}
				});
				if (configProcess[0]._id === undefined) {
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
				if (processItem.id === processId) {
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
			_this.instance.processes.filter(function(processItem){
				if (processItem.id === processId && processItem.seq === processSeq) {
					subProcessSeq = processItem.subProcesses.length + 1
				}
			})
			// Call the subprocess method
			Process.subProcess(processId, processSeq, subProcessId, subProcessSeq, data, _this).then(function(subProcess){
				// Generate the uuid
				var uuid = _this.profile + ':' + _this.app + ':' + processId + ':' + processSeq + ':' + subProcessId + ':' + subProcessSeq;
				// Build the sub-process reference object
				var subProcessRef = {
					id: subProcessId,
					seq: subProcessSeq,
					uuid: uuid
				}
				// Add the reference to the process model
				processModel.subProcesses.push(subProcessRef);
				// Add the subProcess model to the subprocesses array
				_this.subprocesses.push(subProcess.data);
				// _this.instance.processes.push(processModel);
				for (var index = 0; index < _this.instance.processes.length; index++){
					var processItem = _this.instance.processes[index];
					if (processItem.id === processId && processItem.seq === processSeq) {
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
						if (processItem.id === processId && processItem.seq === processSeq) {
							processItem.subProcesses.filter(function(subProcessItem){
								if (subProcessItem.id === subProcessId && subProcessItem.seq === subProcessSeq) {
									_this.subprocesses.filter(function(subProcessObj){
										if (subProcessObj._id === subProcessItem.uuid) {
											if (type === 'step') {
												subProcessObj.step = result.data;
												var success = util.success(result.message, subProcessObj);
												resolve(success);
											} else if (type === 'stepComplete') {
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

},{"./lib/interface":3,"./lib/process":4,"utility":5}],2:[function(require,module,exports){
'use strict';

// var GK = require('./gatekeeper');
var util = require('utility');
// var uuid = require('node-uuid');

// var gatekeeper = new GK();

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

function create(args){
	var processId = args[0] || '';
	// console.log(processId);
	var subProcess = args[1] || {};
	// console.log(subProcess);
	var indicators = subProcess.indicators || [];
	// console.log(indicators);
	var _WFInstance = args[3] || {};
	// console.log(_WFInstance);
	var step = args[2] || {};
	// var data = args[3] || {};
	// console.log(step);
	var result = [];
	// console.log(subProcess);
	return new Promise(function(resolve, reject) {
		util.syncLoop(indicators.length, function(loop){
			var counter = loop.iteration();
			var indicatorId = indicators[counter]._id;
			var indicatorName = util.getName(indicators[counter].name, 'en');
			var id = _WFInstance.profile + ':' + _WFInstance.app + ':' + indicatorId + ':0';

			// TODO: Replace with the gatekeeper promise call, return the object, update the indicator
			// document workflow processes data and update the workflow class indicators array.

			// gatekeeper.instantiate(id, 'newInstance', indicatorId, _WFInstance.profile, data.validDate).then(function(doc){
			//	// Update the indicator workflow processes section
			//	var workflows = doc.workflows;
			//	workflows.id = _WFInstance.config._id;
			//	workflows.instance = _WFInstance.instance._id;
			//	_WFInstance.indicators.push(doc);
			//	loop.next();
			// }, function(err){
			//	reject(err);
			// })

			// This should be the data returned from the gatekeeper call.
			var doc = {
				"_id": id,
				"title": indicatorName,
				"category": {
					"term": indicatorId,
					"label": indicatorName
				},
				"workflows": [{
	        "id": _WFInstance.config._id,
	        "instance": _WFInstance.instance._id,
	        "processes": [{
            "id": processId,
            "subProcessId": subProcess._id,
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
		    }]
			};

			// Update the indicators property array
			if (_WFInstance.indicators.length === 0) {
				_WFInstance.indicators.push(doc);
			} else {
				for (var index = 0; index < _WFInstance.indicators.length; index++){
					var indicator = _WFInstance.indicators[index];
					if (indicator._id === id) {
						// Remove the current item from the array and add the updated processModel
						_WFInstance.indicators.splice(index, 1);
						_WFInstance.indicators.push(doc);
					} else {
						_WFInstance.indicators.push(doc);
					}
				}
			}
			// Got to the next process item
			loop.next();
		}, function(){
			// On completion of all process loop items
	    var success = util.success('Form created successfully.', _WFInstance.indicators);
			resolve(success);
		});
		// var success = util.success('Form indicator set saved successfully.', result);
		// resolve(success);
	});
};

function save(indicator){
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

function submit(form){
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

function authorise(form){
	var completed = [];
	var result = {
		complete: true,
		data: []
	};
	return new Promise(function(resolve, reject) {

		var success = util.success('Form authorised successfully.', result);
		resolve(success);
	});
};

function close(form){
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

module.exports = {

 	create: create,
 	save: save,
 	submit: submit,
 	authorise: authorise,
 	close: close

}

},{"utility":5}],3:[function(require,module,exports){
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
    		if (processItem.id === processId) {
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
    		if (processItem.id === processId && processItem.seq === processSeq) {
    			var spLength = processItem.subProcesses.length;
    			processItem.subProcesses.filter(function(subProcessItem){
    				if (subProcessItem.id === subProcessId && subProcessItem.seq === subProcessSeq && subProcessItem.complete === false) {
    					subProcess = subProcessItem;
    				}
    			})
    		}
    	})
    	// Get the current subProcess configuration
    	_WFInstance.config.processes.filter(function(processConfig){
    		if (processConfig._id === processId) {
    			processConfig.subProcesses.filter(function(subProcessConfig){
    				if (subProcessConfig._id === subProcessId) {
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

 module.exports = {

  getProcess: getProcess

 }

},{"utility":5}],4:[function(require,module,exports){
'use strict';

var util = require('utility');
var form = require('./form');

/**
 * Process Module
 *
 * @module lib/process
 * @author Brent Gordon
 * @version 0.1.0
 * @description test description
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
 function count(arr){
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
function preRequisites(prerequisites, _WFInstance) {
	return new Promise(function(resolve, reject) {
		// Uncomment below section when ready to implement
		var completed = [];
		try {
			util.syncLoop(prerequisites.length, function(loop){
				var counter = loop.iteration();
				preRequisite(prerequisites[counter], _WFInstance).then(function(data){
					// Check if all pre-requisites completed successfully.
					completed.push(true);
					loop.next();
				}, function(err){
					completed.push(false);
					loop.break();
					reject(err);
				});
			}, function(){
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
function preRequisite(prerequisite, _WFInstance){
	return new Promise(function(resolve, reject) {
		switch(prerequisite._type) {
			// TODO: Add the call to the relevant methods based on the _type attribute. Should call the generic action() method.
			case 'processInstances':
				try {
					var id = prerequisite._parameter;
					var subject = count(getSubProcess(id, _WFInstance));
					var compare = util.compare(subject, prerequisite._operator, parseInt(prerequisite._value));
					if (compare) {
						var success = util.success('Pre-requisites passed.', {});
						resolve(success);
					} else {
						var message = '';
						prerequisite.message.i18n.filter(function(item){
							if (item._lang === 'en') {
								message = item.value;
								var error = util.error('WFPreRequisiteError', message);
								reject(error);
							}
						});
					}
				} catch(err) {
					reject(err);
				}
			default:
				var error = util.error('WFPreRequisiteError','Pre-requisite type: ' + prerequisite._type + ' not defined.');
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
function preActions(preActions, _WFInstance){
	return new Promise(function(resolve, reject) {
		var completed = [];
		try {
			util.syncLoop(preActions.length, function(loop){
				var counter = loop.iteration();
				action(preActions[counter], _WFInstance).then(function(data){
					// Check if all pre-requisites completed successfully.
					completed.push(true);
					loop.next();
				}, function(err){
					completed.push(false);
					loop.break();
					reject(err);
				});
			}, function(){
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
function getSubProcess(id, _WFInstance){
	if (_WFInstance.subprocesses === undefined) {
		return [];
	} else {
		_WFInstance.subprocesses.filter(function(subProcess){
			if (subProcess.id === id) {
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
function subProcess(processId, processSeq, subProcessId, subProcessSeq, data, _WFInstance){
	// Get the current process subProcess instance
	// var subProcessSeq = 1;
	var subProcess = [];
	var processConf = [];
	var subProcessConf = [];
	_WFInstance.instance.processes.filter(function(objProcess){
		if (objProcess.id === processId && objProcess.seq === processSeq) {
			var spLength = objProcess.subProcesses.length;
			objProcess.subProcesses.filter(function(objSubProcess){
				if (objSubProcess.id === subProcessId && objSubProcess.seq === subProcessSeq) {
					var uuid = objSubProcess.uuid;
					// subProcess = objSubProcess;
					// console.log(uuid);
					// console.log(_WFInstance.subprocesses.length);
					_WFInstance.subprocesses.filter(function(subProcessItem){
						if (subProcessItem._id === uuid) {
							subProcess = subProcessItem;
							// console.log(subProcess);
						}
					})
				}
			})
		}
	})
	// Get the current subProcess configuration
	_WFInstance.config.processes.filter(function(processConfig){
		if (processConfig._id === processId) {
			processConf = processConfig;
			processConfig.subProcesses.filter(function(subProcessConfig){
				if (subProcessConfig._id === subProcessId) {
					subProcessConf = subProcessConfig;
				}
			})
		}
	})
	// if (subProcess.length !== 0) {
	// 	subProcessSeq = subProcess.length + 1;
	// }
	// The default subProcess model
	var model = {
		_id: _WFInstance.profile + ':' + _WFInstance.app + ':' + processId + ':' + processSeq + ':' + subProcessId + ':' + subProcessSeq,
		id: subProcessId,
		type: 'workflowInstanceSubProcess',
		seq: subProcessSeq,
		initiated: false,
		dates: {
			created: '',
			valid: '',
			due: '',
			closed: ''
		},
		complete: false,
		indicators: [],
		step: {}
	};
	// Return a promise
	return new Promise(function(resolve, reject) {
		// Catch all uncaught errors
		try {
			// 1. Process the pre-actions
			var preActionsConf = processConf.preActions;
			preActions(preActionsConf, _WFInstance).then(function(result){
				// 2. Process the pre-requisites
				var prerequisiteConf = processConf.prerequisites;
				preRequisites(prerequisiteConf, _WFInstance).then(function(result){
					// 3. Initiate the subProcess
					var initiateConf = subProcessConf.initiate;
					initiate(initiateConf, subProcess, data).then(function(result){
						//Update the subProcess model
						model.initiated = result.data.initiated;
						model.dates = result.data.dates;
						// Execute the first step
						var stepId = subProcessConf.steps[0]._id;
						var transitionId = subProcessConf.steps[0].transitions[0]._id;
						var stepSeq = 1;
						step(processId, processSeq, subProcessId, subProcessSeq, stepId, stepSeq, data, _WFInstance).then(function(result){
							model.step = result.data;
							// Update the indicator sections of the subProcess
							indicators(subProcessConf.indicators, _WFInstance).then(function(result){
								model.indicators = result.data;
								// Execute the transitions, if auto
								transition(processId, processSeq, subProcessId, subProcessSeq, stepId, transitionId, data, _WFInstance).then(function(result){
									// Update the subProcess step data
									var transResult = result;
									model.step = result.data;
									// 4. Process the post-actions
									var postActionsConf = processConf.postActions;
									postActions(postActionsConf, _WFInstance).then(function(result){
										var success = util.success(transResult.message, model);
					          resolve(success);
									}, function(err){
										reject(err);
									})
				        }, function(err){
				          reject(err);
				        });
							}, function(err){
								reject(err);
							})
						}, function(err){
							reject(err);
						})
					}, function(err){
						reject(err);
					})
				}, function(err){
					reject(err);
				})
			}, function(err){
				reject(err);
			})
		} catch(err){
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
function initiate(initiate, subProcess, data){
	var completed = [];
	var result = {
		initiated: false,
		dates: {
			created: '',
			valid: '',
			due: '',
			closed: ''
		}
	};
	return new Promise(function(resolve, reject) {
		var init = function(){
			switch(initiate._type) {
				case 'user':
					// If the subProcess initiation is user defined then
					result.dates.created = data.createdDate;
					if (initiate.dates.valid._type === 'userSelected') {
						if (data.validDate !== undefined) {
							result.dates.valid = data.validDate;
						} else {
							util.warn('WFInitiateError', 'No valid date passed in - {data.validDate}');
						}
					}
					if (initiate.dates.due._type === 'userSelected') {
						if (data.dueDate !== undefined) {
							result.dates.due = data.dueDate;
						} else {
							util.warn('WFInitiateError', 'No due date passed in - {data.dueDate}');
						}
					}
					result.initiated = true;
					var success = util.success('Sub-Process initiate completed successfully.', result);
					resolve(success);
					break;
				default:
					var error = util.error('WFInitiateError', 'Initiate type: ' + initiate._type + ' not defined.');
					reject(error);
			}
		}
		if (subProcess.complete === undefined) {
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
function step(processId, processSeq, subProcessId, subProcessSeq, stepId, stepSeq, data, _WFInstance){
	// Default step model
	var model = {
		id: '',
		seq: '',
		status: '',
		message: '',
		assignedTo: {
			userId: '',
			name: ''
		},
		comment: ''
	};
	var subProcess = {};
	var uuid = '';
	var instSubProcess;
	var step = {};
	var transitionId = '';
	return new Promise(function(resolve, reject) {
		try {
			//Get the current subProcess instance data
			_WFInstance.instance.processes.filter(function(objProcess){
				if (objProcess.id === processId && objProcess.seq === processSeq) {
					// console.log(objProcess);
					objProcess.subProcesses.filter(function(objSubProcess){
						if (objSubProcess.id === subProcessId && objSubProcess.seq === subProcessSeq) {
							// instSubProcess = objSubProcess;
							uuid = objSubProcess.uuid;
							// subProcess = objSubProcess;
							// console.log(uuid);
							// console.log(_WFInstance.subprocesses.length);

						}
					})
				}
			})
			// console.log(_WFInstance.subprocesses);
			_WFInstance.subprocesses.filter(function(subProcessItem){
				if (subProcessItem._id === uuid) {
					instSubProcess = subProcessItem;
					// console.log(instSubProcess);
				}
			})
			// console.log(instSubProcess);
			// Get the current config step
			_WFInstance.config.processes.filter(function(objProcess){
				if (objProcess._id === processId) {
					objProcess.subProcesses.filter(function(objSubProcess){
						if (objSubProcess._id === subProcessId) {
							subProcess = objSubProcess;
							objSubProcess.steps.filter(function(objStep){
								if (objStep._id === stepId) {
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
			model.status = step._setInstanceStatusTo;
			model.message = step._setStatusMsgTo;
			model.assignedTo.userId = data.userId !== undefined ? data.userId : '';
			model.assignedTo.name = data.name !== undefined ? data.name : '';
			model.comment = data.comment !== undefined ? data.comment : '';
			// Update the indicator documents process step data
			// console.log(instSubProcess);
			var indicators = instSubProcess !== undefined ? instSubProcess.indicators : [];
			indicatorDocs(processId, indicators, model, _WFInstance).then(function(result){
				// If actions are specified, execute them
				if (step.actions[0] !== undefined) {
					actions(step.actions, processId, processSeq, subProcessId, subProcessSeq, subProcess, model, _WFInstance).then(function(result){
						// Execute the transitions, if auto
						// console.log(model);
						var success = util.success('Actions completed successfully.', model);
						resolve(success);
					}, function(err){
						reject(err);
					})
				// Else tasks are sprecified, execute them
				} else if (step.task !== undefined) {
					var success = util.success('Task awaiting user action.', model);
					resolve(success);
				}
			}, function(err){
				reject(err);
			})
		} catch(err) {
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
function indicators(indicators, _WFInstance){
	var model = [];
	return new Promise(function(resolve, reject) {
		try {
			// Update the indicator sections of the subProcess
			for (var i = 0; i < indicators.length; i++) {
				var indicatorId = indicators[i]._id;
				for (var j = 0; j < _WFInstance.indicators.length; j++) {
					var indicator = _WFInstance.indicators[j];
					var indicatorModel = {
						id: '',
						instances: []
					}
					var instanceModel = {
						uuid: '',
						title: '',
						key: '',
						seq: 1
					}
					if (indicatorId === indicator.category.term) {
						indicatorModel.id = indicatorId;
						instanceModel.uuid = indicator._id;
						instanceModel.title = indicator.title;
						instanceModel.key = '';
						instanceModel.seq = 1;
						indicatorModel.instances.push(instanceModel);
						model.push(indicatorModel);
					}
				}
			}
			var success = util.success('Process indicator model updated.', model);
			resolve(success);
		} catch(err) {
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
function assignUser(processId, processSeq, subProcessId, subProcessSeq, user, _WFInstance){
	return new Promise(function(resolve, reject) {
		try {
			var uuid = '';
			// Get the current subProcess instance data
			_WFInstance.instance.processes.filter(function(objProcess){
				if (objProcess.id === processId && objProcess.seq === processSeq) {
					objProcess.subProcesses.filter(function(objSubProcess){
						if (objSubProcess.id === subProcessId && objSubProcess.seq === subProcessSeq) {
							uuid = objSubProcess.uuid;
						}
					})
				}
			})
			_WFInstance.subprocesses.filter(function(subProcessItem){
				if (subProcessItem._id === uuid) {
					// Set the user details
					subProcessItem.step.assignedTo.userId = user.id;
					subProcessItem.step.assignedTo.name = user.name;
					// Update the indicators user details
					var indicators = subProcessItem.indicators;
					for (var i = 0; i < indicators.length; i++) {
						var indicator = indicators[i];
						for (var j = 0; j < indicator.instances.length; j++) {
							var instance = indicator.instances[j];
							for (var k = 0; k < _WFInstance.indicators.length; k++) {
								var doc = _WFInstance.indicators[k];
								if (instance.uuid === doc._id) {
									doc.workflows.filter(function(workflow){
										if (workflow.id === _WFInstance.config._id) {
											workflow.processes.filter(function(processItem){
												if (processItem.id === processId) {
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
					var success = util.success('User assigned successfully. UserId: "' + user.id + '", Name: "' + user.name + '"', subProcessItem);
					resolve(success);
				}
			})
		} catch(err){
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
function indicatorDocs(processId, indicators, step, _WFInstance){
	return new Promise(function(resolve, reject) {
		try {
			// Update the indicator sections of the subProcess
			if (indicators === undefined){
				var error = util.error('WFIndicatorsUpdate', 'Indicators parameter is required. - Value: ' + indicators)
				reject(err);
			} else {
				for (var i = 0; i < indicators.length; i++) {
					var indicator = indicators[i];
					for (var j = 0; j < indicator.instances.length; j++) {
						var instance = indicator.instances[j];
						for (var k = 0; k < _WFInstance.indicators.length; k++) {
							var doc = _WFInstance.indicators[k];
							if (instance.uuid === doc._id) {
								doc.workflows.filter(function(workflow){
									if (workflow.id === _WFInstance.config._id) {
										workflow.processes.filter(function(processItem){
											if (processItem.id === processId) {
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
		} catch(err) {
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
function actions(actions, processId, processSeq, subProcessId, subProcessSeq, subProcess, step, _WFInstance){
	var arrActions = [];
	return new Promise(function(resolve, reject) {
		util.syncLoop(actions.length, function(loop){
			var counter = loop.iteration();
			action(actions[counter], processId, processSeq, subProcessId, subProcessSeq, subProcess, step, _WFInstance).then(function(result){
				var retAction = { id: actions[counter]._id, seq: counter, data: result };
				arrActions.push(retAction);
				loop.next();
			}, function(err){
				loop.break();
				reject(err);
			});
		}, function(){
			// On completion of the loop
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
function action(action, processId, processSeq, subProcessId, subProcessSeq, subProcess, step, _WFInstance){
	return new Promise(function(resolve, reject) {
		var args = [];
		var context = 'global';
		var method = '';
		if (action._id !== undefined) {
			context = action._id.split(".")[0];
		}
		if (action._id !== undefined) {
			method = action._id.split(".")[1];
		}
		args.length = 0;
		for (var i = 0; i < action._args.length; i++) {
			var arg = action._args[i];
			switch(arg) {
				case 'processId':
					args.push(processId);
					break;
				case 'processSeq':
					args.push(processSeq);
					break;
				case 'subProcessId':
					args.push(subProcessId);
					break;
				case 'subProcessSeq':
					args.push(subProcessSeq);
					break;
				case 'subProcess':
					args.push(subProcess);
					break;
				case 'step':
					args.push(step);
					break;
				// Add the required parameters to the args array

				default:
					args = [];
			}
		}
		args.push(_WFInstance);
		if (action._id === 'form.create') {
			form.create(args).then(function(result){
				resolve(result.data);
			}, function(err){
				reject(err);
			});
		} else if (action._id === 'form.authorise') {
			form.authorise(args).then(function(result){
				resolve(result.data);
			}, function(err){
				reject(err);
			});
		} else if (action._id === 'form.close') {
			form.close(args).then(function(result){
				resolve(result.data);
			}, function(err){
				reject(err);
			});
		} else {
			var error = util.error('WFActionError', 'Method: ' + action_id + ' not defined.');
			reject(error);
		}
		// if (context === 'form') {
		// 	form[method](args).then(function(result){
		// 		resolve(result.data);
		// 	}, function(err){
		// 		reject(err);
		// 	});
		// } else {
		// 	var error = util.error('WFActionError', 'Module: ' + context + ' not defined.');
		// 	reject(error);
		// }
	});
};

/**
 * Process task
 *
 * @param {object} task - the task config data
 * @param {object} inputData - the user input data
 *
 * @example ''
 *
 * @return ''
 *
 */
function task(task){
	return 'Implementation pending..';
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
function transition(processId, processSeq, subProcessId, subProcessSeq, stepId, transitionId, data, _WFInstance){
	return new Promise(function(resolve, reject) {
		try {
			var stepSeq = 0;
			var nextStepId = '';
			var nextStepSeq = 0;
			var subProcess = [];
			var currentProcess = _WFInstance.config.processes.filter(function(objProcess){
				if (objProcess._id === processId) {
					return objProcess;
				}
			});
			var currentSubProcess = currentProcess[0].subProcesses.filter(function(objSubProcess){
				if (objSubProcess._id === subProcessId) {
					return objSubProcess;
				}
			});
			var currentStep = currentSubProcess[0].steps.filter(function(objStep){
				if (objStep._id === stepId) {
					return objStep;
				}
			});
			var transition = currentStep[0].transitions.filter(function(objTransition){
				if (objTransition._id === transitionId) {
					return objTransition;
				}
			});
			for (var i = 0; i < currentSubProcess[0].steps.length; i++){
				if (currentSubProcess[0].steps[i]._id === stepId) {
					stepSeq = parseInt(currentSubProcess[0].steps[i]._seq);
				}
			}
			currentSubProcess[0].steps.filter(function(stepItem){
				nextStepSeq = stepSeq + 1;
				if (parseInt(stepItem._seq) === nextStepSeq) {
					nextStepId = stepItem._id;
				}
			})
			// console.log(_WFInstance.instance);
			_WFInstance.instance.processes.filter(function(objProcess){
				if (objProcess.id === processId && objProcess.seq === processSeq) {
					objProcess.subProcesses.filter(function(objSubProcess){
						if (objSubProcess.id === subProcessId && objSubProcess.seq === subProcessSeq) {
							var uuid = objSubProcess.uuid;
							// subProcess = objSubProcess;
							_WFInstance.subprocesses.filter(function(subProcessItem){
								if (subProcessItem._id === uuid) {
									subProcess = subProcessItem;
								}
							})
						}
					})
				}
			});
			var maxSteps = currentSubProcess[0].steps.length;
			switch(transition[0]._type) {
				case 'auto':
					if (transition[0].goTo._type === 'nextStep') {
						step(processId, processSeq, subProcessId, subProcessSeq, nextStepId, nextStepSeq, data, _WFInstance).then(function(result){
							if (nextStepSeq === maxSteps) {
								var success = util.success('All Step transitions have completed successfully.', { subProcessComplete: true, step: result.data });
								resolve(success);
							} else {
								var success = util.success('Step transition completed successfully.', result.data);
								resolve(success);
							}
							var success = util.success('Step transition completed successfully.', result.data);
							resolve(success);
						}, function(err){
							reject(err);
						});
					}
					break;
				case 'user':
					if (transition[0].goTo._type === 'nextStep') {
						step(processId, processSeq, subProcessId, subProcessSeq, nextStepId, nextStepSeq, data, _WFInstance).then(function(result){
							if (nextStepSeq === maxSteps) {
								var success = util.success('All Step transitions have completed successfully.', { subProcessComplete: true, step: result.data });
								resolve(success);
							} else {
								var success = util.success('Step transition completed successfully.', result.data);
								resolve(success);
							}
							var success = util.success('Step transition completed successfully.', result.data);
							resolve(success);
						}, function(err){
							reject(err);
						});
					} else if (transition[0].goTo._type === 'stepId') {
						var goToStepId = transition[0].goTo._stepId;
						var goToStepSeq = 1;
						currentSubProcess[0].steps.filter(function(stepItem){
							if (stepItem._id === goToStepId) {
								goToStepSeq = parseInt(stepItem._seq);
							}
						})
						step(processId, processSeq, subProcessId, subProcessSeq, goToStepId, goToStepSeq, data, _WFInstance).then(function(result){
							if (goToStepSeq === maxSteps) {
								var success = util.success('All Step transitions have completed successfully.', { subProcessComplete: true, step: result.data });
								resolve(success);
							} else {
								var success = util.success('Step transition completed successfully.', result.data);
								resolve(success);
							}
							var success = util.success('Step transition completed successfully.', result.data);
							resolve(success);
						}, function(err){
							reject(err);
						});
					}
					break;
				default:
					var error = util.error('WFTransitionError','Transition type: ' + transition[0]._type + ' not defined.');
					reject(error);
			}
		} catch(err){
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
function postActions(postActions, _WFInstance){
	return new Promise(function(resolve, reject) {
		var completed = [];
		try {
			util.syncLoop(postActions.length, function(loop){
				var counter = loop.iteration();
				action(postActions[counter], _WFInstance).then(function(data){
					// Check if all pre-requisites completed successfully.
					completed.push(true);
					loop.next();
				}, function(err){
					completed.push(false);
					loop.break();
					reject(err);
				});
			}, function(){
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

module.exports = {

 	preRequisites: preRequisites,
 	preActions: preActions,
 	subProcess: subProcess,
	indicatorDocs: indicatorDocs,
 	task: task,
 	transition: transition,
	assignUser: assignUser

}

},{"./form":2,"utility":5}],5:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Vzci9sb2NhbC9saWIvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsImluZGV4LmpzIiwibGliL2Zvcm0uanMiLCJsaWIvaW50ZXJmYWNlLmpzIiwibGliL3Byb2Nlc3MuanMiLCJub2RlX21vZHVsZXMvdXRpbGl0eS9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcGhCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzOUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgUHJvY2VzcyA9IHJlcXVpcmUoJy4vbGliL3Byb2Nlc3MnKTtcbnZhciB1dGlsID0gcmVxdWlyZSgndXRpbGl0eScpO1xudmFyIHVzZXJJbnRlcmZhY2UgPSByZXF1aXJlKCcuL2xpYi9pbnRlcmZhY2UnKTtcblxuLypnbG9iYWxzICovXG5cbi8qKlxuICogQSBuZXcgV29ya2Zsb3cgY29uc3RydWN0b3IgaW5zdGFuY2UgY29udGFpbnMgdGhlIHJlZmVyZW5jZSB0byB0aGUgYXBwbGljYXRpb25cbiAqIGFuZCBhc3NvY2lhdGVkIHByb2ZpbGUgd2hpY2ggaXQgcmVxdWlyZXMgYXMgdGhlIGZpcnN0IHR3byBwYXJhbWV0ZXJzLiBJdCBhbHNvXG4gKiByZXF1aXJlcyBhIHdvcmtmbG93IGNvbmZpZ3VyYXRpb24sIGFzIHRoZSB0aGlyZCBwYXJhbWV0ZXIsIHdoaWNoIGlzIHVzZWQgdG9cbiAqIGRlc2NpYmUgdGhlIHdvcmtmbG93IHByb2Nlc3Nlcy4gSWYgYSB3b3JrZmxvdyBpbnN0YW5jZSBleGlzdHMgeW91IGNhbiBwYXNzIGl0XG4gKiBpbiBhcyB0aGUgZm91cnRoIHBhcmFtZXRlciB3aGljaCBpdCB3aWxsIHRoZW4gdXNlLCBlbHNlIGNyZWF0ZSBhIG5ldyBvbmUuXG4gKlxuICogQGNvbnN0cnVjdG9yXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHByb2ZpbGUgLSBUaGUgY3VycmVudCBwcm9maWxlIGlkXG4gKiBAcGFyYW0ge3N0cmluZ30gYXBwIC0gVGhlIGFzc29jaWF0ZWQgYXBwbGljYXRpb24gaWRcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgLSBUaGUgYXBwbGljYXRpb24gd29ya2Zsb3cgY29uZmlndXJhdGlvbiAvIGRlZmluaXRpb25cbiAqIEBwYXJhbSB7T2JqZWN0fSBbaW5zdGFuY2VdIC0gQW4gZXhpc3RpbmcgYXBwbGljYXRpb24gcHJvZmlsZSB3b3JrZmxvdyBpbnN0YW5jZSBiYXNlZFxuICogb24gdGhlIGRlZmluaXRpb25cbiAqXG4gKiBAYXV0aG9yIEJyZW50IEdvcmRvblxuICogQHZlcnNpb24gMC4xLjBcbiAqXG4gKiBAZXhhbXBsZVxuICogdmFyIGNvbmZpZyA9IHsgJ19pZCc6ICdhYmMxMjMnIH07XG4gKiB2YXIgaW5zdGFuY2UgPSB7ICdfaWQnOiAnaW5zdGFuY2VfYWJjMTIzJyB9O1xuICogLy8gSWYgdGhlcmUgaXNuJ3QgYW4gZXhpc3RpbmcgaW5zdGFuY2VcbiAqIHZhciB3b3JrZmxvdyA9IG5ldyBXb3JrZmxvdygnMTIzNCcsICc1Njc4JywgY29uZmlnKTtcbiAqIC8vIElmIHRoZXJlIGlzIGFuIGV4aXN0aW5nIGluc3RhbmNlXG4gKiB2YXIgd29ya2Zsb3cgPSBuZXcgV29ya2Zsb3coJzEyMzQnLCAnNTY3OCcsIGNvbmZpZywgaW5zdGFuY2UpO1xuICpcbiAqIEByZXR1cm4ge09iamVjdH0gbmV3IFdvcmtmbG93IG9iamVjdFxuICpcbiAqIEB0aHJvd3MgRXJyb3I6IEEgcHJvZmlsZSBpZCBpcyByZXF1aXJlZFxuICogQHRocm93cyBFcnJvcjogQW4gYXBwIGlkIGlzIHJlcXVpcmVkXG4gKiBAdGhyb3dzIEVycm9yOiBBIHdvcmtmbG93IGNvbmZpZ3VyYXRpb24gaXMgcmVxdWlyZWRcbiAqXG4gKi9cblxuZnVuY3Rpb24gV29ya2Zsb3cocHJvZmlsZSwgYXBwLCBjb25maWcpe1xuXHR2YXIgX3RoaXMgPSB0aGlzO1xuXHQvLyBQcm9maWxlIElEIHZhbGlkYXRpb24gY2hlY2tzXG5cdGlmIChwcm9maWxlID09PSAnJyB8fCBwcm9maWxlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhyb3cgdXRpbC5lcnJvcignUGFyYW1SZXF1aXJlZCcsICdBIHByb2ZpbGUgaWQgaXMgcmVxdWlyZWQuJyk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YocHJvZmlsZSkgIT09ICdzdHJpbmcnKSB7XG4gICAgXHR0aHJvdyBuZXcgRXJyb3IoJ1RoZSBwcm9maWxlIGlkIG11c3QgYmUgYSBqYXZhc2NyaXB0IHN0cmluZy4nKTtcbiAgICB9IGVsc2Uge1xuICAgIFx0X3RoaXMucHJvZmlsZSA9IHByb2ZpbGUgfHwgJyc7XG4gICAgfVxuICAgIC8vIEFwcCBJRCB2YWxpZGF0aW9uIGNoZWNrc1xuXHRpZiAoYXBwID09PSAnJyB8fCBhcHAgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aHJvdyB1dGlsLmVycm9yKCdQYXJhbVJlcXVpcmVkJywgJ0FuIGFwcCBpZCBpcyByZXF1aXJlZC4nKTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZihhcHApICE9PSAnc3RyaW5nJykge1xuICAgIFx0dGhyb3cgbmV3IEVycm9yKCdUaGUgYXBwIGlkIG11c3QgYmUgYSBqYXZhc2NyaXB0IHN0cmluZy4nKTtcbiAgICB9IGVsc2Uge1xuICAgIFx0X3RoaXMuYXBwID0gYXBwIHx8ICcnO1xuICAgIH1cbiAgICAvLyBXb3JrZmxvdyBjb25maWd1cmF0aW9uIHZhbGlkYXRpb24gY2hlY2tzXG4gICAgaWYgKGNvbmZpZyA9PT0gJycgfHwgY29uZmlnID09PSB1bmRlZmluZWQpIHtcbiAgICBcdHRocm93IHV0aWwuZXJyb3IoJ1BhcmFtUmVxdWlyZWQnLCAnQSB3b3JrZmxvdyBjb25maWd1cmF0aW9uIGlzIHJlcXVpcmVkLicpO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mKGNvbmZpZykgIT09ICdvYmplY3QnKSB7XG4gICAgICAgIF90aGlzLmNvbmZpZyA9IEpTT04ucGFyc2UoY29uZmlnKTtcbiAgICB9IGVsc2Uge1xuICAgIFx0X3RoaXMuY29uZmlnID0gY29uZmlnO1xuICAgIH1cbiAgICAvLyBXb3JrZmxvdyBpbnN0YW5jZSB2YWxpZGF0aW9uIGNoZWNrc1xuICAgIF90aGlzLmluc3RhbmNlO1xuXHRcdC8vIFdvcmtmbG93IHN1Yi1wcm9jZXNzZXMgdmFsaWRhdGlvbiBjaGVja3Ncblx0XHRfdGhpcy5zdWJwcm9jZXNzZXMgPSBbXTtcblx0XHQvLyBXb3JrZmxvdyBpbmRpY2F0b3JzIHBsYWNlIGhvbGRlclxuXHRcdF90aGlzLmluZGljYXRvcnMgPSBbXTtcblx0XHQvLyBXb3JrZmxvdyBzdWItcHJvY2VzcyBzdGVwIGhpc3RvcnkgcGxhY2UgaG9sZGVyXG5cdFx0X3RoaXMuaGlzdG9yeSA9IFtdO1xuXG59XG5cbi8qKlxuICogV29ya2Zsb3cgZ2V0IHByb2ZpbGUgaWQuXG4gKlxuICogQGV4YW1wbGUgXCJcIlxuICpcbiAqIEByZXR1cm4gXCJcIlxuICpcbiAqL1xuV29ya2Zsb3cucHJvdG90eXBlLmdldFByb2ZpbGUgPSBmdW5jdGlvbigpe1xuXHRyZXR1cm4gdGhpcy5wcm9maWxlO1xufTtcblxuLyoqXG4gKiBXb3JrZmxvdyBnZXQgYXBwIGlkLlxuICpcbiAqIEBleGFtcGxlIFwiXCJcbiAqXG4gKiBAcmV0dXJuIFwiXCJcbiAqXG4gKi9cbldvcmtmbG93LnByb3RvdHlwZS5nZXRBcHAgPSBmdW5jdGlvbigpe1xuXHRyZXR1cm4gdGhpcy5hcHA7XG59O1xuXG4vKipcbiAqIFdvcmtmbG93IGdldCBjb25maWcuXG4gKlxuICogQGV4YW1wbGUgXCJcIlxuICpcbiAqIEByZXR1cm4gXCJcIlxuICpcbiAqL1xuV29ya2Zsb3cucHJvdG90eXBlLmdldENvbmZpZyA9IGZ1bmN0aW9uKCl7XG5cdHJldHVybiB0aGlzLmNvbmZpZztcbn07XG5cbi8qKlxuICogV29ya2Zsb3cgZ2V0IGluc3RhbmNlLlxuICpcbiAqIEBleGFtcGxlIFwiXCJcbiAqXG4gKiBAcmV0dXJuIFwiXCJcbiAqXG4gKi9cbldvcmtmbG93LnByb3RvdHlwZS5nZXRJbnN0YW5jZSA9IGZ1bmN0aW9uKCl7XG5cdHJldHVybiB0aGlzLmluc3RhbmNlO1xufTtcblxuLyoqXG4gKiBXb3JrZmxvdyBzZXQgdGhlIGluc3RhbmNlIGRhdGEuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGRhdGEgLSB0aGUgd29ya2Zsb3cgcHJvY2VzcyBpbnN0YW5jZSBkYXRhXG4gKlxuICogQGV4YW1wbGUgXCJcIlxuICpcbiAqIEByZXR1cm4gXCJcIlxuICpcbiAqL1xuV29ya2Zsb3cucHJvdG90eXBlLnNldEluc3RhbmNlID0gZnVuY3Rpb24oZGF0YSl7XG5cdHRoaXMuaW5zdGFuY2UgPSBkYXRhO1xufTtcblxuLyoqXG4gKiBXb3JrZmxvdyBnZXQgc3ViLXByb2Nlc3NlcyBkYXRhLlxuICpcbiAqIEBleGFtcGxlIFwiXCJcbiAqXG4gKiBAcmV0dXJuIFwiXCJcbiAqXG4gKi9cbldvcmtmbG93LnByb3RvdHlwZS5nZXRTdWJQcm9jZXNzZXMgPSBmdW5jdGlvbigpe1xuXHRyZXR1cm4gdGhpcy5zdWJwcm9jZXNzZXM7XG59O1xuXG4vKipcbiAqIFdvcmtmbG93IHNldCB0aGUgc3ViLXByb2Nlc3NlcyBkYXRhLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhIC0gdGhlIHdvcmtmbG93IHByb2Nlc3MgaW5zdGFuY2UgZGF0YVxuICpcbiAqIEBleGFtcGxlIFwiXCJcbiAqXG4gKiBAcmV0dXJuIFwiXCJcbiAqXG4gKi9cbldvcmtmbG93LnByb3RvdHlwZS5zZXRTdWJQcm9jZXNzZXMgPSBmdW5jdGlvbihkYXRhKXtcblx0dGhpcy5zdWJwcm9jZXNzZXMgPSBkYXRhO1xufTtcblxuLyoqXG4gKiBXb3JrZmxvdyBnZXQgaW5kaWNhdG9yIHNldCBkYXRhLlxuICpcbiAqIEBleGFtcGxlIFwiXCJcbiAqXG4gKiBAcmV0dXJuIFwiXCJcbiAqXG4gKi9cbldvcmtmbG93LnByb3RvdHlwZS5nZXRJbmRpY2F0b3JzID0gZnVuY3Rpb24oKXtcblx0cmV0dXJuIHRoaXMuaW5kaWNhdG9ycztcbn07XG5cbi8qKlxuICogV29ya2Zsb3cgc2V0IHRoZSBpbmRpY2F0b3Igc2V0IGRhdGEuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGRhdGEgLSB0aGUgd29ya2Zsb3cgcHJvY2VzcyBpbnN0YW5jZSBkYXRhXG4gKlxuICogQGV4YW1wbGUgXCJcIlxuICpcbiAqIEByZXR1cm4gXCJcIlxuICpcbiAqL1xuV29ya2Zsb3cucHJvdG90eXBlLnNldEluZGljYXRvcnMgPSBmdW5jdGlvbihkYXRhKXtcblx0dGhpcy5pbmRpY2F0b3JzID0gZGF0YTtcbn07XG5cbi8qKlxuICogU2V0IHRoZSB2YXJpYWJsZSB2YWx1ZS5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gcHJvY2Vzc0lkIC0gdGhlIFdvcmtmbG93IGNvbmZpZyAvIGRlZmluaXRpb24gcHJvY2VzcyBpZFxuICogQHBhcmFtIHtudW1iZXJ9IHByb2Nlc3NTZXEgLSB0aGUgV29ya2Zsb3cgaW5zdGFuY2UgcHJvY2VzcyBzZXFcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdWJQcm9jZXNzSWQgLSB0aGUgV29ya2Zsb3cgY29uZmlnIC8gZGVmaW5pdGlvbiBzdWItcHJvY2VzcyBpZFxuICogQHBhcmFtIHtudW1iZXJ9IHN1YlByb2Nlc3NTZXEgLSB0aGUgV29ya2Zsb3cgaW5zdGFuY2Ugc3ViLXByb2Nlc3Mgc2VxXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RlcElkIC0gdGhlIFdvcmtmbG93IGNvbmZpZyAvIGRlZmluaXRpb24gc3RlcCBpZFxuICogQHBhcmFtIHtPYmplY3R9IHZhcmlhYmxlIC0gdGhlIFdvcmtmbG93IHZhcmlhYmxlIG9iamVjdFxuICpcbiAqIEBleGFtcGxlICcnXG4gKlxuICogQHJldHVybiAnJ1xuICpcbiAqL1xuLy8gV29ya2Zsb3cucHJvdG90eXBlLnNldFZhcmlhYmxlID0gZnVuY3Rpb24ocHJvY2Vzc0lkLCBwcm9jZXNzU2VxLCBzdWJQcm9jZXNzSWQsIHN1YlByb2Nlc3NTZXEsIHN0ZXBJZCwgdmFyaWFibGUpe1xuLy8gXHR2YXIgX3RoaXMgPSB0aGlzO1xuLy8gXHRyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4vLyBcdFx0dHJ5IHtcbi8vIFx0XHRcdFByb2Nlc3MuZ2V0VmFyaWFibGUocHJvY2Vzc0lkLCBwcm9jZXNzU2VxLCBzdWJQcm9jZXNzSWQsIHN1YlByb2Nlc3NTZXEsIHN0ZXBJZCwgdmFyaWFibGUpLnRoZW4oZnVuY2lvbihyZXN1bHQpe1xuLy8gXHRcdFx0XHRyZXNvbHZlKHJlc3VsdC5kYXRhKTtcbi8vIFx0XHRcdH0sIGZ1bmN0aW9uKGVycil7XG4vLyBcdFx0XHRcdHJlamVjdChlcnIpO1xuLy8gXHRcdFx0fSlcbi8vIFx0XHR9IGNhdGNoIChlcnIpIHtcbi8vIFx0XHRcdHJlamVjdChlcnIpO1xuLy8gXHRcdH1cbi8vIFx0fSk7XG4vLyB9O1xuXG4vKipcbiAqIEdldCB0aGUgdmFyaWFibGUgdmFsdWUuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHByb2Nlc3NJZCAtIHRoZSBXb3JrZmxvdyBjb25maWcgLyBkZWZpbml0aW9uIHByb2Nlc3MgaWRcbiAqIEBwYXJhbSB7bnVtYmVyfSBwcm9jZXNzU2VxIC0gdGhlIFdvcmtmbG93IGluc3RhbmNlIHByb2Nlc3Mgc2VxXG4gKiBAcGFyYW0ge3N0cmluZ30gc3ViUHJvY2Vzc0lkIC0gdGhlIFdvcmtmbG93IGNvbmZpZyAvIGRlZmluaXRpb24gc3ViLXByb2Nlc3MgaWRcbiAqIEBwYXJhbSB7bnVtYmVyfSBzdWJQcm9jZXNzU2VxIC0gdGhlIFdvcmtmbG93IGluc3RhbmNlIHN1Yi1wcm9jZXNzIHNlcVxuICogQHBhcmFtIHtzdHJpbmd9IHN0ZXBJZCAtIHRoZSBXb3JrZmxvdyBjb25maWcgLyBkZWZpbml0aW9uIHN0ZXAgaWRcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgLSB0aGUgV29ya2Zsb3cgdmFyaWFibGUgaWRcbiAqXG4gKiBAZXhhbXBsZSAnJ1xuICpcbiAqIEByZXR1cm4gJydcbiAqXG4gKi9cbi8vIFdvcmtmbG93LnByb3RvdHlwZS5nZXRWYXJpYWJsZSA9IGZ1bmN0aW9uKHByb2Nlc3NJZCwgcHJvY2Vzc1NlcSwgc3ViUHJvY2Vzc0lkLCBzdWJQcm9jZXNzU2VxLCBzdGVwSWQsIGtleSl7XG4vLyBcdHZhciBfdGhpcyA9IHRoaXM7XG4vLyBcdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbi8vIFx0XHR0cnkge1xuLy8gXHRcdFx0UHJvY2Vzcy5zZXRWYXJpYWJsZShwcm9jZXNzSWQsIHByb2Nlc3NTZXEsIHN1YlByb2Nlc3NJZCwgc3ViUHJvY2Vzc1NlcSwgc3RlcElkLCBrZXkpLnRoZW4oZnVuY2lvbihyZXN1bHQpe1xuLy8gXHRcdFx0XHRyZXNvbHZlKHJlc3VsdC5kYXRhKTtcbi8vIFx0XHRcdH0sIGZ1bmN0aW9uKGVycil7XG4vLyBcdFx0XHRcdHJlamVjdChlcnIpO1xuLy8gXHRcdFx0fSlcbi8vIFx0XHR9IGNhdGNoIChlcnIpIHtcbi8vIFx0XHRcdHJlamVjdChlcnIpO1xuLy8gXHRcdH1cbi8vIFx0fSk7XG4vLyB9O1xuXG4vKipcbiAqIFRoaXMgbWV0aG9kIGNyZWF0ZXMgYSBuZXcgd29ya2Zsb3cgcHJvY2VzcyBpLmUuIGl0IGNyZWF0ZXMgYSB3b3JrZmxvdyBwcm9jZXNzZXMgaW5zdGFuY2VcbiAqIG9iamVjdCB3aXRoIHRoZSBtaW5pbXVtIHJlcXVpcmVkIGRhdGEuIFRoaXMgaW5zdGFuY2UgY2FuIGJlIHJlZmVyZW5jZWQgaW4gdGhlIGZvbGxvd2luZ1xuICogd2F5LCBzZWUgZXhhbXBsZSBiZWxvdy5cbiAqXG4gKiBAZXhhbXBsZVxuICogdmFyIGNvbmZpZyA9IHsgJ19pZCc6ICdhYmMxMjMnIH07XG4gKiB2YXIgd29ya2Zsb3cgPSBuZXcgV29ya2Zsb3coJzEyMzQnLCAnNTY3OCcsIGNvbmZpZyk7XG4gKiB3b3JrZmxvdy5jcmVhdGUoKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCl7XG4gKlx0Y29uc29sZS5sb2cocmVzdWx0Lm1lc3NhZ2UpO1xuICpcdC8vIFRoZSBmb2xsb3dpbmcgcHJvcGVydGllcyBjYW4gbm93IGJlIGFjY2Vzc2VkXG4gKiBcdHZhciBwcm9maWxlID0gd29ya2Zsb3cucHJvZmlsZTtcbiAqIFx0dmFyIGFwcCA9IHdvcmtmbG93LmFwcDtcbiAqIFx0dmFyIGNvbmZpZyA9IHdvcmtmbG93LmNvbmZpZztcbiAqXHQvLyBPbiBzdWNjZXNzIHlvdSBjYW4gYWNjZXNzIHRoZSBpbnN0YW5jZSB0aGUgZm9sbG93aW5nIHdheVxuICpcdHZhciBpbnN0YW5jZSA9IHdvcmtmbG93Lmluc3RhbmNlO1xuICogfSwgZnVuY3Rpb24oZXJyb3Ipe1xuICpcdGNvbnNvbGUubG9nKGVycm9yKTtcbiAqIH0pO1xuICpcbiAqIEByZXR1cm4ge09iamVjdH0gbmV3IFdvcmtmbG93IGluc3RhbmNlIHdpdGggdXBkYXRlZCBpbnN0YW5jZSBkYXRhLlxuICpcbiAqL1xuV29ya2Zsb3cucHJvdG90eXBlLmNyZWF0ZSA9IGZ1bmN0aW9uKCl7XG5cdHZhciBfdGhpcyA9IHRoaXM7XG5cdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcblx0XHR0cnkge1xuXHRcdFx0aWYgKF90aGlzLmluc3RhbmNlICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0dmFyIHdhcm4gPSB1dGlsLndhcm4oJ0luc3RhbmNlIGFscmVhZHkgZXhpc3RzLicsIF90aGlzKVxuXHRcdFx0XHRyZXNvbHZlKHdhcm4pO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Ly8gQ3JlYXRlIHRoZSB3b3JrZmxvdyBwcm9jZXNzZXMgaW5zdGFuY2Ugb2JqZWN0XG5cdFx0XHRcdHZhciBtb2RlbCA9IHtcblx0XHRcdFx0ICAgIF9pZDogJycsXG5cdFx0XHRcdCAgICB2ZXJzaW9uOiAnJyxcblx0XHRcdFx0ICAgIHR5cGU6ICd3b3JrZmxvd0luc3RhbmNlJyxcblx0XHRcdFx0ICAgIHByb2Nlc3NlczogW11cblx0XHRcdFx0fTtcblx0XHRcdFx0bW9kZWwuX2lkID0gX3RoaXMucHJvZmlsZSArICc6cHJvY2Vzc2VzJztcblx0XHRcdFx0bW9kZWwudmVyc2lvbiA9IF90aGlzLmNvbmZpZy52ZXJzaW9uO1xuXHRcdFx0XHRfdGhpcy5pbnN0YW5jZSA9IG1vZGVsO1xuXHRcdFx0XHR2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnV29ya2Zsb3cgcHJvY2Vzc2VzIGluc3RhbmNlIGNyZWF0ZWQgc3VjY2Vzc2Z1bGx5LicsIF90aGlzKTtcblx0XHRcdFx0cmVzb2x2ZShzdWNjZXNzKTtcblx0XHRcdH1cblx0XHR9IGNhdGNoIChlcnIpIHtcblx0XHRcdHJlamVjdChlcnIpO1xuXHRcdH1cblx0fSk7XG59O1xuXG4vKipcbiAqIFdvcmtmbG93IGluaXRpYWxpc2UsIHRoaXMgZnVuY3Rpb24gZXhlY3V0ZXMgYSBwcm9jZXNzIHdpdGhpbiBhIHdvcmtmbG93XG4gKiBjb25maWd1cmF0aW9uLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBwcm9jZXNzSWQgLSB0aGUgcHJvY2VzcyBpZCB0byBwcm9jZXNzXG4gKiBAcGFyYW0ge29iamVjdH0gW2RhdGFdIC0gdGhlIGlucHV0IGRhdGEgdG8gcHJvY2Vzc1xuICpcbiAqIEBleGFtcGxlXG4gKiBXb3JrZmxvdy5pbml0aWFsaXplKCdwcm9jZXNzSWQnLCB7IHZhbGlkRGF0ZTogJ2RhdGUnIH0pO1xuICpcbiAqIEByZXR1cm4gXCJcIlxuICpcbiAqL1xuV29ya2Zsb3cucHJvdG90eXBlLmluaXRpYWxpc2UgPSBmdW5jdGlvbihwcm9jZXNzSWQsIGRhdGEpe1xuXHR2YXIgX3RoaXMgPSB0aGlzO1xuXHRyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG5cdFx0dHJ5IHtcblx0XHRcdHZhciBjb25maWdQcm9jZXNzID0gW107XG5cdFx0XHQvLyBDaGVjayB0aGUgcGFzc2VkIGluIHBhcmFtZXRlcnNcblx0XHRcdGlmIChwcm9jZXNzSWQgIT09ICcnICYmIHByb2Nlc3NJZCAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdC8vIEdldCB0aGUgY3VycmVudCBwcm9jZXNzIGNvbmZpZ1xuXHRcdFx0XHRjb25maWdQcm9jZXNzID0gX3RoaXMuY29uZmlnLnByb2Nlc3Nlcy5maWx0ZXIoZnVuY3Rpb24ob2JqUHJvY2Vzcyl7XG5cdFx0XHRcdFx0aWYgKG9ialByb2Nlc3MuX2lkID09PSBwcm9jZXNzSWQpIHtcblx0XHRcdFx0XHRcdHJldHVybiBvYmpQcm9jZXNzO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0XHRcdGlmIChjb25maWdQcm9jZXNzWzBdLl9pZCA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdFx0dmFyIGVycm9yID0gdXRpbC5lcnJvcignV0ZDb25maWdFcnJvcicsICdObyB2YWxpZCBwcm9jZXNzIGRlZmluaXRpb24gZm91bmQgd2l0aCBwcm9jZXNzIGlkOiAnICsgcHJvY2Vzc0lkKTtcblx0XHRcdFx0XHRyZWplY3QoZXJyb3IpO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRjb25maWdQcm9jZXNzLnB1c2goX3RoaXMuY29uZmlnLnByb2Nlc3Nlc1swXSk7XG5cdFx0XHRcdHByb2Nlc3NJZCA9IF90aGlzLmNvbmZpZy5wcm9jZXNzZXNbMF0uX2lkO1xuXHRcdFx0fVxuXHRcdFx0Ly8gR2V0IHRoZSBjdXJyZW50IGxpc3Qgb2YgcHJvY2VzcyBpbnN0YW5jZXNcblx0XHRcdC8vIHZhciBwcm9jZXNzU2VxID0gMTtcblx0XHRcdHZhciBjdXJyZW50UHJvY2VzcyA9IFtdO1xuXHRcdFx0X3RoaXMuaW5zdGFuY2UucHJvY2Vzc2VzLmZpbHRlcihmdW5jdGlvbihwcm9jZXNzSXRlbSl7XG5cdFx0XHRcdGlmIChwcm9jZXNzSXRlbS5pZCA9PT0gcHJvY2Vzc0lkKSB7XG5cdFx0XHRcdFx0Y3VycmVudFByb2Nlc3MucHVzaChwcm9jZXNzSXRlbSk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdFx0dmFyIHByb2Nlc3NTZXEgPSBjdXJyZW50UHJvY2Vzcy5sZW5ndGggKyAxO1xuXHRcdFx0Ly8gdmFyIG5leHRTZXEgPSBwcm9jZXNzU2VxICsgMTtcblx0XHRcdC8vIFB1c2ggdGhlIHByb2Nlc3Mgb2JqZWN0IGludG8gdGhlIGFycmF5XG5cdFx0XHR2YXIgcHJvY2Vzc01vZGVsID0ge1xuXHRcdFx0XHRpZDogJycsXG5cdFx0XHRcdHNlcTogJycsXG5cdFx0XHRcdHN1YlByb2Nlc3NlczogW11cblx0XHRcdH1cblx0XHRcdC8vIDEuIFVwZGF0ZSB0aGUgcHJvY2VzcyBpZCBhbmQgc2VxXG5cdFx0XHRwcm9jZXNzTW9kZWwuaWQgPSBwcm9jZXNzSWQ7XG5cdFx0XHRwcm9jZXNzTW9kZWwuc2VxID0gcHJvY2Vzc1NlcTtcblx0XHRcdF90aGlzLmluc3RhbmNlLnByb2Nlc3Nlcy5wdXNoKHByb2Nlc3NNb2RlbCk7XG5cdFx0XHQvLyBQYXJhbWV0ZXJzXG5cdFx0XHR2YXIgc3ViUHJvY2Vzc0lkID0gY29uZmlnUHJvY2Vzc1swXS5zdWJQcm9jZXNzZXNbMF0uX2lkO1xuXHRcdFx0dmFyIHN1YlByb2Nlc3NTZXEgPSAxO1xuXHRcdFx0X3RoaXMuaW5zdGFuY2UucHJvY2Vzc2VzLmZpbHRlcihmdW5jdGlvbihwcm9jZXNzSXRlbSl7XG5cdFx0XHRcdGlmIChwcm9jZXNzSXRlbS5pZCA9PT0gcHJvY2Vzc0lkICYmIHByb2Nlc3NJdGVtLnNlcSA9PT0gcHJvY2Vzc1NlcSkge1xuXHRcdFx0XHRcdHN1YlByb2Nlc3NTZXEgPSBwcm9jZXNzSXRlbS5zdWJQcm9jZXNzZXMubGVuZ3RoICsgMVxuXHRcdFx0XHR9XG5cdFx0XHR9KVxuXHRcdFx0Ly8gQ2FsbCB0aGUgc3VicHJvY2VzcyBtZXRob2Rcblx0XHRcdFByb2Nlc3Muc3ViUHJvY2Vzcyhwcm9jZXNzSWQsIHByb2Nlc3NTZXEsIHN1YlByb2Nlc3NJZCwgc3ViUHJvY2Vzc1NlcSwgZGF0YSwgX3RoaXMpLnRoZW4oZnVuY3Rpb24oc3ViUHJvY2Vzcyl7XG5cdFx0XHRcdC8vIEdlbmVyYXRlIHRoZSB1dWlkXG5cdFx0XHRcdHZhciB1dWlkID0gX3RoaXMucHJvZmlsZSArICc6JyArIF90aGlzLmFwcCArICc6JyArIHByb2Nlc3NJZCArICc6JyArIHByb2Nlc3NTZXEgKyAnOicgKyBzdWJQcm9jZXNzSWQgKyAnOicgKyBzdWJQcm9jZXNzU2VxO1xuXHRcdFx0XHQvLyBCdWlsZCB0aGUgc3ViLXByb2Nlc3MgcmVmZXJlbmNlIG9iamVjdFxuXHRcdFx0XHR2YXIgc3ViUHJvY2Vzc1JlZiA9IHtcblx0XHRcdFx0XHRpZDogc3ViUHJvY2Vzc0lkLFxuXHRcdFx0XHRcdHNlcTogc3ViUHJvY2Vzc1NlcSxcblx0XHRcdFx0XHR1dWlkOiB1dWlkXG5cdFx0XHRcdH1cblx0XHRcdFx0Ly8gQWRkIHRoZSByZWZlcmVuY2UgdG8gdGhlIHByb2Nlc3MgbW9kZWxcblx0XHRcdFx0cHJvY2Vzc01vZGVsLnN1YlByb2Nlc3Nlcy5wdXNoKHN1YlByb2Nlc3NSZWYpO1xuXHRcdFx0XHQvLyBBZGQgdGhlIHN1YlByb2Nlc3MgbW9kZWwgdG8gdGhlIHN1YnByb2Nlc3NlcyBhcnJheVxuXHRcdFx0XHRfdGhpcy5zdWJwcm9jZXNzZXMucHVzaChzdWJQcm9jZXNzLmRhdGEpO1xuXHRcdFx0XHQvLyBfdGhpcy5pbnN0YW5jZS5wcm9jZXNzZXMucHVzaChwcm9jZXNzTW9kZWwpO1xuXHRcdFx0XHRmb3IgKHZhciBpbmRleCA9IDA7IGluZGV4IDwgX3RoaXMuaW5zdGFuY2UucHJvY2Vzc2VzLmxlbmd0aDsgaW5kZXgrKyl7XG5cdFx0XHRcdFx0dmFyIHByb2Nlc3NJdGVtID0gX3RoaXMuaW5zdGFuY2UucHJvY2Vzc2VzW2luZGV4XTtcblx0XHRcdFx0XHRpZiAocHJvY2Vzc0l0ZW0uaWQgPT09IHByb2Nlc3NJZCAmJiBwcm9jZXNzSXRlbS5zZXEgPT09IHByb2Nlc3NTZXEpIHtcblx0XHRcdFx0XHRcdC8vIFJlbW92ZSB0aGUgY3VycmVudCBwcm9jZXNzIGZyb20gdGhlIGFycmF5IGFuZCBhZGQgdGhlIHVwZGF0ZWQgcHJvY2Vzc01vZGVsXG5cdFx0XHRcdFx0XHRfdGhpcy5pbnN0YW5jZS5wcm9jZXNzZXMuc3BsaWNlKGluZGV4LCAxLCBwcm9jZXNzTW9kZWwpXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdC8vIFByb2Nlc3MgdGhlIGluZGljYXRvciBkb2N1bWVudHMgd29ya2Zsb3cgcHJvY2Vzc2VzIHVwZGF0ZXNcblx0XHRcdFx0dmFyIGluZGljYXRvcnMgPSBzdWJQcm9jZXNzLmRhdGEuaW5kaWNhdG9ycztcblx0XHRcdFx0dmFyIHN0ZXAgPSBzdWJQcm9jZXNzLmRhdGEuc3RlcDtcblx0XHRcdFx0UHJvY2Vzcy5pbmRpY2F0b3JEb2NzKHByb2Nlc3NJZCwgaW5kaWNhdG9ycywgc3RlcCwgX3RoaXMpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KXtcblx0XHRcdFx0XHR2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnUHJvY2VzczogJyArIF90aGlzLmNvbmZpZy5wcm9jZXNzZXNbMF0uX2lkICsgJyBpbml0aWFsaXplZCBzdWNjZXNzZnVsbHkuJywgX3RoaXMpO1xuXHRcdFx0XHRcdHJlc29sdmUoc3VjY2Vzcyk7XG5cdFx0XHRcdH0sIGZ1bmN0aW9uKGVycil7XG5cdFx0XHRcdFx0cmVqZWN0KGVycik7XG5cdFx0XHRcdH0pXG5cdFx0XHR9LCBmdW5jdGlvbihlcnIpe1xuXHRcdFx0XHRyZWplY3QoZXJyKTtcblx0XHRcdH0pO1xuXHRcdH0gY2F0Y2goZXJyKSB7XG5cdFx0XHRyZWplY3QoZXJyKTtcblx0XHR9XG5cdH0pO1xufTtcblxuLyoqXG4gKiBXb3JrZmxvdyB0cmFuc2l0aW9uIHRvIHRoZSBuZXh0IHN0ZXAuIFRoaXMgbW92ZXMgdGhlIHdvcmtmbG93IGZyb20gdGhlIGN1cnJlbnQgcHJvY2VzcyxcbiAqIHN1Yi1wcm9jZXNzIHN0ZXAgdG8gdGhlIG5leHQgb25lIGFzIHNwZWNpZmllZC5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gcHJvY2Vzc0lkIC0gdGhlIFdvcmtmbG93IGNvbmZpZyAvIGRlZmluaXRpb24gcHJvY2VzcyBpZFxuICogQHBhcmFtIHtudW1iZXJ9IHByb2Nlc3NTZXEgLSB0aGUgV29ya2Zsb3cgaW5zdGFuY2UgcHJvY2VzcyBzZXFcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdWJQcm9jZXNzSWQgLSB0aGUgV29ya2Zsb3cgY29uZmlnIC8gZGVmaW5pdGlvbiBzdWItcHJvY2VzcyBpZFxuICogQHBhcmFtIHtudW1iZXJ9IHN1YlByb2Nlc3NTZXEgLSB0aGUgV29ya2Zsb3cgaW5zdGFuY2Ugc3ViLXByb2Nlc3Mgc2VxXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RlcElkIC0gdGhlIFdvcmtmbG93IGNvbmZpZyAvIGRlZmluaXRpb24gc3RlcCBpZFxuICogQHBhcmFtIHtzdHJpbmd9IHRyYW5zaXRpb25JZCAtIHRoZSBXb3JrZmxvdyBjb25maWcgLyBkZWZpbml0aW9uIHRyYW5zaXRpb24gaWRcbiAqIEBwYXJhbSB7b2JqZWN0fSBkYXRhIC0gYW55IGFkZGl0aW9uYWwgZGF0YSBwYXNzZWQgaW4gYXMga2V5IHZhbHVlIHBhaXJzXG4gKlxuICogQGV4YW1wbGVcbiAqIFdvcmtmbG93LnRyYW5zaXRpb24oJ3Byb2Nlc3NJZCcsIDEsICdzdWJQcm9jZXNzSWQnLCAxLCAnc3RlcElkJywgJ3RyYW5zaXRpb25JZCcsIHsga2V5OiAnJywgdmFsdWU6ICcnIH0pO1xuICpcbiAqIEByZXR1cm4gXCJcIlxuICpcbiAqL1xuV29ya2Zsb3cucHJvdG90eXBlLnRyYW5zaXRpb24gPSBmdW5jdGlvbihwcm9jZXNzSWQsIHByb2Nlc3NTZXEsIHN1YlByb2Nlc3NJZCwgc3ViUHJvY2Vzc1NlcSwgc3RlcElkLCB0cmFuc2l0aW9uSWQsIGRhdGEpe1xuXHQvLyBSZS1hc3NpZ24gdGhpc1xuXHR2YXIgX3RoaXMgPSB0aGlzO1xuXHRyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG5cdFx0dHJ5IHtcblx0XHRcdFByb2Nlc3MudHJhbnNpdGlvbihwcm9jZXNzSWQsIHByb2Nlc3NTZXEsIHN1YlByb2Nlc3NJZCwgc3ViUHJvY2Vzc1NlcSwgc3RlcElkLCB0cmFuc2l0aW9uSWQsIGRhdGEsIF90aGlzKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCl7XG5cdFx0XHRcdC8vIFVwZGF0ZSB0aGUgY3VycmVudCBzdWItcHJvY2VzcyBzdGVwIGRhdGFcblx0XHRcdFx0dmFyIHVwZGF0ZSA9IGZ1bmN0aW9uKHR5cGUpe1xuXHRcdFx0XHRcdF90aGlzLmluc3RhbmNlLnByb2Nlc3Nlcy5maWx0ZXIoZnVuY3Rpb24ocHJvY2Vzc0l0ZW0pe1xuXHRcdFx0XHRcdFx0aWYgKHByb2Nlc3NJdGVtLmlkID09PSBwcm9jZXNzSWQgJiYgcHJvY2Vzc0l0ZW0uc2VxID09PSBwcm9jZXNzU2VxKSB7XG5cdFx0XHRcdFx0XHRcdHByb2Nlc3NJdGVtLnN1YlByb2Nlc3Nlcy5maWx0ZXIoZnVuY3Rpb24oc3ViUHJvY2Vzc0l0ZW0pe1xuXHRcdFx0XHRcdFx0XHRcdGlmIChzdWJQcm9jZXNzSXRlbS5pZCA9PT0gc3ViUHJvY2Vzc0lkICYmIHN1YlByb2Nlc3NJdGVtLnNlcSA9PT0gc3ViUHJvY2Vzc1NlcSkge1xuXHRcdFx0XHRcdFx0XHRcdFx0X3RoaXMuc3VicHJvY2Vzc2VzLmZpbHRlcihmdW5jdGlvbihzdWJQcm9jZXNzT2JqKXtcblx0XHRcdFx0XHRcdFx0XHRcdFx0aWYgKHN1YlByb2Nlc3NPYmouX2lkID09PSBzdWJQcm9jZXNzSXRlbS51dWlkKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0aWYgKHR5cGUgPT09ICdzdGVwJykge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0c3ViUHJvY2Vzc09iai5zdGVwID0gcmVzdWx0LmRhdGE7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcyhyZXN1bHQubWVzc2FnZSwgc3ViUHJvY2Vzc09iaik7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRyZXNvbHZlKHN1Y2Nlc3MpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdH0gZWxzZSBpZiAodHlwZSA9PT0gJ3N0ZXBDb21wbGV0ZScpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHN1YlByb2Nlc3NPYmouc3RlcCA9IHJlc3VsdC5kYXRhLnN0ZXA7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRzdWJQcm9jZXNzT2JqLmNvbXBsZXRlID0gdHJ1ZVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0dmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MocmVzdWx0Lm1lc3NhZ2UsIHN1YlByb2Nlc3NPYmopO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0cmVzb2x2ZShzdWNjZXNzKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdH0pXG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9KVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0pXG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKHJlc3VsdC5kYXRhLnN1YlByb2Nlc3NDb21wbGV0ZSkge1xuXHRcdFx0XHRcdHVwZGF0ZSgnc3RlcENvbXBsZXRlJyk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dXBkYXRlKCdzdGVwJyk7XG5cdFx0XHRcdH1cblx0XHRcdH0sIGZ1bmN0aW9uKGVycil7XG5cdFx0XHRcdHJlamVjdChlcnIpO1xuXHRcdFx0fSk7XG5cdFx0fSBjYXRjaChlcnIpIHtcblx0XHRcdHJlamVjdChlcnIpO1xuXHRcdH1cblx0fSk7XG59O1xuXG4vKipcbiAqIFdvcmtmbG93IGFzc2lnbiB1c2VyLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBwcm9jZXNzSWQgLSB0aGUgV29ya2Zsb3cgY29uZmlnIC8gZGVmaW5pdGlvbiBwcm9jZXNzIGlkXG4gKiBAcGFyYW0ge251bWJlcn0gcHJvY2Vzc1NlcSAtIHRoZSBXb3JrZmxvdyBpbnN0YW5jZSBwcm9jZXNzIHNlcVxuICogQHBhcmFtIHtzdHJpbmd9IHN1YlByb2Nlc3NJZCAtIHRoZSBXb3JrZmxvdyBjb25maWcgLyBkZWZpbml0aW9uIHN1Yi1wcm9jZXNzIGlkXG4gKiBAcGFyYW0ge251bWJlcn0gc3ViUHJvY2Vzc1NlcSAtIHRoZSBXb3JrZmxvdyBpbnN0YW5jZSBzdWItcHJvY2VzcyBzZXFcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdGVwSWQgLSB0aGUgV29ya2Zsb3cgY29uZmlnIC8gZGVmaW5pdGlvbiBzdGVwIGlkXG4gKiBAcGFyYW0ge29iamVjdH0gdXNlciAtIHRoZSB1c2VyIGlkIGFuZCBuYW1lIGRhdGFcbiAqXG4gKiBAZXhhbXBsZSBcIlwiXG4gKlxuICogQHJldHVybiBcIlwiXG4gKlxuICovXG5Xb3JrZmxvdy5wcm90b3R5cGUuYXNzaWduVXNlciA9IGZ1bmN0aW9uKHByb2Nlc3NJZCwgcHJvY2Vzc1NlcSwgc3ViUHJvY2Vzc0lkLCBzdWJQcm9jZXNzU2VxLCB1c2VyKXtcblx0Ly8gUmUtYXNzaWduIHRoZSBXb3JrZmxvdyBjb25zdHJ1Y3RvciBpbnN0YW5jZSBhcyBfdGhpc1xuXHR2YXIgX3RoaXMgPSB0aGlzO1xuXHRyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG5cdFx0dHJ5IHtcblx0XHRcdFByb2Nlc3MuYXNzaWduVXNlcihwcm9jZXNzSWQsIHByb2Nlc3NTZXEsIHN1YlByb2Nlc3NJZCwgc3ViUHJvY2Vzc1NlcSwgdXNlciwgX3RoaXMpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KXtcblx0XHRcdFx0cmVzb2x2ZShyZXN1bHQpO1xuXHRcdFx0fSwgZnVuY3Rpb24oZXJyKXtcblx0XHRcdFx0cmVqZWN0KGVycik7XG5cdFx0XHR9KVxuXHRcdH0gY2F0Y2goZXJyKSB7XG5cdFx0XHRyZWplY3QoZXJyKTtcblx0XHR9XG5cdH0pXG59O1xuXG4vKipcbiAqIFdvcmtmbG93IHRhc2ssIHRoaXMgbWV0aG9kIGV4ZWN1dGVzIGEgc3BlY2lmaWMgdGFzay5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gcHJvY2Vzc0lkIC0gdGhlIHByb2Nlc3MgaWQgdG8gcHJvY2Vzc1xuICogQHBhcmFtIHtvYmplY3R9IGlucHV0RGF0YSAtIHRoZSBpbnB1dCBkYXRhIHRvIHByb2Nlc3NcbiAqXG4gKiBAZXhhbXBsZVxuICogV29ya2Zsb3cuaW5pdGlhbGl6ZSgncHJvY2Vzc0lkJywgeyB2YWxpZERhdGU6ICdkYXRlJyB9KTtcbiAqXG4gKiBAcmV0dXJuIFwiXCJcbiAqXG4gKi9cbldvcmtmbG93LnByb3RvdHlwZS51aSA9IGZ1bmN0aW9uKCl7XG5cdC8vIFJlLWFzc2lnbiB0aGUgV29ya2Zsb3cgY29uc3RydWN0b3IgaW5zdGFuY2UgYXMgX3RoaXNcblx0dmFyIF90aGlzID0gdGhpcztcblx0cmV0dXJuIHtcblx0XHRnZXRQcm9jZXNzOiBmdW5jdGlvbihwcm9jZXNzSWQsIGxhbmcpe1xuXHRcdFx0cmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuXHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdHVzZXJJbnRlcmZhY2UuZ2V0UHJvY2Vzcyhwcm9jZXNzSWQsIGxhbmcsIF90aGlzKS50aGVuKGZ1bmN0aW9uKG1vZGVsKXtcblx0XHRcdFx0XHRcdHJlc29sdmUobW9kZWwpO1xuXHRcdFx0XHRcdH0sIGZ1bmN0aW9uKGVycil7XG5cdFx0XHRcdFx0XHRyZWplY3QoZXJyKTtcblx0XHRcdFx0XHR9KVxuXHRcdFx0XHR9IGNhdGNoKGVycikge1xuXHRcdFx0XHRcdHJlamVjdChlcnIpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KVxuXHRcdH1cblx0fVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBXb3JrZmxvdztcbiIsIid1c2Ugc3RyaWN0JztcblxuLy8gdmFyIEdLID0gcmVxdWlyZSgnLi9nYXRla2VlcGVyJyk7XG52YXIgdXRpbCA9IHJlcXVpcmUoJ3V0aWxpdHknKTtcbi8vIHZhciB1dWlkID0gcmVxdWlyZSgnbm9kZS11dWlkJyk7XG5cbi8vIHZhciBnYXRla2VlcGVyID0gbmV3IEdLKCk7XG5cbi8qKlxuICogRm9ybSBNb2R1bGVcbiAqXG4gKiBAbW9kdWxlIGxpYi9mb3JtXG4gKiBAYXV0aG9yIEJyZW50IEdvcmRvblxuICogQHZlcnNpb24gMi4wLjBcbiAqIEBkZXNjcmlwdGlvbiB0ZXN0IGRlc2NyaXB0aW9uXG4gKiBAY29weXJpZ2h0IEt3YW50dSBMdGQgUlNBIDIwMDktMjAxNS5cbiAqXG4gKi9cblxuZnVuY3Rpb24gY3JlYXRlKGFyZ3Mpe1xuXHR2YXIgcHJvY2Vzc0lkID0gYXJnc1swXSB8fCAnJztcblx0Ly8gY29uc29sZS5sb2cocHJvY2Vzc0lkKTtcblx0dmFyIHN1YlByb2Nlc3MgPSBhcmdzWzFdIHx8IHt9O1xuXHQvLyBjb25zb2xlLmxvZyhzdWJQcm9jZXNzKTtcblx0dmFyIGluZGljYXRvcnMgPSBzdWJQcm9jZXNzLmluZGljYXRvcnMgfHwgW107XG5cdC8vIGNvbnNvbGUubG9nKGluZGljYXRvcnMpO1xuXHR2YXIgX1dGSW5zdGFuY2UgPSBhcmdzWzNdIHx8IHt9O1xuXHQvLyBjb25zb2xlLmxvZyhfV0ZJbnN0YW5jZSk7XG5cdHZhciBzdGVwID0gYXJnc1syXSB8fCB7fTtcblx0Ly8gdmFyIGRhdGEgPSBhcmdzWzNdIHx8IHt9O1xuXHQvLyBjb25zb2xlLmxvZyhzdGVwKTtcblx0dmFyIHJlc3VsdCA9IFtdO1xuXHQvLyBjb25zb2xlLmxvZyhzdWJQcm9jZXNzKTtcblx0cmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuXHRcdHV0aWwuc3luY0xvb3AoaW5kaWNhdG9ycy5sZW5ndGgsIGZ1bmN0aW9uKGxvb3Ape1xuXHRcdFx0dmFyIGNvdW50ZXIgPSBsb29wLml0ZXJhdGlvbigpO1xuXHRcdFx0dmFyIGluZGljYXRvcklkID0gaW5kaWNhdG9yc1tjb3VudGVyXS5faWQ7XG5cdFx0XHR2YXIgaW5kaWNhdG9yTmFtZSA9IHV0aWwuZ2V0TmFtZShpbmRpY2F0b3JzW2NvdW50ZXJdLm5hbWUsICdlbicpO1xuXHRcdFx0dmFyIGlkID0gX1dGSW5zdGFuY2UucHJvZmlsZSArICc6JyArIF9XRkluc3RhbmNlLmFwcCArICc6JyArIGluZGljYXRvcklkICsgJzowJztcblxuXHRcdFx0Ly8gVE9ETzogUmVwbGFjZSB3aXRoIHRoZSBnYXRla2VlcGVyIHByb21pc2UgY2FsbCwgcmV0dXJuIHRoZSBvYmplY3QsIHVwZGF0ZSB0aGUgaW5kaWNhdG9yXG5cdFx0XHQvLyBkb2N1bWVudCB3b3JrZmxvdyBwcm9jZXNzZXMgZGF0YSBhbmQgdXBkYXRlIHRoZSB3b3JrZmxvdyBjbGFzcyBpbmRpY2F0b3JzIGFycmF5LlxuXG5cdFx0XHQvLyBnYXRla2VlcGVyLmluc3RhbnRpYXRlKGlkLCAnbmV3SW5zdGFuY2UnLCBpbmRpY2F0b3JJZCwgX1dGSW5zdGFuY2UucHJvZmlsZSwgZGF0YS52YWxpZERhdGUpLnRoZW4oZnVuY3Rpb24oZG9jKXtcblx0XHRcdC8vXHQvLyBVcGRhdGUgdGhlIGluZGljYXRvciB3b3JrZmxvdyBwcm9jZXNzZXMgc2VjdGlvblxuXHRcdFx0Ly9cdHZhciB3b3JrZmxvd3MgPSBkb2Mud29ya2Zsb3dzO1xuXHRcdFx0Ly9cdHdvcmtmbG93cy5pZCA9IF9XRkluc3RhbmNlLmNvbmZpZy5faWQ7XG5cdFx0XHQvL1x0d29ya2Zsb3dzLmluc3RhbmNlID0gX1dGSW5zdGFuY2UuaW5zdGFuY2UuX2lkO1xuXHRcdFx0Ly9cdF9XRkluc3RhbmNlLmluZGljYXRvcnMucHVzaChkb2MpO1xuXHRcdFx0Ly9cdGxvb3AubmV4dCgpO1xuXHRcdFx0Ly8gfSwgZnVuY3Rpb24oZXJyKXtcblx0XHRcdC8vXHRyZWplY3QoZXJyKTtcblx0XHRcdC8vIH0pXG5cblx0XHRcdC8vIFRoaXMgc2hvdWxkIGJlIHRoZSBkYXRhIHJldHVybmVkIGZyb20gdGhlIGdhdGVrZWVwZXIgY2FsbC5cblx0XHRcdHZhciBkb2MgPSB7XG5cdFx0XHRcdFwiX2lkXCI6IGlkLFxuXHRcdFx0XHRcInRpdGxlXCI6IGluZGljYXRvck5hbWUsXG5cdFx0XHRcdFwiY2F0ZWdvcnlcIjoge1xuXHRcdFx0XHRcdFwidGVybVwiOiBpbmRpY2F0b3JJZCxcblx0XHRcdFx0XHRcImxhYmVsXCI6IGluZGljYXRvck5hbWVcblx0XHRcdFx0fSxcblx0XHRcdFx0XCJ3b3JrZmxvd3NcIjogW3tcblx0ICAgICAgICBcImlkXCI6IF9XRkluc3RhbmNlLmNvbmZpZy5faWQsXG5cdCAgICAgICAgXCJpbnN0YW5jZVwiOiBfV0ZJbnN0YW5jZS5pbnN0YW5jZS5faWQsXG5cdCAgICAgICAgXCJwcm9jZXNzZXNcIjogW3tcbiAgICAgICAgICAgIFwiaWRcIjogcHJvY2Vzc0lkLFxuICAgICAgICAgICAgXCJzdWJQcm9jZXNzSWRcIjogc3ViUHJvY2Vzcy5faWQsXG4gICAgICAgICAgICBcInN0ZXBcIjoge1xuICAgICAgICAgICAgICBcImlkXCI6IHN0ZXAuaWQsXG4gICAgICAgICAgICAgIFwic2VxXCI6IHN0ZXAuc2VxLFxuICAgICAgICAgICAgICBcInN0YXJ0RGF0ZVwiOiBcIlwiLFxuICAgICAgICAgICAgICBcInN0YXR1c1wiOiBzdGVwLnN0YXR1cyxcbiAgICAgICAgICAgICAgXCJtZXNzYWdlXCI6IHN0ZXAubWVzc2FnZSxcbiAgICAgICAgICAgICAgXCJhc3NpZ25lZFRvXCI6IHtcbiAgICAgICAgICAgICAgICBcInVzZXJJZFwiOiBzdGVwLmFzc2lnbmVkVG8udXNlcklkLFxuICAgICAgICAgICAgICAgIFwibmFtZVwiOiBzdGVwLmFzc2lnbmVkVG8ubmFtZVxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBcImNvbW1lbnRcIjogc3RlcC5jb21tZW50LFxuICAgICAgICAgICAgICBcImNvbXBsZXRlXCI6IGZhbHNlLFxuICAgICAgICAgICAgICBcImVuZERhdGVcIjogXCJcIlxuICAgICAgICAgICAgfVxuXHQgICAgICAgIH1dXG5cdFx0ICAgIH1dXG5cdFx0XHR9O1xuXG5cdFx0XHQvLyBVcGRhdGUgdGhlIGluZGljYXRvcnMgcHJvcGVydHkgYXJyYXlcblx0XHRcdGlmIChfV0ZJbnN0YW5jZS5pbmRpY2F0b3JzLmxlbmd0aCA9PT0gMCkge1xuXHRcdFx0XHRfV0ZJbnN0YW5jZS5pbmRpY2F0b3JzLnB1c2goZG9jKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGZvciAodmFyIGluZGV4ID0gMDsgaW5kZXggPCBfV0ZJbnN0YW5jZS5pbmRpY2F0b3JzLmxlbmd0aDsgaW5kZXgrKyl7XG5cdFx0XHRcdFx0dmFyIGluZGljYXRvciA9IF9XRkluc3RhbmNlLmluZGljYXRvcnNbaW5kZXhdO1xuXHRcdFx0XHRcdGlmIChpbmRpY2F0b3IuX2lkID09PSBpZCkge1xuXHRcdFx0XHRcdFx0Ly8gUmVtb3ZlIHRoZSBjdXJyZW50IGl0ZW0gZnJvbSB0aGUgYXJyYXkgYW5kIGFkZCB0aGUgdXBkYXRlZCBwcm9jZXNzTW9kZWxcblx0XHRcdFx0XHRcdF9XRkluc3RhbmNlLmluZGljYXRvcnMuc3BsaWNlKGluZGV4LCAxKTtcblx0XHRcdFx0XHRcdF9XRkluc3RhbmNlLmluZGljYXRvcnMucHVzaChkb2MpO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRfV0ZJbnN0YW5jZS5pbmRpY2F0b3JzLnB1c2goZG9jKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdC8vIEdvdCB0byB0aGUgbmV4dCBwcm9jZXNzIGl0ZW1cblx0XHRcdGxvb3AubmV4dCgpO1xuXHRcdH0sIGZ1bmN0aW9uKCl7XG5cdFx0XHQvLyBPbiBjb21wbGV0aW9uIG9mIGFsbCBwcm9jZXNzIGxvb3AgaXRlbXNcblx0ICAgIHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdGb3JtIGNyZWF0ZWQgc3VjY2Vzc2Z1bGx5LicsIF9XRkluc3RhbmNlLmluZGljYXRvcnMpO1xuXHRcdFx0cmVzb2x2ZShzdWNjZXNzKTtcblx0XHR9KTtcblx0XHQvLyB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnRm9ybSBpbmRpY2F0b3Igc2V0IHNhdmVkIHN1Y2Nlc3NmdWxseS4nLCByZXN1bHQpO1xuXHRcdC8vIHJlc29sdmUoc3VjY2Vzcyk7XG5cdH0pO1xufTtcblxuZnVuY3Rpb24gc2F2ZShpbmRpY2F0b3Ipe1xuXHR2YXIgY29tcGxldGVkID0gW107XG5cdHZhciByZXN1bHQgPSB7XG5cdFx0Y29tcGxldGU6IHRydWUsXG5cdFx0ZGF0YTogW11cblx0fTtcblx0cmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuXHRcdHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdGb3JtIGluZGljYXRvciBzZXQgc2F2ZWQgc3VjY2Vzc2Z1bGx5LicsIHJlc3VsdCk7XG5cdFx0cmVzb2x2ZShzdWNjZXNzKTtcblx0fSk7XG59O1xuXG5mdW5jdGlvbiBzdWJtaXQoZm9ybSl7XG5cdHZhciBjb21wbGV0ZWQgPSBbXTtcblx0dmFyIHJlc3VsdCA9IHtcblx0XHRjb21wbGV0ZTogdHJ1ZSxcblx0XHRkYXRhOiBbXVxuXHR9O1xuXHRyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG5cdFx0dmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ0Zvcm0gc3VibWl0dGVkIHN1Y2Nlc3NmdWxseS4nLCByZXN1bHQpO1xuXHRcdHJlc29sdmUoc3VjY2Vzcyk7XG5cdH0pO1xufTtcblxuZnVuY3Rpb24gYXV0aG9yaXNlKGZvcm0pe1xuXHR2YXIgY29tcGxldGVkID0gW107XG5cdHZhciByZXN1bHQgPSB7XG5cdFx0Y29tcGxldGU6IHRydWUsXG5cdFx0ZGF0YTogW11cblx0fTtcblx0cmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuXG5cdFx0dmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ0Zvcm0gYXV0aG9yaXNlZCBzdWNjZXNzZnVsbHkuJywgcmVzdWx0KTtcblx0XHRyZXNvbHZlKHN1Y2Nlc3MpO1xuXHR9KTtcbn07XG5cbmZ1bmN0aW9uIGNsb3NlKGZvcm0pe1xuXHR2YXIgY29tcGxldGVkID0gW107XG5cdHZhciByZXN1bHQgPSB7XG5cdFx0Y29tcGxldGU6IHRydWUsXG5cdFx0ZGF0YTogW11cblx0fTtcblx0cmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuXHRcdHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdGb3JtIGNsb3NlZCBzdWNjZXNzZnVsbHkuJywgcmVzdWx0KTtcblx0XHRyZXNvbHZlKHN1Y2Nlc3MpO1xuXHR9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuXG4gXHRjcmVhdGU6IGNyZWF0ZSxcbiBcdHNhdmU6IHNhdmUsXG4gXHRzdWJtaXQ6IHN1Ym1pdCxcbiBcdGF1dGhvcmlzZTogYXV0aG9yaXNlLFxuIFx0Y2xvc2U6IGNsb3NlXG5cbn1cbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWwgPSByZXF1aXJlKCd1dGlsaXR5Jyk7XG5cbi8qKlxuICogVXNlciBJbnRlcmZhY2UgTW9kdWxlXG4gKlxuICogQG1vZHVsZSBsaWIvdWlcbiAqIEBhdXRob3IgQnJlbnQgR29yZG9uXG4gKiBAdmVyc2lvbiAwLjEuMFxuICogQGRlc2NyaXB0aW9uIHRlc3QgZGVzY3JpcHRpb25cbiAqXG4gKi9cblxuIC8qKlxuICAqIEdldCBhbGwgcHJvY2VzcyBzdWItcHJvY2Vzc2VzIHVzZXIgaW50ZXJmYWNlIGRhdGFcbiAgKlxuICAqIEBwYXJhbSB7c3RyaW5nfSBwcm9jZXNzSWQgLSB0aGUgV29ya2Zsb3cgY29uZmlnIC8gZGVmaW5pdGlvbiBwcm9jZXNzIGlkXG4gICogQHBhcmFtIHtzdHJpbmd9IGxhbmcgLSB0aGUgdXNlciBwcmVmZmVyZWQgbGFuZ2F1Z2VcbiAgKiBAcGFyYW0ge29iamVjdH0gX1dGSW5zdGFuY2UgLSB0aGUgY3VycmVudCB3b3JrZmxvdyBjb25zdHJ1Y3RvciBpbnN0YW5jZVxuICAqXG4gICogQGV4YW1wbGUgJydcbiAgKlxuICAqIEByZXR1cm4gJydcbiAgKlxuICAqL1xuIGZ1bmN0aW9uIGdldFByb2Nlc3MocHJvY2Vzc0lkLCBsYW5nLCBfV0ZJbnN0YW5jZSl7XG4gIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICB0cnkge1xuICAgICAgdmFyIHByb2Nlc3NNb2RlbCA9IFtdO1xuICAgICAgdmFyIHByb2Nlc3NJbnN0YW5jZSA9IFtdO1xuICAgIFx0X1dGSW5zdGFuY2UuaW5zdGFuY2UucHJvY2Vzc2VzLmZpbHRlcihmdW5jdGlvbihwcm9jZXNzSXRlbSl7XG4gICAgXHRcdGlmIChwcm9jZXNzSXRlbS5pZCA9PT0gcHJvY2Vzc0lkKSB7XG4gICAgXHRcdFx0cHJvY2Vzc0luc3RhbmNlID0gcHJvY2Vzc0l0ZW07XG4gICAgXHRcdH1cbiAgICBcdH0pXG4gICAgICAvLyBjb25zb2xlLmxvZyhwcm9jZXNzSW5zdGFuY2Uuc3ViUHJvY2Vzc2VzLmxlbmd0aCk7XG4gICAgICB1dGlsLnN5bmNMb29wKHByb2Nlc3NJbnN0YW5jZS5zdWJQcm9jZXNzZXMubGVuZ3RoLCBmdW5jdGlvbihsb29wKXtcbiAgXHRcdFx0dmFyIGNvdW50ZXIgPSBsb29wLml0ZXJhdGlvbigpO1xuICAgICAgICB2YXIgcHJvY2Vzc1NlcSA9IHByb2Nlc3NJbnN0YW5jZS5zZXE7XG4gICAgICAgIHZhciBzdWJQcm9jZXNzSWQgPSBwcm9jZXNzSW5zdGFuY2Uuc3ViUHJvY2Vzc2VzW2NvdW50ZXJdLmlkO1xuICAgICAgICB2YXIgc3ViUHJvY2Vzc1NlcSA9IHByb2Nlc3NJbnN0YW5jZS5zdWJQcm9jZXNzZXNbY291bnRlcl0uc2VxO1xuICAgICAgICBnZXRTdWJQcm9jZXNzKHByb2Nlc3NJZCwgcHJvY2Vzc1NlcSwgc3ViUHJvY2Vzc0lkLCBzdWJQcm9jZXNzU2VxLCBsYW5nLCBfV0ZJbnN0YW5jZSkudGhlbihmdW5jdGlvbihtb2RlbCl7XG4gICAgICAgICAgLy8gY29uc29sZS5sb2cobW9kZWwpO1xuICAgICAgICAgIHByb2Nlc3NNb2RlbC5wdXNoKG1vZGVsKTtcbiAgICAgICAgICBsb29wLm5leHQoKTtcbiAgICAgICAgICAvLyBjb25zb2xlLmxvZyhwcm9jZXNzTW9kZWwpO1xuICBcdFx0XHR9LCBmdW5jdGlvbihlcnIpe1xuICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHByb2Nlc3NNb2RlbCk7XG4gIFx0XHRcdFx0bG9vcC5icmVhaygpO1xuICBcdFx0XHRcdHJlamVjdChlcnIpO1xuICBcdFx0XHR9KTtcbiAgXHRcdH0sIGZ1bmN0aW9uKCl7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHByb2Nlc3NNb2RlbCk7XG4gIFx0XHRcdHJlc29sdmUocHJvY2Vzc01vZGVsKTtcbiAgXHRcdH0pO1xuICAgIH0gY2F0Y2goZXJyKXtcbiAgICAgIHJlamVjdChlcnIpO1xuICAgIH1cbiAgfSlcbn07XG5cbiAvKipcbiAgKiBHZXQgU3ViUHJvY2VzcyB1c2VyIGludGVyZmFjZSBkYXRhXG4gICpcbiAgKiBAcGFyYW0ge3N0cmluZ30gcHJvY2Vzc0lkIC0gdGhlIFdvcmtmbG93IGNvbmZpZyAvIGRlZmluaXRpb24gcHJvY2VzcyBpZFxuICAqIEBwYXJhbSB7bnVtYmVyfSBwcm9jZXNzU2VxIC0gdGhlIFdvcmtmbG93IGluc3RhbmNlIHByb2Nlc3Mgc2VxXG4gICogQHBhcmFtIHtzdHJpbmd9IHN1YlByb2Nlc3NJZCAtIHRoZSBXb3JrZmxvdyBjb25maWcgLyBkZWZpbml0aW9uIHN1Yi1wcm9jZXNzIGlkXG4gICogQHBhcmFtIHtudW1iZXJ9IHN1YlByb2Nlc3NTZXEgLSB0aGUgV29ya2Zsb3cgaW5zdGFuY2Ugc3ViLXByb2Nlc3Mgc2VxXG4gICogQHBhcmFtIHtvYmplY3R9IF9XRkluc3RhbmNlIC0gdGhlIGN1cnJlbnQgd29ya2Zsb3cgY29uc3RydWN0b3IgaW5zdGFuY2VcbiAgKlxuICAqIEBleGFtcGxlICcnXG4gICpcbiAgKiBAcmV0dXJuICcnXG4gICpcbiAgKi9cbmZ1bmN0aW9uIGdldFN1YlByb2Nlc3MocHJvY2Vzc0lkLCBwcm9jZXNzU2VxLCBzdWJQcm9jZXNzSWQsIHN1YlByb2Nlc3NTZXEsIGxhbmcsIF9XRkluc3RhbmNlKXtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgIHRyeSB7XG4gICAgICB2YXIgbW9kZWwgPSB7XG4gICAgICAgIGlkOiAnJyxcbiAgICAgICAgc2VxOiAnJyxcbiAgICAgICAgbmFtZTogJycsXG4gICAgICAgIGhlbHA6ICcnLFxuICAgICAgICBkYXRlczogJycsXG4gICAgICAgIHN0ZXA6ICcnXG4gICAgICB9O1xuICAgICAgdmFyIHN1YlByb2Nlc3MgPSBbXTtcbiAgICBcdHZhciBzdWJQcm9jZXNzQ29uZiA9IFtdO1xuICAgIFx0X1dGSW5zdGFuY2UuaW5zdGFuY2UucHJvY2Vzc2VzLmZpbHRlcihmdW5jdGlvbihwcm9jZXNzSXRlbSl7XG4gICAgXHRcdGlmIChwcm9jZXNzSXRlbS5pZCA9PT0gcHJvY2Vzc0lkICYmIHByb2Nlc3NJdGVtLnNlcSA9PT0gcHJvY2Vzc1NlcSkge1xuICAgIFx0XHRcdHZhciBzcExlbmd0aCA9IHByb2Nlc3NJdGVtLnN1YlByb2Nlc3Nlcy5sZW5ndGg7XG4gICAgXHRcdFx0cHJvY2Vzc0l0ZW0uc3ViUHJvY2Vzc2VzLmZpbHRlcihmdW5jdGlvbihzdWJQcm9jZXNzSXRlbSl7XG4gICAgXHRcdFx0XHRpZiAoc3ViUHJvY2Vzc0l0ZW0uaWQgPT09IHN1YlByb2Nlc3NJZCAmJiBzdWJQcm9jZXNzSXRlbS5zZXEgPT09IHN1YlByb2Nlc3NTZXEgJiYgc3ViUHJvY2Vzc0l0ZW0uY29tcGxldGUgPT09IGZhbHNlKSB7XG4gICAgXHRcdFx0XHRcdHN1YlByb2Nlc3MgPSBzdWJQcm9jZXNzSXRlbTtcbiAgICBcdFx0XHRcdH1cbiAgICBcdFx0XHR9KVxuICAgIFx0XHR9XG4gICAgXHR9KVxuICAgIFx0Ly8gR2V0IHRoZSBjdXJyZW50IHN1YlByb2Nlc3MgY29uZmlndXJhdGlvblxuICAgIFx0X1dGSW5zdGFuY2UuY29uZmlnLnByb2Nlc3Nlcy5maWx0ZXIoZnVuY3Rpb24ocHJvY2Vzc0NvbmZpZyl7XG4gICAgXHRcdGlmIChwcm9jZXNzQ29uZmlnLl9pZCA9PT0gcHJvY2Vzc0lkKSB7XG4gICAgXHRcdFx0cHJvY2Vzc0NvbmZpZy5zdWJQcm9jZXNzZXMuZmlsdGVyKGZ1bmN0aW9uKHN1YlByb2Nlc3NDb25maWcpe1xuICAgIFx0XHRcdFx0aWYgKHN1YlByb2Nlc3NDb25maWcuX2lkID09PSBzdWJQcm9jZXNzSWQpIHtcbiAgICBcdFx0XHRcdFx0c3ViUHJvY2Vzc0NvbmYgPSBzdWJQcm9jZXNzQ29uZmlnO1xuICAgIFx0XHRcdFx0fVxuICAgIFx0XHRcdH0pXG4gICAgXHRcdH1cbiAgICBcdH0pXG4gICAgICAvLyBVcGRhdGUgdGhlIG1vZGVsXG4gICAgICBtb2RlbC5pZCA9IHN1YlByb2Nlc3NDb25mLl9pZDtcbiAgICAgIG1vZGVsLnNlcSA9IHN1YlByb2Nlc3Muc2VxO1xuICAgICAgbW9kZWwubmFtZSA9IHV0aWwuZ2V0TmFtZShzdWJQcm9jZXNzQ29uZi5uYW1lLCBsYW5nKTtcbiAgICAgIG1vZGVsLmhlbHAgPSB1dGlsLmdldE5hbWUoc3ViUHJvY2Vzc0NvbmYuaGVscCwgbGFuZyk7XG4gICAgICBtb2RlbC5kYXRlcyA9IHN1YlByb2Nlc3MuZGF0ZXM7XG4gICAgICBtb2RlbC5zdGVwID0gc3ViUHJvY2Vzcy5zdGVwO1xuICAgICAgcmVzb2x2ZShtb2RlbCk7XG4gICAgfSBjYXRjaChlcnIpIHtcbiAgICAgIHJlamVjdChlcnIpO1xuICAgIH1cbiAgfSlcbn07XG5cbiBtb2R1bGUuZXhwb3J0cyA9IHtcblxuICBnZXRQcm9jZXNzOiBnZXRQcm9jZXNzXG5cbiB9XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlsID0gcmVxdWlyZSgndXRpbGl0eScpO1xudmFyIGZvcm0gPSByZXF1aXJlKCcuL2Zvcm0nKTtcblxuLyoqXG4gKiBQcm9jZXNzIE1vZHVsZVxuICpcbiAqIEBtb2R1bGUgbGliL3Byb2Nlc3NcbiAqIEBhdXRob3IgQnJlbnQgR29yZG9uXG4gKiBAdmVyc2lvbiAwLjEuMFxuICogQGRlc2NyaXB0aW9uIHRlc3QgZGVzY3JpcHRpb25cbiAqXG4gKi9cblxuIC8qKlxuICAqIENvdW50IGFuIGFycmF5IG9mIGl0ZW1zXG4gICpcbiAgKiBAcGFyYW0ge0FycmF5fSBhcnIgLSB0aGUgYXJyYXkgZGF0YVxuICAqXG4gICogQGV4YW1wbGUgJydcbiAgKlxuICAqIEByZXR1cm4gJydcbiAgKlxuICAqL1xuIGZ1bmN0aW9uIGNvdW50KGFycil7XG4gICBpZiAoYXJyICE9PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gYXJyLmxlbmd0aDtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gMDtcbiAgfVxuXG4gfTtcblxuLyoqXG4gKiBQcm9jZXNzIHByZS1yZXF1aXNpdGVzXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IHByZXJlcXVpc2l0ZXMgLSB0aGUgcHJlLXJlcXVpc2l0ZXMgY29uZmlnIGRhdGFcbiAqXG4gKiBAZXhhbXBsZSAnJ1xuICpcbiAqIEByZXR1cm4gJydcbiAqXG4gKi9cbmZ1bmN0aW9uIHByZVJlcXVpc2l0ZXMocHJlcmVxdWlzaXRlcywgX1dGSW5zdGFuY2UpIHtcblx0cmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuXHRcdC8vIFVuY29tbWVudCBiZWxvdyBzZWN0aW9uIHdoZW4gcmVhZHkgdG8gaW1wbGVtZW50XG5cdFx0dmFyIGNvbXBsZXRlZCA9IFtdO1xuXHRcdHRyeSB7XG5cdFx0XHR1dGlsLnN5bmNMb29wKHByZXJlcXVpc2l0ZXMubGVuZ3RoLCBmdW5jdGlvbihsb29wKXtcblx0XHRcdFx0dmFyIGNvdW50ZXIgPSBsb29wLml0ZXJhdGlvbigpO1xuXHRcdFx0XHRwcmVSZXF1aXNpdGUocHJlcmVxdWlzaXRlc1tjb3VudGVyXSwgX1dGSW5zdGFuY2UpLnRoZW4oZnVuY3Rpb24oZGF0YSl7XG5cdFx0XHRcdFx0Ly8gQ2hlY2sgaWYgYWxsIHByZS1yZXF1aXNpdGVzIGNvbXBsZXRlZCBzdWNjZXNzZnVsbHkuXG5cdFx0XHRcdFx0Y29tcGxldGVkLnB1c2godHJ1ZSk7XG5cdFx0XHRcdFx0bG9vcC5uZXh0KCk7XG5cdFx0XHRcdH0sIGZ1bmN0aW9uKGVycil7XG5cdFx0XHRcdFx0Y29tcGxldGVkLnB1c2goZmFsc2UpO1xuXHRcdFx0XHRcdGxvb3AuYnJlYWsoKTtcblx0XHRcdFx0XHRyZWplY3QoZXJyKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9LCBmdW5jdGlvbigpe1xuXHRcdFx0XHRpZiAoY29tcGxldGVkLmV2ZXJ5KEJvb2xlYW4pKSB7XG5cdFx0XHRcdFx0dmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ1ByZS1yZXF1aXNpdGVzIGNvbXBsZXRlZCBzdWNjZXNzZnVsbHkuJywge30pO1xuXHRcdFx0XHRcdHJlc29sdmUoc3VjY2Vzcyk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dmFyIGVycm9yID0gdXRpbC5lcnJvcignV0ZQcmVSZXF1aXNpdGVFcnJvcicsICdOb3QgYWxsIHByZS1yZXF1aXNpdGVzIHBhc3NlZC4nKTtcblx0XHRcdFx0XHRyZWplY3QoZXJyb3IpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9IGNhdGNoIChlcnIpIHtcblx0XHRcdHJlamVjdChlcnIpO1xuXHRcdH1cblx0fSk7XG59O1xuXG4vKipcbiAqIFByb2Nlc3MgcHJlLXJlcXVpc2l0ZSwgZXhlY3V0ZSB0aGUgcHJlLXJlcXVpc2l0ZSBjb25kaXRpb24uXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IHByZXJlcXVpc2l0ZSAtIHRoZSBwcmUtcmVxdWlzaXRlIGNvbmZpZyBkYXRhXG4gKiBAcGFyYW0ge29iamVjdH0gX1dGSW5zdGFuY2UgLSB0aGUgd29ya2Zsb3cgY29uc3RydWN0b3IgaW5zdGFuY2VcbiAqXG4gKiBAZXhhbXBsZVxuICogUHJvY2Vzcy5wcmVSZXF1aXNpdGUoY29uZmlnLCBjb3VudGVyLCBpbnN0YW5jZSwgZG9jKTtcbiAqXG4gKiBAcmV0dXJuICcnXG4gKlxuICovXG5mdW5jdGlvbiBwcmVSZXF1aXNpdGUocHJlcmVxdWlzaXRlLCBfV0ZJbnN0YW5jZSl7XG5cdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcblx0XHRzd2l0Y2gocHJlcmVxdWlzaXRlLl90eXBlKSB7XG5cdFx0XHQvLyBUT0RPOiBBZGQgdGhlIGNhbGwgdG8gdGhlIHJlbGV2YW50IG1ldGhvZHMgYmFzZWQgb24gdGhlIF90eXBlIGF0dHJpYnV0ZS4gU2hvdWxkIGNhbGwgdGhlIGdlbmVyaWMgYWN0aW9uKCkgbWV0aG9kLlxuXHRcdFx0Y2FzZSAncHJvY2Vzc0luc3RhbmNlcyc6XG5cdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0dmFyIGlkID0gcHJlcmVxdWlzaXRlLl9wYXJhbWV0ZXI7XG5cdFx0XHRcdFx0dmFyIHN1YmplY3QgPSBjb3VudChnZXRTdWJQcm9jZXNzKGlkLCBfV0ZJbnN0YW5jZSkpO1xuXHRcdFx0XHRcdHZhciBjb21wYXJlID0gdXRpbC5jb21wYXJlKHN1YmplY3QsIHByZXJlcXVpc2l0ZS5fb3BlcmF0b3IsIHBhcnNlSW50KHByZXJlcXVpc2l0ZS5fdmFsdWUpKTtcblx0XHRcdFx0XHRpZiAoY29tcGFyZSkge1xuXHRcdFx0XHRcdFx0dmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ1ByZS1yZXF1aXNpdGVzIHBhc3NlZC4nLCB7fSk7XG5cdFx0XHRcdFx0XHRyZXNvbHZlKHN1Y2Nlc3MpO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHR2YXIgbWVzc2FnZSA9ICcnO1xuXHRcdFx0XHRcdFx0cHJlcmVxdWlzaXRlLm1lc3NhZ2UuaTE4bi5maWx0ZXIoZnVuY3Rpb24oaXRlbSl7XG5cdFx0XHRcdFx0XHRcdGlmIChpdGVtLl9sYW5nID09PSAnZW4nKSB7XG5cdFx0XHRcdFx0XHRcdFx0bWVzc2FnZSA9IGl0ZW0udmFsdWU7XG5cdFx0XHRcdFx0XHRcdFx0dmFyIGVycm9yID0gdXRpbC5lcnJvcignV0ZQcmVSZXF1aXNpdGVFcnJvcicsIG1lc3NhZ2UpO1xuXHRcdFx0XHRcdFx0XHRcdHJlamVjdChlcnJvcik7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSBjYXRjaChlcnIpIHtcblx0XHRcdFx0XHRyZWplY3QoZXJyKTtcblx0XHRcdFx0fVxuXHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0dmFyIGVycm9yID0gdXRpbC5lcnJvcignV0ZQcmVSZXF1aXNpdGVFcnJvcicsJ1ByZS1yZXF1aXNpdGUgdHlwZTogJyArIHByZXJlcXVpc2l0ZS5fdHlwZSArICcgbm90IGRlZmluZWQuJyk7XG5cdFx0XHRcdHJlamVjdChlcnJvcik7XG5cdFx0fVxuXHR9KTtcbn07XG5cbi8qKlxuICogUHJvY2VzcyBwcmUtYWN0aW9uc3NcbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gcHJlQWN0aW9ucyAtIHRoZSBwcmUtYWN0aW9ucyBjb25maWcgZGF0YVxuICogQHBhcmFtIHtvYmplY3R9IF9XRkluc3RhbmNlIC0gdGhlIGN1cnJlbnQgd29ya2Zsb3cgY29uc3RydWN0b3IgaW5zdGFuY2VcbiAqXG4gKiBAZXhhbXBsZSAnJ1xuICpcbiAqIEByZXR1cm4gJydcbiAqXG4gKi9cbmZ1bmN0aW9uIHByZUFjdGlvbnMocHJlQWN0aW9ucywgX1dGSW5zdGFuY2Upe1xuXHRyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG5cdFx0dmFyIGNvbXBsZXRlZCA9IFtdO1xuXHRcdHRyeSB7XG5cdFx0XHR1dGlsLnN5bmNMb29wKHByZUFjdGlvbnMubGVuZ3RoLCBmdW5jdGlvbihsb29wKXtcblx0XHRcdFx0dmFyIGNvdW50ZXIgPSBsb29wLml0ZXJhdGlvbigpO1xuXHRcdFx0XHRhY3Rpb24ocHJlQWN0aW9uc1tjb3VudGVyXSwgX1dGSW5zdGFuY2UpLnRoZW4oZnVuY3Rpb24oZGF0YSl7XG5cdFx0XHRcdFx0Ly8gQ2hlY2sgaWYgYWxsIHByZS1yZXF1aXNpdGVzIGNvbXBsZXRlZCBzdWNjZXNzZnVsbHkuXG5cdFx0XHRcdFx0Y29tcGxldGVkLnB1c2godHJ1ZSk7XG5cdFx0XHRcdFx0bG9vcC5uZXh0KCk7XG5cdFx0XHRcdH0sIGZ1bmN0aW9uKGVycil7XG5cdFx0XHRcdFx0Y29tcGxldGVkLnB1c2goZmFsc2UpO1xuXHRcdFx0XHRcdGxvb3AuYnJlYWsoKTtcblx0XHRcdFx0XHRyZWplY3QoZXJyKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9LCBmdW5jdGlvbigpe1xuXHRcdFx0XHRpZiAoY29tcGxldGVkLmV2ZXJ5KEJvb2xlYW4pKSB7XG5cdFx0XHRcdFx0dmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ1ByZS1hY3Rpb25zIGNvbXBsZXRlZCBzdWNjZXNzZnVsbHkuJywge30pO1xuXHRcdFx0XHRcdHJlc29sdmUoc3VjY2Vzcyk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dmFyIGVycm9yID0gdXRpbC5lcnJvcignV0ZQcmVSZXF1aXNpdGVFcnJvcicsICdOb3QgYWxsIHByZS1hY3Rpb25zIHBhc3NlZC4nKTtcblx0XHRcdFx0XHRyZWplY3QoZXJyb3IpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9IGNhdGNoIChlcnIpIHtcblx0XHRcdHJlamVjdChlcnIpO1xuXHRcdH1cblx0fSk7XG59O1xuXG4vKipcbiAqIFdvcmtmbG93IGdldCBzdWItcHJvY2VzcyBkYXRhLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBpZCAtIHRoZSBzdWJQcm9jZXNzIGNvbmZpZyBpZFxuICogQHBhcmFtIHtvYmplY3R9IF9XRkluc3RhbmNlIC0gdGhlIGN1cnJlbnQgd29ya2Zsb3cgY29uc3RydWN0b3IgaW5zdGFuY2VcbiAqXG4gKiBAZXhhbXBsZSBcIlwiXG4gKlxuICogQHJldHVybiBcIlwiXG4gKlxuICovXG5mdW5jdGlvbiBnZXRTdWJQcm9jZXNzKGlkLCBfV0ZJbnN0YW5jZSl7XG5cdGlmIChfV0ZJbnN0YW5jZS5zdWJwcm9jZXNzZXMgPT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBbXTtcblx0fSBlbHNlIHtcblx0XHRfV0ZJbnN0YW5jZS5zdWJwcm9jZXNzZXMuZmlsdGVyKGZ1bmN0aW9uKHN1YlByb2Nlc3Mpe1xuXHRcdFx0aWYgKHN1YlByb2Nlc3MuaWQgPT09IGlkKSB7XG5cdFx0XHRcdHJldHVybiBzdWJQcm9jZXNzO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG5cbn07XG5cbi8qKlxuICogUHJvY2VzcyBzdWItcHJvY2Vzc1xuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBwcm9jZXNzIC0gdGhlIGN1cnJlbnQgcHJvY2VzcyBpZCBhbmQgc2VxXG4gKiBAcGFyYW0ge29iamVjdH0gc3ViUHJvY2VzcyAtIHRoZSBzdWItcHJvY2VzcyBpZCBhbmQgc2VxXG4gKiBAcGFyYW0ge29iamVjdH0gZGF0YSAtIHRoZSB1c2VyIGlucHV0IGRhdGFcbiAqIEBwYXJhbSB7b2JqZWN0fSBfV0ZJbnN0YW5jZSAtIHRoZSBjdXJyZW50IHdvcmtmbG93IGNvbnN0cnVjdG9yIGluc3RhbmNlXG4gKlxuICogQGV4YW1wbGUgJydcbiAqXG4gKiBAcmV0dXJuICcnXG4gKlxuICovXG5mdW5jdGlvbiBzdWJQcm9jZXNzKHByb2Nlc3NJZCwgcHJvY2Vzc1NlcSwgc3ViUHJvY2Vzc0lkLCBzdWJQcm9jZXNzU2VxLCBkYXRhLCBfV0ZJbnN0YW5jZSl7XG5cdC8vIEdldCB0aGUgY3VycmVudCBwcm9jZXNzIHN1YlByb2Nlc3MgaW5zdGFuY2Vcblx0Ly8gdmFyIHN1YlByb2Nlc3NTZXEgPSAxO1xuXHR2YXIgc3ViUHJvY2VzcyA9IFtdO1xuXHR2YXIgcHJvY2Vzc0NvbmYgPSBbXTtcblx0dmFyIHN1YlByb2Nlc3NDb25mID0gW107XG5cdF9XRkluc3RhbmNlLmluc3RhbmNlLnByb2Nlc3Nlcy5maWx0ZXIoZnVuY3Rpb24ob2JqUHJvY2Vzcyl7XG5cdFx0aWYgKG9ialByb2Nlc3MuaWQgPT09IHByb2Nlc3NJZCAmJiBvYmpQcm9jZXNzLnNlcSA9PT0gcHJvY2Vzc1NlcSkge1xuXHRcdFx0dmFyIHNwTGVuZ3RoID0gb2JqUHJvY2Vzcy5zdWJQcm9jZXNzZXMubGVuZ3RoO1xuXHRcdFx0b2JqUHJvY2Vzcy5zdWJQcm9jZXNzZXMuZmlsdGVyKGZ1bmN0aW9uKG9ialN1YlByb2Nlc3Mpe1xuXHRcdFx0XHRpZiAob2JqU3ViUHJvY2Vzcy5pZCA9PT0gc3ViUHJvY2Vzc0lkICYmIG9ialN1YlByb2Nlc3Muc2VxID09PSBzdWJQcm9jZXNzU2VxKSB7XG5cdFx0XHRcdFx0dmFyIHV1aWQgPSBvYmpTdWJQcm9jZXNzLnV1aWQ7XG5cdFx0XHRcdFx0Ly8gc3ViUHJvY2VzcyA9IG9ialN1YlByb2Nlc3M7XG5cdFx0XHRcdFx0Ly8gY29uc29sZS5sb2codXVpZCk7XG5cdFx0XHRcdFx0Ly8gY29uc29sZS5sb2coX1dGSW5zdGFuY2Uuc3VicHJvY2Vzc2VzLmxlbmd0aCk7XG5cdFx0XHRcdFx0X1dGSW5zdGFuY2Uuc3VicHJvY2Vzc2VzLmZpbHRlcihmdW5jdGlvbihzdWJQcm9jZXNzSXRlbSl7XG5cdFx0XHRcdFx0XHRpZiAoc3ViUHJvY2Vzc0l0ZW0uX2lkID09PSB1dWlkKSB7XG5cdFx0XHRcdFx0XHRcdHN1YlByb2Nlc3MgPSBzdWJQcm9jZXNzSXRlbTtcblx0XHRcdFx0XHRcdFx0Ly8gY29uc29sZS5sb2coc3ViUHJvY2Vzcyk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSlcblx0XHRcdFx0fVxuXHRcdFx0fSlcblx0XHR9XG5cdH0pXG5cdC8vIEdldCB0aGUgY3VycmVudCBzdWJQcm9jZXNzIGNvbmZpZ3VyYXRpb25cblx0X1dGSW5zdGFuY2UuY29uZmlnLnByb2Nlc3Nlcy5maWx0ZXIoZnVuY3Rpb24ocHJvY2Vzc0NvbmZpZyl7XG5cdFx0aWYgKHByb2Nlc3NDb25maWcuX2lkID09PSBwcm9jZXNzSWQpIHtcblx0XHRcdHByb2Nlc3NDb25mID0gcHJvY2Vzc0NvbmZpZztcblx0XHRcdHByb2Nlc3NDb25maWcuc3ViUHJvY2Vzc2VzLmZpbHRlcihmdW5jdGlvbihzdWJQcm9jZXNzQ29uZmlnKXtcblx0XHRcdFx0aWYgKHN1YlByb2Nlc3NDb25maWcuX2lkID09PSBzdWJQcm9jZXNzSWQpIHtcblx0XHRcdFx0XHRzdWJQcm9jZXNzQ29uZiA9IHN1YlByb2Nlc3NDb25maWc7XG5cdFx0XHRcdH1cblx0XHRcdH0pXG5cdFx0fVxuXHR9KVxuXHQvLyBpZiAoc3ViUHJvY2Vzcy5sZW5ndGggIT09IDApIHtcblx0Ly8gXHRzdWJQcm9jZXNzU2VxID0gc3ViUHJvY2Vzcy5sZW5ndGggKyAxO1xuXHQvLyB9XG5cdC8vIFRoZSBkZWZhdWx0IHN1YlByb2Nlc3MgbW9kZWxcblx0dmFyIG1vZGVsID0ge1xuXHRcdF9pZDogX1dGSW5zdGFuY2UucHJvZmlsZSArICc6JyArIF9XRkluc3RhbmNlLmFwcCArICc6JyArIHByb2Nlc3NJZCArICc6JyArIHByb2Nlc3NTZXEgKyAnOicgKyBzdWJQcm9jZXNzSWQgKyAnOicgKyBzdWJQcm9jZXNzU2VxLFxuXHRcdGlkOiBzdWJQcm9jZXNzSWQsXG5cdFx0dHlwZTogJ3dvcmtmbG93SW5zdGFuY2VTdWJQcm9jZXNzJyxcblx0XHRzZXE6IHN1YlByb2Nlc3NTZXEsXG5cdFx0aW5pdGlhdGVkOiBmYWxzZSxcblx0XHRkYXRlczoge1xuXHRcdFx0Y3JlYXRlZDogJycsXG5cdFx0XHR2YWxpZDogJycsXG5cdFx0XHRkdWU6ICcnLFxuXHRcdFx0Y2xvc2VkOiAnJ1xuXHRcdH0sXG5cdFx0Y29tcGxldGU6IGZhbHNlLFxuXHRcdGluZGljYXRvcnM6IFtdLFxuXHRcdHN0ZXA6IHt9XG5cdH07XG5cdC8vIFJldHVybiBhIHByb21pc2Vcblx0cmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuXHRcdC8vIENhdGNoIGFsbCB1bmNhdWdodCBlcnJvcnNcblx0XHR0cnkge1xuXHRcdFx0Ly8gMS4gUHJvY2VzcyB0aGUgcHJlLWFjdGlvbnNcblx0XHRcdHZhciBwcmVBY3Rpb25zQ29uZiA9IHByb2Nlc3NDb25mLnByZUFjdGlvbnM7XG5cdFx0XHRwcmVBY3Rpb25zKHByZUFjdGlvbnNDb25mLCBfV0ZJbnN0YW5jZSkudGhlbihmdW5jdGlvbihyZXN1bHQpe1xuXHRcdFx0XHQvLyAyLiBQcm9jZXNzIHRoZSBwcmUtcmVxdWlzaXRlc1xuXHRcdFx0XHR2YXIgcHJlcmVxdWlzaXRlQ29uZiA9IHByb2Nlc3NDb25mLnByZXJlcXVpc2l0ZXM7XG5cdFx0XHRcdHByZVJlcXVpc2l0ZXMocHJlcmVxdWlzaXRlQ29uZiwgX1dGSW5zdGFuY2UpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KXtcblx0XHRcdFx0XHQvLyAzLiBJbml0aWF0ZSB0aGUgc3ViUHJvY2Vzc1xuXHRcdFx0XHRcdHZhciBpbml0aWF0ZUNvbmYgPSBzdWJQcm9jZXNzQ29uZi5pbml0aWF0ZTtcblx0XHRcdFx0XHRpbml0aWF0ZShpbml0aWF0ZUNvbmYsIHN1YlByb2Nlc3MsIGRhdGEpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KXtcblx0XHRcdFx0XHRcdC8vVXBkYXRlIHRoZSBzdWJQcm9jZXNzIG1vZGVsXG5cdFx0XHRcdFx0XHRtb2RlbC5pbml0aWF0ZWQgPSByZXN1bHQuZGF0YS5pbml0aWF0ZWQ7XG5cdFx0XHRcdFx0XHRtb2RlbC5kYXRlcyA9IHJlc3VsdC5kYXRhLmRhdGVzO1xuXHRcdFx0XHRcdFx0Ly8gRXhlY3V0ZSB0aGUgZmlyc3Qgc3RlcFxuXHRcdFx0XHRcdFx0dmFyIHN0ZXBJZCA9IHN1YlByb2Nlc3NDb25mLnN0ZXBzWzBdLl9pZDtcblx0XHRcdFx0XHRcdHZhciB0cmFuc2l0aW9uSWQgPSBzdWJQcm9jZXNzQ29uZi5zdGVwc1swXS50cmFuc2l0aW9uc1swXS5faWQ7XG5cdFx0XHRcdFx0XHR2YXIgc3RlcFNlcSA9IDE7XG5cdFx0XHRcdFx0XHRzdGVwKHByb2Nlc3NJZCwgcHJvY2Vzc1NlcSwgc3ViUHJvY2Vzc0lkLCBzdWJQcm9jZXNzU2VxLCBzdGVwSWQsIHN0ZXBTZXEsIGRhdGEsIF9XRkluc3RhbmNlKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCl7XG5cdFx0XHRcdFx0XHRcdG1vZGVsLnN0ZXAgPSByZXN1bHQuZGF0YTtcblx0XHRcdFx0XHRcdFx0Ly8gVXBkYXRlIHRoZSBpbmRpY2F0b3Igc2VjdGlvbnMgb2YgdGhlIHN1YlByb2Nlc3Ncblx0XHRcdFx0XHRcdFx0aW5kaWNhdG9ycyhzdWJQcm9jZXNzQ29uZi5pbmRpY2F0b3JzLCBfV0ZJbnN0YW5jZSkudGhlbihmdW5jdGlvbihyZXN1bHQpe1xuXHRcdFx0XHRcdFx0XHRcdG1vZGVsLmluZGljYXRvcnMgPSByZXN1bHQuZGF0YTtcblx0XHRcdFx0XHRcdFx0XHQvLyBFeGVjdXRlIHRoZSB0cmFuc2l0aW9ucywgaWYgYXV0b1xuXHRcdFx0XHRcdFx0XHRcdHRyYW5zaXRpb24ocHJvY2Vzc0lkLCBwcm9jZXNzU2VxLCBzdWJQcm9jZXNzSWQsIHN1YlByb2Nlc3NTZXEsIHN0ZXBJZCwgdHJhbnNpdGlvbklkLCBkYXRhLCBfV0ZJbnN0YW5jZSkudGhlbihmdW5jdGlvbihyZXN1bHQpe1xuXHRcdFx0XHRcdFx0XHRcdFx0Ly8gVXBkYXRlIHRoZSBzdWJQcm9jZXNzIHN0ZXAgZGF0YVxuXHRcdFx0XHRcdFx0XHRcdFx0dmFyIHRyYW5zUmVzdWx0ID0gcmVzdWx0O1xuXHRcdFx0XHRcdFx0XHRcdFx0bW9kZWwuc3RlcCA9IHJlc3VsdC5kYXRhO1xuXHRcdFx0XHRcdFx0XHRcdFx0Ly8gNC4gUHJvY2VzcyB0aGUgcG9zdC1hY3Rpb25zXG5cdFx0XHRcdFx0XHRcdFx0XHR2YXIgcG9zdEFjdGlvbnNDb25mID0gcHJvY2Vzc0NvbmYucG9zdEFjdGlvbnM7XG5cdFx0XHRcdFx0XHRcdFx0XHRwb3N0QWN0aW9ucyhwb3N0QWN0aW9uc0NvbmYsIF9XRkluc3RhbmNlKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCl7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKHRyYW5zUmVzdWx0Lm1lc3NhZ2UsIG1vZGVsKTtcblx0XHRcdFx0XHQgICAgICAgICAgcmVzb2x2ZShzdWNjZXNzKTtcblx0XHRcdFx0XHRcdFx0XHRcdH0sIGZ1bmN0aW9uKGVycil7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdHJlamVjdChlcnIpO1xuXHRcdFx0XHRcdFx0XHRcdFx0fSlcblx0XHRcdFx0ICAgICAgICB9LCBmdW5jdGlvbihlcnIpe1xuXHRcdFx0XHQgICAgICAgICAgcmVqZWN0KGVycik7XG5cdFx0XHRcdCAgICAgICAgfSk7XG5cdFx0XHRcdFx0XHRcdH0sIGZ1bmN0aW9uKGVycil7XG5cdFx0XHRcdFx0XHRcdFx0cmVqZWN0KGVycik7XG5cdFx0XHRcdFx0XHRcdH0pXG5cdFx0XHRcdFx0XHR9LCBmdW5jdGlvbihlcnIpe1xuXHRcdFx0XHRcdFx0XHRyZWplY3QoZXJyKTtcblx0XHRcdFx0XHRcdH0pXG5cdFx0XHRcdFx0fSwgZnVuY3Rpb24oZXJyKXtcblx0XHRcdFx0XHRcdHJlamVjdChlcnIpO1xuXHRcdFx0XHRcdH0pXG5cdFx0XHRcdH0sIGZ1bmN0aW9uKGVycil7XG5cdFx0XHRcdFx0cmVqZWN0KGVycik7XG5cdFx0XHRcdH0pXG5cdFx0XHR9LCBmdW5jdGlvbihlcnIpe1xuXHRcdFx0XHRyZWplY3QoZXJyKTtcblx0XHRcdH0pXG5cdFx0fSBjYXRjaChlcnIpe1xuXHRcdFx0cmVqZWN0KGVycik7XG5cdFx0fVxuXHR9KTtcbn07XG5cbi8qKlxuICogUHJvY2VzcyBpbml0aWF0ZVxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBpbml0aWF0ZSAtIHRoZSBpbml0aWF0ZSBjb25maWcgZGF0YVxuICogQHBhcmFtIHtvYmplY3R9IGRhdGEgLSB0aGUgdXNlciBpbnB1dCBkYXRhXG4gKlxuICogQGV4YW1wbGUgJydcbiAqXG4gKiBAcmV0dXJuICcnXG4gKlxuICovXG5mdW5jdGlvbiBpbml0aWF0ZShpbml0aWF0ZSwgc3ViUHJvY2VzcywgZGF0YSl7XG5cdHZhciBjb21wbGV0ZWQgPSBbXTtcblx0dmFyIHJlc3VsdCA9IHtcblx0XHRpbml0aWF0ZWQ6IGZhbHNlLFxuXHRcdGRhdGVzOiB7XG5cdFx0XHRjcmVhdGVkOiAnJyxcblx0XHRcdHZhbGlkOiAnJyxcblx0XHRcdGR1ZTogJycsXG5cdFx0XHRjbG9zZWQ6ICcnXG5cdFx0fVxuXHR9O1xuXHRyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG5cdFx0dmFyIGluaXQgPSBmdW5jdGlvbigpe1xuXHRcdFx0c3dpdGNoKGluaXRpYXRlLl90eXBlKSB7XG5cdFx0XHRcdGNhc2UgJ3VzZXInOlxuXHRcdFx0XHRcdC8vIElmIHRoZSBzdWJQcm9jZXNzIGluaXRpYXRpb24gaXMgdXNlciBkZWZpbmVkIHRoZW5cblx0XHRcdFx0XHRyZXN1bHQuZGF0ZXMuY3JlYXRlZCA9IGRhdGEuY3JlYXRlZERhdGU7XG5cdFx0XHRcdFx0aWYgKGluaXRpYXRlLmRhdGVzLnZhbGlkLl90eXBlID09PSAndXNlclNlbGVjdGVkJykge1xuXHRcdFx0XHRcdFx0aWYgKGRhdGEudmFsaWREYXRlICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0XHRcdFx0cmVzdWx0LmRhdGVzLnZhbGlkID0gZGF0YS52YWxpZERhdGU7XG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHR1dGlsLndhcm4oJ1dGSW5pdGlhdGVFcnJvcicsICdObyB2YWxpZCBkYXRlIHBhc3NlZCBpbiAtIHtkYXRhLnZhbGlkRGF0ZX0nKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0aWYgKGluaXRpYXRlLmRhdGVzLmR1ZS5fdHlwZSA9PT0gJ3VzZXJTZWxlY3RlZCcpIHtcblx0XHRcdFx0XHRcdGlmIChkYXRhLmR1ZURhdGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRcdFx0XHRyZXN1bHQuZGF0ZXMuZHVlID0gZGF0YS5kdWVEYXRlO1xuXHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0dXRpbC53YXJuKCdXRkluaXRpYXRlRXJyb3InLCAnTm8gZHVlIGRhdGUgcGFzc2VkIGluIC0ge2RhdGEuZHVlRGF0ZX0nKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0cmVzdWx0LmluaXRpYXRlZCA9IHRydWU7XG5cdFx0XHRcdFx0dmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ1N1Yi1Qcm9jZXNzIGluaXRpYXRlIGNvbXBsZXRlZCBzdWNjZXNzZnVsbHkuJywgcmVzdWx0KTtcblx0XHRcdFx0XHRyZXNvbHZlKHN1Y2Nlc3MpO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdHZhciBlcnJvciA9IHV0aWwuZXJyb3IoJ1dGSW5pdGlhdGVFcnJvcicsICdJbml0aWF0ZSB0eXBlOiAnICsgaW5pdGlhdGUuX3R5cGUgKyAnIG5vdCBkZWZpbmVkLicpO1xuXHRcdFx0XHRcdHJlamVjdChlcnJvcik7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmIChzdWJQcm9jZXNzLmNvbXBsZXRlID09PSB1bmRlZmluZWQpIHtcblx0XHRcdGluaXQoKTtcblx0XHR9IGVsc2UgaWYgKCFzdWJQcm9jZXNzLmNvbXBsZXRlKSB7XG5cdFx0XHRpZiAoaW5pdGlhdGUucGFyYWxsZWxJbnN0YW5jZXMpIHtcblx0XHRcdFx0aW5pdCgpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dmFyIGVycm9yID0gdXRpbC5lcnJvcignV0ZJbml0aWF0ZUVycm9yJywgJ1N1Yi1wcm9jZXNzOiAnICsgc3ViUHJvY2Vzcy5pZCArICcgc3RpbGwgYWN0aXZlIGFuZCBwYXJhbGxlbCBpbnN0YW5jZXMgYXJlIG5vdCBhbGxvd2VkLicpO1xuXHRcdFx0XHRyZWplY3QoZXJyb3IpO1xuXHRcdFx0fVxuXHRcdH1cblx0fSk7XG59O1xuXG4vKipcbiAqIFByb2Nlc3Mgc3RlcFxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBwcm9jZXNzSWQgLSB0aGUgY3VycmVudCBwcm9jZXNzIGlkXG4gKiBAcGFyYW0ge3N0cmluZ30gc3ViUHJvY2Vzc0lkIC0gdGhlIGN1cnJlbnQgc3ViLXByb2Nlc3MgaWRcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdGVwSWQgLSB0aGUgY3VycmVudCBzdWItcHJvY2VzcyBzdGVwIGlkXG4gKiBAcGFyYW0ge251bWJlcn0gc3RlcFNlcSAtIHRoZSBjdXJyZW50IHN1Yi1wcm9jZXNzIHN0ZXAgaW5zdGFuY2UgY291bnRlciAvIHNlcXVlbmNlXG4gKiBAcGFyYW0ge29iamVjdH0gZGF0YSAtIHRoZSB1c2VyIGlucHV0IGRhdGFcbiAqIEBwYXJhbSB7b2JqZWN0fSBfV0ZJbnN0YW5jZSAtIHRoZSBjdXJyZW50IF9XRkluc3RhbmNlIGNvbnN0cnVjdG9yIGluc3RhbmNlXG4gKlxuICogQGV4YW1wbGUgJydcbiAqXG4gKiBAcmV0dXJuICcnXG4gKlxuICovXG5mdW5jdGlvbiBzdGVwKHByb2Nlc3NJZCwgcHJvY2Vzc1NlcSwgc3ViUHJvY2Vzc0lkLCBzdWJQcm9jZXNzU2VxLCBzdGVwSWQsIHN0ZXBTZXEsIGRhdGEsIF9XRkluc3RhbmNlKXtcblx0Ly8gRGVmYXVsdCBzdGVwIG1vZGVsXG5cdHZhciBtb2RlbCA9IHtcblx0XHRpZDogJycsXG5cdFx0c2VxOiAnJyxcblx0XHRzdGF0dXM6ICcnLFxuXHRcdG1lc3NhZ2U6ICcnLFxuXHRcdGFzc2lnbmVkVG86IHtcblx0XHRcdHVzZXJJZDogJycsXG5cdFx0XHRuYW1lOiAnJ1xuXHRcdH0sXG5cdFx0Y29tbWVudDogJydcblx0fTtcblx0dmFyIHN1YlByb2Nlc3MgPSB7fTtcblx0dmFyIHV1aWQgPSAnJztcblx0dmFyIGluc3RTdWJQcm9jZXNzO1xuXHR2YXIgc3RlcCA9IHt9O1xuXHR2YXIgdHJhbnNpdGlvbklkID0gJyc7XG5cdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcblx0XHR0cnkge1xuXHRcdFx0Ly9HZXQgdGhlIGN1cnJlbnQgc3ViUHJvY2VzcyBpbnN0YW5jZSBkYXRhXG5cdFx0XHRfV0ZJbnN0YW5jZS5pbnN0YW5jZS5wcm9jZXNzZXMuZmlsdGVyKGZ1bmN0aW9uKG9ialByb2Nlc3Mpe1xuXHRcdFx0XHRpZiAob2JqUHJvY2Vzcy5pZCA9PT0gcHJvY2Vzc0lkICYmIG9ialByb2Nlc3Muc2VxID09PSBwcm9jZXNzU2VxKSB7XG5cdFx0XHRcdFx0Ly8gY29uc29sZS5sb2cob2JqUHJvY2Vzcyk7XG5cdFx0XHRcdFx0b2JqUHJvY2Vzcy5zdWJQcm9jZXNzZXMuZmlsdGVyKGZ1bmN0aW9uKG9ialN1YlByb2Nlc3Mpe1xuXHRcdFx0XHRcdFx0aWYgKG9ialN1YlByb2Nlc3MuaWQgPT09IHN1YlByb2Nlc3NJZCAmJiBvYmpTdWJQcm9jZXNzLnNlcSA9PT0gc3ViUHJvY2Vzc1NlcSkge1xuXHRcdFx0XHRcdFx0XHQvLyBpbnN0U3ViUHJvY2VzcyA9IG9ialN1YlByb2Nlc3M7XG5cdFx0XHRcdFx0XHRcdHV1aWQgPSBvYmpTdWJQcm9jZXNzLnV1aWQ7XG5cdFx0XHRcdFx0XHRcdC8vIHN1YlByb2Nlc3MgPSBvYmpTdWJQcm9jZXNzO1xuXHRcdFx0XHRcdFx0XHQvLyBjb25zb2xlLmxvZyh1dWlkKTtcblx0XHRcdFx0XHRcdFx0Ly8gY29uc29sZS5sb2coX1dGSW5zdGFuY2Uuc3VicHJvY2Vzc2VzLmxlbmd0aCk7XG5cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9KVxuXHRcdFx0XHR9XG5cdFx0XHR9KVxuXHRcdFx0Ly8gY29uc29sZS5sb2coX1dGSW5zdGFuY2Uuc3VicHJvY2Vzc2VzKTtcblx0XHRcdF9XRkluc3RhbmNlLnN1YnByb2Nlc3Nlcy5maWx0ZXIoZnVuY3Rpb24oc3ViUHJvY2Vzc0l0ZW0pe1xuXHRcdFx0XHRpZiAoc3ViUHJvY2Vzc0l0ZW0uX2lkID09PSB1dWlkKSB7XG5cdFx0XHRcdFx0aW5zdFN1YlByb2Nlc3MgPSBzdWJQcm9jZXNzSXRlbTtcblx0XHRcdFx0XHQvLyBjb25zb2xlLmxvZyhpbnN0U3ViUHJvY2Vzcyk7XG5cdFx0XHRcdH1cblx0XHRcdH0pXG5cdFx0XHQvLyBjb25zb2xlLmxvZyhpbnN0U3ViUHJvY2Vzcyk7XG5cdFx0XHQvLyBHZXQgdGhlIGN1cnJlbnQgY29uZmlnIHN0ZXBcblx0XHRcdF9XRkluc3RhbmNlLmNvbmZpZy5wcm9jZXNzZXMuZmlsdGVyKGZ1bmN0aW9uKG9ialByb2Nlc3Mpe1xuXHRcdFx0XHRpZiAob2JqUHJvY2Vzcy5faWQgPT09IHByb2Nlc3NJZCkge1xuXHRcdFx0XHRcdG9ialByb2Nlc3Muc3ViUHJvY2Vzc2VzLmZpbHRlcihmdW5jdGlvbihvYmpTdWJQcm9jZXNzKXtcblx0XHRcdFx0XHRcdGlmIChvYmpTdWJQcm9jZXNzLl9pZCA9PT0gc3ViUHJvY2Vzc0lkKSB7XG5cdFx0XHRcdFx0XHRcdHN1YlByb2Nlc3MgPSBvYmpTdWJQcm9jZXNzO1xuXHRcdFx0XHRcdFx0XHRvYmpTdWJQcm9jZXNzLnN0ZXBzLmZpbHRlcihmdW5jdGlvbihvYmpTdGVwKXtcblx0XHRcdFx0XHRcdFx0XHRpZiAob2JqU3RlcC5faWQgPT09IHN0ZXBJZCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0c3RlcCA9IG9ialN0ZXA7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9KVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0pXG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdFx0Ly8gVXBkYXRlIHRoZSBzdWItcHJvY2VzcyBzdGVwIGRhdGFcblx0XHRcdG1vZGVsLmlkID0gc3RlcElkO1xuXHRcdFx0bW9kZWwuc2VxID0gc3RlcFNlcTtcblx0XHRcdG1vZGVsLnN0YXR1cyA9IHN0ZXAuX3NldEluc3RhbmNlU3RhdHVzVG87XG5cdFx0XHRtb2RlbC5tZXNzYWdlID0gc3RlcC5fc2V0U3RhdHVzTXNnVG87XG5cdFx0XHRtb2RlbC5hc3NpZ25lZFRvLnVzZXJJZCA9IGRhdGEudXNlcklkICE9PSB1bmRlZmluZWQgPyBkYXRhLnVzZXJJZCA6ICcnO1xuXHRcdFx0bW9kZWwuYXNzaWduZWRUby5uYW1lID0gZGF0YS5uYW1lICE9PSB1bmRlZmluZWQgPyBkYXRhLm5hbWUgOiAnJztcblx0XHRcdG1vZGVsLmNvbW1lbnQgPSBkYXRhLmNvbW1lbnQgIT09IHVuZGVmaW5lZCA/IGRhdGEuY29tbWVudCA6ICcnO1xuXHRcdFx0Ly8gVXBkYXRlIHRoZSBpbmRpY2F0b3IgZG9jdW1lbnRzIHByb2Nlc3Mgc3RlcCBkYXRhXG5cdFx0XHQvLyBjb25zb2xlLmxvZyhpbnN0U3ViUHJvY2Vzcyk7XG5cdFx0XHR2YXIgaW5kaWNhdG9ycyA9IGluc3RTdWJQcm9jZXNzICE9PSB1bmRlZmluZWQgPyBpbnN0U3ViUHJvY2Vzcy5pbmRpY2F0b3JzIDogW107XG5cdFx0XHRpbmRpY2F0b3JEb2NzKHByb2Nlc3NJZCwgaW5kaWNhdG9ycywgbW9kZWwsIF9XRkluc3RhbmNlKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCl7XG5cdFx0XHRcdC8vIElmIGFjdGlvbnMgYXJlIHNwZWNpZmllZCwgZXhlY3V0ZSB0aGVtXG5cdFx0XHRcdGlmIChzdGVwLmFjdGlvbnNbMF0gIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRcdGFjdGlvbnMoc3RlcC5hY3Rpb25zLCBwcm9jZXNzSWQsIHByb2Nlc3NTZXEsIHN1YlByb2Nlc3NJZCwgc3ViUHJvY2Vzc1NlcSwgc3ViUHJvY2VzcywgbW9kZWwsIF9XRkluc3RhbmNlKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCl7XG5cdFx0XHRcdFx0XHQvLyBFeGVjdXRlIHRoZSB0cmFuc2l0aW9ucywgaWYgYXV0b1xuXHRcdFx0XHRcdFx0Ly8gY29uc29sZS5sb2cobW9kZWwpO1xuXHRcdFx0XHRcdFx0dmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ0FjdGlvbnMgY29tcGxldGVkIHN1Y2Nlc3NmdWxseS4nLCBtb2RlbCk7XG5cdFx0XHRcdFx0XHRyZXNvbHZlKHN1Y2Nlc3MpO1xuXHRcdFx0XHRcdH0sIGZ1bmN0aW9uKGVycil7XG5cdFx0XHRcdFx0XHRyZWplY3QoZXJyKTtcblx0XHRcdFx0XHR9KVxuXHRcdFx0XHQvLyBFbHNlIHRhc2tzIGFyZSBzcHJlY2lmaWVkLCBleGVjdXRlIHRoZW1cblx0XHRcdFx0fSBlbHNlIGlmIChzdGVwLnRhc2sgIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRcdHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdUYXNrIGF3YWl0aW5nIHVzZXIgYWN0aW9uLicsIG1vZGVsKTtcblx0XHRcdFx0XHRyZXNvbHZlKHN1Y2Nlc3MpO1xuXHRcdFx0XHR9XG5cdFx0XHR9LCBmdW5jdGlvbihlcnIpe1xuXHRcdFx0XHRyZWplY3QoZXJyKTtcblx0XHRcdH0pXG5cdFx0fSBjYXRjaChlcnIpIHtcbiAgICBcdHJlamVjdChlcnIpO1xuICAgIH1cblx0fSk7XG59O1xuXG4vKipcbiAqIFByb2Nlc3MgaW5kaWNhdG9yIHVwZGF0ZXNcbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gYWN0aW9ucyAtIHRoZSBhY3Rpb25zIGNvbmZpZyBkYXRhXG4gKiBAcGFyYW0ge29iamVjdH0gc3ViUHJvY2VzcyAtIHRoZSBjdXJyZW50IHN1Yi1wcm9jZXNzIGZvcm0gY29uZmlnIGRhdGFcbiAqIEBwYXJhbSB7b2JqZWN0fSBfV0ZJbnN0YW5jZSAtIHRoZSBjdXJyZW50IHdvcmtmbG93IGNvbnN0cnVjdG9yIGluc3RhbmNlXG4gKlxuICogQGV4YW1wbGUgJydcbiAqXG4gKiBAcmV0dXJuICcnXG4gKlxuICovXG5mdW5jdGlvbiBpbmRpY2F0b3JzKGluZGljYXRvcnMsIF9XRkluc3RhbmNlKXtcblx0dmFyIG1vZGVsID0gW107XG5cdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcblx0XHR0cnkge1xuXHRcdFx0Ly8gVXBkYXRlIHRoZSBpbmRpY2F0b3Igc2VjdGlvbnMgb2YgdGhlIHN1YlByb2Nlc3Ncblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgaW5kaWNhdG9ycy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHR2YXIgaW5kaWNhdG9ySWQgPSBpbmRpY2F0b3JzW2ldLl9pZDtcblx0XHRcdFx0Zm9yICh2YXIgaiA9IDA7IGogPCBfV0ZJbnN0YW5jZS5pbmRpY2F0b3JzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRcdFx0dmFyIGluZGljYXRvciA9IF9XRkluc3RhbmNlLmluZGljYXRvcnNbal07XG5cdFx0XHRcdFx0dmFyIGluZGljYXRvck1vZGVsID0ge1xuXHRcdFx0XHRcdFx0aWQ6ICcnLFxuXHRcdFx0XHRcdFx0aW5zdGFuY2VzOiBbXVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHR2YXIgaW5zdGFuY2VNb2RlbCA9IHtcblx0XHRcdFx0XHRcdHV1aWQ6ICcnLFxuXHRcdFx0XHRcdFx0dGl0bGU6ICcnLFxuXHRcdFx0XHRcdFx0a2V5OiAnJyxcblx0XHRcdFx0XHRcdHNlcTogMVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRpZiAoaW5kaWNhdG9ySWQgPT09IGluZGljYXRvci5jYXRlZ29yeS50ZXJtKSB7XG5cdFx0XHRcdFx0XHRpbmRpY2F0b3JNb2RlbC5pZCA9IGluZGljYXRvcklkO1xuXHRcdFx0XHRcdFx0aW5zdGFuY2VNb2RlbC51dWlkID0gaW5kaWNhdG9yLl9pZDtcblx0XHRcdFx0XHRcdGluc3RhbmNlTW9kZWwudGl0bGUgPSBpbmRpY2F0b3IudGl0bGU7XG5cdFx0XHRcdFx0XHRpbnN0YW5jZU1vZGVsLmtleSA9ICcnO1xuXHRcdFx0XHRcdFx0aW5zdGFuY2VNb2RlbC5zZXEgPSAxO1xuXHRcdFx0XHRcdFx0aW5kaWNhdG9yTW9kZWwuaW5zdGFuY2VzLnB1c2goaW5zdGFuY2VNb2RlbCk7XG5cdFx0XHRcdFx0XHRtb2RlbC5wdXNoKGluZGljYXRvck1vZGVsKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdQcm9jZXNzIGluZGljYXRvciBtb2RlbCB1cGRhdGVkLicsIG1vZGVsKTtcblx0XHRcdHJlc29sdmUoc3VjY2Vzcyk7XG5cdFx0fSBjYXRjaChlcnIpIHtcblx0XHRcdHJlamVjdChlcnIpO1xuXHRcdH1cblx0fSlcbn07XG5cbi8qKlxuICogUHJvY2VzcyBhc3NpZ24gdXNlclxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBwcm9jZXNzSWQgLSB0aGUgV29ya2Zsb3cgY29uZmlnIC8gZGVmaW5pdGlvbiBwcm9jZXNzIGlkXG4gKiBAcGFyYW0ge251bWJlcn0gcHJvY2Vzc1NlcSAtIHRoZSBXb3JrZmxvdyBpbnN0YW5jZSBwcm9jZXNzIHNlcVxuICogQHBhcmFtIHtzdHJpbmd9IHN1YlByb2Nlc3NJZCAtIHRoZSBXb3JrZmxvdyBjb25maWcgLyBkZWZpbml0aW9uIHN1Yi1wcm9jZXNzIGlkXG4gKiBAcGFyYW0ge251bWJlcn0gc3ViUHJvY2Vzc1NlcSAtIHRoZSBXb3JrZmxvdyBpbnN0YW5jZSBzdWItcHJvY2VzcyBzZXFcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdGVwSWQgLSB0aGUgV29ya2Zsb3cgY29uZmlnIC8gZGVmaW5pdGlvbiBzdGVwIGlkXG4gKiBAcGFyYW0ge3N0cmluZ30gdHJhbnNpdGlvbklkIC0gdGhlIFdvcmtmbG93IGNvbmZpZyAvIGRlZmluaXRpb24gdHJhbnNpdGlvbiBpZFxuICogQHBhcmFtIHtvYmplY3R9IHVzZXIgLSB0aGUgdXNlciB0byBhc3NpZ24gdG9cbiAqIEBwYXJhbSB7b2JqZWN0fSBfV0ZJbnN0YW5jZSAtIHRoZSBjdXJyZW50IHdvcmtmbG93IGNvbnN0cnVjdG9yIGluc3RhbmNlXG4gKlxuICogQGV4YW1wbGUgJydcbiAqXG4gKiBAcmV0dXJuICcnXG4gKlxuICovXG5mdW5jdGlvbiBhc3NpZ25Vc2VyKHByb2Nlc3NJZCwgcHJvY2Vzc1NlcSwgc3ViUHJvY2Vzc0lkLCBzdWJQcm9jZXNzU2VxLCB1c2VyLCBfV0ZJbnN0YW5jZSl7XG5cdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcblx0XHR0cnkge1xuXHRcdFx0dmFyIHV1aWQgPSAnJztcblx0XHRcdC8vIEdldCB0aGUgY3VycmVudCBzdWJQcm9jZXNzIGluc3RhbmNlIGRhdGFcblx0XHRcdF9XRkluc3RhbmNlLmluc3RhbmNlLnByb2Nlc3Nlcy5maWx0ZXIoZnVuY3Rpb24ob2JqUHJvY2Vzcyl7XG5cdFx0XHRcdGlmIChvYmpQcm9jZXNzLmlkID09PSBwcm9jZXNzSWQgJiYgb2JqUHJvY2Vzcy5zZXEgPT09IHByb2Nlc3NTZXEpIHtcblx0XHRcdFx0XHRvYmpQcm9jZXNzLnN1YlByb2Nlc3Nlcy5maWx0ZXIoZnVuY3Rpb24ob2JqU3ViUHJvY2Vzcyl7XG5cdFx0XHRcdFx0XHRpZiAob2JqU3ViUHJvY2Vzcy5pZCA9PT0gc3ViUHJvY2Vzc0lkICYmIG9ialN1YlByb2Nlc3Muc2VxID09PSBzdWJQcm9jZXNzU2VxKSB7XG5cdFx0XHRcdFx0XHRcdHV1aWQgPSBvYmpTdWJQcm9jZXNzLnV1aWQ7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSlcblx0XHRcdFx0fVxuXHRcdFx0fSlcblx0XHRcdF9XRkluc3RhbmNlLnN1YnByb2Nlc3Nlcy5maWx0ZXIoZnVuY3Rpb24oc3ViUHJvY2Vzc0l0ZW0pe1xuXHRcdFx0XHRpZiAoc3ViUHJvY2Vzc0l0ZW0uX2lkID09PSB1dWlkKSB7XG5cdFx0XHRcdFx0Ly8gU2V0IHRoZSB1c2VyIGRldGFpbHNcblx0XHRcdFx0XHRzdWJQcm9jZXNzSXRlbS5zdGVwLmFzc2lnbmVkVG8udXNlcklkID0gdXNlci5pZDtcblx0XHRcdFx0XHRzdWJQcm9jZXNzSXRlbS5zdGVwLmFzc2lnbmVkVG8ubmFtZSA9IHVzZXIubmFtZTtcblx0XHRcdFx0XHQvLyBVcGRhdGUgdGhlIGluZGljYXRvcnMgdXNlciBkZXRhaWxzXG5cdFx0XHRcdFx0dmFyIGluZGljYXRvcnMgPSBzdWJQcm9jZXNzSXRlbS5pbmRpY2F0b3JzO1xuXHRcdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgaW5kaWNhdG9ycy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRcdFx0dmFyIGluZGljYXRvciA9IGluZGljYXRvcnNbaV07XG5cdFx0XHRcdFx0XHRmb3IgKHZhciBqID0gMDsgaiA8IGluZGljYXRvci5pbnN0YW5jZXMubGVuZ3RoOyBqKyspIHtcblx0XHRcdFx0XHRcdFx0dmFyIGluc3RhbmNlID0gaW5kaWNhdG9yLmluc3RhbmNlc1tqXTtcblx0XHRcdFx0XHRcdFx0Zm9yICh2YXIgayA9IDA7IGsgPCBfV0ZJbnN0YW5jZS5pbmRpY2F0b3JzLmxlbmd0aDsgaysrKSB7XG5cdFx0XHRcdFx0XHRcdFx0dmFyIGRvYyA9IF9XRkluc3RhbmNlLmluZGljYXRvcnNba107XG5cdFx0XHRcdFx0XHRcdFx0aWYgKGluc3RhbmNlLnV1aWQgPT09IGRvYy5faWQpIHtcblx0XHRcdFx0XHRcdFx0XHRcdGRvYy53b3JrZmxvd3MuZmlsdGVyKGZ1bmN0aW9uKHdvcmtmbG93KXtcblx0XHRcdFx0XHRcdFx0XHRcdFx0aWYgKHdvcmtmbG93LmlkID09PSBfV0ZJbnN0YW5jZS5jb25maWcuX2lkKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0d29ya2Zsb3cucHJvY2Vzc2VzLmZpbHRlcihmdW5jdGlvbihwcm9jZXNzSXRlbSl7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRpZiAocHJvY2Vzc0l0ZW0uaWQgPT09IHByb2Nlc3NJZCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQvLyBVcGRhdGUgdGhlIHVzZXIgaWQgYW5kIG5hbWUgaW4gdGhlIGRvY3VtZW50XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHByb2Nlc3NJdGVtLnN0ZXAuYXNzaWduZWRUby51c2VySWQgPSB1c2VyLmlkO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRwcm9jZXNzSXRlbS5zdGVwLmFzc2lnbmVkVG8ubmFtZSA9IHVzZXIubmFtZTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR9KVxuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHR9KVxuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHR2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnVXNlciBhc3NpZ25lZCBzdWNjZXNzZnVsbHkuIFVzZXJJZDogXCInICsgdXNlci5pZCArICdcIiwgTmFtZTogXCInICsgdXNlci5uYW1lICsgJ1wiJywgc3ViUHJvY2Vzc0l0ZW0pO1xuXHRcdFx0XHRcdHJlc29sdmUoc3VjY2Vzcyk7XG5cdFx0XHRcdH1cblx0XHRcdH0pXG5cdFx0fSBjYXRjaChlcnIpe1xuXHRcdFx0cmVqZWN0KGVycik7XG5cdFx0fVxuXHR9KTtcbn07XG4vKipcbiAqIFByb2Nlc3MgaW5kaWNhdG9yIGRvY3VtZW50IHVwZGF0ZXNcbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gYWN0aW9ucyAtIHRoZSBhY3Rpb25zIGNvbmZpZyBkYXRhXG4gKiBAcGFyYW0ge29iamVjdH0gc3ViUHJvY2VzcyAtIHRoZSBjdXJyZW50IHN1Yi1wcm9jZXNzIGZvcm0gY29uZmlnIGRhdGFcbiAqIEBwYXJhbSB7b2JqZWN0fSBfV0ZJbnN0YW5jZSAtIHRoZSBjdXJyZW50IHdvcmtmbG93IGNvbnN0cnVjdG9yIGluc3RhbmNlXG4gKlxuICogQGV4YW1wbGUgJydcbiAqXG4gKiBAcmV0dXJuICcnXG4gKlxuICovXG5mdW5jdGlvbiBpbmRpY2F0b3JEb2NzKHByb2Nlc3NJZCwgaW5kaWNhdG9ycywgc3RlcCwgX1dGSW5zdGFuY2Upe1xuXHRyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG5cdFx0dHJ5IHtcblx0XHRcdC8vIFVwZGF0ZSB0aGUgaW5kaWNhdG9yIHNlY3Rpb25zIG9mIHRoZSBzdWJQcm9jZXNzXG5cdFx0XHRpZiAoaW5kaWNhdG9ycyA9PT0gdW5kZWZpbmVkKXtcblx0XHRcdFx0dmFyIGVycm9yID0gdXRpbC5lcnJvcignV0ZJbmRpY2F0b3JzVXBkYXRlJywgJ0luZGljYXRvcnMgcGFyYW1ldGVyIGlzIHJlcXVpcmVkLiAtIFZhbHVlOiAnICsgaW5kaWNhdG9ycylcblx0XHRcdFx0cmVqZWN0KGVycik7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGluZGljYXRvcnMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0XHR2YXIgaW5kaWNhdG9yID0gaW5kaWNhdG9yc1tpXTtcblx0XHRcdFx0XHRmb3IgKHZhciBqID0gMDsgaiA8IGluZGljYXRvci5pbnN0YW5jZXMubGVuZ3RoOyBqKyspIHtcblx0XHRcdFx0XHRcdHZhciBpbnN0YW5jZSA9IGluZGljYXRvci5pbnN0YW5jZXNbal07XG5cdFx0XHRcdFx0XHRmb3IgKHZhciBrID0gMDsgayA8IF9XRkluc3RhbmNlLmluZGljYXRvcnMubGVuZ3RoOyBrKyspIHtcblx0XHRcdFx0XHRcdFx0dmFyIGRvYyA9IF9XRkluc3RhbmNlLmluZGljYXRvcnNba107XG5cdFx0XHRcdFx0XHRcdGlmIChpbnN0YW5jZS51dWlkID09PSBkb2MuX2lkKSB7XG5cdFx0XHRcdFx0XHRcdFx0ZG9jLndvcmtmbG93cy5maWx0ZXIoZnVuY3Rpb24od29ya2Zsb3cpe1xuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKHdvcmtmbG93LmlkID09PSBfV0ZJbnN0YW5jZS5jb25maWcuX2lkKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdHdvcmtmbG93LnByb2Nlc3Nlcy5maWx0ZXIoZnVuY3Rpb24ocHJvY2Vzc0l0ZW0pe1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGlmIChwcm9jZXNzSXRlbS5pZCA9PT0gcHJvY2Vzc0lkKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRwcm9jZXNzSXRlbS5zdGVwLmlkID0gc3RlcC5pZDtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHByb2Nlc3NJdGVtLnN0ZXAuc2VxID0gc3RlcC5zZXE7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRwcm9jZXNzSXRlbS5zdGVwLnN0YXR1cyA9IHN0ZXAuc3RhdHVzO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0cHJvY2Vzc0l0ZW0uc3RlcC5tZXNzYWdlID0gc3RlcC5tZXNzYWdlO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0cHJvY2Vzc0l0ZW0uc3RlcC5hc3NpZ25lZFRvLnVzZXJJZCA9IHN0ZXAuYXNzaWduZWRUby51c2VySWQ7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRwcm9jZXNzSXRlbS5zdGVwLmFzc2lnbmVkVG8ubmFtZSA9IHN0ZXAuYXNzaWduZWRUby5uYW1lO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0cHJvY2Vzc0l0ZW0uc3RlcC5jb21tZW50ID0gc3RlcC5jb21tZW50ICE9PSB1bmRlZmluZWQgPyBzdGVwLmNvbW1lbnQgOiAnJztcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHRcdH0pXG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0fSlcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHR2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnSW5kaWNhdG9yIGRvY3VtZW50cyB3b3JrZmxvdyBwcm9jZXNzIG1vZGVsIHVwZGF0ZWQuJywgX1dGSW5zdGFuY2UpO1xuXHRcdFx0XHRyZXNvbHZlKHN1Y2Nlc3MpO1xuXHRcdFx0fVxuXHRcdH0gY2F0Y2goZXJyKSB7XG5cdFx0XHRyZWplY3QoZXJyKTtcblx0XHR9XG5cdH0pXG59O1xuXG4vKipcbiAqIFByb2Nlc3MgYWN0aW9uc1xuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBhY3Rpb25zIC0gdGhlIGFjdGlvbnMgY29uZmlnIGRhdGFcbiAqIEBwYXJhbSB7b2JqZWN0fSBzdWJQcm9jZXNzIC0gdGhlIGN1cnJlbnQgc3ViLXByb2Nlc3MgZm9ybSBjb25maWcgZGF0YVxuICogQHBhcmFtIHtvYmplY3R9IF9XRkluc3RhbmNlIC0gdGhlIGN1cnJlbnQgd29ya2Zsb3cgY29uc3RydWN0b3IgaW5zdGFuY2VcbiAqXG4gKiBAZXhhbXBsZSAnJ1xuICpcbiAqIEByZXR1cm4gJydcbiAqXG4gKi9cbmZ1bmN0aW9uIGFjdGlvbnMoYWN0aW9ucywgcHJvY2Vzc0lkLCBwcm9jZXNzU2VxLCBzdWJQcm9jZXNzSWQsIHN1YlByb2Nlc3NTZXEsIHN1YlByb2Nlc3MsIHN0ZXAsIF9XRkluc3RhbmNlKXtcblx0dmFyIGFyckFjdGlvbnMgPSBbXTtcblx0cmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuXHRcdHV0aWwuc3luY0xvb3AoYWN0aW9ucy5sZW5ndGgsIGZ1bmN0aW9uKGxvb3Ape1xuXHRcdFx0dmFyIGNvdW50ZXIgPSBsb29wLml0ZXJhdGlvbigpO1xuXHRcdFx0YWN0aW9uKGFjdGlvbnNbY291bnRlcl0sIHByb2Nlc3NJZCwgcHJvY2Vzc1NlcSwgc3ViUHJvY2Vzc0lkLCBzdWJQcm9jZXNzU2VxLCBzdWJQcm9jZXNzLCBzdGVwLCBfV0ZJbnN0YW5jZSkudGhlbihmdW5jdGlvbihyZXN1bHQpe1xuXHRcdFx0XHR2YXIgcmV0QWN0aW9uID0geyBpZDogYWN0aW9uc1tjb3VudGVyXS5faWQsIHNlcTogY291bnRlciwgZGF0YTogcmVzdWx0IH07XG5cdFx0XHRcdGFyckFjdGlvbnMucHVzaChyZXRBY3Rpb24pO1xuXHRcdFx0XHRsb29wLm5leHQoKTtcblx0XHRcdH0sIGZ1bmN0aW9uKGVycil7XG5cdFx0XHRcdGxvb3AuYnJlYWsoKTtcblx0XHRcdFx0cmVqZWN0KGVycik7XG5cdFx0XHR9KTtcblx0XHR9LCBmdW5jdGlvbigpe1xuXHRcdFx0Ly8gT24gY29tcGxldGlvbiBvZiB0aGUgbG9vcFxuXHRcdFx0dmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ0FjdGlvbnMgY29tcGxldGVkIHN1Y2Nlc3NmdWxseS4nLCBhcnJBY3Rpb25zKTtcblx0XHRcdHJlc29sdmUoc3VjY2Vzcyk7XG5cdFx0fSk7XG5cdH0pO1xufTtcblxuLyoqXG4gKiBQcm9jZXNzIGFjdGlvblxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBhY3Rpb24gLSB0aGUgYWN0aW9uIGNvbmZpZyBkYXRhXG4gKiBAcGFyYW0ge29iamVjdH0gc3ViUHJvY2VzcyAtIHRoZSBjdXJyZW50IHN1Yi1wcm9jZXNzIGZvcm0gY29uZmlnIGRhdGFcbiAqIEBwYXJhbSB7b2JqZWN0fSBfV0ZJbnN0YW5jZSAtIHRoZSBjdXJyZW50IHdvcmtmbG93IGNvbnN0cnVjdG9yIGluc3RhbmNlXG4gKlxuICogQGV4YW1wbGUgJydcbiAqXG4gKiBAcmV0dXJuICcnXG4gKlxuICovXG5mdW5jdGlvbiBhY3Rpb24oYWN0aW9uLCBwcm9jZXNzSWQsIHByb2Nlc3NTZXEsIHN1YlByb2Nlc3NJZCwgc3ViUHJvY2Vzc1NlcSwgc3ViUHJvY2Vzcywgc3RlcCwgX1dGSW5zdGFuY2Upe1xuXHRyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG5cdFx0dmFyIGFyZ3MgPSBbXTtcblx0XHR2YXIgY29udGV4dCA9ICdnbG9iYWwnO1xuXHRcdHZhciBtZXRob2QgPSAnJztcblx0XHRpZiAoYWN0aW9uLl9pZCAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRjb250ZXh0ID0gYWN0aW9uLl9pZC5zcGxpdChcIi5cIilbMF07XG5cdFx0fVxuXHRcdGlmIChhY3Rpb24uX2lkICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdG1ldGhvZCA9IGFjdGlvbi5faWQuc3BsaXQoXCIuXCIpWzFdO1xuXHRcdH1cblx0XHRhcmdzLmxlbmd0aCA9IDA7XG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBhY3Rpb24uX2FyZ3MubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBhcmcgPSBhY3Rpb24uX2FyZ3NbaV07XG5cdFx0XHRzd2l0Y2goYXJnKSB7XG5cdFx0XHRcdGNhc2UgJ3Byb2Nlc3NJZCc6XG5cdFx0XHRcdFx0YXJncy5wdXNoKHByb2Nlc3NJZCk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgJ3Byb2Nlc3NTZXEnOlxuXHRcdFx0XHRcdGFyZ3MucHVzaChwcm9jZXNzU2VxKTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSAnc3ViUHJvY2Vzc0lkJzpcblx0XHRcdFx0XHRhcmdzLnB1c2goc3ViUHJvY2Vzc0lkKTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSAnc3ViUHJvY2Vzc1NlcSc6XG5cdFx0XHRcdFx0YXJncy5wdXNoKHN1YlByb2Nlc3NTZXEpO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlICdzdWJQcm9jZXNzJzpcblx0XHRcdFx0XHRhcmdzLnB1c2goc3ViUHJvY2Vzcyk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgJ3N0ZXAnOlxuXHRcdFx0XHRcdGFyZ3MucHVzaChzdGVwKTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Ly8gQWRkIHRoZSByZXF1aXJlZCBwYXJhbWV0ZXJzIHRvIHRoZSBhcmdzIGFycmF5XG5cblx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHRhcmdzID0gW107XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGFyZ3MucHVzaChfV0ZJbnN0YW5jZSk7XG5cdFx0aWYgKGFjdGlvbi5faWQgPT09ICdmb3JtLmNyZWF0ZScpIHtcblx0XHRcdGZvcm0uY3JlYXRlKGFyZ3MpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KXtcblx0XHRcdFx0cmVzb2x2ZShyZXN1bHQuZGF0YSk7XG5cdFx0XHR9LCBmdW5jdGlvbihlcnIpe1xuXHRcdFx0XHRyZWplY3QoZXJyKTtcblx0XHRcdH0pO1xuXHRcdH0gZWxzZSBpZiAoYWN0aW9uLl9pZCA9PT0gJ2Zvcm0uYXV0aG9yaXNlJykge1xuXHRcdFx0Zm9ybS5hdXRob3Jpc2UoYXJncykudGhlbihmdW5jdGlvbihyZXN1bHQpe1xuXHRcdFx0XHRyZXNvbHZlKHJlc3VsdC5kYXRhKTtcblx0XHRcdH0sIGZ1bmN0aW9uKGVycil7XG5cdFx0XHRcdHJlamVjdChlcnIpO1xuXHRcdFx0fSk7XG5cdFx0fSBlbHNlIGlmIChhY3Rpb24uX2lkID09PSAnZm9ybS5jbG9zZScpIHtcblx0XHRcdGZvcm0uY2xvc2UoYXJncykudGhlbihmdW5jdGlvbihyZXN1bHQpe1xuXHRcdFx0XHRyZXNvbHZlKHJlc3VsdC5kYXRhKTtcblx0XHRcdH0sIGZ1bmN0aW9uKGVycil7XG5cdFx0XHRcdHJlamVjdChlcnIpO1xuXHRcdFx0fSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHZhciBlcnJvciA9IHV0aWwuZXJyb3IoJ1dGQWN0aW9uRXJyb3InLCAnTWV0aG9kOiAnICsgYWN0aW9uX2lkICsgJyBub3QgZGVmaW5lZC4nKTtcblx0XHRcdHJlamVjdChlcnJvcik7XG5cdFx0fVxuXHRcdC8vIGlmIChjb250ZXh0ID09PSAnZm9ybScpIHtcblx0XHQvLyBcdGZvcm1bbWV0aG9kXShhcmdzKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCl7XG5cdFx0Ly8gXHRcdHJlc29sdmUocmVzdWx0LmRhdGEpO1xuXHRcdC8vIFx0fSwgZnVuY3Rpb24oZXJyKXtcblx0XHQvLyBcdFx0cmVqZWN0KGVycik7XG5cdFx0Ly8gXHR9KTtcblx0XHQvLyB9IGVsc2Uge1xuXHRcdC8vIFx0dmFyIGVycm9yID0gdXRpbC5lcnJvcignV0ZBY3Rpb25FcnJvcicsICdNb2R1bGU6ICcgKyBjb250ZXh0ICsgJyBub3QgZGVmaW5lZC4nKTtcblx0XHQvLyBcdHJlamVjdChlcnJvcik7XG5cdFx0Ly8gfVxuXHR9KTtcbn07XG5cbi8qKlxuICogUHJvY2VzcyB0YXNrXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IHRhc2sgLSB0aGUgdGFzayBjb25maWcgZGF0YVxuICogQHBhcmFtIHtvYmplY3R9IGlucHV0RGF0YSAtIHRoZSB1c2VyIGlucHV0IGRhdGFcbiAqXG4gKiBAZXhhbXBsZSAnJ1xuICpcbiAqIEByZXR1cm4gJydcbiAqXG4gKi9cbmZ1bmN0aW9uIHRhc2sodGFzayl7XG5cdHJldHVybiAnSW1wbGVtZW50YXRpb24gcGVuZGluZy4uJztcbn07XG5cbi8qKlxuICogUHJvY2VzcyB0cmFuc2l0aW9uXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHByb2Nlc3NJZCAtIHRoZSBXb3JrZmxvdyBjb25maWcgLyBkZWZpbml0aW9uIHByb2Nlc3MgaWRcbiAqIEBwYXJhbSB7bnVtYmVyfSBwcm9jZXNzU2VxIC0gdGhlIFdvcmtmbG93IGluc3RhbmNlIHByb2Nlc3Mgc2VxXG4gKiBAcGFyYW0ge3N0cmluZ30gc3ViUHJvY2Vzc0lkIC0gdGhlIFdvcmtmbG93IGNvbmZpZyAvIGRlZmluaXRpb24gc3ViLXByb2Nlc3MgaWRcbiAqIEBwYXJhbSB7bnVtYmVyfSBzdWJQcm9jZXNzU2VxIC0gdGhlIFdvcmtmbG93IGluc3RhbmNlIHN1Yi1wcm9jZXNzIHNlcVxuICogQHBhcmFtIHtzdHJpbmd9IHN0ZXBJZCAtIHRoZSBXb3JrZmxvdyBjb25maWcgLyBkZWZpbml0aW9uIHN0ZXAgaWRcbiAqIEBwYXJhbSB7c3RyaW5nfSB0cmFuc2l0aW9uSWQgLSB0aGUgV29ya2Zsb3cgY29uZmlnIC8gZGVmaW5pdGlvbiB0cmFuc2l0aW9uIGlkXG4gKiBAcGFyYW0ge29iamVjdH0gZGF0YSAtIGFueSBhZGRpdGlvbmFsIGRhdGEgcGFzc2VkIGluIGFzIGtleSB2YWx1ZSBwYWlyc1xuICogQHBhcmFtIHtvYmplY3R9IF9XRkluc3RhbmNlIC0gdGhlIGN1cnJlbnQgd29ya2Zsb3cgY29uc3RydWN0b3IgaW5zdGFuY2VcbiAqXG4gKiBAZXhhbXBsZSAnJ1xuICpcbiAqIEByZXR1cm4gJydcbiAqXG4gKi9cbmZ1bmN0aW9uIHRyYW5zaXRpb24ocHJvY2Vzc0lkLCBwcm9jZXNzU2VxLCBzdWJQcm9jZXNzSWQsIHN1YlByb2Nlc3NTZXEsIHN0ZXBJZCwgdHJhbnNpdGlvbklkLCBkYXRhLCBfV0ZJbnN0YW5jZSl7XG5cdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcblx0XHR0cnkge1xuXHRcdFx0dmFyIHN0ZXBTZXEgPSAwO1xuXHRcdFx0dmFyIG5leHRTdGVwSWQgPSAnJztcblx0XHRcdHZhciBuZXh0U3RlcFNlcSA9IDA7XG5cdFx0XHR2YXIgc3ViUHJvY2VzcyA9IFtdO1xuXHRcdFx0dmFyIGN1cnJlbnRQcm9jZXNzID0gX1dGSW5zdGFuY2UuY29uZmlnLnByb2Nlc3Nlcy5maWx0ZXIoZnVuY3Rpb24ob2JqUHJvY2Vzcyl7XG5cdFx0XHRcdGlmIChvYmpQcm9jZXNzLl9pZCA9PT0gcHJvY2Vzc0lkKSB7XG5cdFx0XHRcdFx0cmV0dXJuIG9ialByb2Nlc3M7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdFx0dmFyIGN1cnJlbnRTdWJQcm9jZXNzID0gY3VycmVudFByb2Nlc3NbMF0uc3ViUHJvY2Vzc2VzLmZpbHRlcihmdW5jdGlvbihvYmpTdWJQcm9jZXNzKXtcblx0XHRcdFx0aWYgKG9ialN1YlByb2Nlc3MuX2lkID09PSBzdWJQcm9jZXNzSWQpIHtcblx0XHRcdFx0XHRyZXR1cm4gb2JqU3ViUHJvY2Vzcztcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0XHR2YXIgY3VycmVudFN0ZXAgPSBjdXJyZW50U3ViUHJvY2Vzc1swXS5zdGVwcy5maWx0ZXIoZnVuY3Rpb24ob2JqU3RlcCl7XG5cdFx0XHRcdGlmIChvYmpTdGVwLl9pZCA9PT0gc3RlcElkKSB7XG5cdFx0XHRcdFx0cmV0dXJuIG9ialN0ZXA7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdFx0dmFyIHRyYW5zaXRpb24gPSBjdXJyZW50U3RlcFswXS50cmFuc2l0aW9ucy5maWx0ZXIoZnVuY3Rpb24ob2JqVHJhbnNpdGlvbil7XG5cdFx0XHRcdGlmIChvYmpUcmFuc2l0aW9uLl9pZCA9PT0gdHJhbnNpdGlvbklkKSB7XG5cdFx0XHRcdFx0cmV0dXJuIG9ialRyYW5zaXRpb247XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBjdXJyZW50U3ViUHJvY2Vzc1swXS5zdGVwcy5sZW5ndGg7IGkrKyl7XG5cdFx0XHRcdGlmIChjdXJyZW50U3ViUHJvY2Vzc1swXS5zdGVwc1tpXS5faWQgPT09IHN0ZXBJZCkge1xuXHRcdFx0XHRcdHN0ZXBTZXEgPSBwYXJzZUludChjdXJyZW50U3ViUHJvY2Vzc1swXS5zdGVwc1tpXS5fc2VxKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0Y3VycmVudFN1YlByb2Nlc3NbMF0uc3RlcHMuZmlsdGVyKGZ1bmN0aW9uKHN0ZXBJdGVtKXtcblx0XHRcdFx0bmV4dFN0ZXBTZXEgPSBzdGVwU2VxICsgMTtcblx0XHRcdFx0aWYgKHBhcnNlSW50KHN0ZXBJdGVtLl9zZXEpID09PSBuZXh0U3RlcFNlcSkge1xuXHRcdFx0XHRcdG5leHRTdGVwSWQgPSBzdGVwSXRlbS5faWQ7XG5cdFx0XHRcdH1cblx0XHRcdH0pXG5cdFx0XHQvLyBjb25zb2xlLmxvZyhfV0ZJbnN0YW5jZS5pbnN0YW5jZSk7XG5cdFx0XHRfV0ZJbnN0YW5jZS5pbnN0YW5jZS5wcm9jZXNzZXMuZmlsdGVyKGZ1bmN0aW9uKG9ialByb2Nlc3Mpe1xuXHRcdFx0XHRpZiAob2JqUHJvY2Vzcy5pZCA9PT0gcHJvY2Vzc0lkICYmIG9ialByb2Nlc3Muc2VxID09PSBwcm9jZXNzU2VxKSB7XG5cdFx0XHRcdFx0b2JqUHJvY2Vzcy5zdWJQcm9jZXNzZXMuZmlsdGVyKGZ1bmN0aW9uKG9ialN1YlByb2Nlc3Mpe1xuXHRcdFx0XHRcdFx0aWYgKG9ialN1YlByb2Nlc3MuaWQgPT09IHN1YlByb2Nlc3NJZCAmJiBvYmpTdWJQcm9jZXNzLnNlcSA9PT0gc3ViUHJvY2Vzc1NlcSkge1xuXHRcdFx0XHRcdFx0XHR2YXIgdXVpZCA9IG9ialN1YlByb2Nlc3MudXVpZDtcblx0XHRcdFx0XHRcdFx0Ly8gc3ViUHJvY2VzcyA9IG9ialN1YlByb2Nlc3M7XG5cdFx0XHRcdFx0XHRcdF9XRkluc3RhbmNlLnN1YnByb2Nlc3Nlcy5maWx0ZXIoZnVuY3Rpb24oc3ViUHJvY2Vzc0l0ZW0pe1xuXHRcdFx0XHRcdFx0XHRcdGlmIChzdWJQcm9jZXNzSXRlbS5faWQgPT09IHV1aWQpIHtcblx0XHRcdFx0XHRcdFx0XHRcdHN1YlByb2Nlc3MgPSBzdWJQcm9jZXNzSXRlbTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH0pXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSlcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0XHR2YXIgbWF4U3RlcHMgPSBjdXJyZW50U3ViUHJvY2Vzc1swXS5zdGVwcy5sZW5ndGg7XG5cdFx0XHRzd2l0Y2godHJhbnNpdGlvblswXS5fdHlwZSkge1xuXHRcdFx0XHRjYXNlICdhdXRvJzpcblx0XHRcdFx0XHRpZiAodHJhbnNpdGlvblswXS5nb1RvLl90eXBlID09PSAnbmV4dFN0ZXAnKSB7XG5cdFx0XHRcdFx0XHRzdGVwKHByb2Nlc3NJZCwgcHJvY2Vzc1NlcSwgc3ViUHJvY2Vzc0lkLCBzdWJQcm9jZXNzU2VxLCBuZXh0U3RlcElkLCBuZXh0U3RlcFNlcSwgZGF0YSwgX1dGSW5zdGFuY2UpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KXtcblx0XHRcdFx0XHRcdFx0aWYgKG5leHRTdGVwU2VxID09PSBtYXhTdGVwcykge1xuXHRcdFx0XHRcdFx0XHRcdHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdBbGwgU3RlcCB0cmFuc2l0aW9ucyBoYXZlIGNvbXBsZXRlZCBzdWNjZXNzZnVsbHkuJywgeyBzdWJQcm9jZXNzQ29tcGxldGU6IHRydWUsIHN0ZXA6IHJlc3VsdC5kYXRhIH0pO1xuXHRcdFx0XHRcdFx0XHRcdHJlc29sdmUoc3VjY2Vzcyk7XG5cdFx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdFx0dmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ1N0ZXAgdHJhbnNpdGlvbiBjb21wbGV0ZWQgc3VjY2Vzc2Z1bGx5LicsIHJlc3VsdC5kYXRhKTtcblx0XHRcdFx0XHRcdFx0XHRyZXNvbHZlKHN1Y2Nlc3MpO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdTdGVwIHRyYW5zaXRpb24gY29tcGxldGVkIHN1Y2Nlc3NmdWxseS4nLCByZXN1bHQuZGF0YSk7XG5cdFx0XHRcdFx0XHRcdHJlc29sdmUoc3VjY2Vzcyk7XG5cdFx0XHRcdFx0XHR9LCBmdW5jdGlvbihlcnIpe1xuXHRcdFx0XHRcdFx0XHRyZWplY3QoZXJyKTtcblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSAndXNlcic6XG5cdFx0XHRcdFx0aWYgKHRyYW5zaXRpb25bMF0uZ29Uby5fdHlwZSA9PT0gJ25leHRTdGVwJykge1xuXHRcdFx0XHRcdFx0c3RlcChwcm9jZXNzSWQsIHByb2Nlc3NTZXEsIHN1YlByb2Nlc3NJZCwgc3ViUHJvY2Vzc1NlcSwgbmV4dFN0ZXBJZCwgbmV4dFN0ZXBTZXEsIGRhdGEsIF9XRkluc3RhbmNlKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCl7XG5cdFx0XHRcdFx0XHRcdGlmIChuZXh0U3RlcFNlcSA9PT0gbWF4U3RlcHMpIHtcblx0XHRcdFx0XHRcdFx0XHR2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnQWxsIFN0ZXAgdHJhbnNpdGlvbnMgaGF2ZSBjb21wbGV0ZWQgc3VjY2Vzc2Z1bGx5LicsIHsgc3ViUHJvY2Vzc0NvbXBsZXRlOiB0cnVlLCBzdGVwOiByZXN1bHQuZGF0YSB9KTtcblx0XHRcdFx0XHRcdFx0XHRyZXNvbHZlKHN1Y2Nlc3MpO1xuXHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRcdHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdTdGVwIHRyYW5zaXRpb24gY29tcGxldGVkIHN1Y2Nlc3NmdWxseS4nLCByZXN1bHQuZGF0YSk7XG5cdFx0XHRcdFx0XHRcdFx0cmVzb2x2ZShzdWNjZXNzKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnU3RlcCB0cmFuc2l0aW9uIGNvbXBsZXRlZCBzdWNjZXNzZnVsbHkuJywgcmVzdWx0LmRhdGEpO1xuXHRcdFx0XHRcdFx0XHRyZXNvbHZlKHN1Y2Nlc3MpO1xuXHRcdFx0XHRcdFx0fSwgZnVuY3Rpb24oZXJyKXtcblx0XHRcdFx0XHRcdFx0cmVqZWN0KGVycik7XG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHR9IGVsc2UgaWYgKHRyYW5zaXRpb25bMF0uZ29Uby5fdHlwZSA9PT0gJ3N0ZXBJZCcpIHtcblx0XHRcdFx0XHRcdHZhciBnb1RvU3RlcElkID0gdHJhbnNpdGlvblswXS5nb1RvLl9zdGVwSWQ7XG5cdFx0XHRcdFx0XHR2YXIgZ29Ub1N0ZXBTZXEgPSAxO1xuXHRcdFx0XHRcdFx0Y3VycmVudFN1YlByb2Nlc3NbMF0uc3RlcHMuZmlsdGVyKGZ1bmN0aW9uKHN0ZXBJdGVtKXtcblx0XHRcdFx0XHRcdFx0aWYgKHN0ZXBJdGVtLl9pZCA9PT0gZ29Ub1N0ZXBJZCkge1xuXHRcdFx0XHRcdFx0XHRcdGdvVG9TdGVwU2VxID0gcGFyc2VJbnQoc3RlcEl0ZW0uX3NlcSk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH0pXG5cdFx0XHRcdFx0XHRzdGVwKHByb2Nlc3NJZCwgcHJvY2Vzc1NlcSwgc3ViUHJvY2Vzc0lkLCBzdWJQcm9jZXNzU2VxLCBnb1RvU3RlcElkLCBnb1RvU3RlcFNlcSwgZGF0YSwgX1dGSW5zdGFuY2UpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KXtcblx0XHRcdFx0XHRcdFx0aWYgKGdvVG9TdGVwU2VxID09PSBtYXhTdGVwcykge1xuXHRcdFx0XHRcdFx0XHRcdHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdBbGwgU3RlcCB0cmFuc2l0aW9ucyBoYXZlIGNvbXBsZXRlZCBzdWNjZXNzZnVsbHkuJywgeyBzdWJQcm9jZXNzQ29tcGxldGU6IHRydWUsIHN0ZXA6IHJlc3VsdC5kYXRhIH0pO1xuXHRcdFx0XHRcdFx0XHRcdHJlc29sdmUoc3VjY2Vzcyk7XG5cdFx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdFx0dmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ1N0ZXAgdHJhbnNpdGlvbiBjb21wbGV0ZWQgc3VjY2Vzc2Z1bGx5LicsIHJlc3VsdC5kYXRhKTtcblx0XHRcdFx0XHRcdFx0XHRyZXNvbHZlKHN1Y2Nlc3MpO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdHZhciBzdWNjZXNzID0gdXRpbC5zdWNjZXNzKCdTdGVwIHRyYW5zaXRpb24gY29tcGxldGVkIHN1Y2Nlc3NmdWxseS4nLCByZXN1bHQuZGF0YSk7XG5cdFx0XHRcdFx0XHRcdHJlc29sdmUoc3VjY2Vzcyk7XG5cdFx0XHRcdFx0XHR9LCBmdW5jdGlvbihlcnIpe1xuXHRcdFx0XHRcdFx0XHRyZWplY3QoZXJyKTtcblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHR2YXIgZXJyb3IgPSB1dGlsLmVycm9yKCdXRlRyYW5zaXRpb25FcnJvcicsJ1RyYW5zaXRpb24gdHlwZTogJyArIHRyYW5zaXRpb25bMF0uX3R5cGUgKyAnIG5vdCBkZWZpbmVkLicpO1xuXHRcdFx0XHRcdHJlamVjdChlcnJvcik7XG5cdFx0XHR9XG5cdFx0fSBjYXRjaChlcnIpe1xuXHRcdFx0cmVqZWN0KGVycik7XG5cdFx0fVxuXHR9KTtcbn07XG5cbi8qKlxuICogUHJvY2VzcyBwb3N0QWN0aW9uc1xuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBwb3N0QWN0aW9ucyAtIHRoZSBwb3N0QWN0aW9ucyBjb25maWcgZGF0YVxuICpcbiAqIEBleGFtcGxlICcnXG4gKlxuICogQHJldHVybiAnJ1xuICpcbiAqL1xuZnVuY3Rpb24gcG9zdEFjdGlvbnMocG9zdEFjdGlvbnMsIF9XRkluc3RhbmNlKXtcblx0cmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuXHRcdHZhciBjb21wbGV0ZWQgPSBbXTtcblx0XHR0cnkge1xuXHRcdFx0dXRpbC5zeW5jTG9vcChwb3N0QWN0aW9ucy5sZW5ndGgsIGZ1bmN0aW9uKGxvb3Ape1xuXHRcdFx0XHR2YXIgY291bnRlciA9IGxvb3AuaXRlcmF0aW9uKCk7XG5cdFx0XHRcdGFjdGlvbihwb3N0QWN0aW9uc1tjb3VudGVyXSwgX1dGSW5zdGFuY2UpLnRoZW4oZnVuY3Rpb24oZGF0YSl7XG5cdFx0XHRcdFx0Ly8gQ2hlY2sgaWYgYWxsIHByZS1yZXF1aXNpdGVzIGNvbXBsZXRlZCBzdWNjZXNzZnVsbHkuXG5cdFx0XHRcdFx0Y29tcGxldGVkLnB1c2godHJ1ZSk7XG5cdFx0XHRcdFx0bG9vcC5uZXh0KCk7XG5cdFx0XHRcdH0sIGZ1bmN0aW9uKGVycil7XG5cdFx0XHRcdFx0Y29tcGxldGVkLnB1c2goZmFsc2UpO1xuXHRcdFx0XHRcdGxvb3AuYnJlYWsoKTtcblx0XHRcdFx0XHRyZWplY3QoZXJyKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9LCBmdW5jdGlvbigpe1xuXHRcdFx0XHRpZiAoY29tcGxldGVkLmV2ZXJ5KEJvb2xlYW4pKSB7XG5cdFx0XHRcdFx0dmFyIHN1Y2Nlc3MgPSB1dGlsLnN1Y2Nlc3MoJ1Bvc3QtYWN0aW9ucyBjb21wbGV0ZWQgc3VjY2Vzc2Z1bGx5LicsIHt9KTtcblx0XHRcdFx0XHRyZXNvbHZlKHN1Y2Nlc3MpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHZhciBlcnJvciA9IHV0aWwuZXJyb3IoJ1dGUHJlQWN0aW9uc0Vycm9yJywgJ05vdCBhbGwgcG9zdC1hY3Rpb25zIHBhc3NlZC4nKTtcblx0XHRcdFx0XHRyZWplY3QoZXJyb3IpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9IGNhdGNoIChlcnIpIHtcblx0XHRcdHJlamVjdChlcnIpO1xuXHRcdH1cblx0fSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcblxuIFx0cHJlUmVxdWlzaXRlczogcHJlUmVxdWlzaXRlcyxcbiBcdHByZUFjdGlvbnM6IHByZUFjdGlvbnMsXG4gXHRzdWJQcm9jZXNzOiBzdWJQcm9jZXNzLFxuXHRpbmRpY2F0b3JEb2NzOiBpbmRpY2F0b3JEb2NzLFxuIFx0dGFzazogdGFzayxcbiBcdHRyYW5zaXRpb246IHRyYW5zaXRpb24sXG5cdGFzc2lnblVzZXI6IGFzc2lnblVzZXJcblxufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIFV0aWxpdHkgTW9kdWxlXG4gKlxuICogQG1vZHVsZSBsaWIvdXRpbFxuICpcbiAqIEBhdXRob3IgQnJlbnQgR29yZG9uXG4gKiBAdmVyc2lvbiAwLjEuMFxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogV29ya2Zsb3cgdXRpbGl0eSBtb2R1bGUgdXNlZCB0byBmb3JtYXQgdGhlIHJldHVybiBhbmQgZXJyb3Igb2JqZWN0cywgYW5kXG4gKiBjb250YWlucyBzb21lIG90aGVyIHV0aWxpdHkgZnVuY3Rpb25zIHN1Y2ggYXMgYSBzeW5jIGxvb3AgYW5kIGNvbXBhcmUuXG4gKlxuICovXG5cbi8qKlxuICogU3VjY2VzcyBibG9jayByZXR1cm4gb2JqZWN0LCBjb250YWlucyBhIG1lc3NhZ2UgYW5kIG9wdGlvbmFsIGRhdGEgb2JqZWN0LlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBtZXNzYWdlIC0gdGhlIHN1Y2Nlc3MgbWVzc2FnZVxuICogQHBhcmFtIHtzdHJpbmd8T2JqZWN0fSBbZGF0YV0gLSB0aGUgc3VjY2VzcyByZXR1cm5lZCBkYXRhXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIFJldHVybiBzdWNjZXNzIHdpdGhvdXQgYSBkYXRhIGJsb2NrXG4gKiB2YXIgc3VjY2VzcyA9IHV0aWwuc3VjY2VzcygnU3VjY2VzcyBtZXNzYWdlIGdvZXMgaGVyZS4uLicpO1xuICpcbiAqIEByZXR1cm4ge09iamVjdH0gLSB3aXRoIG1lc3NhZ2UgYW5kIGRhdGEgcHJvcGVydGllc1xuICpcbiAqL1xuZnVuY3Rpb24gc3VjY2VzcyhtZXNzYWdlLCBkYXRhKXtcblx0cmV0dXJuIHtcblx0XHRtZXNzYWdlOiBtZXNzYWdlLFxuXHRcdGRhdGE6IGRhdGFcblx0fTtcbn07XG5cbi8qKlxuICogV2FybmluZyBibG9jayByZXR1cm4gb2JqZWN0LCBjb250YWlucyBhIG1lc3NhZ2UgYW5kIG9wdGlvbmFsIGRhdGEgb2JqZWN0LlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBtZXNzYWdlIC0gdGhlIHdhcm5pbmcgbWVzc2FnZVxuICogQHBhcmFtIHtzdHJpbmd8T2JqZWN0fSBbZGF0YV0gLSB0aGUgcmV0dXJuZWQgZGF0YVxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBSZXR1cm4gc3VjY2VzcyB3aXRob3V0IGEgZGF0YSBibG9ja1xuICogdmFyIHN1Y2Nlc3MgPSB1dGlsLndhcm4oJ1dhcm5pbmcgbWVzc2FnZSBnb2VzIGhlcmUuLi4nKTtcbiAqXG4gKiBAcmV0dXJuIHtPYmplY3R9IHdpdGggbWVzc2FnZSBhbmQgZGF0YSBwcm9wZXJ0aWVzLCBhbmQgbG9ncyB0aGUgd2FybmluZyB0byB0aGUgY29uc29sZS5cbiAqXG4gKi9cbmZ1bmN0aW9uIHdhcm4obWVzc2FnZSwgZGF0YSl7XG5cdGNvbnNvbGUud2FybihkYXRhKTtcblx0cmV0dXJuIHtcblx0XHR3YXJuaW5nOiBtZXNzYWdlLFxuXHRcdGRhdGE6IGRhdGFcblx0fTtcbn07XG5cbi8qKlxuICogRXJyb3IgYmxvY2sgSlMgZXJyb3Igb2JqZWN0LCBjb250YWlucyBhIGNvZGUgYW5kIG1lc3NhZ2UgZm9yIHRoZSBlcnJvci5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gY29kZSAtIHRoZSBlcnJvciBjb2RlXG4gKiBAcGFyYW0ge3N0cmluZ30gbWVzc2FnZSAtIHRoZSBlcnJvciBtZXNzYWdlXG4gKlxuICogQGV4YW1wbGVcbiAqIHZhciBzdWNjZXNzID0gdXRpbC5lcnJvcignRXJyb3IwMDEnLCdFcnJvciBtZXNzYWdlIGdvZXMgaGVyZS4uLicpO1xuICpcbiAqIEByZXR1cm4ge09iamVjdH0gd2l0aCBhIGNvZGUgYW5kIG1lc3NhZ2UgcHJvcGVydGllcy5cbiAqXG4gKi9cbmZ1bmN0aW9uIGVycm9yKGNvZGUsIG1lc3NhZ2Upe1xuXHR2YXIgZXJyID0gbmV3IEVycm9yKCcnKTtcblx0ZXJyLm5hbWUgPSBjb2RlO1xuXHRlcnIubWVzc2FnZSA9IG1lc3NhZ2U7XG5cdHJldHVybiBlcnI7XG59O1xuXG4vKipcbiAqIEEgbG9vcCB3aGljaCBjYW4gbG9vcCBYIGFtb3VudCBvZiB0aW1lcywgd2hpY2ggY2FycmllcyBvdXRcbiAqIGFzeW5jaHJvbm91cyBjb2RlLCBidXQgd2FpdHMgZm9yIHRoYXQgY29kZSB0byBjb21wbGV0ZSBiZWZvcmUgbG9vcGluZy5cbiAqXG4gKiBAcGFyYW0ge251bWJlcn0gaXRlcmF0aW9ucyAtIHRoZSBudW1iZXIgb2YgaXRlcmF0aW9ucyB0byBjYXJyeSBvdXRcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IHByb2Nlc3MgLSB0aGUgY29kZS9mdW5jdGlvbiB3ZSdyZSBydW5uaW5nIGZvciBldmVyeVxuICogaXRlcmF0aW9uXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBleGl0IC0gYW4gb3B0aW9uYWwgY2FsbGJhY2sgdG8gY2Fycnkgb3V0IG9uY2UgdGhlIGxvb3BcbiAqIGhhcyBjb21wbGV0ZWRcbiAqXG4gKiBAZXhhbXBsZVxuICogdXRpbC5zeW5jTG9vcCg1LCBmdW5jdGlvbihsb29wKXtcbiAqIFx0dmFyIGNvdW50ZXIgPSBsb29wLml0ZXJhdGlvbigpO1xuICogXHQvLyBBZGQgYXN5bmMgY2FsbHMgaGVyZS4uXG4gKlxuICogfSwgZnVuY3Rpb24oKXtcbiAqIFx0Ly8gT24gY29tcGxldGUgcGVyZm9ybSBhY3Rpb25zIGhlcmUuLi5cbiAqXG4gKiB9KTtcbiAqXG4gKiBAcmV0dXJuIHtPYmplY3R9IHRoZSBsb29wIGNvbnRyb2wgb2JqZWN0LlxuICpcbiAqL1xuZnVuY3Rpb24gc3luY0xvb3AoaXRlcmF0aW9ucywgcHJvY2VzcywgZXhpdCl7XG4gICAgdmFyIGluZGV4ID0gMCxcbiAgICAgICAgZG9uZSA9IGZhbHNlLFxuICAgICAgICBzaG91bGRFeGl0ID0gZmFsc2U7XG4gICAgdmFyIGxvb3AgPSB7XG4gICAgICAgIG5leHQ6ZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIGlmKGRvbmUpe1xuICAgICAgICAgICAgICAgIGlmKHNob3VsZEV4aXQgJiYgZXhpdCl7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBleGl0KCk7IC8vIEV4aXQgaWYgd2UncmUgZG9uZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIElmIHdlJ3JlIG5vdCBmaW5pc2hlZFxuICAgICAgICAgICAgaWYoaW5kZXggPCBpdGVyYXRpb25zKXtcbiAgICAgICAgICAgICAgICBpbmRleCsrOyAvLyBJbmNyZW1lbnQgb3VyIGluZGV4XG4gICAgICAgICAgICAgICAgcHJvY2Vzcyhsb29wKTsgLy8gUnVuIG91ciBwcm9jZXNzLCBwYXNzIGluIHRoZSBsb29wXG4gICAgICAgICAgICAvLyBPdGhlcndpc2Ugd2UncmUgZG9uZVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBkb25lID0gdHJ1ZTsgLy8gTWFrZSBzdXJlIHdlIHNheSB3ZSdyZSBkb25lXG4gICAgICAgICAgICAgICAgaWYoZXhpdCkgZXhpdCgpOyAvLyBDYWxsIHRoZSBjYWxsYmFjayBvbiBleGl0XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGl0ZXJhdGlvbjpmdW5jdGlvbigpe1xuICAgICAgICAgICAgcmV0dXJuIGluZGV4IC0gMTsgLy8gUmV0dXJuIHRoZSBsb29wIG51bWJlciB3ZSdyZSBvblxuICAgICAgICB9LFxuICAgICAgICBicmVhazpmdW5jdGlvbihlbmQpe1xuICAgICAgICAgICAgZG9uZSA9IHRydWU7IC8vIEVuZCB0aGUgbG9vcFxuICAgICAgICAgICAgc2hvdWxkRXhpdCA9IGVuZDsgLy8gUGFzc2luZyBlbmQgYXMgdHJ1ZSBtZWFucyB3ZSBzdGlsbCBjYWxsIHRoZSBleGl0IGNhbGxiYWNrXG4gICAgICAgIH1cbiAgICB9O1xuICAgIGxvb3AubmV4dCgpO1xuICAgIHJldHVybiBsb29wO1xufTtcblxuZnVuY3Rpb24gY29tcGFyZShzdWJqZWN0LCBvcGVyYXRvciwgdmFsdWUpIHtcbiAgXHRzd2l0Y2ggKG9wZXJhdG9yKSB7XG4gIFx0XHRjYXNlICdncmVhdGVyVGhhbic6XG5cdFx0XHRyZXR1cm4gc3ViamVjdCA+IHZhbHVlO1xuXHRcdGNhc2UgJ2xlc3NUaGFuJzpcblx0XHRcdHJldHVybiBzdWJqZWN0IDwgdmFsdWU7XG5cdFx0Y2FzZSAnZ3JlYXRlclRoYW5FcXVhbCc6XG5cdFx0XHRyZXR1cm4gc3ViamVjdCA+PSB2YWx1ZTtcblx0XHRjYXNlICdsZXNzVGhhbkVxdWFsJzpcblx0XHRcdHJldHVybiBzdWJqZWN0IDw9IHZhbHVlO1xuXHRcdGNhc2UgJ2VxdWFsVG8nOlxuXHRcdFx0cmV0dXJuIHN1YmplY3QgPT09IHZhbHVlO1xuXHRcdGNhc2UgJ25vdEVxdWFsVG8nOlxuXHRcdFx0cmV0dXJuIHN1YmplY3QgIT09IHZhbHVlO1xuICBcdH1cbn07XG5cbmZ1bmN0aW9uIGdldE5hbWUoYXJyLCBsYW5nKXtcblx0aWYgKGFyciAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBhcnIubGVuZ3RoIDsgaSsrKSB7XG5cdFx0XHRpZiAoYXJyW2ldLmkxOG4uX2xhbmcgPT09IGxhbmcpIHtcblx0XHRcdFx0cmV0dXJuIGFycltpXS5pMThuLnZhbHVlO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcblxuIFx0c3VjY2Vzczogc3VjY2VzcyxcbiBcdHdhcm46IHdhcm4sXG4gXHRlcnJvcjogZXJyb3IsXG4gXHRzeW5jTG9vcDogc3luY0xvb3AsXG4gXHRjb21wYXJlOiBjb21wYXJlLFxuXHRnZXROYW1lOiBnZXROYW1lXG5cbiB9XG4iXX0=
