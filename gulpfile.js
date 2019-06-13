var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var tsify = require('tsify');
var watchify = require("watchify");
var gutil = require("gulp-util");

var path = {
  pages: ['src/*.html']
};

var watchedBrowserify = watchify(browserify({
  basedir: '.',
  debug: true, // tsify在输出文件里生成source maps
  entries: ['src/main.ts'],
  cache: {},
  packageCache: {}
}).plugin(tsify)); // 使用tsify调用browserify

gulp.task('copy-html', function() {
  return gulp.src(path.pages)
    .pipe(gulp.dest('dist'));
});

function bundle() {
  return watchedBrowserify
    .bundle()
    .pipe(source('bundle.js')) // 输出文件名bundle.js
    .pipe(gulp.dest('dist'));
}

gulp.task('default', gulp.series('copy-html', bundle));

watchedBrowserify.on('update', bundle);
watchedBrowserify.on('log', gutil.log);