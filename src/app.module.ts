import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeeModule } from './employee/employee.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { EmployeeController } from './employee/employee.controller';

@Module({
  imports: [EmployeeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(EmployeeController);
  }
}
