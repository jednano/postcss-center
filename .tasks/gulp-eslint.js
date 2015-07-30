import gulp from 'gulp';
import plumber from 'gulp-plumber';
import eslint from 'gulp-eslint';

export default () => {
	return gulp.src([
		'gulpfile.babel.js',
		'lib/**/*.js',
		'test/**/*.js'
	])
		.pipe(plumber())
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(eslint.failOnError());
};
