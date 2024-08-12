import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { APP_GUARD } from "@nestjs/core";
import { EventEmitterModule } from "@nestjs/event-emitter";
import { SequelizeModule } from "@nestjs/sequelize";
import { ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler";
import { config } from "dotenv";

import { databaseConfig } from "./database/database.config";
import { JsonBodyMiddleware, RawBodyMiddleware } from "./middlewares";
import { AuthModule } from "./modules/auth";
import { MailModule } from "./modules/mail";
import { PaymentModule } from "./modules/payment";
import { TaskModule } from "./modules/task";
import { UserModule } from "./modules/user";
import {MailerModule} from "@nestjs-modules/mailer";
import * as process from "node:process";

config();

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: "smtp.gmail.com",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD,
        },
      },
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 5000,
        limit: 5,
      },
    ]),
    SequelizeModule.forRootAsync({
      useFactory: async (configService: ConfigService) => databaseConfig(configService),
      inject: [ConfigService],
    }),
    EventEmitterModule.forRoot(),
    AuthModule,
    UserModule,
    TaskModule,
    MailModule,
    PaymentModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule implements NestModule {
  public configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(RawBodyMiddleware)
      .forRoutes({
        path: "/payment/webhook",
        method: RequestMethod.POST,
      })
      .apply(JsonBodyMiddleware)
      .forRoutes("*");
  }
}
