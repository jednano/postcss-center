import gulp from 'gulp';

function loadTask(taskName) {
	return require(`./.tasks/gulp-${taskName}`);
}

gulp.task('default', ['eslint']);
gulp.task('eslint', ['scripts'], loadTask('eslint'));
gulp.task('eslint:no-clean', ['scripts:no-clean'], loadTask('eslint'));
gulp.task('scripts', ['clean', 'tslint'], loadTask('scripts'));
gulp.task('scripts:no-clean', ['tslint'], loadTask('scripts'));
gulp.task('clean', loadTask('clean'));
gulp.task('tslint', loadTask('tslint'));
gulp.task('watch', ['scripts'], loadTask('watch'));
