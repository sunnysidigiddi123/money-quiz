import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as dotenv from "dotenv";

dotenv.config()

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.setGlobalPrefix('api');
  const config = new DocumentBuilder()
    .setTitle('Moneyquiz Api')
    .setDescription('The Moneyquiz API description')
    .setVersion('1.0')
    .addTag('moneyquiz')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.enableCors();
  await app.listen(process.env.APP_PORT);
}
bootstrap();
