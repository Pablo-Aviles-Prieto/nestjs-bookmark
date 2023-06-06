import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // With this we're telling NestJS to use the pipe logic (it can be used globally, everywhere)
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(5000);
}
bootstrap();
