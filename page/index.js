'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');
var template = require('template')

// 获取仓库目录名
function getReposName(that) {
  var root = that.env.cwd;
  return path.basename(root);
}

var XmcGenerator = yeoman.generators.Base.extend({
  initializing: function() {
    this.pkg = require('../package.json');
    this.userPkg = require(path.join(this.env.cwd, 'package.json'));
    if (!this.userPkg) {
      this.log(chalk.bold.red('! 工程目录缺少:'), 'package.json');
      return false;
    };
  },
  prompting: function() {
    var done = this.async();
    this.reposName = getReposName(this);
    // Have Yeoman greet the user.
    this.log(chalk.bold.cyan("> Xmc 创建 page!"));
    var prompts = [{
      name: 'pageName',
      message: 'page名称:',
      default: '',
      warning: ''
    }];

    this.prompt(prompts, function(props) {
      this.pageName = props.pageName;
      this.pageName && (this.pageName = this.pageName.trim());
      if (this.pageName) {
        this.pagePath = 'src/' + this.pageName;
        this.userPkg.pageName = this.pageName
        done();
      } else {
        this.log(chalk.bold.red('! page名称不能为空'))
      };
    }.bind(this));
  },
  writing: {
    app: function() {
      this.dest.mkdir(this.pagePath + '/style');
      this.dest.mkdir(this.pagePath + '/images');
      this.dest.mkdir(this.pagePath + '/mods');
      this.dest.mkdir(this.pagePath + '/views');
      var indexTemp = this.src.read('index.js');
      this.dest.write(this.pagePath + '/index.js', template(indexTemp, this.userPkg))
      var modTemp = this.src.read('mod.js');
      this.dest.write(this.pagePath + '/mods/a.js', template(modTemp, this.userPkg))
      this.src.copy('index.less', this.pagePath + '/index.less');
      this.src.copy('views.xtpl', this.pagePath + '/views/hello.xtpl');
    },
    demofiles: function() {
      var demoTemp = this.src.read('demo.html');
      this.dest.write('demo/' + this.pageName + '.html', template(demoTemp, this.userPkg))
    }
  },
  end: function() {
    //this.installDependencies();
    this.log(chalk.bold.green('page'), chalk.bold.yellow(this.pageName), chalk.bold.green('创建完毕'));
  }
});

module.exports = XmcGenerator;
