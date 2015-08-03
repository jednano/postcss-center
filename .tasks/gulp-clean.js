import del from 'del';

export default done => {
	del(['build/**/*.js', 'dist'], done);
}
