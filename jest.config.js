module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^~(.*)$': '<rootDir>/src$1',
  },
  roots: ['<rootDir>/src']
};
