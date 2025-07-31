export type TStorageKeys = "accessToken" | "refreshToken";

export type TStorage = {
  [key in TStorageKeys]: string;
};