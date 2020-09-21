import * as React from 'react';
import { Image as RNImage, ImageProps } from 'react-native';
import { t } from 'react-native-tailwindcss';

const Image: React.FC<ImageProps> = ({
  style = [],
  source = {},
  resizeMode = 'cover',
}) => (
  <RNImage
    style={[t.absolute, t.wFull, t.hFull, t.inset0, style]}
    source={source}
    resizeMode={resizeMode}
    fadeDuration={0}
  />
);

export default Image;
