import {Dimensions} from 'react-native';

const containerWidth = Dimensions.get('window').width;
const containerHeight = Dimensions.get('window').height;
const initialScale = Math.min(containerWidth, containerHeight) / 375;

const unit: Unit = {
  scale: (multi?) => (multi ? initialScale * multi : initialScale),
  fontSize: (multi?) => (multi ? initialScale * 16 * multi : initialScale * 16),
  windowHeight: (multi?: number) =>
    multi ? containerHeight * multi : containerHeight,
  windowWidth: (multi?: number) =>
    multi ? containerWidth * multi : containerWidth,
  screenHeader: () => initialScale * 48,
};

export interface Unit {
  scale: (multi?: number) => number;
  fontSize: (multi?: number) => number;
  windowHeight: (multi?: number) => number;
  windowWidth: (multi?: number) => number;
  screenHeader: (multi?: number) => number;
}

export default unit;
