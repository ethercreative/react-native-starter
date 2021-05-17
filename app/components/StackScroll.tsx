import * as React from 'react';

import {
  FlatList,
  Keyboard,
  KeyboardEvent,
  ListRenderItemInfo,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleProp,
  View,
  ViewStyle,
} from 'react-native';

import { t } from 'react-native-tailwindcss';
import { SafeAreaView } from 'react-native-safe-area-context';
import { STATUS_BAR_HEIGHT } from '../Constants';

interface Props {
  direction?: 'horizontal' | 'vertical';
  space?: Space;
  padding?: boolean;
  itemWidth?: number;
  safeArea?: boolean;
  autoAdjust?: boolean;
  centerContent?: boolean;
  keyboardSpacer?: boolean;
  activeIndex?: number;
  scrollEnabled?: boolean;
  scrollToEnd?: boolean;
  animationPoints?: {
    offset: number;
    toggle: (toggled: boolean) => void;
  }[];
}

const StackScroll: React.FC<Props> = ({
  safeArea,
  keyboardSpacer = true,
  children,
  ...rest
}) => {
  const [keyboardHeight, setKeyboardHeight] = React.useState<number>(0);

  const keyboardWillShow = (e: KeyboardEvent) => {
    let offset = e.endCoordinates.height;

    if (safeArea) {
      offset = offset - STATUS_BAR_HEIGHT - 32;
    }

    setKeyboardHeight(offset);
  };

  const keyboardWillHide = () => {
    setKeyboardHeight(0);
  };

  React.useEffect(() => {
    Keyboard.addListener('keyboardWillShow', keyboardWillShow);
    Keyboard.addListener('keyboardWillHide', keyboardWillHide);

    return () => {
      Keyboard.removeListener('keyboardWillShow', keyboardWillShow);
      Keyboard.removeListener('keyboardWillHide', keyboardWillHide);
    };
  }, []);

  if (!children) {
    return null;
  }

  const KeyboardSpacer: React.FC = () => (
    <View style={{ height: keyboardHeight }} />
  );

  if (safeArea) {
    return (
      <SafeAreaView style={[t.flex1]} edges={['bottom']}>
        <List {...rest}>{children}</List>
        {keyboardSpacer ? <KeyboardSpacer /> : null}
      </SafeAreaView>
    );
  }

  return (
    <>
      <List {...rest}>{children}</List>
      {keyboardSpacer ? <KeyboardSpacer /> : null}
    </>
  );
};

const List: React.FC<Props> = ({
  direction = 'vertical',
  space = 'normal',
  padding = true,
  itemWidth,
  autoAdjust = true,
  centerContent,
  activeIndex,
  scrollEnabled = true,
  scrollToEnd,
  animationPoints,
  children,
}) => {
  let parentMargin: StyleProp<ViewStyle> = undefined;
  let childMargin: StyleProp<ViewStyle> = undefined;

  switch (space) {
    case 'extraSmall':
      parentMargin = [t._mL1, t._mT1];
      childMargin = [t.mL1, t.mT1];
      break;

    case 'small':
      parentMargin = [t._mL2, t._mT2];
      childMargin = [t.pL2, t.pT2];
      break;

    case 'medium':
      parentMargin = [t._mL3, t._mT3];
      childMargin = [t.pL3, t.pT3];
      break;

    case 'normal':
      parentMargin = [t._mL4, t._mT4];
      childMargin = [t.pL4, t.pT4];
      break;

    case 'large':
      parentMargin = [t._mL6, t._mT6];
      childMargin = [t.pL6, t.pT6];
      break;

    case 'extraLarge':
      parentMargin = [t._mL8, t._mT8];
      childMargin = [t.pL8, t.pT8];
      break;
  }

  const ref = React.createRef<FlatList>();

  React.useEffect(() => {
    if (!itemWidth) {
      return;
    }

    Keyboard.dismiss();

    ref.current?.scrollToOffset({
      offset: (activeIndex ?? 0) * itemWidth,
      animated: true,
    });
  }, [activeIndex]);

  const keyboardDidShow = () => {
    ref.current?.scrollToOffset({
      offset: 1000,
      animated: true,
    });
  };

  React.useEffect(() => {
    if (!scrollToEnd || !ref.current) {
      return;
    }

    Keyboard.addListener('keyboardDidShow', keyboardDidShow);

    return () => {
      Keyboard.removeListener('keyboardDidShow', keyboardDidShow);
    };
  }, [scrollToEnd, ref]);

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (!animationPoints?.length) {
      return;
    }

    const scrollOffset =
      e.nativeEvent.contentOffset[direction === 'horizontal' ? 'x' : 'y'];

    for (const animationPoint of animationPoints) {
      animationPoint.toggle(scrollOffset >= animationPoint.offset);
    }
  };

  const data = React.useMemo(() => React.Children.toArray(children), [
    children,
  ]);

  const renderItem = React.useCallback(
    ({ item }: ListRenderItemInfo<any>) => (
      <View style={[childMargin, { width: itemWidth }]}>{item}</View>
    ),
    [children],
  );

  return (
    <FlatList
      style={[t.flex1, parentMargin, t.overflowVisible]}
      contentContainerStyle={[padding && t.p4]}
      horizontal={direction === 'horizontal'}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      snapToInterval={itemWidth}
      snapToAlignment={itemWidth ? 'start' : undefined}
      decelerationRate={itemWidth ? 'fast' : undefined}
      contentInsetAdjustmentBehavior={autoAdjust ? 'automatic' : undefined}
      keyboardShouldPersistTaps='handled'
      centerContent={centerContent}
      scrollEnabled={scrollEnabled}
      removeClippedSubviews
      windowSize={5}
      data={data}
      renderItem={renderItem}
      onScroll={onScroll}
      scrollEventThrottle={16}
      keyExtractor={(items, i) => String(items?.[i]?.key ?? i)}
      ref={ref}
    />
  );
};

export default StackScroll;