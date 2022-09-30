const { promises: Fs } = require('fs');
const fsPromises = require('fs/promises');
const Path = require('path');

async function exists (path) {
  try {
    await Fs.access(path);
    return true;
  } catch {
    return false;
  }
};

const addConfigFile = async(dirPath) => {
  const configPath = await Path.join(dirPath, "/jest.config.js");
  const packageJsonFile = await require(Path.join(dirPath, "/package.json"));

  await Fs.writeFile(configPath, '', function (err) {
    if (err) throw err;
  });
  (async () => {
    try {
      await fsPromises.appendFile(configPath,
`module.exports = {
  preset: 'react-native',
  bail: 1,
  transform: {
    '\\.js$': '<rootDir>/node_modules/babel-jest',
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
    name: '${packageJsonFile.name}',
    color: 'blue',
  },
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|svg|gif|eot|otf|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/ImageMock.js',
  },
};`,
      'utf-8');
    } catch(err) {
      console.log('Error appending data to file', err);
    }
  })();
};

const checkConfigExists = async(dirPath) => {
  const configPath = await Path.join(dirPath, "/jest.config.js");

  const configExistsRes = await exists(configPath);

  if(!configExistsRes) {
    try{
        await addConfigFile(dirPath);
        console.log('🚀 Added jest.config.js');
    }
    catch(err) {
        console.log('error', err);
    }
  }
  else {
    console.log('📝 jest.config.js already exists');
  }
};

module.exports = { checkConfigExists }
