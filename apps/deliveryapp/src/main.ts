import { NestFactory } from '@nestjs/core';
import { DeliveryappModule } from './deliveryapp.module';

async function bootstrap() {
  const app = await NestFactory.create(DeliveryappModule);
  await app.listen(3000);
}
bootstrap();
