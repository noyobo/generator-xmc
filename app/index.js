'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');

// 获取仓库目录名
function getReposName(that) {
  var root = that.env.cwd;
  return path.basename(root);
}

var XmcGenerator = yeoman.generators.Base.extend({
  init: function() {
    this.pkg = require('../package.json');

    this.on('end', function() {
      // if (!this.options['skip-install']) {
      //     this.installDependencies();
      // }

      this.log(chalk.bold.green('初始化完毕'));
      this.log('运行' + chalk.bold.yellow('npm install & bower install') + ' 安装项目依赖');
    });
  },
  hello: function() {
    var done = this.async();
    // 呵呵哈哈
    this.log(chalk.bold.red('欢迎使用虾米项目管理工具 xmc'));

    done();
  },
  askFor: function() {
    var done = this.async();

    this.reposName = getReposName(this);

    var prompts = [{
      name: 'projectName',
      message: '项目名称',
      default: this.reposName
    }, {
      name: 'description',
      message: '项目介绍',
      default: this.reposName + '是'
    }, {
      name: 'version',
      message: '项目版本[x,y,z]',
      default: '1.0.0'
    }, {
      name: 'author',
      message: '作者名',
      default: 'yourname'
    }, {
      name: 'email',
      message: '邮箱地址',
      default: 'yourname@alibaba-inc.com'
    }, {
      name: 'repo',
      message: 'gitLab仓库地址',
      default: null
    }];

    this.prompt(prompts, function(props) {
      this.projectName = props.projectName;
      this.description = props.description;
      this.version = props.version;
      this.author = {
        'name': props.author,
        'email': props.email
      };
      this.repository = {
        'url': props.repo
      };

      done();
    }.bind(this));
  },

  app: function() {
    this.mkdir('app');
    this.mkdir('mods');
    this.mkdir('mods/index');
  },

  projectfiles: function() {
    this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc', '.jshintrc');

    this.template('index.js', 'app/index.js');
  },

  gruntFiles: function() {
    this.copy('_bower.json', 'bower.json');
  },

  packageJSON: function() {
    this.template('_package.json', 'package.json');
  },

  git: function() {
    this.template('_gitignore', '.gitignore');
  }
});

module.exports = XmcGenerator;
