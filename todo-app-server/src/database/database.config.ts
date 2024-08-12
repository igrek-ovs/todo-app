import { ConfigService } from "@nestjs/config";
import { SequelizeOptions } from "sequelize-typescript";

import { HashedCode } from "../modules/auth/entities";
import { Task } from "../modules/task/entities";
import { User } from "../modules/user/entities";

export const databaseConfig = (configService: ConfigService): SequelizeOptions => ({
  dialect: "postgres",
  host: configService.get("DB_HOST"),
  port: configService.get<number>("DB_PORT"),
  username: configService.get("DB_USER"),
  password: configService.get("DB_PASS"),
  database: configService.get("DB_NAME"),
  models: [User, Task, HashedCode],
});