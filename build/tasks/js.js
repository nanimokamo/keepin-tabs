const gulp = require('gulp');
const PATH = require('path');
const buffer = require('vinyl-buffer');
const uglify = require('gulp-uglify');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const util = require('gulp-util');
const envify = require('envify');
const sourcemaps = require('gulp-sourcemaps');

const ROOT = '../../';

const JS_SRC_FILE = PATH.resolve(__dirname, ROOT, 'src/app/app.js');
const JS_SRC_FILES = [
	JS_SRC_FILE,
	PATH.resolve(__dirname, ROOT, 'src/app/') + '/**/*.js',
];
console.log(JS_SRC_FILES);
const JS_DEVELOPMENT_BUILD_FOLDER = PATH.resolve(__dirname, ROOT, 'dist/public/js');
const JS_PRODUCTION_BUILD_FOLDER = PATH.resolve(__dirname, ROOT, 'dist/public/js');

gulp.task('build:js', function() {
	if (util.env.env === 'production') {
		return browserify(JS_SRC_FILE)
			.transform('babelify')
			.transform('envify', {
				global: true,
				_: 'purge',
				NODE_ENV: 'production'
			})
			.bundle()
			.pipe(source('app.js'))
			.pipe(buffer())
			.pipe(uglify())
			.pipe(gulp.dest(JS_PRODUCTION_BUILD_FOLDER));
	} else {
		return browserify({
				entries: [ JS_SRC_FILE ],
				debug: true,
			})
			.transform('babelify')
			.bundle()
			.pipe(source('app.js'))
			.pipe(buffer())
			.pipe(sourcemaps.init({loadMaps: true}))
			.pipe(sourcemaps.write('./'))
			.pipe(gulp.dest(JS_DEVELOPMENT_BUILD_FOLDER));
	}
});

gulp.task('watch:js', ['build:js'], function() {
	gulp.watch(JS_SRC_FILES, ['build:js']);
});
