var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments);
  },

  writing: {
    vagrant: function () {
      this.fs.copy(
          this.templatePath('Vagrantfile'),
          this.destinationPath('Vagrantfile'));
    }
  }
});
