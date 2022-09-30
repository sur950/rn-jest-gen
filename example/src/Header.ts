import {Platform, useWindowDimensions} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

type HeaderProps = {
  headerHeight: number;
  header: number;
  statusBarHeight?: number;
};


const UseHeaderHeight = ({
  header,
  statusBarHeight
}: HeaderProps) => {
  const layout = useWindowDimensions();
  const {top: statusBarHeight1} = useSafeAreaInsets();
  const isLandscape = layout.width > layout.height;

  let headerHeight;

  if (Platform.OS === 'ios') {
    if (isLandscape && !Platform.isPad) {
      headerHeight = 32;
    } else {
      headerHeight = 44;
    }
  } else if (Platform.OS === 'android') {
    headerHeight = 56;
  } else {
    headerHeight = 64;
  }

  return {
    headerHeight: headerHeight + statusBarHeight1,
    header: headerHeight,
    statusBarHeight,
  };
};

export default UseHeaderHeight;
