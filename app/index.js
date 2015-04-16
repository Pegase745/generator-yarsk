'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var slugify = require('underscore.string').slugify;

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
  },

  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the super-excellent ' + chalk.red('Yarsk') + ' generator!'
    ));

    var prompts = [{
      type: 'input',
      name: 'appName',
      default: this.appname,
      message: 'What is your app\'s name ?',
      validate: function(input) {
        return !!input;
      }
    }];

    this.prompt(prompts, function (props) {
      this.props = props;
      this.appName = slugify(this.props.appName);

      done();
    }.bind(this));
  },

  writing: {
    configfiles: function () {
      this.fs.copyTpl(
        this.templatePath('_package.json'),
        this.destinationPath('package.json'),
        { appName: this.appName }
      );
      this.fs.copy(
        this.templatePath('_gitignore'),
        this.destinationPath('.gitignore')
      );
      this.fs.copy(
        this.templatePath('editorconfig'),
        this.destinationPath('.editorconfig')
      );
      this.fs.copy(
        this.templatePath('jshintrc'),
        this.destinationPath('.jshintrc')
      );
      this.fs.copy(
        this.templatePath('eslintrc'),
        this.destinationPath('.eslintrc')
      );
    },

    scaffoldFolders: function(){
      this.directory('app', 'app', this.context);
      this.directory('conf', 'conf', this.context);
    },

    projectfiles: function () {

    }
  },

  install: function () {
    this.installDependencies({
      npm: true,
      bower: false,
      skipInstall: this.options['skip-install']
    });
  }
});
