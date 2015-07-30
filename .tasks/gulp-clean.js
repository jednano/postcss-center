import del from 'del';

export default done => {
	del(['lib/**/*.js', 'test/**/*.js', 'd.ts'], done);
}
