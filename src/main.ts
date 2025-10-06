import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ConfigService} from '@nestjs/config';
import {ValidationPipe} from '@nestjs/common';
import {initializeTransactionalContext} from "typeorm-transactional";

async function bootstrap() {
  initializeTransactionalContext();

  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
  );

  const port = configService.get('PORT') || 3000;
  await app.listen(port);
  console.log(`App is started on ${port} port`)
}
bootstrap();
