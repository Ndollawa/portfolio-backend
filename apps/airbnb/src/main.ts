import { NestFactory } from '@nestjs/core';
import { AirbnbModule } from './airbnb.module';

async function bootstrap() {
  const app = await NestFactory.create(AirbnbModule);
  await app.listen(3000);
}
bootstrap();
