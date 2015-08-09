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
    },

    app: function () {
      this.fs.copy(
        this.templatePath('index.php'),
        this.destinationPath('src/index.php'));

      this.fs.copy(
        this.templatePath('header.php'),
        this.destinationPath('src/header.php'));

      this.fs.copy(
        this.templatePath('footer.php'),
        this.destinationPath('src/footer.php'));

      this.fs.copy(
        this.templatePath('functions.php'),
        this.destinationPath('src/functions.php'));

      this.fs.copyTpl(
        this.templatePath('style.scss'),
        this.destinationPath('src/styles/style.scss'),
        {
          themeName: this.themeName
        }
      );
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
