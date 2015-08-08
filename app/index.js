var generators = require('yeoman-generator');
var _s = require('underscore.string');
var mkdirp = require('mkdirp');

module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments);
  },

  prompting: function () {
    var done = this.async();

    var prompts = [{
      type: 'input',
      name: 'themeName',
      message: 'What is your theme name?',
      value: 'themeName'
    }];

    this.prompt(prompts, function(answers) {
      this.themeName = answers.themeName;
      done();
    }.bind(this));
  },

  writing: {
    git: function () {
      this.fs.copy(
        this.templatePath('gitignore'),
        this.destinationPath('.gitignore'));
    },

    vagrant: function () {
      this.fs.copy(
        this.templatePath('Vagrantfile'),
        this.destinationPath('Vagrantfile'));
    },

    ansible: function () {
      this.directory(
        this.templatePath('ansible'),
        this.destinationPath('ansible'));
    },

    gulp: function () {
      this.fs.copyTpl(
        this.templatePath('gulpfile.js'),
        this.destinationPath('gulpfile.js'),
        {
          themeName: this.themeName,
          name: _s.slugify(this.appname)
        }
      );
    },

    packageJSON: function () {
      this.fs.copyTpl(
        this.templatePath('package.json'),
        this.destinationPath('package.json'),
        {
          name: _s.slugify(this.appname)
        }
      );
    },

    wordpress: function () {
      mkdirp('wordpress/wp-content/themes/' + this.themeName);
      mkdirp('static');
    }
  },

  install: function () {
    this.installDependencies({
      bower: false,
      npm: true,
      skipInstall: this.options['skip-install']
    });
  }

});
