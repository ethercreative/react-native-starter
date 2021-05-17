import * as React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { t } from 'react-native-tailwindcss';

const Loading: React.FC = () => (
  <View style={[t.flex1, t.justifyCenter, t.itemsCenter]}>
    <ActivityIndicator animating />
  </View>
);

export default Loading;
