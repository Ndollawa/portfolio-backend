import { NestFactory } from '@nestjs/core';
import { OnlineshopModule } from './onlineshop.module';

async function bootstrap() {
  const app = await NestFactory.create(OnlineshopModule);
  await app.listen(3000);
}
bootstrap();
