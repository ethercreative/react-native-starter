import * as React from 'react';
import { View } from 'react-native';
import { t } from 'react-native-tailwindcss';

interface Props {
  ratio: number;
}

const Aspect: React.FC<Props> = ({ ratio, children }) => (
  <View style={{ paddingBottom: `${ratio * 100}%` }}>
    <View style={[t.absolute, t.inset0]}>{children}</View>
  </View>
);

export default Aspect;
