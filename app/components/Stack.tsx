import * as React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { t } from 'react-native-tailwindcss';

interface Props {
  direction?: 'horizontal' | 'vertical';
  space?: Space;
  alignX?: 'start' | 'center' | 'between' | 'end';
  alignY?: 'start' | 'center' | 'end';
  wrap?: boolean;
}

const Stack: React.FC<Props> = ({
  direction = 'vertical',
  space = 'normal',
  alignX,
  alignY,
  wrap,
  children,
}) => {
  let flexDirection: StyleProp<ViewStyle> = undefined;

  switch (direction) {
    case 'horizontal':
      flexDirection = t.flexRow;
      break;

    case 'vertical':
      flexDirection = t.flexCol;
      break;
  }

  let parentMargin: StyleProp<ViewStyle> = undefined;
  let childMargin: StyleProp<ViewStyle> = undefined;

  switch (space) {
    case 'extraSmall':
      parentMargin = [t._mL1, t._mT1];
      childMargin = [t.mL1, t.mT1];
      break;

    case 'small':
      parentMargin = [t._mL2, t._mT2];
      childMargin = [t.mL2, t.mT2];
      break;

    case 'medium':
      parentMargin = [t._mL3, t._mT3];
      childMargin = [t.mL3, t.mT3];
      break;

    case 'normal':
      parentMargin = [t._mL4, t._mT4];
      childMargin = [t.mL4, t.mT4];
      break;

    case 'large':
      parentMargin = [t._mL6, t._mT6];
      childMargin = [t.mL6, t.mT6];
      break;

    case 'extraLarge':
      parentMargin = [t._mL8, t._mT8];
      childMargin = [t.mL8, t.mT8];
      break;
  }

  let justifyX: StyleProp<ViewStyle> = undefined;

  switch (alignX) {
    case 'center':
      justifyX = t.justifyCenter;
      break;

    case 'between':
      justifyX = t.justifyBetween;
      break;

    case 'end':
      justifyX = t.justifyEnd;
      break;
  }

  let justifyY: StyleProp<ViewStyle> = undefined;

  switch (alignY) {
    case 'center':
      justifyY = t.itemsCenter;
      break;

    case 'end':
      justifyY = t.itemsEnd;
      break;
  }

  return (
    <View
      style={[
        flexDirection,
        justifyX,
        justifyY,
        wrap && t.flexWrap,
        parentMargin,
      ]}
    >
      {React.Children.map(children, (child) =>
        child ? <View style={[t.flexShrink, childMargin]}>{child}</View> : null,
      )}
    </View>
  );
};

export default Stack;
