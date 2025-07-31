import * as SecureStore from 'expo-secure-store';
import { TStorage, TStorageKeys } from '../types/storage.types';

export const setTokens = async (tokens: TStorage) => {
  await SecureStore.setItemAsync('accessToken', tokens.accessToken);
  await SecureStore.setItemAsync('refreshToken', tokens.refreshToken);
}

export const setToken = async (key: TStorageKeys, value: string) => {
  await SecureStore.setItemAsync(key, value)
}

export const getToken = async (key: TStorageKeys) => {
  return await SecureStore.getItemAsync(key)
}

export const removeToken = async (key: TStorageKeys) => {
  await SecureStore.deleteItemAsync(key)
}

export const clearTokens = async () => {
  await SecureStore.deleteItemAsync('accessToken')
  await SecureStore.deleteItemAsync('refreshToken')
}