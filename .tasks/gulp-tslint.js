import gulp from 'gulp';
import plumber from 'gulp-plumber';
import tslint from 'gulp-tslint';

export default () => {
	return gulp.src(['src/**/*.ts'])
		.pipe(plumber())
		.pipe(tslint())
		.pipe(tslint.report('verbose'));
};
