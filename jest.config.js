module.exports = {
  clearMocks: true,
  collectCoverageFrom: ['src/**/*.{js,jsx,mjs}'],
  coverageDirectory: 'coverage',
  moduleFileExtensions: ['js', 'json', 'jsx'],
  moduleNameMapper: {
    '@blockone/ual-scatter': '<rootDir>/__mocks__/Scatter.js',
    'providerProps': '<rootDir>/__mocks__/providerProps.js',
    'localStorageMock': '<rootDir>/__mocks__/localStorageMock.js',
    'UALAccountInputProps': '<rootDir>/__mocks__/UALAccountInputProps.js',
    'AuthenticatorMocks': '<rootDir>/__mocks__/AuthenticatorMocks.js',
  },
  setupFiles: ['<rootDir>/__setup__/enzyme.config.js'],
  testEnvironment: 'jsdom',
  testMatch: ['**/__tests__/**/*.js?(x)', '**/?(*.)+(spec|test).js?(x)'],
  testPathIgnorePatterns: ['\\\\node_modules\\\\'],
  testURL: 'http://localhost',
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  verbose: false,
  transform: {
      '^.+\\.js$': '<rootDir>/__setup__/config.jest.transform.js'
  },
};