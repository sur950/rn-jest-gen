'use strict';
const yeoman = require('yeoman-generator');
const yosay = require('yosay');

module.exports = yeoman.Base.extend({
  prompting: function () {
    // Yeoman Greet message to user
    this.log(yosay(
      `Welcome to RN Test Case Generator`
    ));
  }
});
