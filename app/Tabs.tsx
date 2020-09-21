import React from 'react';
import { View } from 'react-native';
import { t } from 'react-native-tailwindcss';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from '@react-navigation/native';
import * as Linking from 'expo-linking';
import { ACTIVE_ICONS, COLORS, FONTS, ICONS } from './Constants';
import { Image } from './components';

import Home from './screens/Home';
import Profile from './screens/Profile';

const Tabs = createBottomTabNavigator();

const TabNavigator: React.FC = () => {
  const { colors } = useTheme();

  return (
    <Tabs.Navigator
      screenOptions={({ route: { name } }) => ({
        tabBarIcon: ({ focused, color }) => {
          let icon = ICONS[name];

          if (focused) {
            icon = ACTIVE_ICONS[name];
          }

          return (
            <View style={[{ width: 26, height: 26 }, t._mB1]}>
              <Image
                style={{ tintColor: color }}
                source={icon}
                resizeMode='contain'
              />
            </View>
          );
        },
      })}
      tabBarOptions={{
        style: {
          backgroundColor: colors.background,
          ...t.borderT0,
        },
        labelStyle: {
          fontSize: 13,
        },
        activeTintColor: COLORS.DARK_GREY,
      }}
    >
      <Tabs.Screen name='Home' component={Home} />
      <Tabs.Screen name='Profile' component={Profile} />
    </Tabs.Navigator>
  );
};

export default TabNavigator;
