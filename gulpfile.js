'use strict';

var gulp = require('gulp')
var jshint = require('gulp-jshint')
var stylish = require('jshint-stylish')

gulp.task('lint', function() {
  return gulp
    .src(['app/*.js', 'page/*.js'])
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter(stylish))
})
