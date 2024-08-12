import crypto from "crypto";

import { BadRequestException, HttpException, Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectModel } from "@nestjs/sequelize";

import { tokenLifetimeStringToNumber } from "../../../common/helper";
import { MailService } from "../../mail/services";
import { MailTemplate } from "../../mail/types";
import { UserDto } from "../../user/dto";
import { UserService } from "../../user/services";
import { HashedCode } from "../entities";
import { AccessTokenResult, TokensResult } from "../types";

import { JwtAuthService } from "./jwt.auth.service";

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(HashedCode)
    private readonly hashedCodeModel: typeof HashedCode,
    private readonly userService: UserService,
    private readonly jwtService: JwtAuthService,
    private readonly configService: ConfigService,
    private readonly mailService: MailService,
  ) {}

  async login(userDto: UserDto): Promise<TokensResult> {
    const user = await this.userService.getUserByEmailAndPassword(userDto.email, userDto.password);

    if (!user) {
      throw new UnauthorizedException("Invalid credentials");
    }

    return await this.jwtService.getTokens(user.id);
  }

  async registration(userDto: UserDto): Promise<TokensResult> {
    const isExists = await this.userService.getByEmail(userDto.email);

    if (isExists) {
      throw new BadRequestException("User already exists");
    }

    const user = await this.userService.create(userDto);

    return await this.jwtService.getTokens(user.id);
  }

  async refreshSession(refreshToken: string): Promise<AccessTokenResult> {
    try {
      await this.jwtService.verifyToken(refreshToken);

      const payload = this.jwtService.decodeToken(refreshToken);

      const accessTokenLifetime = this.configService.get("JWT_ACCESS_TTL");

      const accessToken = await this.jwtService.generateToken(payload.userId, accessTokenLifetime);

      const accessTokenTTL = tokenLifetimeStringToNumber(accessTokenLifetime);

      return { accessToken, accessTokenTTL };
    } catch (error) {
      throw new UnauthorizedException("Invalid refresh token");
    }
  }

  async confirmEmailWithCode(userId: string, code: string): Promise<void> {
    const savedCodes = await this.hashedCodeModel.findAll({ where: { userId } });
    const hashedCode = crypto.createHash("sha512").update(code).digest("hex");

    const isExists = savedCodes.some((savedCode) => savedCode.dataValues.hashedCode === hashedCode);

    if (!isExists) {
      throw new HttpException("Invalid Confirmation code", 400);
    }

    await this.userService.confirmUserEmail(userId);
  }

  async sendConfirmationCodeToEmail(userId: string, email: string): Promise<void> {
    const code = this.mailService.generateVerificationCode();

    const hashedCode = crypto.createHash("sha512").update(code).digest("hex");

    const mail: MailTemplate = {
      to: email,
      from: "igrekGGGpoebotich@gmail.com",
      subject: "Welcome to ToDo App! Confirm your Email",
      text: `Your confirmation code is ${code}`,
    };

    await this.mailService.send(mail);

    await this.hashedCodeModel.create({ hashedCode, userId });
  }
}
