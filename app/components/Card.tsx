import * as React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { t } from 'react-native-tailwindcss';

interface Props {
  backgroundColor?: ViewStyle;
  backgroundOpacity?: number;
  radius?: 'none' | 'small' | 'normal' | 'large' | 'full';
  shadow?: boolean;
}

const Card: React.FC<Props> = ({
  backgroundColor,
  backgroundOpacity,
  radius = 'large',
  shadow,
  children,
}) => {
  const { colors } = useTheme();

  let rounded: StyleProp<ViewStyle> = undefined;

  switch (radius) {
    case 'small':
      rounded = t.roundedSm;
      break;

    case 'normal':
      rounded = t.rounded;
      break;

    case 'large':
      rounded = t.roundedLg;
      break;

    case 'full':
      rounded = t.roundedFull;
      break;
  }

  return (
    <View
      style={[
        !backgroundOpacity && [
          backgroundColor ?? { backgroundColor: colors.card },
        ],
        t.flex1,
        rounded,
        shadow && t.shadow,
      ]}
    >
      {backgroundOpacity ? (
        <View
          style={[
            backgroundColor ?? t.bgWhite,
            t.absolute,
            t.inset0,
            rounded,
            { opacity: backgroundOpacity },
          ]}
        />
      ) : null}

      <View style={[rounded, t.overflowHidden]}>{children}</View>
    </View>
  );
};

export default Card;
