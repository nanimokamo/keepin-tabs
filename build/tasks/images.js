const gulp = require('gulp');
const PATH = require('path');
const imagemin = require('gulp-imagemin');

const ROOT = '../../';

const IMAGES_SRC_FILES = [
	PATH.resolve(__dirname, ROOT, 'src/app/assets/images/**'),
];
const IMAGES_DEVELOPMENT_BUILD_FOLDER = PATH.resolve(__dirname, ROOT, 'dist/public/images');
const IMAGES_PRODUCTION_BUILD_FOLDER = IMAGES_DEVELOPMENT_BUILD_FOLDER;

gulp.task('build:images', function() {
	if (process.env.NODE_ENV === 'production') {
		return gulp.src(IMAGES_SRC_FILES)
			.pipe(imagemin())
			.pipe(gulp.dest(IMAGES_PRODUCTION_BUILD_FOLDER))
	} else {
		return gulp.src(IMAGES_SRC_FILES)
			.pipe(gulp.dest(IMAGES_DEVELOPMENT_BUILD_FOLDER))
	}
});

gulp.task('watch:images', ['build:images'], function() {
	gulp.watch(IMAGES_SRC_FILES, ['build:images']);
});
