import * as postcss from 'postcss';

const PostCssCenter = postcss.plugin('postcss-center', () => {
	return root => {
		root.walkRules(rule => {
			let top: postcss.Declaration;
			rule.walkDecls('top', decl => {
				if (decl.value !== 'center') {
					return;
				}
				top = decl;
				decl.value = '50%';
			});

			let left: postcss.Declaration;
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

			let position: string;
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

			let translate: string;
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

export = PostCssCenter;
