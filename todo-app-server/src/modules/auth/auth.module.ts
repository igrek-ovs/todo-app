import { Global, Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { SequelizeModule } from "@nestjs/sequelize";

import { MailService } from "../mail/services";
import { UserModule } from "../user";

import { AuthController } from "./controllers";
import { HashedCode } from "./entities";
import { AuthService, JwtAuthService } from "./services";

@Global()
@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get("JWT_SECRET"),
      }),
      inject: [ConfigService],
    }),
    UserModule,
    SequelizeModule.forFeature([HashedCode]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtAuthService, MailService],
  exports: [AuthService],
})
export class AuthModule {}
