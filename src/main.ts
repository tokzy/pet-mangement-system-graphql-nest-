import { NestFactory } from '@nestjs/core';
import { join } from 'path';
import * as bodyParser from 'body-parser';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  //app.useGlobalPipes();
  app.useStaticAssets(join(__dirname, '..', 'public'));
  // solves the error that came with request entity too large
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
  await app.listen(Number(process.env.serverPort));
}
bootstrap();
