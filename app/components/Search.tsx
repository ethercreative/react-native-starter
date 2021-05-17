import * as React from 'react';
import { TextInput, View } from 'react-native';
import { t } from 'react-native-tailwindcss';
import { useTheme } from '@react-navigation/native';
import { COLORS, FONTS } from '../Constants';
import { Image } from '../components';

export type Fields = {
  search: string;
};

interface Props {
  state: Fields;
  autoFocus?: boolean;
  onChange: (key: keyof Fields, value: string) => void;
}

const Search: React.FC<Props> = ({ state, autoFocus, onChange }) => {
  const { colors, dark } = useTheme();

  return (
    <View style={[{ backgroundColor: colors.background }, t.p4, t._mB4, t.z10]}>
      <View>
        <TextInput
          style={[
            { backgroundColor: dark ? colors.card : COLORS.GREY },
            t.h12,
            t.roundedLg,
            FONTS.MEDIUM,
            t.textLg,
            { color: colors.text },
            t.pL12,
            t.pR4,
          ]}
          allowFontScaling={false}
          placeholder='Search'
          placeholderTextColor={
            dark ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.4)'
          }
          selectionColor={colors.text}
          clearButtonMode='while-editing'
          returnKeyType='done'
          autoFocus={autoFocus}
          value={state.search}
          onChangeText={(value) => onChange('search', value)}
        />

        <View
          style={[
            t.w4,
            t.h4,
            t.absolute,
            t.inset0,
            t.right0,
            t.mL4,
            { marginTop: 16 },
          ]}
        >
          <Image
            style={{ tintColor: colors.text }}
            source={require('../assets/search.png')}
            resizeMode='contain'
          />
        </View>
      </View>
    </View>
  );
};

export default Search;
]
