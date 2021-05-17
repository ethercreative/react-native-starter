import * as React from 'react';
import { StyleProp, Text, TextProps, TextStyle } from 'react-native';
import { t } from 'react-native-tailwindcss';
import { FONTS } from '../Constants';

interface Props extends TextProps {
  size?: Size;
  color?: TextStyle;
  weight?: Weight;
  align?: Align;
  mono?: boolean;
}

const Heading: React.FC<Props> = ({
  size = 'normal',
  color,
  weight = 'medium',
  align = 'left',
  mono,
  children,
  ...rest
}) => {
  let textSize: StyleProp<TextStyle> = undefined;

  switch (size) {
    case 'extraSmall':
      textSize = t.textLg;
      break;

    case 'small':
      textSize = t.textXl;
      break;

    case 'normal':
      textSize = t.text2xl;
      break;

    case 'large':
      textSize = t.text3xl;
      break;

    case 'extraLarge':
      textSize = t.text4xl;
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

  return (
    <Text style={[font, textSize, color, textAlign, t._mY1]} {...rest}>
      {children}
    </Text>
  );
};

export default Heading;
