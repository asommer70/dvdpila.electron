var gulp = require('gulp');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var concat = require('gulp-concat');
var watch = require('gulp-watch');
var path = require('path');
var babelify = require("babelify");
var fs = require('fs');

gulp.task('copy', function() {
  gulp.src(['./src/*.html', './src/css/**/*', './src/js/**/*'], { "base" : "./src/." })
  .pipe(gulp.dest('./build/'));
})

gulp.task('react', function() {
  browserify("./src/app.js")
  .transform("babelify", {presets: ["es2015", "react"]})
  .bundle()
  .pipe(fs.createWriteStream("./build/app.js"));
});

gulp.task('default', ['react', 'copy', 'watch']);

gulp.task('watch', function () {
  gulp.watch('./src/**/*.css', ['copy']);
  gulp.watch('./src/**/*.js', ['react']);
  gulp.watch('./src/**/*.html', ['copy']);
});
