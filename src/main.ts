import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ConfigService} from '@nestjs/config';
import {ValidationPipe} from '@nestjs/common';
import {initializeTransactionalContext} from "typeorm-transactional";
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';

async function bootstrap() {
  initializeTransactionalContext();

  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

    const config = new DocumentBuilder()
        .setTitle('Booking API')
        .setDescription('API для бронирования мест на мероприятия')
        .setVersion('1.0')
        .addTag('bookings')
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document);

  app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
  );

  const port = configService.get('PORT') || 3000;
  await app.listen(port);
  console.log(`App is started on ${port} port`);
  console.log(`Swagger available at http://localhost:${port}/api/docs`);
}
bootstrap();
