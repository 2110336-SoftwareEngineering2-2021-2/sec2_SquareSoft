import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.NODE_ENV === "production" ? process.env.PORT : 3001;

  const config = new DocumentBuilder()
    .setTitle('Project-launcher-API')
    .setDescription('The project launcher API description')
    .setVersion('1.0')
    .addTag('project-launcher')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(PORT);
}
bootstrap();
