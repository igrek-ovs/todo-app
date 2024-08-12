export interface JwtTokenPayload {
  userId: string;
}

export interface AccessTokenResult {
  accessToken: string;
  accessTokenTTL: number;
}

export interface TokensResult {
  accessToken: string;
  accessTokenTTL: number;
  refreshToken: string;
  refreshTokenTTL: number;
}
