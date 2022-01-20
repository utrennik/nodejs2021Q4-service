import { WinstonModule } from 'nest-winston';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { handleDBConnect } from './db';
import config from './common/config';
import loggerSettings from './logger/logger.settings';

async function bootstrap() {
  await handleDBConnect();
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger(loggerSettings),
  });

  await app.listen(config.PORT, config.APP_HOST);
}
bootstrap();
