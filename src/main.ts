import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const corsOptions = {
  origin: ['http://localhost:3000'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Content-Type, Accept',
  credentials: true,
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(corsOptions)
  await app.listen(3001);
}
bootstrap();
