import { Dimensions, ImageSourcePropType, Platform } from 'react-native';
import Constants from 'expo-constants';
import { getBottomSpace, isIphoneX } from 'react-native-iphone-x-helper';

export const IS_IOS = Platform.OS === 'ios';
export const IS_ANDROID = Platform.OS === 'android';

const dimensions = Dimensions.get('window');
export const WINDOW_WIDTH = dimensions.width;
export const WINDOW_HEIGHT = dimensions.height;

export const STATUS_BAR_HEIGHT = Constants.statusBarHeight;
export const HEADER_HEIGHT = 56;
export const TOP_HEIGHT = STATUS_BAR_HEIGHT + HEADER_HEIGHT;
export const BOTTOM_HEIGHT = getBottomSpace();
export const HAS_NOTCH = isIphoneX();

const GREY = '#f7f6fc';
const DARK_GREY = '#202020';

export const COLORS = {
  GREY,
  DARK_GREY,
  BACKGROUND: {
    GREY: { backgroundColor: GREY },
    DARK_GREY: { backgroundColor: DARK_GREY },
  },
  TEXT: {
    GREY: { color: GREY },
    DARK_GREY: { color: DARK_GREY },
  },
};

interface KeyVal {
  [key: string]: ImageSourcePropType;
}

export const ICONS: KeyVal = {};

export const ACTIVE_ICONS: KeyVal = {};

export const GRAPH_URL = '';
