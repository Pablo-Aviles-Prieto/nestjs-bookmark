import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // With this we're telling NestJS to use the pipe logic (it can be used globally, everywhere)
  // whitelist: true tell the pipeline to strip out the fields that are not defined into the dto/validator
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  await app.listen(5000);
}
bootstrap();
