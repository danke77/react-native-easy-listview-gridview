import {
  Platform,
  StatusBar,
  Dimensions
} from 'react-native'

export const STATUS_BAR_HEIGHT = (Platform.OS === 'ios' ? 20 : StatusBar.currentHeight)
export const WINDOW_WIDTH = Dimensions.get('window').width
export const WINDOW_HEIGHT = Dimensions.get('window').height
export const WINDOW_HEIGHT_NO_STATUS_BAR = WINDOW_HEIGHT - STATUS_BAR_HEIGHT
