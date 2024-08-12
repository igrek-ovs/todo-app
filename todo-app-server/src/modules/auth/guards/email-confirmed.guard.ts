import { CanActivate, ExecutionContext, HttpException, Injectable } from "@nestjs/common";

import { UserDto } from "../../user/dto";
import { UserService } from "../../user/services";

@Injectable()
export class EmailConfirmedGuard implements CanActivate {
  constructor(private readonly userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const body: UserDto = request.body;

    const user = await this.userService.getByEmail(body.email);

    if (user && !user.dataValues.isEmailConfirmed) {
      throw new HttpException("Email is not confirmed", 401);
    }

    return true;
  }
}
