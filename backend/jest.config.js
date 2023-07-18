module.exports = {
  maxWorkers: '50%',
  testEnvironment: 'node',
  roots: ['<rootDir>'],
  testMatch: ['**/*.test.ts'],
  transform: {
    '^.+\\.(ts?)$': 'ts-jest',
  },
  transformIgnorePatterns: ['node_modules/?!(moq.ts)/'],
  moduleNameMapper: {
    'domain/(.*)': '<rootDir>/domain/$1',
    'infra/(.*)': '<rootDir>/infra/$1',
    'services/(.*)': '<rootDir>/services/$1',
  },
  clearMocks: true,
}
