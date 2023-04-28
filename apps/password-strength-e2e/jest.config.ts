/* eslint-disable */
export default {
    displayName: 'password-strength-e2e',
    preset: '../..//jest.preset.js',
    globals: {
        'ts-jest': {
            tsconfig: '<rootDir>/tsconfig.spec.json',
        },
    },
    setupFiles: ['<rootDir>/src/test-setup.ts'],
    testEnvironment: 'node',
    transform: {
        '^.+\\.[tj]s$': 'ts-jest',
    },
    moduleFileExtensions: ['ts', 'js', 'html'],
    coverageDirectory: '../..//coverage/password-strength-e2e',
};
