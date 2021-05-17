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

import {
  setCustomText,
  setCustomTouchableOpacity,
} from 'react-native-global-props';

import { AuthProvider, useAuth, UserProvider } from './contexts';
import ClientProvider from './Client';

const lightTheme: Theme = {
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
      color: scheme === 'dark' ? darkTheme.colors.text : lightTheme.colors.text,
    },
    allowFontScaling: false,
  });

  setCustomTouchableOpacity({
    activeOpacity: 0.8,
  });

  return (
    <SafeAreaProvider>
      <NavigationContainer theme={scheme === 'dark' ? darkTheme : lightTheme}>
        <ActionSheetProvider>
          <AuthProvider>
            <ClientProvider>
              <UserSwitch>{children}</UserSwitch>
            </ClientProvider>
          </AuthProvider>
        </ActionSheetProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

const UserSwitch: React.FC = ({ children }) => {
  const { jwt } = useAuth();

  if (jwt) {
    return <UserProvider>{children}</UserProvider>;
  }

  return <>{children}</>;
};

export default Providers;
