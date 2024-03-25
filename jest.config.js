module.exports = {
  roots: ['<rootDir>/tests'],
  testMatch: ['**/__tests__/**/*.+(js)', '**/?(*.)+(spec|test).+(js)'],
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  testEnvironment: 'node',
};
