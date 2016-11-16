const gulp = require('gulp');
const PATH = require('path');
const util = require('gulp-util');
const browserSync = require('browser-sync');

const ROOT = '../../';

const HTML_SRC_FILES = [
	PATH.resolve(__dirname, ROOT, 'src/app/manifest.json'),
	PATH.resolve(__dirname, ROOT, 'src/app/app.html'),
];
const HTML_DEVELOPMENT_BUILD_FOLDER = PATH.resolve(__dirname, ROOT, 'dist');
const HTML_PRODUCTION_BUILD_FOLDER = PATH.resolve(__dirname, ROOT, 'dist');

gulp.task('build:html', function() {
	if (util.env.env === 'production') {
		return gulp.src(HTML_SRC_FILES)
			.pipe(gulp.dest(HTML_PRODUCTION_BUILD_FOLDER));
	} else {
		return gulp.src(HTML_SRC_FILES)
			.pipe(gulp.dest(HTML_DEVELOPMENT_BUILD_FOLDER));
	}
});

gulp.task('watch:html', ['build:html'], function() {
	gulp.watch(HTML_SRC_FILES, ['build:html']);
});
