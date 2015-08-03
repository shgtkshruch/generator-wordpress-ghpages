
var path = require('path');
var helpers = require('yeoman-generator').test;
var assert = require('yeoman-assert');

describe('WordPress Github Pages generator', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../app'))
      .inDir(path.join(__dirname, 'temp'))
      .on('end', done);
  });

  it('creates expected files', function () {
    assert.file([
      'Vagrantfile'
    ]);
  });
});
