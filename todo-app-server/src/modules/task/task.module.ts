import { Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { SequelizeModule } from "@nestjs/sequelize";

import { JwtAuthService } from "../auth/services";

import { TaskController } from "./controllers";
import { Task } from "./entities";
import { TaskEventListener } from "./event-listeners";
import { TaskGateway } from "./gateway";
import { TaskService } from "./services";

@Module({
  imports: [
    SequelizeModule.forFeature([Task]),
  ],
  controllers: [TaskController],
  providers: [TaskService, JwtAuthService, JwtService, TaskGateway, TaskEventListener],
})
export class TaskModule {}