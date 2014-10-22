/*global describe, beforeEach, it*/
'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');
var fs = require('fs')

describe('xmc:app', function() {
  describe('sass:app', function() {
    before(function(done) {
      helpers.run(path.join(__dirname, '../app'))
        .inDir(path.join(os.tmpdir(), './temp-test'))
        .withPrompt({
          style: 'scss'
        })
        .on('end', done);
    });

    it('creates files', function() {
      assert.file([
        'src/home/index.js',
        'src/home/mods/a.js',
        'src/home/views/hello.xtpl',
        'src/home/images/i/fav.png',
        'src/home/images/i/faved.png',
        'src/home/index.scss',
        'src/home/images/_sprites.scss',
        '.editorconfig',
        '.jshintrc',
        '.gitignore',
        'package.json',
        'gulpfile.js',
        'demo/home.html'
      ]);
    });
  });
  describe('less:app', function() {
    before(function(done) {
      helpers.run(path.join(__dirname, '../app'))
        .inDir(path.join(os.tmpdir(), './temp-test'))
        .withPrompt({
          style: 'less'
        })
        .on('end', done);
    });

    it('creates files', function() {
      assert.file([
        'src/home/index.js',
        'src/home/mods/a.js',
        'src/home/views/hello.xtpl',
        'src/home/index.less',
        '.editorconfig',
        '.jshintrc',
        '.gitignore',
        'package.json',
        'gulpfile.js',
        'demo/home.html'
      ]);
    });
  });
  describe('yo xmc:page scss', function() {
    before(function(done) {
      helpers.run(path.join(__dirname, '../page'))
        .inDir(path.join(os.tmpdir(), './temp-test'), function() {
          var data = {
            "name": "xmc-demo",
            "packageName": "xmc-demo",
            "description": "xmc-demo是",
            "version": "1.0.0",
            "author": {
              "name": "宝码",
              "email": "nongyoubao@alibaba-inc.com"
            },
            "scripts": {
              "test": "gulp lint"
            },
            "private": true,
            "style": "scss",
            "repository": {
              "type": "git",
              "url": ""
            },
            "devDependencies": {
              "colors": "~1.0.3",
              "gulp": "~3.8.8",
              "gulp-beautify": "~1.1.0",
              "gulp-jshint": "~1.8.5",
              "jshint-stylish": "~1.0.0",
              "gulp-clean": "~0.3.1",
              "gulp-compass-compile": "~1.0.0",
              "gulp-code": "0.0.5",
              "gulp-copy": "0.0.2",
              "gulp-cssmin": "~0.1.6",
              "gulp-kmc": "0.0.29",
              "gulp-kmd": "~1.0.3",
              "gulp-less": "~1.3.6",
              "gulp-rename": "~1.2.0",
              "gulp-replace": "~0.4.0",
              "gulp-uglify": "~1.0.1",
              "gulp-xtemplate": "~1.2.1",
              "xtemplate": "3.3.0"
            }
          }
          fs.writeFileSync('package.json', JSON.stringify(data))
        })
        .withPrompt({
          pageName: 'test'
        })
        .on('end', done);
    });
    it('creates files', function() {
      assert.file([
        'src/test/index.js',
        'src/test/mods/a.js',
        'src/test/views/hello.xtpl',
        'src/test/images/i/fav.png',
        'src/test/images/i/faved.png',
        'src/test/index.scss',
        'src/test/images/_sprites.scss',
        'demo/test.html'
      ]);
    });
  });
  describe('yo xmc:page less', function() {
    before(function(done) {
      helpers.run(path.join(__dirname, '../page'))
        .inDir(path.join(os.tmpdir(), './abc-test'), function() {
          var data = {
            "name": "xmc-demo",
            "packageName": "xmc-demo",
            "description": "xmc-demo是",
            "version": "1.0.0",
            "author": {
              "name": "宝码",
              "email": "nongyoubao@alibaba-inc.com"
            },
            "scripts": {
              "test": "gulp lint"
            },
            "private": true,
            "style": "less",
            "repository": {
              "type": "git",
              "url": ""
            },
            "devDependencies": {
              "colors": "~1.0.3",
              "gulp": "~3.8.8",
              "gulp-beautify": "~1.1.0",
              "gulp-jshint": "~1.8.5",
              "jshint-stylish": "~1.0.0",
              "gulp-clean": "~0.3.1",
              "gulp-compass-compile": "~1.0.0",
              "gulp-code": "0.0.5",
              "gulp-copy": "0.0.2",
              "gulp-cssmin": "~0.1.6",
              "gulp-kmc": "0.0.29",
              "gulp-kmd": "~1.0.3",
              "gulp-less": "~1.3.6",
              "gulp-rename": "~1.2.0",
              "gulp-replace": "~0.4.0",
              "gulp-uglify": "~1.0.1",
              "gulp-xtemplate": "~1.2.1",
              "xtemplate": "3.3.0"
            }
          };
          var dataJson = JSON.stringify(data);
          fs.writeFileSync('package.json', dataJson);
        })
        .withPrompt({
          pageName: 'abc'
        })
        .on('end', done);
    });
    it('creates files', function() {
      assert.file([
        'src/abc/index.js',
        'src/abc/mods/a.js',
        'src/abc/views/hello.xtpl',
        'src/abc/index.less',
        'demo/abc.html'
      ]);
    });
  });
});
