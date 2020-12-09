import * as React from 'react';
import { useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  Theme,
} from '@react-navigation/native';

import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { setCustomText } from 'react-native-global-props';
import ClientProvider from './Client';
import { COLORS } from './Constants';

const defaultTheme: Theme = {
  ...DefaultTheme,
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    background: '#fff',
    card: '#eee',
    border: '#ddd',
  },
};

const darkTheme: Theme = {
  ...DefaultTheme,
  dark: true,
  colors: {
    ...DarkTheme.colors,
    card: '#222',
    border: '#111',
  },
};

const Providers: React.FC = ({ children }) => {
  const scheme = useColorScheme();

  setCustomText({
    style: {
      fontSize: 16,
      color: scheme === 'dark' ? '#fff' : COLORS.DARK_GREY,
    },
    allowFontScaling: false,
  });

  return (
    <SafeAreaProvider>
      <NavigationContainer theme={scheme === 'dark' ? darkTheme : defaultTheme}>
        <ActionSheetProvider>
          <ClientProvider>{children}</ClientProvider>
        </ActionSheetProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default Providers;
