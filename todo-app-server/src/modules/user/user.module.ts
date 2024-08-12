import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";

import { MailService } from "../mail/services";

import { UserController } from "./controllers";
import { User } from "./entities";
import { UserService } from "./services";

@Module({
  imports: [SequelizeModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService, MailService],
  exports: [UserService],
})
export class UserModule {}