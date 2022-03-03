import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeeModule } from './employee/employee.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { EmployeeController } from './employee/employee.controller';
import { ConfigModule } from '@nestjs/config';
import * as Joi from '@hapi/joi';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { UserController } from './user/user.controller';
@Module({
  imports: [
    EmployeeModule,
    UserModule,
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        // POSTGRES_HOST: Joi.string().required(),
        // POSTGRES_PORT: Joi.number().required(),
        DATABASE_URL: Joi.string().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
        PORT: Joi.number()
      }),
      isGlobal: true
    }),
    DatabaseModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes(EmployeeController, UserController);
  }
}
