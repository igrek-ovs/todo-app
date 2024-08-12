import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";

import { JwtAuthService } from "../services";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtAuthService: JwtAuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const token = request.headers.authorization?.replace("Bearer ", "");

    if (!token) {
      throw new UnauthorizedException("Unauthorized");
    }

    try {
      request.user = await this.jwtAuthService.verifyToken(token);

      return true;
    } catch (error) {
      throw new UnauthorizedException("Unauthorized");
    }
  }
}
