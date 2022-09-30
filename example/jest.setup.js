/* eslint-disable no-undef */ 
import mockNativeBase from 'native-base/mock.js';
import mockRNFastImage from 'react-native-fast-image/mock.js';
import mockRNSafeAreaContext from 'react-native-safe-area-context/mock.js';

jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter');
jest.mock('react-native-fast-image', () => mockRNFastImage);
jest.mock('native-base', () => mockNativeBase);
jest.mock('react-native-safe-area-context', () => mockRNSafeAreaContext);
