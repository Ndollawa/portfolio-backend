import { NestFactory } from '@nestjs/core';
import { CourierModule } from './courier.module';

async function bootstrap() {
  const app = await NestFactory.create(CourierModule);
  await app.listen(3000);
}
bootstrap();
