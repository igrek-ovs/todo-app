import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";

import { tokenLifetimeStringToNumber } from "../../../common/helper";
import { JwtTokenPayload, TokensResult } from "../types";

@Injectable()
export class JwtAuthService {
  constructor(private readonly jwtService: JwtService, private readonly configService: ConfigService) {}

  async generateToken(userId: string, expiresTime: string): Promise<string> {
    const payload: JwtTokenPayload = { userId };
    return await this.jwtService.signAsync(payload, {
      secret: this.configService.get("JWT_SECRET"),
      expiresIn: expiresTime,
    });
  }

  async verifyToken(token: string) {
    return await this.jwtService.verifyAsync(token, { secret: this.configService.get("JWT_SECRET") });
  }

  async getTokens(userId: string): Promise<TokensResult> {
    const accessTokenLifetime = this.configService.get("JWT_ACCESS_TTL");
    const refreshTokenLifetime = this.configService.get("JWT_REFRESH_TTL");

    const accessTokenTTL = tokenLifetimeStringToNumber(accessTokenLifetime);
    const refreshTokenTTL = tokenLifetimeStringToNumber(refreshTokenLifetime);

    const [accessToken, refreshToken] = await Promise.all([
      this.generateToken(userId, accessTokenLifetime),
      this.generateToken(userId, refreshTokenLifetime),
    ]);

    return {
      accessToken,
      accessTokenTTL,
      refreshToken,
      refreshTokenTTL,
    };
  }

  decodeToken(token: string): JwtTokenPayload {
    return this.jwtService.decode(token) as JwtTokenPayload;
  }
}
