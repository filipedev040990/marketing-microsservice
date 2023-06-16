module.exports = {
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/**/*interface.ts',
    '!<rootDir>/src/**/*factory.ts',
    '!<rootDir>/src/**/*types.ts',
    '!<rootDir>/src/**/index.ts',
    '!<rootDir>/src/**/app.ts',
    '!<rootDir>/src/**/server.ts',
    '!<rootDir>/src/**/constants.ts',
    '!<rootDir>/src/**/*helper.ts'
  ],
  coverageDirectory: 'coverage',
  coverageProvider: 'babel',
  moduleNameMapper: {
    '@/(.+)': '<rootDir>/src/$1'
  },
  testMatch: ['**/*.spec.ts'],
  roots: [
    '<rootDir>/src'
  ],
  transform: {
    '\\.ts$': 'ts-jest'
  },
  clearMocks: true
}
