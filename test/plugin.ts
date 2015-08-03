///<reference path="../typings/tsd.d.ts" />
import { expect } from 'chai';
import postcss from 'postcss';
import plugin from '../lib/plugin';

// ReSharper disable WrongExpressionStatement
describe('postcss-center plugin', () => {

	describe('top: center; declaration', () => {

		it('transpiles into expected declarations', () => {
			check(
				`foo {
					top: center;
				}`,
				`foo {
					position: absolute;
					top: 50%;
					transform: translateY(-50%);
				}`
			);
		});

		it('perserves location/value of position if absolute, relative, or fixed', () => {
			['absolute', 'relative', 'fixed'].forEach(value => {
				check(
					`foo {
						position: ${value};
						bar: baz;
						top: center;
					}`,
					`foo {
						position: ${value};
						bar: baz;
						top: 50%;
						transform: translateY(-50%);
					}`
				);
				check(
					`foo {
						top: center;
						bar: baz;
						position: ${value};
					}`,
					`foo {
						top: 50%;
						transform: translateY(-50%);
						bar: baz;
						position: ${value};
					}`
				);
			});
		});

		it('removes position: static and inserts a new position', () => {
			check(
				`foo {
					top: center;
					position: static;
				}`,
				`foo {
					position: absolute;
					top: 50%;
					transform: translateY(-50%);
				}`
			);
		});
	});

	describe('left: center; declaration', () => {

		it('transpiles into expected declarations', () => {
			check(
				`foo {
					left: center;
				}`,
				`foo {
					position: absolute;
					left: 50%;
					margin-right: -50%;
					transform: translateX(-50%);
				}`
			);
		});

		it('omits margin-right: -50% if position is relative', () => {
			check(
				`foo {
					position: relative;
					left: center;
				}`,
				`foo {
					position: relative;
					left: 50%;
					transform: translateX(-50%);
				}`
			);
		});
	});

	describe('top: center; left: center; declarations', () => {

		it('transpiles into expected declarations', () => {
			check(
				`foo {
					top: center;
					left: center;
				}`,
				`foo {
					position: absolute;
					top: 50%;
					left: 50%;
					margin-right: -50%;
					transform: translate(-50%, -50%);
				}`
			);
		});
	});

	describe('top: 10px; left: 20px; declarations', () => {

		it('passes through w/o modification', () => {
			const input = `foo {
				top: 10px;
				left: 20px;
			}`;
			check(input, input);
		});
	});

	function check(actual: string, expected?: string|RegExp) {
		const processor = postcss().use(plugin);
		if (expected instanceof RegExp) {
			expect(() => {
				return processor.process(stripTabs(actual)).css;
			}).to.throw(expected);
			return;
		}
		expect(
			processor.process(stripTabs(actual)).css
		).to.equal(
			stripTabs(<string>expected)
		);
	}

	function stripTabs(input: string) {
		return input.replace(/\t/g, '');
	}
});
