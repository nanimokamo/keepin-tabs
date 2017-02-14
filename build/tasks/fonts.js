import gulp from 'gulp';
import PATH from 'path';
import util from 'gulp-util';
// import browserSync from 'browser-sync';

const ROOT = '../../';

const FONTS_SRC_FILES = [
	PATH.resolve(__dirname, ROOT, 'src/app/assets/fonts/**'),
];
const FONTS_DEVELOPMENT_BUILD_FOLDER = PATH.resolve(__dirname, ROOT, 'dist/public/fonts');
const FONTS_PRODUCTION_BUILD_FOLDER = PATH.resolve(__dirname, ROOT, 'dist/public/fonts');

gulp.task('build:fonts', function() {
	if (util.env.env === 'production') {
		return gulp.src(FONTS_SRC_FILES)
			.pipe(gulp.dest(FONTS_PRODUCTION_BUILD_FOLDER));
	} else {
		return gulp.src(FONTS_SRC_FILES)
			.pipe(gulp.dest(FONTS_DEVELOPMENT_BUILD_FOLDER));
	}
});

gulp.task('watch:fonts', ['build:fonts'], function() {
	gulp.watch(FONTS_SRC_FILES, ['build:fonts']);
});
