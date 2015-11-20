/*
* config.js
*
* @param {String} [configsPath="configs"] - path of configs directory
* @return {Object} consolidate configs
*/

var fs = require("fs");
var _ = require("lodash");

module.exports = function (configsPath) {
  var configs = {};

  // Default path
  if (!_.isString(configsPath)) configsPath = "configs";

  /**
  * Require path with matching pattern
  *
  * @private
  * @param {RegExp} regexp
  * @param {String} modulePath
  * @return {Boolean} true if not matching
  **/
  function _requireMatchPattern (regexp, modulePath) {
    var moduleName = regexp.exec(modulePath);
    if (!_.isEmpty(moduleName)) _.extend(configs, require.main.require( configsPath + "/" + moduleName[1]));
    return _.isEmpty(moduleName);
  }

  var modulesPaths = fs.readdirSync(configsPath);

  // Global configurations
  var defaultRegEx = new RegExp("^(?!local)([aA-zZ]*)\.js$");
  modulesPaths = _.filter(modulesPaths, _.partial(_requireMatchPattern, defaultRegEx) );

  // Local configurations
  var localRegEx = new RegExp("^(.*local)\.js$");
  _.filter(modulesPaths, _.partial(_requireMatchPattern, localRegEx) );

  return configs;
};
