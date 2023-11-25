import type { Config } from 'jest';

const config: Config = {
  rootDir: __dirname,
  verbose: true,
  testEnvironment: 'jsdom',
  testEnvironmentOptions: {
    customExportConditions: [''],
  },
  setupFiles: ['<rootDir>/jest.polyfills.ts'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testPathIgnorePatterns: ['/node_modules/', '/e2e/'],
  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
  moduleDirectories: ['node_modules', 'src'],
  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest',
    '^.+\\.css$': [
      'jest-transform-css',
      { modules: true, generateScopedName: '[name]-[local]-[hash:base64:4]' },
    ],
  },
};

export default config;
