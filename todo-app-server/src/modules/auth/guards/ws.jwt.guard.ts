import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { WsException } from "@nestjs/websockets";

import { JwtAuthService } from "../services";

@Injectable()
export class WsJwtGuard implements CanActivate {
  constructor(private readonly jwtService: JwtAuthService) {}

  async canActivate(context: ExecutionContext) {
    const client = context.switchToWs().getClient();

    const token = client.handshake.headers.authorization;

    if (!token) {
      throw new WsException("Unauthorized");
    }

    try {
      const result = this.jwtService.verifyToken(token);

      client.user = result;

      return true;
    } catch (error) {
      throw new WsException("Unauthorized");
    }
  }
}
