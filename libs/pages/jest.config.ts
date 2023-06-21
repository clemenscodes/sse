/* eslint-disable */
export default {
    displayName: 'pages',
    preset: '../../jest.preset.js',
    transform: {
        '^.+\\.[tj]sx?$': [
            '@swc/jest',
            { jsc: { transform: { react: { runtime: 'automatic' } } } },
        ],
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
    moduleNameMapper: {
        '@next/font/(.*)': require.resolve(
            'next/dist/build/jest/__mocks__/nextFontMock.js'
        ),
    },
    setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
};
