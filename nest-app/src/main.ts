import { WinstonModule } from 'nest-winston';
import { MulterModule } from '@nestjs/platform-express';
import { NestFactory } from '@nestjs/core';
import { HttpExceptionFilter } from './exceptions/http-exception.filter';
import { AppModule } from './app.module';
import { handleDBConnect } from './db';
import config from './common/config';
import loggerSettings from './logger/logger.settings';

async function bootstrap() {
  await handleDBConnect();
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger(loggerSettings),
  });

  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(config.PORT, config.APP_HOST);
}
bootstrap();
