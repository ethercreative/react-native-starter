import {
  ActionSheetOptions,
  useActionSheet as useExpoActionSheet,
} from '@expo/react-native-action-sheet';

import { useTheme } from '@react-navigation/native';
import { COLORS } from '../Constants';

export const useActionSheet = () => {
  const { showActionSheetWithOptions } = useExpoActionSheet();
  const { colors } = useTheme();

  const showActionSheet = ({
    options,
    ...rest
  }: ActionSheetOptions): Promise<{ selected: number; cancelled: boolean }> => {
    const cancelButtonIndex = options.length;

    return new Promise((resolve) => {
      showActionSheetWithOptions(
        {
          tintColor: colors.text,
          destructiveColor: COLORS.RED,
          options: [...options, 'Cancel'],
          cancelButtonIndex,
          ...rest,
        },
        (i) =>
          resolve({
            selected: i,
            cancelled: i === cancelButtonIndex,
          }),
      );
    });
  };

  return showActionSheet;
};
