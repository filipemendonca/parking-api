import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const port = process.env.APPLICATION_PORT
    ? parseInt(process.env.APPLICATION_PORT)
    : 3000;

  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Parking API')
    .setDescription('The Parking API')
    .setDescription('Control all services about parking!`')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe());

  app.enableCors();

  await app.listen(port);
}

bootstrap();
