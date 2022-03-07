import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  SwaggerModule,
  DocumentBuilder,
  SwaggerDocumentOptions
} from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('v1');
  app.enableVersioning({
    type: VersioningType.URI
  });
  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Salary System Services')
    .setDescription('Restful API for salary system')
    .setVersion('1.0')
    .addTag('auth')
    .addTag('employee')
    .addTag('user')
    .build();
  const options: SwaggerDocumentOptions = {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey
  };
  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
  console.log('RUNNING ON PORT 3000');
}
bootstrap();
