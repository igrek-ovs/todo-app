import { Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { SequelizeModule } from "@nestjs/sequelize";

import { JwtAuthService } from "../auth/services";
import { Task } from "../task/entities";
import { TaskService } from "../task/services";

import { PaymentController } from "./controllers";
import { PaymentService } from "./services";

@Module({
  imports: [SequelizeModule.forFeature([Task])],
  controllers: [PaymentController],
  providers: [PaymentService, TaskService, JwtAuthService, JwtService],
  exports: [],
})
export class PaymentModule {}
