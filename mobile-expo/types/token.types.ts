export type TAccessToken = 'accessToken';
export type TRefreshToken = 'refreshToken';

export type TSecureKey = TAccessToken | TRefreshToken;

export type TSecureStore = {
  [key in TSecureKey]: string;
};
