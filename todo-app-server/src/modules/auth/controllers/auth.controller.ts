import { Body, Controller, Post, Query, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

import { SendMailQueryDto } from "../../mail/dto";
import { UserDto } from "../../user/dto";
import { ConfirmQueryDto, RefreshQueryDto } from "../dto";
import { EmailConfirmedGuard } from "../guards";
import { AuthService } from "../services";
import { AccessTokenResult, TokensResult } from "../types";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(EmailConfirmedGuard)
  @Post("login")
  async login(@Body() user: UserDto): Promise<TokensResult> {
    return await this.authService.login(user);
  }

  @Post("register")
  async registration(@Body() user: UserDto): Promise<TokensResult> {
    return await this.authService.registration(user);
  }

  @Post("refresh")
  async refresh(@Query() query: RefreshQueryDto): Promise<AccessTokenResult> {
    const { refreshToken } = query;
    return await this.authService.refreshSession(refreshToken);
  }

  @Post("confirm")
  async confirmEmail(@Query() query: ConfirmQueryDto): Promise<void> {
    const { userId, code } = query;
    return await this.authService.confirmEmailWithCode(userId, code);
  }

  @Post("verification")
  async sendMail(@Query() query: SendMailQueryDto): Promise<void> {
    const { userId, email } = query;
    return await this.authService.sendConfirmationCodeToEmail(userId, email);
  }
}
