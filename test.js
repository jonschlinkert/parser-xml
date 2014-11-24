/*!
 * parser-xml <https://github.com/jonschlinkert/parser-xml>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT License
 */

'use strict';

var fs = require('fs');
var should = require('should');
var xml = require('./');

describe('xml parser', function() {
  it('should parse a string of XML.', function(done) {
    fs.readFile('fixtures/basic.xml', 'utf8', function(err, str) {
      if (err) { throw err; }

      xml.parse(str, function(err, res) {
        if (err) { throw err; }
        res.should.have.property('sdk:source');
        done()
      });
    });
  });

  it('should parse a `.xml` file.', function(done) {
    xml.parseFile('fixtures/basic.xml', function(err, res) {
      if (err) { throw err; }
      res.should.have.property('sdk:source');
      done();
    });
  });
});