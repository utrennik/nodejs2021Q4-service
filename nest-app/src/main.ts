import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import config from './common/config';
import { handleDBConnect } from './db';

async function bootstrap() {
  await handleDBConnect();
  const app = await NestFactory.create(AppModule);
  await app.listen(config.PORT, config.APP_HOST);
}
bootstrap();
