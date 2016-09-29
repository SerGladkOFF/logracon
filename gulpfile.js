/**
 * Created by Se on 27.09.2016.
 */
"use strict"
let gulp = require('gulp');
var less = require('gulp-less');
var path = require('path');
let webpack = require('webpack-stream');

gulp.task("js",function () {
    return gulp.src('./src/js/main.js')
         .pipe(webpack( require('./webpack.config.js') ))
         .pipe(gulp.dest("./"));
});

gulp.task('less', function () {
  return gulp.src('./src/less/main.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(gulp.dest('.'));
});

gulp.task('default',["js","less"] ,()=>{
    gulp.watch("./src/less/**",['less']);
    gulp.watch("./src/js/**",['js']);
});