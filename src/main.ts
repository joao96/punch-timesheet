import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs';
import * as yaml from 'js-yaml';
import * as Sentry from '@sentry/node';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const yamlFile = fs.readFileSync('./api.yaml', 'utf8');
  const swaggerDocument = yaml.load(yamlFile);

  SwaggerModule.setup('/api', app, swaggerDocument);

  Sentry.init({
    dsn: process.env.SENTRY_DSN,
  });

  await app.listen(3000);
}
bootstrap();
