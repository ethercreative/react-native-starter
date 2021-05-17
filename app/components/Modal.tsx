import * as React from 'react';
import { StatusBar, View, ViewStyle } from 'react-native';
import { t } from 'react-native-tailwindcss';
import { useNavigation, useTheme } from '@react-navigation/native';
import { CTA, Heading, Stack } from './';

interface Props {
  title?: string;
  closeText?: string;
  color?: ViewStyle;
}

const Modal: React.FC<Props> = ({ children, ...props }) => (
  <>
    <StatusBar barStyle='light-content' animated />
    <Header {...props} />
    <View style={[t.flex1]}>{children}</View>
  </>
);

const Header: React.FC<Props> = ({ title, closeText, color }) => {
  const { goBack } = useNavigation();
  const { colors } = useTheme();

  return (
    <View style={[color ?? { backgroundColor: colors.card }, t.z10]}>
      <Stack
        direction='horizontal'
        space='none'
        alignX={closeText ? 'between' : 'end'}
        alignY='center'
      >
        {closeText ? <CTA text='Cancel' onPress={goBack} /> : null}

        {closeText ? (
          <CTA text={closeText} textWeight='bold' onPress={goBack} />
        ) : (
          <CTA text='Close' onPress={goBack} />
        )}
      </Stack>

      {title ? (
        <View
          style={[t.justifyCenter, t.itemsCenter, t.absolute, t.inset0]}
          pointerEvents='none'
        >
          <Heading size='extraSmall' align='center'>
            {title}
          </Heading>
        </View>
      ) : null}
    </View>
  );
};

Modal.displayName = 'Modal';
export default Modal;
