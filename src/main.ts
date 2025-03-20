import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  // Load environment variables
  dotenv.config();
  console.log('Main.ts - JWT_SECRET_KEY:', process.env.JWT_SECRET_KEY);

  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  // Double-check ConfigService is working
  const configService = app.get(ConfigService);
  console.log(
    'ConfigService - JWT_SECRET_KEY:',
    configService.get('JWT_SECRET_KEY'),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
