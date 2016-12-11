const gulp = require('gulp');
const requireDir = require('require-dir');

requireDir('./tasks', { recurse: false });

gulp.task('default', ['development']);
gulp.task('development', ['watch:scss', 'watch:js', 'watch:html', 'watch:fonts']);
gulp.task('build', ['build:scss', 'build:js', 'build:html', 'build:fonts']);
