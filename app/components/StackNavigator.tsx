import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from '@react-navigation/native';

const MainStack = createNativeStackNavigator();
const ModalStack = createNativeStackNavigator();

interface ScreenStack {
  screens: React.FC[];
}

const MainStackScreen: React.FC<ScreenStack> = ({ screens = [] }) => {
  const { colors } = useTheme();

  return (
    <MainStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.background,
        },
        headerTitleStyle: {
          color: colors.text,
        },
        headerLargeTitleStyle: {
          color: colors.text,
        },
        headerTintColor: colors.text,
        headerLargeTitle: false,
        headerHideShadow: true,
        contentStyle: {
          backgroundColor: colors.background,
        },
      }}
    >
      {screens.map((screen) => {
        const { displayName } = screen;

        if (!displayName) {
          return null;
        }

        return (
          <MainStack.Screen
            name={displayName}
            component={screen}
            key={displayName}
          />
        );
      })}
    </MainStack.Navigator>
  );
};

interface ModalStack extends ScreenStack {
  modals?: React.FC[];
}

const ModalStackScreen: React.FC<ModalStack> = ({ modals = [], ...rest }) => (
  <ModalStack.Navigator
    screenOptions={{
      stackPresentation: 'modal',
      headerShown: false,
    }}
  >
    <ModalStack.Screen
      name='Main'
      children={() => <MainStackScreen {...rest} />}
    />

    {modals.map((modal) => {
      const { displayName } = modal;

      if (!displayName) {
        return null;
      }

      return (
        <ModalStack.Screen
          name={displayName}
          component={modal}
          key={displayName}
        />
      );
    })}
  </ModalStack.Navigator>
);

export default ModalStackScreen;
