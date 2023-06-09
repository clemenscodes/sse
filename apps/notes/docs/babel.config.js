const tsconfig = require('../../../tsconfig.base.json');
const paths = tsconfig.compilerOptions.paths;
const alias = Object.keys(paths)
    .filter((path) => path !== 'react')
    .reduce(
        (aliases, k) => ({ ...aliases, [k]: '../../../' + paths[k][0] }),
        {}
    );

module.exports = {
    presets: [require.resolve('@docusaurus/core/lib/babel/preset')],
    plugins: [
        [
            require.resolve('babel-plugin-module-resolver'),
            {
                alias,
            },
        ],
    ],
};
