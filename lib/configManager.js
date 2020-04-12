/*
* config.js
*
* @param {String} [configsPath="configs"] - path of configs directory
* @return {Object} consolidate configs
*/

const fs = require("fs");

module.exports = function (configsPath) {
  let configs = {};

  // Default path
  if (!configsPath) configsPath = "configs";

  /**
  * Require path with matching pattern
  *
  * @private
  * @param {RegExp} regexp
  * @param {String} modulePath
  * @return {Boolean} true if not matching
  **/
  function _requireMatchPattern (regexp, modulePath) {
    const moduleName = regexp.exec(modulePath);
    if (moduleName) configs = {...configs, ...require.main.require( configsPath + "/" + moduleName[1]) };
    return Boolean(!moduleName);
  }

  let modulesPaths = fs.readdirSync(configsPath);

  // Global configurations
  const defaultRegEx = new RegExp("^(?!local)([aA-zZ]*)\.js$");
  modulesPaths = modulesPaths.filter(modulePath => _requireMatchPattern(defaultRegEx, modulePath))

  // Local configurations
  const localRegEx = new RegExp("^(.*local)\.js$");
  modulesPaths = modulesPaths.filter(modulePath => _requireMatchPattern(localRegEx, modulePath))

  return configs;
};
