import { Alert } from 'react-native';

interface Props {
  title: string;
  message?: string;
}

export const useConfirmation = () => {
  const showConfirmation = ({ title, message }: Props): Promise<boolean> =>
    new Promise((resolve) => {
      Alert.alert(title, message, [
        {
          text: 'No',
          style: 'cancel',
          onPress: () => resolve(false),
        },
        {
          text: 'Yes',
          style: 'destructive',
          onPress: () => resolve(true),
        },
      ]);
    });

  return showConfirmation;
};
