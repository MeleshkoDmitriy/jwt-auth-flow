import { TSecureKey } from '@/types';
import * as SecureStore from 'expo-secure-store';

const STORAGE_KEYS = {
  REFRESH_TOKEN: 'refreshToken',
};

export const secureStorageService = {
  getRefreshToken: async (): Promise<string | null> => {
    return await SecureStore.getItemAsync(STORAGE_KEYS.REFRESH_TOKEN);
  },
  getItem: async (key: TSecureKey): Promise<string | null> => {
    return await SecureStore.getItemAsync(key);
  },
  setItem: async (key: TSecureKey, value: string): Promise<void> => {
    return await SecureStore.setItemAsync(key, value);
  },
  deleteItem: async (key: TSecureKey): Promise<void> => {
    return await SecureStore.deleteItemAsync(key);
  },
};
