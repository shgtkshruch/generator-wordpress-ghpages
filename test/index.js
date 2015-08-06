
var path = require('path');
var helpers = require('yeoman-generator').test;
var assert = require('yeoman-assert');

describe('WordPress Github Pages generator', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../app'))
      .inDir(path.join(__dirname, 'temp'))
      .withOptions({
        'skip-install': true
      })
      .withPrompts({
        themeName: 'wordpress-ghpages'
      })
      .on('end', done);
  });

  it('creates expected files', function () {
    assert.file([
      '.gitignore',
      'package.json',
      'gulpfile.js',
      'Vagrantfile',
      'ansible/playbook.yml',
      'ansible/group_vars/all',
      'ansible/roles/apache/tasks/main.yml',
      'ansible/roles/apache/files/httpd.conf',
      'ansible/roles/apache/handlers/main.yml',
      'ansible/roles/common/files/bash_profile',
      'ansible/roles/common/tasks/main.yml',
      'ansible/roles/mysql/files/my.cnf',
      'ansible/roles/mysql/tasks/main.yml',
      'ansible/roles/peco/files/config.json',
      'ansible/roles/peco/tasks/main.yml',
      'ansible/roles/php/tasks/main.yml',
      'ansible/roles/phpmyadmin/files/config.inc.php',
      'ansible/roles/phpmyadmin/tasks/main.yml',
      'ansible/roles/wordpress/tasks/main.yml',
      'ansible/roles/wordpress/templates/wp-config.php',
      'ansible/roles/wp-cli/tasks/main.yml',
      'ansible/roles/wp-cli/files/config.yml'
    ]);

    assert.fileContent('package.json', '"name": "temp"');
    assert.fileContent('gulpfile.js', "dest: 'wordpress/wp-content/themes/wordpress-ghpages'");
    assert.fileContent('gulpfile.js', 'static/temp');
  });
});
