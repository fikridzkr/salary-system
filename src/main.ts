import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('v1');
  app.enableVersioning({
    type: VersioningType.URI
  });
  await app.listen(3000);
  console.log('RUNNING ON PORT 3000');
}
bootstrap();
