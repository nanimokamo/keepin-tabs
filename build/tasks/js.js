const gulp = require('gulp');
const PATH = require('path');
const buffer = require('vinyl-buffer');
const uglify = require('gulp-uglify');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const util = require('gulp-util');
const watchify = require('watchify');
const sourcemaps = require('gulp-sourcemaps');

const ROOT = '../../';

const JS_SRC_FILE = PATH.resolve(__dirname, ROOT, 'src/app/index.js');
const JS_SRC_FILES = [
	JS_SRC_FILE,
	PATH.resolve(__dirname, ROOT, 'src/app/') + '/*.js',
	PATH.resolve(__dirname, ROOT, 'src/app/') + '/components/**/*.js',
];

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
			.pipe(source('index.js'))
			.pipe(buffer())
			.pipe(uglify())
			.pipe(gulp.dest(JS_PRODUCTION_BUILD_FOLDER));
	} else {
		const bundle = () => {
			b.transform('babelify')
				.bundle()
				.pipe(source('index.js'))
				.pipe(buffer())
				.pipe(sourcemaps.init({loadMaps: true}))
				.pipe(sourcemaps.write('./'))
				.pipe(gulp.dest(JS_DEVELOPMENT_BUILD_FOLDER));
		}

		const b = browserify({
			entries: [ JS_SRC_FILE ],
			debug: true,
			cache: {},
			packageCache: {},
			// plugin: [watchify],
		});

		// b.on('update', bundle);
		bundle();
	}
});

gulp.task('watch:js', ['build:js'], function() {
	gulp.watch(JS_SRC_FILES, ['build:js']);
});
