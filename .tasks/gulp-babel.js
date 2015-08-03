import gulp from 'gulp';
import babel from 'gulp-babel';

export default () => {
	return gulp.src('build/lib/**/*.js')
		.pipe(babel())
		.pipe(gulp.dest('dist/lib'));
};
