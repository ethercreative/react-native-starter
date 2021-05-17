import * as React from 'react';

import {
  ImageSourcePropType,
  TextStyle,
  TouchableOpacity,
  View,
} from 'react-native';

import { t } from 'react-native-tailwindcss';
import { HEADER_HEIGHT } from '../Constants';
import { Image, Text } from './';

interface Props {
  source?: ImageSourcePropType;
  cache?: boolean;
  tintColor?: string;
  text?: string;
  textColor?: TextStyle;
  textWeight?: Weight;
  size?: number;
  onPress?: () => void;
}

const CTA: React.FC<Props> = ({
  source,
  cache,
  tintColor,
  text,
  textColor,
  textWeight = 'medium',
  size = 40,
  onPress,
}) => (
  <TouchableOpacity
    style={[
      { height: text ? HEADER_HEIGHT : 40 },
      t.itemsEnd,
      t.justifyCenter,
      text && t.pX4,
    ]}
    hitSlop={{
      left: 10,
      right: 10,
      top: 10,
      bottom: 10,
    }}
    onPress={onPress}
  >
    {source ? (
      <View style={{ width: size, height: size }}>
        <Image
          style={{ tintColor }}
          cache={cache}
          source={source}
          resizeMode='contain'
        />
      </View>
    ) : null}

    {text ? (
      <Text color={textColor} weight={textWeight}>
        {text}
      </Text>
    ) : null}
  </TouchableOpacity>
);

export default CTA;
