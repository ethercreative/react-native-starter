import * as React from 'react';
import { LogBox } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { sleep } from './helpers';
import Providers from './Providers';
import Tabs from './Tabs';

if (__DEV__) {
  LogBox.ignoreLogs(['Require cycle:', 'source.uri']);
}

try {
  SplashScreen.preventAutoHideAsync();
} catch {}

const App: React.FC = () => {
  React.useEffect(() => {
    (async () => {
      await sleep(100);

      try {
        SplashScreen.hideAsync();
      } catch {}
    })();
  }, []);

  return (
    <Providers>
      <Tabs />
    </Providers>
  );
};

export default App;
