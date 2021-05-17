import * as SecureStore from 'expo-secure-store';

export default class Storage {
  static async get(key: string) {
    return (await SecureStore.getItemAsync(key)) ?? '';
  }

  static async set(key: string, value: string) {
    return await SecureStore.setItemAsync(key, value);
  }

  static async remove(key: string) {
    return await SecureStore.deleteItemAsync(key);
  }

  static async clear() {
    await SecureStore.deleteItemAsync('jwt');
    await SecureStore.deleteItemAsync('jwtExpiresAt');
    await SecureStore.deleteItemAsync('refreshToken');
    await SecureStore.deleteItemAsync('refreshTokenExpiresAt');
    return true;
  }
}
