import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as fs from 'fs';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  const options = new DocumentBuilder()
    .setTitle('Cosmetic Api')
    .setDescription('The Cosmetic API')
    .setVersion('1.0')
    .addTag('Cosmetic')
    .build();

  const document = SwaggerModule.createDocument(app, options);

  fs.writeFileSync('swagger.json', JSON.stringify(document));

  SwaggerModule.setup('api', app, document);
  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log('http://localhost:' + port + '/api');
}
bootstrap();
