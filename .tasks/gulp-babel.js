import gulp from 'gulp';
import babel from 'gulp-babel';

export default () => {
	return gulp.src('lib/**/*.js')
		.pipe(babel())
		.pipe(gulp.dest('dist/lib'));
};
