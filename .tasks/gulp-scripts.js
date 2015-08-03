import filter from 'gulp-filter';
import gulp from 'gulp';
import { merge } from 'event-stream';
import ts from 'gulp-typescript';
import { compilerOptions } from '../tsconfig';

export default () => {
	const libResult = gulp.src(
			[
				'typings/**/*.d.ts',
				'typings/postcss/.d.ts',
				'lib/**/*.ts',
				'test/**/*.ts'
			],
			{ base: '.' })
		.pipe(ts(compilerOptions));

	return merge(
		libResult.dts
			.pipe(filter(['**', '!test/**']))
			.pipe(gulp.dest('dist/d.ts')),
		libResult.js.pipe(gulp.dest('build'))
	);
};
