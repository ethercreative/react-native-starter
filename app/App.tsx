import * as React from 'react';
import { LogBox } from 'react-native';
import { enableScreens } from 'react-native-screens';
import Providers from './Providers';
import Tabs from './Tabs';

if (__DEV__) {
  LogBox.ignoreLogs(['Require cycle:', 'source.uri']);
}

enableScreens();

const App: React.FC = () => (
  <Providers>
    <Tabs />
  </Providers>
);

export default App;
