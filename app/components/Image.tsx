import * as React from 'react';
import { Image as RNImage, ImageProps } from 'react-native';
import tailwind from 'tailwind-rn';

const Image: React.FC<ImageProps> = ({
  style = [],
  source = {},
  resizeMode = 'cover',
}) => (
  <RNImage
    style={[tailwind('absolute inset-0 w-full h-full'), style]}
    source={source}
    resizeMode={resizeMode}
    fadeDuration={0}
  />
);

export default Image;
