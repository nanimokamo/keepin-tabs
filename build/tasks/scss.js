import gulp from 'gulp';
import PATH from 'path';
import sass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import sourcemaps from 'gulp-sourcemaps';
import util from 'gulp-util';

const ROOT = '../../';

const SCSS_SRC_FILE = PATH.resolve(__dirname, ROOT, 'src/app/index.scss');
const SCSS_SRC_FILES = [
	SCSS_SRC_FILE,
	PATH.resolve(__dirname, ROOT, 'src/app/components/') + '/**/*.scss',
	PATH.resolve(__dirname, ROOT, 'src/app/assets/styles/') + '/**/*.scss',
];

const SCSS_DEVELOPMENT_BUILD_FOLDER = PATH.resolve(__dirname, ROOT, 'dist/public/css');
const SCSS_PRODUCTION_BUILD_FOLDER = PATH.resolve(__dirname, ROOT, 'dist/public/css');

gulp.task('build:scss', function() {
	if (util.env.env === 'production') {
		return gulp.src(SCSS_SRC_FILE)
			.pipe(sass(({ outputStyle: 'compressed' })).on('error', sass.logError))
			.pipe(autoprefixer('last 2 Chrome versions'))
			.pipe(gulp.dest(SCSS_PRODUCTION_BUILD_FOLDER));
	} else {
		return gulp.src(SCSS_SRC_FILE)
			.pipe(sourcemaps.init())
			.pipe(sass(({ outputStyle: 'expanded' })).on('error', sass.logError))
			.pipe(sourcemaps.write())
			.pipe(gulp.dest(SCSS_DEVELOPMENT_BUILD_FOLDER));
	}
});

gulp.task('watch:scss', ['build:scss'], function() {
	gulp.watch(SCSS_SRC_FILES, ['build:scss']);
});
