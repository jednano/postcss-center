///<reference path="../node_modules/postcss/postcss.d.ts" />
import postcss from 'postcss';

// ReSharper disable once UnusedLocals
export default postcss.plugin('postcss-center', () => {
	return root => {
		root.walkRules(rule => {
			let top;
			rule.walkDecls('top', decl => {
				if (decl.value !== 'center') {
					return;
				}
				top = decl;
				decl.value = '50%';
			});

			let left;
			rule.walkDecls('left', decl => {
				if (decl.value !== 'center') {
					return;
				}
				left = decl;
				decl.value = '50%';
			});

			if (!top && !left) {
				return;
			}

			let position;
			rule.walkDecls('position', decl => {
				if (/^(absolute|relative|fixed)$/.test(decl.value)) {
					position = decl.value;
					return;
				}
				decl.remove();
			});

			if (!position) {
				(top || left).cloneBefore({
					prop: 'position',
					value: 'absolute'
				});
			}

			let translate;
			if (top && left) {
				translate = '(-50%, -50%)';
			} else if (top) {
				translate = 'Y(-50%)';
			} else {
				translate = 'X(-50%)';
			}
			(left || top).cloneAfter({
				prop: 'transform',
				value: `translate${translate}`
			});

			if (left && position !== 'relative') {
				left.cloneAfter({
					prop: 'margin-right',
					value: '-50%'
				});
			}
		});
	};
});
