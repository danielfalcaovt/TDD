/** @type {import('ts-jest').JestConfigWithTsJest} **/

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,
  collectCoverage: true,
  collectCoverageFrom: [
      `<rootDir>/src/**/*.ts`
  ],
  testMatch: [
      `<rootDir>/src/**/*.ts`
  ]
};