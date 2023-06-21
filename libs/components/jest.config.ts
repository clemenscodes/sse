/* eslint-disable */
export default {
    displayName: 'components',
    preset: '../../jest.preset.js',
    transform: {
        '^.+\\.[tj]sx?$': [
            '@swc/jest',
            { jsc: { transform: { react: { runtime: 'automatic' } } } },
        ],
    },
    moduleNameMapper: {
        '@next/font/(.*)': require.resolve(
            'next/dist/build/jest/__mocks__/nextFontMock.js'
        ),
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
    setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
};
