var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var tsify = require('tsify');

var path = {
  pages: ['src/*.html']
};

gulp.task('copy-html', function() {
  return gulp.src(path.pages)
    .pipe(gulp.dest('dist'));
});

gulp.task('default', gulp.series('copy-html', function() {
  return browserify({
    basedir: '.',
    debug: true, // tsify在输出文件里生成source maps
    entries: ['src/main.ts'],
    cache: {},
    packageCache: {}
  })
    .plugin(tsify) // 使用tsify调用browserify
    .bundle()
    .pipe(source('bundle.js')) // 输出文件名bundle.js
    .pipe(gulp.dest('dist'));
}));