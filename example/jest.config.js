module.exports = {
  preset: 'react-native',
  bail: 1,
  transform: {
    '\.js$': '<rootDir>/node_modules/babel-jest',
  },
  transformIgnorePatterns: ['node_modules/(?!@react-native|react-native|rn-azure-ad-auth|@notifee|@react-navigation)'],
  globals: {
    'ts-jest': {
      tsConfig: './tsconfig.json',
      isolatedModules: true,
    },
  },
  verbose: true,
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  setupFiles: ['<rootDir>/jest.setup.js', './node_modules/react-native-gesture-handler/jestSetup.js'],
  automock: false,
  cacheDirectory: './jest/cache',
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: [
    '**/*.{ts,tsx}',
    '!**/android/**',
    '!**/ios/**',
    '!**/node_modules/**',
    '!**/vendor/**',
    '!**/jest/**',
  ],
  coverageDirectory: './jest/coverage',
  coveragePathIgnorePatterns: ['/node_modules/', '/vendor/', '/android/', '/ios/', '/jest/'],
  coverageReporters: [
    'clover',
    'json',
    'lcov',
    [
      'text',
      {
        skipFull: true,
      },
    ],
  ],
  displayName: {
    name: 'example',
    color: 'blue',
  },
  moduleNameMapper: {
    '\.(jpg|jpeg|png|svg|gif|eot|otf|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/ImageMock.js',
  },
};