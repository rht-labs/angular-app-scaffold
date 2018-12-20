module.exports = {
  preset: 'jest-preset-angular',
  globals: {
    '__TS_CONFIG__': {
      'target': 'es6'
    },
    'ts-jest': {
      'tsConfigFile': '<rootDir>/src/tsconfig.spec.json'
    },
    '__TRANSFORM_HTML__': true
  },
  setupTestFrameworkScriptFile: '<rootDir>/jest/setup-jest.ts',
  moduleNameMapper: {
    '@core/(.*)': '<rootDir>/src/app/core/$1',
    '@state/(.*)': '<rootDir>/src/app/state/$1'
  },
  coverageReporters: [
    "text",
    "lcov"
  ],
  coverageDirectory:'reports/coverage',
  testMatch: [
    '<rootDir>/**/*.spec.(js|jsx|ts|tsx)'
  ],
  testResultsProcessor: 'jest-sonar-reporter',
  reporters: [ "default", [ "jest-junit", { suiteName: "jest tests" } ] ]
};
