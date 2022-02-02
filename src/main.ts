import fmp from 'fastify-multipart';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { INestApplication } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { HttpExceptionFilter } from './exceptions/http-exception.filter';
import loggerSettings from './logger/logger.settings';
import { AppModule } from './app.module';
import config from './common/config';

async function bootstrap() {
  let app: NestFastifyApplication | INestApplication;

  if (config.USE_FASTIFY === 'true') {
    const fastifyAdapter = new FastifyAdapter();
    fastifyAdapter.register(fmp);

    app = await NestFactory.create<NestFastifyApplication>(
      AppModule,
      fastifyAdapter,
      {
        logger: WinstonModule.createLogger(loggerSettings),
      },
    );
  } else {
    app = await NestFactory.create<INestApplication>(AppModule, {
      logger: WinstonModule.createLogger(loggerSettings),
    });
  }

  const swaggerConfig = new DocumentBuilder()
    .setTitle('NodeJS2021Q4 service')
    .setDescription('The NodeJS2021Q4 API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(config.PORT, config.APP_HOST);
}
bootstrap();
