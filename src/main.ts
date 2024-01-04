import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as fs from 'fs';
import { ValidationPipe } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const options = new DocumentBuilder()
    .setTitle('Cosmetic Api')
    .setDescription('The Cosmetic API')
    .setVersion('1.0')
    .addTag('Cosmetic')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);

  fs.writeFileSync('swagger.json', JSON.stringify(document));

  SwaggerModule.setup('api', app, document);
  const port = process.env.PORT || 3000;
  app.enableCors({
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept',
  });
  await app.listen(port);
  console.log('http://localhost:' + port + '/api');
}
bootstrap();
