import gulp from 'gulp';

export default () => {
	gulp.watch('src/**/*.ts', ['eslint:no-clean']);
}
