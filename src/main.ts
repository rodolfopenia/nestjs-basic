import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, //ignora los campos demás
    forbidNonWhitelisted: true //ignora y alerta
  }));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
