'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
// var actionNameCreator = require("../../helpers/actionNameCreator");

module.exports = yeoman.Base.extend({
  prompting: function () {
    // Have Yeoman greet the user.
    this.log(yosay(
      `Welcome to RN Test Case Generator`
    ));
  }
});
