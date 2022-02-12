import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //app.useGlobalPipes();

  await app.listen(Number(process.env.serverPort));
}
bootstrap();
