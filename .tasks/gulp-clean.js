import del from 'del';

export default done => {
	del([
		'lib/**/*.js',
		'test/**/*.js',
		'dist/**',
		'd.ts'
	], done);
}
