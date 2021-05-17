import * as React from 'react';
import { StyleProp, Text as RNText, TextProps, TextStyle } from 'react-native';
import { t } from 'react-native-tailwindcss';
import { FONTS } from '../Constants';

interface Props extends TextProps {
  size?: Size;
  color?: TextStyle;
  weight?: Weight;
  align?: Align;
  alpha?: 'faded' | 'opaque';
  mono?: boolean;
}

const Text: React.FC<Props> = ({
  size = 'normal',
  color,
  weight = 'normal',
  align = 'left',
  alpha = 'opaque',
  mono,
  children,
  style,
  ...rest
}) => {
  let textSize: StyleProp<TextStyle> = undefined;

  switch (size) {
    case 'extraSmall':
      textSize = t.textXs;
      break;

    case 'small':
      textSize = t.textSm;
      break;

    case 'normal':
      textSize = t.textBase;
      break;

    case 'large':
      textSize = t.textLg;
      break;

    case 'extraLarge':
      textSize = t.textXl;
      break;
  }

  let font: StyleProp<TextStyle> = undefined;

  switch (weight) {
    case 'normal':
      font = FONTS.REGULAR;
      break;

    case 'medium':
      font = FONTS.MEDIUM;
      break;

    case 'bold':
      font = FONTS.BOLD;
      break;
  }

  if (mono) {
    font = FONTS.MONO;
  }

  let textAlign: StyleProp<TextStyle> = undefined;

  switch (align) {
    case 'left':
      textAlign = t.textLeft;
      break;

    case 'center':
      textAlign = t.textCenter;
      break;

    case 'right':
      textAlign = t.textRight;
      break;
  }

  let opacity: number | undefined = undefined;

  switch (alpha) {
    case 'faded':
      opacity = 0.6;
      break;

    case 'opaque':
      opacity = 1;
      break;
  }

  return (
    <RNText
      style={[font, textSize, color, textAlign, t._mY1, { opacity }, style]}
      {...rest}
    >
      {children}
    </RNText>
  );
};

export default Text;
