import gulp from 'gulp';
import { merge } from 'event-stream';
import ts from 'gulp-typescript';
import { compilerOptions } from '../tsconfig';

const typings = [
	'typings/**/*.d.ts',
	'typings/postcss/.d.ts'
];

export default done => {
	const libResult = gulp.src(
			typings.concat('src/lib/**/*.ts'),
			{ base: './src/lib' }
		)
		.pipe(ts(compilerOptions));

	merge(
		libResult.dts.pipe(gulp.dest('d.ts')),
		libResult.js.pipe(gulp.dest('lib'))
	).on('end', () => {
		gulp.src(
			typings.concat([
				'src/lib/**/*.ts',
				'src/test/**/*.ts'
			])
		)
		.pipe(ts(compilerOptions)).js
		.pipe(gulp.dest('test'))
		.on('end', done);
	});
};
