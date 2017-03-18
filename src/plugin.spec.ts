import test, { ContextualTestContext } from 'ava';
import * as postcss from 'postcss';

import * as plugin from './plugin';

test(
	'top: center; transpiles into expected declarations',
	macro,
	`foo {
		top: center;
	}`,
	`foo {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
	}`
);

['absolute', 'relative', 'fixed'].forEach(position => {
	test(
		`top: center; perserves location/value of position at top if ${position}`,
		macro,
		`foo {
			position: ${position};
			bar: baz;
			top: center;
		}`,
		`foo {
			position: ${position};
			bar: baz;
			top: 50%;
			transform: translateY(-50%);
		}`
	);
	test(
		`top: center; perserves location/value of position at bottom if ${position}`,
		macro,
		`foo {
			top: center;
			bar: baz;
			position: ${position};
		}`,
		`foo {
			top: 50%;
			transform: translateY(-50%);
			bar: baz;
			position: ${position};
		}`
	);
});

test(
	'top: center; removes position: static and inserts a new position',
	macro,
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

test(
	'left: center; transpiles into expected declarations',
	macro,
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

test(
	'left: center; omits margin-right: -50% if position is relative',
	macro,
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

test(
	'top: center; left: center; transpiles into expected declarations',
	macro,
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

test(
	'top: 10px; left: 20px; passes through w/o modification',
	macro,
	`foo {
		top: 10px;
		left: 20px;
	}`,
	`foo {
		top: 10px;
		left: 20px;
	}`
);

function macro(
	t: ContextualTestContext,
	input: string,
	expected?: string|RegExp
) {
	const processor = postcss([ plugin() ]);
	if (expected instanceof RegExp) {
		t.throws(() => {
			return processor.process(stripTabs(input)).css;
		}, expected);
		return;
	}
	t.is(
		processor.process(stripTabs(input)).css,
		stripTabs(<string>expected)
	);
}

function stripTabs(input: string) {
	return input.replace(/\t/g, '');
}
