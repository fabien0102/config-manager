/*
* config.js
*
* @param {String} [path="configs"] - path of configs directory
* @return {Object} consolidate configs
*/

var fs = require("fs");
var _ = require("lodash");

module.exports = function (path) {
  var configs = {};

  // Default path
  if (!_.isString(path)) path = "configs";

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
    if (!_.isEmpty(moduleName)) _.extend(configs, require("../" + path + "/" + moduleName[1]));
    return _.isEmpty(moduleName);
  }

  var modulesPaths = fs.readdirSync(path);

  // Global configurations
  var defaultRegEx = new RegExp("^(?!local)([aA-zZ]*)\.js$");
  modulesPaths = _.filter(modulesPaths, _.partial(_requireMatchPattern, defaultRegEx) );

  // Local configurations
  var localRegEx = new RegExp("^(.*local)\.js$");
  _.filter(modulesPaths, _.partial(_requireMatchPattern, localRegEx) );

  return configs;
};
