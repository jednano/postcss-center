import postcss from 'postcss';
export default postcss.plugin('postcss-center', () => {
    return root => {
        root.eachRule(rule => {
            let top;
            rule.eachDecl('top', decl => {
                if (decl.value !== 'center') {
                    return;
                }
                top = decl;
                decl.value = '50%';
            });
            let left;
            rule.eachDecl('left', decl => {
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
            rule.eachDecl('position', decl => {
                if (/^(absolute|relative|fixed)$/.test(decl.value)) {
                    position = decl.value;
                    return;
                }
                decl.removeSelf();
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
            }
            else if (top) {
                translate = 'Y(-50%)';
            }
            else {
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
