var generators = require('yeoman-generator');

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
          themeName: this.themeName
        }
      );
    }
  }
});
