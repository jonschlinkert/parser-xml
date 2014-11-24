'use strict';

/**
 * Module dependencies.
 */

var fs = require('fs');
var extend = require('extend-shallow');

/**
 * Requires cache
 */

var requires = {};

/**
 * Expose `parser`
 */

var parser = module.exports;

/**
 * Parse the given `str` of XML and callback `cb(err, data)`.
 *
 * @name .parse
 * @param {String|Object} `str` The object or string to parse.
 * @param {Object|Function} `options` or `cb` callback function.
 * @param {Function} `cb` callback function.
 * @api public
 */

parser.parse = function(str, options, cb) {
  var xml = requires.xml || (requires.xml = require('xml2js'));
  if (typeof options === 'function') {
    cb = options;
    options = {};
  }

  var opts = extend({explicitArray: true}, options);
  try {
    var XML = new xml.Parser(opts);
    XML.parseString(str, function (err, content) {
      if (err) return cb(err);
      cb(null, content);
    });
  } catch (err) {
    cb(err);
    return;
  }
};

/**
 * XML file support. Parse the given `str` of XML and callback `cb(err, data)`.
 *
 * @param {String|Object} `str` The object or string to parse.
 * @return {Object}
 * @api public
 */

parser.parseFile = function(fp, options, cb) {
  if (typeof options === 'function') {
    cb = options;
    options = {};
  }

  var opts = extend({}, options);
  try {
    fs.readFile(fp, 'utf8', function(err, str) {
      parser.parse(str, opts, cb);
    });
  } catch (err) {
    cb(err);
    return;
  }
};
