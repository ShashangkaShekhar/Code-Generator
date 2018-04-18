'use strict';

var through = require('through2'),
  PluginError = require('plugin-error'),
  htmlclean = require('htmlclean'),

  PLUGIN_NAME = 'gulp-htmlclean';

module.exports = function(options) {
  return through.obj(function(file, encoding, callback) {
    if (file.isNull()) {
      return callback(null, file);
    }
    if (file.isStream()) {
      return callback(new PluginError(PLUGIN_NAME, 'Streaming not supported'));
    }

    var content = htmlclean(file.contents.toString(), options);
    // Check `allocUnsafe` to make sure of the new API.
    file.contents = Buffer.allocUnsafe && Buffer.from ? Buffer.from(content) : new Buffer(content);
    callback(null, file);
  });
};
