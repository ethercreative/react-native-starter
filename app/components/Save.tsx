import * as React from 'react';
import { View } from 'react-native';
import { t } from 'react-native-tailwindcss';
import { CTA, Loading } from './';

interface Props {
  saving?: boolean;
  onPress?: () => void;
}

const Save: React.FC<Props> = ({ saving, onPress }) => {
  if (saving) {
    return (
      <View>
        <Loading />
      </View>
    );
  }

  return (
    <View style={[t._m3]}>
      <CTA text='Save' textWeight='bold' onPress={onPress} />
    </View>
  );
};

export default Save;
