import { AsyncStorage } from 'react-native';

export default class Storage {
  static async get<T>(key: string = ''): Promise<T> {
    return JSON.parse((await AsyncStorage.getItem(key)) as string);
  }

  static async set(key: string = '', value: object | string) {
    return await AsyncStorage.setItem(key, JSON.stringify(value));
  }

  static async remove(key: string = '') {
    return await AsyncStorage.removeItem(key);
  }

  static async clear() {
    return await AsyncStorage.clear();
  }
}
