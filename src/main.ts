import { WinstonModule } from 'nest-winston';
import { NestFactory } from '@nestjs/core';
import { HttpExceptionFilter } from './exceptions/http-exception.filter';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import loggerSettings from './logger/logger.settings';
import { INestApplication } from '@nestjs/common';
import { AppModule } from './app.module';
import config from './common/config';

async function bootstrap() {
  let app: NestFastifyApplication | INestApplication;

  if (config.USE_FASTIFY) {
    app = await NestFactory.create<NestFastifyApplication>(
      AppModule,
      new FastifyAdapter(),
      {
        logger: WinstonModule.createLogger(loggerSettings),
      },
    );
  } else {
    app = await NestFactory.create<INestApplication>(AppModule, {
      logger: WinstonModule.createLogger(loggerSettings),
    });
  }

  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(config.PORT, config.APP_HOST);
}
bootstrap();
