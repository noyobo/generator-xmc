'use strict';
// var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
// var yosay = require('yosay');
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
    }
  },
  prompting: function() {
    var done = this.async();
    this.reposName = getReposName(this);
    // Have Yeoman greet the user.
    this.log(chalk.bold.cyan('> Xmc 创建 page!'));
    var style = this.userPkg.style;
    if (!/(scss|less)/.test(style)) {
      this.log(chalk.bold.red('Error:'), chalk.gray('package.json style 不存在或者不为 scss | less 请修改后重新运行!'));
      return false;
    }
    var prompts = [{
      name: 'pageName',
      message: chalk.yellow('page名称'),
      default: '',
      validate: function(input) {
        var done = this.async();
        if (!/\b[-a-z]+\b/.test(input)) {
          done(chalk.red('Error: ') + chalk.gray('! page名称有误 ') + chalk.magenta('[-a-z]'));
          return;
        }
        done(true);
      }
    }];

    this.prompt(prompts, function(props) {
      this.pageName = props.pageName;

      this.pagePath = 'src/' + this.pageName
      this.userPkg.pageName = this.pageName
      done();
    }.bind(this));
  },
  writing: {
    app: function() {
      this.dest.mkdir(this.pagePath + '/images');
      this.dest.mkdir(this.pagePath + '/mods');
      this.dest.mkdir(this.pagePath + '/views');
      var indexTemp = this.src.read('index.js');
      this.dest.write(this.pagePath + '/index.js', template(indexTemp, this.userPkg))
      var modTemp = this.src.read('mod.js');
      this.dest.write(this.pagePath + '/mods/a.js', template(modTemp, this.userPkg))
      this.src.copy('views.xtpl', this.pagePath + '/views/hello.xtpl');
    },
    style: function() {
      var style = this.userPkg.style;
      if (style === 'scss') {
        this.dest.mkdir(this.pagePath + '/scss');
        this.dest.mkdir(this.pagePath + '/images/i');
        this.src.copy('scss/fav.png', this.pagePath + '/images/i/fav.png');
        this.src.copy('scss/faved.png', this.pagePath + '/images/i/faved.png');
        var scssT = this.src.read('scss/index.scss');
        this.dest.write(this.pagePath + '/index.scss', template(scssT, this.userPkg))
        var spriteT = this.src.read('scss/_sprites.scss');
        this.dest.write(this.pagePath + '/images/_sprites.scss', template(spriteT, this.userPkg))
      } else {
        this.dest.mkdir(this.pagePath + '/less');
        this.src.copy('less/index.less', this.pagePath + '/index.less');
      }
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
