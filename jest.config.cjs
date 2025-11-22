module.exports = {
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.cjs'],
    moduleNameMapper: {
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
        '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js',
        '^clsx$': '<rootDir>/node_modules/clsx/dist/clsx.js',
        '^tailwind-merge$': '<rootDir>/node_modules/tailwind-merge/dist/lib/index.js',
    },
    transform: {
        '^.+\\.(js|jsx)$': 'babel-jest',
    },
};
